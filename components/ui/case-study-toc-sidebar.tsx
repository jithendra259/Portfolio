'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  BookMarked,
  Layers,
  FileText,
  BarChart3,
  Activity,
  Sparkles,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sidebar001,
  Sidebar001Content,
  Sidebar001Footer,
  Sidebar001Group,
  Sidebar001Header,
  Sidebar001Item,
  Sidebar001Section,
} from '@/components/ui/sidebar-001';

export interface CaseStudyTocSidebarProps {
  hasAblation?: boolean;
  paperTitle?: string;
  className?: string;
  onNavigate?: () => void;
}

export function CaseStudyTocSidebar({
  hasAblation = true,
  paperTitle = 'Case Study',
  className,
  onNavigate,
}: CaseStudyTocSidebarProps) {
  const [active, setActive] = useState<string>('#sec-abstract');

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      '#sec-abstract',
      '#sec-intro',
      '#subsec-intro-problem',
      '#subsec-intro-solution',
      '#sec-math',
      '#subsec-math-cvar',
      '#subsec-math-graph',
      '#sec-arch',
      '#subsec-arch-fig1',
      '#subsec-arch-stages',
      '#sec-eval',
      '#subsec-eval-table',
      '#subsec-eval-figures',
      '#subsec-eval-charts',
      '#sec-ablation',
      '#sec-conclusion',
      '#sec-references',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.querySelector(sectionIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActive(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActive(href);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
    }
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <Sidebar001
      defaultWidth={260}
      minWidth={200}
      maxWidth={340}
      className={className}
    >
      <Sidebar001Header>
        <div className="flex items-center gap-2 px-1">
          <BookMarked size={16} className="text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
            Table of Contents
          </span>
        </div>
      </Sidebar001Header>

      <Sidebar001Content>
        {/* PRELIMINARY SECTION */}
        <Sidebar001Section label="Preliminary">
          <Sidebar001Item
            href="#sec-abstract"
            label="Abstract & Index Terms"
            isActive={active === '#sec-abstract'}
            onClick={(e) => handleClick(e, '#sec-abstract')}
          />
        </Sidebar001Section>

        {/* CORE RESEARCH SECTIONS */}
        <Sidebar001Section label="Paper Sections">
          {/* I. Introduction Group */}
          <Sidebar001Group
            label="I. Introduction"
            defaultOpen={true}
            icon={<FileText />}
          >
            <Sidebar001Item
              href="#sec-intro"
              label="Overview"
              isActive={active === '#sec-intro'}
              onClick={(e) => handleClick(e, '#sec-intro')}
            />
            <Sidebar001Item
              href="#subsec-intro-problem"
              label="Problem Statement"
              isActive={active === '#subsec-intro-problem'}
              onClick={(e) => handleClick(e, '#subsec-intro-problem')}
            />
            <Sidebar001Item
              href="#subsec-intro-solution"
              label="Engineered Solution"
              isActive={active === '#subsec-intro-solution'}
              onClick={(e) => handleClick(e, '#subsec-intro-solution')}
            />
          </Sidebar001Group>

          {/* II. Mathematical Formulation Group */}
          <Sidebar001Group
            label="II. Formulation"
            defaultOpen={true}
            icon={<Sparkles />}
          >
            <Sidebar001Item
              href="#sec-math"
              label="Mathematical Framework"
              isActive={active === '#sec-math'}
              onClick={(e) => handleClick(e, '#sec-math')}
            />
            <Sidebar001Item
              href="#subsec-math-cvar"
              label="Equation (1): CVaR"
              isActive={active === '#subsec-math-cvar'}
              onClick={(e) => handleClick(e, '#subsec-math-cvar')}
            />
            <Sidebar001Item
              href="#subsec-math-graph"
              label="Equation (2): Graph Risk"
              isActive={active === '#subsec-math-graph'}
              onClick={(e) => handleClick(e, '#subsec-math-graph')}
            />
          </Sidebar001Group>

          {/* III. System Architecture Group */}
          <Sidebar001Group
            label="III. Architecture"
            defaultOpen={true}
            icon={<Layers />}
          >
            <Sidebar001Item
              href="#sec-arch"
              label="Architecture Overview"
              isActive={active === '#sec-arch'}
              onClick={(e) => handleClick(e, '#sec-arch')}
            />
            <Sidebar001Item
              href="#subsec-arch-fig1"
              label="Fig. 1 Schematic"
              isActive={active === '#subsec-arch-fig1'}
              isNew={true}
              onClick={(e) => handleClick(e, '#subsec-arch-fig1')}
            />
            <Sidebar001Item
              href="#subsec-arch-stages"
              label="Modular Pipeline"
              isActive={active === '#subsec-arch-stages'}
              onClick={(e) => handleClick(e, '#subsec-arch-stages')}
            />
          </Sidebar001Group>

          {/* IV. Empirical Evaluation Group */}
          <Sidebar001Group
            label="IV. Evaluation"
            defaultOpen={true}
            icon={<BarChart3 />}
          >
            <Sidebar001Item
              href="#sec-eval"
              label="Benchmark Results"
              isActive={active === '#sec-eval'}
              onClick={(e) => handleClick(e, '#sec-eval')}
            />
            <Sidebar001Item
              href="#subsec-eval-table"
              label="Table I: Metrics"
              isActive={active === '#subsec-eval-table'}
              onClick={(e) => handleClick(e, '#subsec-eval-table')}
            />
            <Sidebar001Item
              href="#subsec-eval-figures"
              label="Research Plots (Fig 2-5)"
              isActive={active === '#subsec-eval-figures'}
              onClick={(e) => handleClick(e, '#subsec-eval-figures')}
            />
            <Sidebar001Item
              href="#subsec-eval-charts"
              label="Interactive Charts"
              isActive={active === '#subsec-eval-charts'}
              isNew={true}
              onClick={(e) => handleClick(e, '#subsec-eval-charts')}
            />
          </Sidebar001Group>

          {/* V. Ablation Studies (Optional based on figures count) */}
          {hasAblation && (
            <Sidebar001Group
              label="V. Ablations"
              defaultOpen={false}
              icon={<Activity />}
            >
              <Sidebar001Item
                href="#sec-ablation"
                label="Sensitivity Analysis"
                isActive={active === '#sec-ablation'}
                onClick={(e) => handleClick(e, '#sec-ablation')}
              />
            </Sidebar001Group>
          )}

          {/* VI. Conclusion */}
          <Sidebar001Item
            href="#sec-conclusion"
            label="VI. Conclusion"
            isActive={active === '#sec-conclusion'}
            onClick={(e) => handleClick(e, '#sec-conclusion')}
          />
        </Sidebar001Section>

        {/* CITATIONS & REFERENCES */}
        <Sidebar001Section label="Scholarly References">
          <Sidebar001Item
            href="#sec-references"
            label="References List"
            isActive={active === '#sec-references'}
            onClick={(e) => handleClick(e, '#sec-references')}
          />
        </Sidebar001Section>
      </Sidebar001Content>

      <Sidebar001Footer>
        <div className="flex items-center justify-between text-[11px] font-mono text-foreground/50 px-1">
          <span>IEEE Case Study</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">Peer-Reviewed</span>
        </div>
      </Sidebar001Footer>
    </Sidebar001>
  );
}

/**
 * Responsive Case Study Navigation Wrapper
 * - Desktop: Sticky sidebar with interactive hover effects and resize handle
 * - Mobile (<xl): Floating 'Contents' pill that slides out a dedicated drawer
 */
export function CaseStudyToc({
  hasAblation = true,
  paperTitle = 'Case Study',
  className,
}: CaseStudyTocSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* DESKTOP STICKY SIDEBAR (xl+) */}
      <aside className="hidden xl:block sticky top-24 self-start h-[calc(100vh-8rem)] shrink-0 z-20">
        <div className="h-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#10131a]/85 backdrop-blur-xl shadow-xs overflow-hidden">
          <CaseStudyTocSidebar
            hasAblation={hasAblation}
            paperTitle={paperTitle}
            className="h-full border-0"
          />
        </div>
      </aside>

      {/* MOBILE / TABLET FLOATING BUTTON & DRAWER (xl:hidden) */}
      <div className="xl:hidden">
        {/* Floating Quick Navigation Pill */}
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-950/90 dark:bg-white/90 text-white dark:text-slate-950 shadow-2xl backdrop-blur-md text-xs font-mono font-bold hover:scale-105 active:scale-95 transition-all border border-white/20 dark:border-black/20"
          aria-label="Open Table of Contents"
        >
          <BookMarked className="size-4 text-cyan-400 dark:text-cyan-600" />
          <span>Contents</span>
        </button>

        {/* Mobile Slide-Over Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-[290px] sm:w-[340px] bg-white dark:bg-[#10131a] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <BookMarked size={16} className="text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Table of Contents
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-hidden">
                  <CaseStudyTocSidebar
                    hasAblation={hasAblation}
                    paperTitle={paperTitle}
                    onNavigate={() => setMobileOpen(false)}
                    className="h-full w-full border-0"
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
