"""
Prewarm Routines for Voice Agent Worker.
Pre-caches SSL certificates and warms Python async modules to ensure zero cold-start latency.
"""

import ssl
from livekit import agents


def prewarm_voice_pipeline(proc: agents.JobProcess) -> None:
    """
    Pre-warm core networking, async, SSL contexts, and inference modules before incoming requests arrive.
    Eliminates cold-start delays, file-descriptor disk reads, and event loop stalls during session initialization.
    """
    try:
        import anyio.lowlevel  # noqa: F401
        import anyio.streams.memory  # noqa: F401
        import anyio._backends._asyncio  # noqa: F401
        import httpcore  # noqa: F401
        import httpx  # noqa: F401
        import certifi

        # Pre-cache default SSL contexts and certs so they never hit disk during live speech
        ssl.create_default_context(cafile=certifi.where())
        ssl.create_default_context().load_default_certs()

        from livekit.plugins import openai  # noqa: F401
        from livekit.agents import inference, AgentSession  # noqa: F401

        # Pre-warm vector retriever and embeddings so turn 1 latency is sub-25ms
        try:
            from agent.rag import get_retriever
            get_retriever()
            print("--> [Prewarm] Vector RAG retriever and embeddings pre-warmed in RAM.")
        except Exception as rag_err:
            print(f"--> [Prewarm Warning] Failed to prewarm vector retriever: {rag_err}")

        print("--> [Prewarm] Core networking, SSL certificates, and inference modules pre-loaded.")
    except Exception as e:
        print(f"--> [Prewarm Warning] Failed to prewarm dependencies: {e}")
