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
from prompts.knowledge import PAGE_KNOWLEDGE
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
        data = PAGE_KNOWLEDGE.get(path)
        if not data:
            for k, v in PAGE_KNOWLEDGE.items():
                if k != "/" and k in path:
                    data = v
                    break

        if data:
            title = data.get("title", path)
            summary = data.get("summary", "")
            math_rigor = data.get("mathematical_rigor", "")
            results = data.get("empirical_results", [])
            agents = data.get("architecture_agents", [])

            parts = [f"Path: {path}", f"Title: {title}", f"Overview: {summary}"]
            if agents:
                parts.append("Key Architecture Agents: " + " | ".join(agents[:3]))
            if math_rigor:
                parts.append(f"Formulation: {math_rigor}")
            if results:
                parts.append("Key Results: " + " | ".join(results[:2]))
            return " | ".join(parts)

        title = self.page_context.get("title", "") if isinstance(self.page_context, dict) else ""
        return f"Portfolio Screen: '{path}'" + (f" | Title: '{title}'" if title else "")

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
