"""
API Connection Handlers for Language Models.
Integrates Groq LPU as ultra-fast primary LLM with automatic Google Gemini 2.5 Flash fallback.
"""

from livekit.agents import inference, llm
from livekit.plugins import openai

from config import settings


def build_llm_pipeline() -> llm.LLM:
    """
    Constructs a fault-tolerant, high-performance LLM pipeline:
    1. Primary: Groq LPU (Qwen 2.5 32B / Qwen 3.8 27B) — sub-100ms time to first token (TTFT).
    2. Fallback: Google Gemini 2.5 Flash via LiveKit Cloud Inference — automatically engages if Groq rate limits.
    """
    if settings.GROQ_API_KEY:
        groq_llm = openai.LLM(
            model=settings.GROQ_MODEL,
            base_url=settings.GROQ_BASE_URL,
            api_key=settings.GROQ_API_KEY,
            max_completion_tokens=settings.GROQ_MAX_TOKENS,
            temperature=settings.GROQ_TEMPERATURE,
        )
        gemini_fallback = inference.LLM(model=settings.FALLBACK_MODEL)
        return llm.FallbackAdapter(
            [groq_llm, gemini_fallback],
            attempt_timeout=settings.LLM_ATTEMPT_TIMEOUT,
            max_retry_per_llm=settings.LLM_MAX_RETRY,
        )

    return inference.LLM(model=settings.FALLBACK_MODEL)
