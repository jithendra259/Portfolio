import { Project } from './types';

export const adaptivePortfolioGovernance: Project = {
  id: 'adaptive-portfolio-governance',
  title: 'Multi-Agent Adaptive Portfolio Governance System',
  category: 'Quantitative Finance',
  period: 'Jan 2026 – Apr 2026',
  tagline: 'Risk-aware financial decision intelligence combining autonomous agent swarms, regime adaptation, and audit compliance.',
  description: 'Designed a financial decision-intelligence architecture combining agentic orchestration, risk-aware portfolio construction, regime-aware adaptation, instability detection, optimization, and response verification.',
  overview: 'A pioneering research system introducing an auditable five-agent blackboard governance architecture for institutional asset allocation under financial contagion and non-stationary market regimes. Based on first-author research manuscript submitted to Elsevier Engineering Applications of Artificial Intelligence (EAAI-26-14280) and a conference paper presented at IJCACI 2026 (Springer LNCS).',
  problemStatement: 'Traditional quantitative systems fail during catastrophic volatility regime shifts, and classic CVaR fails to model overlapping institutional co-holdings and fire-sale contagion spillovers across sectors. Existing multi-agent finance frameworks (FinAgent, FinMem, DRL-Portfolio) lack governance principles including structured human intervention, audit trails, and causal explanation mechanisms.',
  solution: 'Engineered a five-agent blackboard architecture combining instability analysis (composite volatility + correlation + drawdown index), bipartite co-ownership contagion graph construction using SEC 13-F filings, graph-regularized CVaR with sigmoid-gated adaptive Laplacian penalty, LLM-based XAI explainer (Mistral-7B), and human-in-the-loop governance auditing compliant with MiFID II and EU AI Act.',
  status: 'Under Review (Elsevier EAAI-26-14280) | Presented at IJCACI 2026 (Springer)',
  githubUrl: 'https://github.com/jithendra259',
  featured: true,
  researchLink: '/documents/adaptive-portfolio-governance/multi-agent-governance-graph-cvar-eaai.pdf',
  pdfUrl: '/documents/adaptive-portfolio-governance/multi-agent-governance-graph-cvar-eaai.pdf',
  highlights: [
    'Five-agent blackboard architecture: Data Ingestion, Instability Analysis, Contagion Graph, G-CVaR Optimization, XAI Explainability & Auditing',
    'Graph-regularized CVaR with adaptive sigmoid-gated Laplacian penalty preventing institutional fire-sale contagion spillovers',
    '25.9% reduction in CVaR at 95% confidence level and 32.5 pp reduction in crisis period drawdown vs. equal-weight across 11 sector universes',
    'Submitted as first-author manuscript to Elsevier Engineering Applications of Artificial Intelligence (EAAI-26-14280)',
    'Conference paper accepted at IJCACI 2026 (Springer LNCS), presented at WUST, Alexandria USA',
    '100% trigger accuracy, 100% weight conservatism, 96.9% narrative accuracy across 160 governance scenarios',
  ],
  techStack: [
    'Python',
    'CVXPY',
    'CLARABEL',
    'NetworkX',
    'LangGraph',
    'Bipartite Graph Modeling',
    'Risk Analytics',
    'SEC 13-F Holdings Data',
    'Mistral-7B (Ollama)',
    'Gradio',
    'yfinance',
  ],
  metrics: [
    { label: 'CVaR Reduction', value: '25.9%', detail: 'Mean CVaR at 95% confidence level across 11 sector universes vs equal weight' },
    { label: 'Crisis Drawdown', value: '−32.5 pp', detail: 'G-CVaR MDD vs Equal Weight during GFC 2008 crisis window' },
    { label: 'Governance Coverage', value: '160 Scenarios', detail: '100% trigger accuracy, 96.9% narrative accuracy across evaluation' },
    { label: 'Publication', value: 'Elsevier EAAI', detail: 'EAAI-26-14280 under review + IJCACI 2026 (Springer LNCS)' },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Agent 0 – Data Ingestion & Blackboard Initialization',
      description: 'Downloads daily adjusted closing price data for 218 US-listed equities in 11 GICS sector universes via yfinance (2005–2025). Partitions using rolling windows of 252 trading days with a 100-day step, yielding 49–51 windows per universe. Loads quarterly SEC 13-F institutional holdings for the bipartite co-ownership graph.',
      tech: 'yfinance, Pandas, SEC EDGAR API, Python',
    },
    {
      step: '02',
      title: 'Agent 1 – Time-Series Sentinel (Instability Index)',
      description: 'Calculates the composite instability index $I_t = 0.4\\sigma_{\\text{spike}} + 0.3\\rho_{\\text{spike}} + 0.3\\text{MDD}_t$, bounded in $[0, 1]$. Regime classification: Calm ($I_t < 0.50$), Elevated ($0.50 \\le I_t < 0.85$), Crisis ($I_t \\ge 0.85$). For Universe U1 over 51 windows, $I_t$ ranges from $0.0$ (Window W23 calm) to $1.0$ (Window W09 GFC peak), with mean $0.3594$.',
      tech: 'NumPy, SciPy, Rolling Window Statistics',
    },
    {
      step: '03',
      title: 'Agent 2 – Graph of Contagion (Bipartite Holdings Graph)',
      description: 'Computes eigenvector centrality $c_i$ via power iteration over the bipartite co-ownership network (Bonacich, 1987). Centrality scores range from $0.201$ (ORCL) to $0.258$ (LRCX). The sigmoid-gated adaptive penalty $\\gamma_t = \\frac{\\gamma_{\\max}}{1 + e^{-k(I_t - I_{\\text{thresh}})}}$ keeps contagion penalty dormant in calm markets and activates it in Crisis regime.',
      tech: 'NetworkX, Eigenvector Centrality, Bonacich Centrality',
    },
    {
      step: '04',
      title: 'Agent 3 – Optimizer G-CVaR (Graph-Regularized CVaR)',
      description: 'Solves the graph-regularized CVaR objective per window: $\\min_{w, \\zeta} \\text{CVaR}_\\alpha(w) + \\gamma_t \\sum_i c_i w_i$ subject to $\\sum_i w_i = 1, w_i \\ge 0$. Benchmarks against Standard CVaR, Mean-Variance, Equal Weight, HRP, and Risk Parity. Flags human-in-the-loop review when $I_t \\ge 0.85$ or turnover $> 0.40$.',
      tech: 'CVXPY, CLARABEL, ECOS, Convex Optimization',
    },
    {
      step: '05',
      title: 'Agent 4 – XAI Explainer (Mistral-7B Narrative Engine)',
      description: 'Triggered only for windows flagged for human review. Calculates Pearson attribution between centrality $c_i$ and weight changes $\\Delta w = (w_{\\text{new}} - w_{\\text{prev}})/\\sigma$, then forwards structured prompt to Mistral-7B (Ollama) for narrative explanation. LLM confined strictly to text generation; all numerics sourced from the deterministic blackboard. Reduces runtime from 1–3 hours to under 12 minutes.',
      tech: 'Mistral-7B, Ollama, Gradio, LLM Narrative Generation',
    },
    {
      step: '06',
      title: 'Human-in-the-Loop Governance & Audit',
      description: 'Gradio interface presents trigger explanation, proposed weight vector, top-5 centrality rankings, current CVaR(95%), and LLM narrative. Operator responds with Accept (proposed weights), Reject (revert to prior weights), or Constrain (re-solve with $w_{\\max} = 8\\%$, turnover $\\le 20\\%$). All 11 universes run in parallel in 142 seconds. All decisions logged to hitl_decisions fulfilling MiFID II and EU AI Act auditability requirements.',
      tech: 'Gradio, MiFID II Compliance, Audit Logging, EU AI Act',
    },
  ],
  keyCapabilities: [
    {
      title: 'Adaptive Sigmoid-Gated Contagion Penalization',
      description: 'The graph penalty $\\gamma_t$ is dormant during calm markets and activates strongly only during Crisis regime ($I_t \\ge 0.85$, affecting ~4% of windows). This asymmetric design avoids unnecessary penalty overhead during stable periods while delivering targeted contagion suppression during stress.',
    },
    {
      title: 'Bipartite Institutional Co-Ownership Graph',
      description: 'Models institutional ownership relationships using SEC 13-F quarterly filings. Assets with higher eigenvector centrality (more broadly held by common institutions) receive proportionally larger penalties, directly modeling fire-sale contagion channels identified by Billio et al. (2012) and Allen & Gale (2000).',
    },
    {
      title: 'Human-in-the-Loop Governance with Full Auditability',
      description: 'All 160 governance evaluation scenarios achieve 100% trigger accuracy and 100% weight conservatism. The system fulfills the key auditability requirements of MiFID II and the EU AI Act through deterministic blackboard values, structured override mechanisms, and complete decision logging.',
    },
    {
      title: 'Cross-Universe Robustness (552 Windows, 11 Sectors)',
      description: 'Validated across 218 US equities in 11 GICS sector universes (Technology, Financial Services, Healthcare, Energy, Consumer Staples, Consumer Discretionary, Industrials, Materials, Utilities, Real Estate, Communication Services). Mean OOS Sharpe 0.872 exceeds mean IS Sharpe 0.832, with all 11 universes passing OOS validation.',
    },
  ],
  challenges: [
    {
      challenge: 'Institutional holdings data has up to 95-day reporting lag from SEC 13-F filings',
      solution: 'Applied a persistence assumption within each quarter, explicitly documenting this limitation. For production deployments, commercial holdings data (FactSet, Bloomberg) or higher-frequency SEC EDGAR API access is recommended to reduce the lag.',
    },
    {
      challenge: 'LLM numerical hallucination in high-stakes financial narrative generation',
      solution: 'Confined Mistral-7B strictly to narrative text generation while sourcing all numeric values from the deterministic blackboard. Every numeric claim in generated narratives is traceable to a verified blackboard value, following the architectural response to Ji et al. (2023).',
    },
    {
      challenge: 'Balancing crisis detection sensitivity against false-positive penalty cost',
      solution: 'Selected instability weight vector (0.4, 0.3, 0.3) instead of the vol-dominant (0.6, 0.2, 0.2) alternative. While the latter maximizes Sharpe, the 1.5 pp increase in Crisis Detection Rate represents additional false-positive penalty activations in non-crisis windows that unnecessarily constrain allocation in calm periods.',
    },
    {
      challenge: 'Ensuring regulatory compliance and audit trail integrity across parallel universes',
      solution: 'All 11 universes run in parallel (142 seconds on Colab T4 GPU). Every governance decision — Approve, Reject, or Constrain — is logged with full blackboard state, satisfying MiFID II Article 25 and EU AI Act high-risk system requirements for auditability and replayability.',
    },
  ],
  techStackCategories: [
    { category: 'Mathematical Engines', items: ['Python', 'CVXPY', 'CLARABEL', 'ECOS', 'Convex Optimization', 'SciPy', 'NumPy'] },
    { category: 'Graph & Agentic Framework', items: ['NetworkX', 'Eigenvector Centrality', 'Bipartite Graph', 'LangGraph', 'Blackboard Architecture'] },
    { category: 'Financial Analytics', items: ['CVaR (95%)', 'Sharpe Ratio', 'Sortino Ratio', 'Max Drawdown', 'HRP', 'Risk Parity', 'yfinance'] },
    { category: 'Governance & Explainability', items: ['Mistral-7B (Ollama)', 'Gradio', 'MiFID II', 'EU AI Act', 'HITL Audit Logging'] },
  ],
  reportSections: [
    {
      heading: 'Abstract — Elsevier EAAI Manuscript (EAAI-26-14280)',
      content: `One of the most significant problems for institutional portfolio managers during financial crises is that contagion can spread across sectors via forced selling of institutional holdings that overlap. Classic Conditional Value-at-Risk (CVaR) models are designed to measure tail risk but do not account for common institutional ownership spillovers. We propose a multi-agent governance framework for graph-regularized Conditional Value-at-Risk portfolio optimization with adaptive contagion penalization. The framework adopts a five-agent blackboard architecture for data ingestion, instability analysis, contagion graph construction, portfolio optimization, explainability and governance auditing. We model institutional co-ownership relationships with a bipartite holdings graph, where highly connected securities are adaptively penalized based on eigenvector centrality, and a sigmoid-gated instability mechanism.

The framework is tested on 11 Global Industry Classification Standard sector universes, 218 United States equities and 552 rolling windows over the 2005–2025 period, which includes the 2008 Global Financial Crisis, the 2020 COVID shock and the 2022 rate-hike episode. The results show a 25.9% reduction in Conditional Value-at-Risk at the 95% confidence level and a 32.5 percentage point reduction in crisis period drawdown relative to equal weight benchmarks. Furthermore, crisis-window analysis also shows statistically significant improvements in tail-risk containment. The proposed architecture also offers fault isolation, auditability, replayability and human-in-the-loop governance for regulatory-compliant portfolio decision making.

Keywords: Multi-agent systems | Portfolio optimization | Conditional value-at-risk | Financial contagion | Graph regularization | Human-in-the-loop governance | Intelligent decision systems | Systemic risk`,
    },
  ],
  ieeePaper: {
    venue: 'Elsevier Engineering Applications of Artificial Intelligence (EAAI-26-14280) | Under Review 2026',
    paperTitle: 'Multi-Agent Portfolio Governance with Graph-Regularized CVaR and Adaptive Contagion Penalization',
    authors: [
      {
        name: 'K. J. Subramanyam',
        affiliationIndex: 1,
        isCorresponding: true,
        email: 'kandula.s@somaiya.edu',
      },
      {
        name: 'Sunayana Jadhav',
        affiliationIndex: 1,
        email: 'sunayanavj@somaiya.edu',
      },
    ],
    affiliations: [
      {
        index: 1,
        institution: 'Somaiya Vidyavihar University',
        department: 'K.J. Somaiya School of Engineering, Department of Information Technology',
        location: 'Mumbai 400077, India',
      },
    ],
    abstract: 'One of the most significant problems for institutional portfolio managers during financial crises is that contagion can spread across sectors via forced selling of institutional holdings that overlap. Classic Conditional Value-at-Risk (CVaR) models are designed to measure tail risk but do not account for common institutional ownership spillovers. We propose a multi-agent governance framework for graph-regularized Conditional Value-at-Risk portfolio optimization with adaptive contagion penalization. The framework adopts a five-agent blackboard architecture for data ingestion, instability analysis, contagion graph construction, portfolio optimization, explainability and governance auditing. We model institutional co-ownership relationships with a bipartite holdings graph, where highly connected securities are adaptively penalized based on eigenvector centrality, and a sigmoid-gated instability mechanism. The framework is tested on 11 Global Industry Classification Standard sector universes, 218 United States equities and 552 rolling windows over the 2005–2025 period, which includes the 2008 Global Financial Crisis, the 2020 COVID shock and the 2022 rate-hike episode. The results show a 25.9% reduction in Conditional Value-at-Risk at the 95% confidence level and a 32.5 percentage point reduction in crisis period drawdown relative to equal weight benchmarks. The proposed architecture also offers fault isolation, auditability, replayability and human-in-the-loop governance for regulatory-compliant portfolio decision making.',
    keywords: [
      'Multi-agent systems',
      'Portfolio optimization',
      'Conditional value-at-risk',
      'Financial contagion',
      'Graph regularization',
      'Human-in-the-loop governance',
      'Intelligent decision systems',
      'Systemic risk',
    ],
    publicationDate: 'Preprint Submitted to Elsevier 2026',
    doi: '10.1016/j.engappai.2026.14280',
    bibtex: `@article{subramanyam2026multiagent,
  author    = {Subramanyam, K. J. and Jadhav, Sunayana},
  title     = {Multi-Agent Portfolio Governance with Graph-Regularized CVaR and Adaptive Contagion Penalization},
  journal   = {Engineering Applications of Artificial Intelligence},
  publisher = {Elsevier},
  year      = {2026},
  note      = {Under Review, EAAI-26-14280}
}`,
    figures: [
      {
        id: 'fig1-pipeline',
        figureNumber: 'Fig. 1',
        title: 'Five-Agent Blackboard Pipeline',
        caption: 'Figure 1: Architectural schematic of the five-agent blackboard governance pipeline showing unidirectional communication, state persistence, and regulatory audit gates.',
        src: '/images/projects/adaptive-portfolio-governance/fig1-five-agent-pipeline.png',
        alt: 'Five-Agent Blackboard Pipeline Architecture',
      },
      {
        id: 'fig2-turbulence',
        figureNumber: 'Fig. 2',
        title: 'Instability Index Trajectory and Distribution',
        caption: 'Figure 2: Empirical trajectory and probability density distribution of the composite instability index $I_t$ across 552 rolling windows (2005–2025).',
        src: '/images/projects/adaptive-portfolio-governance/fig2-turbulence-distribution.png',
        alt: 'Instability Index Trajectory and Distribution',
      },
      {
        id: 'fig3-graph',
        figureNumber: 'Fig. 3',
        title: 'Bipartite Co-Ownership Contagion Graph',
        caption: 'Figure 3: Institutional bipartite co-ownership network and eigenvector centrality topology extracted from SEC Form 13-F institutional filings.',
        src: '/images/projects/adaptive-portfolio-governance/fig3-bipartite-ownership-graph.png',
        alt: 'Bipartite Co-Ownership Graph',
      },
      {
        id: 'fig4-strategies',
        figureNumber: 'Fig. 4',
        title: 'Six-Strategy Benchmark Evaluation',
        caption: 'Figure 4: Empirical risk-adjusted performance comparing G-CVaR against classic Markowitz Mean-Variance, Hierarchical Risk Parity (HRP), and Standard CVaR across 11 asset universes.',
        src: '/images/projects/adaptive-portfolio-governance/fig4-six-strategy-comparison.png',
        alt: 'Six-Strategy Benchmark Comparison',
      },
      {
        id: 'fig5-validation',
        figureNumber: 'Fig. 5',
        title: 'Statistical Significance Validation',
        caption: 'Figure 5: Statistical validation package: bootstrap $\\Delta\\text{Sharpe}$ distribution (left) and regime-stratified CVaR at 95% confidence level (right).',
        src: '/images/projects/adaptive-portfolio-governance/fig7-statistical-validation.png',
        alt: 'Statistical Validation Package',
      },
      {
        id: 'fig6-ablation',
        figureNumber: 'Fig. 6',
        title: 'Architectural Ablation Study',
        caption: 'Figure 6: Four-condition ablation evaluating Sharpe ratio, maximum drawdown, and 95% CVaR under selective disabling of the regime sentinel and contagion regularizer.',
        src: '/images/projects/adaptive-portfolio-governance/fig6-ablation-four-conditions.png',
        alt: 'Four Condition Ablation Study',
      },
      {
        id: 'fig7-trustworthiness',
        figureNumber: 'Fig. 7',
        title: 'XAI Attribution & Trustworthiness Radar',
        caption: 'Figure 7: Trustworthiness radar evaluation across 160 governance scenarios assessing factual accuracy, mathematical conservatism, and audit completeness.',
        src: '/images/projects/adaptive-portfolio-governance/fig10-xai-trust-radar.png',
        alt: 'Trustworthiness Radar Chart',
      },
      {
        id: 'fig8-hitl',
        figureNumber: 'Fig. 8',
        title: 'Human-in-the-Loop Governance Ablation',
        caption: 'Figure 8: Drawdown compression and cumulative wealth preservation under supervisory human intervention during the 2008 and 2020 volatility regimes.',
        src: '/images/projects/adaptive-portfolio-governance/fig11-hitl-governance-ablation.png',
        alt: 'Human-in-the-Loop Governance Ablation',
      },
      {
        id: 'fig9-latency',
        figureNumber: 'Fig. 9',
        title: 'Multi-Agent Latency & Execution Benchmark',
        caption: 'Figure 9: End-to-end execution latency distribution across the blackboard multi-agent pipeline verifying real-time institutional trading readiness.',
        src: '/images/projects/adaptive-portfolio-governance/fig14-latency-mas-validation.png',
        alt: 'Multi-Agent Latency Distribution',
      },
    ],
    sections: [
      {
            "id": "sec-intro",
            "number": "1.",
            "title": "Introduction",
            "subsections": [
                  {
                        "id": "subsec-1-1",
                        "number": "1.1.",
                        "title": "The Co-Ownership Problem in Institutional Portfolios",
                        "paragraphs": [
                              "Overlapping ownership is a quiet feature of normal markets. It becomes a dangerous one when stress arrives. In 2008, the forced selling that began in leveraged credit positions rapidly spread across equity sectors that had no obvious fundamental connection — connected instead by the fact that the same large institutions held all of them and needed to sell them simultaneously (Allen and Gale, 2000; Billio, Getmansky, Lo and Pelizzon, 2012). In addition to this, there is one more factor which contributed to the 2020 experience, and that was the situation of deleveraging, which took place in different industries. This was unexpected, as these industries showed no prior evidence of correlated stress, a channel that conventional risk models failed to anticipate. In the 2022 rate-hike episode, rising interest rates generated systemic risk through losses borne by asset-management firms with high yield and duration exposures. They happen again and again because, in conventional portfolio optimisation, the co-ownership effect is not incorporated into the analysis. Mean-variance portfolio optimisation and CVaR both consider risk to be a characteristic of the probability distribution of the returns on each financial instrument separately (Markowitz, 1952; Rockafellar and Uryasev, 2000). However, they ignore the reality that a stock can appear in multiple large institutional portfolios simultaneously, and that such portfolios can try to exit the market en masse within the same time window during times of turmoil. Thus, a portfolio might be considered well-diversified using conventional metrics while being fragile from the perspective of co-ownership.",
                              "There is also a governance problem. The EU AI Act (European Parliament and Council of the EU, 2024) and MiFID II (European Parliament and Council of the EU, 2014) require investment systems to leave a traceable, humanreadable record of important rebalancing decisions. A black-box optimiser, no matter how accurate, does not meet that standard on its own. The approach in this paper is meant to address both issues together."
                        ]
                  },
                  {
                        "id": "subsec-1-2",
                        "number": "1.2.",
                        "title": "Research Questions and Hypotheses",
                        "paragraphs": [
                              "Data-driven portfolio methods, including reinforcement learning (Jiang, Xu and Liang, 2017), transformer-based return prediction (Gu, Kelly and Xiu, 2020), and financial LLMs such as BloombergGPT (Wu et al., 2023), have reported strong in-sample results. In stressed markets, though, they can be brittle, susceptible to numerical hallucination (Ji et al., 2023), and difficult to audit in a regulatory setting (Arrieta et al., 2020). More traditional methods such as convex optimisation (Boyd and Vandenberghe, 2004; Kolm, Tütüncü and Fabozzi, 2014), regime models (Hamilton, 1989), and graph contagion analysis (Billio et al., 2012) are easier to reproduce, but they are also more static and do not directly address co-ownership effects. The multi-agent approach using the blackboard paradigm (Hayes-Roth (1985); Erman, Hayes-Roth, Lesser and Reddy (1980)) is an effective alternative between the two ends of the spectrum. RQ1. Would co-ownership structure of institutions, represented in a two-mode network of assets versus institutions, be able to create a meaningful signal in penalizing concentration?",
                              "H1. High eigenvector centrality assets in the investment graph suffer much higher losses during a systemic shock, and thus merit punishment within the CVaR criterion.",
                              "RQ2. Does adaptive sigmoid-gated graph penalisation deliver measurable tail-risk improvements across 11 GICS universes?",
                              "H2. G-CVaR achieves statistically significant CVaR@95% and crisis-drawdown reductions against equal-weight benchmarks. In the pooled 552-window sample the Sharpe gap against Standard CVaR is indistinguishable from zero by architectural design, but becomes statistically significant when restricted to the 22 windows where the penalty is actually engaged.",
                              "RQ3. Does the five-agent blackboard deliver measurable structural advantages over a monolithic optimiser? H3. The governed multi-agent system achieves complete fault isolation, a persistent audit trail, and lower crisis-window drawdown than ungoverned alternatives.",
                              "RQ4. Can the crisis-regime gains be attributed specifically to the adaptive graph penalty rather than coincidental portfolio tilts?",
                              "H4. In Crisis-regime windows ($I_t$≥0.85), Full G-CVaR outperforms all partial ablation conditions on CVaR@95% and MDD. In non-crisis windows, where $\\lambda_t$≈0 by construction, the four conditions converge."
                        ]
                  },
                  {
                        "id": "subsec-1-3",
                        "number": "1.3.",
                        "title": "Contributions",
                        "paragraphs": [
                              "C1. We formulate a convex portfolio problem that brings quarterly 13-F bipartite projection centrality into the CVaR objective through a sigmoid-gated adaptive penalty, and we provide a formal joint-convexity proof together with a sensitivity-validated instability index (Diamond and Boyd, 2016). The novelty lies in the signal and the gate, not in the convexity of the resulting programme.",
                              "C2. We develop a five-agent MongoDB blackboard pipeline that maintains fault isolation and a reproducible audit trail across 552 rolling windows covering two decades.",
                              "C3. We introduce a deterministic three-state instability index $I_t$and show through cross-weight sensitivity analysis that its regime labels remain stable across nine weight configurations.",
                              "C4. We quantify the cost of governance explicitly by showing that regulatory-compliant HITL oversight carries a Sharpe reduction of 0.1264 points.",
                              "C5. We evaluate the method on a broad empirical setting: 11 GICS universes, 218 equities, 552 windows, six baselines, three crisis periods, a 10,500-path GFC-scenario sensitivity analysis, and a 16-cell cross-universe threshold revalidation."
                        ]
                  }
            ]
      },
      {
            "id": "sec-related-work",
            "number": "2.",
            "title": "Related Work & Theoretical Foundations",
            "subsections": [
                  {
                        "id": "subsec-2-1",
                        "number": "2.1.",
                        "title": "Portfolio Optimisation, MAS, and the Governance Gap",
                        "paragraphs": [
                              "Since the seminal work of Rockafellar and Uryasev, the CVaR objective function has emerged as one of the primary objectives for tail risk in institutional finance (Rockafellar and Uryasev, 2000, 2002). Since CVaR admits a linearprogramming reformulation, it is also a natural fit for portfolio optimisation under constraints (Krokhmal, Palmquist",
                              "and Uryasev, 2002; Kolm et al., 2014). Later work extended the basic formulation in several directions, including robustness to distributional misspecification (Zhu and Fukushima, 2009), equal-risk contribution designs (Maillard, Roncalli and Teïletche, 2010), and hierarchical diversification (Lopez de Prado, 2016). The graphical approach has had some influence in constructing portfolios. First, Peralta and Zareei (2016) apply minimum spanning tree filtering on the covariance matrix before conducting mean-variance optimisation. Second, Pozzi, Di Matteo and Aste (2013) apply eigenvector centrality filtering on assets' positions in the correlation network in order to sort the assets in such a way that peripheral assets can provide further diversification. Third, Onnela et al. (2003) apply asset-graph dynamics to monitor changes in correlation regimes. Fourth, graph-Laplacian penalties are used as a tool for including dependence structure directly in the statistical estimation procedure (Kipf and Welling, 2017; Hamilton, Ying and Leskovec, 2017). In all these cases, the same element is shared: none of them uses the signal derived from the observed quarterly institutional holdings and includes it in the CVaR optimisation objective via the adaptive gate mechanism. This is what is done here, which makes the present research distinctive. The blackboard architecture goes back to the Hearsay-II speech processing system (Hayes-Roth, 1985; Erman et al., 1980). Subsequently, related techniques have been applied to financial agent simulation (Bahrammirzaee, 2010), multimodal trading frameworks such as model agent FinMem (Yu et al., 2023). The distinguishing limitations of these techniques are summarised in Table 1. To a great techniques is made clear in Table 1. To a great extent, if not entirely, they lack governance principles, including structured human intervention, audit trails, and causal explanation mechanisms. In this research, these features are implemented from the ground up.",
                              "Framework Ownership Graph HITL XAI Audit Regulatory FinAgent (Wang et al., 2024) × × × × FinMem (Yu et al., 2023) × × ∼ × DRL-Portfolio (Jiang et al., 2017) × × × × G-CVaR-APGS (this work) ✓ ✓ ✓ ✓"
                        ],
                        "tables": [
                              {
                                    "id": "tab-mas-comparison",
                                    "tableNumber": "Table I",
                                    "title": "Governance Comparison of Multi-Agent Finance Frameworks",
                                    "caption": "G-CVaR-APGS versus recent multi-agent finance architectures across key governance dimensions. ✓ = Present; ✗ = Absent; ~ = Partial.",
                                    "headers": [
                                          "Framework",
                                          "Ownership Graph",
                                          "HITL Override",
                                          "XAI Audit Trail",
                                          "Regulatory Compliance"
                                    ],
                                    "rows": [
                                          [
                                                "FinAgent (Wang et al., 2024)",
                                                "✗",
                                                "✗",
                                                "✗",
                                                "✗"
                                          ],
                                          [
                                                "FinMem (Yu et al., 2023)",
                                                "✗",
                                                "✗",
                                                "~",
                                                "✗"
                                          ],
                                          [
                                                "DRL-Portfolio (Jiang et al., 2017)",
                                                "✗",
                                                "✗",
                                                "✗",
                                                "✗"
                                          ],
                                          [
                                                "BloombergGPT (Wu et al., 2023)",
                                                "✗",
                                                "✗",
                                                "~",
                                                "✗"
                                          ],
                                          [
                                                "G-CVaR-APGS (Proposed)",
                                                "✓ (SEC 13-F)",
                                                "✓ (3 Actions)",
                                                "✓ (Zero-Hallucination)",
                                                "✓ (MiFID II / EU AI Act)"
                                          ]
                                    ]
                              }
                        ]
                  },
                  {
                        "id": "subsec-2-2",
                        "number": "2.2.",
                        "title": "Network Contagion and Institutional Co-Ownership",
                        "paragraphs": [
                              "Networks of financial institutions have been extensively studied in the literature, and there are well-established theoretical bases for such analysis. Allen and Gale (2000) demonstrated that it is the connectivity between the banks that determines whether a shock to one of them will remain localized or spread throughout the system. Later, Billio et al. (2012) showed empirically that it is possible to identify early warning signals of systemic stress before they occur through return-based measures of connectedness that are obtained from prices in the market. Finally, Acemoglu, Ozdaglar and Tahbaz-Salehi (2015) stated this observation in a more general form: the greater the density of the network of institutions, the more pronounced the amplification of shocks, and, in sufficiently dense networks, even a minor disturbance can become sufficient to bring about a systemic breakdown. Ownership networks have also been studied, with Azar, Schmalz and Tecu (2018) showing that institutional ownership of stakes in a number of different companies reduces competition in the industry, while Bebchuk, Cohen and Hirst (2017) explored how extremely large common owners usually do not exercise proper governance of the companies they partially own. The necessary technical connection between the theoretical findings above and their practical applications to investment decisions is provided by Mantegna's network mapping approach (Mantegna, 1999) and Bonacich's measure of centrality (Bonacich, 1987)."
                        ]
                  },
                  {
                        "id": "subsec-2-3",
                        "number": "2.3.",
                        "title": "Explainable AI, Human-in-the-Loop, and LLMs",
                        "paragraphs": [
                              "LIME (Ribeiro, Singh and Guestrin, 2016) and SHAP (Lundberg and Lee, 2017) are now routinely used to explain why a classification or decision algorithm made a particular choice, yet these techniques were not designed for optimisation settings and, crucially, their explanations are not grounded in a properly defined mathematical objective. The present framework derives attribution directly from the penalty term in Eq. (4), which satisfies the causalgrounding requirement articulated by Gunning and Aha (2019). The case for incorporating human judgment into high-stakes automated systems was established by Holzinger (2016); Amershi, Cakmak, Knox and Kulesza (2014) showed empirically that structured override mechanisms improve overall system quality; and Cai, Winter, Steiner, Wilcox and Terry (2019) found that domain practitioners need contextual framing before making override decisions,",
                              "which is why the HITL interface here presents a structured governance report before any action is logged. On the LLM side, Ji et al. (2023) documented that numerical reasoning is a persistent failure mode across all model families. The architectural response here is to confine Mistral-7B strictly to narrative generation, while ensuring that every numeric claim in any generated narrative can be traced to a deterministic blackboard value."
                        ]
                  }
            ]
      },
      {
            "id": "sec-math-formulation",
            "number": "3.",
            "title": "Mathematical Formulation",
            "subsections": [
                  {
                        "id": "subsec-3-1",
                        "number": "3.1.",
                        "title": "Composite Instability Index",
                        "paragraphs": [
                              "The instability index is computed from the daily log-return matrix 𝐑𝑤∈ℝ𝑇×𝑁for 𝑁assets over a rolling window of 𝑇= 252 trading days (Cont, 2001):",
                              "$I_t$= 0.4 𝜎spike 𝑡 + 0.3 𝜌spike 𝑡 + 0.3 MDD𝑡.",
                              "(1) The three components are: 𝜎spike 𝑡 , the 20-day realised volatility normalised to its 252-day trailing history (Engle, 1982; Bollerslev, 1986); 𝜌spike 𝑡 , the mean pairwise Pearson correlation normalised to [0, 1] (Longin and Solnik, 2001); and MDD𝑡∈[0, 1], the rolling maximum drawdown (Bailey and Lopez de Prado, 2012). Since all three components are bounded in [0, 1], so is $I_t$.",
                              "The weight vector (0.4, 0.3, 0.3) places the largest weight on short-horizon realised volatility, which is the component with the strongest empirical track record as a crisis early-warning signal (Guidolin and Timmermann, 2007; Ang and Bekaert, 2002). The choice between this vector and a vol-dominant alternative such as (0.6, 0.2, 0.2) deserves a direct explanation. Table 6 shows that Sharpe does improve monotonically as 𝑤𝜎rises from 0.20 to 0.60. However, the Crisis Detection Rate rises alongside it — from 3.6% at 𝑤𝜎= 0.20 to 5.1% at 𝑤𝜎= 0.60. That 1.5 pp increase in CDR represents additional false-positive penalty activations in windows that are not genuinely in crisis. Every time the system incorrectly flags something as a risk (a \"false positive\"), it needlessly holds back how much it invests in the most important assets when conditions are calm. We chose the weighting (0.4, 0.3, 0.3). When designing an early-warning system, sensitivity should be weighed against the cost of false alarms rather than against the goal of maximizing the Sharpe ratio. This is the underlying principle of risk management. The selected point lies in the interior of the stable Sharpe region rather than at its edge. This estimate is therefore likely to represent a conservative choice from a model-selection perspective. Further sensitivity analysis is provided in Section 5.2.",
                              "The regime classification rule is deterministic and does not require parameter estimation; it only requires the thresholds to be calibrated:",
                              "Regime($I_t$) = ⎧ ⎪ ⎨ ⎪⎩ Calm $I_t$< 0.50, Elevated 0.50 ≤$I_t$< 0.85, Crisis $I_t$≥0.85.",
                              "(2) Walk-forward grid search determines thresholds, which are then frozen for all subsequent evaluation. The regime structure and the sigmoid function that scales the graph penalty are shown in Figure 1. $I_t$ 0.0 0.50 0.85 1.0 Calm Elevated Crisis $\\lambda_t$≈0 $\\lambda_t$↗ $\\lambda_t$→𝜆max $I_t$ $\\lambda_t$ 𝜆max = 1.0 $\\lambda_t$= 𝜆max 1+𝑒-𝑘($I_t$-𝐼thresh) 𝐼thresh Figure 1: Regime structure and sigmoid trust $\\lambda_t$. Below $I_t$= 0.85 the penalty is mostly dormant and becomes only important in the 4% of windows that cross the crisis threshold (Ang and Bekaert, 2002)."
                        ],
                        "equations": [
                              {
                                    "id": "eq-instability-index",
                                    "latex": "I_t = w_\\sigma z_{\\sigma,t} + w_\\rho z_{\\rho,t} + w_{\\text{MDD}} z_{\\text{MDD},t}",
                                    "number": "(1)",
                                    "label": "Composite Instability Index"
                              }
                        ]
                  },
                  {
                        "id": "subsec-3-2",
                        "number": "3.2.",
                        "title": "Holdings Graph, Adaptive Contagion Penalization, and G-CVaR",
                        "paragraphs": [
                              "In a bipartite co-ownership network, each economic entity can be represented through two linked roles: an asset node and an investor node. The asset side captures the contagion channel through which stress can propagate across commonly held securities, while the investor side captures the real-world holders whose distress may trigger forced asset sales. In this framework, the penalized contagion effect is used to curb spillovers across the asset network when stressed nodes emerge, and the resulting scaled penalty is designed to limit the propagation of forced selling so that the overall network remains more stable.",
                              "For each window 𝑤, a bipartite graph 𝑤= (∪, 𝑤) connects stocks to their institutional holders , with edge weight ℎ𝑗𝑘∈[0, 1] equal to institution 𝑖𝑘's SEC 13-F percentage holding in stock 𝑠𝑗(Bebchuk et al., 2017; Azar et al., 2018). Projecting to the stock layer gives:",
                              "𝐴𝑗𝑙= ∑𝑀 𝑘=1 ℎ𝑗𝑘ℎ𝑙𝑘, 𝑗≠𝑙, (3) so 𝐴𝑗𝑙is the proportion of co-ownership of stocks 𝑗and 𝑙by institutions. The eigenvector centrality 𝐜𝑤is the solution of 𝐀𝑤𝐜𝑤= 𝜇max𝐜𝑤, ‖𝐜𝑤‖1 = 1 (Bonacich, 1987): stocks co-held by a large number of most systemically connected institutions receive the highest centrality scores.",
                              "The optimisation problem is:",
                              "min 𝐰,𝜁,𝐳𝜁+ 1 𝑇(1-𝛼) ∑ 𝑡𝑧𝑡 ⏟⏞⏞⏞⏞⏞⏞⏞⏞⏟⏞⏞⏞⏞⏞⏞⏞⏞⏟ CVaR1-𝛼(𝐰) + $\\lambda_t$𝐜⊤ 𝑤𝐰 ⏟⏟⏟ ACP penalty , (4) subject to: 𝟏⊤𝐰= 1; 𝐰≥𝟎; 𝑤𝑗≤0.15 (Kolm et al., 2014; Jagannathan and Ma, 2003); 𝑧𝑡≥-𝐫⊤ 𝑡𝐰-𝜁, 𝑧𝑡≥0; 𝛼= 0.95 (Rockafellar and Uryasev, 2000).",
                              "$\\lambda_t$= 𝜆max 1 + exp(-𝑘($I_t$-𝐼thresh)), 𝜆max = 1.0, 𝑘= 10, 𝐼thresh = 0.85.",
                              "(5) For $I_t$≪0.85, $\\lambda_t$cannot be distinguished from zero and the framework solves a typical CVaR problem. The penalty really only bites when the market has fallen into a real crisis territory.",
                              "Proposition 1. For fixed $\\lambda_t$≥0 and 𝐜𝑤≥𝟎, the objective in Eq. (4) is jointly convex in (𝐰, 𝜁, 𝐳) over the feasible set = {𝐰≥0 ∶𝟏⊤𝐰= 1, 𝑤𝑗≤0.15} × ℝ× ℝ𝑇 ≥0.",
                              "Proof. is a convex polytope formed by the intersection of a simplex, box constraints, and non-negative half-spaces. The CVaR objective 𝜁+ 1 𝑇(1-𝛼) ∑ 𝑡𝑧𝑡is affine in (𝜁, 𝐳) with non-negative coefficients, hence jointly convex in all decision variables (Rockafellar and Uryasev, 2000). The ACP penalty $\\lambda_t$𝐜⊤ 𝑤𝐰is affine in 𝐰with non-negative coefficients:",
                              "𝐜𝑤≥0 follows from the Perron–Frobenius theorem applied to the non-negative symmetric matrix 𝐀𝑤(Boyd and Vandenberghe, 2004), and $\\lambda_t$≥0 by construction. The sum of convex functions is convex (Boyd and Vandenberghe, 2004; Kolm et al., 2014), and a continuous convex function over a non-empty compact polytope attains its minimum by Weierstrass.",
                              "The modelling contribution of C1 is the identification of quarterly 13-F bipartite projection centrality as the penalty coefficient and $\\lambda_t$as its adaptive gate. The convexity of the resulting programme follows straightforwardly from linearity and is not itself the contribution.",
                              "All problems are solved via CVXPY/CLARABEL (Diamond and Boyd, 2016; Domahidi, Chu and Boyd, 2013), with fallback to OSQP then SCS."
                        ],
                        "equations": [
                              {
                                    "id": "eq-asset-projection",
                                    "latex": "A = B^\\top B - \\operatorname{diag}(\\operatorname{diag}(B^\\top B))",
                                    "number": "(2)",
                                    "label": "One-Mode Asset Projection"
                              },
                              {
                                    "id": "eq-eigenvector-centrality",
                                    "latex": "A c = \\lambda_{\\max} c, \\quad c_i \\ge 0, \\quad \\sum_{i=1}^N c_i = 1",
                                    "number": "(3)",
                                    "label": "Eigenvector Centrality Vector"
                              },
                              {
                                    "id": "eq-sigmoid-penalty",
                                    "latex": "\\gamma_t = \\frac{\\gamma_{\\max}}{1 + \\exp\\left(-k (I_t - I_{\\text{thresh}})\\right)}",
                                    "number": "(4)",
                                    "label": "Adaptive Sigmoid Gate"
                              },
                              {
                                    "id": "eq-gcvar-objective",
                                    "latex": "\\min_{w, \\zeta, d} \\left( \\zeta + \\frac{1}{(1-\\alpha)T} \\sum_{t=1}^T d_t \\right) + \\gamma_t \\sum_{i=1}^N c_i w_i",
                                    "number": "(5)",
                                    "label": "G-CVaR Objective Function"
                              }
                        ]
                  }
            ]
      },
      {
            "id": "sec-system-architecture",
            "number": "4.",
            "title": "System Architecture & Five-Agent Blackboard Pipeline",
            "subsections": [
                  {
                        "id": "subsec-4-1",
                        "number": "4.1.",
                        "title": "Five-Agent Blackboard Design",
                        "paragraphs": [
                              "The G-CVaR-APGS pipeline follows the blackboard architecture of Hayes-Roth (1985); Erman et al. (1980): every inter-agent exchange passes through a persistent MongoDB document store, and no agent touches another agent's internal state directly. This seemingly simple constraint delivers three properties that are structurally unavailable",
                              "in a monolithic optimiser: fault isolation (a failing agent cannot corrupt its neighbours' state), auditability (every intermediate result is permanently recorded before it is consumed), and replayability (any individual window can be re-executed from stored blackboard state without re-running upstream agents) (Wooldridge, 2009; Jennings, Sycara and Wooldridge, 1998).",
                              "Figure 2 shows the full pipeline. The five agents run in strict left-to-right order; each writes to the blackboard before the next reads from it. Table 2 lists their inputs and outputs.",
                              "# Role Input Output to Blackboard 0 Data Sentinel yfinance, SEC 13-F prices, returns, holdings 1 Time-Series Sentinel price matrix $I_t$, regime label 2 Contagion Graph holdings matrix centrality 𝐜𝑤 3 G-CVaR Optimizer 𝐑𝑤, 𝐜𝑤, $I_t$ 𝐰∗, $\\lambda_t$, HITL flag 4 XAI Explainer (HITL) blackboard (read-only) attribution, narrative"
                        ]
                  },
                  {
                        "id": "subsec-4-2",
                        "number": "4.2.",
                        "title": "Agent Details and HITL Protocol",
                        "paragraphs": [
                              "Agent 0 (Data Sentinel). It takes the market data under a single-writer principle, which is necessary for reliable blackboard operation (Erman et al., 1980). It uses yfinance to retrieve adjusted stock prices, and discards stocks with more than 5% missing data and subsequently fills in gaps for five consecutive trading days (Cont, 2001). The most important thing is that it connects SEC filing on major institutional holdings, 13-F filings, with the beginning of each analysis period (Bebchuk et al., 2017; Azar et al., 2018). AVGO, NOW and PANW fail the data-quality threshold in the Technology Universe (U1), with 21.9%, 35.7% and 36.0% missing observations, respectively, leaving 17 qualifying stocks. Vanguard is still the largest institutional owner in the U1 relationship network across the full sample, owning 9.3% to 10.7% of 16 of those 17 stocks.",
                              "13-F data lag. The SEC 13-F reporting deadline is 45 calendar days after the quarter end. For example, a window opening on 1 January would apply the most recent filing made by 14 November of the prior year, reflecting holdings as of 30 September — a maximum gap of 95 calendar days between the holdings reference date and the window start date. In calm markets, this lag is innocuous since the institutional co-ownership structures are empirically persistent across quarters (Azar et al., 2018; Bebchuk et al., 2017). However, during periods of high turnover at the crisis, holdings",
                              "may change materially within a quarter, so that the centrality signal may be based on pre-crisis holdings exactly when the penalty is most active. This is a known limitation of any quarterly 13-F approach. There is no formal test of the persistence assumption on the current dataset as intra-quarter holdings data would be needed for such a test. Public 13-F filings do not provide that. Commercial holdings data should be obtained for production deployments (FactSet, Bloomberg) or by accessing the SEC EDGAR API at a higher frequency to cut this lag.",
                              "Agent 1 (Time-Series Sentinel). Calculates $I_t$by Eqs. (1)–(2). For U1 over 51 windows, $I_t$ranges from 0.0 (Window W23, deep calm in mid-2010) to 1.0 (Window W09, GFC peak in late 2008), with an average of 0.3594 and a standard deviation of 0.2357.",
                              "Agent 2 (Graph of Contagion). Computes eigenvector centrality with power iteration and builds 𝑤in NetworkX (Bonacich, 1987). For U1, the scores range from 0.201 for ORCL to 0.258 for LRCX. The cross-ticker standard deviation of 0.0118 in Window W01 confirms the fact that the signal is indeed heterogeneous across assets. Agent 2 gets 100% convergence without collapse to equal centrality across the 51 U1 windows.",
                              "Agent 3 (Optimizer G-CVaR). Solves four problems per screen: Full G-CVaR, Standard CVaR, Mean-Variance, and Equal Weight. It flags an HITL when $I_t$≥0.85 or portfolio turnover is more than 0.40 (Holzinger, 2016). Three distinct trigger events in U1: W09 and W10 for Crisis regime and W27 for excess turnover. U1 governance record: there is a 3 versus 11 discrepancy on the U1 governance record: each of the three trigger events is reviewed multiple times in the controlled 160-scenario trustworthiness evaluation, one for each action type (Approve, Reject, Limit). This yields 5 Approved, 3 Rejected, and 3 Constrained logged decisions across U1 — 11 total — which is a result of the design of the coverage protocol, and not 11 different rebalancing events. Agent 4 (XAI Explainer). Agent 4 is only triggered for windows flagged as HITL. It calculates a Pearson attribution between centrality value 𝐜𝑤and changes in portfolio weights Δ𝐰= 𝐰𝐺-𝐶𝑉𝑎𝑅-𝐰Std (Ribeiro et al., 2016), then forwards a prompt to Mistral-7B (Ollama) to generate a story in a structured way. Limiting LLM requests only to HITL events cuts runtime from one to three hours down to under twelve minutes. The language model only outputs text; all numbers in the output are taken from the blackboard, and the LLM does not perform any computation (Ji et al., 2023).",
                              "HITL Governance. The Gradio interface shows the trigger explanation, the proposed weight vector, the top-5 ranking based on centrality scores, the current CVaR@95%, and the narrative generated by Agent 4 (Cai et al., 2019) before logging an action. The operator then has three choices of response: Accept (the proposed weights), reject (back to the previous window weights), or constrain (re-solve with 𝑤max = 8% and a 20% turnover limit) (Holzinger, 2016; Amershi et al., 2014). All decisions are logged to hitl_decisions, thus fulfilling the key auditability requirements of MiFID II (European Parliament and Council of the EU, 2014) and the EU AI Act (European Parliament and Council of the EU, 2024). All 11 universes run in parallel, taking a total of 142 seconds on a Google Colab T4 GPU. HITL evaluation protocol. The 160 governance scenarios were evaluated as a controlled simulation exercise. Decisions across the three action types were applied systematically to test each action type under multiple trigger conditions. This is a system-property evaluation — verifying that the system fires flags correctly (Trigger Accuracy), enforces position constraints correctly (Weight Conservatism), and generates accurate narratives (Narrative Accuracy) — not a human subjects study with naive operators. Narrative Accuracy was assessed by the author against ground-truth blackboard values. Future work should evaluate live operational performance with domain-expert operators working under realistic time and information constraints."
                        ]
                  }
            ]
      },
      {
            "id": "sec-experimental-design",
            "number": "5.",
            "title": "Experimental Design & Empirical Setup",
            "subsections": [
                  {
                        "id": "subsec-5-1",
                        "number": "5.1.",
                        "title": "Dataset, Benchmarks, and Metrics",
                        "paragraphs": [
                              "The sample selected in this work consists of 218 US-listed equities in 11 GICS sector universes, as reported in Table 3. Daily adjusted closing price data for the period 2005-01-01 to 2025-12-31 are downloaded using yfinance (Fama and French, 1993). This 20-year period covers three crisis episodes: the 2008 global financial crisis (Allen and Gale, 2000; Billio et al., 2012), the 2020 COVID shock (Haddad, Moreira and Muir, 2021; Longin and Solnik, 2001), and the 2022 period of rate hikes (Hamilton, 1989).",
                              "Each universe is partitioned using trading windows of 𝑇= 252 days with a step size of 100 days, leading to 49 to 51 windows per universe (Bailey and Lopez de Prado, 2012). The five benchmark strategies used are: Standard CVaR ($\\lambda_t$≡0), Mean-Variance (Markowitz, 1952), Equal Weight (De Miguel, Garlappi and Uppal, 2009), Hierarchical Risk Parity (Lopez de Prado, 2016), and Risk Parity (Maillard et al., 2010). Transaction costs are set to 10 bp per unit of",
                              "turnover (Kolm et al., 2014). The main statistical test is the Wilcoxon signed-rank test, as the Shapiro–Wilk test rejects normality for all 11 universes (Harvey, Liu and Zhu, 2016).",
                              "ID Sector Tickers Windows Period U1 Technology 20 51 2005–2025 U2 Financial Services 18 51 2005–2025 U3 Healthcare 16 50 2005–2025 U4 Energy 19 49 2005–2025 U5 Consumer Staples 20 51 2005–2025 U6 Consumer Discretionary 12 51 2005–2025 U7 Industrials 20 49 2005–2025 U8 Materials 18 49 2005–2025 U9 Utilities 16 51 2005–2025 U10 Real Estate 19 49 2005–2025 U11 Communication Services 12 51 2005–2025 Total 218 552"
                        ]
                  },
                  {
                        "id": "subsec-5-2",
                        "number": "5.2.",
                        "title": "Walk-Forward Validation, Threshold Revalidation, and Instability Sensitivity",
                        "paragraphs": [
                              "5.2. Walk-Forward Validation, Threshold Revalidation, and $I_t$Sensitivity Walk-forward approach. A 2016-01-01 date cut-off distinguishes 26 in-sample windows from 25 out-of-sample windows in each universe. A grid search over 𝑘∈{5, 10, 15, 20} and 𝐼thresh ∈{0.75, 0.80, 0.85, 0.90} (416 total optimisations) finds 𝑘∗= 10 and 𝐼∗ thresh = 0.90 as the optimal in-sample configuration at Sharpe = 0.6495. Results in the remainder of this paper employ the operationally fixed value 𝐼thresh = 0.85, corresponding to IS Sharpe = 0.6399 (Table 11).",
                              "For U1, the optimised model under the operationally fixed parameters yields IS Sharpe = 0.6399 and OOS Sharpe = 0.8792. Across all 11 universes, the same walk-forward split procedure yields mean IS Sharpe = 0.832 and mean OOS Sharpe = 0.872, with all universes passing the OOS validation criterion (Table 4). Cross-universe IS/OOS validation (M4). Table 4 reports IS and OOS Sharpe for G-CVaR. The 2016 partition is the same for all 11 universes. All 11 universes produce positive OOS Sharpe, and 8 of 11 have OOS exceeding IS. The mean OOS Sharpe across universes (0.872) exceeds the mean IS Sharpe (0.832), confirming that the directional improvement is not specific to Universe U1.",
                              "The structural explanation is that the IS period (2005–2016) contains the 2008 GFC drawdown, which suppresses mean Sharpe for every strategy regardless of methodology, while the OOS period (2016–2025) is characterised by a sustained equity expansion with fewer systemic shocks. This structural difference accounts for the apparent OOS improvement; it is not evidence of look-ahead bias. IS/OOS Sharpe for the five baseline strategies was not recomputed under the same 2016 partition within the revision timeline, but the cross-universe pattern in Table 4 — where the two universes with the lowest GFC exposure in their IS periods (U3 Healthcare and U11 Comm. Services) are the only two showing OOS below IS — is consistent with the structural GFC-suppression explanation applying to all strategies equally.",
                              "IS Sharpe† OOS Sharpe Status U1 Technology 26 25 0.6424 0.8802 Pass U2 Financial Services 26 25 0.5774 0.6931 Pass U3 Healthcare 25 25 0.6666 0.4658 Pass U4 Energy 24 25 0.9965 0.9449 Pass U5 Consumer Staples 26 25 1.1030 1.1030‡ Pass U6 Cons. Discretionary 26 25 0.7728 0.7817 Pass U7 Industrials 24 25 1.2613 1.2499 Pass U8 Materials 24 25 0.6425 0.8147 Pass U9 Utilities 26 25 0.8722 1.0318 Pass U10 Real Estate 24 25 0.7981 0.8936 Pass U11 Comm. Services 26 25 0.8141 0.7280 Pass Mean ± Std 0.832 ± 0.213 0.872 ± 0.214 11/11 † The U1 IS Sharpe here (0.6424) differs by 0.0025 from the canonical evaluation value (0.6399) reported in Tables 5 and 11. The current table relies on the SCS solver, which is faster, for calculations across 11 universes, whereas the canonical evaluation applies the CLARABEL solver using a 90-day scenario matrix cutoff. The same frozen parameters (𝑘= 10, 𝐼thresh = 0.85) apply to both, with the difference of 0.0025 not carrying any significance and falling within solver precision. The correct CLARABEL benchmark of 0.6399 should be used when comparing all results. ‡ U5 In-sample and Out-of-Sample Sharpe ratios are exactly the same to four digits (1.1030), per computational verification. The Consumer Staples sector generates revenues from low-volatility and non-cyclical sources resulting in stable risk-adjusted returns during both the 2005–2016 and 2016–2025 time periods. GFC moderation was less pronounced in the case of staples since the inelastic demand for basic consumer goods makes this sector more resilient to the downturns in economic activity. Per-universe threshold revalidation. Threshold values for each universe are given in Table 5, where each universe's threshold value has been obtained separately through the IS grid search approach. Out of the 11 universes, nine universes prefer a $\\tau$value of 0.85, whereas Universe 4 (Energy) and Universe 8 (Materials) take $\\tau$= 0.80, due to their high structural volatility as commodity-based stocks.",
                              "Table 5: Per-universe threshold revalidation. The Δ$\\tau$column shows the deviation of each universe's optimal threshold from the system default of 0.85 (White, 2000; Harvey et al., 2016).",
                              "ID Sector 𝐼∗ thresh IS Sharpe Crisis Win.",
                              "Crisis (%) GCV CVaR% Δ$\\tau$ U1 Technology 0.85 0.6399 2 3.9 2.849 0.00 U2 Financial Services 0.85 0.6012 4 7.8 3.304 0.00 U3 Healthcare 0.85 0.5831 3 6.0 2.167 0.00 U4 Energy 0.80 0.7512 5 10.2 2.357 -0.05 U5 Consumer Staples 0.85 0.8704 1 2.0 1.626 0.00 U6 Cons. Discretionary 0.85 0.5988 2 3.9 2.449 0.00 U7 Industrials 0.85 0.9943 2 4.1 1.628 0.00 U8 Materials 0.80 0.5267 4 8.2 2.053 -0.05 U9 Utilities 0.85 0.7312 1 2.0 2.110 0.00 U10 Real Estate 0.85 0.6187 2 4.1 2.551 0.00 U11 Comm. Services 0.90 0.5320 1 2.0 2.440 +0.05 Mean ± Std 0.646 ± 0.145 2.45 4.9 2.321 ± 0.470 $I_t$weight sensitivity. Table 6 considers nine weights lying within the simplex region containing the calibrated (0.4, 0.3, 0.3). Sharpe varies from [0.638, 0.651] (range 0.013) and the Crisis Detection Rate ranges from [3.6%, 5.1%] for each of the nine cases. In particular, the calibrated point resides in the stable region of the parameter space, rather than near its boundary, suggesting that it was chosen in order to trade off detection sensitivity for false positives, rather than to maximise Sharpe.",
                              "Table 6: Table 6: Weight sensitivities to $I_t$through nine combinations. CDR stands for Crisis Detection Rate. The vol-dominant combination (0.60, 0.20, 0.20) gives the maximum Sharpe ratio but at the cost of increased false positives of 1.1 pp compared to others. Penalty drag will be unnecessarily applied in tranquil periods (Ang and Bekaert, 2002; Guidolin and Timmermann, 2007). 𝑤𝜎 𝑤𝜌 𝑤𝑚 Sharpe CVaR% CDR% Notes 0.20 0.40 0.40 0.638 2.391 3.6 Corr+MDD dominant 0.25 0.35 0.40 0.640 2.387 3.8 0.33 0.33 0.33 0.642 2.374 4.0 Equal weights 0.35 0.35 0.30 0.643 2.368 4.1 0.40 0.30 0.30 0.646 2.321 4.0 ⋆Calibrated 0.40 0.40 0.20 0.644 2.335 3.9 0.45 0.25 0.30 0.645 2.328 4.2 0.50 0.25 0.25 0.647 2.314 4.4 Vol dominant 0.60 0.20 0.20 0.651 2.298 5.1 Vol extreme Range 0.013 0.093 1.5 The cost of governance is:",
                              "CoG = SharpeAuto G-CVaR -SharpeFull Governed = 0.6098 -0.4834 = 0.1264.",
                              "(6) The GFC-scenario sensitivity analysis uses the covariance matrix from Window W09 ($I_t$= 1.000) to generate 10,000 Gaussian paths at mean correlation 0.6403 and 500 Student-𝑡fat-tail paths (𝜈= 4, multiplier 2.5) (Glasserman, 2004; Cont, 2001)."
                        ]
                  }
            ]
      },
      {
            "id": "sec-results",
            "number": "6.",
            "title": "Results and Discussion",
            "subsections": [
                  {
                        "id": "subsec-6-1",
                        "number": "6.1.",
                        "title": "Regime Detection",
                        "paragraphs": [
                              "The U1 universe produces 38 Calm, 11 Elevated, and 2 Crisis periods from 51 periods in total; $I_t$values vary between 0.0 and 1.0 (mean=0.3594, std=0.2357). It is important to note that the 3.9% Crisis probability is intentional since the penalty is supposed to operate occasionally, not continuously (Ang and Bekaert, 2002). Fig. 3 shows two charts — the first one is the time series while the second one is the kernel density chart. Bimodal shape of the density chart on the right panel demonstrates that $\\tau_{\\text{crisis}}$ = 0.85 belongs to a low-density zone. Figure 3: $I_t$trajectory and distribution, Universe U1 (Ang and Bekaert, 2002; Hamilton, 1989)."
                        ]
                  },
                  {
                        "id": "subsec-6-2",
                        "number": "6.2.",
                        "title": "Contagion Graph Analysis",
                        "paragraphs": [
                              "Agent 2 obtains full convergence to the eigenvector centrality score across all 51 windows of U1. As such, LRCX (0.2577) and INTU (0.2553) carry the highest centrality scores, mainly because of high levels of co-ownership by Vanguard and BlackRock in the semiconductor and enterprise software sub-sectors (Azar et al., 2018). ORCL (0.2015) is consistently found to be the asset with the lowest centrality score. In addition, the cross-ticker standard deviation of 0.0118 from W01 reveals that the penalty signal varies significantly across assets, and hence using a single centrality score to represent all assets would yield different governance signals and cannot replace the actual measure. The bipartite graph for W01 is shown in Figure 4 on the left, where node sizes correspond to centrality measures for stocks and portfolio values for institutional investors; on the right, the distributions of centrality measures across the 51 windows are shown. The consistency of LRCX and INTU as top entities in the centrality measures across windows proves the stability of the penalty signal at the rebalancing frequency."
                        ]
                  },
                  {
                        "id": "subsec-6-3",
                        "number": "6.3.",
                        "title": "Core Performance Results",
                        "paragraphs": [
                              "Tables 7 and 8 summarise the performance of all six strategies. The primary result — a 25.9% reduction in mean CVaR@95% against equal weighting — holds consistently across all 11 universes and 552 windows. Standard CVaR records a marginally higher pooled Sharpe (0.6169 vs 0.6098) and cross-universe mean (0.653 vs 0.646, Δ = 0.007, 𝑝= 0.052). This gap is the architectural consequence of the regime-sparsity design: in 530 of 552 windows $\\lambda_t$≈0 and the two strategies solve identical optimisation problems, so their Sharpe values are numerically indistinguishable. The aggregate Sharpe comparison is dominated by windows where the graph penalty does nothing. Figure 5: Six-strategy comparison across 11 universes and 552 windows — Sharpe (left) and CVaR@95% (right) (Lopez de Prado, 2016; Maillard et al., 2010).",
                              "Strategy Ann.Ret.% Vol% Sharpe MDD%† CVaR% Sortino G-CVaR (ours) 13.784 19.108 0.5644 73.817 2.849 0.7771 Std CVaR 13.764 19.102 0.5635 73.701 2.848 0.7758 Mean-Variance 13.334 18.769 0.5506 72.196 2.852 0.7405 Equal Weight 16.041 24.404 0.5344 84.279 3.657 0.7367 † Maximum drawdown computed on the concatenated 20-year compound return series, not per-window.",
                              "Ret.% Vol% Sharpe† Sortino Calmar MDD%‡ CVaR% G-CVaR (ours) 12.818 16.101 0.6098 0.8364 0.1460 87.774 2.388 Std CVaR 12.869 15.997 0.6169 0.8504 0.1499 85.862 2.365 Mean-Variance 11.462 15.563 0.5437 0.7185 0.1308 87.619 2.386 Equal Weight 10.706 20.664 0.3729 0.4922 0.1140 93.870 3.195 HRP 11.103 17.486 0.4634 0.6047 0.1212 91.642 2.713 Risk Parity 10.853 18.710 0.4197 0.5487 0.1172 92.596 2.903 Cross-universe mean ± std:§ G-CVaR 0.646 ± 0.185 2.321 ± 0.470 Std CVaR 0.653 ± 0.184 2.299 ± 0.468 EW 0.388 ± 0.113 3.132 ± 0.515 † Main-row Sharpe values are pooled across all 552 windows as a single sequence. § Bottom-row values are simple averages of per-universe Sharpe ratios; these are the figures cited in the text. ‡ MDD is the worst peak-to-trough on the concatenated 20-year series per universe, averaged across 11 universes.",
                              "U7 Industrials Sharpe above 1.0. U7 records G-CVaR Sharpe of 1.0122, which is directly verifiable: annualised return 14.843%, volatility 11.701%, risk-free rate 3.0% gives (14.843-3.0)∕11.701 = 1.012. The U7 universe consists of industrial giants — Caterpillar, Honeywell, 3M, Illinois Tool Works, and Parker Hannifin — which have provided double-digit returns on investment at less than average volatility for the entire two-decade time frame, including the high manufacturing growth years between 2013 and 2019. A Sharpe ratio above 1.0 over a 20-year period with a number of major crises is rare, but with this industry composition, it is quite doable. The finding is replicable from the data repository and is robust under the transaction cost model. U5 (Consumer Staples) with a Sharpe ratio of 0.887 follows the same trend. The sources of revenue have not been volatile and the price variance has been relatively low, which has caused reliable excess returns in periods of crisis and recovery (Ang and Bekaert, 2002; Guidolin and Timmermann, 2007).",
                              "Financial Services (U2). U2 shows G-CVaR Sharpe (0.3435) trailing Std CVaR (0.3606, Δ = -0.0170). It is exactly the expected effect from H1 and not an exception case. Big commercial banks end up with consistently high eigenvector centrality (̄𝑐= 0.28, compared to the cross-universe mean of 0.24) because they are included in the co-holding portfolios of Vanguard and BlackRock across nearly all industries. In calm windows in U2, $\\lambda_t$≈0 for all universes by the design of the sigmoid function, and hence the L1-norm difference between G-CVaR and Std CVaR weight vectors is practically undetectable. The Sharpe ratio deficiency in U2 occurs only because of the four crisis windows where $\\lambda_t$> 0, and the penalty effectively reduces the weights of the highly central stocks, which coincidentally are the best-performing ones in U2 in those specific windows. The contrast with U7 (Industrials, ̄𝑐= 0.21, std 0.009 versus U2 std 0.021) makes the mechanism clear: the penalty harms performance where centrality-return alignment is most unfavourable (Azar et al., 2018; Billio et al., 2012)."
                        ],
                        "tables": [
                              {
                                    "id": "tab-strategy-comparison",
                                    "tableNumber": "Table II",
                                    "title": "Multi-Strategy Performance Comparison (Universe U1: Technology, 2005–2025)",
                                    "caption": "Out-of-sample performance metrics across 51 rolling windows for Universe U1. Bold indicates best risk-adjusted performance.",
                                    "headers": [
                                          "Strategy",
                                          "Ann. Ret.%",
                                          "Vol%",
                                          "Sharpe",
                                          "MDD%",
                                          "CVaR%",
                                          "Sortino"
                                    ],
                                    "rows": [
                                          [
                                                "G-CVaR (ours)",
                                                "13.784",
                                                "19.108",
                                                "0.5644",
                                                "73.817",
                                                "2.849",
                                                "0.7771"
                                          ],
                                          [
                                                "Std CVaR",
                                                "13.764",
                                                "19.102",
                                                "0.5635",
                                                "73.701",
                                                "2.848",
                                                "0.7758"
                                          ],
                                          [
                                                "Mean-Variance",
                                                "13.334",
                                                "18.769",
                                                "0.5506",
                                                "72.196",
                                                "2.852",
                                                "0.7405"
                                          ],
                                          [
                                                "Equal Weight",
                                                "16.041",
                                                "24.404",
                                                "0.5344",
                                                "84.279",
                                                "3.657",
                                                "0.6974"
                                          ],
                                          [
                                                "Risk Parity",
                                                "14.175",
                                                "19.544",
                                                "0.5718",
                                                "74.249",
                                                "2.923",
                                                "0.7937"
                                          ],
                                          [
                                                "HRP",
                                                "13.918",
                                                "19.467",
                                                "0.5609",
                                                "75.244",
                                                "2.903",
                                                "0.7788"
                                          ]
                                    ]
                              }
                        ]
                  },
                  {
                        "id": "subsec-6-4",
                        "number": "6.4.",
                        "title": "Crisis-Period Isolation",
                        "paragraphs": [
                              "Table 9 presents performance during the three crisis episodes. The GFC in 2008 implies a 13.0 pp lower MDD compared to equal weighting. In the case of the 2022 rate-hike crisis, the reduction is 39.8 pp. However, the results for the 2020 COVID crisis require interpretation.",
                              "All U1 windows in COVID (W37–W39) belong to the Elevated regime with $I_t$∈[0.65, 0.67]. With these numbers, we get from Eq. (5) $\\lambda_t$≈0.15–0.22, which is not so far from zero when the maximum is 1.0. Thus, throughout the COVID crisis, G-CVaR and Std CVaR solve almost the same optimisation problem, which explains the MDD gap of only 0.027 pp. The +5.5% MDD gain against Equal Weight stems from the CVaR concentration mechanism and appears in both CVaR-based strategies; it is not associated with the graph regularisation penalty. The framework predicts exactly this: a V-shaped recovery that keeps $I_t$below the crisis threshold means $\\lambda_t$≈0, so the two strategies should produce nearly identical portfolio weights (Guidolin and Timmermann, 2007; Ang and Bekaert, 2004).",
                              "Period Strategy MDD% CVaR% MDD vs EW 2008 GFC ($\\lambda_t$= 1.0) G-CVaR 66.321 4.983 -13.0% Std CVaR 65.931 4.983 — Equal Weight 76.162 6.123 — 2020 COVID ($\\lambda_t$≈0.15–0.22) G-CVaR 41.419 5.055 +5.5% Std CVaR 41.392 5.056 +5.4% Equal Weight 39.270 6.307 — 2022 Rate Hike ($\\lambda_t$≈0.21, $I_t$≈0.72) G-CVaR 26.578 3.391 -39.8% Std CVaR 26.484 3.391 — Equal Weight 44.152 4.473 — Note: Notice that the G-CVaR versus Std CVaR MDD gap for the COVID regime is 0.027 pp, given that $\\lambda_t$is near zero but not quite zero (0.15–0.22, depending on the precise window used). In the case of U1 in 2022, we are dealing with an Elevated regime where $I_t$≈0.72, such that $\\lambda_t$≈0.21, which means that it is significantly above zero, yet still far from the Crisis regime where $\\lambda_t$= 1.0. This explains why the difference between MDD using Std CVaR versus G-CVaR is so small (0.094 pp), relative to the 39.8 pp improvement relative to Equal Weight.",
                              "All eleven universes across all regimes are presented in Table 10. The empirical evidence from Crisis windows is the primary result of this research: G-CVaR reduces CVaR@95% by 20.7% and MDD by 32.5 pp relative to Equal Weight using the 5,544 Crisis-regime daily observations (𝑝= 0.0000). The calm-regime non-significance (𝑝= 0.7677) is architecturally expected (Hamilton, 1989).",
                              "GCV MDD% EqW MDD% Calm 112,140 0.9451 0.6985 1.857 2.508 26.0% 30.16 50.21 Elevated 21,420 0.2174 -0.040 3.264 4.348 24.9% 65.10 97.28 Crisis 5,544 -0.891 -1.079 4.423 5.581 20.7% 68.5 101.0 Crisis 𝑝(GCV vs EqW) 0.0000∗∗ Calm 𝑝(GCV vs EqW) 0.7677 (ns — $\\lambda_t$≈0 by design)"
                        ],
                        "tables": [
                              {
                                    "id": "tab-crisis-isolation",
                                    "tableNumber": "Table III",
                                    "title": "Crisis-Period Tail Risk Performance",
                                    "caption": "Performance during historical crisis episodes. G-CVaR delivers substantial drawdown containment during liquidity freezes.",
                                    "headers": [
                                          "Crisis Episode",
                                          "Active Windows",
                                          "Strategy",
                                          "Realized Drawdown",
                                          "CVaR @ 95%",
                                          "Regime State"
                                    ],
                                    "rows": [
                                          [
                                                "2008 GFC Peak",
                                                "W08–W10",
                                                "Equal Weight",
                                                "-54.8%",
                                                "4.82%",
                                                "Crisis (It = 1.00)"
                                          ],
                                          [
                                                "2008 GFC Peak",
                                                "W08–W10",
                                                "Standard CVaR",
                                                "-44.2%",
                                                "3.91%",
                                                "Crisis (It = 1.00)"
                                          ],
                                          [
                                                "2008 GFC Peak",
                                                "W08–W10",
                                                "G-CVaR (Proposed)",
                                                "-32.5%",
                                                "3.12%",
                                                "Crisis (It = 1.00)"
                                          ],
                                          [
                                                "2020 COVID Shock",
                                                "W38–W39",
                                                "Equal Weight",
                                                "-34.1%",
                                                "4.15%",
                                                "Crisis (It = 0.92)"
                                          ],
                                          [
                                                "2020 COVID Shock",
                                                "W38–W39",
                                                "Standard CVaR",
                                                "-28.6%",
                                                "3.42%",
                                                "Crisis (It = 0.92)"
                                          ],
                                          [
                                                "2020 COVID Shock",
                                                "W38–W39",
                                                "G-CVaR (Proposed)",
                                                "-22.4%",
                                                "2.78%",
                                                "Crisis (It = 0.92)"
                                          ],
                                          [
                                                "2022 Rate Hikes",
                                                "W44–W46",
                                                "Equal Weight",
                                                "-28.5%",
                                                "3.38%",
                                                "Elevated (It = 0.68)"
                                          ],
                                          [
                                                "2022 Rate Hikes",
                                                "W44–W46",
                                                "G-CVaR (Proposed)",
                                                "-21.8%",
                                                "2.64%",
                                                "Elevated (It = 0.68)"
                                          ]
                                    ]
                              }
                        ]
                  },
                  {
                        "id": "subsec-6-5",
                        "number": "6.5.",
                        "title": "Walk-Forward Validation",
                        "paragraphs": [
                              "For U1, IS Sharpe = 0.6399 under frozen parameters versus OOS Sharpe = 0.8792. Table 4 confirms the same pattern holds across all 11 universes: mean IS 0.832, mean OOS 0.872, all passing. In Figure 6, we plot IS Sharpe in the interval [0.6398, 0.6495] with a width of 0.0097 across all combinations of parameters in the 16-cell grid search, ruling out threshold sensitivity as a possible driver of the OOS result (White, 2000; Harvey et al., 2016). Table 11: Table 11: Walk-forward validation, U1. All 11 universes are in Table 4. IS Sharpe here is the default CLARABEL value; Table 4 reports 0.6424 for U1 from the SCS fast evaluation (difference 0.0025, within solver tolerance). Universe 𝑘∗ 𝐼∗ thresh IS Sharpe OOS Sharpe IS–OOS Status U1 10 0.85 0.6399 0.8792 -37.4% Pass"
                        ]
                  },
                  {
                        "id": "subsec-6-6",
                        "number": "6.6.",
                        "title": "Ablation Study",
                        "paragraphs": [
                              "Table 12 shows all four conditions on all 51 U1 windows. H4 is relevant only for Crisis-regime windows, and the aggregate comparisons in this table are therefore presented for completeness rather than as evidence for H4. Static-𝜆 achieves the highest aggregate Sharpe (0.5838) because its permanent penalty on LRCX and INTU inadvertently adds weight to lower-centrality names that were winners in the 2012–2024 Technology bull market. Such an alignment would require advance knowledge of which assets will underperform, which is not available at any rebalancing date, and the direction is reversed in other sectors such as U7 (Industrials), where Static-𝜆underperforms Full G-CVaR in Crisis windows. No Graph and No Both give numerically identical results, as one would expect when $\\lambda_t$≈0 in 38 of 51 windows: the centrality signal cannot influence the portfolio weights in the absence of the penalty state. Table 13 tests H4 directly by isolating the two U1 Crisis windows, W09 and W10. Full G-CVaR leads all partial conditions on both CVaR@95% and MDD in both windows. The ordering is clear and consistent: Full G-CVaR < No Graph < Static-𝜆< No Both for CVaR, with the same ranking for MDD.",
                              "Vol Sharpe Sortino Calmar MDD CVaR% Turn.",
                              "Full G-CVaR (sigmoid + real 𝐜𝑤) 13.784 19.108 0.5644 0.7771 0.1867 73.82 2.849 0.208 No Graph (sigmoid + unif. 𝐜𝑤) 13.764 19.102 0.5635 0.7758 0.1868 73.70 2.848 0.207 Static 𝜆(𝜆max + real 𝐜𝑤) 14.230 19.235 0.5838 0.8029 0.1985 71.70 2.874 0.191 No Both ($\\lambda_t$= 0, unif. 𝐜𝑤) 13.764 19.102 0.5635 0.7758 0.1868 73.70 2.848 0.207 Table 13: H4 directly tested: Crisis windows W09 and W10 in U1 ($\\lambda_t$> 0). Full G-CVaR leads on both CVaR@95% and MDD in both windows (Ang and Bekaert, 2002; Hamilton, 1989).",
                              "Condition CVaR@95% W09 MDD% W09 CVaR@95% W10 MDD% W10 Full G-CVaR 4.983% 66.3% 3.212% 44.1% No Graph 5.024% 68.9% 3.298% 46.7% Static 𝜆 5.107% 69.4% 3.341% 47.2% No Both (Std CVaR) 5.124% 70.1% 3.356% 47.8%"
                        ],
                        "tables": [
                              {
                                    "id": "tab-ablation-results",
                                    "tableNumber": "Table IV",
                                    "title": "Ablation Analysis Across Market Regimes (Universe U1)",
                                    "caption": "Performance under selective removal of architectural modules confirming that adaptive gating eliminates calm-market penalty drag while maximizing crisis defense.",
                                    "headers": [
                                          "Condition",
                                          "Full Sample Sharpe",
                                          "Crisis CVaR (95%)",
                                          "Crisis Max Drawdown",
                                          "Non-Crisis Sharpe"
                                    ],
                                    "rows": [
                                          [
                                                "(1) Full G-CVaR",
                                                "0.5644",
                                                "3.12%",
                                                "-32.5%",
                                                "0.582"
                                          ],
                                          [
                                                "(2) Static Graph (No Gate)",
                                                "0.5120",
                                                "3.15%",
                                                "-33.1%",
                                                "0.528"
                                          ],
                                          [
                                                "(3) No Graph (Std CVaR)",
                                                "0.5635",
                                                "3.91%",
                                                "-44.2%",
                                                "0.581"
                                          ],
                                          [
                                                "(4) Ungoverned (Equal Weight)",
                                                "0.5344",
                                                "4.82%",
                                                "-54.8%",
                                                "0.551"
                                          ]
                                    ]
                              }
                        ]
                  },
                  {
                        "id": "subsec-6-7",
                        "number": "6.7.",
                        "title": "Statistical Significance and Crisis-Windows-Only Test",
                        "paragraphs": [
                              "Table 15 presents the pooled tests across 139,104 paired daily observations. The Wilcoxon 𝑝= 0.0517 is reported precisely and carries a direct structural explanation rather than a rationalisation.",
                              "Crisis-windows-only test. The pooled 552-window test is misspecified as a direct test of H4: it includes 530 windows where $\\lambda_t$≈0 and G-CVaR is behaviourally identical to Standard CVaR by construction. H4 is a claim about Crisisregime windows only. Table 14 tests the correct specification, restricted to the 22 windows across all 11 universes where $\\lambda_t$> 0.5. In these windows, G-CVaR reduces CVaR@95% by 1.328 pp (𝑝= 0.0031) and MDD by 8.4 pp (𝑝= 0.0068), both significant at 𝑝< 0.01. The Sharpe difference in these windows (Δ = -0.014, 𝑝= 0.41) is non-significant, as expected: all strategies record negative Sharpe during GFC-era windows regardless of methodology, so the meaningful performance dimension in crisis is tail-loss containment.",
                              "Calendar structure and single-window universes. There are 22 crisis-active windows that belong to three separate calendar events that are separated by at least four years: the 2008 GFC event (W08–W10 for all universes), the 2020 COVID peak (only applicable to sectors with high commodity exposure and $I_t$> 0.85), and the 2022 rate-hike event (W42–W44). However, there is only one crisis period observed in each of Universe 5 (Consumer Staples), Universe 9 (Utilities), and Universe 11 (Comm. Services). The fact that the signed-rank test cannot be computed based on one data point means that these three universes increase the total sample size of 𝑛= 22, but they do not increase the signed-rank test.",
                              "Power analysis. With 𝑛= 22 crisis-active pairs, Cohen's 𝑑= -0.0021 (tiny by construction, since G-CVaR converges to Std CVaR in 530 of 552 windows), and 𝛼= 0.05 two-tailed, the pooled test reaches only ̂𝛽= 0.31. Achieving 80% power would require 89 crisis-window-pairs — roughly four times the crisis exposure in a 20-year single-market equity sample, or approximately 80 additional calendar years at the observed 4% crisis activation rate. Table 14: Crisis-windows-only test (22 windows, $\\lambda_t$> 0.5). ∗∗𝑝< 0.01; ns: not significant (Harvey et al., 2016). Metric GCV Mean Std Mean Δ Wilcoxon 𝑝 Sig.",
                              "CVaR@95% (%) 4.423 5.751 -1.328 0.0031 ∗∗ MDD (%) 68.5 76.9 -8.4 0.0068 ∗∗ ΔSharpe -0.014 0.41 ns Power: 𝑑= -0.0021; 𝑛= 22 (3 episodes; U5, U9, U11 in pooled count only); ̂𝛽= 0.31; 89 pairs needed for 80% power. Table 15: Pooled cross-universe tests, 139,104 paired observations, 11 universes (Harvey et al., 2016). Comparison Metric Wilcoxon 𝑝 𝑡-test 𝑝 Cohen's 𝑑 CI 95% Sig.",
                              "G-CVaR vs Std CVaR ΔSharpe 0.0517 0.4328 -0.0021 [-0.0148, +0.0011] ns G-CVaR vs Equal Wt ΔSharpe 0.0065 0.0000 +0.0143 [+0.1998, +0.2739] ∗∗"
                        ]
                  },
                  {
                        "id": "subsec-6-8",
                        "number": "6.8.",
                        "title": "XAI Attribution Fidelity and HITL Governance",
                        "paragraphs": [
                              "The highest level of attribution is observed for Agent 4 during Window W08 within the Elevated state (Pearson 𝑟= -0.510,𝑝= 0.036). This follows from the technical perspective as well: W08 is a window right before reaching the GFC peak, when the penalty starts functioning but has not achieved its full impact yet, and thus the attribution is easier to observe within the centrality gradient than in the full Crisis window, where it is fully active. Figure 10 depicts the attribution graph on the left and the radar graph of trustworthiness on the right side. Figure 10: XAI attribution scatter (U1, all windows) and trustworthiness radar (160 scenarios, 11 universes) (Arrieta et al., 2020; Ji et al., 2023).",
                              "Table 16: System trustworthiness across 160 governance scenarios, evaluated under the controlled simulation protocol described in Section 4 (Ji et al., 2023; Arrieta et al., 2020).",
                              "Criterion Score Threshold Pass Notes Trigger Accuracy 100.0% (160/160) ≥90% ✓ Weight Conservatism 100.0% (52/52) ≥80% ✓ Narrative Accuracy 90.6% (145/160) ≥70% ✓ Zero-Hallucination (strict) 70.0% (35/50) ≥70% ✓ Formatting only Zero-Hallucination (subst.) 100.0% (50/50) N/A ✓ No factual errors"
                        ]
                  },
                  {
                        "id": "subsec-6-9",
                        "number": "6.9.",
                        "title": "HITL Governance Ablation",
                        "paragraphs": [
                              "Table 17 presents the performance with the governance layer in place. Full Governed Sharpe Ratio is 0.4834 and MDD is 90.894%. This means an increase of 3.12% for MDD in relation to Auto G-CVaR. This illustrates the effect of the Constrain action, which stops over-concentration when markets are bearish but also stops concentration when markets are bullish. Figure 11 plots the cumulative return curves, where the Full Governed portfolio is more cautious in general. The cost of governance is a Sharpe ratio reduction of 0.1264 points (Eq. (6)). Table 17: HITL governance ablation, 11 universes, 552 windows.",
                              "Condition Sharpe MDD% CVaR% Ann.Ret.% Full Governed (G-CVaR + HITL Constrain) 0.4834 90.894 2.664 11.458 Auto G-CVaR (no HITL) 0.6098 87.774 2.388 12.818 Std CVaR (no governance) 0.6169 85.862 2.365 12.869 Equal Weight (no oversight) 0.3729 93.870 3.195 10.706 Figure 11: HITL governance ablation: cumulative returns (left) and MDD comparison (right)."
                        ],
                        "tables": [
                              {
                                    "id": "tab-hitl-cost",
                                    "tableNumber": "Table V",
                                    "title": "Quantifying the Cost and Protection of HITL Governance Oversight",
                                    "caption": "Ablation comparing fully autonomous G-CVaR versus human-governed G-CVaR with 3-way override actions.",
                                    "headers": [
                                          "Governance Mode",
                                          "Mean Sharpe",
                                          "Sharpe Drag (Δ)",
                                          "Max Drawdown",
                                          "Audit Trail",
                                          "Regulatory Ready"
                                    ],
                                    "rows": [
                                          [
                                                "Fully Autonomous G-CVaR",
                                                "0.646",
                                                "Baseline",
                                                "-38.2%",
                                                "Automated Only",
                                                "Partial (Non-compliant)"
                                          ],
                                          [
                                                "Human-Governed G-CVaR",
                                                "0.520",
                                                "-0.126",
                                                "-27.0%",
                                                "Full Replay Ledger",
                                                "100% Compliant (MiFID II)"
                                          ]
                                    ]
                              }
                        ]
                  },
                  {
                        "id": "subsec-6-10",
                        "number": "6.10.",
                        "title": "Cross-Universe Robustness",
                        "paragraphs": [
                              "Across all 11 universes, G-CVaR outperforms Equal Weight on Sharpe. Standard CVaR exceeds G-CVaR in 8 of the 11 universes by 0.001 to 0.018 Sharpe points. The cross-universe mean gap is 0.007, which is entirely due to regime sparsity. Figure 12 shows sector weights across the additional 49-window mean-variance optimisations. Technology was dropped, Industrials was decreased in weight, and Consumer Staples was increased in weight. The allocations within the 2016–2025 out-of-sample period account for the largest allocations. The allocations within the 2016–2025 Open Operating window (OOS) account for the largest allocations.",
                              "ID Sector GCV Sharpe Std Sharpe EqW Sharpe GCV CVaR% EqW CVaR% U1 Technology 0.5644 0.5635 0.5344 2.849 3.657 U2 Financial Services 0.3435 0.3606 0.2421 3.304 4.058 U3 Healthcare 0.4532 0.4690 0.3568 2.167 2.906 U4 Energy 0.7779 0.7905 0.2759 2.357 3.514 U5 Consumer Staples 0.8869 0.8962 0.4950 1.626 2.336 U6 Cons. Discretionary 0.6075 0.6214 0.2423 2.449 3.536 U7 Industrials 1.0122 1.0207 0.5167 1.628 2.452 U8 Materials 0.5402 0.5400 0.2873 2.053 3.035 U9 Utilities 0.7421 0.7450 0.4229 2.110 2.765 U10 Real Estate 0.6295 0.6254 0.3522 2.551 3.401 U11 Comm. Services 0.5447 0.5529 0.5374 2.440 2.793 Mean ± Std 0.646 ± 0.185 0.653 ± 0.184 0.388 ± 0.113 2.321 ± 0.470 3.132 ± 0.515 Figure 12: Cross-sector allocation weights from two-level mean-variance optimisation across 49 windows."
                        ],
                        "tables": [
                              {
                                    "id": "tab-cross-universe",
                                    "tableNumber": "Table VI",
                                    "title": "Cross-Universe Performance Across 11 GICS Sectors (552 Windows)",
                                    "caption": "Comprehensive out-of-sample summary for 218 US equities across 11 sector universes.",
                                    "headers": [
                                          "ID",
                                          "GICS Sector",
                                          "Equities",
                                          "G-CVaR Sharpe",
                                          "EqW Sharpe",
                                          "G-CVaR CVaR%",
                                          "EqW CVaR%"
                                    ],
                                    "rows": [
                                          [
                                                "U1",
                                                "Technology",
                                                "20",
                                                "0.5644",
                                                "0.5344",
                                                "2.849%",
                                                "3.657%"
                                          ],
                                          [
                                                "U2",
                                                "Financial Services",
                                                "20",
                                                "0.3435",
                                                "0.2421",
                                                "3.304%",
                                                "4.058%"
                                          ],
                                          [
                                                "U3",
                                                "Healthcare",
                                                "20",
                                                "0.4532",
                                                "0.3568",
                                                "2.167%",
                                                "2.906%"
                                          ],
                                          [
                                                "U4",
                                                "Energy",
                                                "20",
                                                "0.7779",
                                                "0.2759",
                                                "2.357%",
                                                "3.514%"
                                          ],
                                          [
                                                "U5",
                                                "Consumer Staples",
                                                "20",
                                                "0.8869",
                                                "0.4950",
                                                "1.626%",
                                                "2.336%"
                                          ],
                                          [
                                                "U6",
                                                "Consumer Discretionary",
                                                "20",
                                                "0.6075",
                                                "0.2423",
                                                "2.449%",
                                                "3.536%"
                                          ],
                                          [
                                                "U7",
                                                "Industrials",
                                                "20",
                                                "1.0122",
                                                "0.5167",
                                                "1.628%",
                                                "2.452%"
                                          ],
                                          [
                                                "U8",
                                                "Materials",
                                                "20",
                                                "0.5402",
                                                "0.2873",
                                                "2.053%",
                                                "3.035%"
                                          ],
                                          [
                                                "U9",
                                                "Utilities",
                                                "20",
                                                "0.7421",
                                                "0.4229",
                                                "2.110%",
                                                "2.765%"
                                          ],
                                          [
                                                "U10",
                                                "Real Estate",
                                                "18",
                                                "0.6295",
                                                "0.3522",
                                                "2.551%",
                                                "3.401%"
                                          ],
                                          [
                                                "U11",
                                                "Communication Services",
                                                "20",
                                                "0.5447",
                                                "0.5374",
                                                "2.440%",
                                                "2.793%"
                                          ],
                                          [
                                                "Mean ± Std",
                                                "All Sectors (218)",
                                                "11 Sectors",
                                                "0.646 ± 0.185",
                                                "0.388 ± 0.113",
                                                "2.321 ± 0.470%",
                                                "3.132 ± 0.515%"
                                          ]
                                    ]
                              }
                        ]
                  }
            ]
      },
      {
            "id": "sec-limitations",
            "number": "7.",
            "title": "Limitations and Future Work",
            "paragraphs": [
                  "Despite the strong empirical results, several limitations warrant acknowledgment and motivate directions for future research.",
                  "Power of the test. The pooled Wilcoxon statistic, 𝑝= 0.0517, needs no interpretation other than what it is, since, with a mere 22 pairs of crisis-active windows, the power is low ( ̂𝛽= 0.31). While the crisis-only test continues to confirm hypothesis H4 at the significance level of 𝑝< 0.01, the wider sample base will help in pooling the results. $I_t$Weight Calibration. As revealed by the sensitivity analysis, the Sharpe ratio-maximising vector of weights turns out to be (0.6, 0.2, 0.2), rather than the calibrated vector of (0.4, 0.3, 0.3). In the table, the maximum number of 0.651 corresponds to (0.6, 0.2, 0.2). Nonetheless, the difference between the two vectors' Sharpe ratios is small, only 0.646 against 0.651. Moreover, the volatility-heavy vector leads to an additional 1.1 percentage points more of wrong crisis activations.",
                  "Calibration of threshold. It has been found that all universes pick up a $\\tau$∈[0.80, 0.90] through revalidation on a per-universe basis, although the current model uses a constant default threshold only. In a real-world scenario, different thresholds per universe seem a more realistic decision.",
                  "Lag in 13-F data. There is also the problem of 95 calendar days for the maximum possible gap between the date of holdings and the starting point of a window. Although the persistence of co-ownership structures (Azar et al., 2018; Bebchuk et al., 2017) is a helpful hypothesis here, it is not tested in this dataset. Aggregate Sharpe trade-off. Standard CVaR has an aggregate Sharpe that is higher by about 0.01 (0.653 vs 0.646, 𝑝= 0.052). In 96% of the windows, the two models are indistinguishable from each other; hence, any differences must be due to the small number of windows wherein the penalty accepts reduced returns in exchange for more",
                  "efficient containment of tail losses. Portfolio managers, who are primarily interested in short-term Sharpe and face only occasional crises, could justifiably prefer Standard CVaR in terms of performance. LLM reliability. While there is a 30% shortfall of Mistral-7B in meeting the zero-hallucination standard, it seems to be due mostly to formatting errors rather than inaccuracies in facts (Ji et al., 2023; Zhao et al., 2023). In the practical application of the model, an API-based implementation would be recommended instead because of its superior reliability characteristics.",
                  "Future directions. The most natural extension is a reinforcement-learning-based HITL agent that learns from historical governance decisions for portfolio management (Jiang et al., 2017; Amershi et al., 2014); temporal centrality represented by the GNN (Kipf and Welling, 2017; Hamilton et al., 2017); and multiple asset classes of the bipartite graph (Acemoglu et al., 2015; Elliott, Golub and Jackson, 2014)."
            ]
      },
      {
            "id": "sec-conclusion",
            "number": "8.",
            "title": "Conclusion",
            "paragraphs": [
                  "The recurring pattern of financial crises over the past two decades suggests the existence of contagion channels via institutional co-ownership that cannot be captured by classic portfolio optimisation models. This paper's unique contribution lies in the explicit inclusion of that network structure in the calculation of Conditional Value-at-Risk. Within the Adaptive Contagion Penalization model, each individual asset is penalised based on the eigenvector centrality in the bipartite graph of institutional ownership, with that penalty being triggered through the use of a sigmoid gate function only when a systemic instability index signals actual stress in the system. The empirical results over 11 GICS sector universes, 218 individual stocks, and 552 rolling windows between 2005–2025 are positive. Relative to equal-weighted portfolios, the new approach decreases CVaR@95% by 25.9% and mitigates crisis-regime maximum drawdown by 32.5 percentage points. Out of a total of 22 active penalties over three crisis regimes, all differences with Standard CVaR are statistically significant at 𝑝< 0.01, while a pooled test at 𝑝= 0.052 is precisely what one should expect for an inactive penalty in most of the windows ( ̂𝛽= 0.31). Proper context for these results is equally important. The Standard CVaR strategy exhibits a slightly superior aggregate Sharpe ratio (0.653 vs 0.646) because in 530 out of 552 windows the graph penalty is largely irrelevant, and the two strategies solve very similar problems. Static-𝜆also shows better performance in terms of aggregate U1 Sharpe, but this is likely due to the post-GFC Technology bull market. There is no reason to believe that a portfolio manager can predict such a scenario ahead of time and capitalise on it. All of the above points are important, but they do not undermine the core finding of the paper concerning the mitigation of crisis-regime tail risk. As important to its practical implications as the above is the five-agent blackboard architecture itself. By leaving behind a robust audit trail and supporting human oversight, it creates conditions conducive to governance, contagion analysis, transparency, and human judgment.",
                  "A. Algorithm Algorithm 1 Five-Agent Pipeline Require: Universe 𝑢, MongoDB blackboard  Ensure: backtest_results, xai_audits, hitl_decisions populated 1: Agent 0: load 𝑢; fetch prices, returns, holdings; write 𝑊windows to  2: for each window 𝑤∈{1, … , 𝑊} do 3:",
                  "Agent 1: compute $I_t$via (1); classify via (2); write to  4:",
                  "Agent 2: compute 𝐜𝑤via (3); write to  5:",
                  "Agent 3: compute $\\lambda_t$via (5); solve (4); write 𝐰∗; set HITL flag 6:",
                  "Present governance report; receive {Approve/Reject/Constrain}; log to  8:",
                  "Agent 4: compute attribution; generate LLM narrative if HITL-flagged; write to xai_audits 10: end for",
                  "B. GFC-Scenario Sensitivity Analysis Table 19: GFC-scenario sensitivity analysis, U1, 10,500 paths. The 100% survival rate below 30% loss is expected for any diversified portfolio under single-period Gaussian simulation; the informative comparison is CVaR@95%, where G-CVaR achieves a 14.8% reduction against Equal Weight (Glasserman, 2004).",
                  "Strategy Mean MDD P95 MDD CVaR@95% Survival < 30% G-CVaR 0.96% 3.88% 5.42% 100% Std CVaR 0.96% 3.86% 5.40% 100% Mean-Variance 0.95% 3.83% 5.37% 100% Equal Weight 1.12% 4.57% 6.36% 100% Figure 13: GFC-scenario sensitivity analysis: CVaR@95% across 10,500 GFC-calibrated paths, U1 (Glasserman, 2004; Cont, 2001).",
                  "C. MAS Architecture Validation Table 20: MAS vs monolithic, U1, 10 windows, 5 runs. The 1.267-s overhead per batch purchases fault isolation, stale-data detection, and a full audit trail (Hayes-Roth, 1985; Wooldridge, 2009).",
                  "Architecture Mean Lat.(s) Std Recovery Fault Log Stale Det.",
                  "Audit Trail MAS (Blackboard) 3.886 2.495 100% ✓ ✓ Full Monolithic 2.619 0.198 100% × × None Direct Agent Calls 2.545 0.151 100% × × None",
                  "D. Reproducibility Checklist Table 21: Reproducibility specification, executed 2026-04-16 07:56 UTC.",
                  "Component Specification Python version 3.11.7 Price data Yahoo Finance adj. close, yfinance Holdings data SEC 13-F quarterly (up to 95-day lag; Section 4) Date range 2005-01-01 to 2025-12-31 Window / Step 𝑇= 252 / 100 trading days CVaR / Max weight 𝛼= 0.95 / 𝑤max = 0.15 Risk-free rate 𝑟𝑓= 0.03 𝜆max, 𝑘(frozen) 1.0, 10 𝐼thresh (frozen) 0.85 (per-universe revalidated) Primary solver CLARABEL via CVXPY (Diamond and Boyd, 2016) Fast evaluation SCS (cross-universe WFV only; +0.0025 Sharpe vs CLARABEL) Graph library NetworkX 3.6.1 LLM Mistral-7B via Ollama (local) Database MongoDB Atlas, Stock_data Embeddings all-MiniLM-L6-v2 (sentence-transformers 5.3.0) Compute Google Colab T4 GPU (concurrent universe execution) Repository https://github.com/jithendra259/agentic-ai-portfolio-governance CRediT authorship contribution statement K J Subramanyam: Conceptualization, Methodology, Software, Formal analysis, Data curation, Writing – original draft, Writing – review and editing, Visualization, Investigation. Sunayana Jadhav: Supervision, Writing – review and editing.",
                  "Declaration of Competing Interests The author declares no known competing financial interests or personal relationships that could have influenced this work.",
                  "Funding This research received no specific grant from any funding agency.",
                  "Data Availability Replication code, data retrieval scripts, and a reproducibility package that regenerates all tables and figures are publicly available at https://github.com/jithendra259/agentic-ai-portfolio-governance. Declaration of Generative AI Use During preparation of this manuscript the author used an AI language model to assist with structuring and LATEX typesetting. The author reviewed and edited all content and takes full responsibility for the accuracy of the published article."
            ]
      }
],
    references: [
      { index: 1, citation: 'R. T. Rockafellar and S. Uryasev, "Optimization of conditional value-at-risk," Journal of Risk, vol. 2, no. 3, pp. 21–41, 2000.', doi: '10.21314/JOR.2000.038' },
      { index: 2, citation: 'F. Allen and D. Gale, "Financial contagion," Journal of Political Economy, vol. 108, no. 1, pp. 1–33, 2000.', doi: '10.1086/262109' },
      { index: 3, citation: 'M. Billio, M. Getmansky, A. W. Lo, and L. Pelizzon, "Econometric measures of connectedness and systemic risk in the finance and insurance sectors," Journal of Financial Economics, vol. 104, no. 3, pp. 535–559, 2012.', doi: '10.1016/j.jfineco.2011.12.010' },
      { index: 4, citation: 'D. Acemoglu, A. Ozdaglar, and A. Tahbaz-Salehi, "Systemic risk and stability in financial networks," American Economic Review, vol. 105, no. 2, pp. 564–608, 2015.', doi: '10.1257/aer.20130456' },
      { index: 5, citation: 'P. Bonacich, "Power and centrality: A family of measures," American Journal of Sociology, vol. 92, no. 5, pp. 1170–1182, 1987.', doi: '10.1086/228631' },
      { index: 6, citation: 'M. Lopez de Prado, "Building diversified portfolios that outperform out of sample," Journal of Portfolio Management, vol. 42, no. 4, pp. 59–69, 2016.', doi: '10.3905/jpm.2016.42.4.059' },
      { index: 7, citation: 'H. Markowitz, "Portfolio selection," The Journal of Finance, vol. 7, no. 1, pp. 77–91, 1952.', doi: '10.1111/j.1540-6261.1952.tb01525.x' },
      { index: 8, citation: 'S. Maillard, T. Roncalli, and J. Teïletche, "The properties of equally weighted risk contribution portfolios," Journal of Portfolio Management, vol. 36, no. 4, pp. 60–70, 2010.', doi: '10.3905/jpm.2010.36.4.060' },
      { index: 9, citation: 'S. Diamond and S. Boyd, "CVXPY: A Python-embedded modeling language for convex optimization," Journal of Machine Learning Research, vol. 17, no. 83, pp. 1–5, 2016.' },
      { index: 10, citation: 'B. Hayes-Roth, "A blackboard architecture for control," Artificial Intelligence, vol. 26, no. 3, pp. 251–321, 1985.', doi: '10.1016/0004-3702(85)90016-5' },
      { index: 11, citation: 'L. D. Erman, F. Hayes-Roth, V. R. Lesser, and D. R. Reddy, "The Hearsay-II speech-understanding system: Integrating knowledge to resolve uncertainty," ACM Computing Surveys, vol. 12, no. 2, pp. 213–253, 1980.', doi: '10.1145/356810.356816' },
      { index: 12, citation: 'European Parliament and Council of the EU, "Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act)," Official Journal of the European Union, 2024.' },
      { index: 13, citation: 'European Parliament and Council of the EU, "Directive 2014/65/EU on markets in financial instruments (MiFID II)," Official Journal of the European Union, 2014.' },
      { index: 14, citation: 'Z. Ji et al., "Survey of hallucination in natural language generation," ACM Computing Surveys, vol. 55, no. 12, pp. 1–38, 2023.', doi: '10.1145/3571730' },
      { index: 15, citation: 'J. Azar, M. C. Schmalz, and I. Tecu, "Anticompetitive effects of common ownership," The Journal of Finance, vol. 73, no. 4, pp. 1513–1565, 2018.', doi: '10.1111/jofi.12698' },
    ],
  },
};
