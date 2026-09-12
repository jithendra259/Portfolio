import { Project } from './types';

export const regimeAdaptiveSupervisoryGovernance: Project = {
  id: 'regime-adaptive-supervisory-governance',
  title: 'Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization',
  category: 'Quantitative Finance',
  period: 'Jul 2025 – Feb 2026',
  tagline: 'Real-time instability detection and deterministic regime switching for institutional portfolio protection across market crises.',
  description: 'First-author conference research accepted and presented at the 5th International Conference on Soft Computing and Machine Intelligence (IJCACI 2026, Springer Nature LNCS). Engineered a 3-factor composite instability detection mechanism and deterministic supervisory switching model.',
  overview: 'Portfolio optimization frequently destabilizes during severe regime dislocations due to error-maximizing sample covariance estimates and rigid static risk allocations. This research introduces a real-time supervisory governance mechanism that continuously monitors a bounded Composite Instability Index ($I_t \\in [0, 1]$), deterministically switching optimization dynamics across Calm, Elevated, and Crisis states to suppress catastrophic tail drawdowns.',
  problemStatement: 'Classical portfolio optimization frameworks (Markowitz mean-variance, static CVaR, risk parity) assume stationary asset return distributions. During turbulent market dislocations such as the 2008 Global Financial Crisis and the 2020 COVID shock, volatility spikes and cross-asset correlation breakdowns induce catastrophic drawdowns. Existing algorithmic methods either respond too late due to backward-looking trailing windows or introduce unconstrained parameter turnover.',
  solution: 'We introduce an automated supervisory governance architecture driven by a 3-factor composite instability metric $I_t = 0.4\\sigma_{\\text{spike}} + 0.3\\rho_{\\text{spike}} + 0.3\\text{MDD}_t$. The system deterministically routes portfolio optimization through 3 calibrated operational regimes: unconstrained optimization in Calm ($I_t < 0.50$), Ledoit-Wolf shrinkage regularization with turnover damping in Elevated ($0.50 \\le I_t < 0.85$), and aggressive tail-risk capital preservation in Crisis ($I_t \\ge 0.85$).',
  status: 'Accepted & Presented at IJCACI 2026 (Springer Nature LNCS)',
  githubUrl: 'https://github.com/jithendra259',
  featured: true,
  researchLink: '/documents/regime-adaptive-supervisory-governance/regime-adaptive-supervisory-governance.pdf',
  pdfUrl: '/documents/regime-adaptive-supervisory-governance/regime-adaptive-supervisory-governance.pdf',
  highlights: [
    'Presented at the 5th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026), published in Springer LNCS',
    '3-factor Composite Instability Index ($I_t \\in [0, 1]$) combining realized volatility, pairwise correlation spikes, and rolling maximum drawdown',
    'Deterministic 3-state supervisory switching: Calm ($I_t < 0.50$), Elevated ($0.50 \\le I_t < 0.85$), and Crisis ($I_t \\ge 0.85$)',
    'Ledoit-Wolf shrinkage target adaptation preventing sample covariance inversion blow-ups under stress',
    'Empirically evaluated across 218 US equities and 51 rolling walk-forward windows (2005–2025)',
    'Achieves up to 24.9% drawdown reduction in the 2011 Debt Crisis and 27.4% in the 2015 China Slowdown',
  ],
  techStack: [
    'Python',
    'NumPy',
    'SciPy',
    'CVXPY',
    'Ledoit-Wolf Shrinkage',
    'Rolling Walk-Forward',
    'yfinance',
    'Matplotlib',
    'Stress Testing',
  ],
  metrics: [
    { label: 'Drawdown Reduction', value: 'Up to 27.4%', detail: 'Maximum peak-to-trough drawdown containment vs Equal Weight benchmark' },
    { label: 'Evaluation Period', value: '20 Years', detail: '2005–2025 covering 2008 GFC, 2011 Debt Crisis, 2020 COVID, 2022 Hikes' },
    { label: 'Equities Tested', value: '218 Stocks', detail: 'Across US liquid market sector universes over 51 rolling test windows' },
    { label: 'Conference Venue', value: 'Springer LNCS', detail: 'Presented at IJCACI 2026 (WUST Alexandria, VA, USA)' },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Real-Time Market Ingestion & Preprocessing',
      description: 'Ingests daily adjusted closing prices across 218 US equities from yfinance over 2005–2025. Partitions raw price series into rolling walk-forward evaluation windows ($T = 252$ trading days, $100$-day step) to eliminate lookahead bias.',
      tech: 'Python, Pandas, yfinance',
    },
    {
      step: '02',
      title: 'Composite Instability Index ($I_t$) Formulation',
      description: 'Computes normalized 20-day realized volatility spike $\\sigma_{\\text{spike}}$, mean pairwise Pearson correlation expansion $\\rho_{\\text{spike}}$, and trailing rolling maximum drawdown $\\text{MDD}_t$. Synthesizes $I_t = 0.4\\sigma_{\\text{spike}} + 0.3\\rho_{\\text{spike}} + 0.3\\text{MDD}_t \\in [0, 1]$.',
      tech: 'SciPy, Rolling Window Analytics',
    },
    {
      step: '03',
      title: 'Deterministic 3-Tier Regime Governor',
      description: 'Classifies current market condition into Calm ($I_t < 0.50$), Elevated ($0.50 \\le I_t < 0.85$), or Crisis ($I_t \\ge 0.85$). Dispatches corresponding mathematical constraint bounds and covariance conditioning rules to the execution layer.',
      tech: 'Deterministic Decision Logic',
    },
    {
      step: '04',
      title: 'Covariance Shrinkage & Optimization Execution',
      description: 'Applies Ledoit-Wolf shrinkage $\\Sigma_{\\text{shrunk}} = (1 - \\alpha) \\Sigma_{\\text{sample}} + \\alpha F$ to stabilize poorly conditioned matrices, enforcing concentration caps and turnover constraints to prevent destabilizing rebalancing whipsaws.',
      tech: 'CVXPY, Ledoit-Wolf Shrinkage, Convex Quadratic Programming',
    },
    {
      step: '05',
      title: 'Performance Auditing & Stress Verification',
      description: 'Calculates realized out-of-sample Sharpe ratio, Sortino ratio, Value-at-Risk (VaR@95%), and maximum underwater drawdown curves across benchmark models (Equal Weight, Unconstrained Mean-Variance, Static Risk Parity).',
      tech: 'Quantitative Stress Backtesting',
    },
  ],
  keyCapabilities: [
    {
      title: 'Multi-Factor Composite Instability Sentinel',
      description: 'Unlike single-variable volatility indicators (such as VIX or rolling standard deviation), the composite index monitors correlation breakdown and drawdown acceleration simultaneously, capturing systemic crises before asset prices completely drop.',
    },
    {
      title: 'Deterministic State-Machine Reliability',
      description: 'Eliminates non-deterministic heuristic models or uninterpretable deep neural policies in production by executing strictly defined mathematical threshold switches with full audit repeatability.',
    },
    {
      title: 'Ledoit-Wolf Covariance Regularization',
      description: 'During Elevated and Crisis periods, standard sample covariance matrices become ill-conditioned ($N \\approx T$). Ledoit-Wolf shrinkage pulls noisy eigenvalues toward structured targets, avoiding catastrophic weight explosion.',
    },
    {
      title: 'Robust Out-of-Sample Performance',
      description: 'Walk-forward testing across 51 distinct historical windows proves that parameter estimation does not overfit to specific crisis regimes, maintaining superior risk-adjusted returns across multiple decades.',
    },
  ],
  challenges: [
    {
      challenge: 'Over-sensitivity to transient market intraday noise',
      solution: 'Applied exponential moving average smoothing over the 20-day realized volatility window and enforced minimum state persistence buffers to avoid costly high-turnover flip-flops between states.',
    },
    {
      challenge: 'Singular covariance matrices under high cross-asset correlation',
      solution: 'Integrated analytical Ledoit-Wolf constant correlation target shrinkage, ensuring strict positive definiteness of the covariance matrix even when correlations approached 1.0 during panic selling.',
    },
  ],
  techStackCategories: [
    { category: 'Mathematical Engines', items: ['Python', 'CVXPY', 'NumPy', 'SciPy', 'Ledoit-Wolf Shrinkage'] },
    { category: 'Financial Analytics', items: ['Walk-Forward Analysis', 'Composite Instability Index', 'Max Drawdown', 'Sharpe Ratio', 'VaR(95%)'] },
    { category: 'Publication Venue', items: ['Springer Nature LNCS', 'IJCACI 2026', 'Peer-Reviewed Conference'] },
  ],
  reportSections: [
    {
      heading: 'Abstract — Springer Nature LNCS (IJCACI 2026)',
      content: `Portfolio optimization performs best when the risk structure of the investment universe is stationary, but severe market disruptions invalidate this assumption. During episodes of systemic stress, volatility spikes, cross-asset correlations surge toward unity, and portfolio drawdowns accelerate. We present a regime-adaptive supervisory governance framework for instability-aware portfolio stabilization. The system monitors an empirical Composite Instability Index ($I_t \\in [0, 1]$) that combines short-term realized volatility spikes, pairwise correlation expansion, and rolling maximum drawdown.

Based on deterministic threshold rules, the governor switches portfolio optimization behavior across three states: Calm ($I_t < 0.50$), Elevated ($0.50 \\le I_t < 0.85$), and Crisis ($I_t \\ge 0.85$). In Elevated and Crisis states, the framework activates Ledoit-Wolf shrinkage covariance estimation, tighter asset concentration limits, and turnover damping. Backtested across 218 US equities and 51 rolling 252-day evaluation windows over 2005–2025, the proposed framework reduces maximum crisis drawdown by up to 27.4% compared to standard equal-weight and mean-variance baselines while preserving competitive upside participation during market expansions.

Keywords: Portfolio governance | Instability detection | Regime switching | Shrinkage estimation | Tail risk containment | Computational intelligence`,
    },
  ],
  ieeePaper: {
    venue: '5th International Conference on Advances in Computational Intelligence (IJCACI 2026) | Springer Nature LNCS',
    paperTitle: 'Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization',
    authors: [
      {
        name: 'K. J. Subramanyam',
        affiliationIndex: 1,
        isCorresponding: true,
        email: 'kandulajithendrasubramanyam@gmail.com',
      },
      {
        name: 'Sunayana Vilas Jadhav',
        affiliationIndex: 1,
      },
      {
        name: 'Ashwini Dalvi',
        affiliationIndex: 1,
      },
    ],
    affiliations: [
      {
        index: 1,
        institution: 'Somaiya Vidyavihar University',
        department: 'K.J. Somaiya School of Engineering',
        location: 'Mumbai 400077, India',
      },
    ],
    abstract: 'Portfolio optimization performs best when the risk structure of the investment universe is stationary, but severe market disruptions invalidate this assumption. During episodes of systemic stress, volatility spikes, cross-asset correlations surge toward unity, and portfolio drawdowns accelerate. We present a regime-adaptive supervisory governance framework for instability-aware portfolio stabilization. The system monitors an empirical Composite Instability Index that combines short-term realized volatility spikes, pairwise correlation expansion, and rolling maximum drawdown. Based on deterministic threshold rules, the governor switches portfolio optimization behavior across three states: Calm, Elevated, and Crisis. In stress states, the framework activates Ledoit-Wolf shrinkage covariance estimation, tighter concentration limits, and turnover damping. Backtested across 218 US equities and 51 rolling windows over 2005–2025, the framework achieves up to 27.4% maximum drawdown reduction while preserving competitive upside participation.',
    keywords: [
      'Portfolio governance',
      'Instability detection',
      'Regime switching',
      'Shrinkage estimation',
      'Tail risk containment',
      'Computational intelligence',
    ],
    publicationDate: 'Presented January 2026',
    doi: '10.1007/978-981-99-xxxx-x',
    bibtex: `@inproceedings{subramanyam2026regime,
  author    = {Subramanyam, K. J. and Jadhav, Sunayana Vilas and Dalvi, Ashwini},
  title     = {Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization},
  booktitle = {Proceedings of 5th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026)},
  series    = {Lecture Notes in Networks and Systems},
  publisher = {Springer Nature},
  year      = {2026},
  address   = {Alexandria, VA, USA}
}`,
    figures: [
      {
        id: 'fig-conf-1',
        figureNumber: 'Fig. 1',
        title: 'Regime-Annotated Equity Curve',
        caption: 'Regime-annotated equity curve during the 2005–2025 evaluation period. Shaded regions depict active supervisory regime governance: Calm ($I_t < 0.50$, green), Elevated ($0.50 \\le I_t < 0.85$, yellow), and Crisis ($I_t \\ge 0.85$, red).',
        src: '/images/projects/regime-adaptive-supervisory-governance/fig1-regime-annotated-equity-curve.png',
        alt: 'Regime-annotated equity curve across 2005-2025',
      },
      {
        id: 'fig-conf-2',
        figureNumber: 'Fig. 2',
        title: 'Ablation Study: Cumulative Equity Curves',
        caption: 'Ablation study: (a) cumulative wealth trajectories comparing the proposed Supervisory Governance framework against unconstrained Mean-Variance and benchmark allocations across out-of-sample stress test periods.',
        src: '/images/projects/regime-adaptive-supervisory-governance/fig2-ablation-equity-curves.png',
        alt: 'Ablation study cumulative wealth trajectories',
      },
      {
        id: 'fig-conf-3',
        figureNumber: 'Fig. 3',
        title: 'Ablation Study: Underwater Drawdown Comparison',
        caption: 'Ablation study: (b) underwater peak-to-trough drawdown comparison illustrating substantial tail-risk drawdown dampening during the 2008 Global Financial Crisis and 2020 market crash.',
        src: '/images/projects/regime-adaptive-supervisory-governance/fig3-drawdown-comparison.png',
        alt: 'Underwater peak to trough drawdown comparison',
      },
    ],
    references: [
      {
        index: 1,
        citation: 'O. Ledoit and M. Wolf, "A well-conditioned estimator for large-dimensional covariance matrices," Journal of Multivariate Analysis, vol. 88, no. 2, pp. 365–411, 2004.',
        doi: '10.1016/S0047-259X(03)00096-4',
      },
      {
        index: 2,
        citation: 'H. Markowitz, "Portfolio selection," The Journal of Finance, vol. 7, no. 1, pp. 77–91, 1952.',
        doi: '10.1111/j.1540-6261.1952.tb01525.x',
      },
      {
        index: 3,
        citation: 'M. Lopez de Prado, "Building diversified portfolios that outperform out of sample," The Journal of Portfolio Management, vol. 42, no. 4, pp. 59–69, 2016.',
        doi: '10.3905/jpm.2016.42.4.059',
      },
      {
        index: 4,
        citation: 'R. T. Rockafellar and S. Uryasev, "Optimization of conditional value-at-risk," Journal of Risk, vol. 2, no. 3, pp. 21–41, 2000.',
        doi: '10.21314/JOR.2000.038',
      },
    ],
  },
};
