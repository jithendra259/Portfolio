'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { NAVIGATION_TARGETS, type NavigationTarget } from '@/hooks/useVoiceAutoNavigation';

interface UseWebVoiceAgentReturn {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  isMuted: boolean;
  lastSpeaker: 'user' | 'agent' | null;
  transcript: string;
  activeTarget: NavigationTarget | null;
  startSession: () => void;
  stopSession: () => void;
  toggleMic: () => void;
  sendUserMessage: (text: string) => Promise<void>;
  navigateTo: (target: NavigationTarget) => void;
}

export function useWebVoiceAgent(): UseWebVoiceAgentReturn {
  const router = useRouter();
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [lastSpeaker, setLastSpeaker] = useState<'user' | 'agent' | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [activeTarget, setActiveTarget] = useState<NavigationTarget | null>(null);

  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<any>(null);
  const historyRef = useRef<Array<{ role: string; text: string }>>([]);
  const hasGreetedRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isMutedRef = useRef(false);
  const isActiveRef = useRef(false);

  isActiveRef.current = isActive;
  isSpeakingRef.current = isSpeaking;
  isMutedRef.current = isMuted;

  // Auto-navigation handler
  const navigateTo = useCallback(
    (targetKey: NavigationTarget) => {
      const meta = NAVIGATION_TARGETS[targetKey];
      if (!meta) return;

      setActiveTarget(targetKey);
      toast.info(`🧭 Auto-Navigating: ${meta.label}`, {
        description: `Voice agent guided screen to ${meta.label}`,
        duration: 3500,
      });

      if (meta.type === 'section') {
        if (pathname !== '/') {
          router.push(`/#${meta.destination}`);
        } else {
          const el = document.getElementById(meta.destination);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.location.hash = meta.destination;
          }
        }
      } else if (meta.type === 'route') {
        router.push(meta.destination);
      }
    },
    [pathname, router]
  );

  // Text-to-speech
  const speakText = useCallback(
    (text: string, onDone?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        if (onDone) onDone();
        return;
      }

      window.speechSynthesis.cancel();

      const cleanText = text.replace(/[*#`_~]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const selectedVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David') || v.name.includes('Alex'))) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setLastSpeaker('agent');
        setTranscript(cleanText);
      };

      utterance.onend = () => {
        utteranceRef.current = null;
        setIsSpeaking(false);
        if (onDone) onDone();
      };

      utterance.onerror = () => {
        utteranceRef.current = null;
        setIsSpeaking(false);
        if (onDone) onDone();
      };

      // Keep reference to prevent garbage collection cut-off in Chrome
      utteranceRef.current = utterance;
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    },
    []
  );

  // Forward declaration for mutual calling
  const startListeningRef = useRef<() => void>(() => {});

  // Send message to /api/voice-chat
  const sendUserMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isThinking) return;

      setIsThinking(true);
      setLastSpeaker('user');
      setTranscript(text);

      // Add to conversation history
      historyRef.current.push({ role: 'user', text });

      try {
        const res = await fetch('/api/voice-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: historyRef.current.slice(-6),
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        const replyText = data.text || "I'm here to assist you with Jithendra's portfolio.";
        const navigationTarget = data.navigationTarget;

        historyRef.current.push({ role: 'agent', text: replyText });
        setIsThinking(false);

        // Perform navigation if requested
        if (navigationTarget) {
          const matchedTarget = Object.keys(NAVIGATION_TARGETS).find(
            (k) => k.toLowerCase() === navigationTarget.toLowerCase() || navigationTarget.toLowerCase().includes(k.toLowerCase())
          ) as NavigationTarget | undefined;

          if (matchedTarget) {
            navigateTo(matchedTarget);
          }
        }

        // Speak reply
        speakText(replyText, () => {
          // Resume listening after speaking finishes
          setTimeout(() => {
            if (!isMutedRef.current && isActiveRef.current) {
              startListeningRef.current();
            }
          }, 300);
        });
      } catch (err) {
        console.error('Error contacting voice assistant:', err);
        setIsThinking(false);
        speakText(
          "I'm here to help you navigate Jithendra's research publications and projects. What would you like to see?",
          () => {
            setTimeout(() => {
              if (!isMutedRef.current && isActiveRef.current) {
                startListeningRef.current();
              }
            }, 300);
          }
        );
      }
    },
    [isThinking, navigateTo, speakText]
  );

  // Initialize and start speech recognition
  const startRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.warning('Voice recognition not supported in this browser.', {
        description: 'You can tap the quick navigation chips below to interact.',
      });
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      // Don't listen while the assistant is speaking
      if (isSpeakingRef.current || isMutedRef.current) return;

      let interim = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          finalTranscript += item[0].transcript;
        } else {
          interim += item[0].transcript;
        }
      }

      if (interim) {
        setLastSpeaker('user');
        setTranscript(interim);
      }

      if (finalTranscript.trim()) {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
        sendUserMessage(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') {
        // normal silence, keep alive if active
        return;
      }
      if (event.error === 'not-allowed') {
        toast.error('Microphone access denied', {
          description: 'Please grant microphone permissions to speak with the AI.',
        });
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // Automatically restart listening if session is still active and not speaking
      if (!isSpeakingRef.current && !isMutedRef.current && isActiveRef.current) {
        setTimeout(() => {
          if (!isSpeakingRef.current && !isMutedRef.current && isActiveRef.current) {
            try {
              recognition.start();
            } catch {
              // ignore
            }
          }
        }, 250);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      // ignore
    }
  }, [sendUserMessage]);

  startListeningRef.current = startRecognition;

  // Start voice session
  const startSession = useCallback(() => {
    setIsActive(true);
    setIsMuted(false);

    // Initial greeting if first time
    if (!hasGreetedRef.current) {
      hasGreetedRef.current = true;
      const greeting =
        "Hello! I am Jithendra's portfolio voice assistant. Ask me anything about his quantitative research in multi-agent governance, his accepted publications, or tell me where to guide your screen.";
      speakText(greeting, () => {
        startRecognition();
      });
    } else {
      startRecognition();
    }
  }, [speakText, startRecognition]);

  // Stop voice session
  const stopSession = useCallback(() => {
    setIsActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setIsThinking(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Toggle microphone
  const toggleMic = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next && recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      } else if (!next && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // ignore
        }
      }
      return next;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isActive,
    isListening,
    isSpeaking,
    isThinking,
    isMuted,
    lastSpeaker,
    transcript,
    activeTarget,
    startSession,
    stopSession,
    toggleMic,
    sendUserMessage,
    navigateTo,
  };
}
