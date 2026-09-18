'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ExternalLink,
  Download,
  Video,
  Globe,
  RotateCcw,
  Upload,
  FileText,
  X,
  Link2,
  CircleCheck,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
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
  /* SUCCESS CONFIRMATION STATE (SHADCN DESIGN SYSTEM)            */
  /* ============================================================ */
  if (isBooked && bookingDetails) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)}>
        <Card className="bg-card text-card-foreground">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <CircleCheck className="size-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Session Scheduled Successfully
                </h2>
                <p className="text-sm text-muted-foreground">
                  An invitation and meeting details have been confirmed.
                </p>
              </div>
            </div>

            <Separator />

            {/* Session Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Date & Time</span>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone || 'IST'})
                </p>
              </div>

              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Attendee</span>
                <p className="mt-1 text-sm font-semibold text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>

            {/* Dedicated Google Meet Link */}
            <div className="rounded-lg border border-border bg-muted p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-md bg-background flex items-center justify-center text-primary shrink-0">
                  <Video className="size-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-muted-foreground uppercase block">
                    Google Meet Room
                  </span>
                  <a
                    href={meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline truncate block"
                  >
                    {meetUrl}
                  </a>
                </div>
              </div>

              <a
                href={meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shrink-0 transition-colors"
              >
                Join Google Meet
              </a>
            </div>

            {notes && (
              <div className="space-y-1 text-sm">
                <span className="text-xs font-medium text-muted-foreground uppercase">Notes / Agenda</span>
                <p className="p-3 rounded-md border border-border bg-muted/50 text-foreground text-sm">
                  {notes}
                </p>
              </div>
            )}

            {(attachedFile || documentLink) && (
              <div className="space-y-2 text-sm">
                <span className="text-xs font-medium text-muted-foreground uppercase">Attachments</span>
                {attachedFile && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <FileText className="size-4 text-primary" />
                    <span>{attachedFile.filename}</span>
                    <span className="text-xs text-muted-foreground">({Math.round(attachedFile.size / 1024)} KB)</span>
                  </div>
                )}
                {documentLink && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Link2 className="size-4 shrink-0" />
                    <a href={documentLink} target="_blank" rel="noopener noreferrer" className="underline truncate">
                      {documentLink}
                    </a>
                  </div>
                )}
              </div>
            )}

            {emailStatus && (
              <p className="text-sm text-muted-foreground">
                {emailStatus}
              </p>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsBooked(false)}
                className="inline-flex items-center gap-2"
              >
                <RotateCcw className="size-4" />
                <span>Book another session</span>
              </Button>

              <div className="flex items-center space-x-4">
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
                >
                  <Download className="mr-2 size-4" />
                  Download .ics
                </Button>

                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 transition-colors gap-2"
                >
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ============================================================ */
  /* MAIN FORM (FORM LAYOUT / DEMO 02 UI STYLE)                   */
  /* ============================================================ */
  return (
    <div className={cn("w-full max-w-7xl mx-auto", className)}>
      <form onSubmit={handleBooking}>
        {/* SECTION 1: Personal Information */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Personal information
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Please provide your contact information to receive the Google Meet invitation and calendar details.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="booking-name"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Your Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="booking-name"
                  name="name"
                  autoComplete="name"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="booking-email"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="email"
                  id="booking-email"
                  name="email"
                  autoComplete="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* SECTION 2: Meeting Schedule (Date & Time Slot) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Meeting schedule
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Select your preferred date and 30-minute time slot. All times are displayed in IST (UTC+5:30).
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Calendar Column */}
              <div className="lg:col-span-5 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-foreground dark:text-foreground">
                    Select date
                  </Label>
                  {date && (
                    <Badge variant="secondary" className="font-normal text-xs">
                      {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Badge>
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
                    button_previous: 'size-7 rounded-md border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors',
                    button_next: 'size-7 rounded-md border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors',
                    weekday: 'size-8 p-0 text-xs font-normal text-muted-foreground text-center',
                    day: 'group size-8 px-0 text-xs',
                    day_button:
                      'size-8 rounded-md transition-all hover:bg-muted flex items-center justify-center text-foreground data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:font-medium',
                  }}
                />
              </div>

              {/* Time Slots Column */}
              <div className="lg:col-span-7 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-foreground dark:text-foreground">
                    Select time slot
                  </Label>
                  <span className="text-xs text-muted-foreground">30-min window &bull; IST</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_SLOTS.map((time) => {
                    const isSelected = selectedTime === time;
                    const hourNum = parseInt(time.split(':')[0], 10);
                    const ampm = hourNum >= 12 ? 'PM' : 'AM';
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "flex flex-col items-center justify-center py-2.5 px-2 rounded-md border text-xs transition cursor-pointer",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                            : "border-border bg-background hover:bg-muted text-foreground"
                        )}
                      >
                        <span className="text-sm font-medium">{time}</span>
                        <span className={cn("text-[10px]", isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                          {ampm} IST
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* SECTION 3: Discussion Notes & Attachments */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Discussion notes & attachments
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Share job description highlights, company context, interview stage, or attach files.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full">
                <Label
                  htmlFor="booking-notes"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Message / Notes for Jithendra (Optional)
                </Label>
                <Textarea
                  id="booking-notes"
                  name="notes"
                  rows={4}
                  placeholder="Share job description highlights, company context, interview stage (Technical Screen, System Design), or specific questions you'd like to dive into..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                />
                <p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground">
                  Note: notes provided will be included in the calendar event description.
                </p>
              </div>

              {/* File Attachment */}
              <div className="col-span-full sm:col-span-3">
                <Label className="text-sm font-medium text-foreground dark:text-foreground">
                  Attach File / Job Description (Optional)
                </Label>
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
                    className="mt-2 w-full h-10 rounded-md border border-dashed border-input bg-background hover:bg-muted text-sm text-foreground flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition"
                  >
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{isUploading ? 'Reading file...' : 'Upload PDF, DOCX (Max 10MB)'}</span>
                  </button>
                ) : (
                  <div className="mt-2 h-10 rounded-md border border-border bg-muted px-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 truncate text-foreground">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate font-medium">{attachedFile.filename}</span>
                      <span className="text-xs text-muted-foreground">({Math.round(attachedFile.size / 1024)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachedFile}
                      className="p-1 rounded hover:bg-background text-muted-foreground hover:text-destructive transition"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Document Link */}
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="booking-doclink"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Or Paste Document / Notion / JD Link
                </Label>
                <Input
                  type="url"
                  id="booking-doclink"
                  placeholder="https://notion.so/... or Greenhouse / Drive link"
                  value={documentLink}
                  onChange={(e) => setDocumentLink(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* SECTION 4: Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {date && selectedTime ? (
              <span>
                Meeting on{' '}
                <strong className="font-semibold text-foreground">
                  {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </strong>{' '}
                at{' '}
                <strong className="font-semibold text-foreground">
                  {selectedTime} IST
                </strong>
              </span>
            ) : (
              <span>Please select a date and time slot above</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              className="whitespace-nowrap"
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
            >
              <Download className="mr-2 h-4 w-4" />
              Download .ics
            </Button>

            <Button
              type="submit"
              className="whitespace-nowrap"
              disabled={!date || !selectedTime || isSubmitting}
            >
              {isSubmitting ? 'Scheduling...' : 'Confirm & Schedule Session'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalendarAppointmentBooking;
