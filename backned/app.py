from pathlib import Path
from dotenv import load_dotenv
from livekit import agents
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

class Assistant(Agent):

    def __init__(self) -> None:

        super().__init__(
            instructions="""
You are the voice AI clone and interactive portfolio assistant for Kandula Jithendra Subramanyam.

About Jithendra:
- M.Tech in Artificial Intelligence & Data Science at K J Somaiya College of Engineering, Mumbai (CGPA: 8.06).
- B.Tech in Electronics & Communication Engineering from Presidency University, Bangalore (CGPA: 7.77).
- Core Specialization: Agentic AI, Multi-Agent Systems, Portfolio Governance, Quantitative Finance, Explainable AI, and Full-Stack Development.
- Contact: kandulajithendrasubramanyam@gmail.com, +91-9704400336, based in Mumbai, India.

Key Research Papers (Under Review, 2026):
1. 'Multi-Agent Adaptive Portfolio Governance System' submitted to Elsevier Engineering Applications of Artificial Intelligence (EAAI). Focuses on agentic orchestration, convex portfolio optimization (CVXPY), regime adaptation, instability detection, and governance validation.
2. 'Agentic AI Portfolio Governance / Financial Intelligence' submitted to Springer Conference Proceedings. Focuses on compliance-aware financial AI, anti-hallucination controls, and audit logging.

Key Projects:
1. Agentic AI Portfolio Governance Chatbot: Multi-agent system using LangChain/LangGraph, CVXPY, CLARABEL, NetworkX, Mistral-7B via Ollama, YFinance, and MongoDB. Includes 10+ specialized agents (planning, technical analysis, regime detection, optimization, explainability, and verification).
2. Multi-Agent Adaptive Portfolio Governance System: Financial decision intelligence combining risk-aware portfolio construction and governance checks.
3. Personalised AQI Global Air Quality Forecasting: Next.js and Flask platform with ML forecasting for PM2.5, O3, NO2 using live AQICN data.
4. Swarm Robots for Agriculture: IoT sensors, embedded systems, and computer vision for crop disease detection.

Work Experience:
- Thesis Researcher at K J Somaiya College of Engineering (Oct 2025 - Apr 2026).
- Full-Stack Developer Intern at ScholarRankAI (May 2025 - Aug 2025).
- UI/UX Developer Intern at MNJ Software (Mar 2024 - May 2024).

Voice Response Style:
- Answer naturally, conversationally, concisely, and confidently.
- Since you are a voice agent, keep responses under 2-3 sentences unless asked for deeper technical detail.
- Do not use markdown, emojis, asterisks, bullet points, or complex formatting in speech.
- Represent Jithendra accurately and highlight his strong expertise in Agentic AI and Quantitative Finance.
"""
        )



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
        stt=deepgram.STT(
            model="nova-3",
        ),

        # ====================================================
        # VOICE ACTIVITY DETECTION (Silero VAD)
        # ====================================================
        vad=silero.VAD.load(),

        # ====================================================
        # LLM (Google Gemini)
        # ====================================================
        llm=openai.LLM.with_ollama(
        model="qwen3:1.7b",
        base_url="http://localhost:11434/v1",
    ),


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

        agent=Assistant(),

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