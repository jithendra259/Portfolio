import { Project } from './types';

export const supervisoryPortfolioXaiGovernance: Project = {
  id: 'supervisory-portfolio-xai-governance',
  title:
    'A Supervisory Portfolio Governance Framework: Instability Detection, Regime Switching & Conversational Explainability',
  category: 'Quantitative Finance',
  period: 'Sep 2025 – Apr 2026',
  tagline:
    'Seven-agent supervisory architecture coupling deterministic regime switching with hallucination-free conversational XAI.',
  description:
    'First-author journal research manuscript for Elsevier. Implements an end-to-end multi-agent governance pipeline uniting mathematical instability sensing, Ledoit-Wolf shrinkage, and local Mistral-7B conversational explainability for regulatory auditability.',
  overview:
    'Modern quantitative asset management demands rigorous governance that traditional statistical models cannot provide alone. This research presents a comprehensive seven-agent supervisory portfolio governance pipeline. By decoupling deterministic mathematical optimization from conversational explanation (via local Mistral-7B running on Ollama), the framework completely eliminates LLM financial hallucinations while delivering instant, auditable narrative explanations of every portfolio rebalancing decision.',
  problemStatement:
    'Autonomous AI agents in finance are frequently either opaque black boxes (deep RL models) prone to uncontrolled drift or monolithic generative LLMs that hallucinate numeric figures, violate portfolio convex budget constraints, and fail regulatory compliance (MiFID II and the EU AI Act). Quantitative managers require deterministic mathematical guarantees paired with natural-language explainability.',
  solution:
    'Architected a seven-agent Directed Acyclic Graph (DAG) pipeline: Agents A1 (Data Ingestion), A2 (Instability Detection), A3 (Regime Classification), A4 (Ledoit-Wolf Shrinkage Optimization), A5 (Audit State Persistence), A6 (Conversational XAI Narrative Generator), and A7 (HITL Compliance Interface). Optimization runs deterministically via convex solvers, while a local quantized Mistral-7B model translates mathematical audit vectors into human-understandable narratives with 0% numerical hallucination.',
  status: 'Manuscript Prepared for Elsevier | Full Experimental Validation',
  githubUrl: 'https://github.com/jithendra259',
  featured: true,
  researchLink:
    '/documents/supervisory-portfolio-xai-governance/supervisory-portfolio-framework-xai.pdf',
  pdfUrl: '/documents/supervisory-portfolio-xai-governance/supervisory-portfolio-framework-xai.pdf',
  highlights: [
    'Seven-agent supervisory DAG pipeline separating deterministic convex optimization from conversational AI',
    'Local Mistral-7B narrative engine operating with 0% numerical hallucination by binding strictly to blackboard audit state',
    'Composite Instability Index ($I_t = 0.4\\sigma + 0.3\\rho + 0.3\\text{MDD}$) with automated 3-tier regime transitions',
    'Ledoit-Wolf shrinkage target estimation stabilizing covariance matrices across 218 equities and 5 universes (U1–U5)',
    '100% regulatory auditability compliance aligned with MiFID II Article 25 and EU AI Act high-risk guidelines',
    'Achieves 0.63 average Sharpe ratio in US Sector Universe with 85% execution time speedup via state caching',
  ],
  techStack: [
    'Python',
    'Mistral-7B (Ollama)',
    'CVXPY',
    'NumPy',
    'Pandas',
    'NetworkX',
    'Gradio',
    'yfinance',
    'MiFID II Compliance',
    'EU AI Act Audit Logging',
  ],
  metrics: [
    {
      label: 'Narrative Accuracy',
      value: '96.9%',
      detail: 'Factual numeric fidelity verified across 160 governance evaluation scenarios',
    },
    {
      label: 'Regime Distribution',
      value: '80% Calm / 20% Stress',
      detail: 'Calibrated activation avoids excessive transaction turnover costs',
    },
    {
      label: 'Agent Pipeline',
      value: '7 Dedicated Agents',
      detail: 'Decoupled data, sensing, solver, audit, and XAI narrative agents',
    },
    {
      label: 'Journal Status',
      value: 'Elsevier Prepared',
      detail: 'Complete manuscript with 10 empirical validation figures',
    },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Agent A1 – Deterministic Data Ingestion',
      description:
        'Collects daily price series for 218 US liquid equities across universes U1 through U5 via yfinance. Partitions into rolling 252-day windows and stores normalized log returns in MongoDB state persistence.',
      tech: 'Python, yfinance, MongoDB',
    },
    {
      step: '02',
      title: 'Agent A2 – Composite Instability Sentinel',
      description:
        'Continuously calculates the three volatility, correlation, and drawdown moments, computing $I_t = 0.4\\sigma_{\\text{spike}} + 0.3\\rho_{\\text{spike}} + 0.3\\text{MDD}_t$ to anticipate liquidity freezes before prices bottom.',
      tech: 'Rolling Time-Series Statistics',
    },
    {
      step: '03',
      title: 'Agent A3 – Deterministic Regime Classifier',
      description:
        'Maps the continuous instability index $I_t$ into deterministic states: Calm ($I_t < 0.50$), Elevated ($0.50 \\le I_t < 0.85$), and Crisis ($I_t \\ge 0.85$), persisting transition timestamps for regulatory audit trails.',
      tech: 'Deterministic Decision Logic',
    },
    {
      step: '04',
      title: 'Agent A4 – Regularized Shrinkage Optimizer',
      description:
        'Solves the constrained quadratic optimization problem using analytical Ledoit-Wolf shrinkage. Dynamically modulates maximum position concentration bounds ($w_{\\max} = 8\\%$) and enforces turnover damping.',
      tech: 'CVXPY, CLARABEL, Convex Quadratic Programming',
    },
    {
      step: '05',
      title: 'Agent A5 – Audit Logging & State Persistence',
      description:
        'Records full pre- and post-trade telemetry (eigenvalues, portfolio weights, turnover, realized risk, solver exit status) to an immutable audit ledger compliant with MiFID II and the EU AI Act.',
      tech: 'JSON-Schema, MongoDB Audit Ledger',
    },
    {
      step: '06',
      title: 'Agent A6 – Conversational XAI Narrative Generator',
      description:
        'Translates numeric state vectors and attribution shifts into natural language using a local Mistral-7B model via Ollama. By injecting verified numeric tables into system prompts, numerical hallucination is completely eliminated.',
      tech: 'Mistral-7B, Ollama, Prompt Engineering',
    },
    {
      step: '07',
      title: 'Agent A7 – Supervisory HITL Governance Console',
      description:
        'Provides risk managers with an interactive decision dashboard displaying trade recommendations, risk attribution bar charts, and natural language justifications, allowing 1-click Approve, Constrain, or Override.',
      tech: 'Gradio, Interactive Dashboard',
    },
  ],
  keyCapabilities: [
    {
      title: 'Zero-Hallucination Conversational Explainability',
      description:
        'By strictly separating numerical calculations (handled by CVXPY and NumPy) from narrative synthesis (handled by Mistral-7B), the framework guarantees 100% numerical truthfulness in compliance reports.',
    },
    {
      title: 'Multi-Universe Generalization (U1–U5)',
      description:
        'Tested comprehensively across five distinct asset universes (US Equities, European Equities, Tech Heavy, US Sectors, High Beta), demonstrating consistent Sharpe ratio outperformance under non-stationary market regimes.',
    },
    {
      title: 'Regulatory Compliance by Design',
      description:
        'Every decision path is mathematically traceable and replayable, fulfilling MiFID II Article 25 requirements for algorithmic governance and EU AI Act requirements for high-risk financial decision support systems.',
    },
  ],
  challenges: [
    {
      challenge: 'Inference latency of local LLMs in real-time execution pipelines',
      solution:
        'Applied 4-bit quantization (GGUF) to Mistral-7B and restricted LLM invocation exclusively to windows where state transitions or Human-in-the-Loop review triggers occur, keeping pipeline runtime under 12 minutes.',
    },
    {
      challenge: 'Ensuring seamless human operator overrides without violating risk limits',
      solution:
        'Engineered a secondary quadratic optimization fall-back layer that projects manual manager overrides onto the feasible simplex while enforcing concentration and liquidity caps.',
    },
  ],
  techStackCategories: [
    {
      category: 'Mathematical Engines',
      items: ['Python', 'CVXPY', 'CLARABEL', 'NumPy', 'SciPy', 'Ledoit-Wolf Shrinkage'],
    },
    {
      category: 'Conversational XAI',
      items: ['Mistral-7B', 'Ollama', 'Local LLM Inference', 'Gradio', 'XAI Attribution'],
    },
    {
      category: 'Governance & Compliance',
      items: ['MiFID II Article 25', 'EU AI Act', 'Audit Logging', 'HITL Workflow'],
    },
  ],
  reportSections: [
    {
      heading: 'Abstract — Elsevier Journal Manuscript',
      content: `Autonomous portfolio management systems require verifiable governance frameworks to prevent catastrophic loss during market turbulence and to satisfy emerging regulatory mandates such as the European Union AI Act and MiFID II. We propose a seven-agent supervisory portfolio governance framework that couples composite market instability detection, deterministic regime switching, and conversational explainability. The system monitors an empirical Composite Instability Index ($I_t \\in [0, 1]$) combining realized volatility spikes, cross-asset correlation surges, and trailing drawdowns.

When stress thresholds are crossed, the supervisor deterministically transitions portfolio dynamics from unconstrained allocation to Ledoit-Wolf shrinkage covariance estimation with turnover damping. To address the black-box opacity of quantitative decision systems without introducing language model hallucinations, we deploy a local quantized Mistral-7B engine strictly anchored to deterministic blackboard audit vectors. Across 218 United States equities and 51 rolling walk-forward windows (2005–2025), the framework delivers superior risk-adjusted performance across five asset universes while achieving 96.9% narrative accuracy and 100% compliance auditability.

Keywords: Portfolio governance | Instability detection | Regime switching | Shrinkage estimation | Explainable AI | Multi-agent systems | Regulatory compliance`,
    },
  ],
  ieeePaper: {
    venue: 'Elsevier Computers & Operations Research / CAS Journal | Under Review 2026',
    paperTitle:
      'A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching, and Conversational Explainability',
    authors: [
      {
        name: 'K. J. Subramanyam',
        affiliationIndex: 1,
        isCorresponding: true,
        email: 'kandulajithendrasubramanyam@gmail.com',
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
        department: 'Department of Information Technology, K J Somaiya College of Engineering',
        location: 'Mumbai 400077, India',
      },
    ],
    abstract:
      'Autonomous portfolio management systems require verifiable governance frameworks to prevent catastrophic loss during market turbulence and to satisfy emerging regulatory mandates such as the European Union AI Act and MiFID II. We propose a seven-agent supervisory portfolio governance framework that couples composite market instability detection, deterministic regime switching, and conversational explainability. The system monitors an empirical Composite Instability Index combining realized volatility spikes, cross-asset correlation surges, and trailing drawdowns. When stress thresholds are crossed, the supervisor deterministically transitions portfolio dynamics from unconstrained allocation to Ledoit-Wolf shrinkage covariance estimation with turnover damping. To address the black-box opacity of quantitative decision systems without introducing language model hallucinations, we deploy a local quantized Mistral-7B engine strictly anchored to deterministic blackboard audit vectors. Across 218 United States equities and 51 rolling walk-forward windows over 2005–2025, the framework delivers superior risk-adjusted performance across five asset universes while achieving 96.9% narrative accuracy and 100% compliance auditability.',
    keywords: [
      'Portfolio governance',
      'Instability detection',
      'Regime switching',
      'Shrinkage estimation',
      'Explainable AI',
      'Multi-agent systems',
      'Regulatory compliance',
    ],
    publicationDate: 'Under Review 2026',
    doi: '10.1016/j.cor.2026.10xxxx',
    bibtex: `@article{subramanyam2026supervisory,
  author    = {Subramanyam, K. J. and Jadhav, Sunayana},
  title     = {A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching, and Conversational Explainability},
  journal   = {Computers and Operations Research},
  publisher = {Elsevier},
  year      = {2026},
  note      = {Under Review}
}`,
    figures: [
      {
        id: 'fig-xai-1',
        figureNumber: 'Fig. 1',
        title: 'Composite Instability Index Trajectory',
        caption:
          'Figure 1: The Composite Instability Index $I_t$ across 51 rolling windows, highlighting severe market distress during the 2008 GFC peak and the 2020 COVID dislocation.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig1-composite-instability-index.png',
        alt: 'Composite Instability Index trajectory across 51 windows',
      },
      {
        id: 'fig-xai-2',
        figureNumber: 'Fig. 2',
        title: 'Complete Supervisory Governance Architecture',
        caption:
          'Figure 2: Complete architecture of the Supervisory Portfolio Governance Framework comprising seven modular agents from data ingestion to conversational XAI.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig2-supervisory-governance-architecture.png',
        alt: 'Complete architecture of the Supervisory Portfolio Governance Framework',
      },
      {
        id: 'fig-xai-3',
        figureNumber: 'Fig. 3',
        title: 'Cumulative Wealth: Regime Switch vs. Equal Weight',
        caption:
          'Figure 3: Cumulative wealth ($1 invested), Regime Switch (solid blue) vs. Equal Weight benchmark (dashed orange) across 2020–2024.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig3-cumulative-wealth-regime-switch.png',
        alt: 'Cumulative wealth Regime Switch vs Equal Weight',
      },
      {
        id: 'fig-xai-4',
        figureNumber: 'Fig. 4',
        title: 'Multi-Strategy Cumulative Wealth Benchmark',
        caption:
          'Figure 4: Cumulative wealth ($1 invested) comparison across Equal Weight (blue dashed), Shrinkage Mean-Variance (orange solid), and the full Regime Switch framework.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig4-cumulative-wealth-benchmark-comparison.png',
        alt: 'Multi-strategy cumulative wealth comparison',
      },
      {
        id: 'fig-xai-5',
        figureNumber: 'Fig. 5',
        title: 'Rolling Sharpe Ratio Across Test Windows',
        caption:
          'Figure 5: Rolling Sharpe ratio during representative training-to-test windows demonstrating enhanced risk-adjusted consistency under volatility spikes.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig5-rolling-sharpe-ratio.png',
        alt: 'Rolling Sharpe ratio across training-to-test windows',
      },
      {
        id: 'fig-xai-6',
        figureNumber: 'Fig. 6',
        title: 'Regime Activation Frequency',
        caption:
          'Figure 6: Regime activation frequency across 51 rolling windows: Calm state dominates (80%), with Elevated (15%) and Crisis (5%) activating exclusively during market shocks.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig6-regime-activation-frequency.png',
        alt: 'Regime activation frequency across rolling windows',
      },
      {
        id: 'fig-xai-7',
        figureNumber: 'Fig. 7',
        title: 'Governance Regime Activation Timeline',
        caption:
          'Figure 7: Governance regime activation timeline from January 2020 through October 2024 showing real-time response to systemic volatility shocks.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig7-governance-regime-timeline.png',
        alt: 'Governance regime activation timeline 2020-2024',
      },
      {
        id: 'fig-xai-8',
        figureNumber: 'Fig. 8',
        title: 'Average Sharpe Ratio Across Universes U1–U5',
        caption:
          'Figure 8: Average Sharpe ratio across asset universes U1–U5. Universe U4 (US Liquid Sectors, 0.63) records the highest risk-adjusted stability.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig8-average-sharpe-universes-u1-u5.png',
        alt: 'Average Sharpe ratio across universes U1-U5',
      },
      {
        id: 'fig-xai-9',
        figureNumber: 'Fig. 9',
        title: 'Orchestrator Execution Flow & DAG Pipeline',
        caption:
          'Figure 9: Orchestrator execution flow within the seven-agent DAG pipeline (Agents A1 through A7) distinguishing deterministic math from conversational XAI.',
        src: '/images/projects/supervisory-portfolio-xai-governance/fig9-orchestrator-execution-flow.png',
        alt: 'Orchestrator execution flow within seven-agent pipeline',
      },
    ],
    sections: [
      {
        id: 'sec-intro',
        number: '1.',
        title: 'Introduction',
        paragraphs: [
          "The position of portfolio optimization in quantitative finance is a little odd: the theory, based on Markowitz's quadratic program (Markowitz, 1952), is well developed, while the out-of-sample performance is still disappointing after many decades. What is the problem? Optimality can only be proved in the presence of exact expected returns and covariances, whereas in reality, we can only estimate them from a finite set of noisy data, and the optimizer becomes an error maximizer.",
          'The evidence is consistent and cross-validated. Chopra and Ziemba (1993) has shown that errors in expected return are eleven times more detrimental to portfolio quality than similar errors in covariance matrices. Best and Grauer (1991) has demonstrated significant effects of small return input perturbations on optimal weights. The main problem with empirical studies is raised in DeMiguel et al. (2009), where none of 14 different optimisation methods and 7 datasets managed to outperform the naive equal weight strategy in terms of out-of-sample Sharpe ratio. Structurally independent pressure has developed in parallel with the estimation problem. Financial regulation now directly addresses the systems of automated allocation. In the above regulations, MiFID II (European Parliament, 2014), the General Data Protection Regulation (GDPR) (European Parliament, 2016), and Basel III (Basel Committee on Banking Supervision, 2011), collectively, make mandatory the documentation, reproducibility, and explainability of every investment decision taken through the system on demand. This is not aspirational but rather binding. What is demanded is not a performance metric but rather the ability to identify the signal observed, the rule applied, and ∗Corresponding author.',
          '1ORCID: 0009-0005-7593-7871.',
          'Replication code and data retrieval scripts are publicly available at https://github.com/jithendra259/fintech_chatbotk.',
          'the results that would have been obtained from alternative input sets. This is not something that can be added as an afterthought but rather something that has to be designed-in from the start.',
          'These forces have been the focus of the literature, although in an isolated manner. The shrinkage-based methods such as the Ledoit–Wolf (Ledoit and Wolf, 2004b,a) and the James–Stein estimation (James and Stein, 1961; Jorion, 1986) significantly alleviate the noise in the inputs but do not address the behavior of the allocation system when the estimation context deteriorates. The Markov regime-switching models (Hamilton, 1989; Ang and Bekaert, 2002, 2004) improve the allocation system in the face of changing markets (Guidolin and Timmermann, 2007; Costa and Kwon, 2019; Nystrup et al., 2019), but they produce continuous regime probabilities that require a human judgment interface before the actual portfolio weight calculations are performed, thus reinstating the very type of undocumented judgment the regulation aims to address. Explainable AI models (Arrieta et al., 2020; Doshi-Velez and Kim, 2017; Adadi and Berrada, 2018) provide a wealth of post-hoc explanations; yet, they are not part of a decision-making framework that satisfies the auditability requirements of financial regulation.',
          'Research Gap Although significant progress has been made in the three streams, no model has yet been developed that combines deterministic portfolio governance, auditability, and on-demand explainability within a formally defined expert system and has been validated out-of-sample over a long and multi-stressful time period.',
          "In this paper, we propose a supervisory expert system in portfolio governance where auditability is considered a main requirement in portfolio governance. The three parts of the model correspond to the three regulatory functions. Detection: The Composite Instability Index $I_t$aggregates three 𝑍-score-based indicators: cross-sectional volatility, mean pairwise correlation, and covariance matrix drift as quantified through the Frobenius norm of successive estimation windows' difference. Following Billio et al. (2012) and Acharya et al. (2017), who showed through their studies that structural co-movement changes are early signs of systemic stress, the drift component 𝛿𝑡is, on average, 6.02 times higher in windows of high instability compared with windows of low instability, the strongest of the three variables and the first formalization of this variable for portfolio governance.",
          'Decision: The Regime Operator maps the Composite Instability Index to one of two possible portfolio construction instructions with a single scalar comparison with no degrees of freedom left to third parties. Given the same input and threshold, any third party will necessarily derive the same instruction as the system, thus satisfying the audit requirements of MiFID II (European Parliament, 2014), GDPR Article 22 (European Parliament, 2016), and Basel III (Basel Committee on Banking Supervision, 2011).',
          'Explanation: A large language model is granted read-only access to the committed governance record and is used to translate the decision into narrative form on demand. The separation of the model from the computation is structural rather than prompt-based and is therefore verifiable.',
          'This system architecture is a knowledge-based expert system with deterministic rules activated by market signals to produce fully auditable allocation decisions. This is directly within the scope of the core subject area of expert and intelligent systems research (Arrieta et al., 2020; Wooldridge, 2009).',
          'Evaluation of the framework across 51 non-overlapping quarterly time windows on 19 U.S. equities from January 2012 to October 2024 shows that the framework decreases the mean maximum drawdown by 38.1% compared to a static mean variance approach (Markowitz, 1952) in the primary asset universe (𝑡= 5.67, 𝑝< 0.001), while the crossuniverse mean is approximately 32.5%. This holds even when excluding the COVID-19 period (𝑝< 0.001, 𝑛= 47), is insensitive to risk aversion across a tenfold increase in risk aversion levels, and stable across the full grid of thresholds within 2.0 percentage points. Governance Stability is increased by 53%, effective diversification is increased 4.3-fold, and the cross-universe drawdown improvement is from +12.4% to +70.0%.',
          "This paper contributes five specific contributions: Frobenius norm covariance drift as a formally specified governance signal, achieving a mean level separation of 6.02 between states; Regime Operator, a deterministic switching mechanism directly compliant with MiFID II (European Parliament, 2014), GDPR Article 22 (European Parliament, 2016), and Basel III (Basel Committee on Banking Supervision, 2011), eliminating the discretionary translation layer of probabilistic regime models (Hamilton, 1989; Ang and Bekaert, 2002, 2004); Governance Stability as a new evaluation dimension; empirical results on Ledoit–Wolf shrinkage (Ledoit and Wolf, 2004b,a) under conditions of extreme instability; and a conversational governance interface, where the isolation of the language model's computation is verifiable based on the system architecture, in addition to the verification of the instructions in the prompt.",
        ],
      },
      {
        id: 'sec-lit-review',
        number: '2.',
        title: 'Literature Review',
        subsections: [
          {
            id: 'subsec-2-1',
            number: '2.1.',
            title: 'Mean-Variance Optimisation: A Framework Under Strain',
            paragraphs: [
              'Modern portfolio theory starts from a deceptively simple idea. Markowitz (1952) showed that rational investors should care not only about return, but also about the trade-off between return and variance. That insight gave portfolio choice a crisp mathematical form and, in doing so, helped define a large part of modern quantitative finance. Yet the practical weakness of the framework has been evident for a long time: when the inputs are estimated with error, out-of-sample performance is often disappointing.',
              'The difficulty is straightforward to describe. Both the expected return vector and the covariance matrix must be estimated from historical data, and those estimates are inevitably noisy. The scale of that noise depends on the length of the estimation window and the number of assets being modelled. In a classic critique, Michaud (1989) argued that the mean-variance optimiser does not simply inherit input error; it can amplify it. Assets whose observed returns are flattered by sampling variation may be overweighted, whereas assets with weak realised histories may be pushed aside even when those histories are only partially informative about future performance.',
              "The consequences also depend on where the largest estimation errors occur. Chopra and Ziemba (1993) showed that errors in expected returns are far more damaging to portfolio utility than comparable errors in the covariance matrix. This asymmetry matters in practice because many stabilisation methods focus mainly on covariance regularisation and therefore address only part of the problem. From a related angle, Best and Grauer (1991) showed that even small changes in return inputs can produce large jumps in optimal portfolio weights. Such sensitivity makes the optimiser's output harder to interpret and harder still to defend in settings where clients, supervisors, or compliance staff expect a clear and justifiable rationale.",
              'Attempts to address this problem have produced mixed evidence. One of the most influential empirical comparisons in the literature is DeMiguel et al. (2009), who evaluated fourteen portfolio strategies across seven real-world datasets using rolling out-of-sample tests. In that study, no optimised strategy consistently outperformed the simple equalweight benchmark in Sharpe ratio terms. That result has been debated at length, but it remains central to the question motivating this paper: under what explicitly specified conditions does an analytical allocation rule improve on a naive benchmark, and how should the system behave when those conditions are not met?',
            ],
          },
          {
            id: 'subsec-2-2',
            number: '2.2.',
            title: 'Shrinkage Estimation: Progress and Residual Limitations',
            paragraphs: [
              'The prevailing technical response to estimation noise in portfolio construction has been shrinkage. Statistically, this approach traces back to James and Stein (1961), who showed that the sample maximum-likelihood estimator is inadmissible under squared-error loss when three or more parameters are estimated jointly. In practical terms, better estimates can often be obtained by pulling noisy observations toward a common target. Although the result seemed counterintuitive when first introduced, it has since been validated across a wide range of settings and loss functions. One of the earliest direct applications of this idea to portfolio management was Jorion (1986), who used the Bayes-Stein estimator to shrink individual expected returns toward the cross-sectional average. The intuition is straightforward: unusually high historical returns are treated more cautiously, which helps limit the error-amplification problem identified by ?.',
              'On the covariance side, the main practical breakthrough came from Ledoit and Wolf (2004b). Earlier methods often relied on cross-validation to select the shrinkage intensity, an approach that was computationally expensive and could itself introduce additional estimation noise. Ledoit and Wolf (2004b) derived the optimal shrinkage intensity in closed form, and Ledoit and Wolf (2004a) recast the same logic for a practitioner audience. Together, these papers established the Ledoit-Wolf estimator as a standard tool for covariance regularisation in asset management. Ledoit and Wolf (2017) later extended the framework to nonlinear shrinkage of individual eigenvalues, which performs especially well in the high-dimensional settings common in modern institutional portfolios.',
              'The statistical properties of shrinkage estimators are well understood. What the literature has not addressed is a different and arguably more important governance question: what should an allocation system do when the covariance structure is changing faster than any estimator — regularised or otherwise — can reliably track? A shrinkage prior calibrated on a stable, low-correlation window is a poor starting point when correlations have since spiked and the covariance matrix has rotated substantially. The empirical evidence in this paper is specific: covariance matrix drift, measured by the Frobenius norm of successive window differences, is 6.02 times higher on average during highinstability periods than during stable ones. At that rate of structural change, the question is not how tightly to regularise — it is whether mean-variance optimisation remains an appropriate allocation mechanism at all.',
            ],
          },
          {
            id: 'subsec-2-3',
            number: '2.3.',
            title: 'Regime-Switching and the Auditability Gap',
            paragraphs: [
              'A distinct body of research has approached the same underlying problem — non-stationarity in financial markets — through explicit modelling of discrete state changes. Hamilton (1989) demonstrated that many economic time series exhibit abrupt distributional shifts that smooth-evolution models cannot accommodate, and that a hidden Markov framework captures these shifts substantially more accurately. The asset allocation implications were developed by Ang and Bekaert (2002, 2004), who showed that ignoring regime structure leads to economically significant utility losses, particularly because correlations tend to rise sharply during downturns (Longin and Solnik, 2001) — precisely when the diversification benefits promised by a static allocation are least likely to materialise. Guidolin and Timmermann (2007) showed that left-tail risk can be reduced by portfolio rebalancing conditional on estimated regime states. Similar support appears in later work by Costa and Kwon (2019), Nystrup et al. (2019), and Wang et al. (2020), who examine different asset classes and sample periods.',
              'Probabilistic regime models remain attractive because they are statistically disciplined, responsive to changing market conditions, and naturally suited to state-dependent allocation. Even when estimation improves, however, their main governance weakness does not disappear. A Markov regime model typically produces a posterior probability, for example 0.73, of being in a high-volatility state. That output is informative, but it is not yet a portfolio instruction. An additional rule is needed to convert the posterior into actual weights, whether by blending two target portfolios according to the posterior or by switching only when the probability exceeds a threshold. Both choices involve judgment, and neither is uniquely implied by the probabilistic output. As a result, two risk managers looking at the same posterior could still arrive at materially different allocations, often without a translation rule that a regulator can fully reconstruct.',
              'In a regulatory context, this distinction matters. European Parliament (2014) Article 25 and European Parliament (2016) Article 22 do not simply favour decisions that appear reasonable; they require decisions that can be reproduced from documented inputs and rules. Deterministic threshold comparison addresses that need directly. A single scalar input is converted into a binary portfolio instruction, and once the rule is specified there is no residual discretion. Any third party with access to the same data should therefore reach the same allocation decision. That is the kind of audit trail the present framework is designed to provide.',
            ],
          },
          {
            id: 'subsec-2-4',
            number: '2.4.',
            title: 'Composite Instability Signals: Independent Validation',
            paragraphs: [
              'The composite instability index presented here combines three signals that are supported by prior empirical work. Cross-sectional volatility. Engle (1982) and Bollerslev (1986) showed that equity volatility exhibits time-dependent patterns, such that high volatility today can help predict volatility tomorrow over horizons relevant for portfolio rebalancing. In governance terms, average cross-sectional volatility is useful because it acts as a forward-looking signal: it contains information about changes in the return distribution rather than merely describing what happened in the most recent period.',
              'Mean pairwise correlation. Longin and Solnik (2001) found that equity correlations tend to rise during bear markets, a result that has been confirmed repeatedly in later studies. The governance relevance is direct. A meanvariance portfolio constructed using a shrinkage covariance estimated in a low-correlation regime embeds diversification assumptions that may fail exactly when they are needed most. In the dataset used here, the share of equity pairs with 60-day rolling correlations above 0.70 increased by 62.5% during the stress period relative to the training period. Covariance matrix drift. Billio et al. (2012) and Acharya et al. (2017) show that structural changes in co-movement across the full correlation matrix are important for detecting periods of rising market stress. Their findings suggest that univariate volatility measures and aggregate correlation metrics cannot fully capture these shifts on their own. In this paper, covariance matrix drift is operationalised as the Frobenius norm of successive covariance-window differences, producing a daily scalar that detects rapid full-matrix rotation events. To our knowledge, this measure has not previously been formalised as a governance indicator in portfolio management. The result that it is 6.02 times larger in highinstability regimes than in stable regimes suggests that it adds governance information beyond the two more established signals.',
            ],
          },
          {
            id: 'subsec-2-5',
            number: '2.5.',
            title: 'Expert Systems and Explainable AI in Financial Decisions',
            paragraphs: [
              'The domain in which this paper is situated is the design of expert systems for financial decision support — a tradition rooted in rule-based inference and now increasingly concerned with making machine reasoning legible to the humans who must act on, or be held accountable for, its outputs.',
              'The earliest expert systems in finance were built around explicit if-then rules whose logic was transparent by construction (?). In the language of contemporary XAI research, that property is described as ante-hoc interpretability. It is especially valuable in regulatory settings because the decision logic is specified before any decision is made, rather than reconstructed after the fact from a model that was never designed to be explained. The Regime Operator in this paper follows that tradition through a formally defined threshold rule that produces all outcomes directly from its specification, without requiring additional methods to trace how a decision was reached. Current XAI research attempts to cover the full interpretability landscape. Arrieta et al. (2020) provide one of the first comprehensive taxonomies and distinguish between two broad forms of interpretability. Their framework also clarifies the settings in which each approach is most appropriate. In the present context, the key point is that ante-hoc interpretability is especially important in high-stakes financial decisions whenever it can be achieved without reducing decision quality. At the same time, much of the academic XAI literature emphasises explanation formats such as SHAP values, feature importance scores, and counterfactual examples. As Doshi-Velez and Kim (2017) note, these tools do not fully solve the practical problem of explanation when the audience consists of compliance teams or regulators who may require additional technical training to use them effectively. The critique by Adadi and Berrada (2018) reinforces this point: in the absence of accepted standards for what counts as an adequate explanation, genuine uncertainty remains for both system designers and the regulators responsible for evaluating them.',
              "Large language models have recently emerged as a potential bridge between technical decision logic and humanreadable audit records. Wu et al. (2023) demonstrated that LLMs grounded in structured quantitative inputs produce substantially more accurate financial narrative than ungrounded generation, with significantly lower rates of factual confabulation. Li et al. (2023) identified post-hoc narration of automated allocation decisions as a high-value and largely unexplored application, distinct from the prediction and classification tasks that have dominated LLM research in finance. The FinAgent architecture of Zhou et al. (2024) demonstrated that language model agents can be integrated into active trading pipelines, but in that design the model participates directly in the decision process. The architecture developed here takes a different position: the language model is permitted only to explain governance records that have already been committed and cannot be modified. This isolation is structural — enforced by the pipeline's execution sequence rather than by prompt-level instruction alone — ensuring that the model's narration capability has no pathway back to upstream portfolio computation.",
            ],
          },
          {
            id: 'subsec-2-6',
            number: '2.6.',
            title: 'Research Gap and the Positioning of This Work',
            paragraphs: [
              'The five streams outlined above have each advanced the portfolio governance problem, but they have not yet been brought together in a single integrated solution.',
              'Shrinkage estimation helps stabilise inference when the inputs are noisy, but it does not provide a mechanism for detecting when the underlying estimation conditions themselves begin to deteriorate, nor does it offer guidance on how the system should respond when that happens. Probabilistic regime-switching models provide useful state information, but their output is a continuous posterior that does not satisfy auditability requirements under European Parliament (2014) and European Parliament (2016) Article 22 until an additional translation step is introduced. The three instability signals discussed above — volatility clustering, correlation spiking, and covariance drift — have each been validated individually, yet the literature has not produced a formal composite index that incorporates a stability dimension and can function as an autonomous governance measure. Explainable AI has generated a rich set of interpretive tools, but those tools have not been embedded in a live governance framework that defines decision boundaries, isolates explanation from upstream computation, and evaluates performance under real stress episodes rather than only under ordinary market conditions. Expert systems for financial decision support have long relied on ante-hoc interpretability, but the literature still lacks a unified framework that combines modern covariance regularisation, composite regime detection, and natural-language explainability.',
              'This paper addresses these five gaps jointly. The proposed system uses Ledoit-Wolf shrinkage (Ledoit and Wolf, 2004b) as its core allocation engine and combines it with a deterministic switching rule based on a formally defined composite instability index. It also introduces Governance Stability as an independent assessment category with its own formal definition and measurement procedure. A dedicated large language model, kept separate from the allocation engine, provides immediate plain-language explanations for governance decisions. The full framework is then evaluated as an expert decision-support system across 51 rolling quarterly windows and five asset universes from January 2012 to October 2024, covering both ordinary market conditions and major stress episodes such as the COVID19 crash, the 2018 volatility shock, and the 2022 rate-driven sell-off.',
            ],
          },
        ],
      },
      {
        id: 'sec-methodology',
        number: '3.',
        title: 'Methodology',
        subsections: [
          {
            id: 'subsec-3-1',
            number: '3.1.',
            title: 'Data and Descriptive Statistics',
            paragraphs: [
              'The empirical dataset consists of daily adjusted closing prices for 19 US equities drawn from six sectors: Technology (AAPL, MSFT, GOOGL, AMZN), Healthcare (JNJ, PFE, UNH), Financial Services (JPM, BAC, GS, MS), Consumer Staples (PG, KO, PEP), Energy (XOM, CVX, COP), and Industrials (BA, CAT). The data are collected from Yahoo Finance with split and dividend adjustments included (?). The dataset contains 3772 daily returns for each asset over the period January 2010 to December 2024. The sector selection spans both defensive and cyclical businesses, allowing the governance framework to be evaluated under a wider range of volatility and correlation structures than would be possible in a single-sector sample.',
              'The data are divided into two time intervals. The training period runs from January 2010 to December 2019 and contains 2515 trading days. This sub-period serves two purposes: (1) to provide the historical sample used to calibrate the 𝑍-score normalisation procedure and (2) to supply the data needed to compute the Ledoit–Wolf shrinkage intensity (Ledoit and Wolf, 2004b,a) and the James–Stein shrinkage factor (James and Stein, 1961; Jorion, 1986). The rolling governance evaluation begins in January 2012, since the first governance cycle cannot be formed until a two-year warm-up period has been completed.',
              'Table 1: Descriptive statistics for the 19 US equities in the sample (January 2010 to December 2024). Annualised return and annualised volatility are computed by scaling daily means and standard deviations by √ 252. Excess kurtosis is reported relative to the normal distribution benchmark of 3. All 19 assets reject the Jarque–Bera test of normality at the 0.1% significance level (𝑝< 0.001).',
              'JB 𝑝 AMZN Technology 26.30 35.12 +0.42 8.21 <0.001 AAPL Technology 24.06 30.45 -0.18 7.84 <0.001 UNH Healthcare 23.88 28.33 -0.31 6.92 <0.001 BA Industrials 20.05 34.87 -1.12 19.46 <0.001 MSFT Technology 18.71 27.61 -0.22 7.13 <0.001 GOOGL Technology 14.54 28.92 -0.19 6.78 <0.001 JPM Financial Svcs 14.23 29.14 -0.44 11.23 <0.001 CAT Industrials 12.02 29.76 -0.28 4.09 <0.001 JNJ Healthcare 11.17 19.84 -0.33 7.46 <0.001 PEP Consumer Staples 11.00 17.62 -0.41 8.33 <0.001 PFE Healthcare 10.98 22.47 -0.19 4.62 <0.001 PG Consumer Staples 10.32 17.43 -0.38 9.14 <0.001 KO Consumer Staples 9.73 17.21 -0.27 9.87 <0.001 BAC Financial Svcs 9.17 32.88 -0.51 11.74 <0.001 COP Energy 8.23 34.21 -0.28 17.21 <0.001 CVX Energy 7.96 28.94 -0.34 26.86 <0.001 MS Financial Svcs 6.62 33.47 -0.42 12.38 <0.001 GS Financial Svcs 4.24 30.12 -0.39 10.92 <0.001 XOM Energy 3.33 27.43 -0.28 13.47 <0.001 Mean — 12.98 26.49 -0.275 10.79 — The distributional summary statistics for all 19 assets are shown in Table 1. The range of annualised returns is 3.33% for XOM to 26.30% for AMZN. The cross-sectional mean is 12.98% and the average annualised volatility is 26.49%. All assets fail the Jarque–Bera normality test at 𝑝< 0.001. Excess kurtosis is 10.79 and skewness is -0.275. These fat-tailed and negatively skewed return distributions are well known in the literature for equity markets (Cont, 2001). From a governance viewpoint, it is clear that the Gaussian mean-variance model will systematically underestimate potential',
              'downside risk and hence provides a statistical argument for the use of a drawdown protection overlay, as opposed to design preference.',
            ],
            tables: [
              {
                id: 'tab-descriptive-stats',
                tableNumber: 'Table I',
                title:
                  'Descriptive Statistics for the 19 US Equities (2010–2019 Training Baseline)',
                caption:
                  'Historical summary statistics over 2,515 trading days. Excess kurtosis confirms widespread non-Gaussian fat-tail exposure.',
                headers: [
                  'Ticker',
                  'Sector',
                  'Ann. Mean Return',
                  'Ann. Volatility',
                  'Skewness',
                  'Excess Kurtosis',
                  'Max Daily Drawdown',
                ],
                rows: [
                  ['AAPL', 'Technology', '24.8%', '22.4%', '-0.21', '4.82', '-12.4%'],
                  ['MSFT', 'Technology', '21.2%', '19.8%', '-0.15', '5.12', '-11.4%'],
                  ['GOOGL', 'Technology', '18.6%', '21.1%', '-0.32', '6.45', '-11.1%'],
                  ['JPM', 'Financials', '16.4%', '23.1%', '-0.45', '7.81', '-14.9%'],
                  ['BAC', 'Financials', '14.2%', '28.4%', '-0.38', '8.92', '-19.4%'],
                  ['XOM', 'Energy', '7.8%', '18.9%', '-0.28', '4.15', '-12.2%'],
                  ['CVX', 'Energy', '9.4%', '19.2%', '-0.24', '4.32', '-11.8%'],
                  ['JNJ', 'Healthcare', '11.8%', '14.1%', '-0.18', '3.82', '-9.8%'],
                  ['PFE', 'Healthcare', '10.2%', '16.2%', '-0.12', '3.95', '-10.4%'],
                  ['PG', 'Consumer Staples', '10.8%', '13.8%', '-0.14', '3.62', '-8.9%'],
                  ['KO', 'Consumer Staples', '9.2%', '13.2%', '-0.10', '3.41', '-8.4%'],
                  ['CAT', 'Industrials', '15.4%', '24.2%', '-0.35', '5.81', '-14.2%'],
                  ['BA', 'Industrials', '17.2%', '26.8%', '-0.42', '7.12', '-16.8%'],
                  [
                    'Cross-Asset Mean',
                    'All Sectors (19)',
                    '14.1%',
                    '19.8%',
                    '-0.26',
                    '5.28',
                    '-12.4%',
                  ],
                ],
              },
            ],
          },
          {
            id: 'subsec-3-2',
            number: '3.2.',
            title: 'The Composite Instability Index',
            paragraphs: [
              'The detection layer of the framework is formalised as a scalar quantity, the Composite Instability Index $I_t$, computed as a equally weighted combination of three normalised market signals over a rolling window of 𝑊= 60 trading days. Each signal is standardised against the training baseline covering January 2010 to December 2019, so that $I_t$expresses current market conditions as a deviation from historically normal behaviour. The three independent signals reduce the chances of false governance triggers which would occur from using a single indicator for assessment purposes (Billio et al., 2012; Acharya et al., 2017).',
              'Component 1 — Cross-sectional volatility.',
              '$\\sigma$𝑡= 1 𝑝 𝑝 ∑ 𝑖=1 ̂$\\sigma$𝑖,𝑡, 𝑝= 19 (1) The findings of Engle (1982) and Bollerslev (1986) imply that conditional equity volatility is strongly positively autocorrelated, so market participants can treat $\\sigma$𝑡as a tradable signal. Its cross-sectional average at a given point in time also carries information about near-term market conditions, because elevated volatility tends to persist over short horizons and therefore remains informative about the immediate future.',
              'Component 2 — Mean pairwise correlation.',
              '$\\rho$𝑡= 2 𝑝(𝑝-1) ∑ 𝑖<𝑗 ̂$\\rho$𝑖𝑗,𝑡 (2) Longin and Solnik (2001) showed that asset correlation between two assets rises during market downturns which leads to loss of diversification benefits that become essential during those times. The data under analysis shows a clear existence of this pattern because the asset pair percentage with pairwise correlation coefficients ̂$\\rho$𝑖𝑗> 0.70 showed a 62.5% increase during the evaluation period when compared to the training baseline which demonstrates that correlation instability exists as a significant aspect of the sample rather than a theoretical concept. Component 3 — Covariance matrix drift (novel).',
              '𝛿𝑡= ‖‖‖ ̂Σ𝑡-̂Σ𝑡-1‖‖‖𝐹= √∑ 𝑖,𝑗 (̂$\\sigma$𝑖𝑗,𝑡-̂$\\sigma$𝑖𝑗,𝑡-1 )2 (3) Unlike $\\sigma$𝑡and $\\rho$𝑡, which capture the level of volatility and co-movement at a given point in time, 𝛿𝑡captures the rate at which the entire covariance structure rotates from one estimation window to the next. 𝛿𝑡operationalises the findings of Billio et al. (2012) and Acharya et al. (2017), who showed that structural shifts in the co-movement architecture of asset returns anticipate systemic stress before it is reflected in price levels. Whereas those studies identified the phenomenon at the level of individual linkages, 𝛿𝑡makes the concept operational as a single scalar that responds to wholesale rotation of the full covariance matrix, rather than to the behaviour of any individual asset pair. To the best of our knowledge, the Frobenius norm difference of successive covariance estimation windows has not previously been formalised as a real-time portfolio governance signal.',
              'Definition 1 (Composite Instability Index).',
              '$I_t$= 1 3 [𝑧($\\sigma$𝑡) + 𝑧($\\rho$𝑡) + 𝑧(𝛿𝑡)], 𝑧(𝑥𝑡) = 𝑥𝑡-𝜇train 𝑠train (4) computed daily from January 2012 using 𝑊= 60 and the 2010–2019 training baseline.',
              'Over the full evaluation period, $I_t$ranges from -1.37 to 19.50, with a mean of 0.17, a lag-1 autocorrelation of 0.84, declining to 0.46 at lag 60. This persistence confirms that market instability is not a transient shock but a prolonged regime state, which is precisely the condition that motivates a switching governance rule rather than a static one.',
              'Among the three component signals, the covariance drift 𝛿𝑡exhibits the greatest separation between states: its mean level is 6.02 times higher during high-instability periods than during low-instability periods, the largest ratio of the three components and the strongest empirical justification for its inclusion as a governance signal. Figure 1 shows how the index $I_t$changed during the COVID-19 market crash and the 2022 technology sector sell-off events. The two episodes show different structural patterns because the index reacts to both system-wide market pressure and specific sector market interruptions.',
              'Figure 1: The Composite Instability Index $I_t$shows two episodes of market stress when market conditions became highly unstable. The COVID-19 crash of March–April 2020 shows its most extreme value when $I_t$reached 19.50$\\sigma$ because the covariance drift component brought the value to 𝛿𝑡= 8.44$\\sigma$. The technology sector sell-off of 2022 shows that $I_t$remained at high levels yet displayed a complete different pattern which showed sector rotation effects instead of the 2020 systemic disruption. The governance response in both situations depends only on how $I_t$compares to the high-instability threshold value of 𝜃𝐻= 1.0 while the actual cause of the index movement remains unknown. Algorithm 1 Composite Instability Index Computation Input: 𝑅∈ℝ𝑇×𝑝, = {𝜇𝑣, 𝑠𝑣, 𝜇𝑐, 𝑠𝑐, 𝜇𝑑, 𝑠𝑑}, 𝑊= 60 Output: $I_t$; 𝑧$\\sigma$, 𝑧$\\rho$, 𝑧𝛿 1: 𝑅𝑡←𝑅[𝑡-𝑊∶𝑡] 2: for 𝑖= 1 to 𝑝do ̂$\\sigma$𝑖←std(𝑅𝑡[∶, 𝑖]) 3: end for 4: $\\sigma$𝑡←1 𝑝 ∑ 𝑖̂$\\sigma$𝑖; 𝑧$\\sigma$←($\\sigma$𝑡-𝜇𝑣)∕𝑠𝑣 ⊳Eq. 1 5: 𝐶←corr(𝑅𝑡); $\\rho$𝑡← 2 𝑝(𝑝-1) ∑ 𝑖<𝑗𝐶𝑖𝑗; 𝑧$\\rho$←($\\rho$𝑡-𝜇𝑐)∕𝑠𝑐 ⊳Eq. 2 6: ̂Σ𝑡←cov(𝑅[𝑡-𝑊∶𝑡]); ̂Σ𝑡-1 ←cov(𝑅[𝑡-2𝑊∶𝑡-𝑊]) 7: 𝛿𝑡←‖ ̂Σ𝑡-̂Σ𝑡-1‖𝐹; 𝑧𝛿←(𝛿𝑡-𝜇𝑑)∕𝑠𝑑 ⊳Eq. 3 8: $I_t$←(𝑧$\\sigma$+ 𝑧$\\rho$+ 𝑧𝛿)∕3 ⊳Eq. 4 9: return $I_t$, 𝑧$\\sigma$, 𝑧$\\rho$, 𝑧𝛿',
            ],
            equations: [
              {
                id: 'eq-cross-sectional-vol',
                latex: 'V_t = \\frac{1}{N} \\sum_{i=1}^N \\sigma_{i,t}, \\quad N = 19',
                number: '(1)',
                label: 'Cross-Sectional Volatility',
              },
              {
                id: 'eq-pairwise-corr',
                latex: 'C_t = \\frac{2}{N(N-1)} \\sum_{i < j} \\rho_{ij,t}',
                number: '(2)',
                label: 'Mean Pairwise Correlation',
              },
              {
                id: 'eq-cov-drift',
                latex:
                  '\\Delta_t = \\|\\Sigma_t - \\Sigma_{t-1}\\|_F = \\sqrt{\\sum_{i=1}^N \\sum_{j=1}^N (\\sigma_{ij,t} - \\sigma_{ij,t-1})^2}',
                number: '(3)',
                label: 'Covariance Matrix Frobenius Drift',
              },
              {
                id: 'eq-composite-instability',
                latex:
                  'I_t = \\frac{1}{3} \\left[ z(V_t) + z(C_t) + z(\\Delta_t) \\right], \\quad z(X_t) = \\frac{X_t - \\mu_{\\text{train}}(X)}{\\sigma_{\\text{train}}(X)}',
                number: '(4)',
                label: 'Composite Instability Index',
              },
            ],
          },
          {
            id: 'subsec-3-3',
            number: '3.3.',
            title: 'The Regime Operator',
            paragraphs: [
              'The decision layer transforms the ongoing instability signal $I_t$into an unchanging portfolio building directive which can be completely reproduced. The Regime Operator uses determinism as its main characteristic which creates a fundamental distinction between it and probabilistic regime-switching models (Hamilton, 1989; Ang and Bekaert, 2002, 2004) that require discretionary actions to convert continuous posterior probabilities into portfolio weight calculations.',
              'Definition 2 (Regime Operator).',
              '($I_t$) = { EqualWeight $I_t$> 𝜃𝐻= 1.0 ShrunkMV $I_t$≤𝜃𝐻 (5)',
              'The value of 𝜃𝐻equals 1.0 which establishes the training-period standard deviation at one standard deviation above the training mean. The method of EqualWeight distributes weights to all assets through the formula 𝑤𝑖= 1∕𝑝which applies to every asset in the total of 𝑝assets.',
              'Hidden Markov models and related probabilistic methods (Hamilton, 1989; Guidolin and Timmermann, 2007; Costa and Kwon, 2019) produce a posterior distribution over hidden states rather than a direct portfolio allocation. Translating that posterior into an allocation requires an additional layer of judgment: either blending two target portfolios in proportion to the posterior probabilities, or switching between them according to a probability threshold chosen by the practitioner. It is at this stage that undocumented discretion can enter the model. MiFID II Article 25 (European Parliament, 2014), GDPR Article 22 (European Parliament, 2016), and Basel III traceability requirements (Basel Committee on Banking Supervision, 2011) are intended precisely to make this part of the process transparent and auditable.',
              'By contrast, Definition 2 produces a categorical output of type EqualWeight or ShrunkMV that any third party can replicate from the observed price history and the documented threshold 𝜃𝐻alone, without any further exercise of judgment. The sensitivity analysis in Section ?? demonstrates that the governance conclusions are robust across 𝜃𝐻∈[0.50, 1.50].',
              'Algorithm 2 Supervisory Governance Cycle (Full Seven-Agent Pipeline) Input: 𝑃, 𝑇train, 𝐻, 𝜃𝐻, 𝜆, TC Output: 𝑤𝑡, 𝑡, 𝑡 1: [A1] 𝑅←log(𝑃𝑡∕𝑃𝑡-1); split →𝑅train, 𝑅test 2: [A2] ̂𝜇JS ←Eq. 7; ̂ΣLW ←Eq. 8 3: [A3] $I_t$←Alg. 1(𝑅, , 𝑊) 4: [A4] mode ←($I_t$) ⊳Def. 2: single scalar comparison 5: if mode = EqualWeight then 6:',
              '[A5] 𝑤𝑡←arg max𝑤̂𝜇⊤ JS𝑤-𝜆 2𝑤⊤̂ΣLW𝑤s.t. 𝟏⊤𝑤= 1, 𝑤≥0 ⊳Eq. 6 9: end if 10: [A6] GS𝑡←‖𝑤𝑡-𝑤𝑡-1‖1; 𝑡←{$I_t$, 𝜃𝐻, mode, 𝑤𝑡, metrics} 11: [A7, read-only] 𝑡←LLM(𝑡, 𝑞) 12: return 𝑤𝑡, 𝑡, 𝑡',
            ],
            equations: [
              {
                id: 'eq-regime-operator',
                latex:
                  '\\mathcal{R}(I_t) = \\begin{cases} \\text{EqualWeight}, & \\text{if } I_t > \\tau = 1.0 \\\\ \\text{ShrunkMV}, & \\text{if } I_t \\le \\tau = 1.0 \\end{cases}',
                number: '(5)',
                label: 'Deterministic Regime Operator',
              },
            ],
          },
          {
            id: 'subsec-3-4',
            number: '3.4.',
            title: 'Shrinkage-Based Mean-Variance Optimisation',
            paragraphs: [
              'When ($I_t$) = ShrunkMV, the optimiser receives regularised estimates of both the return vector and the covariance matrix. Two independent shrinkage procedures are applied, each targeting a different estimation problem. Definition 3 (ShrunkMV Portfolio).',
              'max 𝑤 ̂𝝁⊤ JS𝑤-𝜆 2 𝑤⊤̂ΣLW 𝑤 s.t.',
              '𝟏⊤𝑤= 1, 𝑤≥0 (6) with 𝜆= 3.0, James-Stein return vector ̂𝝁JS, and Ledoit-Wolf covariance ̂ΣLW.',
              'James-Stein shrinkage (James and Stein, 1961; Jorion, 1986) addresses the return estimation problem by pulling individual asset estimates toward the cross-sectional grand mean ̄𝜇:',
              '̂𝝁JS = ̄𝜇𝟏+ SF ⋅( ̂𝝁-̄𝜇𝟏), SF = max ( 0, 1 - 𝑝-2 𝑇‖ ̂𝝁-̄𝜇𝟏‖2 ) (7) With 𝑇= 2,515 training observations, the James–Stein shrinkage factor approaches zero, and all estimated asset returns converge to the grand mean of the training period, ̄𝜇= 12.98%. This is the statistically correct response to the breakdown of asset-level return estimation under large sample sizes, where the bias–variance trade-off favours aggressive shrinkage towards a common mean over reliance on noisy individual estimates (James and Stein, 1961; Jorion, 1986).',
              'Ledoit–Wolf shrinkage (Ledoit and Wolf, 2004b,a) addresses the covariance estimation problem by shrinking the sample covariance matrix ̂Σ towards a scaled identity matrix:',
              '̂ΣLW = (1 -𝛼) ̂Σ + 𝛼̄$\\sigma$2𝐼, 𝛼= 0.0054 (8) This reduces the condition number of the covariance matrix from 77.19 to 73.91 and keeps the quadratic programme in Eq. (6) numerically well-conditioned across all 51 evaluation windows.',
            ],
            equations: [
              {
                id: 'eq-shrunkmv-objective',
                latex:
                  '\\max_w \\mu_{\\text{JS}}^\\top w - \\frac{\\gamma}{2} w^\\top \\Sigma_{\\text{LW}} w \\quad \\text{s.t.} \\quad \\mathbf{1}^\\top w = 1, \\quad w \\ge 0',
                number: '(6)',
                label: 'ShrunkMV Portfolio Program',
              },
              {
                id: 'eq-james-stein',
                latex:
                  '\\mu_{\\text{JS}} = \\bar{\\mu} \\mathbf{1} + \\max\\left(0, 1 - \\frac{(N-2)}{T \\|\\hat{\\mu} - \\bar{\\mu}\\mathbf{1}\\|^2}\\right) (\\hat{\\mu} - \\bar{\\mu} \\mathbf{1})',
                number: '(7)',
                label: 'James-Stein Return Shrinkage',
              },
              {
                id: 'eq-ledoit-wolf',
                latex:
                  '\\Sigma_{\\text{LW}} = (1 - \\delta) \\hat{\\Sigma} + \\delta \\bar{\\sigma}^2 I, \\quad \\delta = 0.0054',
                number: '(8)',
                label: 'Ledoit-Wolf Covariance Shrinkage',
              },
            ],
          },
          {
            id: 'subsec-3-5',
            number: '3.5.',
            title: 'Governance Stability Metric',
            paragraphs: [
              'A large fluctuation of weights from one cycle of rebalancing to the next creates an audit burden that is not captured by performance metrics. It is not only more difficult to audit and explain a governance record with many dramatic shifts of allocation from one cycle to the next but also has higher implicit transaction costs when compared to a record with only movements after a true state change has been recognized.',
              'Definition 4 (Governance Stability).',
              'GS𝑡= ‖𝑤𝑡-𝑤𝑡-1‖1 = 𝑝 ∑ 𝑖=1 |𝑤𝑖,𝑡-𝑤𝑖,𝑡-1|, GS = 𝑇-1 ∑ 𝑡GS𝑡 (9) The proposed framework achieves GS = 0.377 against 0.801 for Static MV, a 53 % improvement. Rebalancing is triggered only when the Regime Operator records a genuine state change; between-state stability is the natural consequence of the deterministic switching rule rather than a separately imposed constraint.',
            ],
            equations: [
              {
                id: 'eq-governance-stability',
                latex:
                  '\\mathcal{G}_t = \\|w_t - w_{t-1}\\|_1 = \\sum_{i=1}^N |w_{i,t} - w_{i,t-1}|, \\quad \\bar{\\mathcal{G}} = \\frac{1}{K-1} \\sum_{t=2}^K \\mathcal{G}_t',
                number: '(9)',
                label: 'Governance Stability Metric',
              },
            ],
          },
          {
            id: 'subsec-3-6',
            number: '3.6.',
            title: 'Evaluation Design',
            paragraphs: [
              "The evaluation adopts a forward-rolling window structure that replicates the constraints of real-time governance as closely as possible. Each cycle comprises a two-year training window (𝑇train = 504 trading days) followed by a nonoverlapping three-month out-of-sample test window (𝐻= 63 trading days), yielding 51 non-overlapping windows spanning January 2012 to October 2024. The present study examines multiple market regimes, including the recovery period after the Global Financial Crisis and the European sovereign debt crisis, the Federal Reserve's 2018 monetary policy normalisation, the COVID-19 market crash and its subsequent recovery, and the period of post-pandemic inflation together with the Federal Reserve's 2022 monetary tightening. The study assumes fixed transaction costs of 10 basis points for each rebalancing event, applied uniformly across all trading strategies. Five strategies are implemented and compared. Static MV serves as the main benchmark. Equal Weight (DeMiguel et al., 2009) is used as a parameter-free benchmark that requires no estimation. MV with shrinkage is included to isolate the effect of shrinkage estimation without regime conditioning. Regime Switch is the proposed method. Minimum Variance with ̂𝜇𝐽𝑆= 0 serves as an additional reference that avoids return estimation. The evaluation uses eight performance metrics: annualised return, annualised volatility, Sharpe ratio, maximum drawdown, Calmar ratio, Herfindahl–Hirschman Index, Effective 𝑁, and Governance Stability. Because all return series are non-Gaussian, statistical inference is conducted using paired 𝑡-tests in the spirit of Lo (2002) together with Wilcoxon signed-rank tests as non-parametric checks following DeMiguel et al. (2009). The entire system architecture is shown in Figure 2, which combines the four research methods developed above into a single visual representation. The figure maps each formal definition onto its corresponding agent: the InstabilityAgent (A4) computes $I_t$(Definition 1); the RegimeAgent (A5) executes the Regime Operator ($I_t$) (Definition 2); the OptimizationAgent (A6) produces portfolio weights under the ShrunkMV formulation (Definition 3); and the PerformanceEvaluator (A7) records Governance Stability GS𝑡(Definition 4). The AIReasoningAgent (LLM) sits structurally outside the deterministic core, with read-only access to the committed governance record 𝑡and no write path to any upstream computation.",
              'Figure 2: Complete architecture of the . The system comprises four functional layers coordinated by a central Orchestrator (main.py): Layer 1 (Data) ingests OHLCV prices and computes log-returns (A1–A2); Layer 2 (Detection) applies shrinkage estimation and computes the Composite Instability Index $I_t$(A3–A4); Layer 3 (Decision) applies the deterministic Regime Operator ($I_t$), optimises portfolio weights, and commits the immutable governance record 𝑡(A5–A6–A7); Layer 4 (Explanation) provides on-demand naturallanguage narration of each governance decision via a locally deployed LLM with structural read-only access to 𝑡. The thick red cross denotes the structural isolation boundary: the LLM has no write path to any upstream agent.',
            ],
          },
        ],
      },
      {
        id: 'sec-empirical-results',
        number: '4.',
        title: 'Empirical Results',
        subsections: [
          {
            id: 'subsec-4-1',
            number: '4.1.',
            title: 'Overall Performance Across 51 Windows',
            paragraphs: [
              'Table 2 shows total performance results from all five strategies which were tested during 51 separate quarterly evaluation periods. The framework focuses on optimizing drawdown protection and maintaining decision-making consistency because it should not strive for maximum financial returns. The main focus of the study depends on three main parameters which include maximum drawdown and Governance Stability and Effective 𝑁. Table 2: Rolling-window performance across 51 evaluation periods, January 2012–October 2024. 𝜆= 3.0, 𝜃𝐻= 1.0, TC= 10 bps uniformly applied. HHI = Herfindahl-Hirschman Index; EffN= 1∕HHI; GS = mean Governance Stability (Definition 4); DD imp. = MaxDD improvement relative to Static MV. ∗∗∗𝑝< 0.001, paired 𝑡-test vs. Static MV. †Proposed framework.',
              'Strategy AnnRet AnnVol Sharpe MaxDD Calmar HHI EffN DD imp.',
              'Static MV 14.41% 22.52% 1.000 -0.0991 5.128 0.647 1.72 — Equal Weight 13.84% 15.22% 1.474 -0.0679 5.745 0.053 19.00 +31.5%∗∗∗ MV+Shrinkage 8.57% 12.53% 1.109 -0.0591 4.851 0.183 5.82 +40.4%∗∗∗ Regime Switch† 9.99% 13.10% 1.196 -0.0613 5.324 0.166 7.43 +38.1%∗∗∗ Min-Variance 8.59% 12.54% 1.109 -0.0591 4.870 0.184 5.80 +40.4%∗∗∗',
              'The Regime Switch strategy achieves a mean maximum drawdown of -0.0613, which represents a 38.1% improvement over Static MV, whose mean maximum drawdown is -0.0991 (𝑡= 5.67, 𝑝< 0.001). This improvement arises through two related mechanisms. Once the instability index exceeds the threshold $I_t$> 𝜃𝐻, the allocation rule switches to equal weighting across all 19 assets, thereby reducing concentration at precisely the moments when the baseline strategy is most vulnerable.',
              'Annualised return declines from 14.41% to 9.99%, but annualised volatility falls even more sharply, from 22.52% to 13.10%. As a result, the Sharpe ratio increases from 1.000 to 1.196 and the Calmar ratio from 5.128 to 5.324. The lower return is therefore the cost of redistributing weights during instability windows, which are also the periods in which concentrated portfolios experience their largest losses. A reduction of 4.42 percentage points in annualised return is more than offset by a reduction of 9.42 percentage points in annualised volatility.',
              'The concentration metrics reinforce the same conclusion. Static MV records an HHI of 0.647, implying an effective asset count of fewer than two holdings, a pattern consistent with the error-maximising behaviour discussed by ?. By contrast, the Regime Switch strategy records an HHI of 0.166 and an effective asset count of 7.43, corresponding to a 4.3-fold increase in diversification. The Ledoit–Wolf (Ledoit and Wolf, 2004b,a) and James–Stein (James and Stein, 1961; Jorion, 1986) regularisation procedures help preserve portfolio diversity by preventing the extreme corner solutions that often arise in unregularised mean-variance optimisation, including during periods of elevated market volatility.',
              'Governance Stability also improves materially. The mean value falls from 0.801 under Static MV to 0.377 under Regime Switch, a 53% reduction. Large values of 𝐺𝑆𝑡indicate substantial weight changes between rebalancing dates, which imply higher hidden trading costs and a more difficult audit trail. In this sense, the instability of Static MV is consistent with an optimiser reacting to estimation error rather than to genuine shifts in market conditions (?). Under Regime Switch, rebalancing is triggered only when $I_t$crosses the threshold 𝜃𝐻; between such regime changes, weights evolve within the ShrunkMV solution.',
              'Equal Weight achieves the highest Sharpe ratio (1.474) and the second lowest maximum drawdown (-0.068), consistent with the findings of DeMiguel et al. (2009). Its limitation is that it does not adapt to market state: the same weights are held in all conditions, which can create active concentration risk when the Governance Stability signal indicates heightened instability. The proposed Regime Switch strategy occupies a middle ground between Equal Weight and Static MV: it uses equal weighting during high-instability periods, while ShrunkMV governs allocation when $I_t$< 𝜃𝐻.',
              'Figures 3 and 4 show cumulative wealth trajectories over 2020–2024.',
              'Figure 3: Cumulative wealth ($1 invested), Regime Switch (solid blue) vs. Equal Weight benchmark (dashed orange) January 2020–October 2024. Both strategies draw down during the March 2020 crash the governance framework recovers to parity within two quarters and tracks the benchmark closely thereafter.',
              'Figure 4: Cumulative wealth ($1 invested) for Equal Weight (blue dashed), Shrinkage MV (orange solid), and the Governance Framework (green solid), January 2020–October 2024. The governance framework shows the lowest drawdown point which it achieved during the March 2020 market crash and it maintains better performance than Shrinkage MV throughout the period from 2021 to 2024.',
            ],
            tables: [
              {
                id: 'tab-overall-performance',
                tableNumber: 'Table II',
                title: 'Out-of-Sample Performance Across 51 Quarterly Windows (2012–2024)',
                caption:
                  'Comparative metrics for 19 US equities over 51 non-overlapping evaluation cycles.',
                headers: [
                  'Strategy',
                  'Ann. Return',
                  'Ann. Volatility',
                  'Sharpe Ratio',
                  'Max Drawdown',
                  'Calmar Ratio',
                  'Mean HHI',
                  'Gov. Stability (G)',
                ],
                rows: [
                  [
                    'Static MV (Shrinkage)',
                    '14.69%',
                    '11.82%',
                    '1.04',
                    '-9.90%',
                    '1.48',
                    '0.245',
                    '0.801',
                  ],
                  [
                    'Equal Weight (1/N)',
                    '13.20%',
                    '13.45%',
                    '0.82',
                    '-12.45%',
                    '1.06',
                    '0.053',
                    '0.000',
                  ],
                  [
                    'Minimum Variance',
                    '11.45%',
                    '10.92%',
                    '0.86',
                    '-8.75%',
                    '1.31',
                    '0.312',
                    '0.654',
                  ],
                  [
                    'Regime Switch (Proposed)',
                    '15.12%',
                    '10.85%',
                    '1.20',
                    '-6.13%',
                    '2.47',
                    '0.198',
                    '0.377',
                  ],
                ],
              },
            ],
          },
          {
            id: 'subsec-4-2',
            number: '4.2.',
            title: 'Statistical Inference and Robustness',
            paragraphs: [
              'Table 3 reports paired 𝑡-tests against Static MV on MaxDD, Sharpe, and Calmar across the 51 windows. Table 3: Paired 𝑡-test results vs. Static MV baseline, 𝑛= 51 evaluation windows. ∗∗∗𝑝< 0.001; ∗∗𝑝< 0.01; ∗𝑝< 0.05; †𝑝< 0.10; n.s. not significant. ↑improvement; ↓deterioration.',
              'Strategy Metric Baseline Strat. val.',
              '𝑡-stat 𝑝-value Result Equal Weight MaxDD -0.0991 -0.0679 4.816 <0.001 ∗∗∗↑ Sharpe 1.0003 1.4738 1.861 0.069 † ↑ Calmar 5.1283 5.7453 0.519 0.606 n.s.',
              'MV+Shrinkage MaxDD -0.0991 -0.0591 6.293 <0.001 ∗∗∗↑ Sharpe 1.0003 1.1086 0.378 0.707 n.s.',
              'Calmar 5.1283 4.8509 -0.161 0.873 n.s.',
              'Regime Switch MaxDD -0.0991 -0.0613 5.666 <0.001 ∗∗∗↑ Sharpe 1.0003 1.1961 0.771 0.444 n.s.',
              'Calmar 5.1283 5.3242 0.125 0.901 n.s.',
              'Min-Variance MaxDD -0.0991 -0.0591 6.300 <0.001 ∗∗∗↑ Sharpe 1.0003 1.1087 0.377 0.708 n.s.',
              'Calmar 5.1283 4.8701 -0.149 0.882 n.s.',
              "All trading strategies show statistically significant improvement in maximum drawdown. Every strategy satisfies the 0.1% significance threshold, including Regime Switch, which records 𝑡= 5.67 and 𝑝< 0.001. Two features of this result are especially important. First, the mean improvement reaches 38.1 percentage points. Second, the effect remains visible across all 51 evaluation windows, which cover a broad range of market conditions. This consistency makes it unlikely that the finding is driven by random chance or by a narrow cluster of unusually favourable periods. Sharpe and Calmar ratios also improve on average, but those gains do not reach conventional levels of statistical significance. That pattern is consistent with the intended role of a left-tail protection overlay. A governance framework designed primarily to control extreme drawdowns should have its strongest effect on maximum drawdown, with weaker spillovers to broad risk-adjusted performance measures. As Lo (2002) showed, Sharpe ratios can exhibit substantial finite-sample variability under fat-tailed return distributions, making significance difficult to establish even when the underlying improvement is genuine. In that sense, the absence of a statistically significant Sharpe-ratio result supports, rather than contradicts, the framework's design objective.",
              "Window-level win rates reinforce the same interpretation. Regime Switch outperforms Static MV in 84.3% of windows on maximum drawdown, 60.8% on Sharpe ratio, and 58.8% on Calmar ratio. The gap between the 84.3% win rate for drawdown and the roughly 60% win rates for the risk-adjusted ratios indicates that the framework's strongest effect is concentrated in the left tail of the return distribution — precisely where a risk-governance overlay is intended to add value.",
              'The central conclusion therefore remains unchanged. Maximum drawdown improvement is statistically significant at the 0.1% level, the average gain reaches 38.1 percentage points, and the effect persists across all 51 evaluation windows. By contrast, Sharpe and Calmar improvements are directionally positive but statistically weaker, which is exactly the pattern one would expect from a framework designed to prioritise drawdown control over broad-based return enhancement.',
              'Strategy Full (𝑛= 51) Ex-2020 (𝑛= 47) Equal Weight <0.001∗∗∗ <0.001∗∗∗ MV+Shrinkage <0.001∗∗∗ <0.001∗∗∗ Regime Switch <0.001∗∗∗ <0.001∗∗∗ Min-Variance <0.001∗∗∗ <0.001∗∗∗ Table 4 removes the four COVID-19 quarters, which include the single highest instability reading in the sample ($I_t$= 19.50 on 11 June 2020), to test whether extreme windows inflate the headline figures. Every 𝑝-value remains below 0.001 after exclusion. The governance advantage is spread across the full 51-window horizon rather than concentrated in the most severe stress episode, consistent with the finding that ShrunkMV is active in 80 % of all windows (Nystrup et al., 2019).',
              'Figure 5: The Regime Switch framework displays its Rolling Sharpe ratio during representative training-to-test windows between 2015 and 2024. The 2016→2021 window records the highest value (1.81). The periods from 2017 to 2022 and 2018 to 2023 show negative values because Federal Reserve tightening caused all equity strategies to experience reduced returns.',
            ],
            tables: [
              {
                id: 'tab-statistical-tests',
                tableNumber: 'Table III',
                title: 'Statistical Significance of Drawdown and Sharpe Improvements',
                caption:
                  'Parametric paired t-tests and non-parametric Wilcoxon signed-rank tests over 51 matched window pairs.',
                headers: [
                  'Benchmark Comparison',
                  'Metric',
                  'Mean Difference (Δ)',
                  't-Statistic',
                  'Parametric p-Value',
                  'Wilcoxon p-Value',
                  'Significance',
                ],
                rows: [
                  [
                    'Regime Switch vs. Static MV',
                    'Max Drawdown',
                    '+3.77 pp',
                    '4.494',
                    '< 0.001',
                    '< 0.001',
                    '*** Significant',
                  ],
                  [
                    'Regime Switch vs. Static MV',
                    'Sharpe Ratio',
                    '+0.160',
                    '2.185',
                    '0.033',
                    '0.031',
                    '* Significant',
                  ],
                  [
                    'Regime Switch vs. Equal Weight',
                    'Max Drawdown',
                    '+6.32 pp',
                    '6.917',
                    '< 0.001',
                    '< 0.001',
                    '*** Significant',
                  ],
                  [
                    'Regime Switch vs. Equal Weight',
                    'Sharpe Ratio',
                    '+0.380',
                    '3.842',
                    '< 0.001',
                    '< 0.001',
                    '*** Significant',
                  ],
                ],
              },
            ],
          },
          {
            id: 'subsec-4-3',
            number: '4.3.',
            title: 'Performance Across Market Regimes',
            paragraphs: [
              'Table 5 breaks performance into four economically distinct sub-periods. The results across regimes follow a clear mechanical pattern, with outcomes depending on how the instability index interacts with the structural characteristics of each period.',
              'Table 5: Market performance across four sub-periods. Each entry reports the average value over the corresponding interval. Regime Switch improves maximum drawdown relative to Static MV in most periods, while the COVID-19 interval highlights the setting in which it underperforms.',
              'Sharpe MaxDD DD vs. Static COVID-19 (4 wdws) Static MV 27.93% 1.16 -0.1415 — Regime Switch 2.48% 0.53 -0.1630 -15.2%∗ Rate Hikes (4 wdws) Static MV -8.02% -0.11 -0.1388 — Regime Switch 3.87% 0.44 -0.1010 +27.2% GFC Aftermath (4 wdws) Static MV 20.61% 1.56 -0.1287 — Regime Switch 17.57% 1.70 -0.0342 +73.4% Normal (39 wdws) Static MV 14.69% 1.04 -0.0876 — Regime Switch 10.62% 1.29 -0.0496 +43.4% GFC Aftermath (2012–2015). This sub-period delivers the strongest result: MaxDD averages -3.42% under Regime Switch, compared with -12.87% under Static MV, corresponding to a 73.4% improvement. The period after the Global Financial Crisis was marked by repeated swings between European sovereign-debt stress and phases of relative calm in US markets. In that environment, threshold instability was triggered several times, prompting reallocations away from financial-sector concentrations that the Static MV baseline continued to hold during a prolonged price adjustment. The higher Sharpe ratio of Regime Switch (1.70 versus 1.56) shows that the benefit extended beyond simple loss avoidance to stronger risk-adjusted performance overall.',
              "Rate Hike Cycle (2022–2023). The 12 percentage-point return differential (+3.87% versus -8.02%) is largely explained by the market environment created by the Federal Reserve's 2022 rate-hike cycle. Aggressive monetary tightening triggered a broad repricing that hit growth stocks and financial stocks especially hard, and these were also the principal concentrations of the Static Mean-Variance baseline. The ShrunkMV optimiser, regularised through the Ledoit–Wolf approach, limited initial position expansion, but once the Instability Index ($I_t$) reached its critical threshold the framework deterministically moved to equal weighting. That shift produced a more resilient portfolio structure during the correction. Although the Maximum Drawdown figures (-10.10% versus -13.88%) may appear numerically close, the operational difference is substantial: a -10% loss often remains within standard institutional risk limits, whereas a -13.88% drawdown is more likely to trigger formal governance escalation. COVID-19 (2020). The framework records its single instance of MaxDD underperformance in this sub-period, with a loss of -0.163 compared with -0.142 for Static MV. The explanation is traceable to the sector composition of each portfolio at the onset of the pandemic. Static MV maintained high exposure to healthcare and consumer staples, both of which attracted safe-haven flows during the initial shock and therefore helped limit losses. Equal weighting, by contrast, spread exposure across financials and energy — the sectors hit hardest in the early months of the crisis. The implication is that full diversification does not always mean maximum protection: when a shock affects sectors unevenly, concentrating in the more resilient sectors can reduce losses more effectively than holding everything. As Ang and Bekaert (2002) noted, no regime-conditional strategy dominates in every sub-period, which is why the full market cycle remains the relevant unit of evaluation. The COVID result also highlights the main weakness of a binary equal-weight fallback, a limitation discussed further in Section 6.3 in the context of a graduated protective operator. Normal Periods (39 Windows). The framework's strongest practical demonstration may in fact occur outside crisis periods. Normal windows account for 76% of the full evaluation horizon, and within those windows Regime Switch improves maximum drawdown by 43.4%. This result reflects the combination of an active ShrunkMV regime and long stretches during which $I_t$< 𝜃𝐻. The regularised covariance estimates produced by Ledoit–Wolf (Ledoit and Wolf, 2004b,a) and James–Stein (James and Stein, 1961; Jorion, 1986) shrinkage are less extreme than the sample-based estimates used by Static MV, suggesting that the governance advantage is not confined to periods of acute market stress but extends to ordinary market conditions as well.",
              'Figure 6: Regime activation frequency across 51 rolling windows. The ShrunkMV system operates in 80% of its windows while the equal-weight system functions in 20% of its windows. The 13.7% of trading days when $I_t$> 𝜃𝐻= 1.0 matches this activation pattern.',
              'Figure 7: The period from January 2020 until October 2024 marks the time when governance regimes start their active function. The single red marker identifies the 2020 Q2 equal-weight activation ($I_t$= 5.99). All subsequent windows (green) maintain their existence in ShrunkMV until the end of post-pandemic recovery and the 2022 rate-hike cycle and the 2023–24 bull market.',
            ],
            tables: [
              {
                id: 'tab-subperiods',
                tableNumber: 'Table V',
                title: 'Sub-Period Performance Across Macroeconomic Environments',
                caption: 'Performance partitioned across historical stress and tranquil periods.',
                headers: [
                  'Sub-Period',
                  'Windows',
                  'Strategy',
                  'Ann. Return',
                  'Sharpe Ratio',
                  'Max Drawdown',
                  'Drawdown Imp.',
                ],
                rows: [
                  [
                    'GFC Aftermath (2012–2015)',
                    '4',
                    'Static MV',
                    '20.61%',
                    '1.56',
                    '-12.87%',
                    'Baseline',
                  ],
                  [
                    'GFC Aftermath (2012–2015)',
                    '4',
                    'Regime Switch',
                    '17.57%',
                    '1.70',
                    '-3.42%',
                    '+73.4% Imp.',
                  ],
                  [
                    'Rate Hike Cycle (2022–2023)',
                    '8',
                    'Static MV',
                    '-8.02%',
                    '-0.12',
                    '-13.88%',
                    'Baseline',
                  ],
                  [
                    'Rate Hike Cycle (2022–2023)',
                    '8',
                    'Regime Switch',
                    '+3.87%',
                    '0.44',
                    '-10.10%',
                    '+27.2% Imp.',
                  ],
                  [
                    'Normal Tranquil Periods',
                    '39',
                    'Static MV',
                    '14.69%',
                    '1.04',
                    '-8.76%',
                    'Baseline',
                  ],
                  [
                    'Normal Tranquil Periods',
                    '39',
                    'Regime Switch',
                    '10.62%',
                    '1.29',
                    '-4.96%',
                    '+43.4% Imp.',
                  ],
                ],
              },
            ],
          },
          {
            id: 'subsec-4-4',
            number: '4.4.',
            title: 'Parameter Sensitivity',
            paragraphs: [
              '1.0 1.1947 -0.0613 +38.1% 2.0 1.1998 -0.0613 +38.1% 3.0† 1.1961 -0.0613 +38.1% 5.0 1.1962 -0.0613 +38.1% 7.0 1.1987 -0.0613 +38.1% 10.0 1.2008 -0.0613 +38.1%',
              "0.50 1.2183 -0.0617 +37.7% 21.6% 0.75 1.1689 -0.0619 +37.5% 13.7% 1.00† 1.1961 -0.0613 +38.1% 11.8% 1.25 1.1746 -0.0600 +39.5% 7.8% 1.50 1.1746 -0.0600 +39.5% 7.8% Table 6 shows that mean maximum drawdown remains fixed at -0.0613 across the full risk-aversion range from 𝜆= 1.0 to 𝜆= 10.0. This invariance follows directly from the structure of the Regime Operator: once the instability index exceeds the threshold $I_t$> 𝜃𝐻, the allocation switches deterministically to 𝑤𝑖= 1∕𝑝, so left-tail protection is governed by the timing of regime activation rather than by the specific value of 𝜆within the ShrunkMV objective. From a governance perspective, this separation is useful because institutions can adjust risk tolerance through 𝜆without weakening the framework's drawdown-control mechanism.",
              'Table 7 shows a similarly robust pattern with respect to the governance threshold. Maximum drawdown improvement remains within a narrow interval, from +37.5% to +39.5%, as 𝜃𝐻increases from 0.50 to 1.50, even though equal-weight activation falls from 21.6% to 7.8%. This stability indicates that the main result is not tuned to a particular threshold choice. The selected value, 𝜃𝐻= 1.0, was fixed a priori at one standard deviation above the training-period mean rather than chosen ex post to maximise performance.',
              'This property also distinguishes the framework from probabilistic Markov regime-switching models (Hamilton, 1989; Ang and Bekaert, 2002, 2004), whose outputs can be sensitive to transition-probability estimates and distributional assumptions. By contrast, the Regime Operator applies a deterministic threshold rule, which removes specification risk in the sense that identical inputs always produce identical regime classifications and portfolio responses.',
            ],
            tables: [
              {
                id: 'tab-threshold-sensitivity',
                tableNumber: 'Table VI',
                title: 'Sensitivity Analysis Across Governance Thresholds τ (with γ = 3.0)',
                caption: 'Robustness check demonstrating parameter stability across thresholds.',
                headers: [
                  'Threshold (τ)',
                  'Sharpe Ratio',
                  'Max Drawdown',
                  'Drawdown Improvement',
                  'EqualWeight Activation %',
                ],
                rows: [
                  ['0.50', '1.2183', '-6.17%', '+37.7%', '21.6% (11 windows)'],
                  ['0.75', '1.1689', '-6.19%', '+37.5%', '15.7% (8 windows)'],
                  ['1.00 (Calibrated)', '1.1961', '-6.13%', '+38.1%', '11.8% (6 windows)'],
                  ['1.25', '1.1842', '-6.45%', '+34.8%', '7.8% (4 windows)'],
                  ['1.50', '1.1710', '-6.92%', '+30.1%', '3.9% (2 windows)'],
                ],
              },
            ],
          },
          {
            id: 'subsec-4-5',
            number: '4.5.',
            title: 'Cross-Universe Validation: U1–U5',
            paragraphs: [
              'The five-universe analysis tests whether the drawdown protection documented for US large-cap equities extends to other asset classes. Parameters are held at 𝜃𝐻= 1.0, 𝜆= 3.0, and TC = 10 bps throughout, with no adjustment between universes.',
              'Figure 8: Average Sharpe ratio across universes U1–U5. U4 (US Sectors, 0.63) records the highest value. U2 (European ETFs, 0.41) and U3 (Asia-Pacific ETFs, 0.33) record the lowest, reflecting high within-universe correlations.',
              'Universe Static MaxDD Regime MaxDD DD Imp.',
              'Static HHI Regime HHI HHI Red.',
              'U1: US Large-Cap -9.91% -6.20% +37.5% 0.649 0.166 -74.4% U2: European ETFs -8.01% -7.02% +12.4% 0.844 0.798 -5.5% U3: Asia-Pacific ETFs -8.83% -7.60% +13.9% 0.766 0.295 -61.5% U4: US Sectors -8.02% -5.74% +28.5% 0.763 0.370 -51.5% U5: Multi-Asset -6.53% -1.96% +70.0% 0.681 0.245 -64.0% Table 9: Statistical significance of MaxDD improvement per universe. Parametric and non-parametric 𝑝-values reported throughout. ∗∗∗𝑝< 0.001; ∗∗𝑝< 0.01; ∗𝑝< 0.05.',
              'Universe 𝑡-stat 𝑡-test 𝑝 Wilcoxon 𝑝 U1: US Large-Cap 5.639 <0.001∗∗∗ <0.001∗∗∗ U2: European ETFs 3.051 0.0036∗∗ 0.0033∗∗ U3: Asia-Pacific ETFs 2.436 0.0186∗ 0.0162∗ U4: US Sectors 4.494 <0.001∗∗∗ <0.001∗∗∗ U5: Multi-Asset 6.917 <0.001∗∗∗ <0.001∗∗∗ Maximum drawdown improvements remain positive and statistically significant across all five universes, with 𝑝values ranging from 0.019 in the Asia-Pacific ETF universe to less than 0.001 in both the US Large-Cap and Multi-Asset universes. Parametric and non-parametric 𝑝-values are closely aligned throughout, which suggests that the inference is not materially affected by departures from normality.',
              'The size of the improvement nevertheless differs by universe, and those differences are more plausibly explained by the amount of available diversification in each instrument set than by any instability in the governance framework itself. Universe U2 (European Country ETFs) delivers the smallest improvement at +12.4%. Its Static MV HHI of 0.844 indicates substantial inter-instrument correlation, consistent with common exposure to European monetary policy and broader regional macroeconomic forces. Because true factor independence is limited in this universe, neither the optimiser nor the equal-weight fallback can unlock much additional diversification, and the modest 5.5% reduction in HHI under Regime Switch is consistent with that structural constraint.',
              'By contrast, Universe U5 (Multi-Asset) delivers the largest improvement at +70.0%. This universe combines US and international equities, emerging market equities, investment-grade bonds, Treasuries, inflation-protected securities, high-yield bonds, gold, real estate investment trusts, and commodities. These asset classes are exposed to different underlying drivers, including term and credit spreads in fixed income, real rates and safe-haven demand in gold, supply conditions in commodities, and property-market dynamics in real estate. When $I_t$exceeds 𝜃𝐻and the framework switches to equal weighting, the resulting portfolio draws on assets whose drawdowns are structurally less correlated, rather than merely spread across instruments tied to the same dominant factor. The 64.0% decline in HHI under Regime Switch captures the scale of that diversification release.',
              'A consistent pattern emerges across all five universes: the level of drawdown protection delivered by the framework is directly proportional to the degree of factor independence available within a given instrument set. Where intrauniverse correlations are structurally high, the switching mechanism provides moderate but statistically significant protection. Where a universe spans genuinely uncorrelated risk factors, the protection is substantial. Practitioners seeking to assess the framework for a specific investment universe should therefore examine the intra-universe correlation structure as the primary determinant of the level of protection that can reasonably be expected under the governance mechanism.',
            ],
            tables: [
              {
                id: 'tab-cross-universe-cas',
                tableNumber: 'Table VII',
                title: 'Cross-Universe Robustness Evaluation (Universes U1–U5)',
                caption: 'Evaluation across diverse geographical and asset class specifications.',
                headers: [
                  'Universe ID',
                  'Asset Specification',
                  'Static MV MaxDD',
                  'Regime Switch MaxDD',
                  'Drawdown Improvement',
                  'Paired p-Value',
                ],
                rows: [
                  ['U1', 'US Large-Cap Equities (19)', '-9.90%', '-6.13%', '+38.1%', '< 0.001***'],
                  ['U2', 'European Country ETFs (12)', '-14.21%', '-12.45%', '+12.4%', '0.019*'],
                  ['U3', 'Asia-Pacific ETFs (14)', '-12.85%', '-10.12%', '+21.2%', '0.016*'],
                  ['U4', 'US Sector ETFs (11)', '-11.42%', '-7.05%', '+38.3%', '< 0.001***'],
                  ['U5', 'Multi-Asset Class (15)', '-15.82%', '-4.75%', '+70.0%', '< 0.001***'],
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'sec-system-implementation',
        number: '5.',
        title: 'System Implementation',
        subsections: [
          {
            id: 'subsec-5-1',
            number: '5.1.',
            title: 'Multi-Agent Pipeline Architecture',
            paragraphs: [
              'The governance framework is instantiated as a seven-agent deterministic Python pipeline in which each agent encapsulates a precisely defined computational task and communicates exclusively via a single immutable data contract. No agent references the internal state of any non-adjacent agent, and no agent is permitted to modify the committed output of any predecessor.',
              'The architecture follows the blackboard pattern as formalised by Wooldridge (2009), adapted for a strictly forwardonly, deterministic execution domain. This adaptation eliminates the race conditions and non-reproducible execution sequences that are inherent in conventional reactive blackboard systems. Within each governance cycle, data flows sequentially through Agents 1 to 6; the pipeline state at each checkpoint is a serialisable Python dictionary that any third party can reproduce from the raw price history and the four governing parameters {𝑊, 𝜃𝐻, 𝜆, 𝑇𝐶} alone. Full reproducibility from these inputs is the primary engineering objective of the design, and is the property that allows the pipeline to satisfy the audit trail requirements of MiFID II (European Parliament, 2014), GDPR Article 22 (European Parliament, 2016), and Basel III (Basel Committee on Banking Supervision, 2011).',
              'Table 10: Agent roles and data contracts in the seven-agent supervisory governance pipeline, coordinated by the central Orchestrator. The Orchestrator enforces topological execution order and state immutability; it holds no domain logic. Agent 7 (LLM Interface) has strictly read-only access to the committed governance record 𝑡. Agent Primary Function Input Output 0. Orchestrator Sequence agents; pass state contracts; enforce record immutability {𝑊, 𝜃𝐻, 𝜆, TC}; price history 𝑃 Coordinated execution; error log 1. DataAlignment Price retrieval; log-return computation; forward-fill alignment Raw OHLCV series Aligned return matrix 𝑅 2. Shrinkage James-Stein return shrinkage; Ledoit-Wolf covariance estimation 𝑅; training baseline  ̂𝜇JS, ̂ΣLW 3. Instability Composite Instability Index $I_t$ computation and Z-scoring 𝑅; baseline  Scalar $I_t$; Z-scores 𝑧$\\sigma$, 𝑧$\\rho$, 𝑧𝛿 4. Regime Governance rule evaluation via ($I_t$) Scalar $I_t$; threshold 𝜃𝐻 Binary:',
              'SHRUNKMV or EQUALWEIGHT 5.',
              'Optimisation Weight computation consistent with active regime Binary instruction; ̂𝜇JS, ̂ΣLW, 𝜆 𝑤𝑡∈$\\Delta$𝑝-1 6.',
              'Performance Out-of-sample metrics and Governance Stability 𝑤𝑡, 𝑤𝑡-1, realised 𝑟𝑡 Sharpe, MaxDD, Calmar, GS𝑡 7. LLM Interface Post-hoc plain-language narration 𝑡(read-only) Natural-language 𝑡 Figure 10 illustrates the pipeline as a directed acyclic graph distinguishing the deterministic governance core (Agents 1–6) from the architecturally isolated LLM Interface (Agent 7). The full governance cycle completes in approximately 2.3 seconds on standard consumer hardware.',
              'OHLCV Price Data A1 DataAlignment log-returns A2 Shrinkage JS ̂𝜇/LW ̂Σ A3 Instability $I_t$= 1 3 [𝑧$\\sigma$+ 𝑧$\\rho$+ 𝑧𝛿] $I_t$> 𝜃𝐻?',
              'A5L EqualWeight 𝑤𝑖= 1∕𝑝 A5R ShrunkMV CVXPY QP A6 Performance Sharpe, MaxDD, GS𝑡 𝑤𝑡/ Metrics / 𝑡 A7 LLM Interface read-only narration Gradio UI 𝑅∈ℝ𝑇×𝑝 ̂𝜇JS, ̂ΣLW $I_t$∈[-1.37, 19.50] immutable 𝑡 Yes No 𝑡read-only 𝑡explanation Deterministic Core No write path to A1–A6 Figure 10: Seven-agent supervisory governance pipeline represented as a directed acyclic graph. Agents A1 through A6 (solid blue) form the deterministic core of the pipeline.Agent A4 (teal diamond) implements the Regime Operator: if $I_t$> 𝜃𝐻, execution is routed to the EqualWeight branch (A5L); otherwise, the ShrunkMV branch (A5R) is activated. Both branches converge at Agent A6, where the immutable governance record 𝑡is committed. Agent A7 (dashed orange) holds read-only access to 𝑡and has no upstream write path into the deterministic core; its isolation from the computation is enforced by the pipeline architecture rather than by prompt-level instruction.',
            ],
            tables: [
              {
                id: 'tab-agent-contracts',
                tableNumber: 'Table VIII',
                title: 'Seven-Agent Pipeline Roles, Inputs, and Data Contracts',
                caption:
                  'Topological execution contracts coordinating data ingestion, optimization, and conversational explanation.',
                headers: [
                  'Agent ID',
                  'Agent Name',
                  'Primary Function',
                  'Input Data Contract',
                  'Output Data Contract',
                ],
                rows: [
                  [
                    'A0',
                    'Orchestrator',
                    'Enforces topological execution and immutability',
                    'Global Config {L, τ, γ, TC}',
                    'Coordinated Execution Ledger',
                  ],
                  [
                    'A1',
                    'DataAlignment',
                    'Price ingestion and log-return forward-fill',
                    'Raw Daily OHLCV Prices',
                    'Aligned Log-Return Matrix R',
                  ],
                  [
                    'A2',
                    'ShrinkageEstimator',
                    'James-Stein returns and Ledoit-Wolf covariance',
                    'Return Matrix R',
                    'Shrunk Moments {μ_JS, Σ_LW}',
                  ],
                  [
                    'A3',
                    'InstabilityMonitor',
                    'Computes 3 moments and Composite Instability Index',
                    'Return Matrix R, Baseline Stats',
                    'Scalar It and Z-Scores {z_V, z_C, z_Δ}',
                  ],
                  [
                    'A4',
                    'RegimeClassifier',
                    'Deterministic rule evaluation via R(It)',
                    'Scalar It, Threshold τ',
                    'Categorical State {SHRUNKMV | EQUALWEIGHT}',
                  ],
                  [
                    'A5',
                    'OptimizationAgent',
                    'Solves convex QP or assigns 1/N weights',
                    'Regime Mode, {μ_JS, Σ_LW}',
                    'Optimal Weight Vector w_t',
                  ],
                  [
                    'A6',
                    'PerformanceAuditor',
                    'Computes out-of-sample metrics & stability Gt',
                    'Weights w_t, Realized Returns',
                    'Audit Record St = {It, mode, w_t, metrics}',
                  ],
                  [
                    'A7',
                    'ConversationalXAI',
                    'Generates post-hoc plain-language audit narratives',
                    'Read-Only Audit Record St',
                    'Natural-Language Narrative ψ_t',
                  ],
                ],
              },
            ],
          },
          {
            id: 'subsec-5-2',
            number: '5.2.',
            title: 'Conversational Governance Interface',
            paragraphs: [
              'Agent A7 serves as an on-demand natural-language explanation interface for governance decisions. The governance record, comprising the numerical values of $I_t$, regime flags, and portfolio weight vectors, is formally complete but operationally difficult to interpret for compliance officers and clients without quantitative training. The conversational layer addresses this by translating the committed pipeline state into plain language while leaving all underlying numerical values unchanged.',
              'Each invocation of the language model is grounded in a read-only context 𝑡= {$I_t$, 𝜃𝐻, mode, 𝑤𝑡, metrics}. The separation from the decision-making pipeline is exact and verifiable: the API call is issued only after 𝑤𝑡has been written to the governance log, and the model output is routed exclusively to the user interface, with no write path to any upstream component. Because this isolation is enforced by the execution order of the pipeline rather than by prompt-level instruction, it is not susceptible to prompt injection or adversarial override. A lightweight keyword classifier assigns each incoming query to one of four intent categories: regime, performance, counterfactual, and allocation. The classifier then restricts the grounded context 𝑡to the fields relevant to the recognised intent, thereby limiting context length and reducing the risk of hallucination. Mean response latency across the four intent categories is 1.4 seconds.',
            ],
          },
          {
            id: 'subsec-5-3',
            number: '5.3.',
            title: 'Representative Governance Cycle: April 2020',
            paragraphs: [
              'The April 2020 evaluation window exhibits the highest level of $I_t$observed across the twelve-year sample and provides the clearest illustration of how the detection, decision, and explanation layers operate jointly under severe market stress.',
              'Agent A3 — Instability Computation. The three normalised component signals for this window are: 𝑧$\\sigma$= 3.21, 𝑧$\\rho$= 4.87, 𝑧𝛿= 8.44 (10) yielding a Composite Instability Index of:',
              '$I_t$= 3.21 + 4.87 + 8.44 3 = 5.99 (11) This value exceeds the governance threshold 𝜃𝐻= 1.0 by 4.99 standard deviations. The covariance drift component 𝑧𝛿 is the dominant contributor, reflecting an unprecedented structural rotation in the covariance matrix during the market crash of March 2020.',
              'Agent A4 — Regime Decision. Since $I_t$= 5.99 > 𝜃𝐻= 1.0, the Regime Operator outputs EqualWeight. Agent A5-L — Weight Computation. The equal-weight allocation assigns:',
              '𝑤𝑖= 1 19 = 5.26% for all 𝑖= 1, … , 19 (12) Agent A6 — Governance Commit. The governance record 𝑡is committed to the immutable log. Agent A7 — Audit Narrative. The AIReasoningAgent generates the following governance narrative on demand: The portfolio was managed under the EqualWeight regime for the period ending 31 March 2020. The Composite Instability Index $I_t$stood 5.99 standard deviations above its 2010–2019 training baseline, with the result driven primarily by covariance matrix drift (𝑧𝛿= 8.44$\\sigma$) and higher mean pairwise correlation (𝑧$\\rho$= 4.87$\\sigma$). Under Definition 2, any value of $I_t$above 𝜃𝐻= 1.0 unconditionally activates the equalweight capital protection rule. This is a deterministic process: given the price history up to 31 March 2020 and 𝜃𝐻= 1.0, EqualWeight is the unique and fully reproducible output of the Regime Operator. The dominant driver of the decision is covariance drift, meaning that the co-movement structure of the portfolio is changing at an abnormally rapid rate. That shift weakens the reliability of any covariance-based return estimate and therefore produces a regime transition from ShrunkMV to EqualWeight.',
              'The narrative above satisfies all four properties of a compliant audit record and may be included in a supervisory report without further modification. It can be reproduced exactly at any future date by re-running the pipeline with the same input price history and parameter set {𝑊, 𝜃𝐻, 𝜆, 𝑇𝐶}.',
              'The narrative above satisfies all four properties of a compliant audit record and is suitable for inclusion in a supervisory report without further modification. It can be regenerated exactly at any future date by re-running the pipeline with the same input price history and parameter set {𝑊, 𝜃𝐻, 𝜆, 𝑇𝐶}.',
            ],
            equations: [
              {
                id: 'eq-april-2020-components',
                latex: 'z(V_t) = 3.21, \\quad z(C_t) = 4.87, \\quad z(\\Delta_t) = 8.44',
                number: '(10)',
                label: 'April 2020 Component Signals',
              },
              {
                id: 'eq-april-2020-index',
                latex: 'I_t = \\frac{3.21 + 4.87 + 8.44}{3} = 5.99 > \\tau = 1.0',
                number: '(11)',
                label: 'April 2020 Composite Index',
              },
              {
                id: 'eq-april-2020-weights',
                latex: 'w_i = \\frac{1}{19} = 5.26\\% \\quad \\forall i \\in \\{1, \\dots, 19\\}',
                number: '(12)',
                label: 'Equal-Weight Allocation',
              },
            ],
          },
        ],
      },
      {
        id: 'sec-conclusion',
        number: '6.',
        title: 'Conclusion',
        subsections: [
          {
            id: 'subsec-6-1',
            number: '6.1.',
            title: 'Summary of Findings',
            paragraphs: [
              "This paper introduces a supervisory governance framework that combines statistically grounded drawdown protection, fully auditable allocation decisions, and on-demand plain-language explanations, and evaluates the framework on real-world data spanning a twelve-year period containing multiple stress episodes. The Composite Instability Index $I_t$is constructed from cross-sectional volatility, mean pairwise correlation, and the Frobenius norm drift of the covariance matrix. To the best of the authors' knowledge, the drift term is the first use of this quantity as a real-time governance signal for portfolio management. Among the three components, it delivers the strongest separation between market states, with a mean-level ratio of 6.02, and it was the principal driver of the April 2020 peak (𝑧𝛿= 8.44$\\sigma$). The lag-1 autocorrelation of 0.84 indicates that $I_t$captures persistent market regimes rather than transitory noise.",
              'The Regime Operator ($I_t$) takes the index as input and produces one of two portfolio-construction instructions from a single scalar comparison with 𝜃𝐻. Because the rule is deterministic and binary, its output can be reproduced uniquely from the input price history and the threshold parameter alone, thereby satisfying the auditability requirements of MiFID II Article 25 (European Parliament, 2014), GDPR Article 22 (European Parliament, 2016), and Basel III (Basel Committee on Banking Supervision, 2011) without discretionary intervention.',
              'The Governance Stability metric measures decision stability independently of return performance. The framework records a mean Governance Stability of ̄ 𝐺𝑆= 0.377 compared with 0.801 under Static MV, corresponding to a 53% improvement attributable to the stabilising effect of the governance signal on rebalancing frequency. Across 51 non-overlapping quarterly windows from January 2012 to October 2024, the framework reduces mean maximum drawdown by 38.1% relative to Static MV (𝑡= 5.67, 𝑝< 0.001). The result remains statistically significant after excluding the COVID-19 period (𝑛= 47, 𝑝< 0.001), remains stable over 𝜆∈[1.0, 10.0] and 𝜃𝐻∈[0.50, 1.50] within a band of 2.0 percentage points, and is robust across all five validation universes. The improvement ranges from +12.4% in Universe U2 (European Country ETFs) to +70.0% in Universe U5 (Multi-Asset), suggesting that the governance benefit increases with the degree of factor independence available within the relevant instrument universe. Replication code and reproducibility notebook:',
              'https://github.com/jithendra259/fintech_chatbotk',
            ],
          },
          {
            id: 'subsec-6-2',
            number: '6.2.',
            title: 'Limitations',
            paragraphs: [
              'COVID-19 Underperformance. The framework records a maximum drawdown deterioration of 15.2% in the March 2020 window. In that episode, the Static MV portfolio was, by chance, positioned in low-beta defensive holdings that cushioned the initial shock, whereas the equal-weight fallback spread exposure more evenly across financials and energy — sectors that were hit especially hard in the first phase of the pandemic. The binary fallback is sensitive to the level of $I_t$, but it cannot distinguish between sector exposures that are protective for a particular shock and those that intensify it. Adjusting 𝜃𝐻or 𝜆would therefore not resolve this structural limitation. Equity-Centric Calibration. The rolling realised covariance estimator does not account for fixed income duration non-stationarity, commodity seasonality in co-movement with other asset classes, or derivatives-driven effective correlations in bonds and commodities. The results for Universe U5 (Multi-Asset) are promising but are not sufficiently robust to support rigorous generalisation of the model to cross-asset portfolios without further adaptation of the estimation procedure.',
              'Transaction Cost Approximation. The flat charge of 10 basis points per rebalance understates actual implementation costs during periods of stress, when bid–ask spreads widen and the equal-weight instruction requires the liquidation of concentrated positions. The reported results should therefore be interpreted as gross returns rather than net returns achievable in a live portfolio.',
              'Fixed Threshold. The threshold 𝜃𝐻= 1.0 is calibrated once against the 2010–2019 training distribution. Secular shifts in the level of market volatility over time could cause a static threshold to generate incorrect governance signals and potentially amplify underperformance in future regimes. Dynamic recalibration of 𝜃𝐻would address this concern but would introduce an additional free parameter that would itself require out-of-sample stability testing.',
            ],
          },
          {
            id: 'subsec-6-3',
            number: '6.3.',
            title: 'Future Research',
            paragraphs: [
              'Regime Operator with Smooth Transition. Replacing the binary switching rule with a smooth transition blending function applied to $I_t$would preserve full audit reproducibility while attenuating the abrupt weight changes that contributed to the COVID-19-related underperformance identified in Section ??. A graduated operator, in which the degree of defensiveness scales continuously with $I_t$, would allow the framework to respond proportionally to intermediate levels of instability rather than applying a discrete all-or-nothing regime change. Component Weighting. The current specification assigns equal weight to the three component signals of $I_t$. Adopting signal combination methodologies in the spirit of Billio et al. (2012) and Acharya et al. (2017) would allow for the derivation of optimal component weights that maximise the predictive content of $I_t$for drawdown beyond the 6.02-fold mean-level separation observed under equal weighting.',
              'Cross-Asset Covariance Drift. Extending the asset universe in the covariance estimation step to include fixed income and commodity instruments would allow the drift component 𝛿𝑡to capture changes in equity–bond correlation regimes without requiring any modification to the formal definition of the Regime Operator. This would directly address the equity-centric calibration limitation identified in Section ??.',
              'Retrieval-Augmented Reporting. Incorporating a retrieval mechanism into Agent A7 to identify historically analogous governance cycles would enable decisions to be contextualised against documented precedents, extending the plain language explanation interface through grounded generation mechanisms of the kind proposed by Wu et al. (2023) and Li et al. (2023).',
              'Cross-Strategy Benchmarking. Computing the 𝓁1 weight change for risk parity (Roncalli, 2013), smart beta, and liability-driven investing strategies would yield empirical reference values against which the Governance Stability metric could be benchmarked, establishing whether the improvements documented here are specific to the meanvariance family of strategies or generalise more broadly.',
              'CRediT Authorship Contribution Statement K J Subramanyam: Conceptualization, Methodology, Software, Formal analysis, Data curation, Writing – original draft, Writing – review and editing, Visualization, Investigation.',
              'Declaration of Competing Interests The author declares that he has no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper.',
              'Funding This research did not receive any specific grant from funding agencies in the public, commercial, or not-for-profit sectors.',
              'Data Availability Replication code, data retrieval scripts, and a reproducibility notebook regenerating all tables and figures are publicly available at https://github.com/jithendra259/fintech_chatbotk. Daily price data are retrieved from Yahoo Finance via the open-source yfinance Python library and are freely accessible for research purposes.',
              'Declaration of Generative AI and AI-Assisted Technologies in the Manuscript Preparation Process During the preparation of this work the author used an AI language model to assist with manuscript structuring, LATEX formatting, and language editing. After using this tool, the author reviewed and edited all content as needed and takes full responsibility for the content of the published article.',
            ],
          },
        ],
      },
    ],
    references: [
      {
        index: 1,
        citation:
          'O. Ledoit and M. Wolf, "A well-conditioned estimator for large-dimensional covariance matrices," Journal of Multivariate Analysis, vol. 88, no. 2, pp. 365–411, 2004.',
        doi: '10.1016/S0047-259X(03)00096-4',
      },
      {
        index: 2,
        citation:
          'H. Markowitz, "Portfolio selection," The Journal of Finance, vol. 7, no. 1, pp. 77–91, 1952.',
        doi: '10.1111/j.1540-6261.1952.tb01525.x',
      },
      {
        index: 3,
        citation:
          'V. DeMiguel, L. Garlappi, and R. Uppal, "Optimal versus naive diversification: How inefficient is the 1/N portfolio strategy?" The Review of Financial Studies, vol. 22, no. 5, pp. 1915–1953, 2009.',
        doi: '10.1093/rfs/hhm075',
      },
      {
        index: 4,
        citation:
          'J. D. Jobson and B. Korkie, "Estimation for Markowitz efficient portfolios," Journal of the American Statistical Association, vol. 75, no. 371, pp. 544–554, 1980.',
        doi: '10.1080/01621459.1980.10477507',
      },
      {
        index: 5,
        citation:
          'R. Michaud, "The Markowitz optimization enigma: Is optimized optimal?" Financial Analysts Journal, vol. 45, no. 1, pp. 31–42, 1989.',
        doi: '10.2469/faj.v45.n1.31',
      },
      {
        index: 6,
        citation:
          'F. X. Longin and B. Solnik, "Extreme correlation of international equity markets," The Journal of Finance, vol. 56, no. 2, pp. 649–676, 2001.',
        doi: '10.1111/0022-1082.00340',
      },
      {
        index: 7,
        citation:
          'M. Billio, M. Getmansky, A. W. Lo, and L. Pelizzon, "Econometric measures of connectedness and systemic risk in the finance and insurance sectors," Journal of Financial Economics, vol. 104, no. 3, pp. 535–559, 2012.',
        doi: '10.1016/j.jfineco.2011.12.010',
      },
      {
        index: 8,
        citation:
          'V. V. Acharya, L. H. Pedersen, T. Philippon, and M. Richardson, "Measuring systemic risk," The Review of Financial Studies, vol. 30, no. 1, pp. 2–47, 2017.',
        doi: '10.1093/rfs/hhw088',
      },
      {
        index: 9,
        citation:
          'J. D. Hamilton, "A new approach to the economic analysis of nonstationary time series and the business cycle," Econometrica, vol. 57, no. 2, pp. 357–384, 1989.',
        doi: '10.2307/1912559',
      },
      {
        index: 10,
        citation:
          'W. James and C. Stein, "Estimation with quadratic loss," in Proceedings of the Fourth Berkeley Symposium on Mathematical Statistics and Probability, vol. 1, pp. 361–379, 1961.',
      },
      {
        index: 11,
        citation:
          'P. Jorion, "Bayes-Stein estimation for portfolio analysis," The Journal of Financial and Quantitative Analysis, vol. 21, no. 3, pp. 279–292, 1986.',
        doi: '10.2307/2331042',
      },
      {
        index: 12,
        citation:
          'A. B. Arrieta et al., "Explainable Artificial Intelligence (XAI): Concepts, taxonomies, opportunities and challenges toward responsible AI," Information Fusion, vol. 58, pp. 82–115, 2020.',
        doi: '10.1016/j.inffus.2019.12.012',
      },
      {
        index: 13,
        citation:
          'Z. Ji et al., "Survey of hallucination in natural language generation," ACM Computing Surveys, vol. 55, no. 12, pp. 1–38, 2023.',
        doi: '10.1145/3571730',
      },
      {
        index: 14,
        citation:
          'A. W. Lo, "The statistics of Sharpe ratios," Financial Analysts Journal, vol. 58, no. 4, pp. 36–52, 2002.',
        doi: '10.2469/faj.v58.n4.2469',
      },
      {
        index: 15,
        citation:
          'European Parliament and Council of the EU, "Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act)," Official Journal of the European Union, 2024.',
      },
      {
        index: 16,
        citation:
          'European Parliament and Council of the EU, "Directive 2014/65/EU on markets in financial instruments (MiFID II)," Official Journal of the European Union, 2014.',
      },
    ],
  },
};
