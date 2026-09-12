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
import { FormattedLatexText } from '@/components/ui/math-display';
import { IeeePaperView } from '@/components/ui/ieee-paper-view';
import {
  CaseStudySidebarProvider,
  CaseStudySidebarToggle,
  CaseStudyLayout,
} from '@/components/ui/case-study-toc-sidebar';

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
          <div
            key={bIdx}
            className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed m-0"
          >
            <FormattedLatexText text={block} />
          </div>
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

  const pdfUrl = project.pdfUrl || (project.researchLink && (project.researchLink.startsWith('/') || project.researchLink.startsWith('http')) ? project.researchLink : undefined);

  return (
    <CaseStudySidebarProvider defaultOpen={true}>
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
          
          {/* Back button, Sidebar toggle & Breadcrumb */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-200 shrink-0"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Portfolio</span>
            </Link>

            {/* Sidebar toggle button on the nav bar */}
            <CaseStudySidebarToggle />

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

            {pdfUrl && (
              <ProjectPdfButton
                url={pdfUrl}
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
      {/* 2. MAIN IEEE SINGLE-COLUMN RESEARCH CASE STUDY WITH TOC */}
      {/* ============================================================ */}
      <main className="relative z-10 w-full bg-background">
        <CaseStudyLayout
          hasAblation={Boolean(project.ieeePaper?.figures && project.ieeePaper.figures.length > 5)}
          sections={project.ieeePaper?.sections}
        >
          <IeeePaperView project={project} />

          {/* Carousel Navigation Between Projects */}
          <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#f12e54] mb-4 font-bold tracking-widest">
              <span>Explore Other Case Studies</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Previous Project Link */}
              <Link
                href={`/projects/${prevProject.id}`}
                className="group p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#12151d]/90 border border-slate-200 dark:border-white/10 hover:border-[#f12e54]/40 transition-all flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="size-9 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-neutral-300 group-hover:-translate-x-1 transition-transform">
                    <ArrowLeft className="size-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-neutral-400 block font-bold">
                      Previous Case Study
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#f12e54] transition-colors">
                      {prevProject.title}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Next Project Link */}
              <Link
                href={`/projects/${nextProject.id}`}
                className="group p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#12151d]/90 border border-slate-200 dark:border-white/10 hover:border-[#f12e54]/40 transition-all flex items-center justify-between text-right shadow-xs"
              >
                <div className="flex-1 pr-3">
                  <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-neutral-400 block font-bold">
                    Next Case Study
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#f12e54] transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <span className="size-9 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-neutral-300 group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight className="size-4" />
                </span>
              </Link>

            </div>
          </div>
        </CaseStudyLayout>
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
    </CaseStudySidebarProvider>
  );
}
