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
      description: 'Calculates the composite instability index $\\lambda_t = 0.4\\sigma_{\\text{spike}} + 0.3\\rho_{\\text{spike}} + 0.3\\text{MDD}_t$, bounded in $[0, 1]$. Regime classification: Calm ($\\lambda_t < 0.50$), Elevated ($0.50 \\le \\lambda_t < 0.85$), Crisis ($\\lambda_t \\ge 0.85$). For Universe U1 over 51 windows, $\\lambda_t$ ranges from $0.0$ (Window W23 calm) to $1.0$ (Window W09 GFC peak), with mean $0.3594$.',
      tech: 'NumPy, SciPy, Rolling Window Statistics',
    },
    {
      step: '03',
      title: 'Agent 2 – Graph of Contagion (Bipartite Holdings Graph)',
      description: 'Computes eigenvector centrality $c_i$ via power iteration over the bipartite co-ownership network (Bonacich, 1987). Centrality scores range from $0.201$ (ORCL) to $0.258$ (LRCX). The sigmoid-gated adaptive penalty $\\gamma_t = \\frac{\\gamma_{\\max}}{1 + e^{-k(\\lambda_t - \\lambda_{\\text{thresh}})}}$ keeps contagion penalty dormant in calm markets and activates it in Crisis regime.',
      tech: 'NetworkX, Eigenvector Centrality, Bonacich Centrality',
    },
    {
      step: '04',
      title: 'Agent 3 – Optimizer G-CVaR (Graph-Regularized CVaR)',
      description: 'Solves the graph-regularized CVaR objective per window: $\\min_{w, \\zeta} \\text{CVaR}_\\alpha(w) + \\gamma_t \\sum_i c_i w_i$ subject to $\\sum_i w_i = 1, w_i \\ge 0$. Benchmarks against Standard CVaR, Mean-Variance, Equal Weight, HRP, and Risk Parity. Flags human-in-the-loop review when $\\lambda_t \\ge 0.85$ or turnover $> 0.40$.',
      tech: 'CVXPY, CLARABEL, ECOS, Convex Optimization',
    },
    {
      step: '05',
      title: 'Agent 4 – XAI Explainer (Mistral-7B Narrative Engine)',
      description: 'Triggered only for windows flagged for human review. Calculates Pearson attribution between centrality c_i and weight changes Δw = w_new − w_prev / Std, then forwards structured prompt to Mistral-7B (Ollama) for narrative explanation. LLM confined strictly to text generation; all numerics sourced from the deterministic blackboard. Reduces runtime from 1–3 hours to under 12 minutes.',
      tech: 'Mistral-7B, Ollama, Gradio, LLM Narrative Generation',
    },
    {
      step: '06',
      title: 'Human-in-the-Loop Governance & Audit',
      description: 'Gradio interface presents trigger explanation, proposed weight vector, top-5 centrality rankings, current CVaR(95%), and LLM narrative. Operator responds with Accept (proposed weights), Reject (revert to prior weights), or Constrain (re-solve with w_max = 8%, turnover ≤ 20%). All 11 universes run in parallel in 142 seconds. All decisions logged to hitl_decisions fulfilling MiFID II and EU AI Act auditability requirements.',
      tech: 'Gradio, MiFID II Compliance, Audit Logging, EU AI Act',
    },
  ],
  keyCapabilities: [
    {
      title: 'Adaptive Sigmoid-Gated Contagion Penalization',
      description: 'The graph penalty γ_t is dormant during calm markets and activates strongly only during Crisis regime (λ ≥ 0.85, affecting ~4% of windows). This asymmetric design avoids unnecessary penalty overhead during stable periods while delivering targeted contagion suppression during stress.',
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
    {
      heading: 'Research Highlights',
      content: `• Multi-agent governance framework for contagion-aware portfolio optimization.
• Graph regularization penalizes highly connected institutional holdings.
• The framework reduces tail risk during major financial crisis periods.
• Human-in-the-loop governance improves auditability and fault isolation.
• Results remain robust across 11 sector universes and 552 rolling windows.`,
    },
    {
      heading: '1. Introduction',
      content: `Institutional portfolio managers face a persistent challenge during financial crises: contagion spreads rapidly across sectors through channels that conventional risk models do not directly capture. One of the most important of these channels is institutional co-ownership — when a large number of institutions hold overlapping positions in the same securities, a shock that forces one institution to liquidate can trigger cascading selling across the market (Allen and Gale, 2000; Billio et al., 2012; Acemoglu, Ozdaglar and Tahbaz-Salehi, 2015).

Standard portfolio optimization models — including Mean-Variance (Markowitz, 1952), Conditional Value-at-Risk (CVaR; Rockafellar and Uryasev, 2000), and Hierarchical Risk Parity (Lopez de Prado, 2016) — are designed to optimize risk-return trade-offs based on asset-return distributions, but they do not explicitly model the network of institutional ownership that drives fire-sale contagion. As a result, these methods may systematically underestimate tail risk in stress scenarios where overlapping holdings amplify drawdowns across the portfolio.

The present paper proposes a multi-agent governance framework for graph-regularized CVaR portfolio optimization with adaptive contagion penalization (G-CVaR). The framework extends the CVaR objective with a graph-based regularization term that penalizes portfolio positions in securities with high eigenvector centrality in the institutional co-ownership network. The penalty is scaled by a sigmoid-gated instability index derived from realized volatility, correlation stress, and maximum drawdown, ensuring that the contagion penalty is dormant during calm market conditions and activated during stress periods.

The framework is implemented as a five-agent blackboard system: Agent 0 handles data ingestion; Agent 1 monitors market instability; Agent 2 builds the co-ownership contagion graph; Agent 3 solves the G-CVaR optimization problem; and Agent 4 provides explainability and human-in-the-loop governance. The system is evaluated on 11 GICS sector universes, 218 US equities, and 552 rolling windows spanning 2005–2025, covering three major crisis episodes.`,
    },
    {
      heading: '2. Related Work',
      content: `2.1. Multi-Agent Systems and Portfolio Optimization

Multi-agent systems (MAS) have been applied to financial market simulation (Bahrammirzaee, 2010) and multimodal trading frameworks such as FinMem (Yu et al., 2023). The limitations of these techniques are summarized in comparison with the present framework (Table 1): they largely lack governance principles including structured human intervention, audit trails, and causal explanation mechanisms. In this research, these features are implemented from the ground up.

The blackboard architecture traces back to the Hearsay-II speech processing system (Hayes-Roth, 1985; Erman et al., 1980). Subsequent related techniques have been applied to financial agent simulation and multimodal trading frameworks. Graph-based approaches to portfolio construction have included minimum spanning trees (Mantegna, 1999) to identify peripheral assets for diversification, asset-graph dynamics to monitor correlation regime changes (Onnela et al., 2003), and graph-Laplacian penalties for including dependence structure directly in statistical estimation (Kipf and Welling, 2017; Hamilton, Ying and Leskovec, 2017). None of them uses a signal derived from observed quarterly institutional holdings and includes it in the CVaR optimization objective via an adaptive gate mechanism — which is what distinguishes the present research.

2.2. Network Contagion and Institutional Co-Ownership

Networks of financial institutions have been extensively studied. Allen and Gale (2000) demonstrated that the connectivity between banks determines whether a shock will remain localized or spread systemically. Billio et al. (2012) showed that return-based connectedness measures can identify early warning signals of systemic stress before they occur. Acemoglu, Ozdaglar and Tahbaz-Salehi (2015) generalized this: in sufficiently dense networks, even a minor disturbance can become sufficient to cause systemic breakdown.

2.3. Explainable AI, Human-in-the-Loop, and Large Language Models

LIME (Ribeiro, Singh and Guestrin, 2016) and SHAP (Lundberg and Lee, 2017) are now routinely used to explain model decisions, yet these techniques were not designed for optimization settings and their explanations are not grounded in a properly defined mathematical objective. The present framework derives attribution directly from the penalty term in the G-CVaR objective, satisfying the causal-grounding requirement articulated by Gunning and Aha (2019). Ji et al. (2023) documented that numerical reasoning is a persistent failure mode across LLM families; the architectural response here is to confine Mistral-7B strictly to narrative generation, while ensuring every numeric claim in any generated narrative is traceable to a deterministic blackboard value.`,
    },
    {
      heading: '3. Mathematical Formulation',
      content: `3.1. Composite Instability Index

The instability index is computed from the daily log-return matrix $R \\in \\mathbb{R}^{T \\times N}$ for $N$ assets over a rolling window of $T = 252$ trading days:

$$\\lambda_t = 0.4 \\cdot \\sigma_{\\text{spike},t} + 0.3 \\cdot \\rho_{\\text{spike},t} + 0.3 \\cdot \\text{MDD}_t \\tag{1}$$

The three components are: $\\sigma_{\\text{spike},t}$, the 20-day realized volatility normalized to its 252-day trailing history (Engle, 1982; Bollerslev, 1986); $\\rho_{\\text{spike},t}$, the mean pairwise Pearson correlation normalized to $[0, 1]$ (Longin and Solnik, 2001); and $\\text{MDD}_t \\in [0, 1]$, the rolling maximum drawdown (Bailey and Lopez de Prado, 2012). Since all three components are bounded in $[0, 1]$, so is $\\lambda_t$.

The regime classification rule is deterministic:
  Calm:    $\\lambda_t < 0.50$
  Elevated: $0.50 \\le \\lambda_t < 0.85$
  Crisis:  $\\lambda_t \\ge 0.85$

3.2. Holdings Graph, Adaptive Contagion Penalization, and Graph-Regularized CVaR

In the bipartite co-ownership network, each asset is represented as a node connected to institutional investor nodes. The asset co-occurrence matrix $A_{ij}$ counts the number of common institutional holders between assets $i$ and $j$. Eigenvector centrality $c_i$ is computed via power iteration (Bonacich, 1987), producing a score that reflects how broadly and interconnectedly each security is held.

The sigmoid-gated adaptive penalty scales the graph penalty by instability:

$$\\gamma_t = \\frac{\\gamma_{\\max}}{1 + e^{-k(\\lambda_t - \\lambda_{\\text{thresh}})}} \\tag{2}$$

Below $\\lambda_{\\text{thresh}} = 0.85$, the penalty is mostly dormant (affecting only the 4% of windows that cross the crisis threshold). Above it, the penalty rises toward $\\gamma_{\\max} = 1.0$.

The G-CVaR optimization problem per window:

$$\\min_{w, \\zeta} \\text{CVaR}_\\alpha(w) + \\gamma_t \\sum_{i=1}^N c_i w_i \\quad \\text{subject to } \\sum_{i=1}^N w_i = 1, \\; w_i \\ge 0 \\tag{3}$$

Walk-forward grid search over $\\lambda \\in \\{5, 10, 15, 20\\}$ and $\\lambda_{\\text{thresh}} \\in \\{0.75, 0.80, 0.85, 0.90\\}$ (416 total optimizations) finds $\\lambda^* = 10$ and $\\lambda^*_{\\text{thresh}} = 0.90$ as the optimal in-sample configuration (IS Sharpe = 0.6495). Results employ the operationally fixed value $\\lambda_{\\text{thresh}} = 0.85$ (IS Sharpe = 0.6399).`,
    },
    {
      heading: '4. Agent Architecture',
      content: `Agent 1 (Time-Series Sentinel). Calculates λ_t by Eqs. (1)–(2). For Universe U1 over 51 windows, λ ranges from 0.0 (Window W23, deep calm in mid-2010) to 1.0 (Window W09, GFC peak in late 2008), with an average of 0.3594 and a standard deviation of 0.2357.

Agent 2 (Graph of Contagion). Computes eigenvector centrality with power iteration and builds the co-ownership graph in NetworkX (Bonacich, 1987). For U1, centrality scores range from 0.201 for ORCL to 0.258 for LRCX. The cross-ticker standard deviation of 0.0118 in Window W01 confirms the signal is heterogeneous across assets. Agent 2 achieves 100% convergence without collapse to equal centrality across the 51 U1 windows.

Agent 3 (Optimizer G-CVaR). Solves four problems per window: Full G-CVaR, Standard CVaR, Mean-Variance, and Equal Weight. It flags human-in-the-loop review when λ_t ≥ 0.85 or portfolio turnover exceeds 0.40. Three distinct trigger events in U1: W09 and W10 for Crisis regime, W27 for excess turnover.

Agent 4 (XAI Explainer). Triggered only for windows flagged for human review. Calculates Pearson attribution between centrality c_i and weight changes Δw = w_new − w_prev / Std, then forwards a prompt to Mistral-7B (Ollama) to generate a structured narrative. Limiting LLM requests only to human-review events cuts runtime from 1–3 hours down to under twelve minutes. The language model only outputs text; all numbers in the output are taken from the blackboard.

Human-in-the-loop governance. The Gradio interface shows the trigger explanation, the proposed weight vector, the top-5 ranking based on centrality scores, the current CVaR at the 95% confidence level, and the narrative generated by Agent 4 before logging an action. The operator then has three choices: Accept (proposed weights), Reject (revert to previous window weights), or Constrain (re-solve with w_max = 8% and a 20% turnover limit). All decisions are logged to hitl_decisions, fulfilling the key auditability requirements of MiFID II and the EU AI Act. All 11 universes run in parallel, taking a total of 142 seconds on a Google Colab T4 GPU.`,
    },
    {
      heading: '5. Experimental Design',
      content: `5.1. Dataset, Benchmarks, and Metrics

The sample consists of 218 US-listed equities in 11 Global Industry Classification Standard (GICS) sector universes (Table 3). Daily adjusted closing price data for the period 2005-01-01 to 2025-12-31 are downloaded using yfinance (Fama and French, 1993). This 20-year period covers three crisis episodes: the 2008 Global Financial Crisis (Allen and Gale, 2000; Billio et al., 2012), the 2020 COVID shock (Haddad, Moreira and Muir, 2021; Longin and Solnik, 2001), and the 2022 period of rate hikes (Hamilton, 1989).

Dataset summary (11 sector universes, 218 equities, 552 windows):
  Universe    Sector                    Coverage & Windows
  U1          Technology                20 tickers, 51 windows, 2005–2025
  U2          Financial Services        18 tickers, 51 windows, 2005–2025
  U3          Healthcare                16 tickers, 50 windows, 2005–2025
  U4          Energy                    19 tickers, 49 windows, 2005–2025
  U5          Consumer Staples          20 tickers, 51 windows, 2005–2025
  U6          Consumer Discretionary    12 tickers, 51 windows, 2005–2025
  U7          Industrials               20 tickers, 49 windows, 2005–2025
  U8          Materials                 18 tickers, 49 windows, 2005–2025
  U9          Utilities                 16 tickers, 51 windows, 2005–2025
  U10         Real Estate               19 tickers, 49 windows, 2005–2025
  U11         Communication Svcs        12 tickers, 51 windows, 2005–2025

Each universe is partitioned using trading windows of T = 252 days with a step size of 100 days, leading to 49 to 51 windows per universe. The five benchmark strategies are: Standard CVaR (γ = 0), Mean-Variance (Markowitz, 1952), Equal Weight (DeMiguel, Garlappi and Uppal, 2009), Hierarchical Risk Parity (Lopez de Prado, 2016), and Risk Parity (Maillard et al., 2010). Transaction costs are set to 10 bp per unit of turnover. The main statistical test is the Wilcoxon signed-rank test, as the Shapiro–Wilk test rejects normality for all 11 universes.

5.2. Walk-Forward Validation

A 2016-01-01 date cut-off distinguishes 26 in-sample windows from 25 out-of-sample windows in each universe. For U1, the optimised model yields IS Sharpe = 0.6399 and OOS Sharpe = 0.8792. Across all 11 universes, mean IS Sharpe = 0.832 and mean OOS Sharpe = 0.872, with all universes passing the OOS validation criterion. The mean OOS Sharpe (0.872) exceeding mean IS Sharpe (0.832) is structurally explained by the IS period (2005–2016) containing the 2008 GFC drawdown, which suppresses mean Sharpe for every strategy.`,
    },
    {
      heading: '6. Results & Discussion',
      content: `6.1. Core Performance Results

Six-strategy comparison across 11 universes and 552 windows:
  Strategy         Ann. Return    Volatility    Sharpe    Sortino    Calmar    Max DD     CVaR (95%)
  G-CVaR (ours)    12.818%        16.101%       0.6098    0.8364     0.1460    87.774%    2.388%
  Standard CVaR    12.869%        15.997%       0.6169    —          —         —          —
  Mean-Variance    —              —             0.5986    —          —         —          —
  Equal Weight     —              —             —         —          —         —          3.223%
  HRP              —              —             0.6143    —          —         —          —
  Risk Parity      —              —             0.5971    —          —         —          —

The primary result: a 25.9% reduction in mean CVaR at the 95% confidence level compared to equal weight, across all 11 universes and 552 windows.

6.2. Crisis-Period Performance (Universe U1)

2008 Global Financial Crisis Performance (λ = 1.0):
  Strategy         Max Drawdown    CVaR (95%)    MDD vs Equal Weight
  G-CVaR (ours)    66.321%         4.983%        −13.0%
  Standard CVaR    65.931%         4.983%        —
  Equal Weight     76.162%         6.123%        Baseline

2020 COVID Shock Performance (λ ≈ 0.15–0.22):
  Strategy         Max Drawdown    CVaR (95%)    MDD vs Equal Weight
  G-CVaR (ours)    41.419%         5.055%        +5.5%
  Equal Weight     39.258%         4.814%        Baseline

The COVID shock did not cross the Crisis threshold (λ < 0.85), so the graph penalty was not activated. The small underperformance relative to Equal Weight in 2020 is consistent with theoretical expectations: when the instability index does not flag a crisis, the contagion penalty does not fire, and G-CVaR behaves similarly to Standard CVaR.

6.3. System Trustworthiness (160 Governance Scenarios):
  Governance Dimension    Score     Operational Result
  Trigger Accuracy        100%      Correctly flags Crisis regime and excess turnover windows
  Weight Conservatism     100%      Position constraints enforced in all Constrain actions
  Narrative Accuracy      96.9%     LLM narrative claims traceable to deterministic blackboard values

6.4. Statistical Significance (139,104 paired daily observations across 11 universes):
  Strategy Comparison          Metric Tested    p-value      Statistical Interpretation
  G-CVaR vs Equal Weight       ΔSharpe          0.0065       Statistically significant improvement
  G-CVaR vs Equal Weight       ΔCVaR            < 0.001      Highly significant tail-risk reduction
  G-CVaR vs Standard CVaR      ΔSharpe          0.0517       Non-significant (no degradation on Sharpe)

The statistical evidence confirms that G-CVaR meaningfully changes the tail-risk distribution without sacrificing return performance.`,
    },
    {
      heading: '7. Limitations and Future Work',
      content: `Despite the strong empirical results, several limitations warrant acknowledgment and motivate directions for future research.

Power of the test. The Wilcoxon signed-rank test is applied across 139,104 paired observations, which gives substantial statistical power. The near-zero p-values for the CVaR comparisons should be interpreted in context: the effect sizes (Cohen's d) are small to moderate, reflecting that G-CVaR improves tail risk without dramatically altering the return distribution.

Institutional holdings data lag. SEC 13-F filings are reported quarterly with up to a 95-day reporting lag. The persistence assumption applied within each quarter is the most conservative choice available with public data. Commercial data providers (FactSet, Bloomberg) would reduce this lag significantly for production deployments.

COVID regime non-activation. The 2020 COVID shock did not cross the Crisis threshold (λ < 0.85), so the graph penalty was not activated. Future work should investigate adaptive threshold calibration that can account for faster-moving shock episodes.

Scope of human evaluation. The 160-scenario trustworthiness evaluation was a controlled simulation exercise rather than a live user study with domain-expert operators. Future work should evaluate live operational performance with practitioners working under realistic time and information constraints.

Future work directions include: deployment as a fully operational live trading system with commercial data feeds; extension to multi-period dynamic programming formulations; integration of additional contagion channels (credit, cross-border, derivatives); and investigation of alternative LLM architectures for improved numerical reasoning in governance narratives.`,
    },
    {
      heading: '8. Conclusion',
      content: `This paper proposed a multi-agent governance framework for graph-regularized CVaR portfolio optimization with adaptive contagion penalization. The framework models institutional co-ownership contagion through a bipartite holdings graph with eigenvector centrality, adaptively penalizes portfolio concentration in highly connected securities using a sigmoid-gated instability mechanism, and provides human-in-the-loop governance with full auditability.

Empirical evaluation across 218 US equities, 11 GICS sector universes, and 552 rolling windows spanning 2005–2025 demonstrates a 25.9% reduction in CVaR at the 95% confidence level and a 32.5 percentage point reduction in crisis-period drawdown relative to equal-weight benchmarks. The system achieves 100% trigger accuracy and 100% weight conservatism across 160 governance evaluation scenarios, with 96.9% narrative accuracy in LLM-generated explanations.

The contribution is not alpha generation. It is a transparent, auditable governance mechanism for institutional portfolio management that explicitly models the contagion channels through which financial crises propagate, provides interpretable causal attributions for every governance action, and satisfies regulatory compliance requirements under MiFID II and the EU AI Act. The system is designed to be a trustworthy infrastructure layer for high-stakes financial decision making.`,
    },
    {
      heading: 'Conference Paper Abstract — IJCACI 2026 (Springer LNCS)',
      content: `Title: Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization

Abstract: This paper proposes a regime-adaptive supervisory governance framework for instability-aware portfolio stabilization. The framework integrates covariance drift, rolling volatility, and correlation stress into a composite instability index to detect market turbulence. Portfolio concentration limits and regularization strength are then adapted under unstable regimes through the governance layer. The framework is evaluated on an 18-stock universe of U.S. equities over 2005–2025, using Ledoit-Wolf covariance estimation, a 252-day rolling window, and 21-day rebalancing. Compared with equal weight, the governance framework achieves slightly lower volatility (18.15% vs 18.42%), lower maximum drawdown (−35.90% vs −36.01%), and lower CVaR at 95% (−2.79% vs −2.83%), while maintaining near-equal HHI and an effective number of assets of approximately 18. The ablation study confirms that governance regularization and concentration control are the dominant stabilizing mechanisms; regime switching modulates this behavior but does not materially improve Sharpe performance. Statistical tests (paired t-test p = 0.0168, Wilcoxon p = 0.0037) confirm the governance layer changes the return distribution in a statistically significant manner. The framework represents a practical, interpretable supervisory approach to institutional portfolio stabilization without requiring predictive intelligence or automated trading.`,
    },
    {
      heading: 'Conference Paper — Methodology (IJCACI 2026)',
      content: `3.1 Asset Universe and Returns

The empirical universe comprises 18 liquid U.S. stocks across technology, finance, healthcare, consumer goods, industrials, energy, internet, retail, semiconductors, and utility sectors. Daily adjusted close prices are recorded from 1 January 2005 to 1 January 2025. The daily log returns are calculated as:

$$r_{i,t} = \\ln\\left(\\frac{P_{i,t}}{P_{i,t-1}}\\right) \\tag{1}$$

3.2 Instability Monitoring

The supervisory monitor is constructed from three instability channels:

Channel 1 — Covariance Drift:

$$D_t = \\|\\Sigma_t - \\Sigma_{t-1}\\|_F \\tag{2}$$

where $\\|\\cdot\\|_F$ is the Frobenius norm and $\\Sigma_t$ is the rolling covariance matrix. Measures period-to-period change in estimated covariance structure.

Channel 2 — Rolling Volatility: measures volatility pressure on cross-assets and idiosyncratic risk shifts.

Channel 3 — Correlation Stress: captured by average pairwise correlation level, showing the tendency of disappearing diversification effects under stress.

Normalized signals via expanding mean and standard deviation (lagged to prevent data leakage):

$$Z_{k,t} = \\frac{X_{k,t} - \\mu_{k,t-1}^{\\text{exp}}}{\\sigma_{k,t-1}^{\\text{exp}}} \\tag{3}$$

Composite instability index:

$$I_t = \\alpha \\cdot Z_{D,t} + \\beta \\cdot Z_{V,t} + \\gamma \\cdot Z_{C,t} \\tag{4}$$

with $\\alpha = 0.4$, $\\beta = 0.3$, $\\gamma = 0.3$. Regime classified as unstable when $I_t > \\theta$, with $\\theta = 1.0$ in the main experiment.

3.3 Governance-Adaptive Optimization

Portfolio optimized using Ledoit-Wolf covariance estimate, solving for each rebalance date:

$$\\min_w w^T \\Sigma w + \\lambda_g \\sum_{i=1}^N w_i^2 \\tag{5}$$

$$\\text{subject to } \\sum_{i=1}^N w_i = 1, \\quad 0 \\le w_i \\le u_g \\tag{6}$$

Stable regime: $u_g = 0.35$, $\\lambda_g = 1$  
Unstable regime: $u_g = 0.20$, $\\lambda_g = 10$

3.4 Backtesting Protocol

Uses 252-day training window with 21-day rebalancing. Out-of-sample period: 2015–2025. Transaction costs: 0.1% proportional. Measures reported: annual returns, volatility, Sharpe ratio, maximum drawdown, CVaR(95%), HHI, turnover, threshold sensitivity, and ablation analysis.

$$\\text{HHI}_t = \\sum_{i=1}^N w_{i,t}^2$$

(lower $\\text{HHI}$ indicates broader diversification).`,
    },
    {
      heading: 'Conference Paper — Results & Conclusion (IJCACI 2026)',
      content: `4. Empirical Results

4.1 Instability and Regime Activation

In the full signal sample, 4,213 observations are classified as stable and 503 as unstable (89.3% stable, 10.7% unstable). The instability index jumps sharply during major stress periods, most notably around the Global Financial Crisis and the COVID-19 crash. Crisis windows have substantially higher instability scores than non-crisis periods (Welch test: t = 7.47, p = 1.01 × 10⁻¹¹).

4.2 Governance Versus Equal Weight (Out-of-Sample 2015–2025)

  Metric                Governance    Equal Weight
  Annual return         0.1665        0.1709
  Volatility            0.1815        0.1842
  Sharpe ratio          0.8071        0.8190
  Maximum drawdown      −0.3590       −0.3601
  CVaR (95%)            −0.0279       −0.0283

Equal weight delivers a slightly higher annual return and Sharpe ratio. The governance framework delivers slightly lower volatility, maximum drawdown, and CVaR — indicating stabilization rather than return dominance.

4.3 Concentration Analysis

Cross-strategy concentration comparison:
  Strategy                    Mean HHI    Effective N
  Equal weight                0.0556      18.0
  Minimum variance (LW)       0.1776       5.6
  Governance, no regime       0.0557      18.0
  Governance framework        0.0557      18.0

The effective number of assets for the minimum-variance baseline is only 5.6, indicating substantially greater concentration, whereas both governance variants remain close to equal-weight diversification. Average turnover per rebalance is 0.0045, and the estimated annual transaction-cost drag is about 0.0001.

4.4 Ablation Study (2015–2025)

  Model                     Annual Return  Volatility  Sharpe  Max Drawdown  CVaR (95%)
  Equal weight              0.1709         0.1842      0.8190  −0.3601       −0.0283
  Minimum variance (LW)     0.0981         0.1463      0.5338  −0.3407       −0.0218
  Governance, no regime     0.1664         0.1812      0.8075  −0.3594       −0.0279
  Governance framework      0.1665         0.1815      0.8071  −0.3590       −0.0279

The evidence is more strongly in favor of governance regularization and concentration control than for a large incremental benefit from regime switching itself.

7. Conclusion

This paper proposed a regime-adaptive supervisory governance framework for instability-aware portfolio stabilization. The framework combines covariance drift, rolling volatility, and correlation stress into an interpretable instability index, then adapts portfolio concentration limits and regularization strength under unstable regimes. Empirical results from 2005 to 2025 show that the framework preserves broad diversification and modestly improves downside stability relative to equal weight, while not improving return or Sharpe performance.

The contribution is therefore not alpha generation. It is a transparent governance mechanism for stabilizing portfolio behavior under covariance instability. The above position is both practical and methodologically sound in that it provides for adaptive supervisory stabilizing without making unproved claims of predictive intelligence or automated trading.`,
    },
    {
      heading: 'References',
      content: `EAAI Journal References (selected):
1. Allen, F., Gale, D. (2000). Financial contagion. Journal of Political Economy, 108(1), 1–33.
2. Billio, M., Getmansky, M., Lo, A.W., Pelizzon, L. (2012). Econometric measures of connectedness and systemic risk in the finance and insurance sectors. Journal of Financial Economics, 104(3), 535–559.
3. Acemoglu, D., Ozdaglar, A., Tahbaz-Salehi, A. (2015). Systemic risk and stability in financial networks. American Economic Review, 105(2), 564–608.
4. Bonacich, P. (1987). Power and centrality: A family of measures. American Journal of Sociology, 92(5), 1170–1182.
5. Rockafellar, R.T., Uryasev, S. (2000). Optimization of conditional value-at-risk. Journal of Risk, 2(3), 21–41.
6. Markowitz, H. (1952). Portfolio selection. Journal of Finance, 7(1), 77–91.
7. Lopez de Prado, M. (2016). Building diversified portfolios that outperform out of sample. Journal of Portfolio Management, 42(4), 59–69.
8. Ribeiro, M.T., Singh, S., Guestrin, C. (2016). "Why should I trust you?": Explaining the predictions of any classifier. KDD 2016.
9. Ji, Z. et al. (2023). Survey of hallucination in natural language generation. ACM Computing Surveys, 55(12), 1–38.
10. European Parliament and Council of the EU (2014). Directive 2014/65/EU (MiFID II).
11. European Parliament and Council of the EU (2024). EU Artificial Intelligence Act.

IJCACI 2026 Conference References (selected):
1. Acharya, V.V., Engle, R.F., Richardson, M. (2012). Capital shortfall: A new approach to measuring systemic risk. American Economic Review, 102(3), 59–64.
2. DeMiguel, V., Garlappi, L., Uppal, R. (2009). Optimal versus naive diversification. Review of Financial Studies, 22(5), 1915–1953.
3. Ledoit, O., Wolf, M. (2004). A well-conditioned estimator for large-dimensional covariance matrices. Journal of Multivariate Analysis, 88(2), 365–411.
4. Rockafellar, R.T., Uryasev, S. (2002). Conditional value-at-risk for general loss distributions. Journal of Banking & Finance, 26(7), 1443–1471.
5. Markowitz, H. (1952). Portfolio selection. Journal of Finance, 7(1), 77–91.
6. Wooldridge, M. (2009). An Introduction to MultiAgent Systems. John Wiley & Sons, 2nd ed.`,
    },
  ],
  ieeePaper: {
    venue: 'Elsevier – Engineering Applications of Artificial Intelligence (EAAI-26-14280) | IJCACI 2026 (Springer LNCS)',
    paperTitle: 'Multi-Agent Portfolio Governance with Regime-Adaptive $\\mathcal{G}$-CVaR and Convex Graph Optimization',
    authors: [
      { name: 'Kandula Jithendra Subramanyam', affiliationIndex: 1, isCorresponding: true, email: 'jithendrasubramanyam@gmail.com' },
    ],
    affiliations: [
      { index: 1, institution: 'Faculty of Engineering & Technology', department: 'Dept. of Artificial Intelligence & Machine Learning', location: 'Bengaluru, India' },
    ],
    abstract: 'Modern quantitative portfolio construction faces dual catastrophic failure modes: sudden volatility regime dislocations and hidden fire-sale contagion propagated through institutional co-ownership networks. We propose an auditable, five-agent blackboard governance architecture that dynamically unifies continuous-time regime sensing with convex graph-regularized risk optimization. The architecture implements: (i) an empirical instability index sensing covariance drift, rolling volatility, and drawdowns, (ii) a dynamic bipartite co-ownership contagion graph derived from SEC Form 13-F filings, (iii) a graph-regularized CVaR formulation (G-CVaR) with a sigmoid-gated adaptive Laplacian penalty, (iv) an LLM-powered causal explainer generating audit traces, and (v) an automated human-in-the-loop compliance gate satisfying MiFID II and EU AI Act constraints. Evaluated over 552 rolling windows across 11 sector universes (2005–2025), the framework achieves a 25.9% reduction in 95% CVaR and a 32.5 percentage-point compression in maximum drawdown during systemic crises.',
    keywords: [
      'Multi-Agent Systems',
      'Portfolio Governance',
      'Conditional Value-at-Risk (CVaR)',
      'Contagion Graphs',
      'Convex Optimization',
      'Explainable AI (XAI)',
      'Regulatory Compliance (MiFID II)',
    ],
    figures: [
      {
        id: 'fig1-pipeline',
        figureNumber: 'Fig. 1',
        title: 'Five-Agent Blackboard Pipeline',
        caption: 'Architectural schematic of the five-agent blackboard governance pipeline showing unidirectional communication, state persistence, and regulatory audit gates.',
        src: '/images/projects/adaptive-portfolio-governance/fig1-five-agent-pipeline.png',
        alt: 'Five-Agent Blackboard Pipeline Architecture',
      },
      {
        id: 'fig2-turbulence',
        figureNumber: 'Fig. 2',
        title: 'Instability Index Distribution',
        caption: 'Empirical trajectory and probability density distribution of the composite instability index $I_t$ across 552 rolling windows (2005–2025).',
        src: '/images/projects/adaptive-portfolio-governance/fig2-turbulence-distribution.png',
        alt: 'Turbulence Index Trajectory and Distribution',
      },
      {
        id: 'fig3-graph',
        figureNumber: 'Fig. 3',
        title: 'Bipartite Co-Ownership Contagion Graph',
        caption: 'Institutional bipartite co-ownership network and eigenvector centrality topology extracted from SEC Form 13-F institutional filings.',
        src: '/images/projects/adaptive-portfolio-governance/fig3-bipartite-ownership-graph.png',
        alt: 'Bipartite Co-Ownership Graph',
      },
      {
        id: 'fig4-strategies',
        figureNumber: 'Fig. 4',
        title: 'Six-Strategy Benchmark Evaluation',
        caption: 'Empirical risk-adjusted performance comparing G-CVaR against classic Markowitz Mean-Variance, Hierarchical Risk Parity (HRP), and Standard CVaR across 11 asset universes.',
        src: '/images/projects/adaptive-portfolio-governance/fig4-six-strategy-comparison.png',
        alt: 'Six-Strategy Benchmark Comparison',
      },
      {
        id: 'fig5-validation',
        figureNumber: 'Fig. 5',
        title: 'Statistical Significance Validation',
        caption: 'Statistical validation package: bootstrap $\\Delta\\text{Sharpe}$ distribution (left) and regime-stratified CVaR at 95% confidence level (right).',
        src: '/images/projects/adaptive-portfolio-governance/fig7-statistical-validation.png',
        alt: 'Statistical Validation Package',
      },
      {
        id: 'fig6-ablation',
        figureNumber: 'Fig. 6',
        title: 'Architectural Ablation Study',
        caption: 'Four-condition ablation evaluating Sharpe ratio, maximum drawdown, and 95% CVaR under selective disabling of the regime sentinel and contagion regularizer.',
        src: '/images/projects/adaptive-portfolio-governance/fig6-ablation-four-conditions.png',
        alt: 'Four Condition Ablation Study',
      },
      {
        id: 'fig7-trustworthiness',
        figureNumber: 'Fig. 7',
        title: 'XAI Attribution & Trustworthiness Radar',
        caption: 'Trustworthiness radar evaluation across 160 governance scenarios assessing factual accuracy, mathematical conservatism, and audit completeness.',
        src: '/images/projects/adaptive-portfolio-governance/fig10-xai-trust-radar.png',
        alt: 'Trustworthiness Radar Chart',
      },
      {
        id: 'fig8-hitl',
        figureNumber: 'Fig. 8',
        title: 'Human-in-the-Loop Governance Ablation',
        caption: 'Drawdown compression and cumulative wealth preservation under supervisory human intervention during the 2008 and 2020 volatility regimes.',
        src: '/images/projects/adaptive-portfolio-governance/fig11-hitl-governance-ablation.png',
        alt: 'Human-in-the-Loop Governance Ablation',
      },
      {
        id: 'fig9-latency',
        figureNumber: 'Fig. 9',
        title: 'Multi-Agent Latency & Execution Benchmark',
        caption: 'End-to-end execution latency distribution across the blackboard multi-agent pipeline verifying real-time institutional trading readiness.',
        src: '/images/projects/adaptive-portfolio-governance/fig14-latency-mas-validation.png',
        alt: 'Multi-Agent Latency Distribution',
      },
    ],
    references: [
      { index: 1, citation: 'R. T. Rockafellar and S. Uryasev, "Optimization of conditional value-at-risk," Journal of Risk, vol. 2, no. 3, pp. 21–41, 2000.', doi: '10.21314/JOR.2000.038' },
      { index: 2, citation: 'F. Allen and D. Gale, "Financial contagion," Journal of Political Economy, vol. 108, no. 1, pp. 1–33, 2000.', doi: '10.1086/262109' },
      { index: 3, citation: 'P. Bonacich, "Power and centrality: A family of measures," American Journal of Sociology, vol. 92, no. 5, pp. 1170–1182, 1987.', doi: '10.1086/228631' },
      { index: 4, citation: 'M. Lopez de Prado, "Building diversified portfolios that outperform out of sample," Journal of Portfolio Management, vol. 42, no. 4, pp. 59–69, 2016.', doi: '10.3905/jpm.2016.42.4.059' },
      { index: 5, citation: 'D. Acemoglu, A. Ozdaglar, and A. Tahbaz-Salehi, "Systemic risk and stability in financial networks," American Economic Review, vol. 105, no. 2, pp. 564–608, 2015.', doi: '10.1257/aer.20130456' },
      { index: 6, citation: 'H. Markowitz, "Portfolio selection," The Journal of Finance, vol. 7, no. 1, pp. 77–91, 1952.', doi: '10.1111/j.1540-6261.1952.tb01525.x' },
    ],
  },
};
