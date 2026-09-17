import asyncio
import json
import os
from pathlib import Path
from typing import Annotated

from dotenv import load_dotenv
from livekit import agents
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    TurnHandlingOptions,
    inference,
    llm,
    text_transforms,
)
from livekit.plugins import openai

# ============================================================
# ENVIRONMENT
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env.local")
load_dotenv(BASE_DIR / ".env")
load_dotenv()


from prompts import PRONUNCIATION_REPLACEMENTS, SYSTEM_INSTRUCTIONS

# ============================================================
# ASSISTANT
# ============================================================

class Assistant(Agent):

    def __init__(self, room=None) -> None:
        self.room = room
        super().__init__(instructions=SYSTEM_INSTRUCTIONS)

    @llm.function_tool(description="Auto-navigate the visitor's screen in real time to a specific portfolio section or research paper case study.")
    async def navigate_portfolio(
        self,
        target: Annotated[
            str,
            "Target destination: 'projects', 'research', 'about', 'resume', 'contact', 'skills', 'certificates', 'experience', 'home', 'case_study_adaptive_governance', 'case_study_regime_supervisory', 'case_study_supervisory_xai', 'case_study_aqi', 'case_study_swarm_robotics'",
        ],
    ) -> str:
        """Navigates the user's browser to the requested section or case study."""
        print(f"--> [Backend AI Tool] Navigating frontend to: {target}")
        room = getattr(self, "room", None)
        if not room and hasattr(self, "session") and self.session and hasattr(self.session, "room_io") and self.session.room_io:
            room = getattr(self.session.room_io, "room", None)

        if room and hasattr(room, "local_participant") and room.local_participant:
            try:
                payload = json.dumps({"type": "navigate", "target": target})
                await room.local_participant.publish_data(payload.encode("utf-8"), topic="navigation")
                print(f"--> [Backend Data Channel] Published navigation packet for '{target}' successfully.")
                return f"Successfully navigated screen to {target}."
            except Exception as e:
                print(f"--> [Backend Error] Failed to publish navigation packet: {e}")
                return f"Attempted navigation to {target}: {e}"
        print(f"--> [Backend Warning] No active room participant found to publish navigation.")
        return f"Navigation requested for {target}."


# ============================================================
# LIVEKIT SERVER & HYBRID GROQ + GEMINI FALLBACK PIPELINE
# ============================================================

def build_llm_pipeline():
    """
    Builds a high-availability dual-LLM pipeline:
    1. Primary: Groq LPU (qwen/qwen3.8-27b) — 14,400 free requests/day, sub-100ms TTFT
    2. Fallback: Google Gemini 2.5 Flash via LiveKit Cloud Inference — automatically handles traffic if Groq ever throttles
    """
    groq_key = os.getenv("GROQ_API_KEY", "").strip("\"' \t\r\n")

    if groq_key:
        groq_llm = openai.LLM(
            model="qwen/qwen3.8-27b",
            base_url="https://api.groq.com/openai/v1",
            api_key=groq_key,
            max_completion_tokens=60,
            temperature=0.2,
        )
        gemini_fallback = inference.LLM(model="google/gemini-2.5-flash")
        return llm.FallbackAdapter(
            [groq_llm, gemini_fallback],
            attempt_timeout=5.0,
            max_retry_per_llm=1,
        )

    return inference.LLM(model="google/gemini-2.5-flash")

def create_session(ctx: agents.JobContext | None = None):
    """
    Ultra-low latency LiveKit Voice Pipeline with Groq LPU Acceleration:
    - Fresh STT & TTS per session: Eliminates closed aiohttp connection errors
    - LLM: Groq LPU (Primary) + Gemini 2.5 Flash (Automatic Fallback)
    - STT: Deepgram Nova-3 via LiveKit Inference (cloud edge)
    - TTS: Cartesia Sonic-3 ultra-fast male voice via LiveKit Inference
    - Turn Detection: LiveKit Cloud TurnDetector v1 (0% CPU on Render)
    - Endpointing: 0.5s min_delay to guarantee clean transcript commit before speech
    - Pronunciation Maps: Phonetic replacements for academic & quant terms
    """
    return AgentSession(
        stt=inference.STT(model="deepgram/nova-3", language="multi"),
        llm=build_llm_pipeline(),
        tts=inference.TTS(
            model="cartesia/sonic-3",
            voice="a0e99841-438c-4a64-b679-ae501e7d6091",
        ),
        turn_handling=TurnHandlingOptions(
            turn_detection=inference.TurnDetector(version="v1"),
            endpointing={"min_delay": 0.5, "max_delay": 3.0},
        ),
        use_tts_aligned_transcript=False,
        tts_text_transforms=[
            "filter_emoji",
            "filter_markdown",
            text_transforms.replace(PRONUNCIATION_REPLACEMENTS),
        ],
    )

def prewarm(proc: agents.JobProcess):
    """
    Pre-warm core networking, async, SSL contexts, and inference modules before incoming requests arrive.
    Eliminates cold-start delays and event loop stalls during session initialization.
    """
    try:
        import anyio.lowlevel  # noqa: F401
        import anyio.streams.memory  # noqa: F401
        import anyio._backends._asyncio  # noqa: F401
        import httpcore  # noqa: F401
        import httpx  # noqa: F401
        import inspect  # noqa: F401
        import ssl  # noqa: F401
        import certifi  # noqa: F401
        import re  # noqa: F401
        # Pre-cache default SSL contexts and certs so they never hit disk during live speech
        ssl.create_default_context(cafile=certifi.where())
        ssl.create_default_context().load_default_certs()
        from livekit.plugins import openai  # noqa: F401
        from livekit.agents import inference, AgentSession  # noqa: F401
        print("--> [Prewarm] Core networking, SSL certificates, and shared modules pre-loaded.")
    except Exception as e:
        print(f"--> [Prewarm Warning] {e}")

port_num = int(os.getenv("PORT", "10000"))

server = AgentServer(
    port=port_num,
    host="0.0.0.0",
    load_threshold=float("inf"),
    load_fnc=lambda *args: 0.0,
    num_idle_processes=1,
    job_executor_type=agents.JobExecutorType.THREAD,
    setup_fnc=prewarm,
)


# ============================================================
# VOICE AGENT ENTRYPOINT
# ============================================================

@server.rtc_session(agent_name="my-agent")
async def my_agent(ctx: agents.JobContext):
    # 1. Connect immediately so LiveKit signals to browser that agent joined (<50ms)
    await ctx.connect()
    print("--> [Agent Session] Worker connected to LiveKit room.")

    # 2. Instantiate cloud-inference session with Groq + Gemini fallback
    session = create_session(ctx)

    # 3. Start session with Assistant tool caller
    assistant = Assistant(room=ctx.room)
    await session.start(
        room=ctx.room,
        agent=assistant,
    )
    print("--> [Agent Session] Assistant started in room.")

    # 4. Instant Greeting via Cartesia Sonic-3 Male Voice
    try:
        session.say(
            "Hi! I'm Jithendra's AI assistant. What would you like to explore?",
            allow_interruptions=True,
        )
    except Exception as e:
        print(f"--> [Agent Greeting Warning] {e}")

    # 5. Cleanly shutdown the job as soon as the user disconnects
    @ctx.room.on("participant_disconnected")
    def on_participant_disconnected(participant):
        if len(ctx.room.remote_participants) == 0:
            print("--> [Agent Session] Remote participant left room, shutting down job cleanly.")
            ctx.shutdown(reason="remote participant left")


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    agents.cli.run_app(server)