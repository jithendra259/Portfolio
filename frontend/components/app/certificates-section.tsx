'use client';

import React from 'react';
import InfinitePerspectiveSlider from '@/components/ui/infinite-perspective-slider';
import { CERTIFICATES_DATA } from '@/lib/certificates-data';

export function CertificatesSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" id="certificates">

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
