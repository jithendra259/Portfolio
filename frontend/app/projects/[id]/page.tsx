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
              <a
                href={project.researchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
              >
                <BookOpen className="size-3.5" />
                <span>Paper</span>
                <ExternalLink className="size-3 opacity-60" />
              </a>
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

          <div className="space-y-4">
            {project.architectureSteps.map((step, idx) => (
              <div
                key={idx}
                className="group p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-[#12151d]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="flex items-start gap-4 sm:gap-6 flex-1">
                  {/* Step Number Badge */}
                  <span className="size-11 sm:size-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-lg flex items-center justify-center shrink-0 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
                    {step.step}
                  </span>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-normal max-w-3xl">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Tech Badge */}
                <div className="shrink-0 md:pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <Terminal className="size-3 text-cyan-500" />
                    {step.tech}
                  </span>
                </div>
              </div>
            ))}
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
        {/* 7. PRODUCTION CHALLENGES & HOW THEY WERE OVERCOME */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 mb-2 font-bold tracking-widest">
              <ShieldCheck className="size-3.5" />
              <span>Engineering Rigor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Engineering Challenges & Solutions
            </h2>
          </div>

          <div className="space-y-4">
            {project.challenges.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-[#12151d]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0 mt-0.5">
                    Challenge
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.challenge}
                  </p>
                </div>

                <div className="flex items-start gap-3 pl-0 sm:pl-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                    Engineered Solution
                  </span>
                  <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
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
                      <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 dark:text-neutral-300 leading-relaxed m-0 bg-transparent border-0 p-0">
                        {section.content}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Full PDF CTA */}
            {project.pdfUrl && (
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Read the Full Manuscript</p>
                  <p className="text-xs text-slate-600 dark:text-neutral-400">Download the complete research paper including all figures, tables, and supplementary materials.</p>
                </div>
                <a
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-all shrink-0"
                >
                  <BookOpen className="size-3.5" />
                  <span>Download PDF</span>
                  <ExternalLink className="size-3.5 opacity-70" />
                </a>
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
