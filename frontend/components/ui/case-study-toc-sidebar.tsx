'use client';

import * as React from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Bell, BookMarked, BookOpen, Layers, PanelLeft } from 'lucide-react';
import {
  Sidebar001,
  Sidebar001Content,
  Sidebar001Footer,
  Sidebar001Group,
  Sidebar001Header,
  Sidebar001Item,
  Sidebar001Section,
} from '@/components/ui/sidebar-001';
import { PaperSection } from '@/data/projects/types';
import { cn } from '@/lib/utils';

// ─── Sidebar Context for Navbar Toggle ──────────────────────────────────────

interface CaseStudySidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const CaseStudySidebarContext = createContext<CaseStudySidebarContextType>({
  isOpen: true,
  toggle: () => {},
  open: () => {},
  close: () => {},
});

export function useCaseStudySidebar() {
  return useContext(CaseStudySidebarContext);
}

export function CaseStudySidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOpen(window.innerWidth >= 768);
    }
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = React.useMemo(
    () => ({ isOpen, toggle, open, close }),
    [isOpen, toggle, open, close]
  );

  return (
    <CaseStudySidebarContext.Provider value={value}>{children}</CaseStudySidebarContext.Provider>
  );
}

// ─── Navbar Toggle Button ───────────────────────────────────────────────────

export function CaseStudySidebarToggle({ className }: { className?: string }) {
  const { isOpen, toggle } = useCaseStudySidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'hidden shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs font-semibold transition-all duration-200 select-none md:inline-flex',
        isOpen
          ? 'border border-[#f12e54]/40 bg-[#f12e54]/15 text-[#f12e54] hover:bg-[#f12e54]/25'
          : 'border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white',
        className
      )}
      title={isOpen ? 'Hide Table of Contents' : 'Show Table of Contents'}
      aria-label="Toggle Table of Contents Sidebar"
    >
      <PanelLeft className="size-3.5 shrink-0" />
      <span>{isOpen ? 'Hide TOC' : 'Show TOC'}</span>
    </button>
  );
}

// ─── Dynamic NAV Data Generation ──────────────────────────────────────────

interface NavItem {
  href: string;
  label: string;
  isNew?: boolean;
}

interface NavGroup {
  label: string;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  items: NavItem[];
}

interface NavSection {
  label: string;
  items: NavItem[];
  groups?: NavGroup[];
}

function getCaseStudyNav(hasAblation: boolean, sections?: PaperSection[]): NavSection[] {
  if (sections && sections.length > 0) {
    const paperGroups: NavGroup[] = [];
    const topItems: NavItem[] = [];

    sections.forEach((sec) => {
      const secLabel = `${sec.number ? sec.number + ' ' : ''}${sec.title}`;
      if (sec.subsections && sec.subsections.length > 0) {
        paperGroups.push({
          label: secLabel,
          defaultOpen: true,
          icon: <Layers />,
          items: [
            { href: `#${sec.id}`, label: 'Overview' },
            ...sec.subsections.map((sub) => ({
              href: `#${sub.id}`,
              label: `${sub.number ? sub.number + ' ' : ''}${sub.title}`,
            })),
          ],
        });
      } else {
        topItems.push({
          href: `#${sec.id}`,
          label: secLabel,
        });
      }
    });

    return [
      {
        label: 'Getting Started',
        items: [{ href: '#sec-abstract', label: 'Abstract & Terms' }, ...topItems],
      },
      {
        label: 'Paper Sections',
        items: [],
        groups: paperGroups,
      },
      {
        label: 'Resources',
        items: [{ href: '#sec-references', label: 'Scholarly References' }],
      },
    ];
  }
  return [
    {
      label: 'Getting Started',
      items: [
        { href: '#sec-abstract', label: 'Abstract & Terms' },
        { href: '#sec-intro', label: 'Introduction' },
        { href: '#subsec-intro-problem', label: 'Problem Statement' },
        { href: '#subsec-intro-solution', label: 'Engineered Solution', isNew: true },
      ],
    },
    {
      label: 'Paper Sections',
      items: [{ href: '#sec-math', label: 'Formulation' }],
      groups: [
        {
          label: 'Formulation Equations',
          defaultOpen: true,
          icon: <Layers />,
          items: [
            { href: '#subsec-math-cvar', label: 'Equation (1): CVaR' },
            { href: '#subsec-math-graph', label: 'Equation (2): Graph Risk' },
          ],
        },
        {
          label: 'System Architecture',
          defaultOpen: true,
          icon: <Layers />,
          items: [
            { href: '#sec-arch', label: 'Pipeline Overview' },
            { href: '#subsec-arch-fig1', label: 'Fig. 1 Schematic', isNew: true },
            { href: '#subsec-arch-stages', label: 'Modular Pipeline' },
          ],
        },
        {
          label: 'Empirical Evaluation',
          defaultOpen: true,
          icon: <Bell />,
          items: [
            { href: '#sec-eval', label: 'Benchmark Results' },
            { href: '#subsec-eval-table', label: 'Table I: Metrics' },
            { href: '#subsec-eval-figures', label: 'Research Plots (Fig 2-5)' },
            { href: '#subsec-eval-charts', label: 'Interactive Charts', isNew: true },
          ],
        },
        ...(hasAblation
          ? [
              {
                label: 'Ablations & Analysis',
                defaultOpen: false,
                icon: <Layers />,
                items: [{ href: '#sec-ablation', label: 'Sensitivity Analysis' }],
              },
            ]
          : []),
        {
          label: 'Conclusion',
          defaultOpen: false,
          icon: <Layers />,
          items: [{ href: '#sec-conclusion', label: 'Directions & Outlook' }],
        },
      ],
    },
    {
      label: 'Resources',
      items: [{ href: '#sec-references', label: 'Scholarly References' }],
    },
  ];
}

// ─── CaseStudyTocSidebar Component ──────────────────────────────────────────

export interface CaseStudyTocSidebarProps {
  hasAblation?: boolean;
  sections?: PaperSection[];
  className?: string;
  onNavigate?: () => void;
  hideHeader?: boolean;
}

export function CaseStudyTocSidebar({
  hasAblation = true,
  sections,
  className,
  onNavigate,
  hideHeader = false,
}: CaseStudyTocSidebarProps) {
  const [active, setActive] = useState<string>('#sec-abstract');
  const [defaultW, setDefaultW] = useState(240);
  const NAV = React.useMemo(() => getCaseStudyNav(hasAblation, sections), [hasAblation, sections]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setDefaultW(170);
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const allHrefs: string[] = [];
    NAV.forEach((sec) => {
      sec.items.forEach((item) => allHrefs.push(item.href));
      sec.groups?.forEach((g) => g.items.forEach((item) => allHrefs.push(item.href)));
    });

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = allHrefs.length - 1; i >= 0; i--) {
        const el = document.querySelector(allHrefs[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActive(allHrefs[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [NAV]);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
      defaultWidth={defaultW}
      className={cn('border-border/40 overflow-y-auto border-r font-mono select-none', className)}
    >
      {!hideHeader && (
        <Sidebar001Header className="border-border/30 border-b pb-2">
          <div className="flex items-center gap-2 px-2 py-1">
            <BookOpen className="size-4 text-[#f12e54]" />
            <span className="text-foreground text-xs font-bold tracking-wider uppercase">
              Table of Contents
            </span>
          </div>
        </Sidebar001Header>
      )}

      <Sidebar001Content>
        {NAV.map((section) => (
          <Sidebar001Section key={section.label} label={section.label}>
            {section.items.map((item) => (
              <Sidebar001Item
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={active === item.href}
                isNew={item.isNew}
                onClick={(e) => handleItemClick(e, item.href)}
              />
            ))}
            {section.groups?.map((group) => (
              <Sidebar001Group
                key={group.label}
                label={group.label}
                defaultOpen={group.defaultOpen}
                icon={group.icon}
              >
                {group.items.map((item) => (
                  <Sidebar001Item
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={active === item.href}
                    isNew={item.isNew}
                    onClick={(e) => handleItemClick(e, item.href)}
                  />
                ))}
              </Sidebar001Group>
            ))}
          </Sidebar001Section>
        ))}
      </Sidebar001Content>

      <Sidebar001Footer>
        <span className="text-foreground/40 text-xs">v1.0.0</span>
      </Sidebar001Footer>
    </Sidebar001>
  );
}

// ─── CaseStudyLayout Client Component ───────────────────────────────────────
// Desktop (>= 768px): TOC and Matter side by side with border-l.
// Mobile (< 768px): Clean, full-width distraction-free reading experience without sidebar/drawer clutter.

export function CaseStudyLayout({
  hasAblation = true,
  sections,
  children,
}: {
  hasAblation?: boolean;
  sections?: PaperSection[];
  children: React.ReactNode;
}) {
  const { isOpen } = useCaseStudySidebar();

  return (
    <div className="bg-background relative flex min-h-[calc(100vh-4rem)] w-full">
      {/* DESKTOP TOC SIDEBAR - SIDE BY SIDE ON >= 768px (md) ONLY */}
      {isOpen && (
        <aside className="bg-background sticky top-16 z-20 hidden h-[calc(100vh-4rem)] shrink-0 self-start md:block">
          <CaseStudyTocSidebar
            hasAblation={hasAblation}
            sections={sections}
            className="bg-background h-full"
          />
        </aside>
      )}

      {/* MATTER / MAIN CONTENT - FULL WIDTH ON MOBILE, SIDE BY SIDE WITH BORDER-L ON DESKTOP */}
      <div className="border-border/50 bg-background min-w-0 flex-1 px-3 py-4 sm:px-6 sm:py-8 md:border-l lg:px-8 lg:py-10">
        {children}
      </div>
    </div>
  );
}
