"""
Specialist Agent Tasks for Jithendra's Portfolio Assistant.
Implements the LiveKit Supervisor & Specialist Task Pattern.
"""

import json
from typing import Annotated

from livekit import rtc
from livekit.agents import AgentTask, llm

from .tools import broadcast_navigation


SCHEDULE_MEETING_INSTRUCTIONS = """
You are the Meeting & Collaboration Specialist for Kandula Jithendra Subramanyam.
Your sole goal is to politely collect the visitor's details to schedule a call, interview, or collaboration with Jithendra:
1. Visitor's Full Name
2. Email address
3. Discussion topic or purpose
4. Preferred date in YYYY-MM-DD format
5. Preferred time in 24-hour HH:MM format, India time

Guidelines:
- Keep voice answers very concise (<20 words).
- Ask for only the first missing detail; do not guess dates, times, or email addresses.
- Once all five details are available, immediately call the `submit_meeting_details` tool.
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
        email: Annotated[str, "The visitor's contact email address"],
        topic: Annotated[str, "Discussion topic or meeting purpose"],
        date: Annotated[str, "Preferred date in YYYY-MM-DD format"],
        time: Annotated[str, "Preferred time in 24-hour HH:MM format, India time"],
    ) -> str:
        """Submits complete visitor details to the browser booking workflow."""
        print(
            f"--> [ScheduleMeetingTask] Collected meeting request: name='{name}', "
            f"email='{email}', topic='{topic}', date='{date}', time='{time}'"
        )

        # Automatically open the dedicated booking form after collecting details.
        room = getattr(self, "room", None)
        if not room and hasattr(self, "session") and self.session and hasattr(self.session, "room_io") and self.session.room_io:
            room = getattr(self.session.room_io, "room", None)

        if room:
            booking_payload = json.dumps(
                {
                    "type": "booking_request",
                    "name": name,
                    "email": email,
                    "topic": topic,
                    "date": date,
                    "time": time,
                }
            )
            await room.local_participant.publish_data(
                booking_payload.encode("utf-8"),
                topic="assistant_action",
            )
            await broadcast_navigation(room, "book_appointment")

        data = {
            "name": name,
            "email": email,
            "topic": topic,
            "date": date,
            "time": time,
        }
        self.complete(data)
        return f"Appointment request submitted for {name} on {date} at {time}."
