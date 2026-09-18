'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Share2,
  Copy,
  Check,
  ZoomIn,
  X,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  BarChart3,
  Bookmark,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Project, PaperFigure } from '@/data/projects/types';
import { MathBlock, FormattedLatexText } from '@/components/ui/math-display';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import dynamic from 'next/dynamic';
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
    <article className={cn("relative w-full max-w-4xl mx-auto py-2 sm:py-6", className)}>
      {/* 1. TOP READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/50 dark:bg-neutral-800/50 z-50">
        <div
          className="h-full bg-cyan-600 dark:bg-cyan-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. ACADEMIC TOOLBAR */}
      <div className="mb-8 flex flex-wrap items-center justify-end gap-3 pb-4 border-b border-border/40 text-xs">
        {/* Font switcher */}
        <div className="flex items-center rounded-lg bg-slate-100 dark:bg-white/5 p-0.5 border border-slate-200 dark:border-white/10">
          <button
            onClick={() => setFontFamily('serif')}
            className={`px-2.5 py-1 rounded-md transition-colors font-serif text-xs font-semibold ${
              fontFamily === 'serif'
                ? 'bg-white dark:bg-[#1e2330] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900'
            }`}
          >
            Classic Serif
          </button>
          <button
            onClick={() => setFontFamily('sans')}
            className={`px-2.5 py-1 rounded-md transition-colors font-sans text-xs font-semibold ${
              fontFamily === 'sans'
                ? 'bg-white dark:bg-[#1e2330] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900'
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
        <div className="border-b-2 border-slate-900 dark:border-white/20 pb-6 mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-semibold mb-3">
            <span>{paper?.venue || 'Peer-Reviewed Technical Research Case Study'}</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">{project.status}</span>
          </div>

          {/* ARTICLE TITLE */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug mt-2 mb-4 font-serif">
            <FormattedLatexText text={paper?.paperTitle || project.title} />
          </h1>

          {/* AUTHORS & AFFILIATIONS */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base font-medium text-slate-900 dark:text-neutral-200">
              {paper?.authors && paper.authors.length > 0 ? (
                paper.authors.map((author, idx) => (
                  <span key={idx} className="inline-flex items-baseline">
                    <span className="font-bold">{author.name}</span>
                    <sup className="text-cyan-600 dark:text-cyan-400 font-bold text-xs ml-0.5">
                      {author.affiliationIndex}
                    </sup>
                    {author.isCorresponding && (
                      <sup className="text-emerald-600 dark:text-emerald-400 font-bold text-xs ml-0.5">
                        *
                      </sup>
                    )}
                    {idx < (paper.authors?.length ?? 0) - 1 && <span className="mr-1">,</span>}
                  </span>
                ))
              ) : (
                <span className="inline-flex items-baseline">
                  <span className="font-bold">Kandula Jithendra Subramanyam</span>
                  <sup className="text-cyan-600 dark:text-cyan-400 font-bold text-xs ml-0.5">1</sup>
                  <sup className="text-emerald-600 dark:text-emerald-400 font-bold text-xs ml-0.5">*</sup>
                </span>
              )}
            </div>

            {/* Institutional Affiliations */}
            <div className="mt-2 text-xs text-slate-600 dark:text-neutral-400 space-y-0.5 italic">
              {paper?.affiliations && paper.affiliations.length > 0 ? (
                paper.affiliations.map((aff, idx) => (
                  <div key={idx}>
                    <sup className="text-cyan-600 dark:text-cyan-400 font-bold mr-1">
                      {aff.index}
                    </sup>
                    {aff.department}, {aff.institution}, {aff.location}
                  </div>
                ))
              ) : (
                <div>
                  <sup className="text-cyan-600 dark:text-cyan-400 font-bold mr-1">1</sup>
                  Dept. of Artificial Intelligence &amp; Data Science, Bangalore, India
                </div>
              )}
              <div className="text-slate-500 dark:text-neutral-500 pt-1 not-italic font-mono text-[11px]">
                *Corresponding Author: jithendrasubramanyam@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* ABSTRACT & INDEX TERMS (CLASSICAL IEEE STYLE) */}
        <div id="sec-abstract" className="my-8 py-2 pl-4 sm:pl-6 border-l-2 border-[#f12e54]/70 dark:border-[#f12e54]/80 text-sm leading-relaxed">
          <div className="text-slate-800 dark:text-neutral-200 text-justify">
            <span className="font-bold italic text-slate-950 dark:text-white mr-1.5">
              Abstract—
            </span>
            <FormattedLatexText text={paper?.abstract || project.overview} />
          </div>

          {paper?.keywords && paper.keywords.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-white/10 text-xs">
              <span className="font-bold italic text-slate-900 dark:text-neutral-200 mr-2">
                Index Terms—
              </span>
              <span className="text-slate-600 dark:text-neutral-400 italic">
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
                sec.id.includes('eval') ||
                sec.id.includes('result') ||
                sec.id.includes('empiric');

              return (
                <section id={sec.id} key={sec.id} className="scroll-mt-24">
                  {/* SECTION TITLE */}
                  <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-white/10 pb-2 font-mono flex items-baseline gap-2">
                    {sec.number && (
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0">
                        {sec.number}
                      </span>
                    )}
                    <span>
                      <FormattedLatexText text={sec.title} />
                    </span>
                  </h2>

                  {/* SECTION TOP PARAGRAPHS */}
                  {sec.paragraphs && sec.paragraphs.length > 0 && (
                    <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-4 text-justify">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>
                          {secIdx === 0 && pIdx === 0 ? (
                            <>
                              <span className="text-3xl font-bold font-serif float-left mr-2 leading-none text-slate-950 dark:text-white">
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
                          className="scroll-mt-24 py-3 px-4 flex items-center justify-between overflow-x-auto bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 rounded-lg"
                        >
                          <div className="grow overflow-x-auto text-center font-normal text-slate-900 dark:text-neutral-100">
                            <MathBlock math={eq.latex.replace(/^\$\$?|\$\$?$/g, '')} />
                          </div>
                          {eq.number && (
                            <span className="font-mono text-xs text-slate-500 dark:text-neutral-400 pl-4 font-bold shrink-0">
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
                          <div className="text-center font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2 font-mono">
                            {tbl.number && <span className="mr-1">{tbl.number}:</span>}
                            <span>{tbl.title}</span>
                          </div>
                          <div className="overflow-x-auto my-3 border-y border-border/60">
                            <Table className="w-full text-xs sm:text-sm">
                              <TableHeader className="border-b-2 border-slate-900 dark:border-white/20">
                                <TableRow>
                                  {tbl.headers.map((h, hIdx) => (
                                    <TableHead
                                      key={hIdx}
                                      className="font-mono text-xs uppercase font-bold text-slate-900 dark:text-white"
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
                                    className="hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b border-slate-100 dark:border-white/5"
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
                            <p className="text-[11px] text-slate-500 dark:text-neutral-400 italic text-center mt-1">
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
                        <figure id={fig.id} key={fIdx} className="scroll-mt-24 group">
                          <div
                            onClick={() => setSelectedFigure(fig)}
                            className="relative cursor-pointer w-full flex items-center justify-center py-2"
                          >
                            <div className="relative w-full aspect-video sm:aspect-[16/9] flex items-center justify-center">
                              <Image
                                src={fig.src}
                                alt={fig.alt || fig.title}
                                fill
                                className="object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                                sizes="(max-width: 896px) 100vw, 896px"
                              />
                            </div>
                            <div className="absolute top-2 right-2 bg-slate-900/80 dark:bg-black/80 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                              <ZoomIn className="size-3" />
                              <span>Click to Zoom</span>
                            </div>
                          </div>
                          <figcaption className="mt-3 text-xs sm:text-sm text-center text-slate-600 dark:text-neutral-400 font-sans">
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
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3 font-mono flex items-baseline gap-2">
                            {sub.number && (
                              <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0">
                                {sub.number}
                              </span>
                            )}
                            <span>
                              <FormattedLatexText text={sub.title} />
                            </span>
                          </h3>

                          {/* SUBSECTION PARAGRAPHS */}
                          {sub.paragraphs && sub.paragraphs.length > 0 && (
                            <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-4 text-justify">
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
                                  className="scroll-mt-24 py-3 px-4 flex items-center justify-between overflow-x-auto bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 rounded-lg"
                                >
                                  <div className="grow overflow-x-auto text-center font-normal text-slate-900 dark:text-neutral-100">
                                    <MathBlock math={eq.latex.replace(/^\$\$?|\$\$?$/g, '')} />
                                  </div>
                                  {eq.number && (
                                    <span className="font-mono text-xs text-slate-500 dark:text-neutral-400 pl-4 font-bold shrink-0">
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
                                  <div className="text-center font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2 font-mono">
                                    {tbl.number && <span className="mr-1">{tbl.number}:</span>}
                                    <span>{tbl.title}</span>
                                  </div>
                                  <div className="overflow-x-auto my-3 border-y border-border/60">
                                    <Table className="w-full text-xs sm:text-sm">
                                      <TableHeader className="border-b-2 border-slate-900 dark:border-white/20">
                                        <TableRow>
                                          {tbl.headers.map((h, hIdx) => (
                                            <TableHead
                                              key={hIdx}
                                              className="font-mono text-xs uppercase font-bold text-slate-900 dark:text-white"
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
                                            className="hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b border-slate-100 dark:border-white/5"
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
                                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 italic text-center mt-1">
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
                                <figure id={fig.id} key={fIdx} className="scroll-mt-24 group">
                                  <div
                                    onClick={() => setSelectedFigure(fig)}
                                    className="relative cursor-pointer w-full flex items-center justify-center py-2"
                                  >
                                    <div className="relative w-full aspect-video sm:aspect-[16/9] flex items-center justify-center">
                                      <Image
                                        src={fig.src}
                                        alt={fig.alt || fig.title}
                                        fill
                                        className="object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                                        sizes="(max-width: 896px) 100vw, 896px"
                                      />
                                    </div>
                                    <div className="absolute top-2 right-2 bg-slate-900/80 dark:bg-black/80 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                                      <ZoomIn className="size-3" />
                                      <span>Click to Zoom</span>
                                    </div>
                                  </div>
                                  <figcaption className="mt-3 text-xs sm:text-sm text-center text-slate-600 dark:text-neutral-400 font-sans">
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
                            <div className="mt-4 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-4 text-justify">
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
                    <div className="mt-6 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-4 text-justify">
                      {sec.paragraphsAfter.map((p, pIdx) => (
                        <p key={pIdx}>
                          <FormattedLatexText text={p} />
                        </p>
                      ))}
                    </div>
                  )}

                  {/* EMBED INTERACTIVE CHARTS AT RESULTS / EMPIRICAL EVALUATION */}
                  {isResultsSec && (
                    <div id="subsec-eval-charts" className="pt-8 scroll-mt-24 font-sans">
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
              <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-white/10 pb-2 font-mono">
                I. Introduction &amp; Problem Motivation
              </h2>
              <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-4 text-justify">
                <div id="subsec-intro-problem" className="scroll-mt-24">
                  <span className="text-3xl font-bold font-serif float-left mr-2 leading-none text-slate-950 dark:text-white">
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
              <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-white/10 pb-2 font-mono">
                II. Mathematical Formulation &amp; Theoretical Framework
              </h2>
              <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-4 text-justify">
                <p>
                  <FormattedLatexText text="Formally, we express the core algorithmic and optimization dynamics of the proposed framework. Let the convex objective function be defined over feasible parameter simplex $\Delta$:" />
                </p>

                <div id="subsec-math-cvar" className="my-6 scroll-mt-24 py-3 px-2 flex items-center justify-between font-sans overflow-x-auto">
                  <div className="grow overflow-x-auto text-center font-normal">
                    <FormattedLatexText text="$\text{CVaR}_\alpha(w) = \min_{\gamma \in \mathbb{R}} \left\{ \gamma + \frac{1}{1-\alpha} \mathbb{E}\left[ \left( -w^\top r_t - \gamma \right)^+ \right] \right\}$" />
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-neutral-400 pl-4 font-bold">
                    (1)
                  </span>
                </div>

                <p>
                  <FormattedLatexText text="Under extreme regime fluctuations, dynamic structural penalization $\lambda_t \in [0, 1]$ is activated across the communication and risk graph:" />
                </p>

                <div id="subsec-math-graph" className="my-6 scroll-mt-24 py-3 px-2 flex items-center justify-between font-sans overflow-x-auto">
                  <div className="grow overflow-x-auto text-center font-normal">
                    <FormattedLatexText text="$\min_{w \in \Delta} \; \text{CVaR}_\alpha(w) + \lambda_t \cdot w^\top \mathcal{L}_{\text{network}} w + \kappa \|w - w_{\text{prev}}\|_1$" />
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-neutral-400 pl-4 font-bold">
                    (2)
                  </span>
                </div>
              </div>
            </section>

            {/* III. SYSTEM ARCHITECTURE */}
            <section id="sec-arch" className="mb-12 scroll-mt-24">
              <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-white/10 pb-2 font-mono">
                III. System Architecture &amp; Experimental Pipeline
              </h2>
              <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-4 text-justify">
                <p>
                  The architecture is structured into decoupled autonomous modules, ensuring deterministic
                  reliability, audit compliance, and end-to-end provenance.
                </p>

                {figures.length > 0 && (
                  <figure id="subsec-arch-fig1" className="my-8 scroll-mt-24 group">
                    <div
                      onClick={() => setSelectedFigure(figures[0])}
                      className="relative cursor-pointer w-full flex items-center justify-center py-2"
                    >
                      <div className="relative w-full aspect-video sm:aspect-[16/9] flex items-center justify-center">
                        <Image
                          src={figures[0].src}
                          alt={figures[0].alt || figures[0].title}
                          fill
                          className="object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                          sizes="(max-width: 896px) 100vw, 896px"
                          priority
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-slate-900/80 dark:bg-black/80 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                        <ZoomIn className="size-3" />
                        <span>Click to Zoom</span>
                      </div>
                    </div>
                    <figcaption className="mt-3 text-xs sm:text-sm text-center text-slate-600 dark:text-neutral-400 font-sans">
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
                      className="pl-4 border-l-2 border-border/70 dark:border-white/10 py-1.5"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                        <span>STAGE {step.step}</span>
                        <span>•</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{step.title}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-normal">
                        <FormattedLatexText text={step.description} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* IV. EMPIRICAL EVALUATION */}
            <section id="sec-eval" className="mb-12 scroll-mt-24">
              <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-white/10 pb-2 font-mono">
                IV. Empirical Benchmark Evaluation &amp; Results
              </h2>
              <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-6 text-justify">
                <div id="subsec-eval-table" className="my-6 scroll-mt-24 font-sans">
                  <div className="text-center font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2 font-mono">
                    TABLE I: EMPIRICAL PERFORMANCE &amp; STRESS BENCHMARKS
                  </div>
                  <div className="overflow-x-auto my-4 border-y border-border/60">
                    <Table className="w-full">
                      <TableHeader className="border-b-2 border-slate-900 dark:border-white/20">
                        <TableRow>
                          <TableHead className="font-mono text-xs uppercase font-bold text-slate-900 dark:text-white">
                            Evaluation Dimension
                          </TableHead>
                          <TableHead className="font-mono text-xs uppercase font-bold text-cyan-600 dark:text-cyan-400">
                            Observed Metric
                          </TableHead>
                          <TableHead className="font-mono text-xs uppercase font-bold text-slate-900 dark:text-white">
                            Empirical Benchmark Significance
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project.metrics.map((metric, idx) => (
                          <TableRow
                            key={idx}
                            className="hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b border-slate-100 dark:border-white/5"
                          >
                            <TableCell className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                              {metric.label}
                            </TableCell>
                            <TableCell className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm">
                              {metric.value}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300">
                              {metric.detail}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {figures.length > 1 && (
                  <div id="subsec-eval-figures" className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 scroll-mt-24">
                    {figures.slice(1, 5).map((fig, idx) => (
                      <figure key={idx} className="group flex flex-col justify-between">
                        <div
                          onClick={() => setSelectedFigure(fig)}
                          className="relative cursor-pointer w-full flex items-center justify-center py-2"
                        >
                          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            <Image
                              src={fig.src}
                              alt={fig.alt || fig.title}
                              fill
                              className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                          <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="size-3" />
                            <span>Enlarge</span>
                          </div>
                        </div>
                        <figcaption className="mt-2 text-xs text-slate-600 dark:text-neutral-400 font-sans">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {fig.figureNumber}.{' '}
                          </span>
                          <FormattedLatexText text={fig.caption} />
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                <div id="subsec-eval-charts" className="pt-6 scroll-mt-24 font-sans">
                  <ProjectCharts projectId={project.id} />
                </div>
              </div>
            </section>

            {/* V. ABLATION STUDIES */}
            {figures.length > 5 && (
              <section id="sec-ablation" className="mb-12 scroll-mt-24">
                <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-white/10 pb-2 font-mono">
                  V. Ablation Studies &amp; Sensitivity Analysis
                </h2>
                <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-6 text-justify">
                  <p>
                    To isolate component contributions, comprehensive ablation and sensitivity analyses were
                    conducted across varying stress parameters and network densities.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
                    {figures.slice(5, 9).map((fig, idx) => (
                      <figure key={idx} className="group flex flex-col justify-between">
                        <div
                          onClick={() => setSelectedFigure(fig)}
                          className="relative cursor-pointer w-full flex items-center justify-center py-2"
                        >
                          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            <Image
                              src={fig.src}
                              alt={fig.alt || fig.title}
                              fill
                              className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                          <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="size-3" />
                            <span>Enlarge</span>
                          </div>
                        </div>
                        <figcaption className="mt-2 text-xs text-slate-600 dark:text-neutral-400 font-sans">
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
              <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-white/10 pb-2 font-mono">
                VI. Conclusion &amp; Future Directions
              </h2>
              <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300 space-y-4 text-justify">
                <p>
                  In this study, we presented an autonomous, auditable, and mathematically grounded framework
                  that successfully couples empirical data observation with constrained convex optimization.
                  Future work will focus on continuous cross-domain adaptation and federated governance.
                </p>
              </div>
            </section>
          </>
        )}

        {/* REFERENCES (IEEE FORMAT) */}
        <section id="sec-references" className="pt-8 scroll-mt-24 border-t-2 border-slate-900 dark:border-white/20">
          <h2 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 font-mono">
            References
          </h2>
          <ol className="list-none space-y-2.5 text-xs text-slate-600 dark:text-neutral-400 font-sans leading-relaxed">
            {paper?.references && paper.references.length > 0 ? (
              paper.references.map((ref, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-[28px]">
                    [{ref.index}]
                  </span>
                  <span>
                    <FormattedLatexText text={ref.citation} />
                    {ref.doi && (
                      <span className="ml-1 text-cyan-600 dark:text-cyan-400 font-mono text-[11px]">
                        DOI: {ref.doi}
                      </span>
                    )}
                  </span>
                </li>
              ))
            ) : (
              <>
                <li className="flex gap-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-[28px]">[1]</span>
                  <span>
                    R. T. Rockafellar and S. Uryasev, &quot;Optimization of conditional value-at-risk,&quot;{' '}
                    <em className="italic">Journal of Risk</em>, vol. 2, no. 3, pp. 21–41, 2000.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-[28px]">[2]</span>
                  <span>
                    F. Allen and D. Gale, &quot;Financial contagion,&quot;{' '}
                    <em className="italic">Journal of Political Economy</em>, vol. 108, no. 1, pp. 1–33, 2000.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-[28px]">[3]</span>
                  <span>
                    P. Bonacich, &quot;Power and centrality: A family of measures,&quot;{' '}
                    <em className="italic">American Journal of Sociology</em>, vol. 92, no. 5, pp. 1170–1182, 1987.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-[28px]">[4]</span>
                  <span>
                    M. Lopez de Prado, &quot;Building diversified portfolios that outperform out of sample,&quot;{' '}
                    <em className="italic">The Journal of Portfolio Management</em>, vol. 42, no. 4, pp. 59–69, 2016.
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-white dark:bg-[#12151d] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400">
                <span>{selectedFigure.figureNumber}</span>
                <span>•</span>
                <span className="text-slate-900 dark:text-white font-semibold">High-Resolution Inspection</span>
              </div>
              <button
                onClick={() => setSelectedFigure(null)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="relative grow p-6 bg-transparent flex items-center justify-center min-h-[400px] overflow-auto">
              <Image
                src={selectedFigure.src}
                alt={selectedFigure.alt || selectedFigure.title}
                width={1600}
                height={1000}
                className="max-h-[65vh] w-auto object-contain mx-auto"
                priority
              />
            </div>

            {/* Modal Caption */}
            <div className="p-4 px-6 bg-slate-50 dark:bg-[#0e1117] border-t border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-neutral-300">
              <span className="font-bold text-slate-900 dark:text-white mr-1">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-white dark:bg-[#12151d] rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-cyan-600 dark:text-cyan-400">
                <Bookmark className="size-4" />
                <span>BibTeX Citation</span>
              </div>
              <button
                onClick={() => setShowBibtexModal(false)}
                className="p-1 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 select-all">
              {bibtexCitation}
            </pre>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-all"
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
