'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DayNightSwitch } from '@/components/ui/day-night-switch';
import { cn } from '@/lib/utils';
import { ArrowUpRight, TextAlignJustify } from 'lucide-react';

export type NavigationSection = {
  title: string;
  href: string;
};

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Projects', href: '#projects' },
  { title: 'Experience', href: '#experience' },
  { title: 'Contact', href: '#contact' },
];

const CollaborateButton = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <Button
    onClick={onClick}
    className={cn(
      'relative text-xs font-semibold rounded-full h-8.5 px-4 group transition-all duration-300 hover:scale-105 overflow-hidden',
      'bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-neutral-200',
      'border border-slate-700 dark:border-white/20 shadow-md cursor-pointer flex items-center gap-1.5',
      className
    )}
  >
    <span className="font-sans font-semibold tracking-wide">
      Let&apos;s Collaborate
    </span>
    <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </Button>
);

export const Navbar = ({ onStartCall }: { onStartCall?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleCollaborate = () => {
    if (onStartCall) {
      onStartCall();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[100] flex justify-center pointer-events-none">
      {/* Top-Docked Sticky Glassmorphism Navigation Bar */}
      <nav
        className={cn(
          'pointer-events-auto relative flex items-center justify-between gap-6 sm:gap-10 md:gap-14 px-6 sm:px-10 py-3 sm:py-3.5 transition-all duration-300',
          'bg-white/60 dark:bg-black/40 backdrop-blur-2xl backdrop-saturate-150',
          'rounded-b-[2rem] border-b border-x border-slate-200/80 dark:border-white/10',
          'shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.65)]',
          'max-w-5xl w-auto mx-auto'
        )}
      >
        {/* Top subtle highlight reflection line */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none" />

        {/* Brand Logo & Name (Click to Replay Opening Animation) */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("replay-cinematic-intro"));
            }
          }}
          title="Replay Opening Animation"
          className="flex items-center gap-2.5 text-slate-900 dark:text-white group hover:opacity-90 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/80 dark:bg-white/10 border border-slate-300/80 dark:border-white/15 shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xs font-black tracking-widest text-slate-900 dark:text-white">J</span>
          </div>
          <span className="text-xs font-bold tracking-[0.2em] font-mono text-slate-900 dark:text-neutral-200 hidden sm:inline">
            JITHENDRA
          </span>
        </button>

        {/* Center Navigation Links with Glassy Floating Feel */}
        <div className="hidden md:flex items-center gap-7 lg:gap-10 text-sm font-medium tracking-wide">
          {navigationData.map((navItem) => (
            <a
              key={navItem.title}
              href={navItem.href}
              className="text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white transition-colors duration-200 text-[13.5px] font-sans tracking-wide"
            >
              {navItem.title}
            </a>
          ))}
        </div>

        {/* Right Section: Collaborate CTA Button, Day/Night Theme Switch, & Mobile Menu */}
        <div className="flex items-center gap-3">
          <CollaborateButton className="hidden lg:flex" onClick={handleCollaborate} />
          <DayNightSwitch size="6px" />

          {/* Mobile Dropdown Menu Trigger */}
          <div className="md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger
                id="navbar-mobile-menu-trigger"
                className="flex cursor-pointer items-center justify-center rounded-full border border-slate-300/80 dark:border-white/15 bg-slate-100/80 dark:bg-white/10 p-2 text-slate-900 dark:text-white outline-none transition hover:border-slate-400 dark:hover:border-white/30"
              >
                <TextAlignJustify size={16} />
                <span className="sr-only">Menu</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="mt-3 w-52 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0c0c0e]/95 p-2 text-slate-900 dark:text-white backdrop-blur-2xl shadow-2xl"
              >
                {navigationData.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-800 dark:text-neutral-200 focus:bg-slate-100 dark:focus:bg-neutral-800 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <a href={item.href} className="w-full">
                      {item.title}
                    </a>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  className="mt-1 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black px-3 py-2 font-semibold text-xs cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setIsOpen(false);
                    handleCollaborate();
                  }}
                >
                  <span>Let&apos;s Collaborate</span>
                  <ArrowUpRight size={13} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
