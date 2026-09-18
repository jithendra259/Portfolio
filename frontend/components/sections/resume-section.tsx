'use client';

import React from 'react';
import { ResumePrinter } from '@/components/ui/widgets/resume-printer';

export function ResumeSection() {
  return (
    <section
      className="pt-4 pb-8 sm:pb-10 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto flex flex-col items-center justify-center"
      id="resume"
    >
      {/* Simple Section Title */}
      <div className="flex flex-col items-center text-center mb-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Resume
        </h2>
      </div>

      {/* Centered Printer in the middle of the page */}
      <div className="flex items-start justify-center w-full min-h-[140px] pt-1">
        <ResumePrinter />
      </div>
    </section>
  );
}

export default ResumeSection;
