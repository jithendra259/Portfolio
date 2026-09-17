"""
LiveKit Agent Server and RTC Session Lifecycle Orchestrator.
Manages room connections, voice pipeline startup, greeting utterance, and clean session shutdown.
"""

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
    await session.start(
        room=ctx.room,
        agent=assistant,
        room_options=room_io.RoomOptions(
            text_output=room_io.TextOutputOptions(
                sync_transcription=False,
            ),
        ),
    )
    print("--> [Server] Assistant session started in room with real-time text streaming.")

    # 4. Cleanly shutdown the job runner as soon as the user disconnects
    @ctx.room.on("participant_disconnected")
    def on_participant_disconnected(participant):
        if len(ctx.room.remote_participants) == 0:
            print("--> [Server] Remote participant left room, shutting down job cleanly.")
            ctx.shutdown(reason="remote participant left")
