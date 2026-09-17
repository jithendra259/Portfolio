"""
Assistant Agent Definition.
Instantiates Jithendra's voice AI clone with custom instructions and real-time screen navigation tools.
"""

from typing import Annotated

from livekit import rtc
from livekit.agents import Agent, llm

from prompts import SYSTEM_INSTRUCTIONS
from .tools import broadcast_navigation


class Assistant(Agent):
    """Voice AI Persona and Screen Navigator for Kandula Jithendra Subramanyam."""

    def __init__(self, room: rtc.Room | None = None) -> None:
        self.room = room
        super().__init__(instructions=SYSTEM_INSTRUCTIONS)

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
