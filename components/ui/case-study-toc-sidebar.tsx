'use client';

import * as React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Sidebar001,
  Sidebar001Content,
  Sidebar001Footer,
  Sidebar001Group,
  Sidebar001Header,
  Sidebar001Item,
  Sidebar001Section,
} from '@/components/ui/sidebar-001';
import { BookMarked, BookOpen, Layers, Bell, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaperSection } from '@/data/projects/types';

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
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = React.useMemo(
    () => ({ isOpen, toggle, open, close }),
    [isOpen, toggle, open, close]
  );

  return (
    <CaseStudySidebarContext.Provider value={value}>
      {children}
    </CaseStudySidebarContext.Provider>
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
        'inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none',
        isOpen
          ? 'bg-[#f12e54]/15 text-[#f12e54] border border-[#f12e54]/40 hover:bg-[#f12e54]/25'
          : 'text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10',
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
        items: [
          { href: '#sec-abstract', label: 'Abstract & Terms' },
          ...topItems,
        ],
      },
      {
        label: 'Paper Sections',
        items: [],
        groups: paperGroups,
      },
      {
        label: 'Resources',
        items: [
          { href: '#sec-references', label: 'Scholarly References' },
        ],
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
      items: [
        { href: '#sec-math', label: 'Formulation' },
      ],
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
                items: [
                  { href: '#sec-ablation', label: 'Sensitivity Analysis' },
                ],
              },
            ]
          : []),
        {
          label: 'Conclusion',
          defaultOpen: false,
          icon: <Layers />,
          items: [
            { href: '#sec-conclusion', label: 'Directions & Outlook' },
          ],
        },
      ],
    },
    {
      label: 'Resources',
      items: [
        { href: '#sec-references', label: 'Scholarly References' },
      ],
    },
  ];
}

// ─── CaseStudyTocSidebar Component ──────────────────────────────────────────

export interface CaseStudyTocSidebarProps {
  hasAblation?: boolean;
  sections?: PaperSection[];
  className?: string;
  onNavigate?: () => void;
}

export function CaseStudyTocSidebar({
  hasAblation = true,
  sections,
  className,
  onNavigate,
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

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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
      className={cn('border-r border-border/40 font-mono select-none overflow-y-auto', className)}
    >
      <Sidebar001Header className="pb-2 border-b border-border/30">
        <div className="flex items-center gap-2 px-2 py-1">
          <BookOpen className="size-4 text-[#f12e54]" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            Table of Contents
          </span>
        </div>
      </Sidebar001Header>

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
        <span className="text-xs text-foreground/40">v1.0.0</span>
      </Sidebar001Footer>
    </Sidebar001>
  );
}

// ─── CaseStudyLayout Client Component ───────────────────────────────────────
// TOC and Matter side by side directly, visible on mobile & desktop, no blur.

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
    <div className="flex w-full min-h-[calc(100vh-4rem)] bg-background">
      {/* TOC SIDEBAR - SIDE BY SIDE ON BOTH DESKTOP AND MOBILE (NO BLUR) */}
      {isOpen && (
        <aside className="sticky top-16 self-start h-[calc(100vh-4rem)] shrink-0 z-20 bg-background">
          <CaseStudyTocSidebar
            hasAblation={hasAblation}
            sections={sections}
            className="h-full bg-background"
          />
        </aside>
      )}

      {/* MATTER / MAIN CONTENT - SIDE BY SIDE SEPARATED BY BORDER-L */}
      <div className="flex-1 min-w-0 border-l border-border/50 bg-background py-6 sm:py-10 px-2 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
