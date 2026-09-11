'use client';

import { useState } from 'react';
import { CircleCheckIcon, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface AppointmentBookingProps {
  onSuccess?: (details: { date: Date; time: string }) => void;
  className?: string;
}

export const CalendarAppointmentBooking = ({ onSuccess, className }: AppointmentBookingProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 20));
  const [selectedTime, setSelectedTime] = useState<string | null>('10:00');
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15;
    const hour = Math.floor(totalMinutes / 60) + 9;
    const minute = totalMinutes % 60;

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const bookedDates = Array.from({ length: 3 }, (_, i) => new Date(2025, 5, 17 + i));

  const handleBooking = () => {
    if (!date || !selectedTime) return;
    setIsBooked(true);
    toast.success(
      `Appointment scheduled for ${date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })} at ${selectedTime}`
    );
    onSuccess?.({ date, time: selectedTime });
  };

  return (
    <div className={className}>
      <Card className="gap-0 p-0 overflow-hidden border-border/80 bg-card/90 backdrop-blur-md shadow-xl">
        <CardHeader className="flex h-max justify-between items-center border-b !p-4 bg-muted/20">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-primary" />
            <CardTitle className="text-base font-semibold">Book an Appointment / Discussion</CardTitle>
          </div>
          <span className="text-xs font-mono text-muted-foreground">30-min slot</span>
        </CardHeader>
        <CardContent className="relative p-0 md:pr-48">
          <div className="p-4 sm:p-6 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              disabled={bookedDates}
              showOutsideDays={false}
              modifiers={{
                booked: bookedDates,
              }}
              modifiersClassNames={{
                booked: '[&>button]:line-through opacity-60',
              }}
              className="bg-transparent p-0"
              formatters={{
                formatWeekdayName: (day) => {
                  return day.toLocaleString('en-US', { weekday: 'short' });
                },
              }}
            />
          </div>
          <div className="inset-y-0 right-0 flex w-full flex-col gap-2 border-t max-md:h-60 md:absolute md:w-48 md:border-t-0 md:border-l bg-card/40">
            <div className="px-4 pt-3 pb-1 border-b border-border/40 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Clock className="size-3.5" />
              <span>Available Times</span>
            </div>
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-1.5 p-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="w-full text-xs font-mono justify-center shadow-none h-8"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t px-6 !py-4 md:flex-row bg-muted/10 items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-foreground">
            {date && selectedTime ? (
              <>
                <CircleCheckIcon className="size-5 stroke-emerald-600 dark:stroke-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm">
                  Meeting scheduled for{' '}
                  <span className="font-semibold text-primary">
                    {date.toLocaleDateString('en-US', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>{' '}
                  at <span className="font-semibold text-primary">{selectedTime}</span>
                </span>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">Select a date and time for your meeting.</span>
            )}
          </div>
          <Button
            disabled={!date || !selectedTime || isBooked}
            onClick={handleBooking}
            className="w-full md:w-auto text-xs font-mono font-semibold"
            variant="default"
          >
            {isBooked ? 'Confirmed ✓' : 'Confirm Booking'}
          </Button>
        </CardFooter>
      </Card>
      <p className="text-muted-foreground mt-3 text-center text-xs font-mono" role="region">
        Instant Calendar Sync · Google Meet / Zoom invite sent automatically
      </p>
    </div>
  );
};

export const CalendarAppointmentBookingDemo = CalendarAppointmentBooking;
export default CalendarAppointmentBooking;
