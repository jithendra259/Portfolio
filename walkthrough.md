# Comprehensive Section-to-Section Case Study Walkthrough

All three stock portfolio quantitative research papers (covering the 2005–2025 US equity universe across 11 sectors) have been fully populated section-by-section with their exact, authentic text, mathematical equations, empirical tables, figures, and citations extracted directly from their manuscripts.

---

## 1. Project Overview & Document Mapping

| Project Slug | Paper Title | Target Venue | Scope & Length | Key Formulation |
| :--- | :--- | :--- | :--- | :--- |
| [`regime-adaptive-supervisory-governance`](./data/projects/regime-adaptive-supervisory-governance.ts) | *Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization* | Springer Nature LNCS / 5th IJCACI 2026 | 12 Pages (Sections I–VII) | Unified quadratic program with continuous concentration caps & regularizer penalties |
| [`adaptive-portfolio-governance`](./data/projects/adaptive-portfolio-governance.ts) | *Multi-Agent Portfolio Governance with Graph-Regularized CVaR and Adaptive Contagion Penalization* | Elsevier Engineering Applications of AI (EAAI) | 23 Pages (Sections 1–8) | Bipartite SEC 13-F holdings graph, eigenvector centrality $c_i$, sigmoid gate $\gamma_t$, 5-Agent Blackboard |
| [`supervisory-portfolio-xai-governance`](./data/projects/supervisory-portfolio-xai-governance.ts) | *A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching, and Conversational Explainability* | Elsevier Computers & Operations Research / CAS | 25 Pages (Sections 1–6) | Composite Instability Index $I_t$, deterministic regime operator $\mathcal{R}$, Ledoit-Wolf shrinkage, 7-Agent DAG, local Mistral-7B XAI |

---

## 2. Section-by-Section Details

### Project 1: Springer Nature LNCS Conference Paper
- **Section I**: Introduction & Problem Motivation (Estimation fragility, supervisory approach, 3 contributions)
- **Section II**: Related Work & Foundations (Markowitz sensitivity, Ledoit-Wolf shrinkage, 1/N baseline, regime switching)
- **Section III**: Methodology & Problem Formulation
  - Subsection A: Universe and Data Representation (Equation 1: Returns $r_{i,t}$)
  - Subsection B: Supervisory Instability Monitor (Equation 2: Covariance drift, Equation 3: Expanding standardization, Equation 4: Composite $I_t$)
  - Subsection C: Regularized Allocation Formulation (Equation 5: Unified objective, Equation 6: Constraints)
  - Subsection D: Concentration Diagnostics & Rebalancing (Equation 7: HHI, 10 bps transaction model)
- **Section IV**: Empirical Evaluation
  - Table I: Instability Index Characteristics Across Crisis Windows
  - Table II: Out-of-Sample Performance Comparison (2015–2025)
  - Table III: Cross-Strategy Portfolio Concentration and Diversification
  - Figures 1–3: Regime-Annotated Equity Curve, Ablation Curves, Underwater Drawdown
- **Section V**: Ablation Study & Discussion (Table IV: Ablation results)
- **Section VI**: Limitations & Multi-Agent Compatibility (Centralized vs MAS role decomposition)
- **Section VII**: Conclusion (Stabilization without predictive claims)

### Project 2: Elsevier EAAI Journal Paper
- **Section 1**: Introduction (1.1 The Co-Ownership Problem, 1.2 Hypotheses H1–H4, 1.3 Contributions C1–C5)
- **Section 2**: Related Work & Theoretical Foundations (CVaR extensions, graph methods, Table I: MAS Framework Governance Comparison)
- **Section 3**: Mathematical Formulation
  - 3.1 Composite Instability Index (Equation 1: $I_t = 0.4 z_\sigma + 0.3 z_\rho + 0.3 z_{\text{MDD}}$)
  - 3.2 Bipartite Institutional Co-Ownership Network (Equation 2: One-mode projection $A$, Equation 3: Eigenvector centrality $c$)
  - 3.3 Sigmoid-Gated Adaptive Penalisation (Equation 4: Sigmoid gate $\gamma_t$)
  - 3.4 Graph-Regularized CVaR Optimization (Equation 5: G-CVaR linear program)
  - 3.5 Theoretical Properties: Joint Convexity & Solvability (Proposition 1 and proof)
- **Section 4**: System Architecture & Five-Agent Blackboard Pipeline (Agents 0–4 roles, Gradio HITL 3-way actions, MiFID II / EU AI Act audit logging)
- **Section 5**: Experimental Design & Empirical Setup (11 GICS sectors, 218 US equities, 552 rolling windows)
- **Section 6**: Results and Discussion
  - Table II: Multi-Strategy Performance Comparison (Universe U1 Technology)
  - Table III: Crisis-Period Isolation (2008 GFC, 2020 COVID, 2022 Rate Hikes)
  - Table IV: Ablation Analysis Across Market Regimes (Verifying Hypothesis H4)
  - Table V: Quantifying the Cost and Protection of HITL Governance Oversight (0.1264 Sharpe cost)
  - Table VI: Cross-Universe Performance Across 11 GICS Sectors
  - Figures 1–9: Pipeline schematic, Turbulence distribution, Contagion graph, Six-strategy comparison, Statistical validation, Ablation, Trust radar, HITL ablation, Latency benchmark
- **Section 7**: Limitations and Future Work (13-F reporting lag, crisis window sparsity, future GNN extensions)
- **Section 8**: Conclusion

### Project 3: Elsevier CAS Journal Paper
- **Section 1**: Introduction (Estimation risk paradox, opacity of quantitative AI, regulatory compliance mandates)
- **Section 2**: Literature Review & Theoretical Background (Mean-variance strain, shrinkage estimation, regime switching, composite signals, XAI expert systems)
- **Section 3**: Methodology & Mathematical Formulation
  - 3.1 Data Representation and Descriptive Statistics (Table I: 19 US equities summary statistics)
  - 3.2 The Composite Instability Index (Equations 1–4: Volatility $V_t$, Pairwise correlation $C_t$, Covariance Frobenius drift $\Delta_t$, Composite $I_t$)
  - 3.3 The Supervisory Governance Layer and Regime Operator (Equation 5: Deterministic threshold operator $\mathcal{R}(I_t)$)
  - 3.4 Shrinkage-Based Mean-Variance Optimisation (Equations 6–8: ShrunkMV program, James-Stein return shrinkage, Ledoit-Wolf covariance shrinkage)
  - 3.5 Governance Stability Metric (Equation 9: Weight churn metric $\mathcal{G}_t$)
  - 3.6 Rolling-Window Evaluation Design (51 quarterly non-overlapping windows)
- **Section 4**: Empirical Results & Statistical Validation
  - Table II: Out-of-Sample Performance Across 51 Quarterly Windows
  - Table III: Statistical Significance of Drawdown and Sharpe Improvements ($p < 0.001$)
  - Table IV: Performance During the March–April 2020 COVID-19 Liquidity Shock (65.5% drawdown reduction)
  - Table V: Sub-Period Performance Across Macroeconomic Environments
  - Table VI: Sensitivity Analysis Across Governance Thresholds $\tau$
  - Table VII: Cross-Universe Robustness Evaluation (Universes U1–U5)
- **Section 5**: System Implementation & Conversational Governance Interface
  - Table VIII: Seven-Agent Pipeline Roles, Inputs, and Data Contracts (Agents A0–A7)
  - 5.2 Conversational Governance Interface and Zero-Hallucination Guardrail
  - 5.3 Representative Governance Cycle: April 2020 Liquidity Shock (Equations 10–12: $I_t = 5.99$, EqualWeight activation, and authentic narrative transcript)
- **Section 6**: Conclusion (Summary of findings, limitations, future research)

---

## 3. UI/UX Verification
- **Dynamic Table of Contents (TOC)**: Automatically renders active sections and subsections, highlights the current reading position on scroll, and supports 1-click smooth navigation.
- **KaTeX Mathematical Typesetting**: Display equations and inline mathematical notation rendered crisply.
- **Unboxed Clean Aesthetics**: Figures and tables are displayed freely without enclosing card borders or artificial boxes.
- **Lightbox Zoom**: Clicking any research figure opens an interactive high-resolution zoom modal.
- **Compilation**: `pnpm exec tsc --noEmit` passed with 0 errors.
