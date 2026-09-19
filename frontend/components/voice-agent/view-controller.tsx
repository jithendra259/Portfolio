'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'motion/react';
import { useSessionContext, useSessionMessages } from '@livekit/components-react';
import { Bot, Mic, Minimize2 } from 'lucide-react';
import type { AppConfig } from '@/app-config';
import { AgentSessionView_01 } from '@/components/agents-ui/blocks/agent-session-view-01';
import { WelcomeView } from '@/components/voice-agent/welcome-view';
import { DockedVoiceHUD } from '@/components/voice-agent/docked-voice-hud';
import { useVoiceAutoNavigation } from '@/hooks/useVoiceAutoNavigation';
import { cn } from '@/lib/utils';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(AgentSessionView_01);

/** Floating ASK button with animated Bot/Mic icon — reused on every page */
function AskButton({ onStartCall }: { onStartCall: () => void }) {
  const [showRobot, setShowRobot] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setShowRobot((v) => !v), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={onStartCall}
        className={cn(
          'group flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer font-semibold',
          'bg-white dark:bg-[#1e1e1e] hover:bg-slate-900 dark:hover:bg-white text-slate-900 dark:text-white hover:text-white dark:hover:text-black border-slate-300 dark:border-[#3c3c3c]'
        )}
        aria-label="Ask the voice agent"
      >
        <span className="relative flex items-center justify-center size-4 shrink-0 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {showRobot ? (
              <motion.span
                key="robot"
                initial={{ opacity: 0, y: 3, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -3, scale: 0.85 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center size-4"
              >
                <Bot className="size-4" />
              </motion.span>
            ) : (
              <motion.span
                key="mic"
                initial={{ opacity: 0, y: 3, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -3, scale: 0.85 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center size-4"
              >
                <Mic className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="text-xs font-mono uppercase tracking-wider">Ask</span>
      </button>
    </div>
  );
}

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
} as const;

interface ViewControllerProps {
  appConfig: AppConfig;
  showWelcome?: boolean;
}

export function ViewController({ appConfig, showWelcome = true }: ViewControllerProps) {
  const session = useSessionContext();
  const { isConnected, start } = session;
  const { messages } = useSessionMessages(session);
  const { resolvedTheme } = useTheme();

  // Mode: 'docked' keeps the portfolio page fully visible and auto-navigating.
  // 'full' expands into the immersive full-screen audio visualizer tile.
  const [viewMode, setViewMode] = useState<'docked' | 'full'>('docked');

  // Activate real-time voice-driven auto navigation
  const { activeTarget, navigateTo } = useVoiceAutoNavigation(session, messages);

  const handleStartCall = React.useCallback(async () => {
    if (isConnected) {
      session.end();
      return;
    }

    // Connect directly to Python LiveKit backend worker on Render
    try {
      await start();
    } catch (error) {
      console.error('Failed to connect to LiveKit backend:', error);
    }
  }, [isConnected, session, start]);

  const isConnecting = session.connectionState === 'connecting';
  const isHUDVisible = (isConnected || isConnecting) && viewMode === 'docked';

  return (
    <div className={showWelcome ? 'relative w-full min-h-screen' : 'relative w-full'}>
      {/* Portfolio page: Always rendered and interactive */}
      {showWelcome && (
        <WelcomeView
          startButtonText={appConfig.startButtonText}
          onStartCall={handleStartCall}
          isConnected={isConnected}
          isConnecting={isConnecting}
        />
      )}

      {!showWelcome && !isConnected && !isConnecting && (
        <AskButton onStartCall={handleStartCall} />
      )}

      {/* Floating Live Voice HUD */}
      <AnimatePresence>
        {isHUDVisible && (
          <DockedVoiceHUD
            key="docked-hud"
            onExpand={() => setViewMode('full')}
            activeTarget={activeTarget}
            messages={messages}
            onManualNavigate={(target) => {
              navigateTo(target, 'data_channel');
            }}
          />
        )}
      </AnimatePresence>

      {/* When Connected & in Full Immersion Mode: Fullscreen Visualizer Tile */}
      <AnimatePresence>
        {isConnected && viewMode === 'full' && (
          <motion.div
            key="full-session-view"
            {...VIEW_MOTION_PROPS}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-3xl"
          >
            {/* Minimize to Dock button */}
            <div className="absolute top-4 right-4 z-60">
              <button
                type="button"
                onClick={() => setViewMode('docked')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/20 backdrop-blur-xl shadow-lg transition-all cursor-pointer"
                title="Minimize to Dock (View Portfolio Page)"
              >
                <Minimize2 className="size-3.5" />
                <span>Dock / View Page</span>
              </button>
            </div>

            <MotionSessionView
              supportsChatInput={appConfig.supportsChatInput}
              supportsVideoInput={appConfig.supportsVideoInput}
              supportsScreenShare={appConfig.supportsScreenShare}
              isPreConnectBufferEnabled={appConfig.isPreConnectBufferEnabled}
              audioVisualizerType={appConfig.audioVisualizerType}
              audioVisualizerColor={
                resolvedTheme === 'dark'
                  ? appConfig.audioVisualizerColorDark
                  : appConfig.audioVisualizerColor
              }
              audioVisualizerColorShift={appConfig.audioVisualizerColorShift}
              audioVisualizerBarCount={appConfig.audioVisualizerBarCount}
              audioVisualizerGridRowCount={appConfig.audioVisualizerGridRowCount}
              audioVisualizerGridColumnCount={appConfig.audioVisualizerGridColumnCount}
              audioVisualizerRadialBarCount={appConfig.audioVisualizerRadialBarCount}
              audioVisualizerRadialRadius={appConfig.audioVisualizerRadialRadius}
              audioVisualizerWaveLineWidth={appConfig.audioVisualizerWaveLineWidth}
              className="w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
