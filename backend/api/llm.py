from typing import Any
import openai
from livekit.agents import inference, llm
from livekit.plugins import openai as lk_openai

from config import settings


def _sanitize_groq_messages(messages: list[Any]) -> list[dict[str, Any]]:
    """
    Strips 'extra_content' from assistant messages and tool calls.
    LiveKit injects extra_content (e.g. from Google Gemini fallback or LiveKit metrics)
    into ChatMessage objects. Groq strictly enforces OpenAI schema and rejects requests
    with 400 'property extra_content is unsupported'.
    """
    clean_messages = []
    for msg in messages:
        if isinstance(msg, dict):
            clean = dict(msg)
            clean.pop("extra_content", None)
            if "tool_calls" in clean and isinstance(clean["tool_calls"], list):
                clean_tool_calls = []
                for tc in clean["tool_calls"]:
                    if isinstance(tc, dict):
                        tc_clean = dict(tc)
                        tc_clean.pop("extra_content", None)
                        clean_tool_calls.append(tc_clean)
                    else:
                        clean_tool_calls.append(tc)
                clean["tool_calls"] = clean_tool_calls
            clean_messages.append(clean)
        else:
            clean_messages.append(msg)
    return clean_messages


def build_llm_pipeline() -> llm.LLM:
    """
    Constructs a fault-tolerant, high-performance LLM pipeline:
    1. Primary: Groq LPU with automatic message sanitization (sub-100ms TTFT).
    2. Fallback: Google Gemini 2.5 Flash via LiveKit Cloud Inference.
    """
    if settings.GROQ_API_KEY:
        client = openai.AsyncClient(
            api_key=settings.GROQ_API_KEY,
            base_url=settings.GROQ_BASE_URL,
        )
        orig_create = client.chat.completions.create

        async def sanitized_create(*args, **kwargs):
            if "messages" in kwargs and isinstance(kwargs["messages"], list):
                kwargs["messages"] = _sanitize_groq_messages(kwargs["messages"])
            return await orig_create(*args, **kwargs)

        client.chat.completions.create = sanitized_create

        groq_llm = lk_openai.LLM(
            model=settings.GROQ_MODEL,
            client=client,
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
