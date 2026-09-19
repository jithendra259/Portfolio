"""
Handoff Tools for Multi-Agent Portfolio System.
Enables seamless LiveKit agent-to-agent transfers using session.update_agent
with shared userdata preservation, matching the LiveKit Restaurant Agent recipe.
"""

from typing import Annotated, Callable
from livekit.agents import llm
from .userdata import PortfolioUserData
from agent.supabase_logger import log_turn


def create_handoff_tools(userdata: PortfolioUserData, get_session: Callable[[], any]) -> list[llm.FunctionTool]:
    """Factory creating handoff tools bound to the active session and shared userdata."""

    @llm.function_tool(
        description=(
            "Transfer the conversation to the Research Specialist agent for deep mathematical rigor, "
            "empirical formulas (G-CVaR, Ledoit-Wolf shrinkage, CLARABEL interior-point SOCP), "
            "or peer-reviewed publication breakdowns (Elsevier EAAI, Springer Nature LNCS, Elsevier COR)."
        )
    )
    async def transfer_to_research(
        reason: Annotated[str, "The specific research topic, mathematical question, or paper to explore."],
    ):
        """Transfers active agent to ResearchSpecialist."""
        session = get_session()
        target = userdata.agents.get("research")
        if not session or not target:
            return "Research Specialist is ready to answer your technical questions right now."

        current = getattr(session, "current_agent", None) or userdata.agents.get("greeter")
        userdata.prev_agent = current
        userdata.record_topic(f"Research: {reason}")

        # Preserve bounded conversation history without system prompt overhead
        if current and hasattr(current, "chat_ctx") and current.chat_ctx:
            try:
                target.chat_ctx = current.chat_ctx.copy(
                    exclude_instructions=True,
                    exclude_handoff=True,
                    exclude_config_update=True,
                ).truncate(max_items=6)
            except Exception:
                pass

        log_turn(
            session_id=userdata.session_id,
            role="system",
            content=f"Handoff from {getattr(current, 'agent_name', 'agent')} to research: {reason}",
            active_agent="research",
            target_screen=userdata.active_screen,
        )

        session.update_agent(target)
        return target, f"Transferring you to our Research Specialist to examine {reason} in depth."

    @llm.function_tool(
        description=(
            "Transfer the conversation to the Engineering Specialist agent for real-world ML systems, "
            "Autonomous Swarm Robotics (ESP32 mesh & decentralized consensus), Personalised AQI Forecasting (XGBoost), "
            "or Voice AI pipeline architecture (LiveKit, Cartesia, Deepgram, Groq LPU, Supabase)."
        )
    )
    async def transfer_to_engineering(
        reason: Annotated[str, "The specific project, engineering implementation, or architecture to discuss."],
    ):
        """Transfers active agent to EngineeringSpecialist."""
        session = get_session()
        target = userdata.agents.get("engineering")
        if not session or not target:
            return "Engineering Specialist is ready to discuss technical implementations right now."

        current = getattr(session, "current_agent", None) or userdata.agents.get("greeter")
        userdata.prev_agent = current
        userdata.record_topic(f"Engineering: {reason}")

        if current and hasattr(current, "chat_ctx") and current.chat_ctx:
            try:
                target.chat_ctx = current.chat_ctx.copy(
                    exclude_instructions=True,
                    exclude_handoff=True,
                    exclude_config_update=True,
                ).truncate(max_items=6)
            except Exception:
                pass

        log_turn(
            session_id=userdata.session_id,
            role="system",
            content=f"Handoff from {getattr(current, 'agent_name', 'agent')} to engineering: {reason}",
            active_agent="engineering",
            target_screen=userdata.active_screen,
        )

        session.update_agent(target)
        return target, f"Connecting you with our Engineering Specialist to discuss {reason}."

    @llm.function_tool(
        description=(
            "Transfer the conversation to the Booking Specialist agent to schedule a meeting, "
            "recruiter interview, or technical collaboration with Jithendra."
        )
    )
    async def transfer_to_booking(
        reason: Annotated[str, "The purpose or topic of the requested meeting/interview."],
    ):
        """Transfers active agent to BookingSpecialist."""
        session = get_session()
        target = userdata.agents.get("booking")
        if not session or not target:
            return "Booking Specialist is ready to arrange a meeting right now."

        current = getattr(session, "current_agent", None) or userdata.agents.get("greeter")
        userdata.prev_agent = current
        userdata.record_topic(f"Booking: {reason}")

        if current and hasattr(current, "chat_ctx") and current.chat_ctx:
            try:
                target.chat_ctx = current.chat_ctx.copy(
                    exclude_instructions=True,
                    exclude_handoff=True,
                    exclude_config_update=True,
                ).truncate(max_items=6)
            except Exception:
                pass

        log_turn(
            session_id=userdata.session_id,
            role="system",
            content=f"Handoff from {getattr(current, 'agent_name', 'agent')} to booking: {reason}",
            active_agent="booking",
            target_screen="/book-appointment",
        )

        session.update_agent(target)
        return target, "Transferring you to our Booking Specialist to reserve time on Jithendra's calendar."

    @llm.function_tool(
        description=(
            "Transfer back to the Portfolio Greeter agent for general portfolio overview, "
            "candidate summary, color theme changes, resume downloads, or general navigation."
        )
    )
    async def transfer_to_greeter(
        reason: Annotated[str, "The reason for returning to the main overview."],
    ):
        """Transfers active agent back to PortfolioGreeter."""
        session = get_session()
        target = userdata.agents.get("greeter")
        if not session or not target:
            return "Welcome back to the main portfolio overview."

        current = getattr(session, "current_agent", None)
        userdata.prev_agent = current

        if current and hasattr(current, "chat_ctx") and current.chat_ctx:
            try:
                target.chat_ctx = current.chat_ctx.copy(
                    exclude_instructions=True,
                    exclude_handoff=True,
                    exclude_config_update=True,
                ).truncate(max_items=6)
            except Exception:
                pass

        log_turn(
            session_id=userdata.session_id,
            role="system",
            content=f"Handoff back to greeter: {reason}",
            active_agent="greeter",
            target_screen=userdata.active_screen,
        )

        session.update_agent(target)
        return target, "Returning to the main portfolio overview."

    @llm.function_tool(
        description="Update or remember the visitor's name and email address across the conversation."
    )
    async def update_visitor_info(
        name: Annotated[str, "Visitor's full name or greeting name."] = "",
        email: Annotated[str, "Visitor's work or personal email address."] = "",
    ) -> str:
        """Records visitor contact details in shared userdata."""
        userdata.set_visitor(name=name, email=email)
        return f"Visitor profile updated: name='{userdata.visitor_name or 'N/A'}', email='{userdata.visitor_email or 'N/A'}'."

    return [
        transfer_to_research,
        transfer_to_engineering,
        transfer_to_booking,
        transfer_to_greeter,
        update_visitor_info,
    ]
