'use client';

import React from 'react';
import { ResumePrinter } from '@/components/ui/widgets/resume-printer';

export function ResumeSection() {
  return (
    <section
      className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-4 pb-16 sm:px-12 sm:pb-20 md:px-16 lg:px-20"
      id="resume"
    >
      {/* Simple Section Title */}
      <div className="mb-3 flex flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Resume
        </h2>
      </div>

      {/* Centered Printer in the middle of the page */}
      <div className="flex min-h-[180px] w-full items-start justify-center pt-1 pb-10">
        <ResumePrinter />
      </div>
    </section>
  );
}

export default ResumeSection;
