import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from 'lucide-react';
import {
  CaseStudyLayout,
  CaseStudySidebarProvider,
  CaseStudySidebarToggle,
} from '@/components/ui/case-study-toc-sidebar';
import { IeeePaperView } from '@/components/ui/ieee-paper-view';
import { ProjectPdfButton } from '@/components/ui/project-pdf-button';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { PROJECT_DETAILS } from '@/lib/project-details';

// Instruct Next.js to pre-render and aggressively cache case study pages
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

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
  const prevProjectKey =
    currentIndex > 0 ? projectKeys[currentIndex - 1] : projectKeys[projectKeys.length - 1];
  const nextProjectKey =
    currentIndex < projectKeys.length - 1 ? projectKeys[currentIndex + 1] : projectKeys[0];
  const prevProject = PROJECT_DETAILS[prevProjectKey];
  const nextProject = PROJECT_DETAILS[nextProjectKey];

  const pdfUrl =
    project.pdfUrl ||
    (project.researchLink &&
    (project.researchLink.startsWith('/') || project.researchLink.startsWith('http'))
      ? project.researchLink
      : undefined);

  return (
    <CaseStudySidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 transition-colors duration-300 selection:bg-neutral-800 selection:text-white dark:bg-[#0d0f14] dark:text-neutral-100">
        {/* Ambient background glows */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[130px] dark:bg-cyan-500/10" />
          <div className="absolute top-1/3 -right-40 h-[550px] w-[550px] rounded-full bg-purple-500/5 blur-[140px] dark:bg-purple-500/10" />
          <div className="absolute bottom-10 left-10 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[130px] dark:bg-emerald-500/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
        </div>

        {/* ============================================================ */}
        {/* 1. TOP STICKY BAR */}
        {/* ============================================================ */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0d0f14]/80">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-2.5 sm:gap-4 sm:px-8">
            {/* Back button, Sidebar toggle & Breadcrumb */}
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-3.5">
              <Link
                href="/#projects"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1.5 font-mono text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-200 hover:text-slate-950 sm:px-3 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <ArrowLeft className="size-3.5" />
                <span className="hidden sm:inline">Back to Portfolio</span>
                <span className="sm:hidden">Back</span>
              </Link>

              {/* Sidebar toggle button on the nav bar */}
              <CaseStudySidebarToggle />

              <span className="hidden text-slate-300 md:inline dark:text-neutral-700">/</span>

              <div className="hidden items-center gap-2 truncate font-mono text-xs text-slate-500 md:flex dark:text-neutral-400">
                <span>Projects</span>
                <span>/</span>
                <span className="truncate font-semibold text-slate-900 dark:text-neutral-200">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 font-mono text-xs font-medium text-slate-700 transition-all hover:text-slate-950 md:inline-flex dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-white"
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
        <main className="bg-background relative z-10 w-full">
          <CaseStudyLayout
            hasAblation={Boolean(
              project.ieeePaper?.figures && project.ieeePaper.figures.length > 5
            )}
            sections={project.ieeePaper?.sections}
          >
            <IeeePaperView project={project} />

            {/* Carousel Navigation Between Projects */}
            <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#f12e54] uppercase">
                <span>Explore Other Case Studies</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Previous Project Link */}
                <Link
                  href={`/projects/${prevProject.id}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xs transition-all hover:border-[#f12e54]/40 sm:p-6 dark:border-white/10 dark:bg-[#12151d]/90"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-transform group-hover:-translate-x-1 dark:bg-white/5 dark:text-neutral-300">
                      <ArrowLeft className="size-4" />
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] font-bold text-slate-500 uppercase dark:text-neutral-400">
                        Previous Case Study
                      </span>
                      <span className="text-xs font-bold text-slate-900 transition-colors group-hover:text-[#f12e54] sm:text-sm dark:text-white">
                        {prevProject.title}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Next Project Link */}
                <Link
                  href={`/projects/${nextProject.id}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 p-5 text-right shadow-xs transition-all hover:border-[#f12e54]/40 sm:p-6 dark:border-white/10 dark:bg-[#12151d]/90"
                >
                  <div className="flex-1 pr-3">
                    <span className="block font-mono text-[10px] font-bold text-slate-500 uppercase dark:text-neutral-400">
                      Next Case Study
                    </span>
                    <span className="text-xs font-bold text-slate-900 transition-colors group-hover:text-[#f12e54] sm:text-sm dark:text-white">
                      {nextProject.title}
                    </span>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-transform group-hover:translate-x-1 dark:bg-white/5 dark:text-neutral-300">
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
        <footer className="border-t border-slate-200 px-4 py-8 text-center font-mono text-xs text-slate-500 sm:px-8 dark:border-white/10 dark:text-neutral-500">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {PORTFOLIO_DATA.developer.fullName} — All Rights
              Reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/#projects"
                className="transition-colors hover:text-slate-950 dark:hover:text-white"
              >
                Portfolio
              </Link>
              <Link
                href="/#research"
                className="transition-colors hover:text-slate-950 dark:hover:text-white"
              >
                Research
              </Link>
              <Link
                href="/#contact"
                className="transition-colors hover:text-slate-950 dark:hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </CaseStudySidebarProvider>
  );
}
