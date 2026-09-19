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
from .graph import route_portfolio_query
from .tools import build_portfolio_toolsets


class Assistant(Agent):
    """Voice AI Persona and Screen Navigator for Kandula Jithendra Subramanyam."""

    def __init__(self, room: rtc.Room | None = None) -> None:
        self.room = room
        self.current_page = "/"
        self.page_context: dict = {"pathname": "/", "title": "Kandula Jithendra Subramanyam | AI & Quant Portfolio"}

        def _get_room() -> rtc.Room | None:
            r = getattr(self, "room", None)
            if not r and hasattr(self, "session") and self.session and hasattr(self.session, "room_io") and self.session.room_io:
                r = getattr(self.session.room_io, "room", None)
            return r

        def _get_session():
            return getattr(self, "session", None)

        toolsets = build_portfolio_toolsets(
            get_session=_get_session,
            get_room=_get_room,
            get_assistant=lambda: self,
        )
        super().__init__(
            instructions=SYSTEM_INSTRUCTIONS,
            tools=toolsets,
        )

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

    def set_page_context(self, context_data: dict | str) -> None:
        """Update the structured page context used for visitor screen awareness."""
        if isinstance(context_data, str):
            self.current_page = context_data.strip() or "/"
            self.page_context = {"pathname": self.current_page}
        elif isinstance(context_data, dict):
            self.page_context = context_data
            self.current_page = (context_data.get("pathname") or "/").strip()
        print(f"--> [Assistant] Active visitor screen updated to: {self.current_page}")

    def set_current_page(self, pathname: str) -> None:
        """Update the active page pathname."""
        self.set_page_context(pathname)

    def get_formatted_page_context(self) -> str:
        """Returns a rich, formatted description of what the visitor is viewing on their screen."""
        path = (self.current_page or "/").strip()
        title = ""
        if isinstance(self.page_context, dict):
            title = self.page_context.get("title") or ""

        page_descriptions: dict[str, str] = {
            "/": (
                "Main Portfolio Home Page (/) - Features interactive 3D Mascot Robot, About Me & Credentials, "
                "Three Peer-Reviewed Research Publications (Elsevier EAAI, Springer LNCS, Elsevier COR), "
                "Engineering Projects Showcase, Technical Skills Matrix, Career & Education Timeline, "
                "Verified Certifications (GATE DA & CS), and Contact & Booking Section."
            ),
            "/projects/adaptive-portfolio-governance": (
                "Case Study: Adaptive Portfolio Governance (Elsevier EAAI Paper, Manuscript EAAI-26-14280) - "
                "Title: 'Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk Portfolio Optimization with Adaptive Contagion Penalization'. "
                "Highlights: 5-agent blackboard architecture, SEC 13-F bipartite institutional co-holding networks, "
                "Graph-Regularized CVaR (G-CVaR) combined with Ledoit-Wolf shrinkage, achieving 25.9% reduction in CVaR-95% "
                "and 32.5% max drawdown containment over 20 years (2005-2025)."
            ),
            "/projects/regime-adaptive-supervisory-governance": (
                "Case Study: Regime-Adaptive Supervisory Governance (Springer Nature LNCS / IJCACI 2026 Paper) - "
                "Title: 'Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization'. "
                "Highlights: Instability Index I_t coupling covariance drift, rolling volatility, and correlation stress. "
                "Dynamically switches concentration limits and Ledoit-Wolf shrinkage (alpha=0.42) across Calm, Turbulent, and Crisis regimes."
            ),
            "/projects/supervisory-portfolio-xai-governance": (
                "Case Study: Supervisory Portfolio XAI Governance (Elsevier Computers & Operations Research) - "
                "Title: 'A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching & Conversational Explainability'. "
                "Highlights: 7-agent DAG architecture integrating CLARABEL convex interior-point solver with Mistral-7B conversational LLM. "
                "100% numerical grounding (0% hallucination), MiFID II and EU AI Act audit compliance."
            ),
            "/projects/voice-agent-portfolio-architecture": (
                "Case Study: Real-Time Voice AI Portfolio & Agentic Web Architecture - "
                "Highlights: Next.js 15 App Router, LiveKit WebRTC Cloud, Groq LPU (<90ms TTFT), "
                "Cartesia Sonic-3 neural TTS, Deepgram Nova-3 STT, and WebGL Aura shader audio visualizer."
            ),
            "/projects/agentic-portfolio-chatbot": (
                "Case Study: Agentic AI Portfolio Governance Chatbot - "
                "Highlights: M.Tech thesis project with sub-200ms TTFT, LangGraph supervisor, and CLARABEL convex solver integration."
            ),
            "/projects/personalised-aqi-system": (
                "Case Study: Personalised AQI Global Air Quality Forecasting - "
                "Highlights: Machine learning pipeline using XGBoost ensemble across 10 Delhi CPCB stations, "
                "achieving R² = 0.912 and RMSE 18.4 ug/m3 for 48-hour PM2.5 forecasting."
            ),
            "/projects/swarm-robots-agriculture": (
                "Case Study: Autonomous Swarm Robots for Precision Agriculture - "
                "Highlights: Distributed hardware swarm using ESP32, ESP-NOW mesh network, edge CNNs (DenseNet121). "
                "98.4% field coverage, 96.8% disease classification. KSCST 46th Series grant winner."
            ),
            "/book-appointment": (
                "Interactive Meeting Booking Page (/book-appointment) - "
                "Allows visitors, recruiters, and collaborators to book a 30-minute meeting with Jithendra with automated Google Meet link generation."
            ),
        }

        desc = page_descriptions.get(path)
        if not desc:
            for k, v in page_descriptions.items():
                if k != "/" and k in path:
                    desc = v
                    break
        if not desc:
            desc = f"Portfolio Screen Path: '{path}'" + (f" | Title: '{title}'" if title else "")
        return desc

    async def on_user_turn_completed(
        self, turn_ctx: llm.ChatContext, new_message: llm.ChatMessage
    ) -> None:
        """
        Lifecycle hook called when the user finishes speaking or typing, before LLM response generation.
        Continuously grounds the assistant with the active screen and performs domain routing.
        """
        if not new_message.text_content or not new_message.text_content.strip():
            print("--> [Assistant Hook] on_user_turn_completed: Empty utterance detected, stopping response.")
            raise StopResponse()

        # Always inject active screen awareness into the turn context
        page_info = self.get_formatted_page_context()
        screen_grounding = f"[Active Visitor Screen: {page_info}]"

        result = await route_portfolio_query(new_message.text_content)
        context = result.get("context", "")
        target = result.get("target")

        combined_grounding = (
            f"{screen_grounding} "
            + (f"[LangGraph Domain Grounding] {context} " if context else "")
            + (f"Target screen route: '{target}'." if target else "")
        ).strip()

        turn_ctx.add_message(
            role="assistant",
            content=combined_grounding,
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
        if not has_text_message:
            if "navigate_portfolio" in tool_names:
                yield "Navigating your screen now. "
                yield FlushSentinel()
            elif "research_paper_deep_dive" in tool_names:
                yield "Analyzing the technical architecture from the publication now. "
                yield FlushSentinel()
            elif "schedule_meeting" in tool_names:
                yield "Connecting you with the meeting scheduler now. "
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
