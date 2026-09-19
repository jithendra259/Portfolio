import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const HOST_EMAIL = 'kandulajithendrasubramanyam@gmail.com';

const HOST_NAME = 'Kandula Jithendra Subramanyam';

function generateMeetCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const part = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${part(3)}-${part(4)}-${part(3)}`;
}

function formatUtcForCalendar(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

async function createGoogleCalendarEvent({
  title,
  description,
  startDate,
  endDate,
  attendeeEmail,
  attendeeName,
}: {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  attendeeEmail?: string;
  attendeeName: string;
}): Promise<{ meetUrl: string; eventId?: string } | null> {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim();

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'https://developers.google.com/oauthplayground'
    );
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: title,
        description,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        attendees: attendeeEmail && attendeeEmail.includes('@')
          ? [{ email: attendeeEmail, displayName: attendeeName }]
          : [],
        conferenceData: {
          createRequest: {
            requestId: `meet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    });

    const meetUrl =
      response.data.hangoutLink ||
      response.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri;

    if (meetUrl) {
      return { meetUrl, eventId: response.data.id || undefined };
    }
  } catch (err) {
    console.error('Error creating Google Calendar event with Meet:', err);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      date: dateStr,
      time,
      purpose,
      notes,
      documentLink,
      attachment,
      attachments: rawAttachments,
    } = body;

    const fileList: Array<{ filename: string; content: string; contentType?: string; size?: number }> = [];
    if (Array.isArray(rawAttachments)) {
      fileList.push(...rawAttachments);
    } else if (attachment && attachment.filename && attachment.content) {
      fileList.push(attachment);
    }

    if (!dateStr || !time) {
      return NextResponse.json(
        { error: 'Date and time are required for scheduling' },
        { status: 400 }
      );
    }

    const attendeeName = name?.trim() || 'Guest';
    const attendeeEmail = email?.trim();
    const meetingPurpose = purpose || 'Technical / AI Architecture Discussion';

    // Parse start and end times
    const [hours, minutes] = time.split(':').map(Number);
    const startDate = new Date(dateStr);
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const formattedDate = startDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const startIso = formatUtcForCalendar(startDate);
    const endIso = formatUtcForCalendar(endDate);

    const meetingTitle = `Discussion: ${HOST_NAME} & ${attendeeName}`;

    // Attempt to create dynamic official Google Meet via Google Calendar API
    const gcalResult = await createGoogleCalendarEvent({
      title: meetingTitle,
      description: `1-on-1 Virtual Session with ${HOST_NAME}\nTopic: ${meetingPurpose}\nAttendee: ${attendeeName} (${attendeeEmail || 'N/A'})\nNotes: ${notes || 'N/A'}${documentLink ? `\nDoc Link: ${documentLink}` : ''}${attachment?.filename ? `\nAttachment: ${attachment.filename}` : ''}`,
      startDate,
      endDate,
      attendeeEmail,
      attendeeName,
    });

    // Permanent Google Meet link or fallback
    const customMeetUrl = (process.env.GOOGLE_MEET_LINK || process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK || '').trim();
    const meetUrl = gcalResult?.meetUrl || customMeetUrl || `https://meet.google.com/uvd-rnah-jgh`;
    const meetCode = meetUrl.split('/').pop() || 'uvd-rnah-jgh';

    const meetingDescription = [
      `1-on-1 Virtual Session with ${HOST_NAME}`,
      `Topic: ${meetingPurpose}`,
      attendeeName ? `Attendee: ${attendeeName}` : null,
      attendeeEmail ? `Attendee Email: ${attendeeEmail}` : null,
      `Google Meet Video: ${meetUrl}`,
      notes ? `Notes / Agenda: ${notes}` : null,
      documentLink ? `Document / JD Link: ${documentLink}` : null,
      attachment?.filename ? `Attached File: ${attachment.filename}` : null,
      `Host Email: ${HOST_EMAIL}`,
    ]
      .filter(Boolean)
      .join('\n');

    // Google Calendar template URL
    const calParams = new URLSearchParams({
      action: 'TEMPLATE',
      text: meetingTitle,
      dates: `${startIso}/${endIso}`,
      details: meetingDescription,
      location: meetUrl,
      add: attendeeEmail ? `${attendeeEmail},${HOST_EMAIL}` : HOST_EMAIL,
    });
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?${calParams.toString()}`;

    // Generate .ics iCalendar file content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kandula Jithendra Subramanyam//Appointment Booking//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `SUMMARY:${meetingTitle}`,
      `DESCRIPTION:${meetingDescription.replace(/\n/g, '\\n')}`,
      `LOCATION:${meetUrl}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=${HOST_NAME}:mailto:${HOST_EMAIL}`,
      attendeeEmail ? `ATTENDEE;CN=${attendeeName};ROLE=REQ-PARTICIPANT:mailto:${attendeeEmail}` : '',
      `ATTENDEE;CN=${HOST_NAME};ROLE=REQ-PARTICIPANT:mailto:${HOST_EMAIL}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .filter(Boolean)
      .join('\r\n');

    // SMTP Configuration
    const smtpUser = (process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER || HOST_EMAIL).trim();
    const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS || '';
    const smtpPass = rawPass.replace(/\s+/g, '');
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || 465);

    let emailSent = false;
    let emailError: string | null = null;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const recipients = [HOST_EMAIL];
        if (attendeeEmail && attendeeEmail.includes('@') && attendeeEmail !== HOST_EMAIL) {
          recipients.push(attendeeEmail);
        }

        const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meeting Confirmation</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0d13; color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; background: #12151f; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
    <div style="background: linear-gradient(135deg, #0891b2 0%, #4f46e5 100%); padding: 32px 24px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Meeting Confirmed</h1>
      <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">30-Minute Virtual Discussion with ${HOST_NAME}</p>
    </div>
    
    <div style="padding: 32px 24px;">
      <!-- Google Meet Callout -->
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
        <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #34d399; font-weight: bold;">Google Meet Video Conference</p>
        <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #ffffff;">Join URL:</p>
        <a href="${meetUrl}" target="_blank" style="display: inline-block; background: #10b981; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
          Join Google Meet
        </a>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #94a3b8; font-family: monospace;">${meetUrl}</p>
      </div>

      <!-- Details List -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8; width: 120px;">Date:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff; font-weight: 600;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;">Time:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #38bdf8; font-weight: 600;">${time} IST (30 Minutes)</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;">Attendee:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff; font-weight: 600;">${attendeeName} ${attendeeEmail ? `(${attendeeEmail})` : ''}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;">Topic:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff;">${meetingPurpose}</td>
        </tr>
        ${
          notes
            ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8; vertical-align: top;">Notes / Agenda:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #f1f5f9; line-height: 1.5; background: rgba(255,255,255,0.02); border-radius: 8px; padding-left: 8px;">${notes.replace(/\n/g, '<br>')}</td>
        </tr>
        `
            : ''
        }
        ${
          documentLink
            ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;">Document Link:</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
            <a href="${documentLink}" target="_blank" style="color: #38bdf8; text-decoration: underline;">${documentLink}</a>
          </td>
        </tr>
        `
            : ''
        }
        ${
          fileList.length > 0
            ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8; vertical-align: top;">Attached Files (${fileList.length}):</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #34d399; font-weight: 600;">
            ${fileList
              .map(
                (f) =>
                  `&#128206; ${f.filename} (${Math.round((f.size || 0) / 1024)} KB)`
              )
              .join('<br>')}
          </td>
        </tr>
        `
            : ''
        }
      </table>

      <!-- Secondary Calendar Button -->
      <div style="text-align: center; padding-top: 8px;">
        <a href="${googleCalendarUrl}" target="_blank" style="display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 13px; font-family: monospace;">
          + Add to Google Calendar
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: rgba(0,0,0,0.3); padding: 16px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #64748b; font-family: monospace;">
      Host: ${HOST_NAME} &bull; ${HOST_EMAIL}
    </div>
  </div>
</body>
</html>
        `;

        const mailAttachments: any[] = [
          {
            filename: 'invite.ics',
            method: 'REQUEST',
            content: icsContent,
          },
        ];

        for (const file of fileList) {
          if (file.filename && file.content) {
            mailAttachments.push({
              filename: file.filename,
              content: Buffer.from(file.content, 'base64'),
              contentType: file.contentType || 'application/octet-stream',
            });
          }
        }

        const attachmentsTextSummary =
          fileList.length > 0
            ? `\nAttachments:\n${fileList
                .map((f) => `- ${f.filename} (${Math.round((f.size || 0) / 1024)} KB)`)
                .join('\n')}`
            : '';

        await transporter.sendMail({
          from: `"${HOST_NAME}" <${smtpUser}>`,
          to: recipients.join(', '),
          replyTo: HOST_EMAIL,
          subject: `Confirmed: 1-on-1 Meeting with ${HOST_NAME} (${formattedDate} @ ${time} IST)`,
          text: `Your meeting with ${HOST_NAME} is confirmed for ${formattedDate} at ${time} IST.\n\nGoogle Meet Link: ${meetUrl}\nTopic: ${meetingPurpose}\nAttendee: ${attendeeName} (${attendeeEmail || 'N/A'})${notes ? `\nNotes: ${notes}` : ''}${documentLink ? `\nDoc Link: ${documentLink}` : ''}${attachmentsTextSummary}\n\nSave to Google Calendar: ${googleCalendarUrl}`,
          html: htmlEmail,
          attachments: mailAttachments,
        });

        emailSent = true;
      } catch (err: any) {
        console.error('Failed to send confirmation email via SMTP:', err);
        emailError = err.message || 'SMTP delivery failed';
      }
    } else {
      console.warn(
        'SMTP credentials not set (SMTP_USER/GMAIL_USER and SMTP_PASS/GMAIL_APP_PASSWORD). Email dispatch simulated.'
      );
    }

    // Persist booking lead to Supabase (non-blocking)
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      await supabase.from('bookings').insert({
        visitor_name: attendeeName,
        email: attendeeEmail,
        topic: meetingPurpose,
        preferred_date: formattedDate,
        preferred_time: time,
        meet_url: meetUrl,
        notes: notes || '',
        created_at: new Date().toISOString(),
      });
    } catch (supaErr) {
      console.warn('Supabase booking lead persistence notice:', supaErr);
    }

    return NextResponse.json({
      success: true,
      meetUrl,
      meetCode,
      googleCalendarUrl,
      emailSent,
      emailError,
      details: {
        title: meetingTitle,
        date: formattedDate,
        time: `${time} IST`,
        attendee: attendeeName,
        email: attendeeEmail || HOST_EMAIL,
        purpose: meetingPurpose,
        meetUrl,
      },
    });
  } catch (error: any) {
    console.error('Error in schedule-appointment API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to schedule appointment' },
      { status: 500 }
    );
  }
}
