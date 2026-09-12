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

export const CalendarAppointmentBooking = ({ onSuccess, className }: AppointmentBookingProps) => {
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

  const handleBooking = () => {
    if (!date || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startDate = new Date(date);
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const meetingTitle = `Discussion: Kandula Jithendra Subramanyam & ${name.trim() || 'Guest'}`;
    const meetingDescription = [
      `Appointment / Discussion with Kandula Jithendra Subramanyam`,
      `Topic: ${purpose}`,
      name ? `Attendee: ${name}` : null,
      email ? `Attendee Email: ${email}` : null,
      `Host Email: kandulajithendrasubramanyam@gmail.com`,
      `Host Profile: https://jithendra-portfolio.vercel.app`,
      `Note: Virtual meeting via Google Meet or requested platform.`,
    ]
      .filter(Boolean)
      .join('\n');

    const location = 'Google Meet / Online Meeting';

    const url = buildGoogleCalendarUrl({
      title: meetingTitle,
      description: meetingDescription,
      location,
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
      location,
    });
    setIsBooked(true);

    toast.success(
      `Appointment scheduled for ${date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })} at ${selectedTime}`,
      {
        description: 'Click below to save directly to your Google Calendar.',
        action: {
          label: 'Google Calendar',
          onClick: () => window.open(url, '_blank'),
        },
      }
    );

    onSuccess?.({
      date,
      time: selectedTime,
      name: name.trim(),
      email: email.trim(),
      purpose,
      googleCalendarUrl: url,
    });
  };

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
          /* ============================================================ */
          /* SUCCESS CONFIRMATION & GOOGLE CALENDAR LINK VIEW             */
          /* ============================================================ */
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

            {/* Scheduled details card */}
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
                  {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Topic:</span>
                <span className="font-semibold text-foreground truncate max-w-[220px]">
                  {purpose}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Platform:</span>
                <span className="font-semibold text-foreground">Google Meet / Virtual</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
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
          /* ============================================================ */
          /* BOOKING FORM: CALENDAR + TIME SLOTS + DETAILS                */
          /* ============================================================ */
          <>
            <CardContent className="relative p-0 flex flex-col md:flex-row">
              {/* Left Column: Calendar Picker */}
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

              {/* Right Column: Available Times & Quick Info */}
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

            {/* Middle Row: Guest Name & Purpose */}
            <div className="p-4 border-t border-border/50 bg-muted/20 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <User className="size-3 text-cyan-400" />
                  <span>Your Name (Optional)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Alex Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8 text-xs font-mono bg-background/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <Mail className="size-3 text-cyan-400" />
                  <span>Your Email (Optional)</span>
                </label>
                <Input
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 text-xs font-mono bg-background/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <MessageSquare className="size-3 text-cyan-400" />
                  <span>Discussion Topic</span>
                </label>
                <select
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

            {/* Footer Row: Status & Confirmation */}
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
