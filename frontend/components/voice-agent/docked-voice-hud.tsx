'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAgent, useSessionContext, useVoiceAssistant } from '@livekit/components-react';
import { Mic, MicOff, PhoneOff, Maximize2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { AgentAudioVisualizerAura } from '@/components/agents-ui/agent-audio-visualizer-aura';
import { NAVIGATION_TARGETS, type NavigationTarget } from '@/hooks/useVoiceAutoNavigation';

interface DockedVoiceHUDProps {
  onExpand: () => void;
  activeTarget: NavigationTarget | null;
  onManualNavigate: (target: NavigationTarget) => void;
  className?: string;
  messages?: any[];
}

const NAV_KEYS: NavigationTarget[] = [
  'projects',
  'research',
  'about',
  'case_study_adaptive_governance',
  'resume',
  'contact',
];

// Radial buttons: angle in degrees, 0=right, 90=up
const RADIAL = [
  { id: 'mic',    angle: 210 },
  { id: 'expand', angle: 270 },
  { id: 'end',    angle: 330 },
];
const R = 72; // px from orb center to button center

export function DockedVoiceHUD({
  onExpand,
  activeTarget,
  onManualNavigate,
  className,
  messages,
}: DockedVoiceHUDProps) {
  const session       = useSessionContext();
  const { state: agentState } = useAgent();
  const { audioTrack } = useVoiceAssistant();
  const [isMuted,      setIsMuted]      = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false); // radial + nav

  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside → end the call entirely (parent unmounts HUD, ASK button returns)
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setControlsOpen(false);
        // Disconnect the session — parent sees isConnected=false → shows ASK button
        session?.room?.disconnect();
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [session]);

  const handleToggleMic = useCallback(async () => {
    const lp = session?.room?.localParticipant;
    if (lp) {
      try {
        const enabled = lp.isMicrophoneEnabled;
        await lp.setMicrophoneEnabled(!enabled);
        setIsMuted(enabled);
      } catch (err: any) {
        console.warn('--> [Voice HUD] Could not toggle microphone:', err);
        if (err?.name === 'NotReadableError' || err?.message?.includes('Could not start audio source')) {
          toast.error('Microphone In Use or Blocked', {
            description: 'Your microphone is locked by another app (Zoom, Teams, Discord, or another browser tab). Please close them and try again.',
          });
        }
      }
    }
  }, [session]);

  const handleEndCall = useCallback(() => {
    session?.room?.disconnect();
  }, [session]);

  const handleRetry = useCallback(async () => {
    try { if (session?.room) await session.room.disconnect(); await session.start(); }
    catch (e) { console.error(e); }
  }, [session]);

  const handleRadial = (id: string) => {
    setControlsOpen(false);
    if (id === 'mic')    handleToggleMic();
    else if (id === 'expand') onExpand();
    else if (id === 'end')    agentState === 'failed' ? handleRetry() : handleEndCall();
  };

  const msgList     = messages ?? [];
  const latest      = msgList[msgList.length - 1] ?? null;
  const latestText  = latest ? ((latest as any).message || (latest as any).text || '') : '';
  const isAgent     = latest ? (latest as any).from?.isLocal === false : false;

  // Aura color per state
  const auraColor: `#${string}` =
    agentState === 'speaking'   ? '#34d399'
    : agentState === 'thinking' ? '#fbbf24'
    : agentState === 'listening' ? '#22d3ee'
    : agentState === 'failed'   ? '#f43f5e'
    : '#818cf8';

  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 z-50 flex items-end justify-end pointer-events-none',
        className
      )}
      ref={containerRef}
    >
      {/* ── Full Orb — enters/exits via parent AnimatePresence ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        className="pointer-events-auto relative flex items-center justify-center"
        style={{ width: 110, height: 110 }}
      >
        {/* ── Nav pills + transcript above ── */}
        <AnimatePresence>
          {controlsOpen && (
            <motion.div
              key="nav"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30, delay: 0.06 }}
              className="absolute bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 w-max"
            >
              {latestText && (
                <div className="px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-xl text-[10px] font-mono text-slate-300 max-w-[220px] truncate">
                  <span className="text-slate-500 mr-1">{isAgent ? 'AI:' : 'You:'}</span>
                  {latestText}
                </div>
              )}
              <div className="flex items-center gap-1 flex-wrap justify-center bg-slate-950/75 border border-white/10 backdrop-blur-xl rounded-2xl px-3 py-2 max-w-[260px]">
                <span className="text-[8px] uppercase font-bold text-slate-500 tracking-widest w-full text-center mb-0.5">Navigate</span>
                {NAV_KEYS.map((key) => {
                  const meta = NAVIGATION_TARGETS[key];
                  const sel  = activeTarget === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => { onManualNavigate(key); setControlsOpen(false); }}
                      className={cn(
                        'px-2 py-0.5 rounded-md border text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer',
                        sel
                          ? 'bg-cyan-500/25 text-cyan-300 border-cyan-400/50'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {meta.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Radial action buttons ── */}
        <AnimatePresence>
          {controlsOpen && RADIAL.map(({ id, angle }, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x   = Math.cos(rad) * R;
            const y   = -(Math.sin(rad) * R);

            const isMicBtn = id === 'mic';
            const isEndBtn = id === 'end';
            const Icon = isMicBtn ? (isMuted ? MicOff : Mic) : isEndBtn ? PhoneOff : Maximize2;

            const cls = isMicBtn && isMuted
              ? 'bg-rose-500/20 border-rose-400/50 text-rose-300 shadow-rose-500/25'
              : isEndBtn
              ? 'bg-rose-500 border-rose-400 text-white shadow-rose-500/40'
              : 'bg-slate-900/85 border-white/15 text-slate-200 shadow-black/30';

            return (
              <motion.button
                key={id}
                type="button"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                animate={{ opacity: 1, x, y, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 26, delay: 0.04 * idx }}
                onClick={() => handleRadial(id)}
                className={cn(
                  'absolute size-10 rounded-full flex items-center justify-center border backdrop-blur-xl shadow-lg cursor-pointer transition-colors',
                  cls
                )}
                style={{ marginLeft: -20, marginTop: -20 }}
                aria-label={id}
              >
                <Icon className="size-4" />
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* ── The real WebGL Aura orb (clickable) ── */}
        <button
          type="button"
          onClick={() => setControlsOpen((v) => !v)}
          className="relative w-full h-full rounded-full overflow-hidden cursor-pointer focus:outline-none"
          aria-label="Toggle controls"
        >
          <AgentAudioVisualizerAura
            state={agentState}
            audioTrack={audioTrack}
            color={auraColor}
            colorShift={0.05}
            className="size-full"
          />
        </button>
      </motion.div>
    </div>
  );
}
