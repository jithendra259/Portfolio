"""
LangGraph Workflow for Jithendra's Portfolio Voice Agent.
Orchestrates query classification, real-time screen awareness, hybrid vector embedding retrieval (RAG),
and factual speech grounding with sub-25ms execution latency.
"""

import re
from typing import Any, TypedDict
from langgraph.graph import END, START, StateGraph

from prompts.knowledge import (
    BIOGRAPHY,
    EDUCATION,
    NAVIGATION_TARGETS,
    PAGE_KNOWLEDGE,
    PROJECTS,
    PUBLICATIONS,
    TECHNICAL_SKILLS,
    WORK_EXPERIENCE,
)
from .rag import get_retriever, search_knowledge_base


class PortfolioGraphState(TypedDict, total=False):
    query: str
    route: str
    intent: str
    target: str
    screen_context: dict[str, Any]
    retrieved_chunks: list[dict[str, Any]]
    context: str
    grounding: str
    confidence: float


# Domain rule keywords for high-precision routing
ROUTE_RULES = (
    (
        "research_eaai",
        "case_study_adaptive_governance",
        ("eaai", "g-cvar", "contagion", "fire sale", "bipartite", "sec 13-f", "eigenvector centrality", "paper 1"),
    ),
    (
        "research_lncs",
        "case_study_regime_supervisory",
        ("lncs", "ijcaci", "instability", "regime", "drift", "ledoit", "shrinkage", "paper 2"),
    ),
    (
        "research_cor",
        "case_study_supervisory_xai",
        (
            "cor",
            "clarabel",
            "convex",
            "xai",
            "dag",
            "grounding",
            "supervisory portfolio",
            "socp",
            "paper 3",
        ),
    ),
    (
        "project_voice_architecture",
        "case_study_voice_architecture",
        ("voice", "webrtc", "livekit", "groq", "cartesia", "deepgram", "latency", "voice agent", "speech"),
    ),
    (
        "project_aqi",
        "case_study_aqi",
        ("aqi", "air quality", "delhi", "pm2.5", "xgboost", "cpcb"),
    ),
    (
        "project_swarm_robotics",
        "case_study_swarm_robotics",
        ("swarm", "robot", "agriculture", "esp32", "kscst", "densenet", "drone"),
    ),
)


def classify_intent_node(state: PortfolioGraphState) -> dict[str, Any]:
    """Classifies user intent and identifies destination screen target if applicable."""
    query = state.get("query", "").lower().strip()

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
        if any(keyword in query_lower for keyword in keywords):
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


def vector_retrieval_node(state: PortfolioGraphState) -> dict[str, Any]:
    """Retrieves top semantic vector chunks from research papers, case studies, and candidate profile."""
    query = state.get("query", "")
    route = state.get("route", "")

    # Category filter if applicable
    category = None
    if route.startswith("research_"):
        category = route
    elif route == "profile" or route in ("education", "skills"):
        category = None

    try:
        chunks = search_knowledge_base(query=query, top_k=2, category=category)
    except Exception as e:
        print(f"--> [LangGraph Retrieval Warning] Vector search error: {e}")
        chunks = []

    return {"retrieved_chunks": chunks}


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


def _route_decision(state: PortfolioGraphState) -> str:
    """Conditional edge router determining the optimal sub-graph execution path."""
    route = state.get("route", "")
    if route in ("resource", "theme", "booking", "navigation"):
        # Fast path: skip vector retrieval to maintain sub-5ms latency for direct commands
        return "synthesize"
    elif route == "current_page":
        # Screen awareness path: inspect screen first, then augment with vector retrieval
        return "screen_grounder"
    else:
        # Technical, project, or general inquiry: run vector retrieval
        return "vector_retrieval"


def _build_portfolio_graph():
    """Compiles the LangGraph state machine."""
    builder = StateGraph(PortfolioGraphState)

    # Add processing nodes
    builder.add_node("classify", classify_intent_node)
    builder.add_node("screen_grounder", screen_grounder_node)
    builder.add_node("vector_retrieval", vector_retrieval_node)
    builder.add_node("synthesize", ground_and_synthesize_node)

    # Add edges
    builder.add_edge(START, "classify")

    # Conditional branch from classify
    builder.add_conditional_edges(
        "classify",
        _route_decision,
        {
            "synthesize": "synthesize",
            "screen_grounder": "screen_grounder",
            "vector_retrieval": "vector_retrieval",
        },
    )

    # Screen grounder proceeds to vector retrieval for deep project details
    builder.add_edge("screen_grounder", "vector_retrieval")

    # Vector retrieval proceeds to synthesis
    builder.add_edge("vector_retrieval", "synthesize")

    # Final grounding outputs to END
    builder.add_edge("synthesize", END)

    return builder.compile()


# Global compiled LangGraph instance
PORTFOLIO_GRAPH = _build_portfolio_graph()


async def route_portfolio_query(
    query: str,
    screen_context: dict[str, Any] | None = None,
) -> PortfolioGraphState:
    """
    Asynchronously executes the LangGraph workflow for a visitor utterance.
    Integrates query classification, screen awareness, and hybrid vector RAG.
    """
    initial_state: PortfolioGraphState = {
        "query": query,
        "screen_context": screen_context or {},
    }
    return await PORTFOLIO_GRAPH.ainvoke(initial_state)