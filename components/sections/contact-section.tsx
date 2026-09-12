'use client';

import * as React from 'react';
import { FloatingIconsHero } from '@/components/ui/widgets/floating-icons-hero-section';
import { contactIcons } from '@/components/ui/widgets/contact-floating-icons';
import { EmailRevealButton } from '@/components/ui/widgets/email-reveal-button';
import { CalendarAppointmentBooking } from '@/components/ui/calendar-appointment-booking';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PearlButton } from '@/components/ui/pearl-button';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export function ContactSection() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpenBooking = () => setIsBookingOpen(true);
    window.addEventListener('open-appointment-booking', handleOpenBooking);
    return () => window.removeEventListener('open-appointment-booking', handleOpenBooking);
  }, []);

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <FloatingIconsHero
        title="Let's Build Intelligent Systems Together"
        subtitle="Open for AI Engineering & Quantitative Research roles, thesis collaborations, and technical discussions in multi-agent swarms, convex portfolio risk, and real-time voice architectures."
        icons={contactIcons}
        className="bg-transparent h-auto min-h-[780px] py-24"
      >
        <div className="py-4 flex flex-col items-center justify-center gap-5 w-full max-w-md mx-auto">
          {/* Book Appointment Pearl Button placed ABOVE Gmail copy */}
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <PearlButton label="Book Appointment" />
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0 border-border bg-transparent shadow-2xl overflow-hidden">
              <DialogTitle className="sr-only">Book an Appointment</DialogTitle>
              <DialogDescription className="sr-only">
                Choose an available date and time slot to book an engineering or research discussion with Kandula Jithendra Subramanyam.
              </DialogDescription>
              <CalendarAppointmentBooking />
            </DialogContent>
          </Dialog>

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
