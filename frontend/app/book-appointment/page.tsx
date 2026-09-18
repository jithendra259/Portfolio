import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Video, Globe } from 'lucide-react';
import { CalendarAppointmentBooking } from '@/components/ui/calendar-appointment-booking';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Book a 1-on-1 Session | Kandula Jithendra Subramanyam',
  description:
    'Schedule a technical interview, architecture discussion, or collaboration session with Kandula Jithendra Subramanyam.',
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans transition-colors duration-300">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="size-8 rounded-md bg-muted border border-border flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
              <ArrowLeft className="size-4 text-foreground" />
            </span>
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-1.5 py-1 px-3 font-normal">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span>Available for Roles & Advisory</span>
            </Badge>

            <DayNightSwitch />
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-8">
        {/* Page Title & Intro */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Schedule a 1-on-1 Session
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Direct scheduling for technical screens, system architecture reviews, or advisory discussions with Jithendra.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="outline" className="gap-1.5 py-1 px-2.5">
                <Clock className="size-3.5 text-muted-foreground" />
                <span>30 Min</span>
              </Badge>
              <Badge variant="outline" className="gap-1.5 py-1 px-2.5">
                <Video className="size-3.5 text-muted-foreground" />
                <span>Google Meet HD</span>
              </Badge>
              <Badge variant="outline" className="gap-1.5 py-1 px-2.5">
                <Globe className="size-3.5 text-muted-foreground" />
                <span>IST (UTC+5:30)</span>
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Appointment Form */}
        <CalendarAppointmentBooking variant="page" />
      </main>
    </div>
  );
}
