"""
Voice Session Factory for LiveKit Voice Agent.
Configures Deepgram Nova-3 STT (+ AssemblyAI fallback), Cartesia Sonic-3 TTS (+ ElevenLabs fallback),
LiveKit Cloud TurnDetector, adaptive interruption handling, and preemptive LLM generation.
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
    Constructs an ultra-low latency, fault-tolerant voice pipeline:

    STT:  Deepgram Nova-3 (primary, multilingual, aligned-transcript capable)
          → AssemblyAI Universal Streaming (automatic server-side fallback via LiveKit Cloud)

    TTS:  Cartesia Sonic-3 (primary, sub-100ms synthesis, phonetic replacements)
          → ElevenLabs Multilingual v2 (automatic server-side fallback via LiveKit Cloud)

    LLM:  Groq LPU (primary) → Google Gemini 2.5 Flash (agent-side FallbackAdapter)

    Turn: LiveKit Cloud TurnDetector v1 (0% local CPU on Render)
          Adaptive interruption — filters backchannels ("uh-huh", "ok", "right")
          backchannel_boundary=(1.0, 2.0) — extra 2s end-window for Deepgram transcript latency
          Preemptive LLM generation (no preemptive TTS — saves Render CPU)
    """
    return AgentSession(
        # ── STT: Deepgram Nova-3 with AssemblyAI server-side fallback ───────────────
        stt=inference.STT(
            model=settings.STT_MODEL,
            language=settings.STT_LANGUAGE,
            # If nova-3 fails (4xx, timeout, mid-stream disconnect), LiveKit Cloud
            # automatically reroutes to AssemblyAI Universal Streaming
            fallback=[
                {"model": settings.STT_FALLBACK_MODEL},
            ],
        ),
        llm=build_llm_pipeline(),
        # ── TTS: Cartesia Sonic-3 with ElevenLabs server-side fallback ───────────────
        tts=inference.TTS(
            model=settings.TTS_MODEL,
            voice=settings.TTS_VOICE_ID,
            # If Cartesia fails mid-stream, LiveKit Cloud routes to ElevenLabs
            fallback=[
                {
                    "model": settings.TTS_FALLBACK_MODEL,
                    "voice": settings.TTS_FALLBACK_VOICE_ID,
                },
            ],
        ),
        # ── Turn handling: detection + adaptive interruption + preemptive gen ────────
        turn_handling=TurnHandlingOptions(
            turn_detection=inference.TurnDetector(version=settings.TURN_DETECTOR_VERSION),
            endpointing={
                # min_delay: wait at least 0.5s of silence before confirming end-of-turn
                # max_delay: force close after 3.0s max to avoid indefinite wait
                "min_delay": settings.MIN_ENDPOINTING_DELAY,
                "max_delay": settings.MAX_ENDPOINTING_DELAY,
            },
            interruption={
                # Adaptive mode: LiveKit Cloud inference model distinguishes real barge-ins
                # from conversational backchannels ("uh-huh", "ok", "right", "sure")
                "mode": "adaptive",
                # Min 0.5s of speech required to count as an interruption
                "min_duration": 0.5,
                # No minimum word count — acoustic model alone decides
                "min_words": 0,
                # 2.0s silence after a detected barge-in before classifying as false-positive
                "false_interruption_timeout": 2.0,
                # Resume speaking if interruption was a false-positive (e.g. background noise)
                "resume_false_interruption": True,
                # Cooldown around agent turn boundaries:
                # start=1.0s: use VAD during first second of agent speech (catch early barge-ins)
                # end=2.0s:   include late Deepgram transcripts as real turns (Deepgram can lag ~1.5s)
                "backchannel_boundary": (1.0, 2.0),
            },
            preemptive_generation={
                # Begin LLM generation as soon as final STT transcript arrives,
                # before the turn-detection model confirms end-of-turn → cuts perceived latency
                "enabled": True,
                # preemptive_tts=False: prevents wasted Cartesia synthesis on cancelled turns
                # (Render free tier has 0.1 vCPU — every wasted cycle matters)
                "preemptive_tts": False,
                # Skip preemptive generation for long utterances (>10s) — they mutate too often
                "max_speech_duration": 10.0,
                # Retry up to 3 times per turn if the final transcript keeps changing
                "max_retries": 3,
            },
            user_turn_limit={
                "max_words": settings.USER_TURN_MAX_WORDS,
                "max_duration": settings.USER_TURN_MAX_DURATION,
            },
        ),
        user_away_timeout=settings.USER_AWAY_TIMEOUT,
        # Disable TTS-aligned transcript: avoids expensive FFT processing on Render 0.1 vCPU
        use_tts_aligned_transcript=False,
        tts_text_transforms=[
            "filter_emoji",
            "filter_markdown",
            text_transforms.replace(PRONUNCIATION_REPLACEMENTS),
        ],
    )
