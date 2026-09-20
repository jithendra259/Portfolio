"""
Groq Orpheus TTS wrapper for LiveKit Agents.

Groq's Orpheus model is limited to 200 characters per request.
This wrapper splits long text into sentence chunks, synthesizes each
chunk via the OpenAI-compatible /audio/speech endpoint, and concatenates
the resulting PCM frames into a single LiveKit AudioFrame stream — making
it transparent to the rest of the voice pipeline.
"""

from __future__ import annotations

import asyncio
import re
import ssl
from typing import AsyncGenerator

import certifi
import httpx
from livekit.agents import tts, utils
from livekit.agents.types import DEFAULT_API_CONNECT_OPTIONS, APIConnectOptions

from config import settings

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
_GROQ_TTS_URL = "https://api.groq.com/openai/v1/audio/speech"
_ORPHEUS_MODEL = "canopylabs/orpheus-v1-english"
_ORPHEUS_VOICE = "daniel"          # calm, professional male voice
_MAX_CHARS = 190                   # Stay safely below 200-char limit
_SAMPLE_RATE = 24_000              # Orpheus outputs 24kHz wav
_NUM_CHANNELS = 1


def _split_into_chunks(text: str, max_chars: int = _MAX_CHARS) -> list[str]:
    """
    Split text on sentence boundaries (. ! ?) so each chunk fits within
    max_chars. Words that are individually too long are force-split.
    """
    # Normalise whitespace
    text = " ".join(text.split())
    if len(text) <= max_chars:
        return [text]

    # Split on sentence terminators, keeping the delimiter attached
    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks: list[str] = []
    current = ""

    for sentence in sentences:
        # If a single sentence itself exceeds the limit, break on commas/words
        if len(sentence) > max_chars:
            parts = re.split(r"(?<=,)\s+", sentence)
            for part in parts:
                if len(part) > max_chars:
                    # Last resort: hard word-boundary split
                    words = part.split()
                    for word in words:
                        candidate = (current + " " + word).strip()
                        if len(candidate) > max_chars:
                            if current:
                                chunks.append(current)
                            current = word
                        else:
                            current = candidate
                else:
                    candidate = (current + " " + part).strip()
                    if len(candidate) > max_chars:
                        if current:
                            chunks.append(current)
                        current = part
                    else:
                        current = candidate
        else:
            candidate = (current + " " + sentence).strip()
            if len(candidate) > max_chars:
                if current:
                    chunks.append(current)
                current = sentence
            else:
                current = candidate

    if current:
        chunks.append(current)

    return [c for c in chunks if c.strip()]


class _OrpheusSynthesisStream(tts.SynthesisStream):
    """Streams synthesised audio frames for a single text chunk sequence."""

    def __init__(
        self,
        tts_instance: "GroqOrpheusTTS",
        text: str,
        conn_options: APIConnectOptions,
    ) -> None:
        super().__init__(tts=tts_instance, conn_options=conn_options)
        self._text = text
        self._tts = tts_instance

    async def _run(self, output_emitter: tts.AudioEmitter) -> None:
        chunks = _split_into_chunks(self._text)
        client = httpx.AsyncClient(
            verify=ssl.create_default_context(cafile=certifi.where()),
            timeout=httpx.Timeout(connect=10.0, read=30.0, write=5.0, pool=10.0),
        )
        async with client:
            for chunk in chunks:
                if not chunk:
                    continue
                try:
                    resp = await client.post(
                        _GROQ_TTS_URL,
                        headers={
                            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                            "Content-Type": "application/json",
                        },
                        json={
                            "model": _ORPHEUS_MODEL,
                            "voice": _ORPHEUS_VOICE,
                            "input": chunk,
                            "response_format": "wav",
                        },
                    )
                    resp.raise_for_status()

                    # Strip the 44-byte WAV header and emit raw PCM
                    raw_pcm = resp.content[44:]
                    frame = utils.audio.AudioFrame(
                        data=raw_pcm,
                        sample_rate=_SAMPLE_RATE,
                        num_channels=_NUM_CHANNELS,
                        samples_per_channel=len(raw_pcm) // 2,
                    )
                    output_emitter.push(frame)
                except Exception as exc:
                    # Raise so FallbackAdapter can switch to ElevenLabs
                    raise tts.SynthesisError(str(exc)) from exc

        output_emitter.flush()


class GroqOrpheusTTS(tts.TTS):
    """
    LiveKit TTS plugin for Groq Orpheus.

    Drop-in replacement for elevenlabs.TTS / openai.TTS.
    Plugs directly into AgentSession(tts=...) or tts.FallbackAdapter.
    """

    def __init__(self) -> None:
        super().__init__(
            capabilities=tts.TTSCapabilities(streaming=False),
            sample_rate=_SAMPLE_RATE,
            num_channels=_NUM_CHANNELS,
        )

    def synthesize(
        self,
        text: str,
        *,
        conn_options: APIConnectOptions = DEFAULT_API_CONNECT_OPTIONS,
    ) -> tts.SynthesisStream:
        return _OrpheusSynthesisStream(self, text, conn_options)
