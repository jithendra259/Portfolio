import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CalendarAppointmentBooking } from '@/components/ui/calendar-appointment-booking';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';

export const metadata: Metadata = {
  title: 'Book an Appointment | Kandula Jithendra Subramanyam',
  description:
    'Select a time slot to schedule a technical discussion or meeting with Kandula Jithendra Subramanyam.',
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#0d0f14] text-slate-900 dark:text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[150px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/75 dark:bg-[#0d0f14]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            <span className="size-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
              <ArrowLeft className="size-4" />
            </span>
            <span className="hidden sm:inline">Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Roles</span>
            </div>

            <DayNightSwitch />
          </div>
        </div>
      </header>

      {/* Main Content Body: Focused Calendar Booking */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="rounded-2xl bg-white/95 dark:bg-[#12151d]/95 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
          <CalendarAppointmentBooking />
        </div>
      </main>
    </div>
  );
}
