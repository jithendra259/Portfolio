'use client';

import React, { useState } from 'react';
import { Activity, BarChart3, Cpu, ShieldAlert, Sparkles, TrendingUp, Zap } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ProjectChartsProps {
  projectId: string;
}

// -------------------------------------------------------------
// DATASETS PER PROJECT
// -------------------------------------------------------------

// 1. ADAPTIVE PORTFOLIO GOVERNANCE DATA
const portfolioStrategyData = [
  { strategy: 'G-CVaR (Ours)', sharpe: 0.61, sortino: 0.84, cvar: 2.39, returnRate: 12.82 },
  { strategy: 'Standard CVaR', sharpe: 0.62, sortino: 0.82, cvar: 2.45, returnRate: 12.87 },
  { strategy: 'HRP', sharpe: 0.61, sortino: 0.79, cvar: 2.82, returnRate: 11.45 },
  { strategy: 'Mean-Variance', sharpe: 0.6, sortino: 0.74, cvar: 2.95, returnRate: 10.89 },
  { strategy: 'Risk Parity', sharpe: 0.6, sortino: 0.76, cvar: 2.91, returnRate: 11.2 },
  { strategy: 'Equal Weight', sharpe: 0.58, sortino: 0.71, cvar: 3.22, returnRate: 9.8 },
];

const portfolioCrisisData = [
  { episode: '2008 GFC', gcvar: 66.3, equalWeight: 76.2, savings: 13.0 },
  { episode: '2011 Debt', gcvar: 18.4, equalWeight: 24.5, savings: 24.9 },
  { episode: '2015 China', gcvar: 12.2, equalWeight: 16.8, savings: 27.4 },
  { episode: '2018 Vol', gcvar: 14.5, equalWeight: 19.1, savings: 24.1 },
  { episode: '2020 COVID', gcvar: 41.4, equalWeight: 39.3, savings: -5.3 },
  { episode: '2022 Hikes', gcvar: 24.8, equalWeight: 31.2, savings: 20.5 },
];

// 2. PERSONALISED AQI SYSTEM DATA
const aqiModelData = [
  { pollutant: 'PM2.5', lstm: 0.99, xgboost: 0.93, arima: 0.78, markov: 0.71 },
  { pollutant: 'PM10', lstm: 0.92, xgboost: 0.95, arima: 0.76, markov: 0.69 },
  { pollutant: 'NO2', lstm: 0.89, xgboost: 0.93, arima: 0.74, markov: 0.65 },
  { pollutant: 'SO2', lstm: 0.91, xgboost: 0.89, arima: 0.71, markov: 0.62 },
  { pollutant: 'CO', lstm: 0.87, xgboost: 0.88, arima: 0.92, markov: 0.67 },
  { pollutant: 'O3', lstm: 0.88, xgboost: 0.9, arima: 0.93, markov: 0.64 },
  { pollutant: 'Overall AQI', lstm: 0.9, xgboost: 0.91, arima: 0.76, markov: 0.72 },
];

const aqiForecastTimeline = [
  { hour: '00:00', actual: 68, predicted: 67, upper: 74, lower: 61 },
  { hour: '04:00', actual: 52, predicted: 54, upper: 60, lower: 48 },
  { hour: '08:00', actual: 118, predicted: 114, upper: 124, lower: 104 },
  { hour: '12:00', actual: 95, predicted: 98, upper: 106, lower: 89 },
  { hour: '16:00', actual: 82, predicted: 80, upper: 88, lower: 72 },
  { hour: '20:00', actual: 135, predicted: 132, upper: 143, lower: 121 },
  { hour: '24:00', actual: 90, predicted: 88, upper: 97, lower: 79 },
];

// 3. SWARM ROBOTICS DATA
const swarmTimeData = [
  { task: 'Ploughing', manual: 8.5, singleRobot: 4.2, swarm5: 0.9 },
  { task: 'Seed Sowing', manual: 6.2, singleRobot: 3.1, swarm5: 0.7 },
  { task: 'Pesticide Spray', manual: 4.8, singleRobot: 2.4, swarm5: 0.5 },
  { task: 'Irrigation Routing', manual: 5.0, singleRobot: 2.5, swarm5: 0.4 },
];

const densenetAccuracyData = [
  { epoch: 'E10', trainAcc: 74.2, valAcc: 72.1 },
  { epoch: 'E20', trainAcc: 83.5, valAcc: 81.8 },
  { epoch: 'E30', trainAcc: 89.1, valAcc: 87.4 },
  { epoch: 'E40', trainAcc: 93.8, valAcc: 91.2 },
  { epoch: 'E50', trainAcc: 96.2, valAcc: 93.4 },
];

// 4. AGENTIC CHATBOT DATA
const chatbotComparisonData = [
  { metric: 'Arithmetic Precision (%)', agentic: 100, cotPrompt: 68, rawLLM: 42 },
  { metric: 'Constraint Verification (%)', agentic: 100, cotPrompt: 55, rawLLM: 25 },
  { metric: 'Audit Log Integrity (%)', agentic: 100, cotPrompt: 40, rawLLM: 12 },
  { metric: 'Zero-Hallucination Rate (%)', agentic: 96.9, cotPrompt: 72, rawLLM: 48 },
];

// -------------------------------------------------------------
// CHART CONFIGURATIONS
// -------------------------------------------------------------

const portfolioConfig: ChartConfig = {
  sharpe: { label: 'Sharpe Ratio', color: 'hsl(199, 89%, 48%)' },
  sortino: { label: 'Sortino Ratio', color: 'hsl(160, 84%, 39%)' },
  cvar: { label: 'Tail Risk CVaR (95%) %', color: 'hsl(340, 82%, 52%)' },
  gcvar: { label: 'G-CVaR (Ours)', color: 'hsl(199, 89%, 48%)' },
  equalWeight: { label: 'Equal Weight Baseline', color: 'hsl(215, 16%, 47%)' },
};

const aqiConfig: ChartConfig = {
  lstm: { label: 'LSTM / BiLSTM', color: 'hsl(199, 89%, 48%)' },
  xgboost: { label: 'XGBoost (Selected)', color: 'hsl(160, 84%, 39%)' },
  arima: { label: 'ARIMA (Seasonal)', color: 'hsl(38, 92%, 50%)' },
  markov: { label: 'Markov Chains', color: 'hsl(280, 65%, 60%)' },
  actual: { label: 'Actual IAQI', color: 'hsl(199, 89%, 48%)' },
  predicted: { label: 'Ensemble Forecast', color: 'hsl(160, 84%, 39%)' },
};

const swarmConfig: ChartConfig = {
  manual: { label: 'Manual Labor', color: 'hsl(340, 82%, 52%)' },
  singleRobot: { label: 'Single Robot', color: 'hsl(38, 92%, 50%)' },
  swarm5: { label: '5-Robot Swarm', color: 'hsl(160, 84%, 39%)' },
  trainAcc: { label: 'Training Acc (%)', color: 'hsl(199, 89%, 48%)' },
  valAcc: { label: 'Validation Acc (%)', color: 'hsl(160, 84%, 39%)' },
};

const chatbotConfig: ChartConfig = {
  agentic: { label: 'Agentic Blackboard (Ours)', color: 'hsl(160, 84%, 39%)' },
  cotPrompt: { label: 'Chain-of-Thought Prompting', color: 'hsl(199, 89%, 48%)' },
  rawLLM: { label: 'Monolithic LLM Baseline', color: 'hsl(340, 82%, 52%)' },
};

// 5. SUPERVISORY XAI UNIVERSE SHARPE DATA
const universeSharpeData = [
  { universe: 'U1 (Tech)', baseline: 0.52, supervisory: 0.58 },
  { universe: 'U2 (Europe)', baseline: 0.45, supervisory: 0.52 },
  { universe: 'U3 (High Beta)', baseline: 0.54, supervisory: 0.61 },
  { universe: 'U4 (US Sectors)', baseline: 0.56, supervisory: 0.63 },
  { universe: 'U5 (Multi-Asset)', baseline: 0.51, supervisory: 0.59 },
];

const supervisoryConfig: ChartConfig = {
  supervisory: { label: 'Supervisory Governance (Ours)', color: 'hsl(199, 89%, 48%)' },
  baseline: { label: 'Static Benchmark', color: 'hsl(215, 16%, 47%)' },
};

export function ProjectCharts({ projectId }: ProjectChartsProps) {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');

  // 1. ADAPTIVE PORTFOLIO GOVERNANCE / REGIME ADAPTIVE SUPERVISORY
  if (
    projectId === 'adaptive-portfolio-governance' ||
    projectId === 'regime-adaptive-supervisory-governance'
  ) {
    return (
      <div className="mt-10 space-y-6">
        {/* Header with Switcher Tabs */}
        <div className="border-border/40 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-cyan-600 uppercase dark:text-cyan-400">
              <TrendingUp className="size-3.5" />
              <span>Interactive Empirical Graphs (shadcn/ui)</span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-950 sm:text-lg dark:text-white">
              Multi-Universe Statistical Performance &amp; Crisis Stress Visualizer
            </h3>
          </div>

          <div className="flex items-center self-start rounded-xl border border-slate-300 bg-slate-200/80 p-1 sm:self-auto dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('primary')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'primary'
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Risk-Adjusted Return Metrics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('secondary')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'secondary'
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Crisis Drawdown Comparison
            </button>
          </div>
        </div>

        {/* Chart View */}
        <div className="py-4">
          {activeTab === 'primary' ? (
            <div>
              <div className="mb-6 flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center dark:border-white/5">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                    Strategy Sharpe &amp; Sortino Ratios (2005–2025 across 552 Windows)
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
                    G-CVaR balances return stability with a 25.9% reduction in CVaR tail risk.
                  </p>
                </div>
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
                  552 Rolling Windows
                </span>
              </div>

              <ChartContainer config={portfolioConfig} className="h-[340px] w-full">
                <BarChart
                  data={portfolioStrategyData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-15"
                  />
                  <XAxis
                    dataKey="strategy"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="sharpe" fill="var(--color-sharpe)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="sortino" fill="var(--color-sortino)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center dark:border-white/5">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                    Maximum Crisis Drawdown (%) — G-CVaR vs. Equal Weight
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
                    Adaptive sigmoid gating prevents fire-sale contagion during major financial
                    market crashes.
                  </p>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  Up to 27.4% Drawdown Reduction
                </span>
              </div>

              <ChartContainer config={portfolioConfig} className="h-[340px] w-full">
                <BarChart
                  data={portfolioCrisisData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-15"
                  />
                  <XAxis
                    dataKey="episode"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                    unit="%"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="gcvar" fill="var(--color-gcvar)" radius={[6, 6, 0, 0]} />
                  <Bar
                    dataKey="equalWeight"
                    fill="var(--color-equalWeight)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (projectId === 'supervisory-portfolio-xai-governance') {
    return (
      <div className="mt-10 space-y-6">
        <div className="border-border/40 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-cyan-600 uppercase dark:text-cyan-400">
              <Cpu className="size-3.5" />
              <span>Supervisory Governance &amp; XAI Fidelity (shadcn/ui)</span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-950 sm:text-lg dark:text-white">
              Multi-Universe Risk-Adjusted Sharpe (U1–U5) &amp; Deterministic Accuracy
            </h3>
          </div>

          <div className="flex items-center self-start rounded-xl border border-slate-300 bg-slate-200/80 p-1 sm:self-auto dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('primary')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'primary'
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Universe Sharpe (U1–U5)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('secondary')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'secondary'
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              XAI Zero-Hallucination (%)
            </button>
          </div>
        </div>

        <div className="py-4">
          {activeTab === 'primary' ? (
            <div>
              <div className="mb-6 flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center dark:border-white/5">
                <div>
                  <h4 className="text-sm font-bold text-slate-950 sm:text-base dark:text-white">
                    Average Sharpe Ratio Across Asset Universes U1–U5 (2005–2025)
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
                    Supervisory Ledoit-Wolf shrinkage consistently stabilizes risk-adjusted returns
                    across sector and global universes.
                  </p>
                </div>
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
                  U4 US Sectors: 0.63 Sharpe
                </span>
              </div>

              <ChartContainer config={supervisoryConfig} className="h-[340px] w-full">
                <BarChart
                  data={universeSharpeData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-15"
                  />
                  <XAxis
                    dataKey="universe"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <YAxis
                    domain={[0, 0.8]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="supervisory"
                    fill="var(--color-supervisory)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar dataKey="baseline" fill="var(--color-baseline)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          ) : (
            <div>
              <div className="mb-6 border-b border-slate-100 pb-4 dark:border-white/5">
                <h4 className="text-sm font-bold text-slate-950 sm:text-base dark:text-white">
                  Regulatory Compliance &amp; Zero-Hallucination Rate (Ours vs. Prompted LLMs)
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
                  Decoupling numerical calculation from local Mistral-7B narrative synthesis ensures
                  100% mathematical auditability.
                </p>
              </div>

              <ChartContainer config={chatbotConfig} className="h-[340px] w-full">
                <BarChart
                  data={chatbotComparisonData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-15"
                  />
                  <XAxis
                    dataKey="metric"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                    unit="%"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="agentic" fill="var(--color-agentic)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cotPrompt" fill="var(--color-cotPrompt)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rawLLM" fill="var(--color-rawLLM)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (projectId === 'personalised-aqi-system') {
    return (
      <div className="mt-10 space-y-6">
        <div className="border-border/40 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
              <Activity className="size-3.5" />
              <span>Interactive Model Benchmarks (shadcn/ui)</span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-950 sm:text-lg dark:text-white">
              Multi-Pollutant Machine Learning Accuracy &amp; 24-Hour Forecast Curve
            </h3>
          </div>

          <div className="flex items-center self-start rounded-xl border border-slate-300 bg-slate-200/80 p-1 sm:self-auto dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('primary')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'primary'
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Model R² Comparison
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('secondary')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'secondary'
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              24-Hour Forecast Curve
            </button>
          </div>
        </div>

        <div className="py-4">
          {activeTab === 'primary' ? (
            <div>
              <div className="mb-6 border-b border-slate-100 pb-4 dark:border-white/5">
                <h4 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                  Pollutant-Wise R² Model Fit (XGBoost vs. LSTM vs. ARIMA vs. Markov)
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
                  Dynamic selection assigns the best predictive architecture per pollutant type.
                </p>
              </div>

              <ChartContainer config={aqiConfig} className="h-[340px] w-full">
                <BarChart data={aqiModelData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-15"
                  />
                  <XAxis
                    dataKey="pollutant"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <YAxis
                    domain={[0.5, 1.0]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="xgboost" fill="var(--color-xgboost)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lstm" fill="var(--color-lstm)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="arima" fill="var(--color-arima)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="markov" fill="var(--color-markov)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          ) : (
            <div>
              <div className="mb-6 border-b border-slate-100 pb-4 dark:border-white/5">
                <h4 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                  24-Hour IAQI Tracking Curve: Forecast vs. Ground Truth
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
                  Ensemble predictions with 95% Monte Carlo confidence intervals.
                </p>
              </div>

              <ChartContainer config={aqiConfig} className="h-[340px] w-full">
                <AreaChart
                  data={aqiForecastTimeline}
                  margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-15"
                  />
                  <XAxis
                    dataKey="hour"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--color-actual)"
                    fill="var(--color-actual)"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="var(--color-predicted)"
                    fill="var(--color-predicted)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (projectId === 'swarm-robots-agriculture') {
    return (
      <div className="mt-10 space-y-6">
        <div className="border-border/40 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
              <Zap className="size-3.5" />
              <span>Robotic Efficiency Metrics (shadcn/ui)</span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-950 sm:text-lg dark:text-white">
              Field Execution Speedup &amp; DenseNet-121 CNN Learning Curve
            </h3>
          </div>

          <div className="flex items-center self-start rounded-xl border border-slate-300 bg-slate-200/80 p-1 sm:self-auto dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('primary')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'primary'
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Field Time per Acre (Hours)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('secondary')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'secondary'
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              DenseNet-121 Accuracy Curve
            </button>
          </div>
        </div>

        <div className="py-4">
          {activeTab === 'primary' ? (
            <div>
              <div className="mb-6 border-b border-slate-100 pb-4 dark:border-white/5">
                <h4 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                  Field Labor Hours Reduction: Manual vs. Single Robot vs. 5-Robot Swarm
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
                  Coordinated multi-agent robotics delivers over 85% operational time reduction.
                </p>
              </div>

              <ChartContainer config={swarmConfig} className="h-[340px] w-full">
                <BarChart
                  data={swarmTimeData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-15"
                  />
                  <XAxis
                    dataKey="task"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                    unit="h"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="manual" fill="var(--color-manual)" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="singleRobot"
                    fill="var(--color-singleRobot)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar dataKey="swarm5" fill="var(--color-swarm5)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          ) : (
            <div>
              <div className="mb-6 border-b border-slate-100 pb-4 dark:border-white/5">
                <h4 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                  DenseNet-121 CNN Disease Detection Training &amp; Validation Curve
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
                  Reaches 93.4% validation accuracy across 50 training epochs.
                </p>
              </div>

              <ChartContainer config={swarmConfig} className="h-[340px] w-full">
                <LineChart
                  data={densenetAccuracyData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-15"
                  />
                  <XAxis
                    dataKey="epoch"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                  />
                  <YAxis
                    domain={[65, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-mono text-xs"
                    unit="%"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="trainAcc"
                    stroke="var(--color-trainAcc)"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="valAcc"
                    stroke="var(--color-valAcc)"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          )}
        </div>
      </div>
    );
  }

  // DEFAULT / CHATBOT PROJECT
  return (
    <div className="mt-10 space-y-6">
      <div className="border-border/40 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-cyan-600 uppercase dark:text-cyan-400">
            <Cpu className="size-3.5" />
            <span>Agentic Intelligence Evaluation (shadcn/ui)</span>
          </div>
          <h3 className="mt-1 text-base font-bold text-slate-950 sm:text-lg dark:text-white">
            Deterministic Solvers vs. Monolithic Generative LLMs
          </h3>
        </div>
      </div>

      <div className="py-4">
        <div className="mb-6 border-b border-slate-100 pb-4 dark:border-white/5">
          <h4 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
            Arithmetic Precision, Constraint Enforcing, and Audit Reliability
          </h4>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
            Decoupling language understanding from convex optimization ensures 100% mathematical
            fidelity.
          </p>
        </div>

        <ChartContainer config={chatbotConfig} className="h-[340px] w-full">
          <BarChart
            data={chatbotComparisonData}
            margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              className="opacity-15"
            />
            <XAxis
              dataKey="metric"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="font-mono text-xs"
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="font-mono text-xs"
              unit="%"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="agentic" fill="var(--color-agentic)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cotPrompt" fill="var(--color-cotPrompt)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rawLLM" fill="var(--color-rawLLM)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
