import { Project } from './types';

export const adaptivePortfolioGovernance: Project = {
  id: 'adaptive-portfolio-governance',
  title: 'Multi-Agent Adaptive Portfolio Governance System',
  category: 'Quantitative Finance',
  period: 'Jan 2026 – Apr 2026',
  tagline: 'Risk-aware financial decision intelligence combining autonomous agent swarms, regime adaptation, and audit compliance.',
  description: 'Designed a financial decision-intelligence architecture combining agentic orchestration, risk-aware portfolio construction, regime-aware adaptation, instability detection, optimization, and response verification.',
  overview: 'A pioneering research system introducing an auditable five-agent blackboard governance architecture for institutional asset allocation under financial contagion and non-stationary market regimes. Based on first-author research manuscript submitted to Elsevier Engineering Applications of Artificial Intelligence (EAAI-26-14280).',
  problemStatement: 'Traditional quantitative systems fail during catastrophic volatility regime shifts, and classic CVaR fails to model overlapping institutional co-holdings and fire-sale contagion spillovers across sectors.',
  solution: 'Engineered a five-agent blackboard architecture combining instability analysis, bipartite contagion graph construction, graph-regularized CVaR with adaptive Laplacian penalty, and human-in-the-loop governance auditing.',
  status: 'Under Review (Elsevier EAAI-26-14280)',
  githubUrl: 'https://github.com/jithendra259',
  featured: true,
  researchLink: '/documents/multi-agent-governance-graph-cvar-eaai.pdf',
  pdfUrl: '/documents/multi-agent-governance-graph-cvar-eaai.pdf',
  highlights: [
    'Five-agent blackboard architecture: Data Ingestion, Instability Analysis, Contagion Graph, CVaR Optimization, Explainability & Auditing',
    'Graph-regularized CVaR with adaptive Laplacian penalty preventing institutional fire-sale contagion spillovers',
    'Submitted as first-author manuscript to Elsevier Engineering Applications of Artificial Intelligence (EAAI-26-14280)',
  ],
  techStack: [
    'Python',
    'CVXPY',
    'CLARABEL',
    'NetworkX',
    'LangGraph',
    'Bipartite Graph Modeling',
    'Risk Analytics',
    'Financial Datasets',
  ],
  metrics: [
    { label: 'Journal Manuscript', value: 'Elsevier EAAI', detail: 'EAAI-26-14280 (Under Review)' },
    { label: 'Conference Paper', value: 'IJCACI 2026', detail: 'Presented at WUST, Alexandria USA (Springer)' },
    { label: 'Optimization Engine', value: 'Graph CVaR', detail: 'Conic solver with adaptive Laplacian penalty' },
    { label: 'Governance Standard', value: '100% Auditable', detail: 'Human-in-the-loop review gates' },
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
};
