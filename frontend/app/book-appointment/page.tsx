'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Example from '@/components/ui/demo';
import WorkspaceForm from '@/components/ui/form-layout';
import { DayNightSwitch } from '@/components/ui/widgets/day-night-switch';
import { Button } from '@/components/ui/button';

export default function BookAppointmentPage() {
  const [activeTab, setActiveTab] = useState<'demo' | 'workspace'>('demo');

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="size-8 rounded-md bg-muted border border-border flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
              <ArrowLeft className="size-4 text-foreground" />
            </span>
            <span>Back to Portfolio</span>
          </Link>

          {/* Form Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-border bg-muted p-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('demo')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'demo'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                demo.tsx (Form Layout)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('workspace')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'workspace'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                form-layout.tsx (Workspace Form)
              </button>
            </div>

            <DayNightSwitch />
          </div>
        </div>
      </header>

      {/* Main Content: Render the exact components */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'demo' ? <Example /> : <WorkspaceForm />}
      </main>
    </div>
  );
}
