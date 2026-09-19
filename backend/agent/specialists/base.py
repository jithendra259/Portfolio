"""
Base Specialist Agent for Multi-Agent Portfolio Architecture.
Implements context preservation, bounded history truncation (max_items=6),
non-blocking Supabase turn logging, and caption formatting.
"""

from collections.abc import AsyncIterable
import time
from typing import Any, Callable, Optional

from livekit import rtc
from livekit.agents import (
    Agent,
    FlushSentinel,
    ModelSettings,
    StopResponse,
    UserTurnExceededEvent,
    llm,
)

from agent.graph import route_portfolio_query
from agent.supabase_logger import log_turn
from .userdata import PortfolioUserData


class PortfolioBaseAgent(Agent):
    """
    Base class for all portfolio specialist agents.
    Provides uniform context truncation, Supabase analytics logging,
    and real-time screen awareness.
    """

    def __init__(
        self,
        agent_name: str,
        instructions: str,
        tools: list[llm.Tool | llm.Toolset],
        userdata: PortfolioUserData,
        get_room: Callable[[], Optional[rtc.Room]],
    ) -> None:
        self.agent_name = agent_name
        self.userdata = userdata
        self._get_room = get_room

        super().__init__(
            instructions=instructions,
            tools=tools,
        )

    async def on_enter(self) -> None:
        """
        Lifecycle hook invoked when this agent becomes active in the session.
        Preserves context from previous agent using bounded truncation (max_items=6),
        preventing unbounded token growth while ensuring conversational continuity.
        """
        print(f"--> [Agent Lifecycle] Entered '{self.agent_name}' specialist.")

        prev_agent = self.userdata.prev_agent
        if prev_agent and hasattr(prev_agent, "chat_ctx") and prev_agent.chat_ctx:
            try:
                # Copy previous chat context without prior internal handoff markers
                copied_ctx = prev_agent.chat_ctx.copy(
                    exclude_handoff=True,
                    exclude_config_update=True,
                    exclude_instructions=True,
                )
                # Bounded truncation to keep TTFT <100ms
                if len(copied_ctx.items) > 6:
                    copied_ctx.truncate(max_items=6)

                # Transfer items to this agent's chat context if not already present
                for item in copied_ctx.items:
                    if item not in self.chat_ctx.items:
                        self.chat_ctx.items.append(item)

                # Inject state summary
                summary = self.userdata.get_summary()
                if summary:
                    self.chat_ctx.add_message(
                        role="system",
                        content=f"[Session Context:\n{summary}]",
                    )
            except Exception as err:
                print(f"--> [Context Preservation Warning] {err}")

        # Async non-blocking record of agent entry to Supabase
        log_turn(
            session_id=self.userdata.session_id,
            role="system",
            content=f"Switched active agent to: {self.agent_name}",
            latency_ms=0.0,
            route="handoff",
            target_screen=self.userdata.active_screen,
            active_agent=self.agent_name,
        )

    async def on_user_turn_completed(
        self, turn_ctx: llm.ChatContext, new_message: llm.ChatMessage
    ) -> None:
        """
        Lifecycle hook called when user finishes speaking.
        Injects real-time page grounding and queues asynchronous Supabase turn logging.
        """
        if not new_message.text_content or not new_message.text_content.strip():
            raise StopResponse()

        start_time = time.time()
        user_text = new_message.text_content.strip()

        # Run fast LangGraph query routing & grounding with active screen context
        result = await route_portfolio_query(
            user_text,
            screen_context=self.userdata.screen_context or {"pathname": self.userdata.active_screen},
        )
        grounding = result.get("grounding") or result.get("context", "")

        if grounding:
            turn_ctx.add_message(
                role="assistant",
                content=f"[Verified Portfolio Context: {grounding}]",
            )

        elapsed_ms = (time.time() - start_time) * 1000.0

        # Non-blocking async log to Supabase
        log_turn(
            session_id=self.userdata.session_id,
            role="user",
            content=user_text,
            latency_ms=elapsed_ms,
            route=result.get("route", "direct"),
            target_screen=self.userdata.active_screen,
            active_agent=self.agent_name,
        )

    async def on_user_turn_exceeded(self, ev: UserTurnExceededEvent) -> None:
        """Polite interrupt handling for prolonged visitor turns."""
        print(f"--> [{self.agent_name} Watchdog] Turn exceeded: words={ev.accumulated_word_count}")
        if hasattr(self, "session") and self.session:
            await self.session.say(
                "Pardon the interruption, I want to make sure I cover everything for you—which specific area should we focus on?",
                allow_interruptions=True,
            )

    async def llm_node(
        self,
        chat_ctx: llm.ChatContext,
        tools: list[llm.Tool],
        model_settings: ModelSettings,
    ) -> AsyncIterable[llm.ChatChunk | str | FlushSentinel]:
        """Provides zero-latency speech cues during tool executions."""
        called_tools: list[llm.FunctionToolCall] = []
        has_text = False

        async for chunk in Agent.default.llm_node(self, chat_ctx, tools, model_settings):
            if isinstance(chunk, llm.ChatChunk) and chunk.delta:
                if chunk.delta.content:
                    has_text = True
                if chunk.delta.tool_calls:
                    called_tools.extend(chunk.delta.tool_calls)
            yield chunk

        tool_names = [tool.name for tool in called_tools]
        if not has_text:
            if any("navigate" in t for t in tool_names):
                yield "Navigating your screen now. "
                yield FlushSentinel()
            elif any("research" in t for t in tool_names):
                yield "Retrieving verified research data now. "
                yield FlushSentinel()
            elif any("booking" in t or "schedule" in t for t in tool_names):
                yield "Opening the meeting scheduler now. "
                yield FlushSentinel()

    async def transcription_node(
        self, text: AsyncIterable[str], model_settings: ModelSettings
    ) -> AsyncIterable[str]:
        """Sanitizes caption stream before sending over LiveKit data channel."""
        async for chunk in text:
            cleaned = (
                chunk.replace("**", "")
                .replace("###", "")
                .replace("##", "")
                .replace("`", "")
            )
            yield cleaned
