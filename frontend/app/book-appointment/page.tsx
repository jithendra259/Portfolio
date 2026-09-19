import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CalendarAppointmentBooking } from '@/components/ui/calendar-appointment-booking';

export const metadata: Metadata = {
  title: 'Book a 1-on-1 Session | Kandula Jithendra Subramanyam',
  description:
    'Schedule a technical interview, architecture discussion, or collaboration session with Kandula Jithendra Subramanyam.',
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans antialiased transition-colors duration-300">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Portfolio</span>
          </Link>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        <CalendarAppointmentBooking />
      </main>
    </div>
  );
}
