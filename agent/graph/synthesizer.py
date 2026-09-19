"""
Synthesis node for the LangGraph workflow.
Compiles screen context, destination routes, and vector RAG citations into factual speech grounding.
"""

from typing import Any
from .state import PortfolioGraphState


def ground_and_synthesize_node(state: PortfolioGraphState) -> dict[str, Any]:
    """Synthesizes targeted speech grounding with context-aware intent and expectation thinking."""
    route = state.get("route", "general_inquiry")
    screen_context = state.get("context", "").strip()
    retrieved_chunks = state.get("retrieved_chunks", [])
    user_intent = state.get("user_intent", "").strip()
    user_expectation = state.get("user_expectation", "").strip()

    thinking_part = ""
    if user_intent and user_expectation:
        thinking_part = f"[Thinking: Intent: {user_intent} | Expects: {user_expectation}]"

    # 1. Action, conversational, and general routes: provide thinking guidance without data dumping
    if route in ("navigation", "theme", "resource", "booking", "greeting", "general_inquiry"):
        return {
            "grounding": thinking_part,
            "context": screen_context,
            "user_intent": user_intent,
            "user_expectation": user_expectation,
        }

    # 2. Screen awareness: active screen synopsis with thinking guidance
    if route == "current_page":
        screen_part = f"[Current Screen: {screen_context}]" if screen_context else ""
        grounding = f"{thinking_part} {screen_part}".strip()
        return {
            "grounding": grounding,
            "context": screen_context,
            "user_intent": user_intent,
            "user_expectation": user_expectation,
        }

    # 3. Specific profile / education / skills requests: 1 targeted fact
    if route == "education":
        fact = (
            "[Education: M.Tech in AI & Data Science from Somaiya Vidyavihar (CGPA 8.06); "
            "B.Tech in ECE from Presidency University (CGPA 7.77, KSCST State Govt Grant Awardee).]"
        )
        grounding = f"{thinking_part} {fact}".strip()
        return {
            "grounding": grounding,
            "context": "Somaiya M.Tech AI (8.06), Presidency B.Tech ECE (7.77)",
            "user_intent": user_intent,
            "user_expectation": user_expectation,
        }

    if route == "skills":
        fact = (
            "[Core Skills: Python, PyTorch, LangGraph, Convex Optimization (CVXPY/CLARABEL), "
            "Multi-Agent Systems, WebRTC, FastAPI.]"
        )
        grounding = f"{thinking_part} {fact}".strip()
        return {
            "grounding": grounding,
            "context": "Python, PyTorch, LangGraph, Multi-Agent Systems",
            "user_intent": user_intent,
            "user_expectation": user_expectation,
        }

    if route == "profile":
        fact = (
            "[Profile: Jithendra is an AI/ML Researcher & Engineer with 3 published papers in "
            "Elsevier EAAI, Springer Nature LNCS, and Elsevier COR.]"
        )
        grounding = f"{thinking_part} {fact}".strip()
        return {
            "grounding": grounding,
            "context": "AI Researcher with 3 publications",
            "user_intent": user_intent,
            "user_expectation": user_expectation,
        }

    # 4. Technical and paper routes: extract only the single core fact (<150 chars)
    if retrieved_chunks:
        top_chunk = retrieved_chunks[0]
        raw_text = (top_chunk.get("text") or top_chunk.get("content") or "").strip()
        clean_text = " ".join(raw_text.split())
        if clean_text.startswith("[") and "]:" in clean_text:
            clean_text = clean_text.split("]:", 1)[1].strip()
        elif clean_text.startswith("[") and "]" in clean_text:
            clean_text = clean_text.split("]", 1)[1].strip()
        single_fact = clean_text[:150]
        grounding = f"{thinking_part} [Relevant Fact: {single_fact}]".strip()
        return {
            "grounding": grounding,
            "context": single_fact,
            "user_intent": user_intent,
            "user_expectation": user_expectation,
        }

    return {
        "grounding": thinking_part,
        "context": screen_context,
        "user_intent": user_intent,
        "user_expectation": user_expectation,
    }
