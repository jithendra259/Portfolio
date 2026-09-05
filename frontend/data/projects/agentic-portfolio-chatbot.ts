import { Project } from './types';

export const agenticPortfolioChatbot: Project = {
  id: 'agentic-portfolio-chatbot',
  title: 'Agentic AI Portfolio Governance Chatbot',
  category: 'Agentic AI',
  period: 'Oct 2025 – Apr 2026',
  tagline: 'Autonomous multi-agent financial intelligence system for stock portfolio construction with audit-ready verification.',
  description: 'Built a specialized multi-agent system featuring planning, data retrieval, technical analysis, regime detection, instability analysis, portfolio optimization (CVXPY/CLARABEL), governance validation, explainability, and verification agents.',
  overview: 'An advanced conversational multi-agent decision intelligence system engineered to assist portfolio managers, quant analysts, and institutional investors in balancing risk, return, and governance compliance.',
  problemStatement: 'Large Language Models routinely hallucinate when performing quantitative financial arithmetic, fail to adapt to regime shifts, and lack verifiable audit trails necessary for regulatory financial compliance.',
  solution: 'Engineered a specialized LangGraph multi-agent swarm separating generative language understanding from deterministic convex optimization solvers (CVXPY/CLARABEL), backed by continuous governance validation and anti-hallucination guardrails.',
  status: 'Research Prototype / Active Development',
  githubUrl: 'https://github.com/jithendra259',
  featured: true,
  researchLink: 'Elsevier – Engineering Applications of Artificial Intelligence (EAAI), Under Review 2026',
  highlights: [
    'Modular multi-agent architecture powered by LangChain / LangGraph & Mistral-7B via Ollama',
    'Technical analysis modules for RSI, MACD, Bollinger Bands, trend, volatility, and CVaR drawdown',
    'Audit logs, confidence scores, evidence tracking, source grounding, and anti-hallucination controls',
  ],
  techStack: [
    'Python',
    'LangChain / LangGraph',
    'CVXPY',
    'CLARABEL',
    'NetworkX',
    'MongoDB',
    'Gradio',
    'Ollama',
    'Mistral-7B',
    'YFinance',
    'NumPy',
    'Pandas',
    'SciPy',
  ],
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
};
