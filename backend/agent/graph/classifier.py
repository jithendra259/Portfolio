"""
Intent classifier node for the LangGraph workflow.
Performs token-level parsing and word boundary matching to route visitor queries with 0ms latency.
"""

import re
from typing import Any
from .routes import NAVIGATION_TARGETS, ROUTE_RULES
from .state import PortfolioGraphState


def classify_intent_node(state: PortfolioGraphState) -> dict[str, Any]:
    """Classifies user intent and identifies destination screen target if applicable."""
    query = state.get("query", "").strip()
    query_lower = query.lower()
    query_tokens = set(re.findall(r"[a-z0-9_\-]+", query_lower))

    # 1. Explicit navigation requests (e.g. "navigate to projects", "go to about")
    if any(nav_kw in query_lower for nav_kw in ("navigate", "go to", "take me to", "jump to", "scroll to", "open")):
        for target, description in NAVIGATION_TARGETS.items():
            clean_target = target.replace("_", " ")
            if clean_target in query_lower or any(token == target for token in query_tokens):
                return {"route": "navigation", "intent": "navigate", "target": target, "context": description}

    # 2. Resource downloads (resume, papers, certs)
    if any(w in query_tokens for w in ("download", "pdf", "cv", "resume")) or "offline copy" in query_lower:
        resource = "resume"
        if any(w in query_tokens for w in ("paper", "research", "publication", "manuscript", "eaai")):
            resource = "research"
        elif any(w in query_tokens for w in ("certificate", "credential", "gate", "award")):
            resource = "certificates"
        elif "aqi" in query_tokens:
            resource = "aqi_report"
        elif "swarm" in query_tokens:
            resource = "swarm_report"
        return {"route": "resource", "intent": "download", "target": resource}

    # 3. Scheduling & Meeting Booking
    if any(w in query_tokens for w in ("book", "schedule", "appointment", "meeting", "interview")) or "call jithendra" in query_lower:
        return {"route": "booking", "intent": "book_appointment", "target": "book_appointment"}

    # 4. Theme toggle
    if any(phrase in query_lower for phrase in ("dark mode", "light mode", "change theme", "night mode", "day mode")):
        theme = "dark" if "dark" in query_tokens or "night" in query_tokens else "light"
        return {"route": "theme", "intent": "set_theme", "target": theme}

    # 5. Screen / Current Page Awareness
    if any(phrase in query_lower for phrase in (
        "where am i", "what page", "which page", "this page", "current page",
        "this screen", "what am i looking at", "explain this project",
        "tell me about this", "what is on my screen", "explain this paper"
    )):
        return {"route": "current_page", "intent": "inspect_screen"}

    # 6. Specific Research Papers & Projects
    for route, target, keywords in ROUTE_RULES:
        if any(re.search(rf"\b{re.escape(keyword)}\b", query_lower) for keyword in keywords):
            return {"route": route, "intent": "explore_project", "target": target}

    # 7. Candidate Bio / Experience / Skills / Education
    if any(phrase in query_lower for phrase in ("who are you", "tell me about yourself", "who is jithendra", "background", "biography")):
        return {"route": "profile", "intent": "answer_profile"}

    if any(w in query_tokens for w in ("education", "degree", "college", "somaiya", "presidency", "cgpa", "gate")):
        return {"route": "education", "intent": "answer_education"}

    if any(w in query_tokens for w in ("skill", "skills", "stack", "technologies", "tools", "python", "pytorch", "cvxpy")):
        return {"route": "skills", "intent": "answer_skills"}

    # 8. Target matching without explicit "navigate" verb
    for target, description in NAVIGATION_TARGETS.items():
        clean_target = target.replace("_", " ")
        if clean_target in query_lower:
            return {"route": "navigation", "intent": "navigate", "target": target, "context": description}

    return {"route": "general_inquiry", "intent": "semantic_answer"}
