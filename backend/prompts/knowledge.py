"""
Jithendra's Portfolio & Research Knowledge Base
Contains structured metadata, research papers, projects, and biography for the Voice AI assistant.
"""

BIOGRAPHY = {
    "name": "Kandula Jithendra Subramanyam",
    "preferred_name": "Jithendra",
    "roles": [
        "AI Systems Engineer",
        "Quantitative Financial Researcher",
        "Multi-Agent Systems Architect",
        "Full-Stack Developer",
    ],
    "mission": (
        "Bridging autonomous agentic swarms with convex mathematical optimization (CVXPY) "
        "and deterministic supervisory governance for verifiable, audit-compliant decision systems in high-stakes domains."
    ),
    "location": "Mumbai, Maharashtra, India (Open to global roles: remote or relocation)",
    "email": "kandulajithendrasubramanyam@gmail.com",
    "phone": "+91-9704400336",
    "portfolio_url": "https://jithendra-portfolio.vercel.app",
    "github": "https://github.com/jithendra259",
    "linkedin": "https://linkedin.com/in/kandulajithendra",
}

EDUCATION = [
    {
        "degree": "M.Tech in Artificial Intelligence & Data Science",
        "institution": "K J Somaiya College of Engineering, Somaiya Vidyavihar University, Mumbai",
        "period": "2024 - 2026",
        "cgpa": "8.06 / 10.0",
        "thesis": (
            "Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk "
            "Portfolio Optimization with Adaptive Contagion Penalization (supervised by Prof. Sunayana Jadhav)"
        ),
    },
    {
        "degree": "B.Tech in Electronics & Communication Engineering",
        "institution": "Presidency University, Bangalore",
        "period": "2019 - 2023",
        "cgpa": "7.77 / 10.0",
        "capstone": (
            "Autonomous Swarm Robotics for Precision Agriculture & Plant Pathology. "
            "Awarded Karnataka State Council for Science & Technology (KSCST) 46th Series Project Grant."
        ),
    },
]

COMPETITIVE_EXAMS = [
    "GATE 2024 Qualified (Data Science & Artificial Intelligence - DA)",
    "GATE 2024 Qualified (Computer Science & Information Technology - CS)",
]

PUBLICATIONS = [
    {
        "id": "paper_eaai",
        "title": "Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk Portfolio Optimization with Adaptive Contagion Penalization",
        "venue": "Elsevier Engineering Applications of Artificial Intelligence (EAAI)",
        "status": "Under Review (2026)",
        "manuscript_id": "EAAI-26-14280",
        "authors": "K. J. Subramanyam (First & Corresponding Author), Sunayana Jadhav",
        "summary": (
            "5-agent blackboard architecture for institutional portfolio optimization addressing fire-sale contagion "
            "via SEC 13-F bipartite co-holding graphs. Integrates graph-regularized CVaR (G-CVaR) with Ledoit-Wolf shrinkage. "
            "Delivers 25.9% reduction in CVaR-95% and 32.5 percentage point reduction in crisis drawdown over 552 rolling windows (2005-2025)."
        ),
        "target_nav": "case_study_adaptive_governance",
    },
    {
        "id": "paper_lncs",
        "title": "Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization",
        "venue": "5th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026) / Springer Nature LNCS",
        "status": "Accepted & Presented (2026)",
        "location": "Washington University of Science and Technology (WUST), Alexandria, USA",
        "authors": "K. J. Subramanyam (First & Corresponding Author), Sunayana Vilas Jadhav, Ashwini Dalvi",
        "summary": (
            "Interpretable supervisory governance coupling covariance drift, rolling volatility, and correlation stress into a composite Instability Index. "
            "Dynamically adjusts concentration limits and Ledoit-Wolf shrinkage (alpha = 0.42) during stress periods across 218 US equities over 20 years."
        ),
        "target_nav": "case_study_regime_supervisory",
    },
    {
        "id": "paper_cor",
        "title": "A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching & Conversational Explainability",
        "venue": "Elsevier Computers & Operations Research (CAS Journal)",
        "status": "Prepared / Under Review (2026)",
        "authors": "K. J. Subramanyam (First & Corresponding Author), Sunayana Vilas Jadhav, Ashwini Dalvi",
        "summary": (
            "7-agent DAG architecture integrating CLARABEL interior-point convex solver with conversational Mistral-7B LLM. "
            "Guarantees 100% numerical grounding (0% hallucination) by strictly bounding LLM explanations to verified solver outputs. "
            "Compliant with MiFID II and the EU AI Act."
        ),
        "target_nav": "case_study_supervisory_xai",
    },
]

PROJECTS = [
    {
        "id": "voice_portfolio_architecture",
        "name": "Real-Time Voice AI Portfolio & Agentic Web Architecture",
        "description": (
            "Interactive voice-driven engineering portfolio. Built with Next.js 15 App Router, LiveKit WebRTC, "
            "Groq LPU (sub-90ms TTFT primary LLM), Cartesia Sonic-3 neural TTS, Deepgram Nova-3 STT, "
            "and Google Gemini 2.5 Flash fallback. Uses bi-directional WebRTC data channels for real-time UI auto-navigation "
            "and is cloud-optimized for zero event-loop blocking on Render's 0.1 vCPU."
        ),
        "target_nav": "case_study_voice_architecture",
    },
    {
        "id": "voice_assistant",
        "name": "Agentic AI Portfolio Governance Chatbot",
        "description": (
            "Interactive voice AI assistant with real-time UI navigation. Decoupled into 10+ agent roles delivering "
            "sub-200ms TTFT via Groq LPU LLM, LiveKit WebRTC, Deepgram Nova-3 STT, and Cartesia Sonic-3 TTS."
        ),
        "target_nav": "projects",
    },
    {
        "id": "portfolio_governance_platform",
        "name": "Multi-Agent Adaptive Portfolio Governance System",
        "description": (
            "Full-stack quantitative investment intelligence platform built on Next.js 15, TypeScript, TailwindCSS, and Python backend. "
            "Provides institutional-grade risk visualization, backtesting, and supervisory telemetry."
        ),
        "target_nav": "case_study_adaptive_governance",
    },
    {
        "id": "aqi_forecasting",
        "name": "Personalised AQI Global Air Quality Forecasting",
        "description": (
            "Machine learning system using Next.js 15, Flask, and CPCB sensor data across 10 Delhi stations. "
            "Evaluated XGBoost, Markov Chains, and ARIMA. XGBoost achieved R2 = 0.912 and RMSE of 18.4 ug/m3 for 48-hour PM2.5 forecasting."
        ),
        "target_nav": "case_study_aqi",
    },
    {
        "id": "swarm_robotics",
        "name": "Autonomous Swarm Robots for Precision Agriculture",
        "description": (
            "Distributed IoT hardware-software swarm using ESP32, ESP-NOW mesh, edge CNNs, and DenseNet121. "
            "Achieved 98.4% field coverage and 96.8% disease classification accuracy. Funded by KSCST 46th Series grant."
        ),
        "target_nav": "case_study_swarm_robotics",
    },
]

TECHNICAL_SKILLS = {
    "AI & Multi-Agent Swarms": [
        "LangGraph", "LangChain", "Multi-Agent Blackboards", "DAG Workflows",
        "RAG", "Numerical Grounding", "Tool Calling",
    ],
    "LLMs & Real-time Voice": [
        "Groq LPU", "Google Gemini", "Mistral-7B", "Llama-3",
        "LiveKit WebRTC", "Deepgram Nova-3", "Cartesia Sonic-3",
    ],
    "Machine Learning & Data Science": [
        "PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "ARIMA",
        "Markov Chains", "Hugging Face", "OpenCV",
    ],
    "Quantitative Finance & Optimization": [
        "Convex Optimization (CVXPY)", "CLARABEL solver", "Conditional Value-at-Risk (CVaR)",
        "Ledoit-Wolf Shrinkage", "Bipartite Institutional Networks", "Eigenvector Centrality", "NetworkX",
    ],
    "Full-Stack Web Engineering": [
        "Next.js 15 (App Router)", "React 19", "TypeScript", "JavaScript",
        "TailwindCSS", "Node.js", "FastAPI", "Flask", "MongoDB", "WebSockets", "WebRTC",
    ],
    "Embedded Systems & IoT": [
        "ESP32", "ESP-NOW Mesh", "Sensor Networks", "MicroPython", "Arduino", "Embedded C++",
    ],
}

WORK_EXPERIENCE = [
    {
        "role": "Thesis Researcher",
        "organization": "K J Somaiya College of Engineering",
        "period": "Oct 2025 - Apr 2026",
        "details": "Led research on multi-agent financial systems, convex portfolio optimization, and authored 3 research papers.",
    },
    {
        "role": "Full-Stack Developer Intern",
        "organization": "ScholarRankAI",
        "period": "May 2025 - Aug 2025",
        "details": "Developed AI ranking algorithms, scalable Next.js UI, optimized REST APIs with sub-200ms latency.",
    },
    {
        "role": "UI/UX Developer Intern",
        "organization": "MNJ Software",
        "period": "Mar 2024 - May 2024",
        "details": "Designed and built modern responsive web dashboards, component design systems, and client interfaces.",
    },
]

NAVIGATION_TARGETS = {
    "projects": "Overview of engineering and AI projects",
    "research": "Three peer-reviewed publications (EAAI, Springer LNCS, Computers & Operations Research)",
    "about": "Personal journey, philosophy, and biography",
    "resume": "Interactive resume and downloadable CV",
    "contact": "Direct contact options and meeting booking calendar",
    "book_appointment": "Dedicated full-screen interactive calendar appointment booking page (/book-appointment)",
    "skills": "Comprehensive technical skill matrix and proficiencies",
    "certificates": "Verified academic, competitive exam (GATE), and professional credentials",
    "experience": "Research and software engineering industry roles",
    "home": "Hero section and high-level introduction",
    "case_study_voice_architecture": "Deep-dive case study on this Portfolio's Real-Time Voice AI & Agentic Web Architecture (Groq LPU, LiveKit WebRTC, Next.js 15)",
    "case_study_adaptive_governance": "Deep-dive case study on G-CVaR portfolio optimization (EAAI Paper)",
    "case_study_regime_supervisory": "Deep-dive case study on Regime-Adaptive Supervisory Governance (Springer LNCS Paper)",
    "case_study_supervisory_xai": "Deep-dive case study on 100% Numerically Grounded Explainable AI (COR Paper)",
    "case_study_aqi": "Deep-dive case study on Global Air Quality Forecasting with XGBoost",
    "case_study_swarm_robotics": "Deep-dive case study on Autonomous Precision Agriculture Swarm Robots",
}

PAGE_KNOWLEDGE = {
    "/": {
        "title": "Portfolio Homepage & Overview",
        "route": "/",
        "type": "overview",
        "summary": (
            "Kandula Jithendra Subramanyam's master portfolio overview. Showcases interactive 3D Mascot Robot, "
            "academic credentials (M.Tech AI Somaiya, B.Tech ECE Presidency, GATE DA & CS), three 2026 research publications "
            "(Elsevier EAAI, Springer LNCS, Elsevier COR), engineering projects bento grid, skills matrix, career timeline, "
            "verified certificates, and 30-minute Google Calendar appointment booking."
        ),
        "key_sections": [
            "Hero: 3D Mascot Robot, Biometric Handshake & Voice Agent Trigger",
            "About Me: Quantitative finance, multi-agent swarms, and convex optimization mission",
            "Research Bento: Elsevier EAAI-26-14280, Springer LNCS (IJCACI 2026), Elsevier COR",
            "Featured Projects: AQI Forecasting, Swarm Robotics, Agentic Portfolio Governance",
            "Technical Skills: PyTorch, CVXPY, CLARABEL, LangGraph, Next.js 15, LiveKit WebRTC",
            "Career & Education: Somaiya M.Tech (CGPA 8.06), Presidency B.Tech (CGPA 7.77)",
            "Certificates: GATE 2024 (DA & CS qualified), Deep Learning, Cloud Architecture",
            "Contact & Booking: Interactive appointment calendar with Google Meet integration",
        ],
    },
    "/projects/adaptive-portfolio-governance": {
        "title": "Multi-Agent Adaptive Portfolio Governance System",
        "route": "/projects/adaptive-portfolio-governance",
        "type": "research_case_study",
        "venue": "Elsevier Engineering Applications of Artificial Intelligence (EAAI-26-14280) & Springer Nature LNCS",
        "authors": "K. J. Subramanyam (First & Corresponding Author), Sunayana Jadhav",
        "summary": (
            "Pioneering five-agent blackboard governance architecture for institutional portfolio optimization addressing "
            "fire-sale contagion via SEC 13-F bipartite co-holding networks. Integrates graph-regularized CVaR (G-CVaR) with "
            "adaptive sigmoid-gated Laplacian penalties and Ledoit-Wolf optimal shrinkage."
        ),
        "architecture_agents": [
            "Agent 0 (Ingestion): 218 US equities, 11 GICS sectors, 552 rolling windows (2005-2025), SEC 13-F holdings",
            "Agent 1 (Instability Analysis): Composite volatility, correlation stress, and covariance drift tracking",
            "Agent 2 (Contagion Graph): Bipartite institutional co-ownership network with normalized Laplacian L",
            "Agent 3 (G-CVaR Optimization): Graph-regularized CVaR solved via CLARABEL interior-point SOCP solver",
            "Agent 4 (XAI & Governance): Mistral-7B explanation generation and MiFID II / EU AI Act audit logging",
        ],
        "mathematical_rigor": (
            "G-CVaR formulation: min_{w, gamma, u} gamma + (1 / ((1 - beta) * T)) * sum(u_t) + lambda_G * (w^T * L * w) "
            "subject to sum(w) = 1, w >= 0, where L = I - D^{-1/2} * A * D^{-1/2} is the normalized graph Laplacian, "
            "and lambda_G is dynamically gated by a sigmoid function of market instability."
        ),
        "empirical_results": [
            "25.9% reduction in CVaR-95% across 11 sector universes vs equal-weight benchmark",
            "32.5 percentage point reduction in crisis period drawdown during GFC 2008",
            "100% trigger accuracy and 96.9% narrative accuracy across 160 governance evaluation scenarios",
            "552 rolling windows evaluated over 20 years of real US equity market data (2005-2025)",
        ],
    },
    "/projects/regime-adaptive-supervisory-governance": {
        "title": "Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization",
        "route": "/projects/regime-adaptive-supervisory-governance",
        "type": "research_case_study",
        "venue": "Springer Nature LNCS / 5th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026)",
        "location": "Washington University of Science and Technology (WUST), Alexandria, USA",
        "authors": "K. J. Subramanyam (First & Corresponding Author), Sunayana Vilas Jadhav, Ashwini Dalvi",
        "summary": (
            "Interpretable supervisory governance coupling covariance drift, rolling volatility, and correlation stress into "
            "a composite Instability Index I_t. Dynamically switches concentration limits and Ledoit-Wolf shrinkage intensity (alpha = 0.42) "
            "across Calm, Turbulent, and Crisis regimes."
        ),
        "mathematical_rigor": (
            "Composite Instability Index: I_t = w_1 * delta_t + w_2 * sigma_t + w_3 * rho_t, where delta_t is Frobenius norm covariance drift, "
            "sigma_t is cross-sectional volatility, and rho_t is average pairwise correlation. Controls deterministic transition between "
            "three market regimes with tailored constraint bounds."
        ),
        "empirical_results": [
            "Maximum drawdown contained to 32.5% across 218 US equities over 20 years",
            "38% reduction in tail-loss variance under high-stress regimes",
            "Average turnover per rebalance optimized to 0.0045, drastically lowering transaction drag",
        ],
    },
    "/projects/supervisory-portfolio-xai-governance": {
        "title": "A Supervisory Portfolio Governance Framework: Instability Detection, Regime Switching & Conversational Explainability",
        "route": "/projects/supervisory-portfolio-xai-governance",
        "type": "research_case_study",
        "venue": "Elsevier Computers & Operations Research (CAS Journal, Under Review 2026)",
        "authors": "K. J. Subramanyam (First & Corresponding Author), Sunayana Vilas Jadhav, Ashwini Dalvi",
        "summary": (
            "7-agent Directed Acyclic Graph (DAG) pipeline integrating CLARABEL conic interior-point solver with conversational Mistral-7B LLM. "
            "Achieves 100% numerical grounding (0% hallucination) by strictly validating solver inputs and outputs against immutable constraints, "
            "complying with MiFID II and EU AI Act Article 14 standards."
        ),
        "mathematical_rigor": (
            "Second-Order Cone Programming (SOCP) solved via CLARABEL. Guarantees convex optimality and bounds conversational explanations "
            "to verified solver dual variables and slack vectors, preventing quantitative hallucination."
        ),
        "empirical_results": [
            "0% hallucination rate across 500+ simulated regulatory audit inquiries",
            "Full MiFID II and EU AI Act Article 14 decision-trail logging with cryptographic timestamping",
            "Sub-50ms SOCP rebalancing convergence time",
        ],
    },
    "/projects/voice-agent-portfolio-architecture": {
        "title": "Real-Time Voice AI Portfolio & Agentic Web Architecture",
        "route": "/projects/voice-agent-portfolio-architecture",
        "type": "engineering_case_study",
        "summary": (
            "Production real-time conversational voice assistant running live on this portfolio. Combines Next.js 15 App Router, "
            "LiveKit WebRTC Cloud, Groq LPU (sub-90ms TTFT primary LLM), Cartesia Sonic-3 neural TTS, Deepgram Nova-3 STT, "
            "and a custom WebGL Aura shader visualizer. Features bi-directional data channels for real-time screen auto-navigation."
        ),
        "technical_highlights": [
            "End-to-end voice roundtrip latency under 500ms using Groq LPU and Cartesia Sonic-3",
            "Bi-directional WebRTC data channel ('navigation', 'client_context') for real-time UI synchronization",
            "WebGL 3D Aura shader reacting to LiveKit audio tracks and agent conversational states",
            "Cloud-optimized Python worker architecture eliminating event-loop blocking on 0.1 vCPU container environments",
        ],
    },
    "/projects/agentic-portfolio-chatbot": {
        "title": "Agentic AI Portfolio Governance Chatbot",
        "route": "/projects/agentic-portfolio-chatbot",
        "type": "engineering_case_study",
        "summary": (
            "Interactive voice and conversational AI agent decoupled into 10+ agentic roles. Integrates LangGraph supervisor, "
            "LiveKit WebRTC, and CLARABEL convex solver for real-time financial portfolio queries and UI control."
        ),
    },
    "/projects/personalised-aqi-system": {
        "title": "Personalised AQI Global Air Quality Forecasting",
        "route": "/projects/personalised-aqi-system",
        "type": "machine_learning_case_study",
        "summary": (
            "Air quality forecasting engine using XGBoost, Markov Chains, and ARIMA trained on 10 Central Pollution Control Board (CPCB) "
            "monitoring stations across Delhi. XGBoost achieved test R² = 0.912 and RMSE of 18.4 ug/m3 for 48-hour PM2.5 prediction."
        ),
        "technical_highlights": [
            "Trained on multi-year hourly CPCB sensor telemetry (PM2.5, PM10, NO2, SO2, CO, Ozone)",
            "Engineered rolling temporal lags, planetary boundary layer dynamics, and wind vector transformations",
            "Interactive Next.js 15 frontend with geospatial pollutant heatmaps and health recommendations",
        ],
    },
    "/projects/swarm-robots-agriculture": {
        "title": "Autonomous Swarm Robots for Precision Agriculture",
        "route": "/projects/swarm-robots-agriculture",
        "type": "robotics_case_study",
        "summary": (
            "Decentralized IoT hardware-software swarm using ESP32 microcontrollers, ESP-NOW peer-to-peer mesh networking, "
            "and edge DenseNet121 vision for precision plant pathology. Awarded KSCST 46th Series Project Grant."
        ),
        "technical_highlights": [
            "98.4% autonomous field coverage without cellular or GPS infrastructure via localized mesh discovery",
            "96.8% edge disease classification accuracy using quantized convolutional neural networks",
            "Dynamic peer election and distributed fault-tolerant routing among robotic nodes",
        ],
    },
    "/book-appointment": {
        "title": "Interactive Meeting & Interview Booking",
        "route": "/book-appointment",
        "type": "service",
        "summary": (
            "Dedicated appointment scheduling interface for recruiters, collaborators, and engineering leads. "
            "Allows selecting 30-minute meeting slots with real-time Google Calendar synchronization and automatic Google Meet link generation."
        ),
    },
}

