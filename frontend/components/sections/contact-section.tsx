'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PearlButton } from '@/components/ui/pearl-button';
import { contactIcons } from '@/components/ui/widgets/contact-floating-icons';
import { EmailRevealButton } from '@/components/ui/widgets/email-reveal-button';
import { FloatingIconsHero } from '@/components/ui/widgets/floating-icons-hero-section';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export function ContactSection() {
  const router = useRouter();

  React.useEffect(() => {
    router.prefetch('/book-appointment');
  }, [router]);

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <FloatingIconsHero
        title="Let's Build Intelligent Systems Together"
        subtitle="Open for AI Engineering & Quantitative Research roles, thesis collaborations, and technical discussions in multi-agent swarms, convex portfolio risk, and real-time voice architectures."
        icons={contactIcons}
        className="h-auto min-h-[780px] bg-transparent py-24"
      >
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-5 py-4">
          {/* Pearl Button redirects directly to /book-appointment with exact original UI */}
          <PearlButton label="Book Appointment" onClick={() => router.push('/book-appointment')} />

          {/* Gmail Copy Button placed BELOW */}
          <EmailRevealButton
            name={PORTFOLIO_DATA.developer.fullName}
            email={PORTFOLIO_DATA.developer.email}
          />
        </div>
      </FloatingIconsHero>
    </section>
  );
}
