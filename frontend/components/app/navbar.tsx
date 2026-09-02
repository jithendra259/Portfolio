'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
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
      'relative text-sm font-semibold rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden bg-slate-900 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border border-slate-700 dark:border-neutral-300 shadow-lg cursor-pointer',
      className
    )}
  >
    <span className="relative transition-all duration-500 hover:cursor-pointer font-sans text-xs sm:text-sm font-bold tracking-wide">
      Let&apos;s Collaborate
    </span>

    <div className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-900 dark:bg-black dark:text-white shadow-md transition-all duration-500 group-hover:right-[calc(100%-32px)] group-hover:rotate-45">
      <ArrowUpRight size={15} />
    </div>
  </Button>
);

export const Navbar = ({ onStartCall }: { onStartCall?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:pt-6 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-7xl">
        {/* Full Glassmorphic Navigation Bar in exact Grayscale Palette */}
        <nav
          className={cn(
            'flex h-fit items-center justify-between gap-3.5 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-500 lg:gap-6',
            'bg-white/80 dark:bg-[#111111]/75 backdrop-blur-2xl border border-slate-200 dark:border-[#3c3c3c] shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.85)]'
          )}
        >
          {/* Brand Logo & Name */}
          <a
            href="#home"
            className="flex items-center gap-2.5 rounded-full px-2 py-1 text-slate-900 dark:text-white pointer-events-auto group transition-transform hover:scale-105"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 dark:border-[#3c3c3c] bg-slate-100 dark:bg-[#1e1e1e] shadow-sm">
              <span className="text-sm font-black tracking-[0.2em] text-slate-900 dark:text-white">J</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-[0.18em] text-slate-900 dark:text-white font-mono">
                JITHENDRA
              </span>
            </div>
          </a>

          {/* Center Navigation Menu Pill */}
          <div className="pointer-events-auto">
            <NavigationMenu className="max-lg:hidden">
              <NavigationMenuList className="flex gap-1 rounded-full border border-slate-200 dark:border-[#3c3c3c] bg-slate-100/80 dark:bg-[#1e1e1e]/90 p-1 backdrop-blur-xl shadow-inner">
                {navigationData.map((navItem) => (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink
                      href={navItem.href}
                      className="rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-neutral-300 transition-all duration-300 hover:bg-slate-200 dark:hover:bg-[#3c3c3c] hover:text-slate-950 dark:hover:text-white focus:bg-slate-200 dark:focus:bg-[#3c3c3c] focus:text-slate-950 dark:focus:text-white"
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section: Collaborate Button & Day/Night Theme Switch */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <CollaborateButton className="hidden lg:flex" onClick={handleCollaborate} />
            <DayNightSwitch size="6.5px" />

            {/* Mobile Dropdown Menu Trigger */}
            <div className="lg:hidden">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="flex cursor-pointer items-center justify-center rounded-full border border-slate-200 dark:border-[#3c3c3c] bg-slate-100 dark:bg-[#1e1e1e] p-2 text-slate-900 dark:text-white outline-none transition hover:border-slate-400 dark:hover:border-[#4d4d4d] backdrop-blur-xl">
                  <TextAlignJustify size={18} />
                  <span className="sr-only">Menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="mt-2 w-56 rounded-2xl border border-slate-200 dark:border-[#3c3c3c] bg-white dark:bg-[#111111] p-2 text-slate-900 dark:text-white backdrop-blur-2xl shadow-2xl"
                >
                  {navigationData.map((item) => (
                    <DropdownMenuItem
                      key={item.title}
                      className="rounded-xl px-3 py-2 focus:bg-slate-100 dark:focus:bg-[#1e1e1e]"
                      onClick={() => setIsOpen(false)}
                    >
                      <a
                        href={item.href}
                        className="w-full cursor-pointer text-sm font-medium text-slate-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
                      >
                        {item.title}
                      </a>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    className="mt-1 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black px-3 py-2 border border-slate-800 dark:border-neutral-200"
                    onClick={() => {
                      setIsOpen(false);
                      handleCollaborate();
                    }}
                  >
                    <span className="w-full cursor-pointer text-sm font-semibold flex items-center justify-between">
                      Let&apos;s Collaborate
                      <ArrowUpRight size={14} />
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
