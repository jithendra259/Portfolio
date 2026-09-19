"""
LiveKit Agent Server and RTC Session Lifecycle Orchestrator.
Manages room connections, voice pipeline startup, greeting utterance, and clean session shutdown.
"""

import asyncio
import json

from livekit import agents
from livekit.agents import AgentServer, room_io

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

    @ctx.room.on("data_received")
    def on_data_received(packet) -> None:
        topic = getattr(packet, "topic", None)
        if topic not in ("client_context", "page_context"):
            return
        try:
            payload = json.loads(packet.data.decode("utf-8"))
            if payload.get("type") == "page_context" or "pathname" in payload:
                assistant.set_page_context(payload)
                print(f"--> [Server] Visitor page context: {assistant.current_page} (title: {payload.get('title')})")
        except (UnicodeDecodeError, json.JSONDecodeError, AttributeError) as error:
            print(f"--> [Server Warning] Invalid client page context: {error}")

    await session.start(
        room=ctx.room,
        agent=assistant,
        room_options=room_io.RoomOptions(
            # NOTE: ai-coustics QUAIL_VF_S was removed.
            # Despite the docs claiming it runs "server-side on LiveKit Cloud",
            # the Python plugin runs the Rust model LOCALLY via FFI (_uniffi_rust_call_with_error).
            # On Render 0.1 vCPU this blocked the asyncio event loop for 387ms and caused
            # VAD to fall 8+ seconds behind realtime, breaking voice entirely.
            # Audio quality is instead handled by:
            #   - WebRTC echoCancellation + noiseSuppression in the browser (frontend Room config)
            #   - Deepgram nova-3's built-in noise robustness
            #   - STT inference fallback chain (assemblyai/universal-streaming)
            text_output=room_io.TextOutputOptions(
                sync_transcription=False,
            ),
        ),
    )
    print("-->[Server] Assistant session started. Audio: WebRTC browser-side + Deepgram nova-3.")


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
