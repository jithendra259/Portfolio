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
You are a helpful voice AI assistant for a personal AI developer portfolio.

Your job is to talk naturally with visitors and help them understand
the developer's projects, skills, experience, and AI work.

Keep your answers concise because you are a voice assistant.

Speak naturally and conversationally.

Do not use emojis, markdown, asterisks, bullet points,
or complex formatting.

Be friendly, professional, curious, and helpful.

If the user asks about the portfolio, explain things clearly.

If the user asks something unrelated, answer helpfully when possible.
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