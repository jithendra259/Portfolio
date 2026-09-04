'use client';

import * as React from 'react';
import { FloatingIconsHero } from '@/components/ui/floating-icons-hero-section';
import { demoIcons } from '@/components/ui/floating-icons-hero-demo';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export function ContactSection() {
  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <FloatingIconsHero
        title="A World of Innovation"
        subtitle="Explore a universe of possibilities with our platform, connecting you to the tools and technologies that shape the future."
        ctaText="Join the Revolution"
        ctaHref={`mailto:${PORTFOLIO_DATA.developer.email}`}
        icons={demoIcons}
        className="bg-transparent h-auto min-h-[780px] py-24"
      />
    </section>
  );
}
