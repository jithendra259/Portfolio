'use client';

import * as React from 'react';
import { FloatingIconsHero } from '@/components/ui/widgets/floating-icons-hero-section';
import { contactIcons } from '@/components/ui/widgets/contact-floating-icons';
import { EmailRevealButton } from '@/components/ui/widgets/email-reveal-button';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export function ContactSection() {
  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <FloatingIconsHero
        title="A World of Innovation"
        subtitle="Explore a universe of possibilities with our platform, connecting you to the tools and technologies that shape the future."
        icons={contactIcons}
        className="bg-transparent h-auto min-h-[780px] py-24"
      >
        <div className="py-2 flex justify-center w-full">
          <EmailRevealButton
            name={PORTFOLIO_DATA.developer.fullName}
            email={PORTFOLIO_DATA.developer.email}
          />
        </div>
      </FloatingIconsHero>
    </section>
  );
}
