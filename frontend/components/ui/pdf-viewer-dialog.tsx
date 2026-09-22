'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PdfViewer = dynamic(() => import('@/components/ui/pdf-viewer').then((m) => m.Component), {
  ssr: false,
  loading: () => (
    <div className="text-muted-foreground flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-3">
      <Loader2 className="text-primary size-6 animate-spin" />
      <span className="font-mono text-xs">Initializing PDF Engine...</span>
    </div>
  ),
});

interface PdfViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string | null;
  title?: string;
  subtitle?: string;
}

export function PdfViewerDialog({
  open,
  onOpenChange,
  url,
  title = 'Document Viewer',
  subtitle,
}: PdfViewerDialogProps) {
  if (!url) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border flex h-[90vh] w-[95vw] max-w-6xl flex-col gap-0 overflow-hidden p-0 shadow-2xl">
        {/* Header Bar */}
        <DialogHeader className="border-border bg-card/80 flex shrink-0 flex-row items-center justify-between space-y-0 border-b px-5 py-3 backdrop-blur-sm">
          <div className="flex min-w-0 flex-col pr-8">
            <DialogTitle className="text-foreground truncate font-sans text-sm font-semibold">
              {title}
            </DialogTitle>
            {subtitle && (
              <span className="text-muted-foreground truncate font-mono text-[11px]">
                {subtitle}
              </span>
            )}
          </div>
        </DialogHeader>

        {/* PDF Viewer Body */}
        <div
          className="relative min-h-0 w-full flex-1 overflow-hidden select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <PdfViewer url={url} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
