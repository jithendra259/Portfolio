import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { CalendarAppointmentBooking } from '@/components/ui/calendar-appointment-booking';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';

export const metadata: Metadata = {
  title: 'Book a 1-on-1 Session | Kandula Jithendra Subramanyam',
  description:
    'Schedule a technical interview, architecture discussion, or collaboration session with Kandula Jithendra Subramanyam.',
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen w-full bg-[#06080e] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[750px] h-[750px] rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-indigo-500/10 blur-[180px]" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#06080e]/85 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:-translate-x-0.5 transition-transform group-hover:border-cyan-500/40">
              <ArrowLeft className="size-4 text-cyan-400" />
            </span>
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Roles & Advisory</span>
            </div>

            <DayNightSwitch />
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <CalendarAppointmentBooking variant="page" />
      </main>
    </div>
  );
}
