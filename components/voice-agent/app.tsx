'use client';

import { useMemo } from 'react';
import { TokenSource, Room } from 'livekit-client';
import { useSession } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr';
import type { AppConfig } from '@/app-config';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { ViewController } from '@/components/voice-agent/view-controller';
import { Toaster } from '@/components/ui/primitives/sonner';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { getSandboxTokenSource } from '@/lib/utils';

// Guard against duplicate topic stream handler crashes in React StrictMode & Turbopack
if (typeof window !== 'undefined' && typeof Room !== 'undefined' && Room.prototype) {
  const originalRegister = Room.prototype.registerTextStreamHandler;
  const originalUnregister = Room.prototype.unregisterTextStreamHandler;

  if (originalRegister && !(Room.prototype as any).__safe_handler_patched) {
    (Room.prototype as any).__safe_handler_patched = true;

    const roomSubscribers = new WeakMap<Room, Map<string, Set<any>>>();

    Room.prototype.registerTextStreamHandler = function (topic: string, callback: any) {
      let topicMap = roomSubscribers.get(this);
      if (!topicMap) {
        topicMap = new Map();
        roomSubscribers.set(this, topicMap);
      }

      let subs = topicMap.get(topic);
      if (!subs) {
        subs = new Set();
        topicMap.set(topic, subs);
      }
      subs.add(callback);

      try {
        this.unregisterTextStreamHandler(topic);
      } catch {
        // ignore
      }

      return originalRegister.call(this, topic, (reader: any, participant: any) => {
        const currentSubs = topicMap?.get(topic);
        if (currentSubs) {
          for (const sub of Array.from(currentSubs)) {
            try {
              sub(reader, participant);
            } catch (e) {
              console.warn('Error in text stream handler:', e);
            }
          }
        }
      });
    };

    Room.prototype.unregisterTextStreamHandler = function (topic: string) {
      const topicMap = roomSubscribers.get(this);
      if (topicMap) {
        topicMap.delete(topic);
      }
      try {
        return originalUnregister.call(this, topic);
      } catch {
        // ignore
      }
    };
  }
}

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });

  return null;
}

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === 'string'
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint('/api/token');
  }, [appConfig]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined
  );

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="w-full min-h-screen">
        <ViewController appConfig={appConfig} />
      </main>
      <StartAudioButton label="Start Audio" />
      <Toaster
        icons={{
          warning: <WarningIcon weight="bold" />,
        }}
        position="top-center"
        className="toaster group"
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
          } as React.CSSProperties
        }
      />
    </AgentSessionProvider>
  );
}
