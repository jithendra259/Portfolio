'use client';

import React from 'react';
import { LandingPage } from './landingpage';

interface WelcomeViewProps {
  startButtonText?: string;
  onStartCall: () => void;
}

export const WelcomeView = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & WelcomeViewProps
>(({ onStartCall, startButtonText, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className="w-full">
      <LandingPage onStartCall={onStartCall} />
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';
