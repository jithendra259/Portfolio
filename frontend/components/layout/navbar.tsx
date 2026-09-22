'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { TextAlignJustify } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/primitives/dropdown-menu';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';
import { cn } from '@/lib/utils';

export type NavigationSection = {
  title: string;
  href: string;
};

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Research', href: '#research' },
  { title: 'Projects', href: '#projects' },
  { title: 'Skills', href: '#skills' },
  { title: 'Certificates', href: '#certificates' },
  { title: 'Experience', href: '#experience' },
  { title: 'Resume', href: '#resume' },
  { title: 'Contact', href: '#contact' },
];

export const Navbar = ({
  onStartCall,
  isConnected = false,
  isConnecting = false,
}: {
  onStartCall?: () => void;
  isConnected?: boolean;
  isConnecting?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center">
      {/* Top-Docked Sticky Glassmorphism Navigation Bar */}
      <nav
        className={cn(
          'pointer-events-auto relative flex items-center justify-between gap-4 px-6 py-3 transition-all duration-300 sm:gap-6 sm:px-8 sm:py-3.5 lg:gap-8',
          'bg-white/60 backdrop-blur-2xl backdrop-saturate-150 dark:bg-black/40',
          'rounded-b-[2rem] border-x border-b border-slate-200/80 dark:border-white/10',
          'shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.65)]',
          'mx-auto w-auto max-w-[95vw] xl:max-w-6xl'
        )}
      >
        {/* Top subtle highlight reflection line */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/20" />

        {/* Brand Logo & Name (Click to Replay Opening Animation) */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('replay-cinematic-intro'));
            }
          }}
          title="Replay Opening Animation"
          className="group flex shrink-0 cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left text-slate-900 transition-opacity hover:opacity-90 dark:text-white"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300/80 bg-slate-200/80 shadow-sm transition-transform group-hover:scale-105 dark:border-white/15 dark:bg-white/10">
            <span className="text-xs font-black tracking-widest text-slate-900 dark:text-white">
              J
            </span>
          </div>
          <span className="hidden font-mono text-xs font-bold tracking-[0.2em] text-slate-900 sm:inline dark:text-neutral-200">
            JITHENDRA
          </span>
        </button>

        {/* Center Navigation Links with Glassy Floating Feel */}
        <div className="hidden items-center gap-4 text-sm font-medium tracking-wide md:flex lg:gap-6">
          {navigationData.map((navItem) => (
            <a
              key={navItem.title}
              href={navItem.href}
              className="shrink-0 font-sans text-[13.5px] tracking-wide text-slate-700 transition-colors duration-200 hover:text-slate-950 dark:text-neutral-300 dark:hover:text-white"
            >
              {navItem.title}
            </a>
          ))}
        </div>

        {/* Right Section: Day/Night Theme Switch & Mobile Menu */}
        <div className="flex items-center gap-3">
          <DayNightSwitch size="6px" />

          {/* Mobile Dropdown Menu Trigger */}
          <div className="md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger
                id="navbar-mobile-menu-trigger"
                className="flex cursor-pointer items-center justify-center rounded-full border border-slate-300/80 bg-slate-100/80 p-2 text-slate-900 transition outline-none hover:border-slate-400 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-white/30"
              >
                <TextAlignJustify size={16} />
                <span className="sr-only">Menu</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="mt-3 w-52 rounded-2xl border border-slate-200/80 bg-white/90 p-2 text-slate-900 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#0c0c0e]/95 dark:text-white"
              >
                {navigationData.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:bg-slate-100 dark:text-neutral-200 dark:focus:bg-neutral-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <a href={item.href} className="w-full">
                      {item.title}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
