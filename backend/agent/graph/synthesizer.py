"""
Synthesis node for the LangGraph workflow.
Compiles screen context, destination routes, and vector RAG citations into factual speech grounding.
"""

from typing import Any
from agent.rag import get_retriever
from prompts.knowledge import BIOGRAPHY, TECHNICAL_SKILLS
from .state import PortfolioGraphState


def ground_and_synthesize_node(state: PortfolioGraphState) -> dict[str, Any]:
    """Synthesizes screen context, vector citations, and domain knowledge into concise speech grounding."""
    route = state.get("route", "general_inquiry")
    target = state.get("target")
    screen_context = state.get("context", "")
    retrieved_chunks = state.get("retrieved_chunks", [])

    parts = []

    # 1. Include screen context if visitor asked about their screen
    if screen_context:
        parts.append(f"[Active Visitor Screen: {screen_context}]")

    # 2. Target navigation cue if applicable
    if target and route not in ("resource", "theme"):
        parts.append(f"[Destination Screen Target: '{target}']")

    # 3. Action direct cues
    if route == "resource":
        parts.append(f"[Action: Visitor wants to download the {target} file. Use the download_resource tool.]")
    elif route == "theme":
        parts.append(f"[Action: Visitor wants to switch to {target} mode. Use the set_theme tool.]")
    elif route == "booking":
        parts.append("[Action: Visitor wants to book a meeting. Direct to scheduling / contact section.]")

    # 4. Formatted Vector RAG Citations
    if retrieved_chunks:
        retriever = get_retriever()
        citations_text = retriever.format_grounding(retrieved_chunks, max_chars=550)
        if citations_text:
            parts.append(f"[RAG Knowledge Citations: {citations_text}]")

    # 5. Fallback profile grounding if vector chunks are sparse
    if not retrieved_chunks and route in ("profile", "education", "skills"):
        skills = ", ".join(skill for group in TECHNICAL_SKILLS.values() for skill in group[:3])
        parts.append(
            f"[Candidate Profile: {BIOGRAPHY['name']}, {', '.join(BIOGRAPHY['roles'])}. "
            f"M.Tech AI & Data Science (Somaiya, CGPA 8.06), B.Tech ECE (Presidency, CGPA 7.77, KSCST Grant). "
            f"Core skills: {skills}. Contact: {BIOGRAPHY['email']}]."
        )

    final_grounding = " ".join(parts).strip()
    return {"grounding": final_grounding, "context": final_grounding}
