import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv
from livekit import agents
from livekit.agents import llm, stt, tts, inference, vad, utils
from livekit.agents.types import APIConnectOptions, DEFAULT_API_CONNECT_OPTIONS
from livekit.plugins import deepgram, google, silero
from livekit.plugins.google.beta import GeminiSTT
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    TurnHandlingOptions,
    room_io,
)
import edge_tts
import av


# ============================================================
# ENVIRONMENT
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env.local")
load_dotenv(BASE_DIR / ".env")
load_dotenv()


# ============================================================
# ASSISTANT
# ============================================================

import json
from typing import Annotated

class Assistant(Agent):

    def __init__(self, room=None) -> None:
        self.room = room

        super().__init__(
            instructions="""
You are the voice AI clone and interactive portfolio assistant for Kandula Jithendra Subramanyam. You possess exhaustive, first-hand knowledge about his research, engineering projects, career, academic background, and technical philosophy.

1. BIOGRAPHY & CORE IDENTITY:
- Full Name: Kandula Jithendra Subramanyam (often called Jithendra).
- Roles: AI Systems Engineer, Quantitative Financial Researcher, Multi-Agent Systems Architect, and Full-Stack Developer.
- Core Mission: Bridging autonomous agentic swarms with convex mathematical optimization (CVXPY) and deterministic supervisory governance for verifiable, audit-compliant decision systems in high-stakes domains.
- Location: Mumbai, Maharashtra, India. Open to full-time AI engineering, quantitative research roles, and collaborative thesis projects worldwide (open to relocation or remote).
- Direct Contact: kandulajithendrasubramanyam@gmail.com, phone +91-9704400336.
- Online Presence: GitHub github.com/jithendra259, LinkedIn linkedin.com/in/kandulajithendra, Portfolio https://jithendra-portfolio.vercel.app.

2. EDUCATION & ACADEMIC CREDENTIALS:
- M.Tech in Artificial Intelligence & Data Science (2024 - 2026):
  * Institution: K J Somaiya College of Engineering, Somaiya Vidyavihar University, Mumbai.
  * Cumulative CGPA: 8.06 / 10.0.
  * Master's Thesis: Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk Portfolio Optimization with Adaptive Contagion Penalization (supervised by Prof. Sunayana Jadhav).
- B.Tech in Electronics & Communication Engineering (2019 - 2023):
  * Institution: Presidency University, Bangalore.
  * Cumulative CGPA: 7.77 / 10.0.
  * Capstone Project: Autonomous Swarm Robotics for Precision Agriculture & Plant Pathology. Awarded the prestigious Karnataka State Council for Science & Technology (KSCST) 46th Series Project Grant.
- Competitive Examination:
  * Qualified GATE 2024 (Graduate Aptitude Test in Engineering) in both Data Science & Artificial Intelligence (DA) and Computer Science & Information Technology (CS).

3. THREE PEER-REVIEWED RESEARCH PUBLICATIONS (2026):
- Paper 1 (Elsevier Journal - Under Review 2026):
  * Title: "Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk Portfolio Optimization with Adaptive Contagion Penalization"
  * Journal: Elsevier Engineering Applications of Artificial Intelligence (EAAI). Manuscript ID: EAAI-26-14280.
  * Authors: K. J. Subramanyam (First & Corresponding Author), Sunayana Jadhav.
  * Methodology: Formulates a 5-agent blackboard architecture for institutional portfolio optimization addressing fire-sale contagion and cross-sector spillovers via SEC 13-F bipartite co-holding graphs. Integrates graph-regularized Conditional Value-at-Risk (G-CVaR) with adaptive contagion penalization, Ledoit-Wolf shrinkage, and human-in-the-loop auditing.
  * Key Results: Achieves a 25.9% reduction in CVaR at 95% confidence and a 32.5 percentage point reduction in crisis drawdown relative to equal-weight benchmarks over 552 rolling windows across 2005-2025 (tested across 2008 GFC, 2020 COVID shock, and 2022 rate hikes).
- Paper 2 (Springer Nature LNCS / IJCACI 2026 - Presented & Accepted):
  * Title: "Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization"
  * Conference: 5th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026), Washington University of Science and Technology (WUST), Alexandria, USA. Published in Springer Nature LNCS.
  * Authors: K. J. Subramanyam (First & Corresponding Author), Sunayana Vilas Jadhav, Ashwini Dalvi.
  * Methodology: Proposes an interpretable regime-adaptive supervisory governance framework coupling covariance drift, rolling volatility, and correlation stress into a composite Instability Index (I_t). Dynamically adjusts concentration limits and Ledoit-Wolf shrinkage (alpha = 0.42) during stress periods.
  * Key Results: Validated across 218 U.S. equities over 20 years (2005-2025) with a 32.5% max drawdown containment.
- Paper 3 (Elsevier Journal - Under Review / Prepared 2026):
  * Title: "A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching & Conversational Explainability"
  * Journal: Elsevier Computers & Operations Research (CAS Journal).
  * Authors: K. J. Subramanyam (First & Corresponding Author), Sunayana Vilas Jadhav, Ashwini Dalvi.
  * Methodology: 7-agent DAG architecture integrating CLARABEL interior-point convex solver with conversational Mistral-7B LLM. Enforces 100% numerical grounding (0% hallucination) by strictly bounding LLM generated explanations to verified vector outputs from the convex solver blackboard.
  * Compliance: Full compliance with MiFID II regulatory transparency standards and the EU AI Act for algorithmic financial systems.

4. KEY PROJECTS & ARCHITECTURES:
- Agentic AI Portfolio Governance Chatbot (This Voice Assistant):
  * Built using LangGraph, LangChain, CVXPY, CLARABEL, NetworkX, Mistral-7B via Ollama, LiveKit WebRTC, Deepgram Nova-3 STT, Cartesia Sonic-3 TTS, Silero VAD, and Google Gemini.
  * Decoupled into 10+ agent roles: Supervisor, Data Ingestion, Risk Assessment, Regime Detection, Optimization, Grounding & Verification, and Conversational Explainer. Delivers sub-500ms voice TTFT.
- Multi-Agent Adaptive Portfolio Governance System:
  * Full-stack quantitative investment intelligence platform built on Next.js 15, TypeScript, TailwindCSS, and Python backend.
- Regime-Adaptive Supervisory Governance:
  * Multi-regime portfolio optimizer with live stress-testing and backtesting over 2005-2025.
- Personalised AQI Global Air Quality Forecasting:
  * Built using Next.js 15, Flask, Python, and CPCB sensor data from 10 Delhi stations. Evaluated XGBoost, Markov Chains, and ARIMA. XGBoost achieved R^2 = 0.912 and RMSE of 18.4 ug/m3 for 48-hour PM2.5 forecasting.
- Autonomous Swarm Robots for Agriculture:
  * Hardware-software IoT swarm system using ESP32, ESP-NOW mesh, edge CNNs, and DenseNet121 for crop disease classification with 98.4% field coverage and 96.8% disease classification accuracy. Supported by KSCST grant.

5. TECHNICAL SKILLS:
- AI & Multi-Agent Swarms: LangGraph, LangChain, Multi-Agent Blackboards, Directed Acyclic Graph (DAG) Workflows, RAG, Numerical Grounding & Hallucination Mitigation, Tool Calling.
- Large Language Models & Voice: Google Gemini, Mistral-7B, Llama-3, Ollama, LiveKit WebRTC, Deepgram Nova-3, Cartesia Sonic-3, Silero VAD.
- Machine Learning: PyTorch, TensorFlow, Scikit-Learn, XGBoost, ARIMA, Markov Chains, Hugging Face, OpenCV.
- Quantitative Finance & Math: Convex Optimization (CVXPY), CLARABEL solver, Conditional Value-at-Risk (CVaR), Ledoit-Wolf Shrinkage, Bipartite Institutional Co-holding Networks, Eigenvector Centrality, NetworkX, YFinance.
- Full-Stack Web: Next.js 15 (App Router), React 19, TypeScript, JavaScript, TailwindCSS, Node.js, FastAPI, Flask, MongoDB, REST APIs, WebSockets, WebRTC.
- Embedded & Hardware: ESP32, ESP-NOW protocol, Sensor Networks, MicroPython, Arduino, Embedded C++.
- DevOps & Tooling: Git, GitHub, Docker, Linux, Vercel, Postman.

6. PROFESSIONAL WORK EXPERIENCE:
- Thesis Researcher at K J Somaiya College of Engineering (Oct 2025 - Apr 2026): Led research on multi-agent financial systems, convex portfolio optimization, and authored 3 research manuscripts.
- Full-Stack Developer Intern at ScholarRankAI (May 2025 - Aug 2025): Developed AI ranking algorithms, scalable Next.js UI, optimized REST APIs with sub-200ms response times.
- UI/UX Developer Intern at MNJ Software (Mar 2024 - May 2024): Designed and built modern responsive web dashboards, component design systems, and client-facing interfaces.

7. CERTIFICATIONS & HONORS:
- GATE 2024 Qualified (Data Science & AI, Computer Science & IT).
- IJCACI 2026 Paper Presentation Certificate (Springer Nature LNCS).
- Coursera Certifications: Big Data with Spark and Hadoop, Cloud Computing Specialization, Cloud Computing Technologies, Data Networks and the Internet, Operating Systems & Virtualization.
- Presidency University Certifications: Python Programming, Machine Learning, Digital Image Processing, Wireless Communications.
- KSCST 46th Series Project Grant for Swarm Robotics.

8. AUTO-NAVIGATION & INTERACTION:
- You have the live ability to navigate and scroll the visitor's screen in real time using your `navigate_portfolio` tool.
- When the visitor asks to see, view, scroll, or go to any section, paper, case study, or book an appointment, ALWAYS call `navigate_portfolio` with the target and tell the visitor you are guiding their screen there.
- Target destinations: 'projects', 'research', 'about', 'resume', 'contact', 'skills', 'certificates', 'experience', 'home', 'case_study_adaptive_governance', 'case_study_regime_supervisory', 'case_study_supervisory_xai', 'case_study_aqi', 'case_study_swarm_robotics'.
- If the visitor wants to meet or collaborate, tell them they can pick a 30-minute slot right here and sync it directly to Google Calendar.

9. STRICT MINIMAL TOKEN & CONCISE VOICE POLICY (COST & LATENCY OPTIMIZATION):
- Ultra-concise responses only: Answer in exactly 1 single brief sentence (strictly under 15 words).
- NEVER give long explanations, bullet points, formula derivations, or monologues.
- ALWAYS call `navigate_portfolio` to guide the visitor's screen to the requested section instead of explaining it vocally.
- Every word spoken costs API tokens and audio synthesis time. Be punchy, polite, and direct.
- Never use markdown formatting (no asterisks, hashes, or bullet points) in speech.
"""
        )

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
# LIVEKIT SERVER
# ============================================================

def get_clean_google_api_key() -> str:
    raw = os.getenv("GOOGLE_API_KEY", "")
    return raw.strip("\"' \t\r\n")

def prewarm(proc: agents.JobProcess):
    """Prewarm heavy models during worker startup to prevent event loop blocking on call connect."""
    try:
        proc.userdata["vad"] = silero.VAD.load(
            min_speech_duration=0.05,
            min_silence_duration=0.25,
            prefix_padding_duration=0.08,
        )
        print("--> [Prewarm] Silero VAD loaded successfully.")
    except Exception as e:
        print(f"--> [Prewarm Warning] Failed to prewarm Silero VAD: {e}")

    try:
        proc.userdata["llm"] = build_llm()
        print("--> [Prewarm] Google LLM initialized successfully.")
    except Exception as e:
        print(f"--> [Prewarm Warning] Failed to prewarm Google LLM: {e}")

    try:
        proc.userdata["tts"] = build_tts()
        _codec = av.CodecContext.create("mp3", "r")
        _resampler = av.AudioResampler(format="s16", layout="mono", rate=24000)
        print("--> [Prewarm] EdgeTTS (Male Voice: GuyNeural) prewarmed successfully.")
    except Exception as e:
        print(f"--> [Prewarm Warning] Failed to prewarm EdgeTTS: {e}")

server = AgentServer(
    load_threshold=float("inf"),
    load_fnc=lambda *args: 0.0,
    num_idle_processes=0,
    job_executor_type=agents.JobExecutorType.THREAD,
    setup_fnc=prewarm,
)

# ============================================================
# MODULAR AI FACTORY FUNCTIONS (Created within Job Context)
# ============================================================

def build_vad():
    """Silero VAD with compliant silence threshold for TurnDetector"""
    return silero.VAD.load(
        min_speech_duration=0.05,
        min_silence_duration=0.25,
        prefix_padding_duration=0.08,
    )

def build_stt():
    """Deepgram Nova-3 streaming STT with Gemini fallback"""
    google_key = get_clean_google_api_key()
    deepgram_key = os.getenv("DEEPGRAM_API_KEY", "").strip("\"' \t\r\n")

    stt_models = []
    if deepgram_key:
        try:
            stt_models.append(
                deepgram.STT(
                    api_key=deepgram_key,
                    model="nova-3",
                    endpointing_ms=25,
                    smart_format=True,
                )
            )
        except Exception as e:
            print(f"--> [STT Warning] Could not init Deepgram STT: {e}")

    if google_key:
        try:
            stt_models.append(GeminiSTT(api_key=google_key))
        except Exception as e:
            print(f"--> [STT Warning] Could not init GeminiSTT fallback: {e}")

    if len(stt_models) > 1:
        return stt.FallbackAdapter(stt_models)
    elif len(stt_models) == 1:
        return stt_models[0]
    return GeminiSTT(api_key=google_key) if google_key else deepgram.STT()

class EdgeTTSChunkedStream(tts.ChunkedStream):
    async def _run(self, output_emitter: tts.AudioEmitter) -> None:
        communicate = edge_tts.Communicate(
            text=self._input_text,
            voice=self._tts._voice,
            rate=self._tts._rate,
        )
        output_emitter.initialize(
            request_id=utils.shortuuid(),
            sample_rate=self._tts.sample_rate,
            num_channels=self._tts.num_channels,
            mime_type="audio/pcm",
        )
        codec = av.CodecContext.create("mp3", "r")
        resampler = av.AudioResampler(format="s16", layout="mono", rate=self._tts.sample_rate)
        async for chunk in communicate.stream():
            if chunk["type"] == "audio" and chunk.get("data"):
                packets = codec.parse(chunk["data"])
                for packet in packets:
                    for frame in codec.decode(packet):
                        for resampled in resampler.resample(frame):
                            output_emitter.push(resampled.to_ndarray().tobytes())

        # Flush decoder and resampler
        for frame in codec.decode():
            for resampled in resampler.resample(frame):
                output_emitter.push(resampled.to_ndarray().tobytes())
        for resampled in resampler.resample(None):
            output_emitter.push(resampled.to_ndarray().tobytes())


class EdgeTTS(tts.TTS):
    """Ultra-fast, zero-credit streaming male neural voice using Microsoft Edge TTS"""
    def __init__(
        self,
        voice: str = "en-US-GuyNeural",
        rate: str = "+4%",
        sample_rate: int = 24000,
    ) -> None:
        super().__init__(
            capabilities=tts.TTSCapabilities(streaming=False),
            sample_rate=sample_rate,
            num_channels=1,
        )
        self._voice = voice
        self._rate = rate

    @property
    def model(self) -> str:
        return "edge-tts-guy-neural"

    @property
    def provider(self) -> str:
        return "microsoft-edge"

    def synthesize(
        self,
        text: str,
        *,
        conn_options: APIConnectOptions = DEFAULT_API_CONNECT_OPTIONS,
    ) -> tts.ChunkedStream:
        return EdgeTTSChunkedStream(tts=self, input_text=text, conn_options=conn_options)


def build_tts():
    """Ultra-fast male neural voice (en-US-GuyNeural) - 0 credits, 0 cost, sub-second latency"""
    return EdgeTTS(voice="en-US-GuyNeural", rate="+4%")

def build_llm():
    """Google Gemini Flash Latest with ultra-fast TTFT, zero thinking budget, and strict token limits"""
    api_key = get_clean_google_api_key()
    if not api_key:
        print("--> [LLM CRITICAL] GOOGLE_API_KEY environment variable is NOT set!")
    else:
        print("--> [LLM Info] Initializing Google LLM with 'gemini-flash-latest'...")

    return google.LLM(
        model="gemini-flash-latest",
        api_key=api_key or None,
        max_output_tokens=50,
        temperature=0.2,
        thinking_config={"thinking_budget": 0},
    )

def create_session(ctx: agents.JobContext | None = None):
    """Modular session builder binding STT, VAD, LLM, and TTS to active job"""
    vad_instance = None
    llm_instance = None
    tts_instance = None
    if ctx and hasattr(ctx, "proc") and hasattr(ctx.proc, "userdata"):
        vad_instance = ctx.proc.userdata.get("vad")
        llm_instance = ctx.proc.userdata.get("llm")
        tts_instance = ctx.proc.userdata.get("tts")

    return AgentSession(
        stt=build_stt(),
        vad=vad_instance or build_vad(),
        llm=llm_instance or build_llm(),
        tts=tts_instance or build_tts(),
        turn_handling=TurnHandlingOptions(
            allow_interruptions=True,
        ),
    )


# ============================================================
# VOICE AGENT ENTRYPOINT
# ============================================================

@server.rtc_session(agent_name="my-agent")
async def my_agent(ctx: agents.JobContext):
    # 1. Connect immediately so LiveKit signals to browser that agent joined (<50ms)
    await ctx.connect()
    print("--> [Agent Session] Worker connected to LiveKit room.")

    # 2. Instantiate modular session inside active job context using prewarmed components
    session = create_session(ctx)

    # 3. Start session with Assistant tool caller
    assistant = Assistant(room=ctx.room)
    await session.start(
        room=ctx.room,
        agent=assistant,
    )
    print("--> [Agent Session] Assistant started in room.")

    # 4. Instant Greeting via Cartesia Sonic-3
    try:
        await session.say(
            "Hi! I'm Jithendra's AI assistant. What would you like to explore?",
            allow_interruptions=True,
        )
    except Exception as e:
        print(f"--> [Agent Greeting Warning] {e}")

    # 5. Keep the agent alive for the entire conversation lifetime
    disconnected_fut = asyncio.Future()

    @ctx.room.on("disconnected")
    def on_room_disconnected(*args):
        if not disconnected_fut.done():
            disconnected_fut.set_result(None)

    @ctx.room.on("participant_disconnected")
    def on_participant_disconnected(participant):
        # End session when all human participants leave the room
        if len(ctx.room.remote_participants) == 0:
            print("--> [Agent Session] Remote participants left room, ending session.")
            if not disconnected_fut.done():
                disconnected_fut.set_result(None)

    async def _on_shutdown(*args):
        if not disconnected_fut.done():
            disconnected_fut.set_result(None)

    ctx.add_shutdown_callback(_on_shutdown)

    await disconnected_fut
    print("--> [Agent Session] Session ended cleanly.")


# ============================================================
# HTTP HEALTH CHECK SERVER (For Render Web Service deployment)
# ============================================================

import threading
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

class RenderHealthHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Max-Age", "86400")

    def _get_status_payload(self) -> bytes:
        status_info = {
            "status": "healthy",
            "service": "portfolio-backend-livekit",
            "agent_name": "my-agent",
            "livekit_configured": bool(os.getenv("LIVEKIT_URL")),
            "tts_engine": "edge-tts-guy-neural",
            "deepgram_configured": bool(os.getenv("DEEPGRAM_API_KEY")),
            "google_configured": bool(os.getenv("GOOGLE_API_KEY")),
        }
        return json.dumps(status_info, indent=2).encode("utf-8")

    def do_HEAD(self):
        payload = self._get_status_payload()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        payload = self._get_status_payload()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(payload)

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def log_message(self, format, *args):
        # Suppress noisy health-check polling logs
        return

_health_server_thread: threading.Thread | None = None

def start_health_server():
    global _health_server_thread
    if _health_server_thread is not None and _health_server_thread.is_alive():
        return

    port = int(os.getenv("PORT", "10000"))
    def _serve():
        try:
            httpd = ThreadingHTTPServer(("0.0.0.0", port), RenderHealthHandler)
            print(f"--> [Render HTTP Health Check] Successfully bound to 0.0.0.0:{port}")
            httpd.serve_forever()
        except Exception as err:
            print(f"--> [Render HTTP Warning] Could not start health server on port {port}: {err}")

    _health_server_thread = threading.Thread(target=_serve, daemon=True)
    _health_server_thread.start()


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    start_health_server()
    agents.cli.run_app(server)
