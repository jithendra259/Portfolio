"""
Agent Tools for Portfolio Interaction.
Broadcasts commands over LiveKit WebRTC data channel to control client-side UI in real time.
"""

import json
from livekit import rtc


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
