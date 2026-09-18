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
    <div className="min-h-screen w-full bg-black text-white font-sans antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for 1-on-1 Sessions</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        <CalendarAppointmentBooking variant="page" />
      </main>
    </div>
  );
}
