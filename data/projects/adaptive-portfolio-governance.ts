import { Project } from './types';

export const adaptivePortfolioGovernance: Project = {
  id: 'adaptive-portfolio-governance',
  title: 'Multi-Agent Adaptive Portfolio Governance System',
  category: 'Quantitative Finance',
  period: 'Jan 2026 – Apr 2026',
  tagline: 'Risk-aware financial decision intelligence combining autonomous agent swarms, regime adaptation, and audit compliance.',
  description: 'Designed a financial decision-intelligence architecture combining agentic orchestration, risk-aware portfolio construction, regime-aware adaptation, instability detection, optimization, and response verification.',
  overview: 'A pioneering research system introducing an auditable multi-agent governance pipeline for institutional asset allocation under non-stationary market regimes.',
  problemStatement: 'Traditional quantitative systems fail during catastrophic volatility regime shifts, and black-box ML models are unacceptable in regulated asset management without transparent governance validation.',
  solution: 'Designed an adaptive architecture integrating instability detection, graph-based reasoning, convex cone optimization, and rule-based compliance gates.',
  status: 'Published Research Manuscript (Under Review)',
  githubUrl: 'https://github.com/jithendra259',
  featured: true,
  researchLink: 'Elsevier EAAI & Springer Proceedings (Under Review, 2026)',
  highlights: [
    'Evidence-backed responses with governance approval checks and transparent explanations',
    'Graph-based reasoning with NetworkX and convex optimization solvers',
    'Published as first-author manuscript submitted to Elsevier EAAI',
  ],
  techStack: [
    'Python',
    'CVXPY',
    'CLARABEL',
    'NetworkX',
    'LangGraph',
    'Risk Analytics',
    'Financial Datasets',
  ],
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
};
