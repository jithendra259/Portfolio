"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const PdfViewer = dynamic(
  () => import("@/components/ui/pdf-viewer").then((m) => m.Component),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-full w-full min-h-[400px] gap-3 text-muted-foreground">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-xs font-mono">Initializing PDF Engine...</span>
      </div>
    ),
  }
);

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
  title = "Document Viewer",
  subtitle,
}: PdfViewerDialogProps) {
  if (!url) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 flex flex-col gap-0 overflow-hidden bg-background border-border shadow-2xl">
        {/* Header Bar */}
        <DialogHeader className="px-5 py-3 border-b border-border flex flex-row items-center justify-between space-y-0 shrink-0 bg-card/80 backdrop-blur-sm">
          <div className="flex flex-col min-w-0 pr-8">
            <DialogTitle className="text-sm font-semibold truncate text-foreground font-sans">
              {title}
            </DialogTitle>
            {subtitle && (
              <span className="text-[11px] font-mono text-muted-foreground truncate">
                {subtitle}
              </span>
            )}
          </div>
        </DialogHeader>

        {/* PDF Viewer Body */}
        <div
          className="flex-1 min-h-0 w-full overflow-hidden relative select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <PdfViewer url={url} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
