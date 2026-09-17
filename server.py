"""
LiveKit Agent Server and RTC Session Lifecycle Orchestrator.
Manages room connections, voice pipeline startup, greeting utterance, and clean session shutdown.
"""

import asyncio

from livekit import agents, rtc
from livekit.agents import AgentSession, AgentServer, room_io
from livekit.plugins import ai_coustics

from agent import Assistant
from config import settings
from voice import create_voice_session, prewarm_voice_pipeline

# Configure AgentServer with thread executor and prewarm routine
server = AgentServer(
    port=settings.PORT,
    host=settings.HOST,
    load_threshold=float("inf"),
    load_fnc=lambda *args: 0.0,
    num_idle_processes=1,
    job_executor_type=agents.JobExecutorType.THREAD,
    setup_fnc=prewarm_voice_pipeline,
)


@server.rtc_session(agent_name="my-agent")
async def my_agent(ctx: agents.JobContext) -> None:
    """Entry point for each incoming WebRTC voice session."""
    # 1. Connect immediately so LiveKit signals to browser that agent joined (<50ms)
    await ctx.connect()
    print("--> [Server] Worker connected to LiveKit room.")

    # 2. Instantiate isolated voice session with fresh STT, TTS, and dual-LLM pipeline
    session = create_voice_session(ctx)

    # 3. Start session with Assistant tool caller and real-time text output options
    assistant = Assistant(room=ctx.room)
    await session.start(
        room=ctx.room,
        agent=assistant,
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                # ai-coustics QUAIL_VF_S: Voice Focus 2.1 Small — lightweight voice isolation
                # Runs entirely on LiveKit Cloud inference infra: ZERO local CPU on Render.
                # Best WER (7.1%) vs Krisp or background-only models for single-speaker use.
                # Participant selector: skip AI-to-AI audio (agent participants don't need isolation)
                noise_cancellation=lambda params: None
                if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_AGENT
                else ai_coustics.audio_enhancement(
                    model=ai_coustics.EnhancerModel.QUAIL_VF_S,
                    model_parameters=ai_coustics.ModelParameters(
                        # 0.8 = recommended enhancement level from LiveKit docs audio samples
                        enhancement_level=0.8,
                    ),
                ),
            ),
            text_output=room_io.TextOutputOptions(
                sync_transcription=False,
            ),
        ),
    )
    print("-->[Server] Assistant session started — ai-coustics QUAIL_VF_S voice isolation active.")

    # 4. Inactivity & Lifecycle Watchdog (user_away_timeout)
    idle_disconnect_task: asyncio.Task | None = None

    @session.on("user_state_changed")
    def on_user_state_changed(ev):
        nonlocal idle_disconnect_task
        state = getattr(ev, "new_state", None)
        if state == "away":
            print("--> [Server Watchdog] Visitor away detected. Sending check-in prompt.")
            asyncio.create_task(
                session.say(
                    "Still there? Let me know if you'd like to explore any of Jithendra's research papers, engineering projects, or resume.",
                    allow_interruptions=True,
                    add_to_chat_ctx=False,
                )
            )

            async def _idle_shutdown():
                try:
                    await asyncio.sleep(settings.IDLE_DISCONNECT_TIMEOUT)
                    print("--> [Server Watchdog] Inactivity timeout reached without reply. Gracefully shutting down.")
                    ctx.shutdown(reason="inactivity timeout")
                except asyncio.CancelledError:
                    pass

            if idle_disconnect_task is None or idle_disconnect_task.done():
                idle_disconnect_task = asyncio.create_task(_idle_shutdown())
        elif state in ("speaking", "listening"):
            if idle_disconnect_task and not idle_disconnect_task.done():
                print("--> [Server Watchdog] Visitor activity resumed. Resetting idle watchdog.")
                idle_disconnect_task.cancel()
                idle_disconnect_task = None

    # 5. Cleanly shutdown the job runner as soon as the user disconnects
    @ctx.room.on("participant_disconnected")
    def on_participant_disconnected(participant):
        if len(ctx.room.remote_participants) == 0:
            print("--> [Server] Remote participant left room, shutting down job cleanly.")
            if idle_disconnect_task and not idle_disconnect_task.done():
                idle_disconnect_task.cancel()
            ctx.shutdown(reason="remote participant left")
