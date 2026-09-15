'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'motion/react';
import { useSessionContext } from '@livekit/components-react';
import { Minimize2 } from 'lucide-react';
import type { AppConfig } from '@/app-config';
import { AgentSessionView_01 } from '@/components/agents-ui/blocks/agent-session-view-01';
import { WelcomeView } from '@/components/voice-agent/welcome-view';
import { DockedVoiceHUD } from '@/components/voice-agent/docked-voice-hud';
import { useVoiceAutoNavigation } from '@/hooks/useVoiceAutoNavigation';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(AgentSessionView_01);

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

import { useWebVoiceAgent } from '@/hooks/useWebVoiceAgent';
import { useAgentErrors } from '@/hooks/useAgentErrors';

interface ViewControllerProps {
  appConfig: AppConfig;
}

export function ViewController({ appConfig }: ViewControllerProps) {
  const session = useSessionContext();
  const { isConnected, start } = session;
  const { resolvedTheme } = useTheme();

  // Direct Vercel Gemini in-browser voice assistant
  const webVoice = useWebVoiceAgent();

  // If LiveKit worker is offline ("Agent did not join the room"), automatically fall back to Vercel Gemini voice assistant
  useAgentErrors(() => {
    webVoice.startSession();
  });

  // Mode: 'docked' keeps the portfolio page fully visible and auto-navigating.
  // 'full' expands into the immersive full-screen audio visualizer tile.
  const [viewMode, setViewMode] = useState<'docked' | 'full'>('docked');

  // Activate real-time voice-driven auto navigation
  const { activeTarget, navigateTo } = useVoiceAutoNavigation(session);

  const handleStartCall = React.useCallback(() => {
    if (webVoice.isActive) {
      webVoice.stopSession();
      return;
    }

    // Immediately start the Vercel-native Gemini voice assistant
    webVoice.startSession();

    // Attempt LiveKit in background (if user has active Python worker running)
    try {
      start();
    } catch {
      // ignore
    }
  }, [start, webVoice]);

  const isHUDVisible = (isConnected || webVoice.isActive) && viewMode === 'docked';

  return (
    <div className="relative w-full min-h-screen">
      {/* Portfolio page: Always rendered and interactive */}
      <WelcomeView
        startButtonText={appConfig.startButtonText}
        onStartCall={handleStartCall}
      />

      {/* Floating Live Voice HUD */}
      <AnimatePresence>
        {isHUDVisible && (
          <DockedVoiceHUD
            key="docked-hud"
            onExpand={() => setViewMode('full')}
            activeTarget={webVoice.isActive ? webVoice.activeTarget : activeTarget}
            onManualNavigate={(target) => {
              if (webVoice.isActive) {
                webVoice.navigateTo(target);
                webVoice.sendUserMessage(`Guiding screen to ${target.replace(/_/g, ' ')}`);
              } else {
                navigateTo(target, 'data_channel');
              }
            }}
            webVoice={webVoice}
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
