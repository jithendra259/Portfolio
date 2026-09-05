'use client';

import React from 'react';
import { NoiseTexture } from '@/components/ui/effects/noise-texture';
import { SocialTooltipIcons } from '@/components/ui/widgets/social-tooltip-icons';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Data deletion', href: '#data-deletion' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-300/80 dark:border-white/10 bg-[#eaedf3] dark:bg-[#0a0c10] text-slate-900 dark:text-white transition-colors duration-300 pt-10 pb-28 sm:pb-12">
      {/* Official Default MagicUI Noise Texture */}
      <NoiseTexture id="footer-noise-texture" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 space-y-6">
        
        {/* Top Row: Original Social Tooltip Icons (Left) & Pipe-Separated Links (Right) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Original 3D Bouncing Tooltip Social Icons */}
          <div className="flex items-center justify-center md:justify-start">
            <SocialTooltipIcons />
          </div>

          {/* Right: Pipe-Separated Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            {legalLinks.map((link, idx) => (
              <React.Fragment key={link.name}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4"
                >
                  {link.name}
                </a>
                {idx < legalLinks.length - 1 && (
                  <span className="text-slate-400 dark:text-neutral-600 select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Center: Copyright */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 dark:text-neutral-500 tracking-wide font-sans">
            © {currentYear} {PORTFOLIO_DATA.developer.fullName}.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
