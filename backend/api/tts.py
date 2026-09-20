"""
Groq Orpheus TTS wrapper for LiveKit Agents (livekit-agents >= 1.8).

Groq's Orpheus model is limited to 200 characters per request.
This wrapper splits long text into sentence-boundary chunks, synthesises each
chunk via the OpenAI-compatible /audio/speech endpoint, and yields the
concatenated SynthesizedAudio frames — making it transparent to the rest of
the voice pipeline (including tts.FallbackAdapter).
"""

from __future__ import annotations

import asyncio
import re
import ssl
import time
from typing import AsyncGenerator

import certifi
import httpx
from livekit.agents import utils
from livekit.agents.tts import (
    TTS,
    ChunkedStream,
    SynthesizedAudio,
    TTSCapabilities,
)
from livekit.agents.types import DEFAULT_API_CONNECT_OPTIONS, APIConnectOptions

from config import settings

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
_GROQ_TTS_URL = "https://api.groq.com/openai/v1/audio/speech"
_ORPHEUS_MODEL = "canopylabs/orpheus-v1-english"
_ORPHEUS_VOICE = "daniel"          # calm, professional male voice
_MAX_CHARS = 190                   # Stay safely below Groq's 200-char limit
_SAMPLE_RATE = 24_000              # Orpheus outputs 24kHz wav
_NUM_CHANNELS = 1


def _split_into_chunks(text: str, max_chars: int = _MAX_CHARS) -> list[str]:
    """
    Split text on sentence boundaries (. ! ?) so each chunk fits within
    max_chars. Falls back to comma-splits, then word-splits.
    """
    text = " ".join(text.split())
    if len(text) <= max_chars:
        return [text]

    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks: list[str] = []
    current = ""

    for sentence in sentences:
        if len(sentence) > max_chars:
            parts = re.split(r"(?<=,)\s+", sentence)
            for part in parts:
                if len(part) > max_chars:
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


class _OrpheusChunkedStream(ChunkedStream):
    """ChunkedStream implementation for Groq Orpheus."""

    def __init__(
        self,
        tts_instance: "GroqOrpheusTTS",
        input_text: str,
        conn_options: APIConnectOptions,
    ) -> None:
        super().__init__(tts=tts_instance, input_text=input_text, conn_options=conn_options)
        self._orpheus_tts = tts_instance

    async def _run(self, output_emitter) -> None:
        chunks = _split_into_chunks(self._input_text)
        ssl_ctx = ssl.create_default_context(cafile=certifi.where())

        async with httpx.AsyncClient(
            verify=ssl_ctx,
            timeout=httpx.Timeout(connect=10.0, read=30.0, write=5.0, pool=10.0),
        ) as client:
            for chunk_text in chunks:
                if not chunk_text:
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
                            "input": chunk_text,
                            "response_format": "wav",
                        },
                    )
                    resp.raise_for_status()

                    # Strip the 44-byte WAV header → emit raw PCM int16 frames
                    raw_pcm = resp.content[44:]
                    frame = utils.audio.AudioFrame(
                        data=raw_pcm,
                        sample_rate=_SAMPLE_RATE,
                        num_channels=_NUM_CHANNELS,
                        samples_per_channel=len(raw_pcm) // 2,
                    )
                    output_emitter.push(
                        SynthesizedAudio(
                            frame=frame,
                            request_id=f"orpheus-{int(time.monotonic()*1000)}",
                        )
                    )
                except Exception as exc:
                    raise Exception(f"Groq Orpheus TTS error: {exc}") from exc

        output_emitter.flush()


class GroqOrpheusTTS(TTS):
    """
    LiveKit TTS plugin for Groq Orpheus.

    Drop-in replacement usable inside AgentSession(tts=...) or
    tts.FallbackAdapter([GroqOrpheusTTS(), elevenlabs.TTS(...)]).
    """

    def __init__(self) -> None:
        super().__init__(
            capabilities=TTSCapabilities(streaming=False),
            sample_rate=_SAMPLE_RATE,
            num_channels=_NUM_CHANNELS,
        )

    def synthesize(
        self,
        text: str,
        *,
        conn_options: APIConnectOptions = DEFAULT_API_CONNECT_OPTIONS,
    ) -> ChunkedStream:
        return _OrpheusChunkedStream(self, text, conn_options)
