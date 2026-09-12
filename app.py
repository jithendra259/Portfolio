from pathlib import Path
from dotenv import load_dotenv
from livekit import agents
from livekit.agents.inference import TurnDetector
from livekit.agents import llm, stt, tts, inference, vad
from livekit.plugins import cartesia, deepgram, google, silero, ai_coustics
from livekit.plugins import openai
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    TurnHandlingOptions,
    room_io,
)


# ============================================================
# ENVIRONMENT
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env.local")


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
You are the voice AI clone and interactive portfolio assistant for Kandula Jithendra Subramanyam.

About Jithendra:
- M.Tech in Artificial Intelligence & Data Science at K J Somaiya College of Engineering, Mumbai (CGPA: 8.06).
- B.Tech in Electronics & Communication Engineering from Presidency University, Bangalore (CGPA: 7.77).
- Core Specialization: Agentic AI, Multi-Agent Systems, Portfolio Governance, Quantitative Finance, Explainable AI, and Full-Stack Development.
- Contact: kandulajithendrasubramanyam@gmail.com, +91-9704400336, based in Mumbai, India.

Key Research Papers (2026):
1. 'Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk Portfolio Optimization with Adaptive Contagion Penalization' (Elsevier EAAI, Under Review 2026). Formulates 5-agent blackboard architecture, SEC 13-F bipartite graph, and G-CVaR with 25.9% risk reduction.
2. 'Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization' (Presented & Accepted at IJCACI 2026 / Springer Nature LNCS). Integrates instability index I_t, Ledoit-Wolf shrinkage, and 32.5% max drawdown containment over 2005-2025.
3. 'A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching & Conversational Explainability' (Elsevier Computers & Operations Research / CAS Journal, Under Review 2026). Features 7-agent DAG with 100% numerical grounding (0% hallucination) under MiFID II & EU AI Act.

Key Projects:
1. Agentic AI Portfolio Governance Chatbot: Multi-agent system using LangChain/LangGraph, CVXPY, CLARABEL, NetworkX, Mistral-7B via Ollama, YFinance, and MongoDB. Includes 10+ specialized agents.
2. Multi-Agent Adaptive Portfolio Governance System: Financial decision intelligence combining risk-aware portfolio construction and governance checks.
3. Personalised AQI Global Air Quality Forecasting: Next.js and Flask platform with ML forecasting for PM2.5, O3, NO2 using live AQICN data.
4. Swarm Robots for Agriculture: IoT sensors, embedded systems, and computer vision for crop disease detection.

Auto-Navigation Capability:
- You have the ability to automatically navigate and scroll the visitor's screen in real time using your `navigate_portfolio` tool.
- When the visitor asks to see, view, scroll, or go to any section, paper, or case study (e.g. 'show me your projects', 'take me to research', 'open your resume', 'how can I contact you', 'open the EAAI case study'), ALWAYS call `navigate_portfolio` with the appropriate target and tell the visitor you are navigating their screen there.

Voice Response Style:
- Answer naturally, conversationally, concisely, and confidently.
- Since you are a voice agent, keep responses under 2-3 sentences unless asked for deeper technical detail.
- Do not use markdown, emojis, asterisks, bullet points, or complex formatting in speech.
- Represent Jithendra accurately and highlight his strong expertise in Agentic AI and Quantitative Finance.
"""
        )

    @llm.ai_callable(description="Auto-navigate the visitor's screen in real time to a specific portfolio section or research paper case study.")
    async def navigate_portfolio(
        self,
        target: Annotated[
            str,
            llm.TypeInfo(
                description="Target destination: 'projects', 'research', 'about', 'resume', 'contact', 'skills', 'certificates', 'experience', 'home', 'case_study_adaptive_governance', 'case_study_regime_supervisory', 'case_study_supervisory_xai', 'case_study_aqi', 'case_study_swarm_robotics'"
            ),
        ],
    ) -> str:
        """Navigates the user's browser to the requested section or case study."""
        if self.room and hasattr(self.room, "local_participant") and self.room.local_participant:
            try:
                payload = json.dumps({"type": "navigate", "target": target})
                await self.room.local_participant.publish_data(payload.encode("utf-8"), topic="navigation")
                return f"Successfully navigated screen to {target}."
            except Exception as e:
                return f"Attempted navigation to {target}: {e}"
        return f"Navigation requested for {target}."



# ============================================================
# LIVEKIT SERVER
# ============================================================

server = AgentServer()

# ============================================================
# VOICE AGENT
# ============================================================

@server.rtc_session(agent_name="my-agent")
async def my_agent(ctx: agents.JobContext):

    session = AgentSession(

        # ====================================================
        # SPEECH TO TEXT (Deepgram Plugin)
        # ====================================================
        stt=stt.FallbackAdapter(
            [
                inference.STT.from_model_string("assemblyai/universal-streaming:en"),
                inference.STT.from_model_string("deepgram/nova-3"),
            ]

        ),

        # ====================================================
        # VOICE ACTIVITY DETECTION (Silero VAD)
        # ====================================================
        vad=silero.VAD.load(),

        # ====================================================
        # LLM (Google Gemini)
        # ====================================================
        llm=llm.FallbackAdapter(
            [
                inference.LLM(model="qwen3:1.7b", base_url="http://localhost:11434/v1"),
                inference.LLM(model="google/gemini-2.5-flash")
            ]
        ),
       
        turn_detection=TurnDetector(),

        # ====================================================
        # TEXT TO SPEECH (Cartesia Plugin)
        # ====================================================
        tts=cartesia.TTS(
            model="sonic-3",
            voice="f786b574-daa5-4673-aa0c-cbe3e8534c02",
            language="en",
            speed=1.05,
        ),

        # ====================================================
        # TURN HANDLING & QUOTA MANAGEMENT
        # ====================================================
        preemptive_generation=False,
        turn_handling=TurnHandlingOptions(
            allow_interruptions=True,
        ),
    )


    # ========================================================
    # START SESSION
    # ========================================================

    await session.start(

        room=ctx.room,

        agent=Assistant(room=ctx.room),

        room_options=room_io.RoomOptions(

            audio_input=room_io.AudioInputOptions(

                noise_cancellation=ai_coustics.audio_enhancement(
                    model=ai_coustics.EnhancerModel.QUAIL_VF_S,
                ),

            ),
        ),
    )


    # ========================================================
    # INITIAL GREETING
    # ========================================================

    await session.generate_reply(

        instructions="""
Greet the visitor briefly.

Introduce yourself as the AI voice assistant
for this portfolio.

Then ask how you can help them.
"""
    )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    agents.cli.run_app(server)