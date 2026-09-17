"""
Specialist Agent Tasks for Jithendra's Portfolio Assistant.
Implements the LiveKit Supervisor & Specialist Task Pattern.
"""

from typing import Annotated

from livekit import rtc
from livekit.agents import AgentTask, llm

from .tools import broadcast_navigation


SCHEDULE_MEETING_INSTRUCTIONS = """
You are the Meeting & Collaboration Specialist for Kandula Jithendra Subramanyam.
Your sole goal is to politely collect the visitor's details to schedule a call, interview, or collaboration with Jithendra:
1. Visitor's Full Name
2. Email address (or phone / LinkedIn)
3. Topic, inquiry reason, or preferred meeting date/time

Guidelines:
- Keep voice answers very concise (<20 words).
- Once the user provides their name, email, and topic, immediately call the `submit_meeting_details` tool.
- If any detail is missing, ask for only the missing detail.
"""


class ScheduleMeetingTask(AgentTask[dict]):
    """
    Dedicated supervisor task to handle meeting scheduling, interview requests, and recruiter contact.
    Completes with a structured dictionary containing visitor details.
    """

    def __init__(self, room: rtc.Room | None = None) -> None:
        self.room = room
        super().__init__(instructions=SCHEDULE_MEETING_INSTRUCTIONS)

    async def on_enter(self) -> None:
        """Called when this task takes control of the active session."""
        print("--> [ScheduleMeetingTask] Activated: Prompting visitor for contact details.")
        try:
            self.session.say(
                "I'd love to help arrange a meeting with Jithendra. Could you share your name, email, and what you'd like to discuss?",
                allow_interruptions=True,
            )
        except Exception as e:
            print(f"--> [ScheduleMeetingTask Warning] on_enter error: {e}")

    @llm.function_tool(
        description="Submit the collected meeting request details, auto-navigate to the contact screen, and conclude the scheduling task."
    )
    async def submit_meeting_details(
        self,
        name: Annotated[str, "The visitor's full name"],
        email: Annotated[str, "The visitor's contact email address or phone"],
        topic: Annotated[str, "Discussion topic, interview purpose, or preferred meeting date/time"],
    ) -> str:
        """Navigates to the contact screen and completes the task with visitor info."""
        print(f"--> [ScheduleMeetingTask] Collected meeting request: name='{name}', email='{email}', topic='{topic}'")

        # Automatically navigate visitor screen to contact & booking section
        room = getattr(self, "room", None)
        if not room and hasattr(self, "session") and self.session and hasattr(self.session, "room_io") and self.session.room_io:
            room = getattr(self.session.room_io, "room", None)

        if room:
            await broadcast_navigation(room, "contact")

        data = {
            "name": name,
            "email": email,
            "topic": topic,
        }
        self.complete(data)
        return f"Meeting request confirmed for {name}. Screen navigated to contact."
