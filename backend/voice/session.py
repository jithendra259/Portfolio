"""
Voice Session Factory for LiveKit Voice Agent.
Configures Deepgram Nova-3 STT, Cartesia Sonic-3 TTS, Cloud Turn Detection, and Text Transforms.
"""

from livekit import agents
from livekit.agents import (
    AgentSession,
    TurnHandlingOptions,
    inference,
    text_transforms,
)

from api import build_llm_pipeline
from config import settings
from prompts import PRONUNCIATION_REPLACEMENTS


def create_voice_session(ctx: agents.JobContext | None = None) -> AgentSession:
    """
    Constructs an ultra-low latency voice pipeline:
    - Fresh STT and TTS instances per session to prevent closed aiohttp connection errors.
    - Deepgram Nova-3 speech recognition (multilingual cloud edge).
    - Cartesia Sonic-3 text-to-speech with natural phonetic replacements for quantitative/academic acronyms.
    - LiveKit Cloud TurnDetector v1 (0% local CPU on Render).
    - Tuned endpointing (min_delay=0.5s) to ensure full user transcript capture before turn commits.
    - Disabled TTS-aligned transcript calculation (avoids expensive FFT loops on restricted CPU).
    """
    return AgentSession(
        stt=inference.STT(
            model=settings.STT_MODEL,
            language=settings.STT_LANGUAGE,
        ),
        llm=build_llm_pipeline(),
        tts=inference.TTS(
            model=settings.TTS_MODEL,
            voice=settings.TTS_VOICE_ID,
        ),
        turn_handling=TurnHandlingOptions(
            turn_detection=inference.TurnDetector(version=settings.TURN_DETECTOR_VERSION),
            endpointing={
                "min_delay": settings.MIN_ENDPOINTING_DELAY,
                "max_delay": settings.MAX_ENDPOINTING_DELAY,
            },
            user_turn_limit={
                "max_words": settings.USER_TURN_MAX_WORDS,
                "max_duration": settings.USER_TURN_MAX_DURATION,
            },
        ),
        use_tts_aligned_transcript=False,
        tts_text_transforms=[
            "filter_emoji",
            "filter_markdown",
            text_transforms.replace(PRONUNCIATION_REPLACEMENTS),
        ],
    )
