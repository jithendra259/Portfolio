'use client';

import React, { useState, useMemo, useRef } from 'react';
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
  Paperclip,
  Upload,
  FileText,
  X,
  Link2,
  Briefcase,
  Bot,
  Cpu,
  Code2,
  Coffee,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
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
    notes?: string;
    documentLink?: string;
    attachmentName?: string;
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

interface DiscussionTrack {
  id: string;
  label: string;
  badge: string;
  description: string;
  icon: any;
}

const DISCUSSION_TRACKS: DiscussionTrack[] = [
  {
    id: 'fulltime-hiring',
    label: 'Full-Time / Hiring Opportunity',
    badge: 'Recruiter / Hiring',
    description: 'Discuss open roles, engineering responsibilities, interview stages, or compensation.',
    icon: Briefcase,
  },
  {
    id: 'agentic-ai',
    label: 'Agentic AI & LiveKit Voice Systems',
    badge: 'AI Architecture',
    description: 'Ultra-low-latency voice agents, tool-calling pipelines, RAG, and multimodal agent design.',
    icon: Bot,
  },
  {
    id: 'robotics-swarm',
    label: 'Robotics & Swarm Intelligence',
    badge: 'Hardware & Multi-Agent',
    description: 'Distributed multi-robot coordination, autonomous navigation, and research collaboration.',
    icon: Cpu,
  },
  {
    id: 'advisory-consulting',
    label: 'Architecture Review & Consulting',
    badge: 'Technical Advisory',
    description: 'Full-stack system architecture, performance optimization, or freelance technical consultation.',
    icon: Code2,
  },
  {
    id: 'general-networking',
    label: 'Casual Tech Chat & Networking',
    badge: 'Coffee Chat',
    description: 'Meet & greet, industry insights, tech talk, or general professional connection.',
    icon: Coffee,
  },
  {
    id: 'custom-track',
    label: 'Custom Agenda / Specific Project',
    badge: 'Tailored',
    description: 'Specify a custom agenda, review a specific GitHub repository, or pitch a unique idea.',
    icon: Sparkles,
  },
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string>('11:00');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedTrackId, setSelectedTrackId] = useState<string>('fulltime-hiring');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [documentLink, setDocumentLink] = useState<string>('');

  // Attached file state
  const [attachedFile, setAttachedFile] = useState<{
    filename: string;
    content: string; // base64
    contentType: string;
    size: number;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetUrl, setMeetUrl] = useState<string>('https://meet.google.com/uvd-rnah-jgh');
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [googleCalendarUrl, setGoogleCalendarUrl] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<{
    startDate: Date;
    endDate: Date;
    title: string;
    description: string;
    location: string;
  } | null>(null);

  const currentTrack = useMemo(
    () => DISCUSSION_TRACKS.find((t) => t.id === selectedTrackId) || DISCUSSION_TRACKS[0],
    [selectedTrackId]
  );

  const effectivePurpose = useMemo(() => {
    if (selectedTrackId === 'custom-track' && customTopic.trim()) {
      return customTopic.trim();
    }
    return currentTrack.label;
  }, [selectedTrackId, customTopic, currentTrack]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const resultStr = reader.result as string;
      const base64 = resultStr.split(',')[1] || '';
      setAttachedFile({
        filename: file.name,
        content: base64,
        contentType: file.type || 'application/octet-stream',
        size: file.size,
      });
      setIsUploading(false);
      toast.success(`Attached "${file.name}" (${Math.round(file.size / 1024)} KB)`);
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.error('Failed to read file.');
    };
    reader.readAsDataURL(file);
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBooking = async () => {
    if (!date || !selectedTime) {
      toast.error('Please select both a date and time slot.');
      return;
    }

    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address to receive meeting details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startDate = new Date(date);
      startDate.setHours(hours, minutes, 0, 0);

      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 30);

      let generatedMeetUrl = 'https://meet.google.com/uvd-rnah-jgh';
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
            purpose: effectivePurpose,
            notes: notes.trim(),
            documentLink: documentLink.trim(),
            attachment: attachedFile
              ? {
                  filename: attachedFile.filename,
                  content: attachedFile.content,
                  contentType: attachedFile.contentType,
                  size: attachedFile.size,
                }
              : undefined,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.meetUrl) generatedMeetUrl = data.meetUrl;
          if (data.googleCalendarUrl) generatedCalendarUrl = data.googleCalendarUrl;
          if (data.emailSent) emailSentSuccess = true;
        }
      } catch (apiErr) {
        console.warn('schedule-appointment API error, fallback to client generation:', apiErr);
      }

      setMeetUrl(generatedMeetUrl);

      const meetingTitle = `Discussion: Kandula Jithendra Subramanyam & ${name.trim() || 'Guest'}`;
      const meetingDescription = [
        `Appointment / Discussion with Kandula Jithendra Subramanyam`,
        `Topic: ${effectivePurpose}`,
        name ? `Attendee: ${name.trim()}` : null,
        email ? `Attendee Email: ${email.trim()}` : null,
        notes ? `Notes / Agenda: ${notes.trim()}` : null,
        documentLink ? `Document Link: ${documentLink.trim()}` : null,
        attachedFile ? `Attached File: ${attachedFile.filename}` : null,
        `Google Meet Link: ${generatedMeetUrl}`,
        `Host Email: kandulajithendrasubramanyam@gmail.com`,
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
        setEmailStatus(`Confirmation email with Google Meet room dispatched to ${email.trim()}`);
        toast.success(`Session confirmed! Calendar invite sent to ${email.trim()}.`);
      } else {
        setEmailStatus(`Session reserved! Google Meet link ready.`);
        toast.success(`Session reserved! Ready for your calendar.`);
      }

      setIsBooked(true);

      onSuccess?.({
        date,
        time: selectedTime,
        name: name.trim(),
        email: email.trim(),
        purpose: effectivePurpose,
        notes: notes.trim(),
        documentLink: documentLink.trim(),
        attachmentName: attachedFile?.filename,
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
  /* SUCCESS CONFIRMATION SCREEN (DARK THEME)                     */
  /* ============================================================ */
  if (isBooked && bookingDetails) {
    return (
      <div className={`w-full max-w-4xl mx-auto py-6 sm:py-10 animate-in fade-in zoom-in-95 duration-300 ${className || ''}`}>
        <div className="rounded-3xl bg-[#0d111a]/95 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 p-6 sm:p-10 backdrop-blur-2xl space-y-8 text-center">
          {/* Glowing Status Icon */}
          <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-400/40 text-cyan-400 shadow-xl shadow-cyan-500/20">
            <CheckCircle2 className="size-10 text-cyan-400" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full inline-block">
              Appointment Reserved &bull; Confirmed
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              You&apos;re Officially Scheduled!
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
              A 30-minute virtual session with <strong className="text-white">Kandula Jithendra Subramanyam</strong> is locked in.
            </p>
          </div>

          {/* Session Overview Card */}
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#131824]/90 border border-white/10 text-left space-y-4 font-mono text-xs sm:text-sm shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-slate-400 block text-xs uppercase mb-1">Date</span>
                <span className="font-bold text-white text-base">
                  {bookingDetails.startDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs uppercase mb-1">Time & Timezone</span>
                <span className="font-bold text-cyan-400 text-base">
                  {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone || 'IST'})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-slate-400 block text-xs uppercase mb-1">Topic / Track</span>
                <span className="font-semibold text-white truncate block">
                  {effectivePurpose}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs uppercase mb-1">Platform</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Video className="size-4 text-emerald-400" />
                  Google Meet Video
                </span>
              </div>
            </div>

            {notes && (
              <div className="pb-4 border-b border-white/10 space-y-1">
                <span className="text-slate-400 block text-xs uppercase">Your Agenda / Notes:</span>
                <p className="text-slate-200 text-xs italic bg-black/30 p-2.5 rounded-lg border border-white/5">
                  &ldquo;{notes}&rdquo;
                </p>
              </div>
            )}

            {(attachedFile || documentLink) && (
              <div className="pb-4 border-b border-white/10 space-y-1 text-xs">
                {attachedFile && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <FileCheck className="size-4 shrink-0" />
                    <span>Attached: <strong className="text-white">{attachedFile.filename}</strong> ({Math.round(attachedFile.size / 1024)} KB)</span>
                  </div>
                )}
                {documentLink && (
                  <div className="flex items-center gap-2 text-cyan-400 truncate">
                    <Link2 className="size-4 shrink-0" />
                    <a href={documentLink} target="_blank" rel="noopener noreferrer" className="underline truncate">
                      {documentLink}
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="pt-1 text-xs text-slate-400">
              Attendee: <strong className="text-white">{name}</strong> ({email})
            </div>
          </div>

          {/* Dedicated Google Meet Link Callout Box */}
          <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-500/10">
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Video className="size-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Your Google Meet Room
                </span>
                <a
                  href={meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-mono font-bold text-white underline hover:text-emerald-300 transition-colors truncate block"
                >
                  {meetUrl}
                </a>
              </div>
            </div>

            <a
              href={meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-extrabold shrink-0 transition-all text-center shadow-lg shadow-emerald-500/25 hover:scale-[1.02] cursor-pointer"
            >
              Join Google Meet
            </a>
          </div>

          {/* Email Notice */}
          {emailStatus && (
            <div className="max-w-2xl mx-auto px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 text-center flex items-center justify-center gap-2">
              <Mail className="size-4 text-cyan-400 shrink-0" />
              <span>{emailStatus}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs sm:text-sm font-extrabold shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <CalendarIcon className="size-4 shrink-0 text-slate-950" />
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
              className="w-full sm:w-auto font-mono text-xs sm:text-sm flex items-center gap-2 py-3.5 h-auto px-5 rounded-xl bg-white/[0.04] border-white/15 text-slate-200 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <Download className="size-4" />
              <span>Download .ics</span>
            </Button>
          </div>

          <div className="pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setIsBooked(false)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              <span>Book another session or pick a different time</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================ */
  /* MAIN BOOKING FORM (DARK THEME & EXECUTIVE WORKFLOW)          */
  /* ============================================================ */
  return (
    <div className={`w-full space-y-8 ${className || ''}`}>
      {/* Top Header Card (Page Variant) */}
      {variant === 'page' && (
        <div className="rounded-2xl bg-gradient-to-r from-[#0d111a] via-[#111622] to-[#0d111a] p-6 border border-white/10 shadow-xl backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              <Sparkles className="size-3.5" />
              <span>Direct Scheduling &bull; 1-on-1 Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Schedule a Technical Session with Jithendra
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Select your preferred date, time slot, and discussion track below. An official Google Meet room and calendar invitation will be dispatched instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300">
              <Clock className="size-3.5 text-cyan-400" />
              <span>30 Min</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300">
              <Video className="size-3.5 text-emerald-400" />
              <span>Google Meet HD</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300">
              <Globe className="size-3.5 text-indigo-400" />
              <span>IST (UTC+5:30)</span>
            </span>
          </div>
        </div>
      )}

      {/* Grid: Calendar & Time Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Column 1: Date Picker (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0d111a]/90 border border-white/10 p-5 shadow-xl backdrop-blur-xl flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
              <CalendarIcon className="size-3.5" />
              <span>01. Select Date</span>
            </span>
            {date && (
              <span className="text-xs font-mono font-bold text-white bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(day) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return day < today;
              }}
              showOutsideDays={false}
              className="w-full text-slate-200"
              classNames={{
                months: 'w-full',
                month: 'w-full space-y-3',
                month_caption: 'flex justify-center pt-1 relative items-center mb-3',
                caption_label: 'text-sm font-mono font-bold text-white',
                nav: 'flex items-center justify-between absolute w-full px-1',
                button_previous: 'size-8 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors',
                button_next: 'size-8 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors',
                weekday: 'size-9 p-0 text-xs font-mono font-semibold text-slate-400 text-center',
                day: 'group size-9 px-0 text-sm',
                day_button:
                  'size-9 rounded-xl font-mono text-xs transition-all hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center justify-center font-medium text-slate-200 data-[selected]:bg-cyan-500 data-[selected]:text-slate-950 data-[selected]:font-bold data-[selected]:shadow-lg data-[selected]:shadow-cyan-500/40',
              }}
            />
          </div>
        </div>

        {/* Column 2: Time Slots (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0d111a]/90 border border-white/10 p-5 shadow-xl backdrop-blur-xl flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>02. Select Time Slot</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              30-min window &bull; IST Time
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {AVAILABLE_SLOTS.map((time) => {
              const isSelected = selectedTime === time;
              const hourNum = parseInt(time.split(':')[0], 10);
              const ampm = hourNum >= 12 ? 'PM' : 'AM';
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-3 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-transparent shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400 font-bold'
                      : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-slate-200'
                  }`}
                >
                  <span className="text-sm font-bold">{time}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                    {ampm} IST
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section: Discussion Track Options (Cards/Pills) */}
      <div className="rounded-2xl bg-[#0d111a]/90 border border-white/10 p-6 shadow-xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="size-3.5" />
            <span>03. Choose Discussion Track / Purpose</span>
          </span>
          <span className="text-xs font-mono text-slate-400">
            Tailor the session focus
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DISCUSSION_TRACKS.map((track) => {
            const isSelected = selectedTrackId === track.id;
            const Icon = track.icon;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrackId(track.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`size-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-white/5 text-slate-300'}`}>
                    <Icon className="size-4" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${isSelected ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-white/5 text-slate-400 border-white/10'}`}>
                    {track.badge}
                  </span>
                </div>

                <div>
                  <h4 className={`text-xs font-mono font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {track.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans line-clamp-2">
                    {track.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom topic input if selected */}
        {selectedTrackId === 'custom-track' && (
          <div className="pt-2 animate-in fade-in duration-200">
            <Input
              type="text"
              placeholder="e.g., Review GitHub repo & evaluate multi-agent orchestration pattern"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="h-11 rounded-xl text-xs font-mono bg-black/40 border-white/15 focus-visible:ring-cyan-500 text-white placeholder:text-slate-500"
            />
          </div>
        )}
      </div>

      {/* Section: Attendee Details, Note & File Attachment */}
      <div className="rounded-2xl bg-[#0d111a]/90 border border-white/10 p-6 shadow-xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
            <User className="size-3.5" />
            <span>04. Your Details, Notes & Attachments</span>
          </span>
          <span className="text-xs font-mono text-slate-400">
            Official invite sent to this email
          </span>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="booking-name" className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
              <User className="size-3.5 text-cyan-400" />
              <span>Your Name <span className="text-rose-400">*</span></span>
            </label>
            <Input
              id="booking-name"
              type="text"
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl text-xs font-mono bg-black/40 border-white/10 focus-visible:ring-cyan-500 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="booking-email" className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
              <Mail className="size-3.5 text-cyan-400" />
              <span>Your Email Address <span className="text-rose-400">*</span></span>
            </label>
            <Input
              id="booking-email"
              type="email"
              placeholder="alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl text-xs font-mono bg-black/40 border-white/10 focus-visible:ring-cyan-500 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Note / Message Area */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="booking-notes" className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
              <MessageSquare className="size-3.5 text-cyan-400" />
              <span>Message / Notes for Jithendra (Optional)</span>
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              Agenda, JD highlights, or interview details
            </span>
          </div>
          <textarea
            id="booking-notes"
            rows={3}
            placeholder="Share job description highlights, company context, interview stage (Technical Screen, System Design), or specific questions you'd like to dive into..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl text-xs font-mono bg-black/40 border border-white/10 p-3 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 resize-y"
          />
        </div>

        {/* File Attachment & Document Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* File Upload Dropzone / Button */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
              <Paperclip className="size-3.5 text-cyan-400" />
              <span>Attach File / Job Description (Optional)</span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />

            {!attachedFile ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full h-12 rounded-xl border border-dashed border-white/20 hover:border-cyan-500/50 bg-white/[0.02] hover:bg-cyan-500/5 transition-all text-xs font-mono text-slate-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Upload className="size-4 text-cyan-400" />
                <span>{isUploading ? 'Reading file...' : 'Upload PDF, DOCX or Spec (Max 10MB)'}</span>
              </button>
            ) : (
              <div className="h-12 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 flex items-center justify-between font-mono text-xs text-emerald-300">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="size-4 shrink-0 text-emerald-400" />
                  <span className="truncate font-semibold text-white">{attachedFile.filename}</span>
                  <span className="text-[10px] text-emerald-400/80">({Math.round(attachedFile.size / 1024)} KB)</span>
                </div>
                <button
                  type="button"
                  onClick={removeAttachedFile}
                  className="size-6 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors"
                  title="Remove file"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
          </div>

          {/* Document Link Input */}
          <div className="space-y-1.5">
            <label htmlFor="booking-doclink" className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
              <Link2 className="size-3.5 text-cyan-400" />
              <span>Or Paste Document / Notion / JD Link</span>
            </label>
            <Input
              id="booking-doclink"
              type="url"
              placeholder="https://notion.so/... or Greenhouse / Drive link"
              value={documentLink}
              onChange={(e) => setDocumentLink(e.target.value)}
              className="h-12 rounded-xl text-xs font-mono bg-black/40 border-white/10 focus-visible:ring-cyan-500 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            <span>
              Meeting on{' '}
              <strong className="text-white">
                {date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </strong>{' '}
              at{' '}
              <strong className="text-cyan-400">{selectedTime} IST</strong>
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
                  description: `Topic: ${effectivePurpose}\nAttendee: ${name || 'Guest'}\nHost: kandulajithendrasubramanyam@gmail.com`,
                  location: meetUrl,
                  startDate,
                  endDate,
                  userName: name,
                  userEmail: email,
                });
              }}
              className="w-full sm:w-auto h-12 px-5 rounded-xl font-mono text-xs font-semibold border-white/15 bg-white/[0.03] text-slate-200 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <Download className="size-4 mr-2" />
              <span>Download .ics</span>
            </Button>

            <Button
              disabled={!date || !selectedTime || isSubmitting}
              onClick={handleBooking}
              className="w-full sm:w-auto h-12 px-8 rounded-xl font-mono text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <CalendarIcon className="size-4 text-slate-950" />
              <span>{isSubmitting ? 'Confirming & Dispatching...' : 'Confirm & Schedule Session'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarAppointmentBooking;
