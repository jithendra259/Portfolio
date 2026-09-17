import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  Video,
  CheckCircle2,
  Sparkles,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Globe,
  MessageSquare,
  Building2,
  Bot,
  Layers,
} from 'lucide-react';
import { CalendarAppointmentBooking } from '@/components/ui/calendar-appointment-booking';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title: 'Schedule a Meeting | Kandula Jithendra Subramanyam',
  description:
    'Book a dedicated technical discussion, research collaboration, or interview with Kandula Jithendra Subramanyam. Available for AI engineering, multi-agent systems, and quantitative finance roles.',
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
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
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

      {/* Main Content Body */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Title Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold mb-3">
            <CalendarIcon className="size-3.5" />
            <span>Interactive Scheduling</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight mb-4">
            Schedule a Meeting with Jithendra
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed">
            Reserve a 30-minute virtual meeting for engineering interviews, research collaborations, thesis discussions, or AI consulting. Automatically saves to Google Calendar or your calendar application of choice.
          </p>
        </div>

        {/* Two-Column Grid: Host Information + Calendar Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Host Details & Trust Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Host Identity Card */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#12151d]/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-md">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="size-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold font-mono text-lg shadow-md">
                  JS
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {PORTFOLIO_DATA.developer.fullName}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                    Somaiya Vidyavihar University
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-neutral-300 pt-3 border-t border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-cyan-500 shrink-0" />
                  <span>Mumbai, India (IST / UTC+5:30)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="size-3.5 text-emerald-500 shrink-0" />
                  <span>Google Meet (Auto-Generated)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-purple-500 shrink-0" />
                  <span>30 Minutes per Session</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.developer.email}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-2">
                <a
                  href={PORTFOLIO_DATA.developer.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-neutral-200 transition-colors"
                >
                  <Linkedin className="size-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.developer.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-neutral-200 transition-colors"
                >
                  <Github className="size-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Topics of Discussion Card */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#12151d]/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xs space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
                Suggested Discussion Topics
              </h3>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                  <CheckCircle2 className="size-3.5 text-cyan-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">AI Engineering Roles:</strong> Multi-agent systems, LangGraph swarms, WebRTC voice agents, and full-stack integration.
                  </span>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">Quantitative Finance:</strong> Convex optimization (CVXPY/CLARABEL), Graph-regularized CVaR, systemic risk, and Ledoit-Wolf shrinkage.
                  </span>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                  <CheckCircle2 className="size-3.5 text-purple-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">Research Collaboration:</strong> Joint peer-reviewed publications across Elsevier and Springer venues.
                  </span>
                </div>
              </div>
            </div>

            {/* Zero Friction Callout */}
            <div className="p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 flex items-start gap-2.5">
              <Sparkles className="size-4 text-cyan-500 shrink-0 mt-0.5" />
              <span>
                <strong>No Login or API Key Required:</strong> Select your preferred slot on the calendar and instantly add it to your Google Calendar or download an `.ics` event.
              </span>
            </div>
          </div>

          {/* Right Column: Full Interactive Booking Calendar (8 cols) */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-white/95 dark:bg-[#12151d]/95 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
              <CalendarAppointmentBooking />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
