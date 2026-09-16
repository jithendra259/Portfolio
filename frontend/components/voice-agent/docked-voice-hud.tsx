'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAgent, useSessionContext } from '@livekit/components-react';
import { Mic, MicOff, PhoneOff, Maximize2, Compass, Sparkles, Volume2 } from 'lucide-react';
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

  const msgList = messages ?? [];
  const latestMessage = msgList.length > 0 ? msgList[msgList.length - 1] : null;
  const latestText = latestMessage
    ? (latestMessage as any).message || (latestMessage as any).text || ''
    : '';
  const isAgentMessage = latestMessage ? (latestMessage as any).from?.isLocal === false : false;

  const currentMeta = activeTarget ? NAVIGATION_TARGETS[activeTarget] : null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none',
        className
      )}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="pointer-events-auto w-full bg-slate-950/85 dark:bg-[#0d0f14]/90 text-white rounded-3xl border border-white/15 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-3.5 flex flex-col gap-2.5"
      >
        {/* Top Row: Live State, Audio Wave, Navigation Indicator & Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Agent Identity & Status */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex items-center justify-center size-9 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 shrink-0">
              <Sparkles className="size-4 text-cyan-400 animate-pulse" />
              <div
                className={cn(
                  'absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-slate-950',
                  agentState === 'speaking'
                    ? 'bg-emerald-400 animate-ping'
                    : agentState === 'thinking'
                    ? 'bg-amber-400 animate-pulse'
                    : agentState === 'listening'
                    ? 'bg-cyan-400'
                    : agentState === 'failed'
                    ? 'bg-rose-500'
                    : 'bg-indigo-400 animate-pulse'
                )}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                  BACKEND AI
                </span>
                <span
                  className={cn(
                    'text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border',
                    agentState === 'speaking'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : agentState === 'thinking'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : agentState === 'listening'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : agentState === 'failed'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  )}
                >
                  {agentState === 'speaking'
                    ? 'Speaking'
                    : agentState === 'thinking'
                    ? 'Thinking'
                    : agentState === 'listening'
                    ? 'Listening'
                    : agentState === 'failed'
                    ? 'Offline'
                    : 'Connecting...'}
                </span>
                <span className="hidden xs:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                  RENDER LIVE
                </span>
              </div>

              {/* Navigation badge */}
              {currentMeta && (
                <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-mono truncate">
                  <Compass className="size-3 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="truncate">Auto-Nav: {currentMeta.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sound wave animated bars */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shrink-0">
            {[40, 75, 55, 90, 60, 30].map((h, i) => (
              <span
                key={i}
                className={cn(
                  'w-1 rounded-full bg-cyan-400 transition-all duration-150',
                  agentState === 'speaking' ? 'animate-pulse' : 'opacity-40'
                )}
                style={{
                  height: agentState === 'speaking' ? `${h * 0.25}px` : '4px',
                  animationDelay: `${i * 120}ms`,
                }}
              />
            ))}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mic Toggle */}
            <button
              type="button"
              onClick={handleToggleMic}
              className={cn(
                'p-2 rounded-xl border transition-all cursor-pointer',
                isMuted
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              )}
              title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              aria-label="Toggle Microphone"
            >
              {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
            </button>

            {/* Expand Fullscreen */}
            <button
              type="button"
              onClick={onExpand}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
              title="Expand to Full Immersion Visualizer"
              aria-label="Expand view"
            >
              <Maximize2 className="size-4" />
            </button>

            {/* End Call */}
            <button
              type="button"
              onClick={handleEndCall}
              className="px-3 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-rose-500/30 transition-all cursor-pointer"
              title="Disconnect Voice Call"
              aria-label="Disconnect"
            >
              <PhoneOff className="size-3.5" />
              <span className="hidden xs:inline">End</span>
            </button>
          </div>
        </div>

        {/* Bottom Subtitle / Transcript Banner */}
        {latestText ? (
          <div className="px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 truncate flex items-center gap-2">
            <Volume2 className="size-3 text-cyan-400 shrink-0" />
            <span className="text-slate-400 shrink-0">
              {isAgentMessage ? 'Agent:' : 'You:'}
            </span>
            <span className="truncate text-slate-200">{latestText}</span>
          </div>
        ) : !session.isConnected ? (
          <div className="px-3 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-300 truncate flex items-center gap-2">
            <Sparkles className="size-3 text-cyan-400 shrink-0 animate-spin" />
            <span className="truncate">Connecting directly to Render backend AI...</span>
          </div>
        ) : null}

        {/* Quick Voice Auto-Nav Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[11px] font-mono">
          <span className="text-slate-400 shrink-0 text-[10px] uppercase font-semibold">
            Say or Tap:
          </span>
          {(['projects', 'research', 'about', 'case_study_adaptive_governance', 'resume', 'contact'] as NavigationTarget[]).map((key) => {
            const meta = NAVIGATION_TARGETS[key];
            const isSelected = activeTarget === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onManualNavigate(key)}
                className={cn(
                  'px-2.5 py-1 rounded-lg border text-nowrap transition-all cursor-pointer',
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
    </div>
  );
}
