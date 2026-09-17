"""
Assistant Agent Definition.
Instantiates Jithendra's voice AI clone with custom instructions, real-time screen navigation tools,
lifecycle hooks (on_enter, on_exit, on_user_turn_completed), and transcription stream filtering.
"""

from collections.abc import AsyncIterable
from typing import Annotated

from livekit import rtc
from livekit.agents import (
    Agent,
    FlushSentinel,
    ModelSettings,
    StopResponse,
    UserTurnExceededEvent,
    llm,
)

from prompts import SYSTEM_INSTRUCTIONS
from .tools import broadcast_navigation


class Assistant(Agent):
    """Voice AI Persona and Screen Navigator for Kandula Jithendra Subramanyam."""

    def __init__(self, room: rtc.Room | None = None) -> None:
        self.room = room
        super().__init__(instructions=SYSTEM_INSTRUCTIONS)

    async def on_enter(self) -> None:
        """
        Lifecycle hook called when the agent becomes active in the session.
        Greets the visitor immediately via Cartesia Sonic-3 voice.
        """
        print("--> [Assistant Hook] on_enter: Greeting visitor.")
        try:
            self.session.say(
                "Hi! I'm Jithendra's AI assistant. What would you like to explore?",
                allow_interruptions=True,
            )
        except Exception as e:
            print(f"--> [Assistant Hook Warning] Greeting error: {e}")

    async def on_user_turn_completed(
        self, turn_ctx: llm.ChatContext, new_message: llm.ChatMessage
    ) -> None:
        """
        Lifecycle hook called when the user finishes speaking or typing, before LLM response generation.
        Performs precise domain grounding for Jithendra's research papers and engineering projects.
        """
        # If the user turn contains no recognizable text, halt generation to prevent hallucinated audio
        if not new_message.text_content or not new_message.text_content.strip():
            print("--> [Assistant Hook] on_user_turn_completed: Empty utterance detected, stopping response.")
            raise StopResponse()

        query = (new_message.text_content or "").lower()

        # Paper 1: Elsevier EAAI Grounding
        if any(k in query for k in ["eaai", "g-cvar", "contagion", "fire sale", "bipartite"]):
            turn_ctx.add_message(
                role="assistant",
                content=(
                    "[Context Guidance] User query relates to Research Paper 1 (Elsevier EAAI 2026, manuscript EAAI-26-14280): "
                    "5-agent blackboard architecture, G-CVaR, Ledoit-Wolf shrinkage, SEC 13-F bipartite graphs. "
                    "Target screen route: 'case_study_adaptive_governance'."
                ),
            )
        # Paper 2: Springer Nature LNCS Grounding
        elif any(k in query for k in ["lncs", "ijcaci", "instability index", "regime adaptive", "covariance drift"]):
            turn_ctx.add_message(
                role="assistant",
                content=(
                    "[Context Guidance] User query relates to Research Paper 2 (Springer Nature LNCS / IJCACI 2026, WUST Washington): "
                    "Composite Instability Index, covariance drift, Ledoit-Wolf shrinkage (alpha=0.42). "
                    "Target screen route: 'case_study_regime_supervisory'."
                ),
            )
        # Paper 3: Elsevier Computers & Operations Research (COR) Grounding
        elif any(k in query for k in ["cor", "clarabel", "convex solver", "grounding", "xai", "supervisory portfolio"]):
            turn_ctx.add_message(
                role="assistant",
                content=(
                    "[Context Guidance] User query relates to Research Paper 3 (Elsevier COR 2026): "
                    "7-agent DAG architecture, CLARABEL interior-point solver, 100% numerical grounding, MiFID II / EU AI Act. "
                    "Target screen route: 'case_study_supervisory_xai'."
                ),
            )
        # Project: AQI Air Quality Forecasting
        elif any(k in query for k in ["aqi", "air quality", "xgboost", "pm2.5", "delhi"]):
            turn_ctx.add_message(
                role="assistant",
                content=(
                    "[Context Guidance] User query relates to AQI Global Air Quality Forecasting: "
                    "CPCB sensor data across 10 Delhi stations, XGBoost R2=0.912 and RMSE=18.4 ug/m3. "
                    "Target screen route: 'case_study_aqi'."
                ),
            )
        # Project: Autonomous Swarm Robotics
        elif any(k in query for k in ["swarm", "agriculture", "robot", "esp32", "kscst", "densenet"]):
            turn_ctx.add_message(
                role="assistant",
                content=(
                    "[Context Guidance] User query relates to Autonomous Precision Agriculture Swarm Robots: "
                    "ESP32 ESP-NOW mesh, DenseNet121, 98.4% field coverage, KSCST 46th Series Grant. "
                    "Target screen route: 'case_study_swarm_robotics'."
                ),
            )

    async def on_user_turn_exceeded(self, ev: UserTurnExceededEvent) -> None:
        """
        Lifecycle hook called when the visitor speaks past configured word or duration thresholds.
        Steps in politely so the visitor receives timely, guided assistance without monologue delays.
        """
        print(f"--> [Assistant Hook] on_user_turn_exceeded: words={ev.accumulated_word_count}, duration={ev.duration:.1f}s")
        await self.session.say(
            "Pardon the interruption, I want to make sure I cover everything for you—which specific project, research paper, or skill should we focus on?",
            allow_interruptions=True,
        )

    async def llm_node(
        self,
        chat_ctx: llm.ChatContext,
        tools: list[llm.Tool],
        model_settings: ModelSettings,
    ) -> AsyncIterable[llm.ChatChunk | str | FlushSentinel]:
        """
        LLM processing node: intercepts generation stream.
        If the model invokes navigate_portfolio without an accompanying text delta,
        emits an immediate spoken acknowledgment and FlushSentinel to provide zero-latency
        speech feedback before the screen navigation completes.
        """
        called_tools: list[llm.FunctionToolCall] = []
        has_text_message = False

        async for chunk in Agent.default.llm_node(self, chat_ctx, tools, model_settings):
            if isinstance(chunk, llm.ChatChunk) and chunk.delta:
                if chunk.delta.content:
                    has_text_message = True
                if chunk.delta.tool_calls:
                    called_tools.extend(chunk.delta.tool_calls)
            yield chunk

        tool_names = [tool.name for tool in called_tools]
        if not has_text_message and "navigate_portfolio" in tool_names:
            yield "Navigating your screen now. "
            yield FlushSentinel()

    async def transcription_node(
        self, text: AsyncIterable[str], model_settings: ModelSettings
    ) -> AsyncIterable[str]:
        """
        Transcription node hook: sanitizes text before streaming it to the client via lk.transcription.
        Ensures raw Markdown emphasis asterisks and headers do not leak into live captions.
        """
        async for chunk in text:
            cleaned = (
                chunk.replace("**", "")
                .replace("###", "")
                .replace("##", "")
                .replace("`", "")
            )
            yield cleaned

    async def on_exit(self) -> None:
        """Lifecycle hook called when the agent relinquishes control or session ends."""
        print("--> [Assistant Hook] on_exit: Session concluded.")

    @llm.function_tool(
        description="Auto-navigate the visitor's screen in real time to a specific portfolio section or research paper case study."
    )
    async def navigate_portfolio(
        self,
        target: Annotated[
            str,
            "Target destination: 'projects', 'research', 'about', 'resume', 'contact', 'skills', 'certificates', 'experience', 'home', 'case_study_adaptive_governance', 'case_study_regime_supervisory', 'case_study_supervisory_xai', 'case_study_aqi', 'case_study_swarm_robotics'",
        ],
    ) -> str:
        """Navigates the user's browser to the requested section or case study."""
        room = getattr(self, "room", None)
        if not room and hasattr(self, "session") and self.session and hasattr(self.session, "room_io") and self.session.room_io:
            room = getattr(self.session.room_io, "room", None)

        return await broadcast_navigation(room, target)
