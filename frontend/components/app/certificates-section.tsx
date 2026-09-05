'use client';

import React from 'react';
import { Award } from 'lucide-react';
import InfinitePerspectiveSlider from '@/components/ui/infinite-perspective-slider';
import { CERTIFICATES_DATA } from '@/lib/certificates-data';

export function CertificatesSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" id="certificates">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mb-8 pb-6 border-b border-slate-200 dark:border-[#3c3c3c] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-700 dark:text-neutral-400 mb-2 font-bold">
            <Award className="size-3.5 text-cyan-500" />
            <span>Accreditations &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certificates
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-900 dark:text-white px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1e1e1e] border border-slate-300 dark:border-[#3c3c3c] font-bold self-start md:self-auto">
          11 Accreditations
        </span>
      </div>

      {/* Infinite Perspective Slider */}
      <div className="w-full relative">
        <InfinitePerspectiveSlider
          images={CERTIFICATES_DATA}
          cardWidth={340}
          cardGap={24}
          perspective={2200}
          scrollSpeed={1}
          scrollLerp={0.1}
          maxRotation={80}
        />
      </div>
    </section>
  );
}

export default CertificatesSection;
