'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  BarChart3,
  BookOpen,
  Bookmark,
  Check,
  ChevronRight,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Layers,
  Maximize2,
  Minimize2,
  Share2,
  ShieldCheck,
  Sparkles,
  X,
  ZoomIn,
} from 'lucide-react';
import { FormattedLatexText, MathBlock } from '@/components/ui/math-display';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaperFigure, Project } from '@/data/projects/types';
import { cn } from '@/lib/utils';

const ProjectCharts = dynamic(
  () => import('@/components/ui/project-charts').then((m) => m.ProjectCharts),
  { ssr: false }
);

interface IeeePaperViewProps {
  project: Project;
  className?: string;
}

export function IeeePaperView({ project, className }: IeeePaperViewProps) {
  const [selectedFigure, setSelectedFigure] = useState<PaperFigure | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [showBibtexModal, setShowBibtexModal] = useState(false);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [readingProgress, setReadingProgress] = useState(0);

  // Track reading scroll progress
  useEffect(() => {
    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  const paper = project.ieeePaper;
  const figures = paper?.figures || [];

  // Default BibTeX generator if not explicitly defined
  const bibtexCitation =
    paper?.bibtex ||
    `@article{subramanyam${new Date().getFullYear()}${project.id.replace(/-/g, '')},
  author    = {Kandula Jithendra Subramanyam},
  title     = {${paper?.paperTitle || project.title}},
  journal   = {${paper?.venue || 'Technical Report'}},
  year      = {${project.period.match(/\\d{4}/)?.[0] || '2026'}},
  url       = {https://jithendra.me/projects/${project.id}}
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <article className={cn('relative mx-auto w-full max-w-4xl py-2 sm:py-6', className)}>
      {/* 1. TOP READING PROGRESS BAR */}
      <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-slate-200/50 dark:bg-neutral-800/50">
        <div
          className="h-full bg-cyan-600 transition-all duration-150 dark:bg-cyan-400"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. ACADEMIC TOOLBAR */}
      <div className="border-border/40 mb-8 flex flex-wrap items-center justify-end gap-3 border-b pb-4 text-xs">
        {/* Font switcher */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-white/10 dark:bg-white/5">
          <button
            onClick={() => setFontFamily('serif')}
            className={`rounded-md px-2.5 py-1 font-serif text-xs font-semibold transition-colors ${
              fontFamily === 'serif'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-[#1e2330] dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-neutral-400'
            }`}
          >
            Classic Serif
          </button>
          <button
            onClick={() => setFontFamily('sans')}
            className={`rounded-md px-2.5 py-1 font-sans text-xs font-semibold transition-colors ${
              fontFamily === 'sans'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-[#1e2330] dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-neutral-400'
            }`}
          >
            Modern Sans
          </button>
        </div>
      </div>

      {/* 3. IEEE PAPER CONTAINER - UNBOXED & FREE FLOWING */}
      <div
        className={`w-full transition-colors ${
          fontFamily === 'serif' ? 'font-serif' : 'font-sans'
        }`}
      >
        {/* JOURNAL BANNER & MASTHEAD */}
        <div className="mb-8 border-b-2 border-slate-900 pb-6 text-center sm:text-left dark:border-white/20">
          <div className="mb-3 flex flex-col justify-between gap-2 font-mono text-xs font-semibold tracking-widest text-slate-500 uppercase sm:flex-row sm:items-center dark:text-neutral-400">
            <span>{paper?.venue || 'Peer-Reviewed Technical Research Case Study'}</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{project.status}</span>
          </div>

          {/* ARTICLE TITLE */}
          <h1 className="mt-2 mb-4 font-serif text-2xl leading-snug font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl dark:text-white">
            <FormattedLatexText text={paper?.paperTitle || project.title} />
          </h1>

          {/* AUTHORS & AFFILIATIONS */}
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-white/10">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-slate-900 sm:text-base dark:text-neutral-200">
              {paper?.authors && paper.authors.length > 0 ? (
                paper.authors.map((author, idx) => (
                  <span key={idx} className="inline-flex items-baseline">
                    <span className="font-bold">{author.name}</span>
                    <sup className="ml-0.5 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                      {author.affiliationIndex}
                    </sup>
                    {author.isCorresponding && (
                      <sup className="ml-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        *
                      </sup>
                    )}
                    {idx < (paper.authors?.length ?? 0) - 1 && <span className="mr-1">,</span>}
                  </span>
                ))
              ) : (
                <span className="inline-flex items-baseline">
                  <span className="font-bold">Kandula Jithendra Subramanyam</span>
                  <sup className="ml-0.5 text-xs font-bold text-cyan-600 dark:text-cyan-400">1</sup>
                  <sup className="ml-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    *
                  </sup>
                </span>
              )}
            </div>

            {/* Institutional Affiliations */}
            <div className="mt-2 space-y-0.5 text-xs text-slate-600 italic dark:text-neutral-400">
              {paper?.affiliations && paper.affiliations.length > 0 ? (
                paper.affiliations.map((aff, idx) => (
                  <div key={idx}>
                    <sup className="mr-1 font-bold text-cyan-600 dark:text-cyan-400">
                      {aff.index}
                    </sup>
                    {aff.department}, {aff.institution}, {aff.location}
                  </div>
                ))
              ) : (
                <div>
                  <sup className="mr-1 font-bold text-cyan-600 dark:text-cyan-400">1</sup>
                  Dept. of Artificial Intelligence &amp; Data Science, Bangalore, India
                </div>
              )}
              <div className="pt-1 font-mono text-[11px] text-slate-500 not-italic dark:text-neutral-500">
                *Corresponding Author: jithendrasubramanyam@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* ABSTRACT & INDEX TERMS (CLASSICAL IEEE STYLE) */}
        <div
          id="sec-abstract"
          className="my-8 border-l-2 border-[#f12e54]/70 py-2 pl-4 text-sm leading-relaxed sm:pl-6 dark:border-[#f12e54]/80"
        >
          <div className="text-justify text-slate-800 dark:text-neutral-200">
            <span className="mr-1.5 font-bold text-slate-950 italic dark:text-white">
              Abstract—
            </span>
            <FormattedLatexText text={paper?.abstract || project.overview} />
          </div>

          {paper?.keywords && paper.keywords.length > 0 && (
            <div className="mt-4 border-t border-slate-200/70 pt-3 text-xs dark:border-white/10">
              <span className="mr-2 font-bold text-slate-900 italic dark:text-neutral-200">
                Index Terms—
              </span>
              <span className="text-slate-600 italic dark:text-neutral-400">
                {paper.keywords.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* DYNAMIC CASE STUDY SECTIONS (EXTRACTED DIRECTLY FROM MANUSCRIPTS) */}
        {/* =================================================================== */}
        {paper?.sections && paper.sections.length > 0 ? (
          <div className="space-y-12">
            {paper.sections.map((sec, secIdx) => {
              const isResultsSec =
                sec.id.includes('eval') || sec.id.includes('result') || sec.id.includes('empiric');

              return (
                <section id={sec.id} key={sec.id} className="scroll-mt-24">
                  {/* SECTION TITLE */}
                  <h2 className="mb-4 flex items-baseline gap-2 border-b border-slate-200 pb-2 font-mono text-base font-bold tracking-wider text-slate-950 uppercase sm:text-lg dark:border-white/10 dark:text-white">
                    {sec.number && (
                      <span className="shrink-0 font-bold text-cyan-600 dark:text-cyan-400">
                        {sec.number}
                      </span>
                    )}
                    <span>
                      <FormattedLatexText text={sec.title} />
                    </span>
                  </h2>

                  {/* SECTION TOP PARAGRAPHS */}
                  {sec.paragraphs && sec.paragraphs.length > 0 && (
                    <div className="space-y-4 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>
                          {secIdx === 0 && pIdx === 0 ? (
                            <>
                              <span className="float-left mr-2 font-serif text-3xl leading-none font-bold text-slate-950 dark:text-white">
                                {p.charAt(0)}
                              </span>
                              <FormattedLatexText text={p.slice(1)} />
                            </>
                          ) : (
                            <FormattedLatexText text={p} />
                          )}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* SECTION EQUATIONS */}
                  {sec.equations && sec.equations.length > 0 && (
                    <div className="my-6 space-y-4 font-sans">
                      {sec.equations.map((eq, eqIdx) => (
                        <div
                          id={eq.id}
                          key={eqIdx}
                          className="flex scroll-mt-24 items-center justify-between overflow-x-auto rounded-lg border border-slate-200/60 bg-slate-50/70 px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]"
                        >
                          <div className="grow overflow-x-auto text-center font-normal text-slate-900 dark:text-neutral-100">
                            <MathBlock math={eq.latex.replace(/^\$\$?|\$\$?$/g, '')} />
                          </div>
                          {eq.number && (
                            <span className="shrink-0 pl-4 font-mono text-xs font-bold text-slate-500 dark:text-neutral-400">
                              {eq.number}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION TABLES */}
                  {sec.tables && sec.tables.length > 0 && (
                    <div className="my-8 space-y-8 font-sans">
                      {sec.tables.map((tbl, tIdx) => (
                        <div id={tbl.id} key={tIdx} className="scroll-mt-24">
                          <div className="mb-2 text-center font-mono text-xs font-bold tracking-wider text-slate-900 uppercase sm:text-sm dark:text-white">
                            {tbl.number && <span className="mr-1">{tbl.number}:</span>}
                            <span>{tbl.title}</span>
                          </div>
                          <div className="border-border/60 my-3 overflow-x-auto border-y">
                            <Table className="w-full text-xs sm:text-sm">
                              <TableHeader className="border-b-2 border-slate-900 dark:border-white/20">
                                <TableRow>
                                  {tbl.headers.map((h, hIdx) => (
                                    <TableHead
                                      key={hIdx}
                                      className="font-mono text-xs font-bold text-slate-900 uppercase dark:text-white"
                                    >
                                      {h}
                                    </TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {tbl.rows.map((row, rIdx) => (
                                  <TableRow
                                    key={rIdx}
                                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                                  >
                                    {row.map((cell, cIdx) => (
                                      <TableCell
                                        key={cIdx}
                                        className={
                                          cIdx === 0
                                            ? 'font-semibold text-slate-900 dark:text-white'
                                            : 'text-slate-700 dark:text-neutral-300'
                                        }
                                      >
                                        <FormattedLatexText text={String(cell)} />
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          {tbl.note && (
                            <p className="mt-1 text-center text-[11px] text-slate-500 italic dark:text-neutral-400">
                              {tbl.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION FIGURES */}
                  {sec.figures && sec.figures.length > 0 && (
                    <div className="my-8 space-y-8">
                      {sec.figures.map((fig, fIdx) => (
                        <figure id={fig.id} key={fIdx} className="group scroll-mt-24">
                          <div
                            onClick={() => setSelectedFigure(fig)}
                            className="relative flex w-full cursor-pointer items-center justify-center py-2"
                          >
                            <div className="relative flex aspect-video w-full items-center justify-center sm:aspect-[16/9]">
                              <Image
                                src={fig.src}
                                alt={fig.alt || fig.title}
                                fill
                                className="object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                                sizes="(max-width: 896px) 100vw, 896px"
                              />
                            </div>
                            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs text-white opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100 dark:bg-black/80">
                              <ZoomIn className="size-3" />
                              <span>Click to Zoom</span>
                            </div>
                          </div>
                          <figcaption className="mt-3 text-center font-sans text-xs text-slate-600 sm:text-sm dark:text-neutral-400">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {fig.figureNumber}.{' '}
                            </span>
                            <FormattedLatexText text={fig.caption} />
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

                  {/* SUBSECTIONS */}
                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="mt-8 space-y-8">
                      {sec.subsections.map((sub) => (
                        <div id={sub.id} key={sub.id} className="scroll-mt-24">
                          <h3 className="mb-3 flex items-baseline gap-2 font-mono text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                            {sub.number && (
                              <span className="shrink-0 font-bold text-cyan-600 dark:text-cyan-400">
                                {sub.number}
                              </span>
                            )}
                            <span>
                              <FormattedLatexText text={sub.title} />
                            </span>
                          </h3>

                          {/* SUBSECTION PARAGRAPHS */}
                          {sub.paragraphs && sub.paragraphs.length > 0 && (
                            <div className="space-y-4 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                              {sub.paragraphs.map((p, pIdx) => (
                                <p key={pIdx}>
                                  <FormattedLatexText text={p} />
                                </p>
                              ))}
                            </div>
                          )}

                          {/* SUBSECTION EQUATIONS */}
                          {sub.equations && sub.equations.length > 0 && (
                            <div className="my-6 space-y-4 font-sans">
                              {sub.equations.map((eq, eqIdx) => (
                                <div
                                  id={eq.id}
                                  key={eqIdx}
                                  className="flex scroll-mt-24 items-center justify-between overflow-x-auto rounded-lg border border-slate-200/60 bg-slate-50/70 px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]"
                                >
                                  <div className="grow overflow-x-auto text-center font-normal text-slate-900 dark:text-neutral-100">
                                    <MathBlock math={eq.latex.replace(/^\$\$?|\$\$?$/g, '')} />
                                  </div>
                                  {eq.number && (
                                    <span className="shrink-0 pl-4 font-mono text-xs font-bold text-slate-500 dark:text-neutral-400">
                                      {eq.number}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* SUBSECTION TABLES */}
                          {sub.tables && sub.tables.length > 0 && (
                            <div className="my-8 space-y-8 font-sans">
                              {sub.tables.map((tbl, tIdx) => (
                                <div id={tbl.id} key={tIdx} className="scroll-mt-24">
                                  <div className="mb-2 text-center font-mono text-xs font-bold tracking-wider text-slate-900 uppercase sm:text-sm dark:text-white">
                                    {tbl.number && <span className="mr-1">{tbl.number}:</span>}
                                    <span>{tbl.title}</span>
                                  </div>
                                  <div className="border-border/60 my-3 overflow-x-auto border-y">
                                    <Table className="w-full text-xs sm:text-sm">
                                      <TableHeader className="border-b-2 border-slate-900 dark:border-white/20">
                                        <TableRow>
                                          {tbl.headers.map((h, hIdx) => (
                                            <TableHead
                                              key={hIdx}
                                              className="font-mono text-xs font-bold text-slate-900 uppercase dark:text-white"
                                            >
                                              {h}
                                            </TableHead>
                                          ))}
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {tbl.rows.map((row, rIdx) => (
                                          <TableRow
                                            key={rIdx}
                                            className="border-b border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                                          >
                                            {row.map((cell, cIdx) => (
                                              <TableCell
                                                key={cIdx}
                                                className={
                                                  cIdx === 0
                                                    ? 'font-semibold text-slate-900 dark:text-white'
                                                    : 'text-slate-700 dark:text-neutral-300'
                                                }
                                              >
                                                <FormattedLatexText text={String(cell)} />
                                              </TableCell>
                                            ))}
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                  {tbl.note && (
                                    <p className="mt-1 text-center text-[11px] text-slate-500 italic dark:text-neutral-400">
                                      {tbl.note}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* SUBSECTION FIGURES */}
                          {sub.figures && sub.figures.length > 0 && (
                            <div className="my-8 space-y-8">
                              {sub.figures.map((fig, fIdx) => (
                                <figure id={fig.id} key={fIdx} className="group scroll-mt-24">
                                  <div
                                    onClick={() => setSelectedFigure(fig)}
                                    className="relative flex w-full cursor-pointer items-center justify-center py-2"
                                  >
                                    <div className="relative flex aspect-video w-full items-center justify-center sm:aspect-[16/9]">
                                      <Image
                                        src={fig.src}
                                        alt={fig.alt || fig.title}
                                        fill
                                        className="object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                                        sizes="(max-width: 896px) 100vw, 896px"
                                      />
                                    </div>
                                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs text-white opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100 dark:bg-black/80">
                                      <ZoomIn className="size-3" />
                                      <span>Click to Zoom</span>
                                    </div>
                                  </div>
                                  <figcaption className="mt-3 text-center font-sans text-xs text-slate-600 sm:text-sm dark:text-neutral-400">
                                    <span className="font-bold text-slate-900 dark:text-white">
                                      {fig.figureNumber}.{' '}
                                    </span>
                                    <FormattedLatexText text={fig.caption} />
                                  </figcaption>
                                </figure>
                              ))}
                            </div>
                          )}

                          {/* SUBSECTION PARAGRAPHS AFTER */}
                          {sub.paragraphsAfter && sub.paragraphsAfter.length > 0 && (
                            <div className="mt-4 space-y-4 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                              {sub.paragraphsAfter.map((p, pIdx) => (
                                <p key={pIdx}>
                                  <FormattedLatexText text={p} />
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION PARAGRAPHS AFTER */}
                  {sec.paragraphsAfter && sec.paragraphsAfter.length > 0 && (
                    <div className="mt-6 space-y-4 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                      {sec.paragraphsAfter.map((p, pIdx) => (
                        <p key={pIdx}>
                          <FormattedLatexText text={p} />
                        </p>
                      ))}
                    </div>
                  )}

                  {/* EMBED INTERACTIVE CHARTS AT RESULTS / EMPIRICAL EVALUATION */}
                  {isResultsSec && (
                    <div id="subsec-eval-charts" className="scroll-mt-24 pt-8 font-sans">
                      <ProjectCharts projectId={project.id} />
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          /* =================================================================== */
          /* FALLBACK DEFAULT TEMPLATE FOR LEGACY PROJECTS */
          /* =================================================================== */
          <>
            {/* I. INTRODUCTION & PROBLEM MOTIVATION */}
            <section id="sec-intro" className="mb-12 scroll-mt-24">
              <h2 className="mb-4 border-b border-slate-200 pb-2 font-mono text-base font-bold tracking-wider text-slate-950 uppercase sm:text-lg dark:border-white/10 dark:text-white">
                I. Introduction &amp; Problem Motivation
              </h2>
              <div className="space-y-4 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                <div id="subsec-intro-problem" className="scroll-mt-24">
                  <span className="float-left mr-2 font-serif text-3xl leading-none font-bold text-slate-950 dark:text-white">
                    T
                  </span>
                  <FormattedLatexText text={project.problemStatement} />
                </div>
                <div id="subsec-intro-solution" className="scroll-mt-24">
                  <FormattedLatexText text={project.solution} />
                </div>
              </div>
            </section>

            {/* II. MATHEMATICAL FORMULATION */}
            <section id="sec-math" className="mb-12 scroll-mt-24">
              <h2 className="mb-4 border-b border-slate-200 pb-2 font-mono text-base font-bold tracking-wider text-slate-950 uppercase sm:text-lg dark:border-white/10 dark:text-white">
                II. Mathematical Formulation &amp; Theoretical Framework
              </h2>
              <div className="space-y-4 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                <p>
                  <FormattedLatexText text="Formally, we express the core algorithmic and optimization dynamics of the proposed framework. Let the convex objective function be defined over feasible parameter simplex $\Delta$:" />
                </p>

                <div
                  id="subsec-math-cvar"
                  className="my-6 flex scroll-mt-24 items-center justify-between overflow-x-auto px-2 py-3 font-sans"
                >
                  <div className="grow overflow-x-auto text-center font-normal">
                    <FormattedLatexText text="$\text{CVaR}_\alpha(w) = \min_{\gamma \in \mathbb{R}} \left\{ \gamma + \frac{1}{1-\alpha} \mathbb{E}\left[ \left( -w^\top r_t - \gamma \right)^+ \right] \right\}$" />
                  </div>
                  <span className="pl-4 font-mono text-xs font-bold text-slate-500 dark:text-neutral-400">
                    (1)
                  </span>
                </div>

                <p>
                  <FormattedLatexText text="Under extreme regime fluctuations, dynamic structural penalization $\lambda_t \in [0, 1]$ is activated across the communication and risk graph:" />
                </p>

                <div
                  id="subsec-math-graph"
                  className="my-6 flex scroll-mt-24 items-center justify-between overflow-x-auto px-2 py-3 font-sans"
                >
                  <div className="grow overflow-x-auto text-center font-normal">
                    <FormattedLatexText text="$\min_{w \in \Delta} \; \text{CVaR}_\alpha(w) + \lambda_t \cdot w^\top \mathcal{L}_{\text{network}} w + \kappa \|w - w_{\text{prev}}\|_1$" />
                  </div>
                  <span className="pl-4 font-mono text-xs font-bold text-slate-500 dark:text-neutral-400">
                    (2)
                  </span>
                </div>
              </div>
            </section>

            {/* III. SYSTEM ARCHITECTURE */}
            <section id="sec-arch" className="mb-12 scroll-mt-24">
              <h2 className="mb-4 border-b border-slate-200 pb-2 font-mono text-base font-bold tracking-wider text-slate-950 uppercase sm:text-lg dark:border-white/10 dark:text-white">
                III. System Architecture &amp; Experimental Pipeline
              </h2>
              <div className="space-y-4 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                <p>
                  The architecture is structured into decoupled autonomous modules, ensuring
                  deterministic reliability, audit compliance, and end-to-end provenance.
                </p>

                {figures.length > 0 && (
                  <figure id="subsec-arch-fig1" className="group my-8 scroll-mt-24">
                    <div
                      onClick={() => setSelectedFigure(figures[0])}
                      className="relative flex w-full cursor-pointer items-center justify-center py-2"
                    >
                      <div className="relative flex aspect-video w-full items-center justify-center sm:aspect-[16/9]">
                        <Image
                          src={figures[0].src}
                          alt={figures[0].alt || figures[0].title}
                          fill
                          className="object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                          sizes="(max-width: 896px) 100vw, 896px"
                          priority
                        />
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs text-white opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100 dark:bg-black/80">
                        <ZoomIn className="size-3" />
                        <span>Click to Zoom</span>
                      </div>
                    </div>
                    <figcaption className="mt-3 text-center font-sans text-xs text-slate-600 sm:text-sm dark:text-neutral-400">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {figures[0].figureNumber}.{' '}
                      </span>
                      <FormattedLatexText text={figures[0].caption} />
                    </figcaption>
                  </figure>
                )}

                <div id="subsec-arch-stages" className="mt-6 scroll-mt-24 space-y-4 font-sans">
                  {project.architectureSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="border-border/70 border-l-2 py-1.5 pl-4 dark:border-white/10"
                    >
                      <div className="mb-1 flex items-center gap-2 font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        <span>STAGE {step.step}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </span>
                      </div>
                      <div className="text-xs leading-relaxed font-normal text-slate-600 sm:text-sm dark:text-neutral-300">
                        <FormattedLatexText text={step.description} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* IV. EMPIRICAL EVALUATION */}
            <section id="sec-eval" className="mb-12 scroll-mt-24">
              <h2 className="mb-4 border-b border-slate-200 pb-2 font-mono text-base font-bold tracking-wider text-slate-950 uppercase sm:text-lg dark:border-white/10 dark:text-white">
                IV. Empirical Benchmark Evaluation &amp; Results
              </h2>
              <div className="space-y-6 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                <div id="subsec-eval-table" className="my-6 scroll-mt-24 font-sans">
                  <div className="mb-2 text-center font-mono text-xs font-bold tracking-wider text-slate-900 uppercase sm:text-sm dark:text-white">
                    TABLE I: EMPIRICAL PERFORMANCE &amp; STRESS BENCHMARKS
                  </div>
                  <div className="border-border/60 my-4 overflow-x-auto border-y">
                    <Table className="w-full">
                      <TableHeader className="border-b-2 border-slate-900 dark:border-white/20">
                        <TableRow>
                          <TableHead className="font-mono text-xs font-bold text-slate-900 uppercase dark:text-white">
                            Evaluation Dimension
                          </TableHead>
                          <TableHead className="font-mono text-xs font-bold text-cyan-600 uppercase dark:text-cyan-400">
                            Observed Metric
                          </TableHead>
                          <TableHead className="font-mono text-xs font-bold text-slate-900 uppercase dark:text-white">
                            Empirical Benchmark Significance
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project.metrics.map((metric, idx) => (
                          <TableRow
                            key={idx}
                            className="border-b border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                          >
                            <TableCell className="text-xs font-semibold text-slate-900 sm:text-sm dark:text-white">
                              {metric.label}
                            </TableCell>
                            <TableCell className="font-mono text-xs font-bold text-cyan-600 sm:text-sm dark:text-cyan-400">
                              {metric.value}
                            </TableCell>
                            <TableCell className="text-xs text-slate-600 sm:text-sm dark:text-neutral-300">
                              {metric.detail}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {figures.length > 1 && (
                  <div
                    id="subsec-eval-figures"
                    className="my-8 grid scroll-mt-24 grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    {figures.slice(1, 5).map((fig, idx) => (
                      <figure key={idx} className="group flex flex-col justify-between">
                        <div
                          onClick={() => setSelectedFigure(fig)}
                          className="relative flex w-full cursor-pointer items-center justify-center py-2"
                        >
                          <div className="relative flex aspect-[4/3] w-full items-center justify-center">
                            <Image
                              src={fig.src}
                              alt={fig.alt || fig.title}
                              fill
                              className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            <ZoomIn className="size-3" />
                            <span>Enlarge</span>
                          </div>
                        </div>
                        <figcaption className="mt-2 font-sans text-xs text-slate-600 dark:text-neutral-400">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {fig.figureNumber}.{' '}
                          </span>
                          <FormattedLatexText text={fig.caption} />
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                <div id="subsec-eval-charts" className="scroll-mt-24 pt-6 font-sans">
                  <ProjectCharts projectId={project.id} />
                </div>
              </div>
            </section>

            {/* V. ABLATION STUDIES */}
            {figures.length > 5 && (
              <section id="sec-ablation" className="mb-12 scroll-mt-24">
                <h2 className="mb-4 border-b border-slate-200 pb-2 font-mono text-base font-bold tracking-wider text-slate-950 uppercase sm:text-lg dark:border-white/10 dark:text-white">
                  V. Ablation Studies &amp; Sensitivity Analysis
                </h2>
                <div className="space-y-6 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                  <p>
                    To isolate component contributions, comprehensive ablation and sensitivity
                    analyses were conducted across varying stress parameters and network densities.
                  </p>

                  <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {figures.slice(5, 9).map((fig, idx) => (
                      <figure key={idx} className="group flex flex-col justify-between">
                        <div
                          onClick={() => setSelectedFigure(fig)}
                          className="relative flex w-full cursor-pointer items-center justify-center py-2"
                        >
                          <div className="relative flex aspect-[4/3] w-full items-center justify-center">
                            <Image
                              src={fig.src}
                              alt={fig.alt || fig.title}
                              fill
                              className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            <ZoomIn className="size-3" />
                            <span>Enlarge</span>
                          </div>
                        </div>
                        <figcaption className="mt-2 font-sans text-xs text-slate-600 dark:text-neutral-400">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {fig.figureNumber}.{' '}
                          </span>
                          <FormattedLatexText text={fig.caption} />
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* VI. CONCLUSION */}
            <section id="sec-conclusion" className="mb-12 scroll-mt-24">
              <h2 className="mb-4 border-b border-slate-200 pb-2 font-mono text-base font-bold tracking-wider text-slate-950 uppercase sm:text-lg dark:border-white/10 dark:text-white">
                VI. Conclusion &amp; Future Directions
              </h2>
              <div className="space-y-4 text-justify text-sm leading-relaxed text-slate-800 sm:text-base dark:text-neutral-300">
                <p>
                  In this study, we presented an autonomous, auditable, and mathematically grounded
                  framework that successfully couples empirical data observation with constrained
                  convex optimization. Future work will focus on continuous cross-domain adaptation
                  and federated governance.
                </p>
              </div>
            </section>
          </>
        )}

        {/* REFERENCES (IEEE FORMAT) */}
        <section
          id="sec-references"
          className="scroll-mt-24 border-t-2 border-slate-900 pt-8 dark:border-white/20"
        >
          <h2 className="mb-4 font-mono text-sm font-bold tracking-wider text-slate-950 uppercase sm:text-base dark:text-white">
            References
          </h2>
          <ol className="list-none space-y-2.5 font-sans text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
            {paper?.references && paper.references.length > 0 ? (
              paper.references.map((ref, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="min-w-[28px] font-mono font-bold text-slate-900 dark:text-white">
                    [{ref.index}]
                  </span>
                  <span>
                    <FormattedLatexText text={ref.citation} />
                    {ref.doi && (
                      <span className="ml-1 font-mono text-[11px] text-cyan-600 dark:text-cyan-400">
                        DOI: {ref.doi}
                      </span>
                    )}
                  </span>
                </li>
              ))
            ) : (
              <>
                <li className="flex gap-2">
                  <span className="min-w-[28px] font-mono font-bold text-slate-900 dark:text-white">
                    [1]
                  </span>
                  <span>
                    R. T. Rockafellar and S. Uryasev, &quot;Optimization of conditional
                    value-at-risk,&quot; <em className="italic">Journal of Risk</em>, vol. 2, no. 3,
                    pp. 21–41, 2000.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="min-w-[28px] font-mono font-bold text-slate-900 dark:text-white">
                    [2]
                  </span>
                  <span>
                    F. Allen and D. Gale, &quot;Financial contagion,&quot;{' '}
                    <em className="italic">Journal of Political Economy</em>, vol. 108, no. 1, pp.
                    1–33, 2000.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="min-w-[28px] font-mono font-bold text-slate-900 dark:text-white">
                    [3]
                  </span>
                  <span>
                    P. Bonacich, &quot;Power and centrality: A family of measures,&quot;{' '}
                    <em className="italic">American Journal of Sociology</em>, vol. 92, no. 5, pp.
                    1170–1182, 1987.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="min-w-[28px] font-mono font-bold text-slate-900 dark:text-white">
                    [4]
                  </span>
                  <span>
                    M. Lopez de Prado, &quot;Building diversified portfolios that outperform out of
                    sample,&quot; <em className="italic">The Journal of Portfolio Management</em>,
                    vol. 42, no. 4, pp. 59–69, 2016.
                  </span>
                </li>
              </>
            )}
          </ol>
        </section>
      </div>

      {/* 4. LIGHTBOX ZOOM MODAL FOR RESEARCH FIGURES */}
      {selectedFigure && (
        <div
          onClick={() => setSelectedFigure(null)}
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md duration-200 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl dark:bg-[#12151d]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-4 px-6 dark:border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-600 uppercase dark:text-cyan-400">
                <span>{selectedFigure.figureNumber}</span>
                <span>•</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  High-Resolution Inspection
                </span>
              </div>
              <button
                onClick={() => setSelectedFigure(null)}
                className="rounded-full bg-slate-100 p-1.5 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="relative flex min-h-[400px] grow items-center justify-center overflow-auto bg-transparent p-6">
              <Image
                src={selectedFigure.src}
                alt={selectedFigure.alt || selectedFigure.title}
                width={1600}
                height={1000}
                className="mx-auto max-h-[65vh] w-auto object-contain"
                priority
              />
            </div>

            {/* Modal Caption */}
            <div className="border-t border-slate-200 bg-slate-50 p-4 px-6 text-xs text-slate-700 sm:text-sm dark:border-white/10 dark:bg-[#0e1117] dark:text-neutral-300">
              <span className="mr-1 font-bold text-slate-900 dark:text-white">
                {selectedFigure.figureNumber}:
              </span>
              <FormattedLatexText text={selectedFigure.caption} />
            </div>
          </div>
        </div>
      )}

      {/* 5. BIBTEX CITATION MODAL */}
      {showBibtexModal && (
        <div
          onClick={() => setShowBibtexModal(false)}
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#12151d]"
          >
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-600 uppercase dark:text-cyan-400">
                <Bookmark className="size-4" />
                <span>BibTeX Citation</span>
              </div>
              <button
                onClick={() => setShowBibtexModal(false)}
                className="rounded-full p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100 select-all">
              {bibtexCitation}
            </pre>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-cyan-500"
              >
                {copiedBibtex ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span>{copiedBibtex ? 'Copied to Clipboard!' : 'Copy BibTeX'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
