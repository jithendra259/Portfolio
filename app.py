import asyncio
import json
import os
from pathlib import Path
from typing import Annotated

from dotenv import load_dotenv
from livekit import agents
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    TurnHandlingOptions,
    inference,
    llm,
    text_transforms,
)
from livekit.plugins import openai

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
  * Key Results: Achieves a 25.9% reduction in CVaR at 95% confidence and a 32.5 percentage point reduction in crisis drawdown relative to equal-weight benchmarks over 552 rolling windows across 2005-2025.
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
  * Decoupled into 10+ agent roles: Supervisor, Data Ingestion, Risk Assessment, Regime Detection, Optimization, Grounding & Verification, and Conversational Explainer. Delivers sub-200ms voice TTFT via Groq LPU LLM, LiveKit Inference, Deepgram Nova-3 STT, and Cartesia Sonic-3 TTS.
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
- Large Language Models & Voice: Groq LPU, Google Gemini, Mistral-7B, Llama-3, LiveKit WebRTC, Deepgram Nova-3, Cartesia Sonic-3, Cloud Turn Detection.
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
# LIVEKIT SERVER & HYBRID GROQ + GEMINI FALLBACK PIPELINE
# ============================================================

def build_llm_pipeline():
    """
    Builds a high-availability dual-LLM pipeline:
    1. Primary: Groq LPU (qwen/qwen3.8-27b) — 14,400 free requests/day, sub-100ms TTFT
    2. Fallback: Google Gemini 2.5 Flash via LiveKit Cloud Inference — automatically handles traffic if Groq ever throttles
    """
    groq_key = os.getenv("GROQ_API_KEY", "").strip("\"' \t\r\n")

    if groq_key:
        groq_llm = openai.LLM(
            model="qwen/qwen3.8-27b",
            base_url="https://api.groq.com/openai/v1",
            api_key=groq_key,
            max_completion_tokens=60,
            temperature=0.2,
        )
        gemini_fallback = inference.LLM(model="google/gemini-2.5-flash")
        return llm.FallbackAdapter(
            [groq_llm, gemini_fallback],
            attempt_timeout=5.0,
            max_retry_per_llm=1,
        )

    return inference.LLM(model="google/gemini-2.5-flash")

_SHARED_STT: inference.STT | None = None
_SHARED_LLM: llm.LLM | None = None
_SHARED_TTS: inference.TTS | None = None

def get_shared_pipeline():
    global _SHARED_STT, _SHARED_LLM, _SHARED_TTS
    if _SHARED_STT is None:
        _SHARED_STT = inference.STT(model="deepgram/nova-3", language="multi")
    if _SHARED_LLM is None:
        _SHARED_LLM = build_llm_pipeline()
    if _SHARED_TTS is None:
        _SHARED_TTS = inference.TTS(
            model="cartesia/sonic-3",
            voice="a0e99841-438c-4a64-b679-ae501e7d6091",
        )
    return _SHARED_STT, _SHARED_LLM, _SHARED_TTS

def create_session(ctx: agents.JobContext | None = None):
    """
    Ultra-low latency LiveKit Voice Pipeline with Groq LPU Acceleration:
    - Shared pre-warmed models: Zero SSL certificate reload or disk-read stalls
    - LLM: Groq LPU (Primary) + Gemini 2.5 Flash (Automatic Fallback)
    - STT: Deepgram Nova-3 via LiveKit Inference (cloud edge)
    - TTS: Cartesia Sonic-3 ultra-fast male voice via LiveKit Inference
    - Turn Detection: LiveKit Cloud TurnDetector v1 (0% CPU on Render)
    - Endpointing: 0.5s min_delay to guarantee clean transcript commit before speech
    - Pronunciation Maps: Phonetic replacements for academic & quant terms
    """
    stt, llm_pipeline, tts = get_shared_pipeline()
    return AgentSession(
        stt=stt,
        llm=llm_pipeline,
        tts=tts,
        turn_handling=TurnHandlingOptions(
            turn_detection=inference.TurnDetector(version="v1"),
            endpointing={"min_delay": 0.5, "max_delay": 3.0},
        ),
        use_tts_aligned_transcript=False,
        tts_text_transforms=[
            "filter_emoji",
            "filter_markdown",
            text_transforms.replace({
                "CVXPY": "C V X P Y",
                "CVaR": "C-Var",
                "G-CVaR": "G C-Var",
                "CLARABEL": "Clara-bell",
                "AQI": "A Q I",
                "PM2.5": "P M 2.5",
                "KSCST": "K S C S T",
                "EAAI": "E A A I",
                "IJCACI": "I J C A C I",
                "LNCS": "L N C S",
                "GATE": "Gate",
                "API": "A P I",
                "APIs": "A P Is",
                "LLM": "L L M",
                "LLMs": "L L Ms",
                "STT": "S T T",
                "TTS": "T T S",
                "VAD": "V A D",
            }),
        ],
    )

def prewarm(proc: agents.JobProcess):
    """
    Pre-warm core networking, async, SSL contexts, and inference modules before incoming requests arrive.
    Eliminates cold-start delays and event loop stalls during session initialization.
    """
    try:
        import anyio.lowlevel  # noqa: F401
        import anyio.streams.memory  # noqa: F401
        import anyio._backends._asyncio  # noqa: F401
        import httpcore  # noqa: F401
        import httpx  # noqa: F401
        import inspect  # noqa: F401
        import ssl  # noqa: F401
        import certifi  # noqa: F401
        import re  # noqa: F401
        # Pre-cache default SSL contexts and certs so they never hit disk during live speech
        ssl.create_default_context(cafile=certifi.where())
        ssl.create_default_context().load_default_certs()
        from livekit.plugins import openai  # noqa: F401
        from livekit.agents import inference, AgentSession  # noqa: F401
        get_shared_pipeline()
        print("--> [Prewarm] Core networking, SSL certificates, and shared pipeline pre-loaded.")
    except Exception as e:
        print(f"--> [Prewarm Warning] {e}")

port_num = int(os.getenv("PORT", "10000"))

server = AgentServer(
    port=port_num,
    host="0.0.0.0",
    load_threshold=float("inf"),
    load_fnc=lambda *args: 0.0,
    num_idle_processes=1,
    job_executor_type=agents.JobExecutorType.THREAD,
    setup_fnc=prewarm,
)


# ============================================================
# VOICE AGENT ENTRYPOINT
# ============================================================

@server.rtc_session(agent_name="my-agent")
async def my_agent(ctx: agents.JobContext):
    # 1. Connect immediately so LiveKit signals to browser that agent joined (<50ms)
    await ctx.connect()
    print("--> [Agent Session] Worker connected to LiveKit room.")

    # 2. Instantiate cloud-inference session with Groq + Gemini fallback
    session = create_session(ctx)

    # 3. Start session with Assistant tool caller
    assistant = Assistant(room=ctx.room)
    await session.start(
        room=ctx.room,
        agent=assistant,
    )
    print("--> [Agent Session] Assistant started in room.")

    # 4. Instant Greeting via Cartesia Sonic-3 Male Voice
    try:
        session.say(
            "Hi! I'm Jithendra's AI assistant. What would you like to explore?",
            allow_interruptions=True,
        )
    except Exception as e:
        print(f"--> [Agent Greeting Warning] {e}")

    # 5. Cleanly shutdown the job as soon as the user disconnects
    @ctx.room.on("participant_disconnected")
    def on_participant_disconnected(participant):
        if len(ctx.room.remote_participants) == 0:
            print("--> [Agent Session] Remote participant left room, shutting down job cleanly.")
            ctx.shutdown(reason="remote participant left")


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    agents.cli.run_app(server)