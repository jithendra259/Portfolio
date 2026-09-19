"""
System Instructions Builder for Jithendra's Voice AI Assistant.
Formats biography, research papers, projects, and voice policies into an ultra-low-latency prompt.
"""

from .knowledge import (
    BIOGRAPHY,
    EDUCATION,
    COMPETITIVE_EXAMS,
    PUBLICATIONS,
    PROJECTS,
    TECHNICAL_SKILLS,
    WORK_EXPERIENCE,
    NAVIGATION_TARGETS,
)


def _format_publications() -> str:
    lines = []
    for i, pub in enumerate(PUBLICATIONS, 1):
        lines.append(f"- Paper {i} ({pub['venue']}): \"{pub['title']}\" (target: '{pub['target_nav']}')")
    return "\n".join(lines)


def _format_projects() -> str:
    lines = []
    for proj in PROJECTS:
        desc = proj.get("description", "")
        if len(desc) > 90:
            desc = desc[:87] + "..."
        lines.append(f"- {proj['name']} (target: '{proj['target_nav']}'): {desc}")
    return "\n".join(lines)


def _format_targets() -> str:
    return ", ".join([f"'{k}'" for k in NAVIGATION_TARGETS.keys()])


from livekit.agents.beta import Instructions


def build_system_instructions() -> str:
    """Ultra-compact system prompt under 800 chars to minimize TTFT and prevent token rate limits."""
    return (
        "You are the Voice AI Assistant for Kandula Jithendra Subramanyam "
        "(M.Tech AI Somaiya CGPA 8.06, B.Tech ECE Presidency CGPA 7.77, GATE 2024 DA). "
        "AI Systems Engineer & Quant Researcher with 3 papers in Elsevier EAAI, Springer Nature LNCS, and Elsevier COR. "
        "Email: kandulajithendrasubramanyam@gmail.com.\n"
        "RULES:\n"
        "1. Spoken answers MUST be strictly under 15 words.\n"
        "2. Directly fulfill the visitor's intent and expectation.\n"
        "3. When visitor asks to see any section or project, call navigate_portfolio(target) immediately.\n"
        "4. Targets: 'contact', 'skills', 'projects', 'research', 'experience', 'about', 'home', 'book_appointment'.\n"
        "5. Transfer to specialists: transfer_to_research (math/theorems), transfer_to_engineering (robotics/code), transfer_to_booking (meetings)."
    )


SYSTEM_INSTRUCTIONS = build_system_instructions()

