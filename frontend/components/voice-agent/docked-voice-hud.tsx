'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAgent, useSessionContext } from '@livekit/components-react';
import { Mic, MicOff, PhoneOff, Maximize2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
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

// Radial action buttons that appear around the orb when tapped
const RADIAL_ACTIONS = [
  { id: 'mic',    angle: 210, label: 'Mic' },
  { id: 'expand', angle: 270, label: 'Expand' },
  { id: 'end',    angle: 330, label: 'End' },
];
const RADIAL_RADIUS = 72; // px from orb center

export function DockedVoiceHUD({
  onExpand,
  activeTarget,
  onManualNavigate,
  className,
  messages,
}: DockedVoiceHUDProps) {
  const session = useSessionContext();
  const { state: agentState } = useAgent();
  const [isMuted, setIsMuted] = useState(false);
  const [orbOpen, setOrbOpen] = useState(true); // orb visible or collapsed to trigger dot
  const [controlsOpen, setControlsOpen] = useState(false); // radial + nav open
  const [navOpen, setNavOpen] = useState(false);

  const orbRef = useRef<HTMLDivElement>(null);

  // Close orb (and controls) when clicking outside
  useEffect(() => {
    if (!orbOpen && !controlsOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (orbRef.current && !orbRef.current.contains(e.target as Node)) {
        setControlsOpen(false);
        setNavOpen(false);
        // Collapse orb to trigger dot
        setOrbOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [orbOpen, controlsOpen]);

  const handleToggleMic = useCallback(async () => {
    if (session?.room?.localParticipant) {
      const currentEnabled = session.room.localParticipant.isMicrophoneEnabled;
      await session.room.localParticipant.setMicrophoneEnabled(!currentEnabled);
      setIsMuted(currentEnabled);
    }
  }, [session]);

  const handleEndCall = useCallback(() => {
    if (session?.room) session.room.disconnect();
  }, [session]);

  const handleRetry = useCallback(async () => {
    try {
      if (session?.room) await session.room.disconnect();
      await session.start();
    } catch (e) {
      console.error('Retry:', e);
    }
  }, [session]);

  const handleOrbClick = () => {
    setControlsOpen((v) => !v);
    setNavOpen(false);
  };

  const handleRadialAction = (id: string) => {
    setControlsOpen(false);
    setNavOpen(false);
    if (id === 'mic') handleToggleMic();
    else if (id === 'expand') onExpand();
    else if (id === 'end') agentState === 'failed' ? handleRetry() : handleEndCall();
  };

  // Derive color from state
  const palette =
    agentState === 'speaking'
      ? { core: '#34d399', glow: 'rgba(52,211,153,0.5)',  ring: '#34d39960', dot: 'bg-emerald-400' }
      : agentState === 'thinking'
      ? { core: '#fbbf24', glow: 'rgba(251,191,36,0.45)', ring: '#fbbf2460', dot: 'bg-amber-400' }
      : agentState === 'listening'
      ? { core: '#22d3ee', glow: 'rgba(34,211,238,0.5)',  ring: '#22d3ee60', dot: 'bg-cyan-400' }
      : agentState === 'failed'
      ? { core: '#f43f5e', glow: 'rgba(244,63,94,0.45)',  ring: '#f43f5e60', dot: 'bg-rose-500' }
      : { core: '#818cf8', glow: 'rgba(129,140,248,0.38)', ring: '#818cf840', dot: 'bg-indigo-400' };

  const isPulsing = agentState === 'speaking' || agentState === 'listening';

  const msgList = messages ?? [];
  const latestMessage = msgList.length > 0 ? msgList[msgList.length - 1] : null;
  const latestText = latestMessage
    ? (latestMessage as any).message || (latestMessage as any).text || ''
    : '';
  const isAgentMessage = latestMessage ? (latestMessage as any).from?.isLocal === false : false;

  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 z-50 flex items-end justify-end pointer-events-none',
        className
      )}
    >
      {/* ── Trigger dot (shown when orb is collapsed) ── */}
      <AnimatePresence>
        {!orbOpen && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={() => setOrbOpen(true)}
            className="pointer-events-auto relative size-12 rounded-full flex items-center justify-center cursor-pointer"
            style={{ boxShadow: `0 0 18px 4px ${palette.glow}` }}
            title="Open AI Assistant"
            aria-label="Open AI Assistant"
          >
            {/* glow */}
            <span
              className="absolute inset-0 rounded-full blur-sm opacity-60"
              style={{ background: palette.glow }}
            />
            {/* body */}
            <span
              className="absolute inset-0 rounded-full border-2"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${palette.core}30 0%, #0d0f1490 70%)`,
                borderColor: palette.ring,
              }}
            />
            <Sparkles
              className="relative z-10 size-4"
              style={{ color: palette.core, filter: `drop-shadow(0 0 5px ${palette.core})` }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Full Orb ── */}
      <AnimatePresence>
        {orbOpen && (
          <motion.div
            key="orb-root"
            ref={orbRef}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="pointer-events-auto relative flex items-center justify-center"
            style={{ width: 90, height: 90 }}
          >
            {/* Outer pulse rings */}
            {isPulsing && (
              <>
                <span
                  className="absolute rounded-full animate-ping"
                  style={{
                    inset: -8,
                    background: palette.glow,
                    opacity: 0.22,
                    animationDuration: '1.5s',
                  }}
                />
                <span
                  className="absolute rounded-full animate-ping"
                  style={{
                    inset: -20,
                    background: palette.glow,
                    opacity: 0.12,
                    animationDuration: '2.2s',
                    animationDelay: '0.35s',
                  }}
                />
              </>
            )}

            {/* Static soft glow halo */}
            <span
              className="absolute rounded-full blur-2xl opacity-40 pointer-events-none"
              style={{ inset: -16, background: palette.glow }}
            />

            {/* Orb body — clickable */}
            <button
              type="button"
              onClick={handleOrbClick}
              className="absolute inset-0 rounded-full cursor-pointer focus:outline-none"
              style={{
                background: `radial-gradient(circle at 35% 32%, ${palette.core}28 0%, #080a0f95 65%)`,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: palette.ring,
                boxShadow: `0 0 32px 8px ${palette.glow}, 0 0 6px 1px ${palette.core}44, inset 0 1px 1px rgba(255,255,255,0.10)`,
              }}
              aria-label="Toggle controls"
            />

            {/* Centre icon */}
            <span className="pointer-events-none relative z-10">
              <Sparkles
                className="size-6"
                style={{
                  color: palette.core,
                  filter: `drop-shadow(0 0 8px ${palette.core})`,
                }}
              />
            </span>

            {/* State dot */}
            <span
              className={cn(
                'absolute top-1.5 right-1.5 size-2.5 rounded-full border-2 border-[#080a0f] z-20 pointer-events-none',
                palette.dot,
                agentState === 'speaking' && 'animate-ping',
                (agentState === 'thinking' || agentState === 'listening') && 'animate-pulse'
              )}
            />

            {/* ── Radial control buttons ── */}
            <AnimatePresence>
              {controlsOpen && RADIAL_ACTIONS.map(({ id, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * RADIAL_RADIUS;
                const y = Math.sin(rad) * RADIAL_RADIUS;

                const isMicBtn = id === 'mic';
                const isEndBtn = id === 'end';
                const Icon =
                  isMicBtn
                    ? (isMuted ? MicOff : Mic)
                    : isEndBtn
                    ? PhoneOff
                    : Maximize2;

                const btnStyle = isMicBtn && isMuted
                  ? 'bg-rose-500/25 border-rose-400/50 text-rose-300 shadow-rose-500/25'
                  : isEndBtn
                  ? 'bg-rose-500 border-rose-400 text-white shadow-rose-500/40'
                  : 'bg-slate-900/80 border-white/15 text-slate-200 shadow-black/30';

                return (
                  <motion.button
                    key={id}
                    type="button"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                    animate={{ opacity: 1, x, y: -y, scale: 1 }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26, delay: 0.03 * RADIAL_ACTIONS.findIndex(a => a.id === id) }}
                    onClick={() => handleRadialAction(id)}
                    className={cn(
                      'absolute size-10 rounded-full flex items-center justify-center border backdrop-blur-xl shadow-lg cursor-pointer transition-colors',
                      btnStyle
                    )}
                    style={{ marginLeft: -20, marginTop: -20 }}
                    aria-label={id}
                  >
                    <Icon className="size-4" />
                  </motion.button>
                );
              })}
            </AnimatePresence>

            {/* ── Nav pills (appear above orb) ── */}
            <AnimatePresence>
              {controlsOpen && (
                <motion.div
                  key="nav-pills"
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30, delay: 0.05 }}
                  className="absolute bottom-[calc(100%+18px)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
                >
                  {/* Latest transcript */}
                  {latestText && (
                    <div className="px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-xl text-[10px] font-mono text-slate-300 max-w-[220px] truncate whitespace-nowrap">
                      <span className="text-slate-500 mr-1">{isAgentMessage ? 'AI:' : 'You:'}</span>
                      {latestText}
                    </div>
                  )}

                  {/* Nav pills */}
                  <div className="flex items-center gap-1 flex-wrap justify-center bg-slate-950/75 border border-white/10 backdrop-blur-xl rounded-2xl px-3 py-2 max-w-[260px]">
                    <span className="text-[8px] uppercase font-bold text-slate-500 tracking-widest w-full text-center mb-0.5">
                      Navigate
                    </span>
                    {NAV_KEYS.map((key) => {
                      const meta = NAVIGATION_TARGETS[key];
                      const isSelected = activeTarget === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            onManualNavigate(key);
                            setControlsOpen(false);
                          }}
                          className={cn(
                            'px-2 py-0.5 rounded-md border text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer',
                            isSelected
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
