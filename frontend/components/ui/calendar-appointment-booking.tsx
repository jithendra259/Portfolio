'use client';

import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ExternalLink,
  Download,
  User,
  Mail,
  MessageSquare,
  Sparkles,
  Video,
  Globe,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AppointmentBookingProps {
  onSuccess?: (details: {
    date: Date;
    time: string;
    name: string;
    email: string;
    purpose: string;
    googleCalendarUrl: string;
  }) => void;
  className?: string;
  variant?: 'modal' | 'page';
}

const AVAILABLE_SLOTS = [
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
];

const PURPOSE_OPTIONS = [
  'Technical / AI Architecture Discussion',
  'Research Collaboration & Thesis',
  'Full-Time / Contract Role Opportunity',
  'General Discussion / Meet & Greet',
];

function formatUtcForCalendar(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function buildGoogleCalendarUrl({
  title,
  description,
  location,
  startDate,
  endDate,
  guestEmail,
}: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  guestEmail?: string;
}): string {
  const startIso = formatUtcForCalendar(startDate);
  const endIso = formatUtcForCalendar(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startIso}/${endIso}`,
    details: description,
    location: location,
    add: guestEmail ? `${guestEmail},kandulajithendrasubramanyam@gmail.com` : 'kandulajithendrasubramanyam@gmail.com',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcsFile({
  title,
  description,
  location,
  startDate,
  endDate,
  userName,
  userEmail,
}: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  userName?: string;
  userEmail?: string;
}) {
  const startIso = formatUtcForCalendar(startDate);
  const endIso = formatUtcForCalendar(endDate);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kandula Jithendra Subramanyam//Appointment Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    'STATUS:CONFIRMED',
    'ORGANIZER;CN=Kandula Jithendra Subramanyam:mailto:kandulajithendrasubramanyam@gmail.com',
  ];

  if (userEmail) {
    lines.push(`ATTENDEE;CN=${userName || 'Guest'};ROLE=REQ-PARTICIPANT:mailto:${userEmail}`);
  }

  lines.push('END:VEVENT', 'END:VCALENDAR');

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'discussion-jithendra-subramanyam.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const CalendarAppointmentBooking = ({
  onSuccess,
  className,
  variant = 'modal',
}: AppointmentBookingProps) => {
  // Default to tomorrow
  const initialDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string>('11:00');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [purpose, setPurpose] = useState<string>(PURPOSE_OPTIONS[0]);
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetUrl, setMeetUrl] = useState<string>('https://meet.google.com');
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [googleCalendarUrl, setGoogleCalendarUrl] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<{
    startDate: Date;
    endDate: Date;
    title: string;
    description: string;
    location: string;
  } | null>(null);

  // Disable dates before today
  const disabledDays = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const handleBooking = async () => {
    if (!date || !selectedTime || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startDate = new Date(date);
      startDate.setHours(hours, minutes, 0, 0);

      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 30);

      // Call schedule-appointment API to generate dedicated Google Meet link and dispatch confirmation emails
      let generatedMeetUrl = 'https://meet.google.com';
      let generatedCalendarUrl = '';
      let emailSentSuccess = false;

      try {
        const response = await fetch('/api/schedule-appointment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            date: date.toISOString(),
            time: selectedTime,
            purpose,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.meetUrl) generatedMeetUrl = data.meetUrl;
          if (data.googleCalendarUrl) generatedCalendarUrl = data.googleCalendarUrl;
          if (data.emailSent) emailSentSuccess = true;
        }
      } catch (apiErr) {
        console.warn('schedule-appointment API offline, fallback to client generation:', apiErr);
      }

      setMeetUrl(generatedMeetUrl);

      const meetingTitle = `Discussion: Kandula Jithendra Subramanyam & ${name.trim() || 'Guest'}`;
      const meetingDescription = [
        `Appointment / Discussion with Kandula Jithendra Subramanyam`,
        `Topic: ${purpose}`,
        name ? `Attendee: ${name}` : null,
        email ? `Attendee Email: ${email}` : null,
        `Google Meet Link: ${generatedMeetUrl}`,
        `Host Email: kandulajithendrasubramanyam@gmail.com`,
        `Host Profile: https://jithendra-portfolio.vercel.app`,
      ]
        .filter(Boolean)
        .join('\n');

      const url =
        generatedCalendarUrl ||
        buildGoogleCalendarUrl({
          title: meetingTitle,
          description: meetingDescription,
          location: generatedMeetUrl,
          startDate,
          endDate,
          guestEmail: email.trim() || undefined,
        });

      setGoogleCalendarUrl(url);
      setBookingDetails({
        startDate,
        endDate,
        title: meetingTitle,
        description: meetingDescription,
        location: generatedMeetUrl,
      });

      if (emailSentSuccess) {
        const targetDesc = email.trim()
          ? `Sent to ${email.trim()} & kandulajithendrasubramanyam@gmail.com`
          : `Sent to host kandulajithendrasubramanyam@gmail.com`;
        setEmailStatus(`Confirmation email with Google Meet link dispatched! (${targetDesc})`);
        toast.success(`Meeting Confirmed! Confirmation email sent with Google Meet link.`);
      } else {
        setEmailStatus(`Meeting Confirmed! Google Meet video link generated.`);
        toast.success(`Meeting Confirmed! Google Meet link ready.`);
      }

      setIsBooked(true);

      onSuccess?.({
        date,
        time: selectedTime,
        name: name.trim(),
        email: email.trim(),
        purpose,
        googleCalendarUrl: url,
      });
    } catch (err: any) {
      console.error('Booking error:', err);
      toast.error('Could not complete scheduling. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================================================ */
  /* DEDICATED PAGE VARIANT (UNBOXED, EXPANSIVE, EXECUTIVE UI)    */
  /* ============================================================ */
  if (variant === 'page') {
    if (isBooked && bookingDetails) {
      return (
        <div className={`w-full max-w-4xl mx-auto py-8 sm:py-12 ${className || ''}`}>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="size-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-500">
                Appointment Reserved
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                You're All Set!
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-lg mx-auto">
                A 30-minute virtual session with <strong className="text-slate-900 dark:text-white">Kandula Jithendra Subramanyam</strong> has been prepared. Add it to your calendar to guarantee the slot.
              </p>
            </div>

            {/* Clean summary block */}
            <div className="max-w-2xl mx-auto my-8 p-6 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md text-left space-y-4 font-mono text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <span className="text-slate-500 dark:text-neutral-500 block text-xs uppercase mb-1">Date</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-base">
                    {bookingDetails.startDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-neutral-500 block text-xs uppercase mb-1">Time & Zone</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400 text-base">
                    {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone || 'IST'})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 dark:text-neutral-500 block text-xs uppercase mb-1">Topic</span>
                  <span className="font-semibold text-slate-900 dark:text-white truncate block">
                    {purpose}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-neutral-500 block text-xs uppercase mb-1">Platform</span>
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Video className="size-4 text-emerald-500" />
                    Google Meet
                  </span>
                </div>
              </div>

              {(name || email) && (
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-neutral-400">
                  Attendee: <strong className="text-slate-900 dark:text-white">{name || 'Guest'}</strong> {email ? `(${email})` : ''}
                </div>
              )}
            </div>

            {/* Dedicated Google Meet Link Callout Box */}
            <div className="max-w-2xl mx-auto my-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100 text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-500/5">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                  <Video className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold block">
                    Google Meet Video Conference
                  </span>
                  <a
                    href={meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono font-bold text-slate-900 dark:text-white underline hover:text-emerald-500 transition-colors"
                  >
                    {meetUrl}
                  </a>
                </div>
              </div>

              <a
                href={meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shrink-0 transition-colors text-center shadow-md shadow-emerald-600/20"
              >
                Join Google Meet
              </a>
            </div>

            {/* Email Dispatch Notice */}
            {emailStatus && (
              <div className="max-w-2xl mx-auto mb-6 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-300 text-center flex items-center justify-center gap-2">
                <Mail className="size-3.5 text-cyan-500 shrink-0" />
                <span>{emailStatus}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs sm:text-sm font-bold shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <CalendarIcon className="size-4 shrink-0" />
                <span>Add to Google Calendar</span>
                <ExternalLink className="size-3.5 opacity-80" />
              </a>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  downloadIcsFile({
                    ...bookingDetails,
                    userName: name,
                    userEmail: email,
                  })
                }
                className="w-full sm:w-auto font-mono text-xs sm:text-sm flex items-center gap-2 py-3.5 h-auto px-5 rounded-xl border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <Download className="size-4" />
                <span>Download .ics</span>
              </Button>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Pick a different time or reschedule</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full space-y-10 ${className || ''}`}>
        {/* Executive Page Context Header (Unboxed) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <CalendarIcon className="size-3.5" />
              <span>Direct Scheduling</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Schedule a 1-on-1 Session
            </h1>
            <p className="text-sm text-slate-600 dark:text-neutral-400">
              30-minute virtual technical discussion or interview with <span className="font-semibold text-slate-900 dark:text-white">Kandula Jithendra Subramanyam</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-neutral-300">
              <Clock className="size-3.5 text-purple-500" />
              <span>30 Min</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-neutral-300">
              <Video className="size-3.5 text-emerald-500" />
              <span>Google Meet</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-neutral-300">
              <Globe className="size-3.5 text-cyan-500" />
              <span>IST (UTC+5:30)</span>
            </div>
          </div>
        </div>

        {/* Unboxed 2-Column Booking Section: Date Selection (Left) + Time Slot Selection (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Column 1: Date Picker (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-neutral-400">
                01. Select Date
              </span>
              {date && (
                <span className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
                </span>
              )}
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 backdrop-blur-sm shadow-xs flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                defaultMonth={date}
                disabled={disabledDays}
                showOutsideDays={false}
                className="w-full"
                classNames={{
                  months: 'w-full',
                  month: 'w-full space-y-3',
                  month_caption: 'flex justify-center pt-1 relative items-center mb-3',
                  caption_label: 'text-sm font-mono font-bold text-slate-900 dark:text-white',
                  nav: 'flex items-center justify-between absolute w-full px-1',
                  weekday: 'size-10 p-0 text-xs font-mono font-semibold text-slate-400 dark:text-neutral-500 text-center',
                  day: 'group size-10 px-0 text-sm',
                  day_button:
                    'size-10 rounded-xl font-mono text-xs transition-all hover:bg-cyan-500/15 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center justify-center font-medium',
                }}
              />
            </div>
          </div>

          {/* Column 2: Time Slots (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-neutral-400">
                02. Select Time Slot
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-500">
                All times in IST
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {AVAILABLE_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-3 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-transparent shadow-md shadow-cyan-500/25 ring-2 ring-cyan-400'
                        : 'bg-white/70 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 text-slate-800 dark:text-neutral-200'
                    }`}
                  >
                    <span className="text-sm font-bold">{time}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-500 dark:text-neutral-500'}`}>
                      {parseInt(time.split(':')[0], 10) >= 12 ? 'PM' : 'AM'} IST
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Attendee Details & Confirmation (Unboxed, spanning wide) */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-neutral-400">
              03. Attendee Information & Purpose
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="guest-name-page" className="text-xs font-mono text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 font-medium">
                <User className="size-3.5 text-cyan-500" />
                <span>Your Name</span>
              </label>
              <Input
                id="guest-name-page"
                name="guestName"
                type="text"
                placeholder="e.g. Alex Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl text-xs font-mono bg-white/80 dark:bg-white/[0.04] border-slate-200/80 dark:border-white/10 focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="guest-email-page" className="text-xs font-mono text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 font-medium">
                <Mail className="size-3.5 text-cyan-500" />
                <span>Your Email Address</span>
              </label>
              <Input
                id="guest-email-page"
                name="guestEmail"
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl text-xs font-mono bg-white/80 dark:bg-white/[0.04] border-slate-200/80 dark:border-white/10 focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="discussion-topic-page" className="text-xs font-mono text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 font-medium">
                <MessageSquare className="size-3.5 text-cyan-500" />
                <span>Discussion Track</span>
              </label>
              <select
                id="discussion-topic-page"
                name="discussionTopic"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#12151d] px-3 text-xs font-mono text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
              >
                {PURPOSE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-white dark:bg-[#12151d] text-slate-900 dark:text-neutral-100">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-neutral-400">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
              <span>
                Meeting on{' '}
                <strong className="text-slate-900 dark:text-white">
                  {date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </strong>{' '}
                at{' '}
                <strong className="text-cyan-600 dark:text-cyan-400">{selectedTime} IST</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (!date || !selectedTime) return;
                  const [hours, minutes] = selectedTime.split(':').map(Number);
                  const startDate = new Date(date);
                  startDate.setHours(hours, minutes, 0, 0);
                  const endDate = new Date(startDate);
                  endDate.setMinutes(endDate.getMinutes() + 30);
                  downloadIcsFile({
                    title: `Discussion: Kandula Jithendra Subramanyam & ${name.trim() || 'Guest'}`,
                    description: `Topic: ${purpose}\nAttendee: ${name || 'Guest'}\nHost: kandulajithendrasubramanyam@gmail.com`,
                    location: 'Google Meet / Online Meeting',
                    startDate,
                    endDate,
                    userName: name,
                    userEmail: email,
                  });
                }}
                className="w-full sm:w-auto h-12 px-5 rounded-xl font-mono text-xs font-semibold border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <Download className="size-4 mr-2" />
                <span>Download .ics</span>
              </Button>

              <Button
                disabled={!date || !selectedTime || isSubmitting}
                onClick={handleBooking}
                className="w-full sm:w-auto h-12 px-7 rounded-xl font-mono text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] disabled:opacity-60"
              >
                <CalendarIcon className="size-4" />
                <span>{isSubmitting ? 'Confirming & Generating Link...' : 'Confirm & Add to Google Calendar'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================ */
  /* MODAL VARIANT (COMPACT FOR DIALOG POPUPS)                     */
  /* ============================================================ */
  return (
    <div className={className}>
      <Card className="gap-0 p-0 overflow-hidden border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl">
        <CardHeader className="flex h-max justify-between items-center border-b !p-4 bg-muted/30">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-cyan-400" />
            <CardTitle className="text-sm sm:text-base font-semibold">
              {isBooked ? 'Appointment Confirmed' : 'Book a 1-on-1 Discussion / Appointment'}
            </CardTitle>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            30-Min Virtual Slot
          </span>
        </CardHeader>

        {isBooked && bookingDetails ? (
          <CardContent className="p-6 flex flex-col items-center text-center gap-5">
            <div className="size-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="size-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-tight text-foreground">
                Discussion Successfully Scheduled!
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Your appointment with <strong className="text-foreground">Kandula Jithendra Subramanyam</strong> has been prepared. Add it to your calendar to guarantee the time slot.
              </p>
            </div>

            <div className="w-full max-w-md p-4 rounded-2xl bg-muted/40 border border-border/60 text-left space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-semibold text-foreground">
                  {bookingDetails.startDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-semibold text-cyan-400">
                  {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone || 'IST'})
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Topic:</span>
                <span className="font-semibold text-foreground truncate max-w-[220px]">
                  {purpose}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Google Meet:</span>
                <a href={meetUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-400 underline truncate max-w-[200px]">
                  {meetUrl}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mt-1">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-mono text-xs font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <CalendarIcon className="size-4 shrink-0" />
                <span>Add to Google Calendar</span>
                <ExternalLink className="size-3.5 opacity-70" />
              </a>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  downloadIcsFile({
                    ...bookingDetails,
                    userName: name,
                    userEmail: email,
                  })
                }
                className="w-full sm:w-auto font-mono text-xs flex items-center gap-2 py-3 h-auto border-border/80"
              >
                <Download className="size-3.5" />
                <span>Download .ics</span>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsBooked(false)}
              className="text-xs font-mono text-muted-foreground hover:text-foreground underline transition-colors cursor-pointer pt-2"
            >
              ← Pick a different date or time
            </button>
          </CardContent>
        ) : (
          <>
            <CardContent className="relative p-0 flex flex-col md:flex-row">
              <div className="p-4 sm:p-5 flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/50">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  defaultMonth={date}
                  disabled={disabledDays}
                  showOutsideDays={false}
                  className="bg-transparent p-0"
                  formatters={{
                    formatWeekdayName: (day) => {
                      return day.toLocaleString('en-US', { weekday: 'short' });
                    },
                  }}
                />
              </div>

              <div className="w-full md:w-56 flex flex-col bg-muted/15">
                <div className="px-4 py-3 border-b border-border/40 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Clock className="size-3.5 text-cyan-400" />
                  <span>Available Time Slots</span>
                </div>
                <ScrollArea className="h-64 md:h-[290px]">
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5 p-3">
                    {AVAILABLE_SLOTS.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={`w-full text-xs font-mono justify-center shadow-none h-8 ${
                          selectedTime === time
                            ? 'bg-cyan-500 hover:bg-cyan-600 text-black font-bold'
                            : 'hover:border-cyan-500/50'
                        }`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>

            <div className="p-4 border-t border-border/50 bg-muted/20 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor="guest-name-modal" className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 cursor-pointer">
                  <User className="size-3 text-cyan-400" />
                  <span>Your Name (Optional)</span>
                </label>
                <Input
                  id="guest-name-modal"
                  name="guestName"
                  type="text"
                  placeholder="e.g. Alex Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8 text-xs font-mono bg-background/60"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="guest-email-modal" className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 cursor-pointer">
                  <Mail className="size-3 text-cyan-400" />
                  <span>Your Email (Optional)</span>
                </label>
                <Input
                  id="guest-email-modal"
                  name="guestEmail"
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 text-xs font-mono bg-background/60"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="discussion-topic-modal" className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 cursor-pointer">
                  <MessageSquare className="size-3 text-cyan-400" />
                  <span>Discussion Topic</span>
                </label>
                <select
                  id="discussion-topic-modal"
                  name="discussionTopic"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="h-8 w-full rounded-md border border-input bg-background/60 px-2.5 py-1 text-xs font-mono text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {PURPOSE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-popover text-popover-foreground">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <CardFooter className="flex flex-col sm:flex-row gap-3 border-t px-4 py-3.5 bg-muted/30 items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-foreground min-w-0">
                {date && selectedTime ? (
                  <>
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      Selected:{' '}
                      <span className="font-semibold text-cyan-400">
                        {date.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>{' '}
                      at <span className="font-semibold text-cyan-400">{selectedTime}</span>
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground">Select a date and time slot.</span>
                )}
              </div>

              <Button
                disabled={!date || !selectedTime}
                onClick={handleBooking}
                className="w-full sm:w-auto text-xs font-mono font-bold bg-[#1a73e8] hover:bg-[#1557b0] text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer h-9 px-4"
              >
                <Sparkles className="size-3.5" />
                <span>Confirm & Link to Google Calendar</span>
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
      <p className="text-muted-foreground mt-2.5 text-center text-[11px] font-mono">
        Direct Google Calendar Sync · Pre-filled event with meeting details & host info
      </p>
    </div>
  );
};

export default CalendarAppointmentBooking;
