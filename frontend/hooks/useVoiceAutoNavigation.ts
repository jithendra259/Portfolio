'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useRoomContext } from '@livekit/components-react';
import { RoomEvent } from 'livekit-client';
import { toast } from 'sonner';

export type NavigationTarget =
  | 'hero'
  | 'about'
  | 'research'
  | 'projects'
  | 'skills'
  | 'certificates'
  | 'experience'
  | 'resume'
  | 'contact'
  | 'case_study_adaptive_governance'
  | 'case_study_regime_supervisory'
  | 'case_study_supervisory_xai'
  | 'case_study_aqi'
  | 'case_study_swarm_robotics';

export interface NavigationTargetMeta {
  type: 'section' | 'route';
  destination: string;
  label: string;
}

export const NAVIGATION_TARGETS: Record<NavigationTarget, NavigationTargetMeta> = {
  hero: { type: 'section', destination: 'hero', label: 'Overview' },
  about: { type: 'section', destination: 'about', label: 'About & Credentials' },
  research: { type: 'section', destination: 'research', label: 'Research Papers' },
  projects: { type: 'section', destination: 'projects', label: 'Featured Projects' },
  skills: { type: 'section', destination: 'skills', label: 'Skills & Tech Stack' },
  certificates: { type: 'section', destination: 'certificates', label: 'Certifications' },
  experience: { type: 'section', destination: 'experience', label: 'Experience Timeline' },
  resume: { type: 'section', destination: 'resume', label: 'Resume' },
  contact: { type: 'section', destination: 'contact', label: 'Contact Section' },
  case_study_adaptive_governance: {
    type: 'route',
    destination: '/projects/adaptive-portfolio-governance',
    label: 'Adaptive Portfolio Governance (EAAI Paper)',
  },
  case_study_regime_supervisory: {
    type: 'route',
    destination: '/projects/regime-adaptive-supervisory-governance',
    label: 'Regime-Adaptive Governance (IJCACI Paper)',
  },
  case_study_supervisory_xai: {
    type: 'route',
    destination: '/projects/supervisory-portfolio-xai-governance',
    label: 'Supervisory Portfolio XAI (CAS Journal)',
  },
  case_study_aqi: {
    type: 'route',
    destination: '/projects/personalised-aqi-system',
    label: 'Personalised AQI System',
  },
  case_study_swarm_robotics: {
    type: 'route',
    destination: '/projects/swarm-robots-agriculture',
    label: 'Swarm Robots for Agriculture',
  },
};

/**
 * Keyword-based speech intent detector
 */
function matchSpeechIntent(text: string): NavigationTarget | null {
  const lower = text.toLowerCase();

  // Route matches (higher specificity)
  if (
    lower.includes('adaptive portfolio') ||
    lower.includes('graph cvar') ||
    lower.includes('eaai paper') ||
    lower.includes('contagion penalization')
  ) {
    return 'case_study_adaptive_governance';
  }

  if (
    lower.includes('regime adaptive') ||
    lower.includes('supervisory governance') ||
    lower.includes('ijcaci') ||
    lower.includes('conference paper')
  ) {
    return 'case_study_regime_supervisory';
  }

  if (
    lower.includes('supervisory portfolio') ||
    lower.includes('explainable ai') ||
    lower.includes('xai') ||
    lower.includes('cas journal') ||
    lower.includes('conversational explainability')
  ) {
    return 'case_study_supervisory_xai';
  }

  if (
    lower.includes('aqi') ||
    lower.includes('air quality') ||
    lower.includes('pollution')
  ) {
    return 'case_study_aqi';
  }

  if (
    lower.includes('swarm robot') ||
    lower.includes('agriculture') ||
    lower.includes('crop disease')
  ) {
    return 'case_study_swarm_robotics';
  }

  // Section matches
  if (
    lower.includes('go to project') ||
    lower.includes('show project') ||
    lower.includes('view project') ||
    lower.includes('see project') ||
    lower.includes('open project') ||
    lower.includes('all projects') ||
    lower.includes('featured project')
  ) {
    return 'projects';
  }

  if (
    lower.includes('research paper') ||
    lower.includes('publication') ||
    lower.includes('manuscript') ||
    lower.includes('journal paper') ||
    lower.includes('show research') ||
    lower.includes('view research') ||
    lower.includes('go to research')
  ) {
    return 'research';
  }

  if (
    lower.includes('about jithendra') ||
    lower.includes('about you') ||
    lower.includes('about him') ||
    lower.includes('background') ||
    lower.includes('who are you') ||
    lower.includes('go to about') ||
    lower.includes('show about')
  ) {
    return 'about';
  }

  if (
    lower.includes('resume') ||
    lower.includes('curriculum vitae') ||
    lower.includes('show cv') ||
    lower.includes('download resume')
  ) {
    return 'resume';
  }

  if (
    lower.includes('contact') ||
    lower.includes('get in touch') ||
    lower.includes('book appointment') ||
    lower.includes('hire') ||
    lower.includes('email') ||
    lower.includes('collaborate')
  ) {
    return 'contact';
  }

  if (
    lower.includes('experience') ||
    lower.includes('work history') ||
    lower.includes('internship') ||
    lower.includes('career')
  ) {
    return 'experience';
  }

  if (
    lower.includes('certificate') ||
    lower.includes('certification') ||
    lower.includes('degrees') ||
    lower.includes('credentials')
  ) {
    return 'certificates';
  }

  if (
    lower.includes('skill') ||
    lower.includes('tech stack') ||
    lower.includes('technologies') ||
    lower.includes('tools')
  ) {
    return 'skills';
  }

  if (
    lower.includes('back to top') ||
    lower.includes('go to home') ||
    lower.includes('scroll top') ||
    lower.includes('top of page')
  ) {
    return 'hero';
  }

  return null;
}

export function useVoiceAutoNavigation(session?: any, messages?: any[]) {
  const router = useRouter();
  const pathname = usePathname();
  const room = useRoomContext();
  const [activeTarget, setActiveTarget] = useState<NavigationTarget | null>(null);
  const [lastNavigatedAt, setLastNavigatedAt] = useState<number | null>(null);
  const lastProcessedMsgId = useRef<string | null>(null);
  const cooldownRef = useRef<number>(0);

  const navigateTo = useCallback(
    (targetKey: NavigationTarget, source: 'data_channel' | 'speech_intent' = 'data_channel') => {
      const now = Date.now();
      // 2-second cooldown to prevent rapid oscillations
      if (now - cooldownRef.current < 2000 && activeTarget === targetKey) {
        return;
      }
      cooldownRef.current = now;

      const target = NAVIGATION_TARGETS[targetKey];
      if (!target) return;

      setActiveTarget(targetKey);
      setLastNavigatedAt(now);

      toast.info(`🧭 Auto-Navigating: ${target.label}`, {
        description: `Voice agent guided screen to ${target.label}`,
        duration: 3500,
      });

      if (target.type === 'section') {
        if (pathname !== '/') {
          router.push(`/#${target.destination}`);
        } else {
          const el = document.getElementById(target.destination);
          if (el) {
            const headerOffset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth',
            });

            // Brief pulse highlight on section header
            el.classList.add('ring-2', 'ring-cyan-400/40', 'rounded-2xl', 'transition-all');
            setTimeout(() => {
              el.classList.remove('ring-2', 'ring-cyan-400/40', 'rounded-2xl', 'transition-all');
            }, 2500);

            // Open appointment booking modal automatically when navigating to contact
            if (targetKey === 'contact') {
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('open-appointment-booking'));
              }, 700);
            }
          }
        }
      } else if (target.type === 'route') {
        router.push(target.destination);
      }
    },
    [pathname, router, activeTarget]
  );

  // 1. Data Channel Listener from LiveKit Python Agent
  useEffect(() => {
    if (!room) return;

    const handleDataReceived = (payload: Uint8Array, participant: any, kind: any, topic?: string) => {
      if (topic === 'navigation' || topic === 'lk-navigation') {
        try {
          const text = new TextDecoder().decode(payload);
          const data = JSON.parse(text);
          if (data && data.target && NAVIGATION_TARGETS[data.target as NavigationTarget]) {
            navigateTo(data.target as NavigationTarget, 'data_channel');
          }
        } catch (e) {
          console.error('Failed to parse navigation data packet:', e);
        }
      }
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);
    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
    };
  }, [room, navigateTo]);

  // 2. Navigation is controlled strictly by the Python backend via LiveKit DataChannel ('topic: navigation')
  // No client-side keyword heuristic parsing so the backend LLM tool decides when to navigate.

  return {
    activeTarget,
    lastNavigatedAt,
    navigateTo,
    currentTargetMeta: activeTarget ? NAVIGATION_TARGETS[activeTarget] : null,
  };
}
