export interface ProjectDetail {
  id: string;
  title: string;
  category: 'Agentic AI' | 'Quantitative Finance' | 'Full-Stack' | 'Robotics & IoT';
  period: string;
  tagline: string;
  description?: string;
  overview: string;
  problemStatement: string;
  solution: string;
  metrics: { label: string; value: string; detail: string }[];
  architectureSteps: { step: string; title: string; description: string; tech: string }[];
  keyCapabilities: { title: string; description: string }[];
  challenges: { challenge: string; solution: string }[];
  techStackCategories: { category: string; items: string[] }[];
  githubUrl: string;
  liveUrl?: string;
  status: string;
  researchLink?: string;
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'agentic-portfolio-chatbot': {
    id: 'agentic-portfolio-chatbot',
    title: 'Agentic AI Portfolio Governance Chatbot',
    category: 'Agentic AI',
    period: 'Oct 2025 – Apr 2026',
    tagline: 'Autonomous multi-agent financial intelligence system for stock portfolio construction with audit-ready verification.',
    status: 'Research Prototype / Active Development',
    githubUrl: 'https://github.com/jithendra259',
    overview: 'An advanced conversational multi-agent decision intelligence system engineered to assist portfolio managers, quant analysts, and institutional investors in balancing risk, return, and governance compliance.',
    problemStatement: 'Large Language Models routinely hallucinate when performing quantitative financial arithmetic, fail to adapt to regime shifts, and lack verifiable audit trails necessary for regulatory financial compliance.',
    solution: 'Engineered a specialized LangGraph multi-agent swarm separating generative language understanding from deterministic convex optimization solvers (CVXPY/CLARABEL), backed by continuous governance validation and anti-hallucination guardrails.',
    metrics: [
      { label: 'Autonomous Agent Roles', value: '10+ Agents', detail: 'Planning, technical, risk, regime, solver, & auditor' },
      { label: 'Arithmetic Accuracy', value: '100% Deterministic', detail: 'Offloaded to CVXPY/CLARABEL conic solvers' },
      { label: 'Verification Latency', value: '<480ms', detail: 'Real-time multi-agent execution pipeline' },
      { label: 'Explainability Score', value: 'Audit-Ready', detail: 'Source-grounded step-by-step reasoning logs' },
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Intent & Strategy Planning',
        description: 'Orchestrator parses user query, decomposes portfolio constraints, investment horizon, and target risk profile into structured graph states.',
        tech: 'LangChain / LangGraph, Mistral-7B',
      },
      {
        step: '02',
        title: 'Real-Time Financial Ingestion',
        description: 'Retrieval agents fetch live market data, OHLCV ticks, fundamentals, and macro indicators with MongoDB caching.',
        tech: 'YFinance API, MongoDB, NumPy',
      },
      {
        step: '03',
        title: 'Regime & Volatility Analysis',
        description: 'Specialized quant agents detect market regimes (bull, bear, high volatility), calculate rolling RSI, MACD, Bollinger Bands, and CVaR.',
        tech: 'SciPy, Pandas, Technical Indicators',
      },
      {
        step: '04',
        title: 'Convex Optimization Solve',
        description: 'Formulates Markowitz Mean-Variance and risk-parity models as convex cones, executed by CLARABEL solver.',
        tech: 'CVXPY, CLARABEL Solver',
      },
      {
        step: '05',
        title: 'Governance & Anti-Hallucination Gate',
        description: 'Auditor agent verifies weights sum to 1, checks asset bounds, cross-references citations, and flags ungrounded assertions.',
        tech: 'Deterministic Validator, NetworkX',
      },
      {
        step: '06',
        title: 'Explainable Narrative Output',
        description: 'Generates structured visual allocation breakdown, audit trail, and human-interpretable rationale for investment decisions.',
        tech: 'Gradio UI, Structured JSON',
      },
    ],
    keyCapabilities: [
      {
        title: 'Convex Portfolio Optimization',
        description: 'Solves quadratic and second-order cone optimization problems for maximum Sharpe ratio and minimum Conditional Value at Risk (CVaR).',
      },
      {
        title: 'Market Regime Adaptation',
        description: 'Dynamically shifts asset allocation constraints when stress tests detect transition between tranquil and turbulent market regimes.',
      },
      {
        title: 'Audit-Ready Governance Logs',
        description: 'Every recommendation is assigned a verifiable chain of custody with exact mathematical proofs and data timestamps.',
      },
      {
        title: 'Anti-Hallucination Controls',
        description: 'Numerical weights and statistical figures are generated solely by the deterministic math engine, never hallucinated by LLM weights.',
      },
    ],
    challenges: [
      {
        challenge: 'Preventing LLM hallucination in quantitative calculations',
        solution: 'Strictly decoupled arithmetic logic from the LLM. The LLM only constructs the optimization specification; solvers execute the numbers.',
      },
      {
        challenge: 'Handling non-convex constraints in real-time',
        solution: 'Transformed non-linear portfolio constraints into second-order cone programming (SOCP) formats solvable within 100ms via CLARABEL.',
      },
      {
        challenge: 'Latency in multi-agent handoffs',
        solution: 'Employed parallel agent graph execution in LangGraph with shared memory state checkpoints, reducing end-to-end response time to under 1 second.',
      },
    ],
    techStackCategories: [
      { category: 'Agentic & Orchestration', items: ['LangChain', 'LangGraph', 'Mistral-7B', 'Ollama', 'NetworkX'] },
      { category: 'Quantitative & Solvers', items: ['Python', 'CVXPY', 'CLARABEL', 'NumPy', 'Pandas', 'SciPy', 'YFinance'] },
      { category: 'Data & Infrastructure', items: ['MongoDB', 'Gradio', 'Docker', 'Linux', 'Git'] },
    ],
    researchLink: 'Elsevier – Engineering Applications of Artificial Intelligence (EAAI), Under Review 2026',
  },

  'adaptive-portfolio-governance': {
    id: 'adaptive-portfolio-governance',
    title: 'Multi-Agent Adaptive Portfolio Governance System',
    category: 'Quantitative Finance',
    period: 'Jan 2026 – Apr 2026',
    tagline: 'Risk-aware financial decision intelligence combining autonomous agent swarms, regime adaptation, and audit compliance.',
    status: 'Published Research Manuscript (Under Review)',
    githubUrl: 'https://github.com/jithendra259',
    overview: 'A pioneering research system introducing an auditable multi-agent governance pipeline for institutional asset allocation under non-stationary market regimes.',
    problemStatement: 'Traditional quantitative systems fail during catastrophic volatility regime shifts, and black-box ML models are unacceptable in regulated asset management without transparent governance validation.',
    solution: 'Designed an adaptive architecture integrating instability detection, graph-based reasoning, convex cone optimization, and rule-based compliance gates.',
    metrics: [
      { label: 'Research Manuscript', value: 'Elsevier EAAI', detail: 'First-author paper under review' },
      { label: 'Conference Paper', value: 'Springer', detail: 'Second paper on compliance-aware AI' },
      { label: 'Drawdown Reduction', value: 'Adaptive CVaR', detail: 'Robust tail-risk protection in turbulent regimes' },
      { label: 'Regulatory Compliance', value: '100% Verifiable', detail: 'Source-grounded evidence tracking' },
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Macro & Regime Surveillance',
        description: 'Continuous monitoring of cross-asset correlations, historical volatility spreads, and liquidity metrics.',
        tech: 'Python, NumPy, Financial Datasets',
      },
      {
        step: '02',
        title: 'Instability & Tail-Risk Detection',
        description: 'Quantifies tail risk through Expected Shortfall and Conditional Value at Risk metrics to signal regime transitions.',
        tech: 'SciPy, CVaR Analytics',
      },
      {
        step: '03',
        title: 'Convex Risk Formulation',
        description: 'Converts portfolio objectives into conic optimization formulations with liquidity penalties and factor bounds.',
        tech: 'CVXPY, Conic Optimization',
      },
      {
        step: '04',
        title: 'Multi-Agent Governance Review',
        description: 'Autonomous compliance agent enforces investment policy statements (IPS) and diversification limits.',
        tech: 'LangGraph, NetworkX Graph Logic',
      },
    ],
    keyCapabilities: [
      {
        title: 'Adaptive Instability Detection',
        description: 'Detects breakdown in historical correlation assumptions before systemic drawdown occurs.',
      },
      {
        title: 'Conic Solver Guarantees',
        description: 'Guarantees global mathematical optimality for portfolio weights without local minima traps.',
      },
      {
        title: 'Formal Governance Review',
        description: 'Validates portfolio shifts against institutional mandate constraints before trade execution.',
      },
    ],
    challenges: [
      {
        challenge: 'Over-fitting to historical correlation regimes',
        solution: 'Implemented Bayesian shrinkage estimation and adaptive exponential weighting to prioritize recent regime velocity.',
      },
      {
        challenge: 'Ensuring absolute regulatory auditability',
        solution: 'Constructed deterministic graph-based verification paths with cryptographic-style audit logs for every state transition.',
      },
    ],
    techStackCategories: [
      { category: 'Mathematical Engines', items: ['Python', 'CVXPY', 'CLARABEL', 'Convex Optimization', 'SciPy'] },
      { category: 'Agentic Framework', items: ['LangGraph', 'NetworkX', 'Graph Reasoning', 'Ollama'] },
      { category: 'Financial Analytics', items: ['Expected Shortfall', 'CVaR', 'Sharpe Ratio', 'Market Regimes'] },
    ],
    researchLink: 'Elsevier EAAI & Springer Proceedings (Under Review, 2026)',
  },

  'personalised-aqi-system': {
    id: 'personalised-aqi-system',
    title: 'Personalised AQI – Global Air Quality Forecasting',
    category: 'Full-Stack',
    period: 'Feb 2023 – Mar 2025',
    tagline: 'End-to-end global air quality forecasting platform combining live AQICN data, ML prediction, and explainable health indicators.',
    status: 'Production System',
    githubUrl: 'https://github.com/jithendra259',
    liveUrl: 'https://aqicn.org',
    overview: 'A scalable full-stack platform providing real-time air quality metrics and machine learning forecasts for cities globally, translating complex chemical sensor readings into personalized, explainable health recommendations.',
    problemStatement: 'Standard air quality indexes report raw numbers without contextualizing personal health risk for vulnerable populations, and lack predictive forecasting of impending pollution spikes.',
    solution: 'Developed an automated pipeline ingesting global sensor streams, training predictive regression and time-series models, and rendering interactive geographic visual analytics with actionable medical guidelines.',
    metrics: [
      { label: 'Forecast Horizon', value: '48 Hours', detail: 'Predictive modeling for PM2.5, PM10, O3, NO2' },
      { label: 'Data Sources', value: 'Global AQICN', detail: 'Live streaming from hundreds of global monitoring stations' },
      { label: 'Model Accuracy', value: 'R² > 0.91', detail: 'Trained on historical meteorological & pollutant records' },
      { label: 'Architecture', value: 'Next.js + Flask', detail: 'High-throughput microservices architecture' },
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Global Sensor Ingestion',
        description: 'Scheduled asynchronous jobs pull particulate and gas concentrations from global AQICN endpoints.',
        tech: 'Python, Requests, Crontab, Celery',
      },
      {
        step: '02',
        title: 'Time-Series Feature Pipeline',
        description: 'Processes pollutant history, humidity, wind velocity, and seasonal indicators into normalized training matrices.',
        tech: 'Pandas, NumPy, Scikit-learn',
      },
      {
        step: '03',
        title: 'Machine Learning Forecasting',
        description: 'Ensemble models predict multi-day particulate trajectory with confidence intervals and anomaly detection.',
        tech: 'Gradient Boosting, Random Forest, Flask REST API',
      },
      {
        step: '04',
        title: 'Explainable Health Translation',
        description: 'Maps forecasted pollutant combinations to WHO health impact scales and vulnerable demographic warnings.',
        tech: 'Explainable AI, WHO Guidelines',
      },
      {
        step: '05',
        title: 'Interactive Web Dashboard',
        description: 'Next.js frontend renders dynamic geospatial maps, trend charts, and real-time alerts with dark mode support.',
        tech: 'Next.js, Tailwind CSS, Recharts, MongoDB',
      },
    ],
    keyCapabilities: [
      {
        title: 'Real-Time Global Mapping',
        description: 'Visualizes AQI levels across international cities with color-coded severity heatmaps.',
      },
      {
        title: 'Personalized Health Recommendations',
        description: 'Tailors outdoor exercise and mask advice based on user respiratory sensitivity profiles.',
      },
      {
        title: 'Multi-Pollutant Decomposition',
        description: 'Breaks down composite AQI into specific contributions from PM2.5, PM10, Carbon Monoxide, and Ozone.',
      },
    ],
    challenges: [
      {
        challenge: 'Handling intermittent sensor drops in remote regions',
        solution: 'Built spatial interpolation and Kalman filtering to maintain unbroken forecast trends across sensor outages.',
      },
      {
        challenge: 'Delivering responsive charting for high-density time series',
        solution: 'Implemented client-side data downsampling and MongoDB aggregation pipelines with automated indexing.',
      },
    ],
    techStackCategories: [
      { category: 'Frontend & UI', items: ['Next.js', 'React', 'Tailwind CSS', 'Recharts', 'Lucide Icons'] },
      { category: 'Backend & ML', items: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'NumPy', 'Explainable AI'] },
      { category: 'Database & Ingestion', items: ['MongoDB', 'AQICN REST API', 'Docker', 'Vercel'] },
    ],
  },

  'swarm-robots-agriculture': {
    id: 'swarm-robots-agriculture',
    title: 'Swarm Robots for Precision Agriculture',
    category: 'Robotics & IoT',
    period: 'Aug 2022 – Jul 2023',
    tagline: 'Autonomous multi-robot coordination system for real-time crop health monitoring and automated plant disease diagnosis.',
    status: 'Capstone Project (Presidency University)',
    githubUrl: 'https://github.com/jithendra259',
    overview: 'An embedded robotics and computer vision project demonstrating decentralized swarm intelligence in agriculture, utilizing coordinated mobile robots to autonomously inspect crops and flag foliage pathology.',
    problemStatement: 'Manual crop disease scouting is labor-intensive, slow, and often catches fungal or bacterial infections after irreversible crop yield loss has already occurred.',
    solution: 'Constructed an autonomous swarm of ground rovers equipped with optical cameras, environmental sensors, and inter-robot communication protocols to survey agricultural plots autonomously.',
    metrics: [
      { label: 'Disease Classification', value: '93.4% Accuracy', detail: 'Trained on agricultural leaf pathology datasets' },
      { label: 'Coordination Protocol', value: 'Decentralized RF', detail: 'Autonomous inter-robot spatial separation' },
      { label: 'Inspection Coverage', value: '3x Faster', detail: 'Compared to conventional manual field inspection' },
      { label: 'Hardware Cost', value: 'Affordable IoT', detail: 'Engineered with cost-effective embedded modules' },
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Autonomous Field Navigation',
        description: 'Differential-drive rovers navigate crop furrows using ultrasonic collision avoidance and odometry.',
        tech: 'Embedded C++, Arduino/ESP32, Microcontrollers',
      },
      {
        step: '02',
        title: 'Swarm Communication Protocol',
        description: 'Decentralized mesh networking shares mapped terrain boundaries and task allocation among rovers.',
        tech: 'NRF24L01 / Wi-Fi Mesh, Distributed Logic',
      },
      {
        step: '03',
        title: 'Computer Vision Foliage Capture',
        description: 'High-resolution camera modules capture leaf samples under varied ambient solar illumination.',
        tech: 'OpenCV, Camera Modules',
      },
      {
        step: '04',
        title: 'Pathology Inference & Alert',
        description: 'Embedded CNN classifier identifies rust, blight, and pest damage, geo-tagging infection hotspots for farmers.',
        tech: 'TensorFlow Lite, Python, GPS Logging',
      },
    ],
    keyCapabilities: [
      {
        title: 'Decentralized Swarm Coordination',
        description: 'Rovers partition the survey field autonomously without needing a single point of failure central controller.',
      },
      {
        title: 'Automated Leaf Pathology Diagnosis',
        description: 'Classifies early-stage plant diseases from imagery, enabling micro-targeted pesticide application.',
      },
      {
        title: 'Micro-Climate Telemetry',
        description: 'Logs soil moisture, ambient temperature, and humidity alongside visual disease coordinates.',
      },
    ],
    challenges: [
      {
        challenge: 'Varying natural sunlight degrading computer vision accuracy',
        solution: 'Implemented adaptive histogram equalization and HSV color-space normalization before feeding to the classifier.',
      },
      {
        challenge: 'Power constraints on mobile rovers in rough terrain',
        solution: 'Designed an energy-efficient sleep/wake sensing cycle and optimized motor PWM curves to maximize battery longevity.',
      },
    ],
    techStackCategories: [
      { category: 'Hardware & Embedded', items: ['Embedded C++', 'ESP32 / Arduino', 'Motor Drivers', 'Ultrasonic Sensors'] },
      { category: 'Computer Vision & AI', items: ['Python', 'OpenCV', 'TensorFlow Lite', 'Convolutional Neural Networks'] },
      { category: 'Networking & Protocols', items: ['Mesh Networking', 'RF Protocols', 'IoT Telemetry'] },
    ],
  },
};
