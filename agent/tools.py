import json
from typing import Annotated, Callable

from livekit import rtc
from livekit.agents import llm


async def broadcast_navigation(room: rtc.Room | None, target: str) -> str:
    """
    Publishes a JSON navigation packet over the LiveKit data channel 'navigation'.
    Directs the frontend to scroll or switch routes to the requested target.
    """
    print(f"--> [Agent Tool] Navigating frontend to: {target}")

    if room and hasattr(room, "local_participant") and room.local_participant:
        try:
            payload = json.dumps({"type": "navigate", "target": target})
            await room.local_participant.publish_data(payload.encode("utf-8"), topic="navigation")
            print(f"--> [Agent Data Channel] Published navigation packet for '{target}' successfully.")
            return f"Successfully navigated screen to {target}."
        except Exception as e:
            print(f"--> [Agent Error] Failed to publish navigation packet: {e}")
            return f"Attempted navigation to {target}: {e}"

    print(f"--> [Agent Warning] No active room participant found to publish navigation.")
    return f"Navigation requested for {target}."


class NavigationToolset(llm.Toolset):
    """Modular toolset for real-time frontend screen navigation."""

    def __init__(self, get_room: Callable[[], rtc.Room | None]) -> None:
        @llm.function_tool(
            description=(
                "Auto-navigate the visitor's screen in real time to a specific portfolio section or research paper case study. "
                "Supported targets: 'projects', 'research', 'about', 'resume', 'contact', 'skills', 'certificates', "
                "'experience', 'home', 'case_study_adaptive_governance', 'case_study_regime_supervisory', "
                "'case_study_supervisory_xai', 'case_study_aqi', 'case_study_swarm_robotics'."
            )
        )
        async def navigate_portfolio(
            target: Annotated[
                str,
                "Target destination section or case study route name.",
            ],
        ) -> str:
            """Navigates user screen to the desired section."""
            room = get_room()
            return await broadcast_navigation(room, target)

        super().__init__(id="navigation", tools=[navigate_portfolio])


class ResearchToolset(llm.Toolset):
    """Modular toolset for deep mathematical analysis and peer-reviewed publication breakdowns."""

    def __init__(
        self,
        get_session: Callable[[], any],
        get_room: Callable[[], rtc.Room | None],
    ) -> None:
        from .reasoner import ResearchReasoner

        @llm.function_tool(
            description=(
                "Perform in-depth technical analysis and mathematical breakdowns for Jithendra's 3 research papers "
                "(Elsevier EAAI, Springer Nature LNCS, Elsevier COR) or engineering projects (AQI Forecasting, Swarm Robotics). "
                "Provides mathematical formulations (G-CVaR, Ledoit-Wolf alpha=0.42, CLARABEL interior-point SOCP solver), "
                "architecture graphs, and citation details while speaking natural fillers."
            )
        )
        async def research_paper_deep_dive(
            topic: Annotated[
                str,
                "The research paper title, mathematical concept (e.g. G-CVaR, Ledoit-Wolf, CLARABEL), or project name.",
            ],
        ) -> str:
            """Executes background research reasoner with non-blocking spoken filler."""
            session = get_session()
            room = get_room()
            return await ResearchReasoner.analyze_topic(session, room, topic)

        super().__init__(id="research", tools=[research_paper_deep_dive])


class SchedulingToolset(llm.Toolset):
    """Modular toolset for visitor meeting booking and collaboration requests."""

    def __init__(self, get_room: Callable[[], rtc.Room | None]) -> None:
        from .tasks import ScheduleMeetingTask

        @llm.function_tool(
            description=(
                "Initiate an interactive meeting scheduling, recruiter interview, or collaboration workflow. "
                "Delegates to a specialist supervisor task that collects visitor name, email, and topic, "
                "navigates to the contact screen, and logs the booking."
            )
        )
        async def schedule_meeting() -> str:
            """Launches ScheduleMeetingTask to gather contact details and book an appointment."""
            room = get_room()
            task = ScheduleMeetingTask(room=room)
            result = await task
            return (
                f"Meeting scheduled successfully! Name: {result.get('name')}, "
                f"Email: {result.get('email')}, Topic: {result.get('topic')}. "
                "Screen has been navigated to the contact section."
            )

        super().__init__(id="scheduling", tools=[schedule_meeting])


def build_portfolio_toolsets(
    get_session: Callable[[], any],
    get_room: Callable[[], rtc.Room | None],
) -> list[llm.Toolset]:
    """Factory creating all modular toolsets bound to the active session and room."""
    return [
        NavigationToolset(get_room),
        ResearchToolset(get_session, get_room),
        SchedulingToolset(get_room),
    ]
