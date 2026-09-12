"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { PdfViewerDialog } from "@/components/ui/pdf-viewer-dialog";

export function ProjectPdfButton({
  url,
  title,
  subtitle,
}: {
  url?: string;
  title: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);

  const isValidUrl = Boolean(url && (url.startsWith('/') || url.startsWith('http')));
  if (!isValidUrl || !url) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all cursor-pointer"
        title="View Research Manuscript in PDF Viewer"
      >
        <BookOpen className="size-3.5" />
        <span>Read Paper</span>
      </button>

      <PdfViewerDialog
        open={open}
        onOpenChange={setOpen}
        url={url}
        title={title}
        subtitle={subtitle}
      />
    </>
  );
}
