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
import { BookMarked, Layers, Bell, PanelLeft, PanelLeftClose, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none',
        isOpen
          ? 'bg-[#f12e54]/10 text-[#f12e54] border border-[#f12e54]/30 hover:bg-[#f12e54]/20'
          : 'text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10',
        className
      )}
      title={isOpen ? 'Collapse Table of Contents' : 'Open Table of Contents'}
      aria-label="Toggle Table of Contents Sidebar"
    >
      <PanelLeft className="size-3.5 shrink-0" />
      <span className="hidden xs:inline sm:inline">
        {isOpen ? 'Hide TOC' : 'Table of Contents'}
      </span>
      <span className="inline xs:hidden sm:hidden">TOC</span>
    </button>
  );
}

// ─── NAV Data (Exact UI Structure from prompt) ──────────────────────────────

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

function getCaseStudyNav(hasAblation: boolean): NavSection[] {
  return [
    {
      label: 'Case Study',
      items: [
        { href: '#sec-abstract', label: 'Abstract & Index Terms' },
      ],
    },
    {
      label: 'Sections',
      items: [],
      groups: [
        {
          label: 'I. Introduction',
          defaultOpen: true,
          icon: <Layers />,
          items: [
            { href: '#sec-intro', label: 'Overview' },
            { href: '#subsec-intro-problem', label: 'Problem Statement' },
            { href: '#subsec-intro-solution', label: 'Engineered Solution' },
          ],
        },
        {
          label: 'II. Formulation',
          defaultOpen: true,
          icon: <Layers />,
          items: [
            { href: '#sec-math', label: 'Mathematical Framework' },
            { href: '#subsec-math-cvar', label: 'Equation (1): CVaR' },
            { href: '#subsec-math-graph', label: 'Equation (2): Graph Risk' },
          ],
        },
        {
          label: 'III. Architecture',
          defaultOpen: true,
          icon: <Layers />,
          items: [
            { href: '#sec-arch', label: 'System Overview' },
            { href: '#subsec-arch-fig1', label: 'Fig. 1 Schematic', isNew: true },
            { href: '#subsec-arch-stages', label: 'Modular Pipeline' },
          ],
        },
        {
          label: 'IV. Evaluation',
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
                label: 'V. Ablations',
                defaultOpen: false,
                icon: <Layers />,
                items: [
                  { href: '#sec-ablation', label: 'Sensitivity Analysis' },
                ],
              },
            ]
          : []),
        {
          label: 'VI. Conclusion',
          defaultOpen: false,
          icon: <Layers />,
          items: [
            { href: '#sec-conclusion', label: 'Conclusion & Directions' },
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
  className?: string;
  onNavigate?: () => void;
}

export function CaseStudyTocSidebar({
  hasAblation = true,
  className,
  onNavigate,
}: CaseStudyTocSidebarProps) {
  const [active, setActive] = useState<string>('#sec-abstract');
  const NAV = React.useMemo(() => getCaseStudyNav(hasAblation), [hasAblation]);

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
      defaultWidth={240}
      minWidth={180}
      maxWidth={360}
      className={cn('border-r border-border/50 h-full', className)}
    >
      <Sidebar001Header>
        <div className="flex items-center gap-2">
          <BookMarked size={18} className="text-foreground" />
          <span className="text-base font-semibold text-foreground">
            Docs
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

export function CaseStudyLayout({
  hasAblation = true,
  children,
}: {
  hasAblation?: boolean;
  children: React.ReactNode;
}) {
  const { isOpen, close } = useCaseStudySidebar();

  return (
    <div className="relative w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-start gap-8 lg:gap-10 relative">
          
          {/* DESKTOP SIDEBAR (Controlled by Navbar Toggle) */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                className="hidden xl:block sticky top-24 self-start h-[calc(100vh-8rem)] shrink-0 z-20 overflow-hidden"
              >
                <div className="h-full rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xs overflow-hidden">
                  <CaseStudyTocSidebar hasAblation={hasAblation} />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* MOBILE / TABLET OVERLAY DRAWER (Toggled by Navbar Button on <xl) */}
          <div className="xl:hidden">
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={close}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
                  />

                  {/* Drawer Content */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                    className="fixed top-0 left-0 bottom-0 z-50 w-[280px] sm:w-[320px] bg-background border-r border-border/50 shadow-2xl flex flex-col"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <BookMarked size={18} className="text-foreground" />
                        <span className="text-base font-semibold text-foreground">
                          Docs
                        </span>
                      </div>
                      <button
                        onClick={close}
                        className="p-1 rounded-md text-foreground/50 hover:text-foreground cursor-pointer"
                        aria-label="Close sidebar"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <CaseStudyTocSidebar
                        hasAblation={hasAblation}
                        onNavigate={close}
                        className="border-0 w-full h-full"
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Main Case Study Article */}
          <div className="flex-1 min-w-0 max-w-4xl transition-all duration-300">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
