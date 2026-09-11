import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  BookOpen,
  GitFork,
  Code2,
  Terminal,
  Activity,
  Workflow,
  Compass,
  Zap,
} from 'lucide-react';
import { PROJECT_DETAILS, ProjectDetail } from '@/lib/project-details';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';
import { ProjectPdfButton } from '@/components/ui/project-pdf-button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECT_DETAILS[id];

  if (!project) {
    return {
      title: 'Project Not Found | Kandula Jithendra Subramanyam',
    };
  }

  return {
    title: `${project.title} — Case Study | Jithendra M`,
    description: project.tagline || project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.tagline || project.description,
      type: 'article',
    },
  };
}

interface ParsedReportTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

function tryParseReportTable(block: string): ParsedReportTable | null {
  let lines = block.split('\n').map((l) => l.trimEnd()).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return null;

  let title: string | undefined = undefined;
  if (lines[0].trim().endsWith(':') && lines.length >= 3) {
    const candidate = lines[0].trim().replace(/:$/, '');
    if (/submitted by|under the guidance|under guidance|author|references|supervision|project submitted/i.test(candidate)) {
      return null;
    }
    title = candidate;
    lines = lines.slice(1);
  }

  if (lines.length < 2) return null;

  // Exclude narrative lists, bullet points, equations, credentials
  const firstLine = lines[0].trim();
  if (firstLine.startsWith('•') || firstLine.startsWith('-') || firstLine.startsWith('*') || /^\d+\./.test(firstLine)) return null;
  if (firstLine.includes('min_w') || firstLine.includes('min_{') || firstLine.includes('λ_t') || firstLine.includes('H_l =') || firstLine.includes('Z_{') || firstLine.includes('D_t =') || firstLine.includes('σ_spike')) return null;
  if (firstLine.includes('Author:') || firstLine.includes('Submitted by:') || firstLine.includes('In partial fulfillment')) return null;
  if (lines.some((l) => /— 20191ECE/i.test(l))) return null;

  // Multi-space (>=2) or tab separated columns
  const parsedRows = lines.map((line) => line.trim().split(/\s{2,}|\t+/).filter(Boolean));

  // Check column consistency
  const colCounts = parsedRows.map((r) => r.length);
  const minCols = Math.min(...colCounts);
  const maxCols = Math.max(...colCounts);

  if (minCols >= 2 && maxCols <= 9 && maxCols - minCols <= 1) {
    const dataRows = parsedRows.slice(1);
    const hasNumbersOrMetrics = dataRows.some((r) => r.some((c) => /[\d%−\-]/.test(c)));
    if (hasNumbersOrMetrics) {
      const firstRowHasOnlyText = !parsedRows[0].some((c) => /^\d+(\.\d+)?%?$/.test(c));
      const avgHeaderLen = parsedRows[0].reduce((sum, c) => sum + c.length, 0) / parsedRows[0].length;
      if (firstRowHasOnlyText && avgHeaderLen <= 32) {
        return {
          title,
          headers: parsedRows[0],
          rows: dataRows,
        };
      }
    }
  }

  return null;
}

function renderReportMatter(content: string) {
  const blocks = content.split(/\n\s*\n/).filter((b) => b.trim().length > 0);

  return (
    <div className="space-y-4">
      {blocks.map((block, bIdx) => {
        const table = tryParseReportTable(block);
        if (table) {
          return (
            <div
              key={bIdx}
              className="my-5 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] shadow-sm"
            >
              {table.title && (
                <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-white/[0.05] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-200">
                    {table.title}
                  </span>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                    {table.rows.length} {table.rows.length === 1 ? 'row' : 'rows'}
                  </span>
                </div>
              )}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-100/60 dark:bg-white/[0.04]">
                    <TableRow className="border-b border-slate-200 dark:border-white/10">
                      {table.headers.map((header, hIdx) => {
                        const isNumeric = table.rows.some((row) =>
                          row[hIdx] && /^[\d$€£¥%−\-.,\s]+$/.test(row[hIdx].trim())
                        );
                        return (
                          <TableHead
                            key={hIdx}
                            className={`text-xs font-bold text-slate-900 dark:text-white py-2.5 px-3 sm:px-4 ${
                              isNumeric && hIdx > 0 ? 'text-right' : 'text-left'
                            }`}
                          >
                            {header}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table.rows.map((row, rIdx) => (
                      <TableRow
                        key={rIdx}
                        className="border-b border-slate-200/70 dark:border-white/5 hover:bg-cyan-500/[0.04] transition-colors"
                      >
                        {row.map((cell, cIdx) => {
                          const isNumeric = /^[\d$€£¥%−\-.,\s]+$/.test(cell.trim());
                          return (
                            <TableCell
                              key={cIdx}
                              className={`py-2.5 px-3 sm:px-4 text-xs font-mono text-slate-700 dark:text-neutral-300 ${
                                isNumeric && cIdx > 0
                                  ? 'text-right font-semibold text-slate-900 dark:text-white'
                                  : 'text-left'
                              }`}
                            >
                              {cell}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          );
        }

        return (
          <p
            key={bIdx}
            className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line m-0"
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECT_DETAILS[id];

  if (!project) {
    notFound();
  }

  // Find previous and next projects for quick carousel navigation
  const projectKeys = Object.keys(PROJECT_DETAILS);
  const currentIndex = projectKeys.indexOf(id);
  const prevProjectKey = currentIndex > 0 ? projectKeys[currentIndex - 1] : projectKeys[projectKeys.length - 1];
  const nextProjectKey = currentIndex < projectKeys.length - 1 ? projectKeys[currentIndex + 1] : projectKeys[0];
  const prevProject = PROJECT_DETAILS[prevProjectKey];
  const nextProject = PROJECT_DETAILS[nextProjectKey];

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#0d0f14] text-slate-900 dark:text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white transition-colors duration-300">
      
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      {/* ============================================================ */}
      {/* 1. TOP STICKY BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0d0f14]/80 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Back button & Breadcrumb */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-200 shrink-0"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Portfolio</span>
            </Link>

            <span className="text-slate-300 dark:text-neutral-700 hidden sm:inline">/</span>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono truncate text-slate-500 dark:text-neutral-400">
              <span>Projects</span>
              <span>/</span>
              <span className="text-slate-900 dark:text-neutral-200 font-semibold truncate">
                {project.category}
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 transition-all"
              >
                <Code2 className="size-3.5" />
                <span>GitHub</span>
                <ExternalLink className="size-3 opacity-60" />
              </a>
            )}

            {project.researchLink && (
              <ProjectPdfButton
                url={project.researchLink}
                title={project.title}
                subtitle={project.tagline || project.description}
              />
            )}

            <div className="pl-1">
              <DayNightSwitch />
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN HERO HEADER */}
      {/* ============================================================ */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Project Meta Pill Tags */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-cyan-500 animate-pulse" />
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 font-medium">
            {project.period}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="size-3" />
            {project.status}
          </span>
        </div>

        {/* Title and Tagline */}
        <div className="max-w-4xl mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1] mb-6">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-neutral-300 leading-relaxed font-normal">
            {project.tagline}
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-12 sm:pb-16 border-b border-slate-200 dark:border-white/10">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-neutral-200 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
            >
              <Code2 className="size-4" />
              <span>Explore Code on GitHub</span>
              <ExternalLink className="size-3.5 opacity-70" />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-300 dark:hover:bg-cyan-500/30 border border-cyan-500/30 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
            >
              <Zap className="size-4" />
              <span>Live Demonstration</span>
              <ExternalLink className="size-3.5 opacity-70" />
            </a>
          )}

          {project.researchLink && (
            <a
              href={project.researchLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
            >
              <BookOpen className="size-4" />
              <span>Read Research Manuscript (PDF)</span>
              <ExternalLink className="size-3.5 opacity-70" />
            </a>
          )}

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white bg-slate-200/70 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all cursor-pointer"
          >
            <span>All Selected Work</span>
          </Link>
        </div>


        {/* ============================================================ */}
        {/* 3. PERFORMANCE & SYSTEM METRICS */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 mb-2 font-bold tracking-widest">
            <Activity className="size-3.5" />
            <span>Benchmark Performance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mb-8 tracking-tight">
            Key Architectural Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="relative group p-6 rounded-2xl bg-white/80 dark:bg-[#12151d]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-sm hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="size-2 rounded-full bg-cyan-500/80 mb-4 group-hover:scale-125 transition-transform" />
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-950 dark:text-white tracking-tight mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold mb-3">
                    {metric.label}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed font-normal">
                    {metric.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Breakdown Table */}
          <div className="mt-8 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#12151d]/90 backdrop-blur-xl shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-slate-100/90 dark:bg-[#161a24] border-b border-slate-200 dark:border-white/10">
                    <TableHead className="w-1/4 font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                      Metric Indicator
                    </TableHead>
                    <TableHead className="w-1/4 font-mono text-xs uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400">
                      Evaluated Benchmark
                    </TableHead>
                    <TableHead className="w-1/2 font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                      Architectural Impact &amp; Verification Scope
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.metrics.map((metric, idx) => (
                    <TableRow
                      key={idx}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-colors border-b border-slate-100 dark:border-white/5"
                    >
                      <TableCell className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {metric.label}
                      </TableCell>
                      <TableCell className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm">
                        {metric.value}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-normal">
                        {metric.detail}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. PROBLEM & ARCHITECTURAL SOLUTION */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* The Problem / Inefficiency */}
            <div className="p-7 sm:p-9 rounded-3xl bg-rose-50/60 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-900/30 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-rose-700 dark:text-rose-400 font-bold tracking-wider mb-4 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/30">
                  <AlertTriangle className="size-3.5" />
                  <span>The Engineering Problem</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-4">
                  Why Existing Paradigms Fall Short
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-neutral-300 leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>
            </div>

            {/* The Engineered Solution */}
            <div className="p-7 sm:p-9 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/30 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold tracking-wider mb-4 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30">
                  <ShieldCheck className="size-3.5" />
                  <span>The Technical Architecture</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-4">
                  Engineered Solution & Guarantees
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-neutral-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. SYSTEM ARCHITECTURE PIPELINE */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 mb-2 font-bold tracking-widest">
              <Workflow className="size-3.5" />
              <span>Multi-Stage Execution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              End-to-End System Architecture
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Deconstructed multi-agent execution pipeline illustrating deterministic data flow, solver interfaces, and verification loops.
            </p>
          </div>

          {/* Sticky Header Architecture Pipeline Table */}
          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#12151d]/90 backdrop-blur-xl shadow-sm">
            <div className="max-h-[520px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-slate-100/95 dark:hover:bg-[#161a24] bg-slate-100/90 dark:bg-[#161a24] sticky top-0 z-10 border-b border-slate-200 dark:border-white/10 backdrop-blur-md">
                    <TableHead className="w-20 font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                      Stage
                    </TableHead>
                    <TableHead className="w-60 font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                      Subsystem &amp; Agent Role
                    </TableHead>
                    <TableHead className="min-w-[300px] font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                      Execution Logic &amp; Protocol
                    </TableHead>
                    <TableHead className="w-52 text-right font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                      Technology Interface
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.architectureSteps.map((step, idx) => (
                    <TableRow
                      key={idx}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-colors border-b border-slate-100 dark:border-white/5"
                    >
                      <TableCell className="font-mono font-bold text-cyan-600 dark:text-cyan-400 align-top py-4">
                        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs">
                          {step.step}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm align-top py-4">
                        {step.title}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-normal align-top py-4">
                        {step.description}
                      </TableCell>
                      <TableCell className="text-right align-top py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          <Terminal className="size-3 text-cyan-500" />
                          {step.tech}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="bg-slate-50/80 dark:bg-white/[0.02]">
                    <TableCell colSpan={3} className="text-xs font-mono text-slate-500 dark:text-neutral-400 py-3">
                      Total Pipeline Stages: {project.architectureSteps.length} Verified Micro-Services
                    </TableCell>
                    <TableCell className="text-right text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold py-3">
                      Deterministic Flow ✓
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. KEY CAPABILITIES & TECHNICAL INNOVATIONS */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 mb-2 font-bold tracking-widest">
              <Cpu className="size-3.5" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Technical Capabilities & Innovations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.keyCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white/90 dark:bg-[#12151d]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Sparkles className="size-4" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-normal">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. PRODUCTION CHALLENGES & HOW THEY WERE OVERCOME (TABLE REPRESENTATION) */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 mb-2 font-bold tracking-widest">
              <ShieldCheck className="size-3.5" />
              <span>Engineering Rigor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Engineering Challenges &amp; Solutions Matrix
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Systematic resolution of production vulnerabilities, concurrency bottlenecks, and mathematical guarantees.
            </p>
          </div>

          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#12151d]/90 backdrop-blur-xl shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-slate-100/90 dark:bg-[#161a24] border-b border-slate-200 dark:border-white/10">
                    <TableHead className="w-16 font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                      #
                    </TableHead>
                    <TableHead className="w-2/5 min-w-[240px] font-mono text-xs uppercase tracking-wider font-bold text-rose-600 dark:text-rose-400">
                      Technical Challenge / Failure Mode
                    </TableHead>
                    <TableHead className="w-3/5 min-w-[320px] font-mono text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400">
                      Engineered Solution &amp; Architectural Guarantees
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.challenges.map((item, idx) => (
                    <TableRow
                      key={idx}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-colors border-b border-slate-100 dark:border-white/5"
                    >
                      <TableCell className="font-mono text-xs text-slate-400 dark:text-neutral-500 align-top py-4">
                        {String(idx + 1).padStart(2, '0')}
                      </TableCell>
                      <TableCell className="align-top py-4">
                        <div className="flex items-start gap-2.5">
                          <span className="p-1 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
                            <AlertTriangle className="size-3.5" />
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-neutral-200 leading-snug">
                            {item.challenge}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="align-top py-4">
                        <div className="flex items-start gap-2.5">
                          <span className="p-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                            <CheckCircle2 className="size-3.5" />
                          </span>
                          <span className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-normal">
                            {item.solution}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="bg-slate-50/80 dark:bg-white/[0.02]">
                    <TableCell colSpan={2} className="text-xs font-mono text-slate-500 dark:text-neutral-400 py-3">
                      Failure Modes Addressed: {project.challenges.length} Production Hazards
                    </TableCell>
                    <TableCell className="text-right text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold py-3">
                      100% Mitigated ✓
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. TECH STACK TAXONOMY */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 mb-2 font-bold tracking-widest">
              <Layers className="size-3.5" />
              <span>Technology Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Technology Stack Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.techStackCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/90 dark:bg-[#12151d]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold mb-4">
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-800 dark:text-neutral-200 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 9. FULL RESEARCH CASE STUDY — REPORT SECTIONS */}
        {/* ============================================================ */}
        {project.reportSections && project.reportSections.length > 0 && (
          <section className="py-12 sm:py-16">
            <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 mb-2 font-bold tracking-widest">
                <BookOpen className="size-3.5" />
                <span>Full Research Manuscript</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Case Study — Academic Research Content
              </h2>
              <p className="text-sm text-slate-600 dark:text-neutral-400 mt-2 max-w-2xl">
                Full content extracted from the research manuscripts — from abstract through references — as submitted for peer review.
              </p>
            </div>

            <div className="space-y-6">
              {project.reportSections.map((section, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl bg-white/90 dark:bg-[#12151d]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-3 px-6 sm:px-8 py-4 bg-slate-50/80 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10">
                    <span className="size-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {section.heading}
                    </h3>
                  </div>

                  {/* Section Content */}
                  <div className="px-6 sm:px-8 py-6">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {renderReportMatter(section.content)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Read Full Manuscript CTA */}
            {project.pdfUrl && (
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Read the Full Manuscript</p>
                  <p className="text-xs text-slate-600 dark:text-neutral-400">View the complete research paper and supplementary materials directly in the protected viewer.</p>
                </div>
                <ProjectPdfButton
                  url={project.pdfUrl}
                  title={project.title}
                  subtitle={project.tagline || project.description}
                />
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* 10. NEXT & PREVIOUS PROJECT SWITCHER */}
        {/* ============================================================ */}
        <section className="pt-12 sm:pt-16 pb-8 border-t border-slate-200 dark:border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Previous Project Link */}
            <Link
              href={`/projects/${prevProject.id}`}
              className="group p-6 rounded-2xl bg-white/80 dark:bg-[#12151d]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="size-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-neutral-300 group-hover:-translate-x-1 transition-transform">
                  <ArrowLeft className="size-4" />
                </span>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-neutral-400 block font-bold">
                    Previous Project
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {prevProject.title}
                  </span>
                </div>
              </div>
            </Link>

            {/* Next Project Link */}
            <Link
              href={`/projects/${nextProject.id}`}
              className="group p-6 rounded-2xl bg-white/80 dark:bg-[#12151d]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-between text-right"
            >
              <div className="flex-1 pr-3">
                <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-neutral-400 block font-bold">
                  Next Project
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <span className="size-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-neutral-300 group-hover:translate-x-1 transition-transform shrink-0">
                <ArrowRight className="size-4" />
              </span>
            </Link>

          </div>
        </section>

      </main>

      {/* ============================================================ */}
      {/* 10. CLEAN CASE STUDY FOOTER */}
      {/* ============================================================ */}
      <footer className="border-t border-slate-200 dark:border-white/10 py-8 px-4 sm:px-8 text-center text-xs font-mono text-slate-500 dark:text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.developer.fullName} — All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/#projects" className="hover:text-slate-950 dark:hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="/#research" className="hover:text-slate-950 dark:hover:text-white transition-colors">
              Research
            </Link>
            <Link href="/#contact" className="hover:text-slate-950 dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
