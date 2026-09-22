'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { PdfViewerDialog } from '@/components/ui/pdf-viewer-dialog';

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
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 font-mono text-xs font-medium text-amber-700 transition-all hover:bg-amber-500/20 dark:text-amber-300"
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
