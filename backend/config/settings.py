import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment configurations
BACKEND_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BACKEND_DIR / ".env.local")
load_dotenv(BACKEND_DIR / ".env")
load_dotenv()

class Settings:
    # Server Networking
    PORT: int = int(os.getenv("PORT", "10000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")

    # Groq LPU Configuration (Sub-100ms primary LLM)
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "").strip("\"' \t\r\n")
    GROQ_BASE_URL: str = "https://api.groq.com/openai/v1"
    GROQ_MODEL: str = "qwen/qwen3.8-27b"
    GROQ_MAX_TOKENS: int = 60
    GROQ_TEMPERATURE: float = 0.2

    # Google Gemini Fallback Configuration
    FALLBACK_MODEL: str = "google/gemini-2.5-flash"
    LLM_ATTEMPT_TIMEOUT: float = 5.0
    LLM_MAX_RETRY: int = 1

    # Speech-To-Text (STT) - Cloud Edge
    STT_MODEL: str = "deepgram/nova-3"
    STT_LANGUAGE: str = "multi"
    # Automatic server-side fallback: AssemblyAI Universal Streaming
    # Triggered by LiveKit Cloud if nova-3 errors (4xx/5xx/timeout/mid-stream disconnect)
    STT_FALLBACK_MODEL: str = "assemblyai/universal-streaming"

    # Text-To-Speech (TTS) - Ultra-fast Male Voice
    TTS_MODEL: str = "cartesia/sonic-3"
    TTS_VOICE_ID: str = "a0e99841-438c-4a64-b679-ae501e7d6091"
    # Automatic server-side fallback: ElevenLabs Multilingual v2
    # Triggered by LiveKit Cloud if Cartesia errors mid-stream
    TTS_FALLBACK_MODEL: str = "elevenlabs/multilingual-v2"
    TTS_FALLBACK_VOICE_ID: str = "JBFqnCBsd6RMkjVDRZzb"  # ElevenLabs "George" (closest male match)

    # Turn Detection & Latency Tuning
    TURN_DETECTOR_VERSION: str = "v1"
    MIN_ENDPOINTING_DELAY: float = 0.5
    MAX_ENDPOINTING_DELAY: float = 3.0
    USER_TURN_MAX_WORDS: int = 50
    USER_TURN_MAX_DURATION: float = 25.0
    USER_AWAY_TIMEOUT: float = 25.0
    IDLE_DISCONNECT_TIMEOUT: float = 35.0

    # LiveKit Cloud Credentials
    LIVEKIT_URL: str = os.getenv("LIVEKIT_URL", "")
    LIVEKIT_API_KEY: str = os.getenv("LIVEKIT_API_KEY", "")
    LIVEKIT_API_SECRET: str = os.getenv("LIVEKIT_API_SECRET", "")

settings = Settings()
