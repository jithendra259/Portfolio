'use client';

import React from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { ResumePrinter } from '@/components/ui/widgets/resume-printer';

export function ResumeSection() {
  return (
    <section
      className="pt-6 pb-16 sm:pb-20 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto flex flex-col items-center justify-center"
      id="resume"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-3 border border-blue-500/20">
          <FileText className="size-3.5" />
          <span>Curriculum Vitae · Official Documents</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Resume
        </h2>
        <p className="text-sm text-slate-600 dark:text-neutral-400 mt-2 max-w-md">
          Download the comprehensive technical resume highlighting research publications, agentic systems architectures, and academic credentials.
        </p>
      </div>

      {/* Prominent Action Bar: Direct PDF Download & View */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <a
          href="/documents/resume/kandula_jithendra_subramanyam_resume.pdf"
          download="Kandula_Jithendra_Subramanyam_Resume.pdf"
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-xl shadow-black/10 dark:shadow-white/10 cursor-pointer"
        >
          <Download className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span>Download PDF Resume</span>
          <span className="text-[10px] font-mono opacity-70 px-1.5 py-0.5 rounded bg-white/20 dark:bg-black/10">
            364 KB
          </span>
        </a>

        <a
          href="/documents/resume/kandula_jithendra_subramanyam_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-neutral-900/60 hover:bg-white/90 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-sm hover:scale-105 cursor-pointer shadow-sm"
        >
          <ExternalLink className="size-4" />
          <span>View in New Tab</span>
        </a>
      </div>

      {/* Centered Printer with subtle hint */}
      <div className="flex flex-col items-center justify-center w-full min-h-[180px] pt-1 pb-10">
        <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5 opacity-80">
          <span>Interactive Micro-Summary</span>
          <span className="text-slate-400 dark:text-neutral-600">•</span>
          <span>Click printer to generate summary receipt 🖨</span>
        </div>
        <ResumePrinter />
      </div>
    </section>
  );
}

export default ResumeSection;
