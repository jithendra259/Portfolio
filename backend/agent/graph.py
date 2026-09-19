"""LangGraph workflow for routing portfolio questions to grounded context."""

from typing import TypedDict

from langgraph.graph import END, START, StateGraph

from prompts.knowledge import (
    BIOGRAPHY,
    EDUCATION,
    NAVIGATION_TARGETS,
    PROJECTS,
    PUBLICATIONS,
    TECHNICAL_SKILLS,
    WORK_EXPERIENCE,
)


class PortfolioGraphState(TypedDict, total=False):
    query: str
    route: str
    intent: str
    target: str
    context: str


ROUTE_RULES = (
    (
        "research_eaai",
        "case_study_adaptive_governance",
        ("eaai", "g-cvar", "contagion", "fire sale", "bipartite", "paper 1"),
    ),
    (
        "research_lncs",
        "case_study_regime_supervisory",
        ("lncs", "ijcaci", "instability", "regime", "drift", "paper 2"),
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
            "paper 3",
        ),
    ),
    (
        "project_aqi",
        "case_study_aqi",
        ("aqi", "air quality", "delhi", "pm2.5", "xgboost"),
    ),
    (
        "project_swarm_robotics",
        "case_study_swarm_robotics",
        ("swarm", "robot", "agriculture", "esp32", "kscst", "densenet"),
    ),
)


def _classify_query(state: PortfolioGraphState) -> PortfolioGraphState:
    query = state.get("query", "").lower()

    if any(word in query for word in ("download", "pdf", "document", "cv")):
        resource = "resume"
        if any(word in query for word in ("paper", "research", "publication")):
            resource = "research"
        elif any(word in query for word in ("certificate", "credential", "gate")):
            resource = "certificates"
        return {"route": "resource", "intent": "download", "target": resource}

    if any(word in query for word in ("book", "schedule", "appointment", "meeting", "interview")):
        return {"route": "booking", "intent": "book_appointment", "target": "book_appointment"}

    for route, target, keywords in ROUTE_RULES:
        if any(keyword in query for keyword in keywords):
            return {"route": route, "intent": "explore", "target": target}

    if any(phrase in query for phrase in ("where am i", "what page", "which page", "this page", "current page", "this screen", "what am i looking at", "explain this project", "tell me about this")):
        return {"route": "current_page", "intent": "inspect_screen"}

    if any(word in query for word in ("who", "tell me", "about yourself", "background", "everything about")):
        return {"route": "profile", "intent": "answer_profile"}

    for target, description in NAVIGATION_TARGETS.items():
        if target.replace("_", " ") in query:
            return {"route": "navigation", "intent": "navigate", "target": target, "context": description}

    if any(word in query for word in ("experience", "education", "skills")):
        return {"route": "profile", "intent": "answer_profile"}

    return {"route": "general", "intent": "answer_general"}


def _retrieve_context(state: PortfolioGraphState) -> PortfolioGraphState:
    route = state.get("route", "general")
    target = state.get("target")

    if route == "research_eaai":
        item = PUBLICATIONS[0]
        context = f"{item['title']} ({item['venue']}, {item['status']}): {item['summary']}"
    elif route == "research_lncs":
        item = PUBLICATIONS[1]
        context = f"{item['title']} ({item['venue']}, {item['status']}): {item['summary']}"
    elif route == "research_cor":
        item = PUBLICATIONS[2]
        context = f"{item['title']} ({item['venue']}, {item['status']}): {item['summary']}"
    elif route == "project_aqi":
        item = next(project for project in PROJECTS if project["id"] == "aqi_forecasting")
        context = f"{item['name']}: {item['description']}"
    elif route == "project_swarm_robotics":
        item = next(project for project in PROJECTS if project["id"] == "swarm_robotics")
        context = f"{item['name']}: {item['description']}"
    elif route == "navigation" and target:
        context = state.get("context", "")
    elif route == "profile":
        skills = ", ".join(
            skill for skill_group in TECHNICAL_SKILLS.values() for skill in skill_group[:4]
        )
        education = "; ".join(
            f"{item['degree']} at {item['institution']} ({item['period']}, {item['cgpa']})"
            for item in EDUCATION
        )
        experience = "; ".join(
            f"{item['role']} at {item['organization']} ({item['period']})"
            for item in WORK_EXPERIENCE
        )
        context = (
            f"{BIOGRAPHY['name']} is {', '.join(BIOGRAPHY['roles'])}. "
            f"Mission: {BIOGRAPHY['mission']} Location: {BIOGRAPHY['location']}. "
            f"Education: {education}. Experience: {experience}. "
            f"Core skills: {skills}. Contact: {BIOGRAPHY['email']}."
        )
    elif route == "booking":
        context = "The visitor wants to schedule a meeting. Collect name, email, and discussion topic, then open the booking page."
    elif route == "resource":
        context = f"The visitor wants to download the {target} resource. Use the download_resource tool."
    elif route == "current_page":
        context = "The visitor is inquiring about their current location on the screen. Explain the active case study or page from the visitor screen context."
    else:
        context = ""

    return {"context": context}


def _build_graph():
    builder = StateGraph(PortfolioGraphState)
    builder.add_node("classify", _classify_query)
    builder.add_node("retrieve", _retrieve_context)
    builder.add_edge(START, "classify")
    builder.add_edge("classify", "retrieve")
    builder.add_edge("retrieve", END)
    return builder.compile()


PORTFOLIO_GRAPH = _build_graph()


async def route_portfolio_query(query: str) -> PortfolioGraphState:
    """Classify a visitor query and retrieve the smallest useful context."""
    return await PORTFOLIO_GRAPH.ainvoke({"query": query})