"""
Portfolio Greeter Agent.
Serves as the primary entry point for callers, providing high-level portfolio overview,
screen navigation, resume downloads, theme changes, and routing to specialist agents.
"""

from typing import Callable, Optional
from livekit import rtc
from livekit.agents import llm

from .base import PortfolioBaseAgent
from .userdata import PortfolioUserData
from prompts import SYSTEM_INSTRUCTIONS

GREETER_INSTRUCTIONS = f"""{SYSTEM_INSTRUCTIONS}

### GREETER SPECIALIST ROLE & RESPONSIBILITIES:
1. You are the initial host and primary navigator for Kandula Jithendra Subramanyam's portfolio.
2. Provide concise, friendly overviews of Jithendra's background:
   - M.Tech Artificial Intelligence at Amrita Vishwa Vidyapeetham (CGPA: 8.52/10).
   - Quantitative finance & AI researcher with 3 peer-reviewed publications (Elsevier EAAI, Springer Nature LNCS, Elsevier COR).
   - Proven builder in Autonomous Swarm Robotics (ESP32 mesh) and Voice AI Systems.
3. You can directly control the visitor's screen (navigate_portfolio), change theme (set_theme), and download resources (download_resource).
4. When the visitor wants deep mathematical analysis or peer-reviewed proof details:
   - Invoke `transfer_to_research(reason)` immediately.
5. When the visitor wants engineering, firmware, sensor fusion, or distributed systems details:
   - Invoke `transfer_to_engineering(reason)` immediately.
6. When the visitor asks to book an interview, meet Jithendra, or hire him:
   - Invoke `transfer_to_booking(reason)` immediately.
"""


class PortfolioGreeter(PortfolioBaseAgent):
    """Greeter agent welcoming visitors and routing to domain specialists."""

    def __init__(
        self,
        tools: list[llm.Tool | llm.Toolset],
        userdata: PortfolioUserData,
        get_room: Callable[[], Optional[rtc.Room]],
    ) -> None:
        super().__init__(
            agent_name="greeter",
            instructions=GREETER_INSTRUCTIONS,
            tools=tools,
            userdata=userdata,
            get_room=get_room,
        )
        self._greeted = False

    async def on_enter(self) -> None:
        """Greets visitor on first session start; otherwise performs smooth transition."""
        await super().on_enter()

        if not self._greeted and not self.userdata.prev_agent:
            self._greeted = True
            try:
                if hasattr(self, "session") and self.session:
                    self.session.say(
                        "Hi! I'm Jithendra's AI assistant. What would you like to explore?",
                        allow_interruptions=True,
                    )
            except Exception as e:
                print(f"--> [Greeter Greeting Warning] {e}")
        elif self.userdata.prev_agent:
            try:
                if hasattr(self, "session") and self.session:
                    self.session.say(
                        "I'm back with you on the main overview. How else can I help?",
                        allow_interruptions=True,
                    )
            except Exception as e:
                print(f"--> [Greeter Return Warning] {e}")
