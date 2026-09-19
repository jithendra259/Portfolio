"use client";

import * as React from 'react';
import type { IconProps } from './floating-icons-hero-section';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

// --- 1. Gmail / Google Mail SVG ---
const IconGmail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2 5.5V18.5C2 19.33 2.67 20 3.5 20H6V11.5L12 15.5L18 11.5V20H20.5C21.33 20 22 19.33 22 18.5V5.5C22 4.67 21.33 4 20.5 4H19.5L12 9.5L4.5 4H3.5C2.67 4 2 4.67 2 5.5Z" fill="#EA4335" />
    <path d="M22 5.5L18 8.5V20H20.5C21.33 20 22 19.33 22 18.5V5.5Z" fill="#FBBC05" />
    <path d="M2 5.5L6 8.5V20H3.5C2.67 20 2 19.33 2 18.5V5.5Z" fill="#4285F4" />
    <path d="M6 11.5L12 15.5L18 11.5V4.5L12 9L6 4.5V11.5Z" fill="#34A853" />
  </svg>
);

// --- 2. LinkedIn SVG ---
const IconLinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3Z"
      fill="#0A66C2"
    />
    <path
      d="M8.5 18H6.2V10.2H8.5V18ZM7.35 9.15C6.55 9.15 6 8.55 6 7.85C6 7.15 6.55 6.55 7.35 6.55C8.15 6.55 8.7 7.15 8.7 7.85C8.7 8.55 8.15 9.15 7.35 9.15ZM18 18H15.7V14.1C15.7 13.05 15.2 12.35 14.25 12.35C13.5 12.35 13.05 12.85 12.85 13.35C12.75 13.55 12.75 13.8 12.75 14.05V18H10.45C10.45 18 10.5 11 10.45 10.2H12.75V11.3C13.05 10.8 13.7 10.05 15.15 10.05C16.65 10.05 18 11 18 13.05V18Z"
      fill="white"
    />
  </svg>
);

// --- 3. GitHub SVG ---
const IconGitHub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-foreground/90" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// --- 4. WhatsApp SVG ---
const IconWhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#25D366" />
    <path
      d="M17.5 14.38C17.2 14.23 15.7 13.5 15.42 13.4C15.15 13.3 14.95 13.25 14.75 13.55C14.55 13.85 14 14.55 13.83 14.75C13.65 14.95 13.48 14.97 13.18 14.82C12.88 14.67 11.92 14.36 10.78 13.35C9.89 12.56 9.29 11.58 9.12 11.28C8.95 10.98 9.1 10.82 9.25 10.67C9.39 10.53 9.55 10.31 9.7 10.14C9.85 9.97 9.9 9.85 10 9.65C10.1 9.45 10.05 9.28 9.97 9.13C9.9 8.98 9.3 7.5 9.05 6.9C8.8 6.33 8.56 6.4 8.38 6.4C8.2 6.4 8 6.38 7.8 6.38C7.6 6.38 7.28 6.45 7 6.75C6.72 7.05 6 7.72 6 9.08C6 10.45 7 11.78 7.15 11.97C7.3 12.17 9.1 14.95 11.88 16.15C12.55 16.44 13.06 16.6 13.47 16.73C14.13 16.94 14.73 16.91 15.2 16.84C15.73 16.76 16.83 16.17 17.05 15.53C17.28 14.9 17.28 14.35 17.2 14.23C17.13 14.1 16.95 14.03 16.65 13.88L17.5 14.38Z"
      fill="white"
    />
  </svg>
);

// --- 5. Telegram SVG ---
const IconTelegram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#229ED9" />
    <path
      d="M6.5 11.8L16.2 8.1C16.6 7.9 17 8.3 16.8 8.7L15.1 16.7C15 17.1 14.5 17.3 14.2 17.1L11.7 15.2L10.5 16.4C10.3 16.6 10 16.5 9.9 16.2L9.5 13.6L14.7 9.8L8.3 13.1L6.5 12.5C6.1 12.4 6.1 11.9 6.5 11.8Z"
      fill="white"
    />
  </svg>
);

// --- 6. Phone / Direct Call SVG ---
const IconPhoneCall = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#10B981" />
    <path
      d="M8.5 7.5C8 7.5 7 8 7 9.5C7 13 11 17 14.5 17C16 17 16.5 16 16.5 15.5L14.8 13.8C14.5 13.5 14 13.6 13.7 13.9L13 14.6C12.8 14.5 12 14 11 13C10 12 9.5 11.2 9.4 11L10.1 10.3C10.4 10 10.5 9.5 10.2 9.2L8.5 7.5Z"
      fill="white"
    />
  </svg>
);

// --- 7. Discord SVG ---
const IconDiscord = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20.317 4.482a1.88 1.88 0 0 0-1.635-.482C17.398 3.42 16.02 3 12 3s-5.398.42-6.682 1.001a1.88 1.88 0 0 0-1.635.483c-1.875 1.2-2.325 3.61-1.568 5.711 1.62 4.47 5.063 7.8 9.885 7.8s8.265-3.33 9.885-7.8c.757-2.1-.307-4.51-1.568-5.711ZM8.45 13.4c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Zm7.1 0c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Z" fill="#5865F2" />
  </svg>
);

// --- 8. X / Twitter SVG ---
const IconXTwitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-foreground/90" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.03 19.75h1.866L7.156 4.25H5.16l11.874 15.5z" />
  </svg>
);

// --- 9. Slack SVG ---
const IconSlack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="#36C5F0" />
    <path d="M9 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#2EB67D" />
    <path d="M14 8.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" fill="#ECB22E" />
    <path d="M15.5 15a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" fill="#E01E5A" />
    <path d="M10 14h4v-1.5a1.5 1.5 0 0 0-1.5-1.5h-1a1.5 1.5 0 0 0-1.5 1.5V14Z" fill="#E01E5A" />
    <path d="M8.5 14a1.5 1.5 0 0 0 1.5 1.5h1.5v-1a1.5 1.5 0 0 0-1.5-1.5H8.5v1Z" fill="#ECB22E" />
    <path d="M15.5 10a1.5 1.5 0 0 0-1.5-1.5H12.5v4a1.5 1.5 0 0 0 1.5 1.5h1.5v-4Z" fill="#36C5F0" />
    <path d="M14 8.5a1.5 1.5 0 0 0-1.5-1.5h-1v4a1.5 1.5 0 0 0 1.5 1.5h1v-4Z" fill="#2EB67D" />
  </svg>
);

// --- 10. Google Meet Video Call SVG ---
const IconGoogleMeet = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 11.5V6.5C15 5.67 14.33 5 13.5 5H4.5C3.67 5 3 5.67 3 6.5V17.5C3 18.33 3.67 19 4.5 19H13.5C14.33 19 15 18.33 15 17.5V12.5L21 17V7L15 11.5Z" fill="#00832D" />
    <path d="M15 11.5L21 7V17L15 12.5V11.5Z" fill="#00AC47" />
    <path d="M3 6.5C3 5.67 3.67 5 4.5 5H13.5V11H3V6.5Z" fill="#2684FC" />
    <path d="M3 11H13.5V19H4.5C3.67 19 3 18.33 3 17.5V11Z" fill="#FFBA00" />
  </svg>
);

// --- 11. Calendar / Meeting Schedule SVG ---
const IconCalendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="4" width="18" height="17" rx="3" fill="#6366F1" />
    <path d="M3 9H21" stroke="white" strokeWidth="1.5" />
    <path d="M7 2V5M17 2V5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="14" r="1.2" fill="white" />
    <circle cx="12" cy="14" r="1.2" fill="white" />
    <circle cx="16" cy="14" r="1.2" fill="white" />
  </svg>
);

// --- 12. Chat / Direct Message SVG ---
const IconChatBubble = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M18 10C18 6.686 15.314 4 12 4C8.686 4 6 6.686 6 10C6 11.455 6.518 12.79 7.382 13.829L6.5 17.5L10.324 16.536C10.86 16.833 11.419 17 12 17C15.314 17 18 14.314 18 10Z"
      fill="#8B5CF6"
    />
    <circle cx="9.5" cy="10.5" r="1" fill="white" />
    <circle cx="12" cy="10.5" r="1" fill="white" />
    <circle cx="14.5" cy="10.5" r="1" fill="white" />
  </svg>
);

// --- 13. LiveKit WebRTC / Voice AI SVG ---
const IconLiveKit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#FF6B00" />
    <path
      d="M8 8V16M12 6V18M16 9V15"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// --- 14. Instant Send / Paper Plane SVG ---
const IconPaperPlane = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#0EA5E9" />
    <path
      d="M6.5 12L17.5 7L13 17.5L11 13L6.5 12Z"
      fill="white"
    />
    <path
      d="M11 13L17.5 7"
      stroke="#0284C7"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// --- 15. Globe / Remote Collaboration SVG ---
const IconGlobe = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="9.5" stroke="#06B6D4" strokeWidth="1.5" />
    <path d="M2.5 12H21.5" stroke="#06B6D4" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4.5" ry="9.5" stroke="#06B6D4" strokeWidth="1.5" />
  </svg>
);

// --- 16. SMS / Direct Mobile SVG ---
const IconSMS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="6" y="2" width="12" height="20" rx="3" fill="#3B82F6" />
    <rect x="8" y="5" width="8" height="11" rx="1" fill="white" />
    <circle cx="12" cy="19" r="1" fill="white" />
    <path d="M10 8H14M10 11H13" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 16 Curated Contact & Collaboration Icons distributed around the Hero section
export const contactIcons: IconProps[] = [
  {
    id: 1,
    icon: IconGmail,
    className: 'top-[6%] left-[4%] sm:top-[8%] sm:left-[10%]',
    title: 'Gmail / Direct Email',
    href: `mailto:${PORTFOLIO_DATA.developer.email}`,
  },
  {
    id: 2,
    icon: IconLinkedIn,
    className: 'top-[10%] right-[4%] sm:top-[16%] sm:right-[8%]',
    title: 'LinkedIn Network',
    href: 'https://www.linkedin.com/in/kandula-jithendra-subramanyam-0311462a6/',
  },
  {
    id: 3,
    icon: IconPhoneCall,
    className: 'bottom-[12%] left-[4%] sm:top-[80%] sm:left-[10%]',
    title: 'Direct Call / Phone',
    href: `tel:${PORTFOLIO_DATA.developer.phone}`,
  },
  {
    id: 4,
    icon: IconWhatsApp,
    className: 'bottom-[12%] right-[4%] sm:bottom-[10%] sm:right-[10%]',
    title: 'WhatsApp Chat',
    href: 'https://wa.me/919704400336',
  },
  {
    id: 5,
    icon: IconGitHub,
    className: 'hidden sm:block top-[4%] left-[30%]',
    title: 'GitHub Projects & Swarms',
    href: PORTFOLIO_DATA.developer.socials.github,
  },
  {
    id: 6,
    icon: IconTelegram,
    className: 'hidden sm:block top-[4%] right-[30%]',
    title: 'Telegram Messaging',
    href: 'https://t.me/jithendra259',
  },
  {
    id: 7,
    icon: IconDiscord,
    className: 'hidden sm:block bottom-[8%] left-[25%]',
    title: 'Discord Community & Voice',
  },
  {
    id: 8,
    icon: IconSlack,
    className: 'top-[36%] left-[4%] sm:top-[40%] sm:left-[12%]',
    title: 'Slack Collaboration',
  },
  {
    id: 9,
    icon: IconGoogleMeet,
    className: 'hidden sm:block top-[75%] right-[25%]',
    title: 'Google Meet Video Discussion',
  },
  {
    id: 10,
    icon: IconXTwitter,
    className: 'hidden sm:block top-[88%] left-[68%]',
    title: 'X / Twitter DMs',
  },
  {
    id: 11,
    icon: IconLiveKit,
    className: 'top-[48%] right-[4%] sm:top-[50%] sm:right-[5%]',
    title: 'LiveKit Voice AI & Realtime Agent',
  },
  {
    id: 12,
    icon: IconCalendar,
    className: 'top-[62%] left-[4%] sm:top-[56%] sm:left-[4%]',
    title: 'Schedule a Discussion',
  },
  {
    id: 13,
    icon: IconPaperPlane,
    className: 'hidden sm:block top-[5%] left-[55%]',
    title: 'Send Instant Note',
    href: `mailto:${PORTFOLIO_DATA.developer.email}?subject=Project%20Collaboration`,
  },
  {
    id: 14,
    icon: IconGlobe,
    className: 'hidden sm:block bottom-[5%] right-[44%]',
    title: 'Global Remote & Relocation',
  },
  {
    id: 15,
    icon: IconChatBubble,
    className: 'hidden sm:block top-[24%] right-[20%]',
    title: 'Instant Chat Discussion',
  },
  {
    id: 16,
    icon: IconSMS,
    className: 'hidden sm:block top-[60%] left-[28%]',
    title: 'Direct SMS / Text',
    href: `sms:${PORTFOLIO_DATA.developer.phone}`,
  },
];
