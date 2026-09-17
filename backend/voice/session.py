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
            interruption={
                # "adaptive" uses LiveKit Cloud inference to distinguish real barge-ins
                # from short backchannels ("uh-huh", "ok", "right") — avoids false turn switches
                "mode": "adaptive",
                "min_duration": 0.5,
                "min_words": 0,
            },
            preemptive_generation={
                # Start LLM generation as soon as the final STT transcript arrives,
                # before turn-detection confirms — reduces perceived latency
                "enabled": True,
                "preemptive_tts": False,  # keep False: saves wasted compute on Render free tier
                "max_speech_duration": 10.0,
            },
            user_turn_limit={
                "max_words": settings.USER_TURN_MAX_WORDS,
                "max_duration": settings.USER_TURN_MAX_DURATION,
            },
        ),
        user_away_timeout=settings.USER_AWAY_TIMEOUT,
        use_tts_aligned_transcript=False,
        tts_text_transforms=[
            "filter_emoji",
            "filter_markdown",
            text_transforms.replace(PRONUNCIATION_REPLACEMENTS),
        ],
    )
