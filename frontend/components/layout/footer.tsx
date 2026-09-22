'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight, BookOpen } from 'lucide-react';
import { NoiseTexture } from '@/components/ui/effects/noise-texture';
import { SocialTooltipIcons } from '@/components/ui/widgets/social-tooltip-icons';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Research', href: '#research' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Experience', href: '#experience' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const researchHighlights = [
    {
      title: 'Elsevier EAAI (Under Review)',
      desc: 'Multi-Agent Portfolio Governance',
      href: '#research',
    },
    {
      title: 'Springer Research Series',
      desc: 'Explainable AI & Risk Engines',
      href: '#research',
    },
    {
      title: 'Swarm Robotics System',
      desc: 'Autonomous Agriculture Coordination',
      href: '#projects',
    },
    {
      title: 'Personalised AQI System',
      desc: 'Spatial-Temporal Air Quality AI',
      href: '#projects',
    },
  ];

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-300/80 bg-[#eaedf3] pt-16 pb-28 text-slate-900 transition-colors duration-300 sm:pb-14 dark:border-white/10 dark:bg-[#07080b] dark:text-white">
      {/* Top subtle ambient highlight gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent dark:via-purple-500/30" />

      {/* Official Noise Texture */}
      <NoiseTexture id="footer-noise-texture" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-6 sm:px-10 md:px-14 lg:px-16">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: Identity, Role, Status & Social Tooltips (6 cols) */}
          <div className="space-y-5 lg:col-span-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-sm font-black text-white shadow-md dark:from-white dark:to-neutral-200 dark:text-black">
                J
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  {PORTFOLIO_DATA.developer.fullName}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-neutral-400">
                  {PORTFOLIO_DATA.developer.headline}
                </p>
              </div>
            </div>

            <p className="max-w-lg text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-neutral-400">
              M.Tech AI & Data Science researcher and full-stack systems engineer focused on
              autonomous multi-agent systems, quantitative finance risk analytics, and explainable
              AI.
            </p>

            {/* 3D Tooltip Social Icons */}
            <div className="pt-2">
              <SocialTooltipIcons />
            </div>

            {/* Contact Number */}
            <p className="text-xs text-slate-500 dark:text-neutral-500">Contact: 9704400336</p>
          </div>

          {/* Column 2: Navigation Sitemap (3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="font-mono text-xs font-bold tracking-widest text-slate-400 uppercase dark:text-neutral-500">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="inline-block py-0.5 text-slate-600 transition-colors duration-200 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Research & Publications (3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest text-slate-400 uppercase dark:text-neutral-500">
              <BookOpen className="size-3.5" />
              <span>Research & Publications</span>
            </h4>
            <ul className="space-y-3 text-xs">
              {researchHighlights.map((pub) => (
                <li key={pub.title}>
                  <a
                    href={pub.href}
                    className="group block text-slate-700 transition-colors hover:text-slate-950 dark:text-neutral-300 dark:hover:text-white"
                  >
                    <div className="flex items-center gap-1 font-semibold text-slate-900 group-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-blue-400">
                      <span>{pub.title}</span>
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500 dark:text-neutral-500">
                      {pub.desc}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-300/80 pt-8 font-sans text-xs text-slate-500 sm:flex-row dark:border-white/10 dark:text-neutral-500">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <p>
              © {currentYear} {PORTFOLIO_DATA.developer.fullName}. All rights reserved.
            </p>
            <span className="hidden text-slate-300 sm:inline dark:text-neutral-700">·</span>
            <span className="text-slate-400 dark:text-neutral-600">9704400336</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden text-slate-400 md:inline dark:text-neutral-600">
              Built with Next.js, React & Tailwind CSS
            </span>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
