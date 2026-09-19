"""
Synthesis node for the LangGraph workflow.
Compiles screen context, destination routes, and vector RAG citations into factual speech grounding.
"""

from typing import Any
from .state import PortfolioGraphState


def ground_and_synthesize_node(state: PortfolioGraphState) -> dict[str, Any]:
    """Synthesizes targeted, need-to-know speech grounding. Strictly prevents context dumping."""
    route = state.get("route", "general_inquiry")
    screen_context = state.get("context", "").strip()
    retrieved_chunks = state.get("retrieved_chunks", [])

    # 1. Action, conversational, and general routes require ZERO context injection
    if route in ("navigation", "theme", "resource", "booking", "greeting", "general_inquiry"):
        return {"grounding": "", "context": ""}

    # 2. Screen awareness: only provide the active screen synopsis
    if route == "current_page":
        grounding = f"[Current Screen: {screen_context}]" if screen_context else ""
        return {"grounding": grounding, "context": screen_context}

    # 3. Specific profile / education / skills requests: 1 targeted sentence
    if route == "education":
        grounding = (
            "[Education: M.Tech in AI & Data Science from Somaiya Vidyavihar (CGPA 8.06); "
            "B.Tech in ECE from Presidency University (CGPA 7.77, KSCST State Govt Grant Awardee).]"
        )
        return {"grounding": grounding, "context": "Somaiya M.Tech AI (8.06), Presidency B.Tech ECE (7.77)"}

    if route == "skills":
        grounding = (
            "[Core Skills: Python, PyTorch, LangGraph, Convex Optimization (CVXPY/CLARABEL), "
            "Multi-Agent Systems, WebRTC, FastAPI.]"
        )
        return {"grounding": grounding, "context": "Python, PyTorch, LangGraph, Multi-Agent Systems"}

    if route == "profile":
        grounding = (
            "[Profile: Jithendra is an AI/ML Researcher & Engineer with 3 published papers in "
            "Elsevier EAAI, Springer Nature LNCS, and Elsevier COR.]"
        )
        return {"grounding": grounding, "context": "AI Researcher with 3 publications"}

    # 4. Technical and paper routes: extract only the single core fact (<150 chars), no multi-page dumping
    if retrieved_chunks:
        top_chunk = retrieved_chunks[0]
        raw_text = (top_chunk.get("text") or top_chunk.get("content") or "").strip()
        clean_text = " ".join(raw_text.split())
        # Strip any leading bracketed source tag e.g. [Elsevier EAAI Paper (PDF) - Page 13]:
        if clean_text.startswith("[") and "]:" in clean_text:
            clean_text = clean_text.split("]:", 1)[1].strip()
        elif clean_text.startswith("[") and "]" in clean_text:
            clean_text = clean_text.split("]", 1)[1].strip()
        single_fact = clean_text[:150]
        grounding = f"[Relevant Fact: {single_fact}]"
        return {"grounding": grounding, "context": single_fact}

    return {"grounding": "", "context": ""}
