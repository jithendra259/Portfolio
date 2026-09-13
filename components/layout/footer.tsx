'use client';

import React from 'react';
import { NoiseTexture } from '@/components/ui/effects/noise-texture';
import { SocialTooltipIcons } from '@/components/ui/widgets/social-tooltip-icons';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';

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
    <footer className="relative overflow-hidden border-t border-slate-300/80 dark:border-white/10 bg-[#eaedf3] dark:bg-[#07080b] text-slate-900 dark:text-white transition-colors duration-300 pt-16 pb-28 sm:pb-14">
      {/* Top subtle ambient highlight gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-purple-500/30 to-transparent pointer-events-none" />

      {/* Official Noise Texture */}
      <NoiseTexture id="footer-noise-texture" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16 space-y-12">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Identity, Role, Status & Social Tooltips (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-neutral-200 text-white dark:text-black font-black text-sm shadow-md">
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

            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed max-w-lg">
              M.Tech AI & Data Science researcher and full-stack systems engineer focused on autonomous multi-agent systems, quantitative finance risk analytics, and explainable AI.
            </p>

            {/* 3D Tooltip Social Icons */}
            <div className="pt-2">
              <SocialTooltipIcons />
            </div>
          </div>

          {/* Column 2: Navigation Sitemap (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-neutral-500">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200 inline-block py-0.5"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Research & Publications (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
              <BookOpen className="size-3.5" />
              <span>Research & Publications</span>
            </h4>
            <ul className="space-y-3 text-xs">
              {researchHighlights.map((pub) => (
                <li key={pub.title}>
                  <a
                    href={pub.href}
                    className="group block text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                  >
                    <div className="font-semibold text-slate-900 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1">
                      <span>{pub.title}</span>
                      <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-500 mt-0.5">
                      {pub.desc}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-slate-300/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-neutral-500 font-sans">
          <p>
            © {currentYear} {PORTFOLIO_DATA.developer.fullName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-slate-400 dark:text-neutral-600">
              Built with Next.js, React & Tailwind CSS
            </span>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300/80 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white transition-all duration-200 cursor-pointer text-xs font-medium"
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
