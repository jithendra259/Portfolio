'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAgent, useSessionContext } from '@livekit/components-react';
import { Mic, MicOff, PhoneOff, Maximize2, Compass, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAVIGATION_TARGETS, type NavigationTarget } from '@/hooks/useVoiceAutoNavigation';

interface DockedVoiceHUDProps {
  onExpand: () => void;
  activeTarget: NavigationTarget | null;
  onManualNavigate: (target: NavigationTarget) => void;
  className?: string;
  messages?: any[];
}

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
  const [navOpen, setNavOpen] = useState(false);

  // Toggle local mic
  const handleToggleMic = async () => {
    if (session?.room?.localParticipant) {
      const currentEnabled = session.room.localParticipant.isMicrophoneEnabled;
      await session.room.localParticipant.setMicrophoneEnabled(!currentEnabled);
      setIsMuted(currentEnabled);
    }
  };

  // Disconnect call
  const handleEndCall = () => {
    if (session?.room) {
      session.room.disconnect();
    }
  };

  // Retry call
  const handleRetry = async () => {
    try {
      if (session?.room) {
        await session.room.disconnect();
      }
      await session.start();
    } catch (e) {
      console.error('Retry error:', e);
    }
  };

  const msgList = messages ?? [];
  const latestMessage = msgList.length > 0 ? msgList[msgList.length - 1] : null;
  const latestText = latestMessage
    ? (latestMessage as any).message || (latestMessage as any).text || ''
    : '';
  const isAgentMessage = latestMessage ? (latestMessage as any).from?.isLocal === false : false;

  const currentMeta = activeTarget ? NAVIGATION_TARGETS[activeTarget] : null;

  // Derive aura color from agent state
  const auraColor =
    agentState === 'speaking'
      ? { ring: '#34d399', glow: 'rgba(52,211,153,0.45)', dot: 'bg-emerald-400' }
      : agentState === 'thinking'
      ? { ring: '#fbbf24', glow: 'rgba(251,191,36,0.4)', dot: 'bg-amber-400' }
      : agentState === 'listening'
      ? { ring: '#22d3ee', glow: 'rgba(34,211,238,0.45)', dot: 'bg-cyan-400' }
      : agentState === 'failed'
      ? { ring: '#f43f5e', glow: 'rgba(244,63,94,0.4)', dot: 'bg-rose-500' }
      : { ring: '#818cf8', glow: 'rgba(129,140,248,0.35)', dot: 'bg-indigo-400' };

  const isPulsing = agentState === 'speaking' || agentState === 'listening';

  const navKeys: NavigationTarget[] = [
    'projects',
    'research',
    'about',
    'case_study_adaptive_governance',
    'resume',
    'contact',
  ];

  return (
    <div
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 pointer-events-none',
        className
      )}
    >
      {/* ── Nav Pills (appear above orb) ── */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            key="nav-pills"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="pointer-events-auto flex items-center gap-1.5 flex-wrap justify-center max-w-xs px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest w-full text-center mb-0.5">
              Say or Tap
            </span>
            {navKeys.map((key) => {
              const meta = NAVIGATION_TARGETS[key];
              const isSelected = activeTarget === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onManualNavigate(key);
                    setNavOpen(false);
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-lg border text-nowrap text-[11px] font-mono transition-all cursor-pointer',
                    isSelected
                      ? 'bg-cyan-500/25 text-cyan-300 border-cyan-400/50'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {meta.label.split(' ')[0]}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Latest Transcript Pill ── */}
      <AnimatePresence>
        {latestText && (
          <motion.div
            key="transcript"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="pointer-events-none px-3 py-1.5 rounded-full bg-slate-950/75 border border-white/10 backdrop-blur-xl text-[11px] font-mono text-slate-300 max-w-[280px] truncate shadow-lg"
          >
            <span className="text-slate-500 mr-1">
              {isAgentMessage ? 'AI:' : 'You:'}
            </span>
            {latestText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Aura Orb Cluster ── */}
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="pointer-events-auto flex items-end gap-3"
      >
        {/* Mic button */}
        <motion.button
          type="button"
          onClick={handleToggleMic}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.08 }}
          className={cn(
            'relative size-12 rounded-full flex items-center justify-center border shadow-lg transition-colors cursor-pointer backdrop-blur-md',
            isMuted
              ? 'bg-rose-500/20 border-rose-400/50 text-rose-300 shadow-rose-500/20'
              : 'bg-white/8 border-white/15 text-slate-300 hover:text-white shadow-black/20'
          )}
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label="Toggle Microphone"
        >
          {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
        </motion.button>

        {/* Central Aura Orb */}
        <motion.button
          type="button"
          onClick={() => setNavOpen((v) => !v)}
          whileTap={{ scale: 0.92 }}
          className="relative size-20 flex items-center justify-center cursor-pointer"
          title="Open navigation"
          aria-label="Toggle navigation"
        >
          {/* Outer pulsing aura rings */}
          {isPulsing && (
            <>
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-25"
                style={{ background: auraColor.glow, animationDuration: '1.4s' }}
              />
              <span
                className="absolute -inset-3 rounded-full animate-ping opacity-15"
                style={{ background: auraColor.glow, animationDuration: '2s', animationDelay: '0.3s' }}
              />
            </>
          )}

          {/* Static outer glow */}
          <span
            className="absolute inset-0 rounded-full opacity-30 blur-md"
            style={{ background: auraColor.glow }}
          />

          {/* Main orb body */}
          <span
            className="absolute inset-0 rounded-full backdrop-blur-xl border-2"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${auraColor.ring}22 0%, #0d0f1490 70%)`,
              borderColor: `${auraColor.ring}60`,
              boxShadow: `0 0 24px 6px ${auraColor.glow}, inset 0 1px 1px rgba(255,255,255,0.12)`,
            }}
          />

          {/* Icon */}
          <span className="relative z-10 flex items-center justify-center">
            {currentMeta ? (
              <Compass
                className="size-6 text-white/90"
                style={{ filter: `drop-shadow(0 0 6px ${auraColor.ring})` }}
              />
            ) : (
              <Sparkles
                className="size-6"
                style={{
                  color: auraColor.ring,
                  filter: `drop-shadow(0 0 8px ${auraColor.ring})`,
                }}
              />
            )}
          </span>

          {/* State dot */}
          <span
            className={cn(
              'absolute top-1 right-1 size-3 rounded-full border-2 border-[#0d0f14] z-20',
              auraColor.dot,
              agentState === 'speaking' && 'animate-ping',
              agentState === 'thinking' && 'animate-pulse',
              agentState === 'listening' && 'animate-pulse'
            )}
          />

          {/* Auto-nav mini label */}
          {currentMeta && (
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-300 whitespace-nowrap">
              → {currentMeta.label.split(' ')[0]}
            </span>
          )}
        </motion.button>

        {/* Expand / End call buttons */}
        <div className="flex flex-col gap-1.5">
          <motion.button
            type="button"
            onClick={onExpand}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            className="size-10 rounded-full flex items-center justify-center bg-white/8 border border-white/15 text-slate-300 hover:text-white shadow-lg shadow-black/20 backdrop-blur-md transition-colors cursor-pointer"
            title="Expand full view"
            aria-label="Expand view"
          >
            <Maximize2 className="size-3.5" />
          </motion.button>

          <motion.button
            type="button"
            onClick={agentState === 'failed' ? handleRetry : handleEndCall}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            className="size-10 rounded-full flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/40 transition-colors cursor-pointer"
            title={agentState === 'failed' ? 'Reconnect' : 'End call'}
            aria-label="End call"
          >
            <PhoneOff className="size-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
