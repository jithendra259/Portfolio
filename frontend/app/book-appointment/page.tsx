import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CalendarAppointmentBooking } from '@/components/ui/calendar-appointment-booking';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';

export const metadata: Metadata = {
  title: 'Book a 1-on-1 Session | Kandula Jithendra Subramanyam',
  description:
    'Schedule a technical interview, architecture discussion, or collaboration session with Kandula Jithendra Subramanyam.',
};

export default function BookAppointmentPage() {
  return (
    <div className="bg-background text-foreground min-h-screen w-full font-sans antialiased transition-colors duration-300">
      {/* Top Header */}
      <header className="border-border bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
          <Link
            href="/"
            className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-4">
            <DayNightSwitch />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl">
        <CalendarAppointmentBooking variant="page" />
      </main>
    </div>
  );
}
