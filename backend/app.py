"""
Application Entrypoint for LiveKit Voice Agent Worker.
"""

from livekit import agents
from server import server

if __name__ == "__main__":
    agents.cli.run_app(server)
