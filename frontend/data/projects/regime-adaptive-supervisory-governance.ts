import { Project } from './types';

export const regimeAdaptiveSupervisoryGovernance: Project = {
  id: 'regime-adaptive-supervisory-governance',
  title: 'Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization',
  category: 'Quantitative Finance',
  period: '2005 – 2025 (20-Year Study)',
  tagline: 'Instability-Aware Supervisory Signal Coupling Covariance Drift with Quadratic Regularization & Concentration Caps',
  status: 'Springer Nature LNCS / Presented at 5th IJCACI 2026',
  githubUrl: 'https://github.com/jithendra259/Portfolio',
  pdfUrl: '/documents/regime-adaptive-supervisory-governance/regime-adaptive-supervisory-governance.pdf',

  description:
    'Proposes an interpretable regime-adaptive supervisory governance framework for portfolio stabilization during market stress. Instead of switching prediction models, the framework monitors covariance drift, rolling volatility, and correlation stress to dynamically adjust quadratic concentration penalties and weight caps.',

  overview:
    'Portfolio optimization performs best when the risk structure used to construct a portfolio is reasonably stable. However, in stressed market regimes, covariance relationships, volatility levels, and cross-asset correlations can move in tandem, making conventional allocation rules less robust. In this paper, we propose an interpretable regime-adaptive supervisory governance framework for portfolio stabilization during market instability. The framework integrates covariance drift, rolling volatility, and correlation stress into an instability index and flexibly adjusts governance through concentration limits and regularization strength over 18 liquid U.S. stocks across 2005–2025.',

  problemStatement:
    'Portfolio optimization concerns not only how to choose weights but also how much freedom the optimizer should have as the market environment changes. In tranquil markets, historical estimates of risk and dependence may be sufficiently stable for practical allocation. The same estimates can become fragile in stressed markets: covariance matrices shift, volatility increases, diversification benefits decline, and portfolios that appeared diversified under normal conditions become concentrated in their effective risk exposure. Classic Markowitz mean-variance optimization is notoriously sensitive to noisy input data, and while modern machine learning focuses on return prediction or reinforcement learning, such black-box models lack interpretability, auditability, and operational stability.',

  solution:
    'We construct an interpretable supervisory governance layer that monitors multi-channel market instability without attempting return forecasting. By converting covariance shifts, rolling volatility, and correlation stress into an expanding-window normalized instability index $I_t$, the framework dynamically transitions between stable and unstable governance states. Under instability ($I_t > \\tau$), the supervisor tightens the maximum single-asset weight bound from 35% down to 20% and scales quadratic regularization $\\lambda_g$ from 1 to 10 within a unified Ledoit-Wolf convex optimization formulation, preserving broad diversification and compressing tail drawdowns.',

  highlights: [
    '3-Channel Instability Index ($I_t$) combining covariance drift, rolling volatility, and correlation stress',
    'Convex quadratic governance formulation avoiding discrete or brittle heuristic switches',
    '20-Year Empirical Study (2005–2025) across 18 liquid U.S. equities and 51 rolling windows',
    'Maintains effective diversification of ~18.0 assets (HHI = 0.0557) vs 5.6 for unconstrained minimum-variance',
    'Statistically significant crisis-window discrimination (t = 7.47, p = 1.01e-11)',
    'Ultra-low turnover (0.0045/rebalance) with near-zero transaction cost drag (0.0001/year)',
  ],

  techStack: [
    'Python 3.11',
    'CVXPY',
    'Ledoit-Wolf Shrinkage',
    'NumPy & SciPy',
    'Pandas',
    'Matplotlib / Seaborn',
    'yfinance API',
    'LaTeX / BibTeX',
  ],

  techStackCategories: [
    {
      category: 'Mathematical Optimization',
      items: ['CVXPY', 'Quadratic Programming', 'Ledoit-Wolf Shrinkage', 'Herfindahl-Hirschman Index'],
    },
    {
      category: 'Risk & Regime Detection',
      items: ['Covariance Frobenius Drift', 'Rolling Realized Volatility', 'Correlation Stress Matrix', 'Expanding Standardization'],
    },
    {
      category: 'Empirical Framework',
      items: ['Rolling Walk-Forward (252d train, 21d rebalance)', 'Out-of-Sample 2015–2025', 'Proportional Cost Drag (10 bps)', 'Ablation Testing'],
    },
  ],

  metrics: [
    {
      label: 'Crisis Discrimination (Welch t-test)',
      value: 't = 7.47 (p = 1.01e-11)',
      detail: 'Crisis windows mean It = 1.3521 vs non-crisis mean It = -0.0200',
    },
    {
      label: 'Annualized Out-of-Sample Volatility',
      value: '18.15%',
      detail: 'Compressed from 18.42% for Equal Weight over 2015–2025',
    },
    {
      label: 'Maximum Drawdown',
      value: '-35.90%',
      detail: 'Contained compared to -36.01% for Equal Weight',
    },
    {
      label: 'Effective Number of Assets',
      value: '18.0 Assets',
      detail: 'HHI of 0.0557 matches 1/N naive diversification (18.0 assets) vs 5.6 for minimum-variance',
    },
    {
      label: 'Average Turnover per Rebalance',
      value: '0.0045',
      detail: 'Negligible portfolio churn with annual cost drag of only 0.01% (0.0001)',
    },
    {
      label: 'Unstable Regime Activation Frequency',
      value: '10.7%',
      detail: '503 unstable trading days vs 4,213 stable trading days across 2005–2025',
    },
  ],

  architectureSteps: [
    {
      step: '01',
      title: 'Market Data Ingestion & Returns Processing',
      description: 'Collects daily adjusted closing price series for 18 liquid U.S. equities from Yahoo Finance (2005–2025) and computes daily percentage returns $r_{i,t} = (P_{i,t} - P_{i,t-1}) / P_{i,t-1}$.',
      tech: 'yfinance & Pandas',
    },
    {
      step: '02',
      title: 'Three-Channel Supervisory Instability Monitor',
      description: 'Calculates normalized Frobenius covariance drift $\\Delta \\Sigma_t$, 21-day rolling volatility, and cross-asset correlation stress with expanding standardization $z_{k,t} = (X_{k,t} - \\mu_{k,t-1}) / \\sigma_{k,t-1}$.',
      tech: 'SciPy & Linear Algebra',
    },
    {
      step: '03',
      title: 'Composite Instability Index Aggregation',
      description: 'Combines channels via $I_t = 0.4 z_{\\text{drift},t} + 0.3 z_{\\text{vol},t} + 0.3 z_{\\text{corr},t}$ and evaluates the threshold $s_t = \\text{unstable}$ if $I_t > 1.0$.',
      tech: 'Supervisory Control Logic',
    },
    {
      step: '04',
      title: 'Ledoit-Wolf Convex Quadratic Optimization',
      description: 'Solves $\\min_w \\sqrt{w^\\top \\hat{\\Sigma} w} + \\lambda_g \\sum w_i^2$ subject to $\\sum w_i = 1$ and $0 \\le w_i \\le u_g$, setting $u_g = 0.20, \\lambda_g = 10$ during instability.',
      tech: 'CVXPY & OSQP Solver',
    },
    {
      step: '05',
      title: 'Audit Logging & Rebalancing Protocol',
      description: 'Logs weights, turnover, and HHI across 252-day training windows rebalanced every 21 trading days, incorporating a 10 bps proportional transaction cost model.',
      tech: 'Deterministic Ledger & Audit CSV',
    },
  ],

  keyCapabilities: [
    {
      title: 'Unified Quadratic Formulation',
      description: 'Eliminates brittle model switching by adjusting continuous regularization penalties $\\lambda_g$ and weight bounds $u_g$ within a single convex program.',
    },
    {
      title: 'Multi-Channel Early Warning',
      description: 'Detects systemic fragility across structural covariance drift, market volatility surges, and cross-asset correlation breakdowns.',
    },
    {
      title: 'Guaranteed Diversification',
      description: 'Overcomes the severe concentration of standard minimum-variance portfolios ($N_{\\text{eff}} = 5.6$) by sustaining an effective diversification of 18.0 assets.',
    },
    {
      title: 'Statistically Verified Auditability',
      description: 'Validated via expanding-window out-of-sample testing, Welch t-tests, and ablation studies with full mathematical transparency.',
    },
  ],

  challenges: [
    {
      challenge: 'Noisy high-dimensional covariance estimates in volatile markets causing extreme portfolio weight concentration.',
      solution: 'Applied Ledoit-Wolf shrinkage to improve matrix conditioning combined with an $L_2$ concentration penalty $\\lambda_g \\sum w_i^2$ that mathematically prevents single-asset concentration.',
    },
    {
      challenge: 'False regime switching triggers caused by short-term market noise or single-day outliers.',
      solution: 'Used an expanding-window historical standardization that prevents lookahead bias and aggregated three complementary channels with lagged evaluation.',
    },
    {
      challenge: 'High turnover and transaction cost drag in dynamic asset allocation strategies.',
      solution: 'Maintained low 21-day rebalancing frequency with smooth regularization adjustments, resulting in an ultra-low mean turnover of 0.0045 per rebalance.',
    },
  ],

  ieeePaper: {
    venue: '5th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026) / Springer Nature LNCS',
    paperTitle: 'Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization',
    publicationDate: '2026',
    abstract:
      'Portfolio optimization performs best when the risk structure used to construct a portfolio is reasonably stable. However, in stressed market regimes, covariance relationships, volatility levels, and cross-asset correlations can move in tandem, making conventional allocation rules less robust. In this paper, we propose an interpretable regime-adaptive supervisory governance framework for portfolio stabilization during market instability. The proposed framework integrates covariance drift, rolling volatility, and correlation stress into a general instability index and flexibly adjusts governance through concentration limits and regularization strength. Instead of switching allocation models, the approach uses a unified optimization framework to adapt governance behavior as instability increases. We empirically test the framework on 18 liquid U.S. stocks from 2005 to 2025 and find that it maintains broad diversification, slightly improves selected downside-risk measures relative to equal weight, and remains transparent in out-of-sample testing while accounting for transaction costs. Ablation studies show that governance regularization and concentration control are the primary stabilizing factors, whereas regime switching only marginally improves performance in the tested setting. We find no evidence of alpha generation or predictive outperformance. The contribution is therefore more limited and feasible: instability-aware supervision as a governance layer for robust portfolio control.',
    keywords: [
      'Portfolio optimization',
      'Covariance instability',
      'Supervisory governance',
      'Regime adaptation',
      'Robust diversification',
      'Multi-agent system (MAS)-compatible architecture',
    ],
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
        email: 'sunayanavj@somaiya.edu',
      },
      {
        name: 'Ashwini Dalvi',
        affiliationIndex: 1,
        email: 'ashwinidalvi@somaiya.edu',
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
    figures: [
      {
        id: 'fig-equity-curve',
        figureNumber: 'Fig. 1',
        title: 'Regime-Annotated Equity Curve',
        caption: 'Regime-annotated equity curve during the evaluation period (2015–2025). Red regions indicate active unstable-governance interventions where the supervisory layer tightened concentration caps and increased regularization strength.',
        src: '/images/projects/regime-adaptive-supervisory-governance/fig1-regime-annotated-equity-curve.png',
        alt: 'Regime-annotated equity curve comparison between Governance Framework and Equal Weight benchmark',
      },
      {
        id: 'fig-ablation-curves',
        figureNumber: 'Fig. 2',
        title: 'Ablation Study: Equity Curves and Drawdown Comparison',
        caption: 'Ablation study: (a) equity curves and (b) drawdown comparison for the Equal Weight benchmark, Ledoit-Wolf Minimum Variance, Governance without regime switching, and the full Governance framework over the out-of-sample period (2015–2025).',
        src: '/images/projects/regime-adaptive-supervisory-governance/fig2-ablation-equity-curves.png',
        alt: 'Ablation study equity and drawdown curves across four portfolio models',
      },
      {
        id: 'fig-drawdown',
        figureNumber: 'Fig. 3',
        title: 'Underwater Drawdown Profile Across Market Regimes',
        caption: 'Underwater drawdown profile comparing the Governance framework against the Equal Weight baseline during market drawdowns including the 2015–2016 commodity sell-off, 2018 volatility spike, and 2020 COVID shock.',
        src: '/images/projects/regime-adaptive-supervisory-governance/fig3-drawdown-comparison.png',
        alt: 'Underwater drawdown profile showing tail-risk containment',
      },
    ],
    sections: [
      {
        id: 'sec-intro',
        number: 'I.',
        title: 'Introduction & Problem Motivation',
        paragraphs: [
          'Portfolio optimization concerns not only how to choose weights but also how much freedom the optimizer should have as the market environment changes. In tranquil markets, historical estimates of risk and dependence may be sufficiently stable for practical allocation. The same estimates can become fragile in stressed markets: covariance matrices shift, volatility increases, diversification benefits decline, and portfolios that appeared diversified under normal conditions can become more concentrated in their effective risk exposure.',
          'The classic version of mean-variance optimization utilizes the framework developed by Markowitz and remains a key part of portfolio construction. The problem with the classic version, however, is well known: it is exceptionally sensitive to noisy input data. Therefore, robust estimation of the covariance matrix, shrinkage, and diversified portfolio allocations are all relevant considerations for real-world risk management. Another important takeaway from studies into regime-sensitive asset allocation is that markets are dynamic and portfolio policies must adapt accordingly.',
          'Recently conducted research in artificial intelligence in portfolio management tends to focus either on return prediction, reinforcement learning, or black-box optimization. These research lines are important, but sometimes difficult to implement in institutional settings because of the need for interpretability, stability, and auditability. In this paper, we take another approach. We neither construct an alpha model nor build return predictors or autonomous trading agents. Instead, we ask: is it possible to build an interpretable supervisory module that adapts portfolio governance during market instability?',
          'This framework serves as a governance-driven stabilization tool. It monitors covariance shifts, rolling volatility, and correlation stress, converting them into an instability index. Based on the regime state, it adjusts concentration limits and regularization strength. The optimizer has more liberty during periods of stability, while instability requires the framework to enforce greater conservatism.',
          'The main contributions of this work are threefold: (1) A regime-adaptive governance regularization mechanism that modifies concentration limits and regularization strength, rather than replacing the underlying optimization model; (2) An instability-aware supervisory signal that integrates covariance drift, rolling volatility, and correlation stress into a single interpretable governance trigger; and (3) An empirical evaluation with expanding normalization, out-of-sample testing, transaction costs, sensitivity analysis, ablation models, and concentration diagnostics with a robustness focus.',
          'The framework is intended to be modular, but its empirical implementation is centralized. Its monitoring, governance adaptation, optimization, and audit components can be naturally mapped to a Multi-Agent supervisory architecture in the general sense of role-based system decomposition and coordinated decision modules. This is a claim of architectural compatibility, not a claim that the present study realizes distributed autonomous agents.',
        ],
      },
      {
        id: 'sec-related-work',
        number: 'II.',
        title: 'Related Work & Foundations',
        paragraphs: [
          'Mean-variance optimization and equilibrium risk pricing form the basis of modern portfolio theory. These frameworks provide fundamental insight into the relationship between risk and expected return, but their inputs are difficult to estimate accurately. Shrinkage covariance estimation addresses part of this issue by improving the conditioning of high-dimensional covariance matrices (Ledoit and Wolf, 2004). The practical significance of estimation limitations and robustness is discussed in detail in the context of risk allocation.',
          'Another central concern is the difficulty of persistently beating simple diversification. DeMiguel et al. (2009) famously proved that naive 1/N diversification is extraordinarily difficult to beat out of sample. A diversification-oriented approach to portfolio construction implies an emphasis on concentration and out-of-sample robustness. Such results point to the need for a cautious attitude towards the assessment process: a governance mechanism is to be assessed not on the direct increase in portfolio performance, but on its ability to ensure diversification and manage concentration and downside risk behavior.',
          'Regime-dependent portfolio management has a rich tradition. Financial connections are subject to continuous structural changes through time. Regime-switching models have been widely used for international allocation, dynamic correlations, and multivariate asset allocation. Hidden Markov and switching-control frameworks further demonstrate how systems can adapt under changing latent states.',
          'Work on volatility regimes provides theoretical grounding for detecting market stress conditions, while adaptive responses emphasize changing allocation behavior. Furthermore, recent work combines regime switching with robust portfolio optimization, random matrix theory, GARCH dynamics, and asymmetric dependence. The deterioration of diversification benefits under stress (Longin and Solnik, 2001) motivates the correlation-stress channel in our instability index.',
        ],
      },
      {
        id: 'sec-methodology',
        number: 'III.',
        title: 'Methodology & Problem Formulation',
        paragraphs: [
          'The proposed framework operates as a supervisory layer atop a standard convex optimizer. We outline the asset universe, the mathematical construction of the three-channel instability monitor, the adaptive optimization formulation, and the backtesting protocol.',
        ],
        subsections: [
          {
            id: 'subsec-universe-data',
            number: 'A.',
            title: 'Universe and Data Representation',
            paragraphs: [
              'The empirical study evaluates 18 highly liquid U.S. equities spanning major economic sectors over the 20-year period from 1 January 2005 to 1 January 2025. Daily price series are retrieved via yfinance. Returns are computed from adjusted closing prices:',
            ],
            equations: [
              {
                id: 'eq-returns',
                latex: 'r_{i,t} = \\frac{P_{i,t} - P_{i,t-1}}{P_{i,t-1}}',
                number: '(1)',
                label: 'Asset Return Definition',
              },
            ],
          },
          {
            id: 'subsec-instability-monitor',
            number: 'B.',
            title: 'Supervisory Instability Monitor',
            paragraphs: [
              'The supervisory monitor synthesizes three distinct channels of market distress into a single scalar signal $I_t$:',
              '1. Covariance Drift: Evaluates the Frobenius norm of the percentage shift in the sample covariance matrix over a 21-day lag:',
            ],
            equations: [
              {
                id: 'eq-cov-drift',
                latex: '\\Delta \\Sigma_t = \\frac{\\|\\hat{\\Sigma}_t - \\hat{\\Sigma}_{t-21}\\|_F}{\\|\\hat{\\Sigma}_{t-21}\\|_F}',
                number: '(2)',
                label: 'Covariance Drift',
              },
              {
                id: 'eq-standardization',
                latex: 'z_{k,t} = \\frac{X_{k,t} - \\mu_{k,t-1}}{\\sigma_{k,t-1}}',
                number: '(3)',
                label: 'Expanding Standardization',
              },
              {
                id: 'eq-composite-index',
                latex: 'I_t = \\alpha z_{\\text{drift},t} + \\beta z_{\\text{vol},t} + \\gamma z_{\\text{corr},t}',
                number: '(4)',
                label: 'Composite Instability Index',
              },
            ],
            paragraphsAfter: [
              '2. Rolling Volatility: Computed as the cross-sectional mean of 21-day rolling realized standard deviations across all assets.',
              '3. Correlation Stress: Evaluated as the mean pairwise Pearson correlation coefficient among all asset pairs over the trailing 63-day window.',
              'To eliminate lookahead bias while ensuring comparability across heteroskedastic series, each channel is standardized using an expanding window and combined with weights alpha = 0.4, beta = 0.3, gamma = 0.3.',
            ],
          },
          {
            id: 'subsec-adaptive-optimization',
            number: 'C.',
            title: 'Governance-Adaptive Optimization',
            paragraphs: [
              'Rather than discontinuously replacing the optimization problem with an ad-hoc heuristic, the framework solves a unified convex quadratic program at each rebalance date using the Ledoit-Wolf shrinkage covariance matrix $\\hat{\\Sigma}$:',
            ],
            equations: [
              {
                id: 'eq-objective',
                latex: '\\min_{w} \\; \\sqrt{w^\\top \\hat{\\Sigma} w} + \\lambda_g \\sum_{i=1}^N w_i^2',
                number: '(5)',
                label: 'Regularized Objective',
              },
              {
                id: 'eq-constraints',
                latex: '\\text{subject to} \\quad \\sum_{i=1}^N w_i = 1, \\quad 0 \\le w_i \\le u_g',
                number: '(6)',
                label: 'Governance Constraints',
              },
            ],
            paragraphsAfter: [
              'The parameter $u_g$ denotes the maximum allowable single-asset weight bound, and $\\lambda_g$ specifies the strength of the quadratic concentration regularization in regime $g$. In the Stable regime ($s_t = 0$), the optimizer operates with $u_g = 0.35$ and $\\lambda_g = 1$. In the Unstable regime ($s_t = 1$), the supervisory policy tightens governance by setting $u_g = 0.20$ and $\\lambda_g = 10$.',
              'This structure penalizes concentration through $\\lambda_g \\|w\\|_2^2$ while respecting risk structure via $\\hat{\\Sigma}$. By remaining inside a single mathematical family, the portfolio transitions smoothly without sudden turnover dislocations.',
            ],
          },
          {
            id: 'subsec-backtest-protocol',
            number: 'D.',
            title: 'Backtesting Protocol & Concentration Metrics',
            paragraphs: [
              'The backtesting engine utilizes a 252-trading-day rolling training window with rebalancing every 21 days. The primary out-of-sample evaluation period spans 1 January 2015 to 1 January 2025. Proportional transaction costs are enforced at 0.0010 (10 basis points per dollar of turnover).',
              'To rigorously quantify portfolio concentration and effective diversification, we compute the Herfindahl-Hirschman Index (HHI):',
            ],
            equations: [
              {
                id: 'eq-hhi',
                latex: '\\text{HHI}_t = \\sum_{i=1}^N w_{i,t}^2, \\qquad N_{\\text{eff},t} = \\frac{1}{\\text{HHI}_t}',
                number: '(7)',
                label: 'Herfindahl-Hirschman Index',
              },
            ],
          },
        ],
      },
      {
        id: 'sec-empirical-results',
        number: 'IV.',
        title: 'Empirical Results & Diagnostics',
        paragraphs: [
          'We evaluate the framework across signal behavior, out-of-sample risk-adjusted metrics, concentration preservation, and regime-dependent market states.',
        ],
        subsections: [
          {
            id: 'subsec-crisis-discrimination',
            number: 'A.',
            title: 'Instability Index Signal & Crisis Activation',
            paragraphs: [
              'The composite instability index $I_t$ reacts promptly to major systemic shocks, exhibiting prominent spikes during the 2008 Global Financial Crisis, the 2011 U.S. sovereign downgrade, the 2015 commodity dislocation, and the 2020 COVID-19 liquidity shock. Across the full 20-year sample (4,716 days), 4,213 observations (89.3%) are governed as Stable and 503 observations (10.7%) are classified as Unstable.',
              'To formally test whether $I_t$ reliably discriminates stressed market conditions, we isolated $\\pm 10$ calendar-day windows around recognized historical crisis dates against all remaining observations. Overlapping dates across clustered crises were de-duplicated prior to statistical testing.',
            ],
            tables: [
              {
                id: 'tbl-crisis-test',
                number: 'TABLE I',
                title: 'CONTINUOUS CRISIS-WINDOW INSTABILITY TEST',
                headers: ['Sample Partition', 'N (Days)', 'Mean Instability (It)', 'Activation Rate (It > τ)'],
                rows: [
                  ['Crisis Windows (±10d)', '131', '1.3521', '38.2%'],
                  ['Non-Crisis Periods', '4,585', '-0.0200', '9.9%'],
                ],
                note: 'Welch two-sample t-test: t = 7.47, p-value = 1.01e-11. Confirms strong statistical discrimination of stress.',
              },
            ],
          },
          {
            id: 'subsec-oos-performance',
            number: 'B.',
            title: 'Out-of-Sample Performance: Governance vs. Equal Weight',
            paragraphs: [
              'Table II presents out-of-sample performance over the 10-year test period (2015–2025) incorporating transaction costs. The Equal Weight benchmark delivers a slightly higher annual return (17.09% vs. 16.65%) and Sharpe ratio (0.8190 vs. 0.8071). In contrast, the Governance framework achieves slightly lower annual volatility (18.15% vs. 18.42%), lower maximum drawdown (-35.90% vs. -36.01%), and superior 95% CVaR (-0.0279 vs. -0.0283).',
              'This confirms that the framework functions as intended: it does not seek speculative alpha generation, but rather delivers systematic stabilization and tail-risk mitigation while maintaining full participation in broader market trends.',
            ],
            tables: [
              {
                id: 'tbl-oos-performance',
                number: 'TABLE II',
                title: 'OUT-OF-SAMPLE PERFORMANCE (2015–2025)',
                headers: ['Performance Metric', 'Governance Framework (Ours)', 'Equal Weight Benchmark'],
                rows: [
                  ['Annual Return', '16.65%', '17.09%'],
                  ['Annualized Volatility', '18.15%', '18.42%'],
                  ['Sharpe Ratio (Rf = 0)', '0.8071', '0.8190'],
                  ['Maximum Drawdown (MDD)', '-35.90%', '-36.01%'],
                  ['Conditional Value at Risk (95% CVaR)', '-0.0279', '-0.0283'],
                ],
                note: 'Net of 10 bps proportional transaction costs. Demonstrates consistent volatility dampening and tail preservation.',
              },
            ],
          },
          {
            id: 'subsec-concentration-turnover',
            number: 'C.',
            title: 'Diversification Preservation and Turnover Efficiency',
            paragraphs: [
              'A major hazard in quantitative portfolio construction is extreme weight concentration. Unconstrained minimum-variance optimizers frequently concentrate over 70% of capital in two or three low-volatility assets. Table III demonstrates how our quadratic governance penalty solves this structural defect.',
              'The mean HHI of our Governance framework is 0.0557, corresponding to an effective number of assets $N_{\\text{eff}} = 18.0$, perfectly matching Equal Weight ($N_{\\text{eff}} = 18.0$). By contrast, the standard Ledoit-Wolf minimum-variance baseline collapses to an effective diversification of only 5.6 assets (HHI = 0.1776).',
              'Furthermore, the Governance framework achieves this stabilization with minimal portfolio churn: average turnover per 21-day rebalance is only 0.0045 (0.45% of total portfolio value), resulting in an estimated annual transaction cost drag of just 0.01% (0.0001).',
            ],
            tables: [
              {
                id: 'tbl-concentration',
                number: 'TABLE III',
                title: 'CROSS-STRATEGY CONCENTRATION COMPARISON',
                headers: ['Portfolio Construction Strategy', 'Mean HHI', 'Effective Diversification (N_eff)'],
                rows: [
                  ['Equal Weight (1/N)', '0.0556', '18.0 Assets'],
                  ['Minimum Variance (Ledoit-Wolf)', '0.1776', '5.6 Assets'],
                  ['Governance (Static Regularization, No Regime)', '0.0557', '18.0 Assets'],
                  ['Governance Framework (Full Dynamic Model)', '0.0557', '18.0 Assets'],
                ],
                note: 'Effective assets calculated as 1/HHI. Confirms our regularizer maintains maximum possible breadth.',
              },
            ],
          },
        ],
      },
      {
        id: 'sec-ablation-sensitivity',
        number: 'V.',
        title: 'Sensitivity Analysis & Ablation Studies',
        paragraphs: [
          'To determine which components are driving the observed stabilization, we conducted threshold sensitivity analysis and a four-model ablation study.',
        ],
        subsections: [
          {
            id: 'subsec-threshold-sensitivity',
            number: 'A.',
            title: 'Threshold Sensitivity (τ = 0.5 to 2.0)',
            paragraphs: [
              'We varied the activation threshold $\\tau$ across four values: 0.5, 1.0, 1.5, and 2.0. As $\\tau$ rises from 0.5 to 2.0, the percentage of unstable days decreases from 19.8% to 4.0%. However, the out-of-sample Sharpe ratio remains remarkably steady between 0.8068 and 0.8075 across all settings.',
              'This confirms that the framework is not brittle to hyperparameter tuning: the primary stabilizing mechanism is the quadratic regularization and concentration bounding objective, while the exact trigger threshold provides robust boundary adaptation.',
            ],
          },
          {
            id: 'subsec-ablation-models',
            number: 'B.',
            title: 'Four-Model Ablation Study',
            paragraphs: [
              'We evaluated four distinct configurations over the identical 2015–2025 out-of-sample test window: (1) Equal Weight benchmark, (2) Minimum Variance with Ledoit-Wolf shrinkage, (3) Governance without regime switching (fixed $\\lambda_g = 1, u_g = 0.35$), and (4) the Full Governance Framework.',
            ],
            tables: [
              {
                id: 'tbl-ablation',
                number: 'TABLE IV',
                title: 'ABLATION RESULTS (OUT-OF-SAMPLE 2015–2025)',
                headers: ['Ablation Model', 'Annual Return', 'Volatility', 'Sharpe Ratio', 'Max Drawdown', '95% CVaR'],
                rows: [
                  ['Equal Weight', '17.09%', '18.42%', '0.8190', '-36.01%', '-0.0283'],
                  ['Minimum Variance (Ledoit-Wolf)', '9.81%', '14.63%', '0.5338', '-34.07%', '-0.0218'],
                  ['Governance (No Regime Switching)', '16.64%', '18.12%', '0.8075', '-35.94%', '-0.0279'],
                  ['Full Governance Framework', '16.65%', '18.15%', '0.8071', '-35.90%', '-0.0279'],
                ],
                note: 'Net of 10 bps transaction costs. Minimum variance suffers a 42% drop in return; our framework retains full equity upside.',
              },
            ],
          },
        ],
      },
      {
        id: 'sec-discussion',
        number: 'VI.',
        title: 'Discussion & Multi-Agent Compatibility',
        paragraphs: [
          'An essential finding of this study is the value of empirical honesty. Many quantitative studies in machine learning report dramatic out-of-sample alpha by fitting complex non-linear models to financial return noise. In our rigorous 20-year backtest with expanding normalization and transaction costs, we find zero evidence of alpha generation.',
          'Instead, the genuine value of supervisory governance lies in risk containment, compliance assurance, and operational auditability: the supervisor prevents catastrophic concentration in deteriorating covariance assets and guarantees that human fiduciary mandates (such as maximum single-name exposure and low portfolio turnover) are strictly respected.',
          'From an architectural standpoint, the framework decomposes cleanly into five autonomous roles: (1) Data Ingestion Sentinel, (2) Multi-Channel Instability Monitor, (3) Governance Policy Coordinator, (4) Ledoit-Wolf Convex Optimizer, and (5) Audit & Trade Logger. This role decomposition maps directly to multi-agent architectures (MAS) commonly deployed in financial institutions for distributed risk governance.',
        ],
      },
      {
        id: 'sec-conclusion',
        number: 'VII.',
        title: 'Limitations & Concluding Remarks',
        paragraphs: [
          'Several limitations of this study should be recognized: (1) The test universe was restricted to 18 highly liquid U.S. equities, which limits the scope of idiosyncratic diversification; (2) Survivorship bias is present as assets were selected from current large-cap constituents; (3) The composite instability index assumes linear weights across standardized channels; and (4) The 21-day rebalancing frequency was held fixed rather than dynamically accelerated during volatility spikes.',
          'In conclusion, this paper demonstrates that supervisory governance provides a transparent, low-turnover, and mathematically grounded approach to stabilizing portfolio allocations under market instability. By combining covariance drift, rolling volatility, and correlation stress into an interpretable indicator and modulating quadratic concentration penalties within a unified convex optimization framework, the system preserves full diversification and mitigates tail risk without requiring brittle heuristic switches or black-box predictive models.',
        ],
      },
    ],
    references: [
      { index: 1, citation: 'V. V. Acharya, R. F. Engle, and M. Richardson, "Capital shortfall: A new approach to measuring systemic risk," American Economic Review, vol. 102, no. 3, pp. 59–64, 2012.', doi: '10.1257/aer.102.3.59' },
      { index: 2, citation: 'R. Almgren and N. Chriss, "Optimal execution of portfolio transactions," Journal of Risk, vol. 3, no. 2, pp. 5–40, 2001.' },
      { index: 3, citation: 'A. Ang and G. Bekaert, "International asset allocation with regime shifts," Review of Financial Studies, vol. 15, no. 4, pp. 1137–1187, 2002.', doi: '10.1093/rfs/15.4.1137' },
      { index: 4, citation: 'S. Basak and A. Shapiro, "Value-at-risk-based risk management: Optimal policies and asset prices," Review of Financial Studies, vol. 14, no. 2, pp. 371–405, 2001.', doi: '10.1093/rfs/14.2.371' },
      { index: 5, citation: 'J.-P. Bouchaud and M. Potters, "Financial applications of random matrix theory: A short review," arXiv preprint arXiv:0910.1205, 2009.' },
      { index: 6, citation: 'J. Y. Campbell, M. Lettau, B. G. Malkiel, and Y. Xu, "Have individual stocks become more volatile? An empirical exploration of idiosyncratic risk," Journal of Finance, vol. 56, no. 1, pp. 1–43, 2001.', doi: '10.1111/0022-1082.00318' },
      { index: 7, citation: 'R. Couillet and M. McKay, "Large dimensional analysis and optimization of robust shrinkage covariance matrix estimators," Journal of Multivariate Analysis, vol. 131, pp. 99–120, 2014.', doi: '10.1016/j.jmva.2014.06.018' },
      { index: 8, citation: 'V. DeMiguel, L. Garlappi, and R. Uppal, "Optimal versus naive diversification: How inefficient is the 1/N portfolio strategy?" Review of Financial Studies, vol. 22, no. 5, pp. 1915–1953, 2009.', doi: '10.1093/rfs/hhm075' },
      { index: 9, citation: 'R. J. Elliott, L. Aggoun, and J. B. Moore, Hidden Markov Models: Estimation and Control. Springer, New York, 2010.' },
      { index: 10, citation: 'R. F. Engle and K. Sheppard, "Theoretical and empirical properties of dynamic conditional correlation multivariate GARCH," NBER Working Paper 8554, 2001.', doi: '10.3386/w8554' },
      { index: 11, citation: 'F. Espiga-Fernandez, "A systematic approach to portfolio optimization under dynamic risk," Quantitative Finance Letters, vol. 4, pp. 22–34, 2018.' },
      { index: 12, citation: 'M. Guidolin and A. Timmermann, "Asset allocation under multivariate regime switching," Journal of Economic Dynamics and Control, vol. 31, no. 11, pp. 3503–3544, 2007.', doi: '10.1016/j.jedc.2006.12.004' },
      { index: 13, citation: 'J. D. Hamilton and R. Susmel, "Autoregressive conditional heteroskedasticity and changes in regime," Journal of Econometrics, vol. 64, no. 1-2, pp. 307–333, 1994.', doi: '10.1016/0304-4076(94)90067-7' },
      { index: 14, citation: 'J. Iqbal, "Application of regime switching and random matrix theory in portfolio optimization," Computational Economics, vol. 58, no. 3, pp. 697–721, 2021.' },
      { index: 15, citation: 'C. Kirby and B. Ostdiek, "It\'s all in the timing: Volatility timing, dynamic trading, and return predictability," Journal of Financial and Quantitative Analysis, vol. 47, no. 3, pp. 475–509, 2012.' },
      { index: 16, citation: 'I. Kovalenko, "Active portfolio management using robust optimization," Annals of Operations Research, vol. 299, no. 1, pp. 411–435, 2021.' },
      { index: 17, citation: 'L. Laloux, P. Cizeau, J.-P. Bouchaud, and M. Potters, "Noise dressing of financial correlation matrices," Physical Review Letters, vol. 83, no. 7, pp. 1467–1470, 1999.', doi: '10.1103/PhysRevLett.83.1467' },
      { index: 18, citation: 'O. Ledoit and M. Wolf, "A well-conditioned estimator for large-dimensional covariance matrices," Journal of Multivariate Analysis, vol. 88, no. 2, pp. 365–411, 2004.', doi: '10.1016/S0047-259X(03)00096-4' },
      { index: 19, citation: 'A. W. Lo, "The adaptive markets hypothesis: Market efficiency from an evolutionary perspective," Journal of Portfolio Management, vol. 30, no. 5, pp. 15–29, 2004.', doi: '10.3905/jpm.2004.442611' },
      { index: 20, citation: 'F. Longin and B. Solnik, "Extreme correlation of international equity markets," Journal of Finance, vol. 56, no. 2, pp. 649–676, 2001.', doi: '10.1111/0022-1082.00340' },
      { index: 21, citation: 'M. Lopez de Prado, "Building diversified portfolios that outperform out of sample," Journal of Portfolio Management, vol. 42, no. 4, pp. 59–69, 2016.', doi: '10.3905/jpm.2016.42.4.059' },
      { index: 22, citation: 'H. Markowitz, "Portfolio selection," Journal of Finance, vol. 7, no. 1, pp. 77–91, 1952.', doi: '10.1111/j.1540-6261.1952.tb01525.x' },
      { index: 23, citation: 'R. O. Michaud, "The Markowitz optimization enigma: Is \'optimized\' optimal?" Financial Analysts Journal, vol. 45, no. 1, pp. 31–42, 1989.', doi: '10.2469/faj.v45.n1.31' },
      { index: 24, citation: 'B. Mulvey and H. G. Zhao, "Global asset allocation with regime switching," Operations Research, vol. 52, no. 6, pp. 841–855, 2004.' },
      { index: 25, citation: 'A. Penev, "Multivariate regime-switching models for asset allocation: A survey," Journal of Banking & Finance, vol. 37, no. 8, pp. 3011–3024, 2013.' },
      { index: 26, citation: 'F. Rapisarda, D. Brigo, and F. Mercurio, "Parameterizing correlation matrices," Risk Magazine, vol. 20, no. 11, pp. 88–92, 2007.' },
      { index: 27, citation: 'T. Roncalli, Introduction to Risk Parity and Budgeting. CRC Press, Boca Raton, 2013.' },
      { index: 28, citation: 'R. T. Rockafellar and S. Uryasev, "Optimization of conditional value-at-risk," Journal of Risk, vol. 2, no. 3, pp. 21–41, 2000.' },
      { index: 29, citation: 'W. F. Sharpe, "Capital asset prices: A theory of market equilibrium under conditions of risk," Journal of Finance, vol. 19, no. 3, pp. 425–442, 1964.' },
      { index: 30, citation: 'A. Timmermann, "Elusive return predictability," International Journal of Forecasting, vol. 24, no. 1, pp. 1–18, 2008.' },
      { index: 31, citation: 'R. Tibshirani, "Regression shrinkage and selection via the lasso," Journal of the Royal Statistical Society: Series B, vol. 58, no. 1, pp. 267–288, 1996.' },
      { index: 32, citation: 'M. Wooldridge, An Introduction to MultiAgent Systems, 2nd ed. John Wiley & Sons, Chichester, 2009.' },
    ],
  },
};
