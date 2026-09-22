'use client';

import React, { useMemo, useRef, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Check,
  Clock,
  ExternalLink,
  FileText,
  Link2,
  RotateCcw,
  Video,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { FileUploadDropzone, UploadedFileMeta } from '@/components/ui/file-upload-dropzone';
import { FlightSendButton } from '@/components/ui/flight-send-button';
import { SlideDownloadButton } from '@/components/ui/slide-download-button';
import { toast } from '@/components/ui/widgets/notification-card';

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

const SUGGESTED_TOPICS = [
  '💼 Technical Interview',
  '🔬 Research & Thesis Discussion',
  '🤖 AI Architecture & Multi-Agent Swarms',
  '🤝 Consulting / Project Collaboration',
  '☕ Casual Networking & Intro',
];

function formatUtcForCalendar(d: Date): string {
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
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
    add: guestEmail
      ? `${guestEmail},kandulajithendrasubramanyam@gmail.com`
      : 'kandulajithendrasubramanyam@gmail.com',
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

  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string>('11:00');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [documentLink, setDocumentLink] = useState<string>('');

  const [attachedFiles, setAttachedFiles] = useState<UploadedFileMeta[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetUrl, setMeetUrl] = useState<string>('https://meet.google.com/uvd-rnah-jgh');
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [googleCalendarUrl, setGoogleCalendarUrl] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<{
    startDate: Date;
    endDate: Date;
    title: string;
    meetingTopic: string;
    description: string;
    location: string;
  } | null>(null);

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
            title: meetingTitle.trim() || undefined,
            purpose: meetingTitle.trim() || DEFAULT_PURPOSE,
            notes: notes.trim(),
            documentLink: documentLink.trim(),
            attachments: attachedFiles.map((f) => ({
              filename: f.filename,
              content: f.content,
              contentType: f.contentType,
              size: f.size,
            })),
            attachment: attachedFiles[0]
              ? {
                  filename: attachedFiles[0].filename,
                  content: attachedFiles[0].content,
                  contentType: attachedFiles[0].contentType,
                  size: attachedFiles[0].size,
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

      const calendarTitle = `Discussion: Kandula Jithendra Subramanyam & ${name.trim() || 'Guest'}`;
      const meetingDescription = [
        `Appointment / Discussion with Kandula Jithendra Subramanyam`,
        `Topic: ${DEFAULT_PURPOSE}`,
        name ? `Attendee: ${name.trim()}` : null,
        email ? `Attendee Email: ${email.trim()}` : null,
        role ? `Role / Organization: ${role.trim()}` : null,
        notes ? `Notes / Agenda: ${notes.trim()}` : null,
        documentLink ? `Document Link: ${documentLink.trim()}` : null,
        attachedFiles.length > 0
          ? `Attached Files: ${attachedFiles.map((f) => f.filename).join(', ')}`
          : null,
        `Google Meet Link: ${generatedMeetUrl}`,
        `Host Email: kandulajithendrasubramanyam@gmail.com`,
      ]
        .filter(Boolean)
        .join('\n');

      const url =
        generatedCalendarUrl ||
        buildGoogleCalendarUrl({
          title: calendarTitle,
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
        title: calendarTitle,
        meetingTopic: calendarTitle.trim() || DEFAULT_PURPOSE,
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
        attachmentName: attachedFiles.map((f) => f.filename).join(', ') || undefined,
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
      <div className={`mx-auto w-full max-w-4xl p-6 sm:p-10 ${className}`}>
        <div className="border-border bg-card text-card-foreground space-y-6 rounded-lg border p-6 shadow-sm sm:p-10">
          <div className="flex items-center gap-3">
            <div className="bg-foreground text-background flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div>
              <h2 className="text-foreground text-lg font-semibold">Session confirmed</h2>
              <p className="text-muted-foreground text-sm">
                Your 1-on-1 meeting has been scheduled and calendar invites dispatched.
              </p>
            </div>
          </div>

          <div className="border-border my-6 border-t" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <span className="text-muted-foreground text-xs font-medium uppercase">
                Date & time
              </span>
              <p className="text-foreground mt-1 text-sm font-semibold">
                {date?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p className="text-muted-foreground text-sm">
                {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone || 'IST'})
              </p>
            </div>

            <div>
              <span className="text-muted-foreground text-xs font-medium uppercase">Attendee</span>
              <p className="text-foreground mt-1 text-sm font-semibold">{name}</p>
              <p className="text-muted-foreground text-sm">{email}</p>
            </div>

            <div>
              <span className="text-muted-foreground text-xs font-medium uppercase">
                Meeting Title / Topic
              </span>
              <p
                className="text-foreground mt-1 truncate text-sm font-semibold"
                title={bookingDetails?.meetingTopic || meetingTitle || DEFAULT_PURPOSE}
              >
                {bookingDetails?.meetingTopic || meetingTitle || DEFAULT_PURPOSE}
              </p>
            </div>
          </div>

          {/* Google Meet Room Card */}
          <div className="border-border bg-muted/60 flex flex-col items-start justify-between gap-4 rounded-md border p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="bg-background text-foreground border-border flex h-9 w-9 items-center justify-center rounded-md border">
                <Video className="h-4 w-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-muted-foreground block text-xs font-medium uppercase">
                  Google Meet room
                </span>
                <a
                  href={meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground block truncate text-sm font-semibold underline transition-opacity hover:opacity-80"
                >
                  {meetUrl}
                </a>
              </div>
            </div>

            <a
              href={meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-90"
            >
              Join Google Meet
            </a>
          </div>

          {notes && (
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs font-medium uppercase">
                Notes / Agenda
              </span>
              <p className="border-border bg-muted/40 text-foreground rounded-md border p-3 text-sm">
                {notes}
              </p>
            </div>
          )}

          {(attachedFiles.length > 0 || documentLink) && (
            <div className="space-y-2 text-sm">
              <span className="text-muted-foreground text-xs font-medium uppercase">
                Attached Files ({attachedFiles.length})
              </span>
              {attachedFiles.map((file) => (
                <div key={file.id} className="text-foreground flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="font-medium">{file.filename}</span>
                  <span className="text-muted-foreground text-xs">
                    ({Math.round(file.size / 1024)} KB)
                  </span>
                </div>
              ))}
              {documentLink && (
                <div className="text-foreground flex items-center gap-2 pt-1 text-sm">
                  <Link2 className="text-muted-foreground h-4 w-4 shrink-0" />
                  <a
                    href={documentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-cyan-400 underline"
                  >
                    {documentLink}
                  </a>
                </div>
              )}
            </div>
          )}

          {emailStatus && <p className="text-muted-foreground text-xs">{emailStatus}</p>}

          <div className="border-border my-6 border-t" />

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsBooked(false)}
              className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 text-sm transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Book another session</span>
            </button>

            <div className="flex items-center space-x-3">
              <SlideDownloadButton
                onClick={() =>
                  downloadIcsFile({
                    ...bookingDetails,
                    userName: name,
                    userEmail: email,
                  })
                }
                label="Download"
                title="Download .ics Calendar File"
              />

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
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
    <div className={`mx-auto w-full max-w-7xl p-6 sm:p-10 ${className}`}>
      <form onSubmit={handleBooking}>
        {/* ROW 1: PERSONAL INFORMATION */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-foreground font-semibold">Personal information</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Provide your details so we can send the meeting invite and Google Meet link.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="booking-name" className="text-foreground text-sm font-medium">
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
                  className="border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
                  required
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="booking-role" className="text-foreground text-sm font-medium">
                  Role / Company
                </label>
                <input
                  type="text"
                  id="booking-role"
                  name="booking-role"
                  placeholder="Senior Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
                />
                <p className="text-muted-foreground mt-2 text-xs">
                  Optional: recruiter, engineering lead, or founder context.
                </p>
              </div>

              <div className="col-span-full">
                <label htmlFor="booking-email" className="text-foreground text-sm font-medium">
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
                  className="border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="border-border my-8 border-t" />

        {/* ROW 2: MEETING SCHEDULE */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-foreground font-semibold">Meeting schedule</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Select your preferred date and 30-minute time slot. All times are displayed in IST
              (UTC+5:30).
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Calendar Date Picker */}
              <div className="border-border bg-card rounded-md border p-4 lg:col-span-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-foreground text-sm font-medium">Select date</span>
                  {date && (
                    <span className="text-muted-foreground font-mono text-xs">
                      {date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
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
                  className="text-foreground w-full"
                  classNames={{
                    months: 'w-full',
                    month: 'w-full space-y-3',
                    month_caption: 'flex justify-center pt-1 relative items-center mb-3',
                    caption_label: 'text-sm font-medium text-foreground',
                    nav: 'flex items-center justify-between absolute w-full px-1',
                    button_previous:
                      'size-7 rounded-md border border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-center transition-colors',
                    button_next:
                      'size-7 rounded-md border border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-center transition-colors',
                    weekday: 'size-8 p-0 text-xs font-normal text-muted-foreground text-center',
                    day: 'group size-8 px-0 text-xs',
                    day_button:
                      'size-8 rounded-md transition-all hover:bg-muted flex items-center justify-center text-foreground data-[selected]:bg-foreground data-[selected]:text-background data-[selected]:font-semibold',
                  }}
                />
              </div>

              {/* Time Slots Grid */}
              <div className="border-border bg-card flex flex-col rounded-md border p-4 lg:col-span-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-foreground text-sm font-medium">Select time slot</span>
                  <span className="text-muted-foreground text-xs">30-min &bull; IST</span>
                </div>
                <div className="grid max-h-[290px] grid-cols-2 gap-2 overflow-y-auto pr-1">
                  {AVAILABLE_SLOTS.map((time) => {
                    const isSelected = selectedTime === time;
                    const hourNum = parseInt(time.split(':')[0], 10);
                    const ampm = hourNum >= 12 ? 'PM' : 'AM';
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`flex cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-xs transition ${
                          isSelected
                            ? 'border-foreground bg-foreground text-background font-semibold shadow-xs'
                            : 'border-border hover:bg-muted text-foreground bg-transparent'
                        }`}
                      >
                        <span className="text-sm font-medium">{time}</span>
                        <span
                          className={`text-[10px] ${isSelected ? 'opacity-80' : 'text-muted-foreground'}`}
                        >
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
        <div className="border-border my-8 border-t" />

        {/* ROW 3: DISCUSSION DETAILS */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-foreground font-semibold">Discussion details</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Specify what the meeting is about, share job description highlights, or attach files
              to discuss during our call.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              {/* Meeting Title / Topic */}
              <div className="col-span-full">
                <label
                  htmlFor="booking-title"
                  className="text-foreground flex items-center justify-between text-sm font-medium"
                >
                  <span>Meeting title / What is this meeting about?</span>
                  <span className="text-muted-foreground text-xs font-normal">Recommended</span>
                </label>
                <input
                  type="text"
                  id="booking-title"
                  name="booking-title"
                  placeholder="e.g., Technical Interview for AI Engineer, Research Discussion, or Project Collab"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className="border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="booking-notes" className="text-foreground text-sm font-medium">
                  Message / Notes for Jithendra (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  name="booking-notes"
                  rows={4}
                  placeholder="Share job description highlights, company context, interview stage (Technical Screen, System Design), or specific questions you'd like to dive into..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
                />
                <p className="text-muted-foreground mt-2 text-xs">
                  Note: description provided will not be displayed externally.
                </p>
              </div>

              {/* File Attachment */}
              <div className="col-span-full">
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Attach Documents / Resumes / Job Specs (Optional)
                </label>
                <FileUploadDropzone
                  attachedFiles={attachedFiles}
                  onFilesChange={setAttachedFiles}
                />
              </div>

              {/* Document Link */}
              <div className="col-span-full">
                <label htmlFor="booking-doclink" className="text-foreground text-sm font-medium">
                  Or Paste Document / Notion / JD Link (Optional)
                </label>
                <input
                  type="url"
                  id="booking-doclink"
                  placeholder="https://notion.so/... or Greenhouse / Drive link"
                  value={documentLink}
                  onChange={(e) => setDocumentLink(e.target.value)}
                  className="border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="border-border my-8 border-t" />

        {/* ROW 4: ACTION FOOTER */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-muted-foreground text-sm">
            {date && selectedTime ? (
              <span>
                Meeting on{' '}
                <strong className="text-foreground font-medium">
                  {date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </strong>{' '}
                at <strong className="text-foreground font-medium">{selectedTime} IST</strong>
              </span>
            ) : (
              <span>Please select a date and time slot above</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <SlideDownloadButton
              type="button"
              onClick={() => {
                if (!date || !selectedTime) {
                  toast.error('Please pick a date and time slot first.');
                  return;
                }
                const [hours, minutes] = selectedTime.split(':').map(Number);
                const startDate = new Date(date);
                startDate.setHours(hours, minutes, 0, 0);
                const endDate = new Date(startDate);
                endDate.setMinutes(endDate.getMinutes() + 30);
                const finalTopic = meetingTitle.trim() || DEFAULT_PURPOSE;
                downloadIcsFile({
                  title: meetingTitle.trim()
                    ? `${meetingTitle.trim()} — Kandula Jithendra Subramanyam & ${name.trim() || 'Guest'}`
                    : `Discussion: Kandula Jithendra Subramanyam & ${name.trim() || 'Guest'}`,
                  description: `Topic: ${finalTopic}\nAttendee: ${name || 'Guest'}\nHost: kandulajithendrasubramanyam@gmail.com`,
                  location: meetUrl,
                  startDate,
                  endDate,
                  userName: name,
                  userEmail: email,
                });
              }}
              label="Download"
              title="Download .ics Calendar File"
            />

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
