'use client';

import React from 'react';
import { LandingPage } from '@/components/sections/landingpage';

interface WelcomeViewProps {
  startButtonText?: string;
  onStartCall: () => void;
  isConnected?: boolean;
  isConnecting?: boolean;
}

export const WelcomeView = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & WelcomeViewProps
>(({ onStartCall, startButtonText, isConnected, isConnecting, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className="w-full">
      <LandingPage
        onStartCall={onStartCall}
        isConnected={isConnected}
        isConnecting={isConnecting}
      />
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';
