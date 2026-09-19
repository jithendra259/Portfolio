import json
from typing import Annotated, Callable

from livekit import rtc
from livekit.agents import llm


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


from prompts.knowledge.pages import (
    get_formatted_section_explanation,
    get_section_knowledge,
)


class NavigationToolset(llm.Toolset):
    """Modular toolset for real-time frontend screen navigation, subsection scrolling, and section awareness."""

    def __init__(
        self,
        get_room: Callable[[], rtc.Room | None],
        get_assistant: Callable[[], any] | None = None,
    ) -> None:
        @llm.function_tool(
            description=(
                "Auto-navigate the visitor's screen in real time to any portfolio section, subsection, research paper case study, or booking page. "
                "Supported targets: "
                "- Homepage Sections: 'contact' (the contact & collaboration hub), 'skills' (4-card tech stack), 'projects' (featured engineering systems), "
                "'research' (3 peer-reviewed publications bento), 'experience' (education & career timeline), 'certificates' (GATE & awards), "
                "'resume' (interactive CV preview), 'about' (candidate background), 'home' (hero & 3D mascot). "
                "- Booking Page: 'book_appointment' (/book-appointment). "
                "- Research Case Studies: 'case_study_adaptive_governance' (EAAI), 'case_study_regime_supervisory' (LNCS), 'case_study_supervisory_xai' (COR). "
                "- Engineering Case Studies: 'case_study_aqi' (AQI), 'case_study_swarm_robotics' (Swarm robots), 'case_study_voice_architecture' (Voice AI). "
                "- Case Study Subsections: 'sec-math' (Mathematical formulation & equations), 'sec-arch' (System architecture DAG), "
                "'sec-eval' (Empirical evaluation & Sharpe backtests), 'sec-references' (Academic citations), 'sec-abstract' (Abstract & keywords)."
            )
        )
        async def navigate_portfolio(
            target: Annotated[
                str,
                "The section, subsection, or route to navigate the visitor's screen to.",
            ],
        ) -> str:
            """Navigates user screen to the desired section and returns a summary of what it contains."""
            room = get_room()
            clean_target = target.strip().lower().replace("#", "")
            await broadcast_navigation(room, clean_target)
            explanation = get_formatted_section_explanation(clean_target)
            return f"Navigated screen to {clean_target}. Details: {explanation}"

        @llm.function_tool(
            description=(
                "Explain in detail what a specific portfolio section or subsection tells. "
                "Call this whenever the visitor asks 'What does the contact section have?', 'What is in this section?', "
                "'What does the research section tell?', 'Explain the skills section', or asks about any subsection."
            )
        )
        async def explain_section(
            section_name: Annotated[
                str,
                "Name of the section or subsection (e.g. 'contact', 'skills', 'experience', 'research', 'projects', 'sec-math', 'sec-arch').",
            ],
        ) -> str:
            """Provides full explanation of what a section or subsection tells."""
            return get_formatted_section_explanation(section_name)

        @llm.function_tool(
            description=(
                "Query what page, research paper, or case study the visitor is currently viewing. "
                "Returns a concise 1-sentence synopsis of the active screen. "
                "Call this whenever the user asks 'Where am I?', 'What page is this?', 'What am I looking at right now?', "
                "'Explain this project/paper', or asks any question referencing 'this page' or 'this screen'."
            )
        )
        async def get_current_page_context() -> str:
            """Inspects and returns the visitor's current screen and page context concisely."""
            assistant = get_assistant() if get_assistant else None
            if assistant and hasattr(assistant, "get_formatted_page_context"):
                context_str = assistant.get_formatted_page_context()
                print(f"--> [Agent Tool] get_current_page_context: {context_str[:120]}...")
                return context_str
            return "The visitor is on the main portfolio page (/)."

        @llm.function_tool(
            description=(
                "List all available pages, sections, and case studies in Jithendra's portfolio that the visitor can navigate to."
            )
        )
        async def list_portfolio_pages() -> str:
            """Returns a directory of all available pages and case studies."""
            return (
                "Available pages and sections in Jithendra's portfolio:\n"
                "- / : Homepage (Sections: #home, #about, #research, #projects, #skills, #experience, #certificates, #resume, #contact)\n"
                "- #contact : Full contact hub ('Let's Build Intelligent Systems Together', Pearl Booking Button, Email Reveal, Social Links)\n"
                "- /book-appointment : Dedicated Meeting & Interview Booking (Google Meet)\n"
                "- /projects/adaptive-portfolio-governance : Elsevier EAAI Case Study (G-CVaR & SEC 13-F Network)\n"
                "- /projects/regime-adaptive-supervisory-governance : Springer Nature LNCS Case Study (Instability Index I_t)\n"
                "- /projects/supervisory-portfolio-xai-governance : Elsevier COR Case Study (7-Agent DAG & Mistral-7B)\n"
                "- /projects/voice-agent-portfolio-architecture : Voice AI Portfolio Architecture Case Study\n"
                "- /projects/personalised-aqi-system : Personalised AQI System Case Study (XGBoost)\n"
                "- /projects/swarm-robots-agriculture : Autonomous Swarm Robots Case Study (ESP32 Mesh)\n"
                "- Case Study Subsections: #sec-abstract, #sec-intro, #sec-math, #sec-arch, #sec-eval, #sec-references"
            )

        super().__init__(
            id="navigation",
            tools=[navigate_portfolio, explain_section, get_current_page_context, list_portfolio_pages],
        )


class ResearchToolset(llm.Toolset):
    """Modular toolset for deep mathematical analysis and peer-reviewed publication breakdowns."""

    def __init__(
        self,
        get_session: Callable[[], any],
        get_room: Callable[[], rtc.Room | None],
    ) -> None:
        from .reasoner import ResearchReasoner

        @llm.function_tool(
            description=(
                "Perform in-depth technical analysis and mathematical breakdowns for Jithendra's 3 research papers "
                "(Elsevier EAAI, Springer Nature LNCS, Elsevier COR) or engineering projects (AQI Forecasting, Swarm Robotics). "
                "Provides mathematical formulations (G-CVaR, Ledoit-Wolf alpha=0.42, CLARABEL interior-point SOCP solver), "
                "architecture graphs, and citation details while speaking natural fillers."
            )
        )
        async def research_paper_deep_dive(
            topic: Annotated[
                str,
                "The research paper title, mathematical concept (e.g. G-CVaR, Ledoit-Wolf, CLARABEL), or project name.",
            ],
        ) -> str:
            """Executes background research reasoner with non-blocking spoken filler."""
            session = get_session()
            room = get_room()
            return await ResearchReasoner.analyze_topic(session, room, topic)

        @llm.function_tool(
            description=(
                "Query and retrieve a precise factual metric or formulation from Jithendra's research papers "
                "or engineering specifications. Returns a concise single-fact answer (under 160 chars)."
            )
        )
        async def semantic_knowledge_search(
            query: Annotated[
                str,
                "The technical question or topic to retrieve a specific metric or formulation for.",
            ],
        ) -> str:
            """Executes vector retrieval returning only the single top fact."""
            from .rag import search_knowledge_base
            results = search_knowledge_base(query=query, top_k=1)
            if not results:
                return f"No direct record found for '{query}'."
            top_chunk = results[0]
            raw_text = (top_chunk.get("text") or top_chunk.get("content") or "").strip()
            clean_text = " ".join(raw_text.split())
            if clean_text.startswith("[PDF"):
                idx = clean_text.find("]")
                if idx != -1:
                    clean_text = clean_text[idx + 1:].strip()
            single_fact = clean_text[:160]
            return f"Fact: {single_fact}"

        super().__init__(id="research", tools=[research_paper_deep_dive, semantic_knowledge_search])


class SchedulingToolset(llm.Toolset):
    """Modular toolset for visitor meeting booking and collaboration requests."""

    def __init__(self, get_room: Callable[[], rtc.Room | None]) -> None:
        from .tasks import ScheduleMeetingTask

        @llm.function_tool(
            description=(
                "Initiate an interactive meeting scheduling, recruiter interview, or collaboration workflow. "
                "Delegates to a specialist supervisor task that collects visitor name, email, and topic, "
                "navigates to the contact screen, and logs the booking."
            )
        )
        async def schedule_meeting() -> str:
            """Launches ScheduleMeetingTask to gather contact details and book an appointment."""
            room = get_room()
            task = ScheduleMeetingTask(room=room)
            result = await task
            return (
                f"Meeting scheduled successfully! Name: {result.get('name')}, "
                f"Email: {result.get('email')}, Topic: {result.get('topic')}. "
                "Screen has been navigated to the contact section."
            )

        super().__init__(id="scheduling", tools=[schedule_meeting])


class ResourceToolset(llm.Toolset):
    """Voice-triggered downloads for public portfolio resources."""

    def __init__(self, get_room: Callable[[], rtc.Room | None]) -> None:
        @llm.function_tool(
            description=(
                "Download a public portfolio resource in the visitor's browser. "
                "Supported resources: resume, research, certificates, aqi_report, and swarm_report."
            )
        )
        async def download_resource(
            resource: Annotated[
                str,
                "One of resume, research, certificates, aqi_report, or swarm_report.",
            ],
        ) -> str:
            resources = {
                "resume": ("/documents/resume/kandula_jithendra_subramanyam_resume.pdf", "Kandula_Jithendra_Subramanyam_Resume.pdf"),
                "research": ("/documents/adaptive-portfolio-governance/multi-agent-governance-graph-cvar-eaai.pdf", "Jithendra_EAAI_Research.pdf"),
                "certificates": ("/certificates/conference/ijcaci-2026-paper-presentation.jpg", "Jithendra_IJCACI_Certificate.jpg"),
                "aqi_report": ("/documents/personalised-aqi-system/mtech-miniproject-aqi-forecasting-kandula-subramanyam.pdf", "Jithendra_AQI_Report.pdf"),
                "swarm_report": ("/documents/swarm-robots-agriculture/swarm-robotics-btech-report.docx", "Jithendra_Swarm_Robotics_Report.docx"),
            }
            key = resource.strip().lower().replace(" ", "_")
            if key not in resources:
                return "I can download the resume, research paper, certificates, AQI report, or swarm robotics report."

            room = get_room()
            if room and room.local_participant:
                url, filename = resources[key]
                payload = json.dumps({"type": "download", "url": url, "filename": filename})
                await room.local_participant.publish_data(payload.encode("utf-8"), topic="assistant_action")
                return f"Starting the {key.replace('_', ' ')} download now."
            return "The download is ready, but the browser action channel is not connected yet."

        super().__init__(id="resources", tools=[download_resource])


class ThemeToolset(llm.Toolset):
    """Voice control for the portfolio color theme."""

    def __init__(self, get_room: Callable[[], rtc.Room | None]) -> None:
        @llm.function_tool(
            description=(
                "Change the portfolio appearance when the visitor asks for dark mode, light mode, "
                "night mode, or day mode. The theme must be exactly dark or light."
            )
        )
        async def set_theme(
            theme: Annotated[str, "The requested theme: dark or light."],
        ) -> str:
            selected_theme = theme.strip().lower()
            if selected_theme not in {"dark", "light"}:
                return "I can switch the portfolio between dark and light mode."

            room = get_room()
            if room and room.local_participant:
                payload = json.dumps({"type": "theme", "theme": selected_theme})
                await room.local_participant.publish_data(
                    payload.encode("utf-8"),
                    topic="assistant_action",
                )
                return f"Switched the portfolio to {selected_theme} mode."
            return "The theme control is unavailable until the browser connection is ready."

        super().__init__(id="theme", tools=[set_theme])


def build_portfolio_toolsets(
    get_session: Callable[[], any],
    get_room: Callable[[], rtc.Room | None],
    get_assistant: Callable[[], any] | None = None,
) -> list[llm.Toolset]:
    """Factory creating all modular toolsets bound to the active session and room."""
    return [
        NavigationToolset(get_room, get_assistant),
        ResearchToolset(get_session, get_room),
        SchedulingToolset(get_room),
        ResourceToolset(get_room),
        ThemeToolset(get_room),
    ]
