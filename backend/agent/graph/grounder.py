"""
Screen grounder node for the LangGraph workflow.
Injects real-time WebRTC telemetry and structured page context.
"""

from typing import Any
from prompts.knowledge import PAGE_KNOWLEDGE
from .state import PortfolioGraphState


def screen_grounder_node(state: PortfolioGraphState) -> dict[str, Any]:
    """Enriches state with structured knowledge about what the visitor is actively viewing on their screen."""
    screen_ctx = state.get("screen_context", {})
    pathname = (screen_ctx.get("pathname") or "/").strip()

    data = PAGE_KNOWLEDGE.get(pathname)
    if not data:
        for k, v in PAGE_KNOWLEDGE.items():
            if k != "/" and k in pathname:
                data = v
                break

    if data:
        title = data.get("title", pathname)
        summary = data.get("summary", "")
        math_rigor = data.get("mathematical_rigor", "")
        agents = " | ".join(data.get("architecture_agents", [])[:3])
        results = " | ".join(data.get("empirical_results", [])[:2])

        screen_summary = f"Visitor is viewing '{title}' ({pathname}). Overview: {summary}"
        if agents:
            screen_summary += f" Key Agents: {agents}."
        if math_rigor:
            screen_summary += f" Math formulation: {math_rigor}."
        if results:
            screen_summary += f" Key Metrics: {results}."
    else:
        screen_summary = f"Visitor is viewing page '{pathname}'."

    return {"context": screen_summary}
