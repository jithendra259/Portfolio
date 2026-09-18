'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ExternalLink,
  Download,
  Video,
  RotateCcw,
  Upload,
  FileText,
  X,
  Link2,
  Check,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { FlightSendButton } from '@/components/ui/flight-send-button';
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

const DEFAULT_PURPOSE = 'Technical Discussion & 1-on-1 Session';

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
  className = '',
}: AppointmentBookingProps) => {
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
  const [role, setRole] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [documentLink, setDocumentLink] = useState<string>('');

  const [attachedFile, setAttachedFile] = useState<{
    filename: string;
    content: string;
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  const handleBooking = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!date || !selectedTime) {
      toast.error('Please select both a date and time slot.');
      return;
    }

    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
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
            purpose: DEFAULT_PURPOSE,
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
        `Topic: ${DEFAULT_PURPOSE}`,
        name ? `Attendee: ${name.trim()}` : null,
        email ? `Attendee Email: ${email.trim()}` : null,
        role ? `Role / Organization: ${role.trim()}` : null,
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
        purpose: DEFAULT_PURPOSE,
        notes: notes.trim() || undefined,
        documentLink: documentLink.trim() || undefined,
        attachmentName: attachedFile?.filename,
        googleCalendarUrl: url,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================================================ */
  /* CONFIRMATION STATE                                           */
  /* ============================================================ */
  if (isBooked && bookingDetails) {
    return (
      <div className={`w-full max-w-4xl mx-auto p-6 sm:p-10 ${className}`}>
        <div className="rounded-lg border border-border bg-card text-card-foreground p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm shrink-0">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Session confirmed
              </h2>
              <p className="text-sm text-muted-foreground">
                Your 1-on-1 meeting has been scheduled and calendar invites dispatched.
              </p>
            </div>
          </div>

          <div className="border-t border-border my-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <span className="text-xs uppercase text-muted-foreground font-medium">Date & time</span>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone || 'IST'})
              </p>
            </div>

            <div>
              <span className="text-xs uppercase text-muted-foreground font-medium">Attendee</span>
              <p className="mt-1 text-sm font-semibold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          {/* Google Meet Room Card */}
          <div className="rounded-md border border-border bg-muted/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-background flex items-center justify-center text-foreground border border-border">
                <Video className="h-4 w-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs text-muted-foreground uppercase font-medium block">
                  Google Meet room
                </span>
                <a
                  href={meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-foreground underline hover:opacity-80 transition-opacity truncate block"
                >
                  {meetUrl}
                </a>
              </div>
            </div>

            <a
              href={meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-foreground text-background hover:opacity-90 px-4 py-2 text-sm font-medium transition-opacity whitespace-nowrap"
            >
              Join Google Meet
            </a>
          </div>

          {notes && (
            <div className="space-y-1">
              <span className="text-xs uppercase text-muted-foreground font-medium">Notes / Agenda</span>
              <p className="p-3 rounded-md border border-border bg-muted/40 text-foreground text-sm">
                {notes}
              </p>
            </div>
          )}

          {(attachedFile || documentLink) && (
            <div className="space-y-1 text-sm">
              <span className="text-xs uppercase text-muted-foreground font-medium">Attachments</span>
              {attachedFile && (
                <div className="flex items-center gap-2 text-foreground text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{attachedFile.filename}</span>
                  <span className="text-xs text-muted-foreground">({Math.round(attachedFile.size / 1024)} KB)</span>
                </div>
              )}
              {documentLink && (
                <div className="flex items-center gap-2 text-foreground text-sm">
                  <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a href={documentLink} target="_blank" rel="noopener noreferrer" className="underline truncate">
                    {documentLink}
                  </a>
                </div>
              )}
            </div>
          )}

          {emailStatus && (
            <p className="text-xs text-muted-foreground">
              {emailStatus}
            </p>
          )}

          <div className="border-t border-border my-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setIsBooked(false)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Book another session</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() =>
                  downloadIcsFile({
                    ...bookingDetails,
                    userName: name,
                    userEmail: email,
                  })
                }
                className="rounded-md border border-border bg-transparent text-foreground hover:bg-muted px-4 py-2 text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download .ics</span>
              </button>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-foreground text-background hover:opacity-90 px-4 py-2 text-sm font-medium transition-opacity inline-flex items-center gap-1.5"
              >
                <span>Add to Google Calendar</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================ */
  /* MAIN FORM                                                    */
  /* ============================================================ */
  return (
    <div className={`w-full max-w-7xl mx-auto p-6 sm:p-10 ${className}`}>
      <form onSubmit={handleBooking}>
        {/* ROW 1: PERSONAL INFORMATION */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground">
              Personal information
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Provide your details so we can send the meeting invite and Google Meet link.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="booking-name"
                  className="text-sm font-medium text-foreground"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="booking-name"
                  name="booking-name"
                  autoComplete="name"
                  placeholder="Emma Crown"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition"
                  required
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="booking-role"
                  className="text-sm font-medium text-foreground"
                >
                  Role / Company
                </label>
                <input
                  type="text"
                  id="booking-role"
                  name="booking-role"
                  placeholder="Senior Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Optional: recruiter, engineering lead, or founder context.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="booking-email"
                  className="text-sm font-medium text-foreground"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="booking-email"
                  name="booking-email"
                  autoComplete="email"
                  placeholder="emma@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="border-t border-border my-8" />

        {/* ROW 2: MEETING SCHEDULE */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground">
              Meeting schedule
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Select your preferred date and 30-minute time slot. All times are displayed in IST (UTC+5:30).
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Calendar Date Picker */}
              <div className="lg:col-span-6 rounded-md border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    Select date
                  </span>
                  {date && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
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
                  className="w-full text-foreground"
                  classNames={{
                    months: 'w-full',
                    month: 'w-full space-y-3',
                    month_caption: 'flex justify-center pt-1 relative items-center mb-3',
                    caption_label: 'text-sm font-medium text-foreground',
                    nav: 'flex items-center justify-between absolute w-full px-1',
                    button_previous: 'size-7 rounded-md border border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-center transition-colors',
                    button_next: 'size-7 rounded-md border border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-center transition-colors',
                    weekday: 'size-8 p-0 text-xs font-normal text-muted-foreground text-center',
                    day: 'group size-8 px-0 text-xs',
                    day_button:
                      'size-8 rounded-md transition-all hover:bg-muted flex items-center justify-center text-foreground data-[selected]:bg-foreground data-[selected]:text-background data-[selected]:font-semibold',
                  }}
                />
              </div>

              {/* Time Slots Grid */}
              <div className="lg:col-span-6 rounded-md border border-border bg-card p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    Select time slot
                  </span>
                  <span className="text-xs text-muted-foreground">30-min &bull; IST</span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-[290px] overflow-y-auto pr-1">
                  {AVAILABLE_SLOTS.map((time) => {
                    const isSelected = selectedTime === time;
                    const hourNum = parseInt(time.split(':')[0], 10);
                    const ampm = hourNum >= 12 ? 'PM' : 'AM';
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`flex items-center justify-between px-3 py-2 rounded-md border text-xs transition cursor-pointer ${
                          isSelected
                            ? 'border-foreground bg-foreground text-background font-semibold shadow-xs'
                            : 'border-border bg-transparent hover:bg-muted text-foreground'
                        }`}
                      >
                        <span className="font-medium text-sm">{time}</span>
                        <span className={`text-[10px] ${isSelected ? 'opacity-80' : 'text-muted-foreground'}`}>
                          {ampm}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="border-t border-border my-8" />

        {/* ROW 3: DISCUSSION DETAILS */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground">
              Discussion details
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Share job description highlights, company context, or attach files to discuss during our call.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="booking-notes"
                  className="text-sm font-medium text-foreground"
                >
                  Message / Notes for Jithendra (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  name="booking-notes"
                  rows={4}
                  placeholder="Share job description highlights, company context, interview stage (Technical Screen, System Design), or specific questions you'd like to dive into..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2 flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Note: description provided will not be displayed externally.
                </p>
              </div>

              {/* File Attachment */}
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm font-medium text-foreground">
                  Attach File / Job Description (Optional)
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
                    className="mt-2 w-full h-10 rounded-md border border-dashed border-input bg-transparent hover:bg-muted text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition"
                  >
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{isUploading ? 'Reading file...' : 'Upload PDF, DOCX (Max 10MB)'}</span>
                  </button>
                ) : (
                  <div className="mt-2 h-10 rounded-md border border-border bg-muted/60 px-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 truncate text-foreground">
                      <FileText className="h-4 w-4 text-foreground shrink-0" />
                      <span className="truncate font-medium">{attachedFile.filename}</span>
                      <span className="text-xs text-muted-foreground">({Math.round(attachedFile.size / 1024)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachedFile}
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-destructive transition"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Document Link */}
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="booking-doclink"
                  className="text-sm font-medium text-foreground"
                >
                  Or Paste Document / Notion / JD Link
                </label>
                <input
                  type="url"
                  id="booking-doclink"
                  placeholder="https://notion.so/... or Greenhouse / Drive link"
                  value={documentLink}
                  onChange={(e) => setDocumentLink(e.target.value)}
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="border-t border-border my-8" />

        {/* ROW 4: ACTION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {date && selectedTime ? (
              <span>
                Meeting on{' '}
                <strong className="text-foreground font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </strong>{' '}
                at{' '}
                <strong className="text-foreground font-medium">
                  {selectedTime} IST
                </strong>
              </span>
            ) : (
              <span>Please select a date and time slot above</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => {
                if (!date || !selectedTime) return;
                const [hours, minutes] = selectedTime.split(':').map(Number);
                const startDate = new Date(date);
                startDate.setHours(hours, minutes, 0, 0);
                const endDate = new Date(startDate);
                endDate.setMinutes(endDate.getMinutes() + 30);
                downloadIcsFile({
                  title: `Discussion: Kandula Jithendra Subramanyam & ${name.trim() || 'Guest'}`,
                  description: `Topic: ${DEFAULT_PURPOSE}\nAttendee: ${name || 'Guest'}\nHost: kandulajithendrasubramanyam@gmail.com`,
                  location: meetUrl,
                  startDate,
                  endDate,
                  userName: name,
                  userEmail: email,
                });
              }}
              className="whitespace-nowrap rounded-full border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Download className="h-4 w-4" />
              <span>Download .ics</span>
            </button>

            <FlightSendButton
              type="submit"
              disabled={!date || !selectedTime || isSubmitting}
              defaultText={isSubmitting ? 'Confirming...' : 'Confirm Schedule'}
              sentText="Scheduled!"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalendarAppointmentBooking;
