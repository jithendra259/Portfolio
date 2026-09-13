'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Grid,
  LayoutList,
} from 'lucide-react';
import InfinitePerspectiveSlider from '@/components/ui/widgets/infinite-perspective-slider';
import { CERTIFICATES_DATA } from '@/lib/certificates-data';
import { motion, AnimatePresence } from 'framer-motion';

export function CertificatesSection() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [mobileViewMode, setMobileViewMode] = useState<'carousel' | 'grid'>('carousel');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Detect which slide is centered when user scrolls on mobile
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.85;
    if (itemWidth <= 0) return;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveMobileIndex(Math.min(Math.max(index, 0), CERTIFICATES_DATA.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const child = container.children[index] as HTMLElement;
    if (child) {
      child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveMobileIndex(index);
    }
  };

  const handleNext = () => {
    const nextIdx = Math.min(activeMobileIndex + 1, CERTIFICATES_DATA.length - 1);
    scrollToSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(activeMobileIndex - 1, 0);
    scrollToSlide(prevIdx);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCertIndex === null) return;
      if (e.key === 'Escape') setSelectedCertIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedCertIndex((prev) =>
          prev !== null ? Math.min(prev + 1, CERTIFICATES_DATA.length - 1) : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setSelectedCertIndex((prev) => (prev !== null ? Math.max(prev - 1, 0) : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCertIndex]);

  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden" id="certificates">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mb-4 pb-4 border-b border-slate-200 dark:border-[#3c3c3c] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-700 dark:text-neutral-400 mb-2 font-bold">
            <Award className="size-3.5 text-cyan-500" />
            <span>Accreditations &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certificates
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Mobile view switcher (Swipe vs Grid) */}
          <div className="flex md:hidden items-center bg-slate-100 dark:bg-[#1e1e1e] border border-slate-300 dark:border-[#3c3c3c] rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setMobileViewMode('carousel')}
              className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 transition-all ${
                mobileViewMode === 'carousel'
                  ? 'bg-white dark:bg-[#2a2a2a] text-cyan-500 shadow-sm font-bold'
                  : 'text-muted-foreground'
              }`}
            >
              <LayoutList className="size-3.5" />
              <span>Swipe</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileViewMode('grid')}
              className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 transition-all ${
                mobileViewMode === 'grid'
                  ? 'bg-white dark:bg-[#2a2a2a] text-cyan-500 shadow-sm font-bold'
                  : 'text-muted-foreground'
              }`}
            >
              <Grid className="size-3.5" />
              <span>Grid</span>
            </button>
          </div>

          <span className="text-xs font-mono text-slate-900 dark:text-white px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1e1e1e] border border-slate-300 dark:border-[#3c3c3c] font-bold">
            11 Accreditations
          </span>
        </div>
      </div>

      {/* Desktop & Tablet: Infinite Perspective 3D Slider */}
      <div className="hidden md:block w-full relative">
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

      {/* Mobile: Native Touch-Optimized Viewer */}
      <div className="block md:hidden w-full relative">
        {mobileViewMode === 'carousel' ? (
          <div className="w-full">
            {/* Horizontal Snap Scroll Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 py-4 scrollbar-none touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {CERTIFICATES_DATA.map((cert, idx) => (
                <div
                  key={idx}
                  className="w-[84vw] max-w-[340px] flex-shrink-0 snap-center rounded-2xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/40 overflow-hidden flex flex-col group transition-all"
                >
                  {/* Certificate Preview with Unclipped Aspect Ratio */}
                  <div
                    onClick={() => setSelectedCertIndex(idx)}
                    className="relative aspect-[1.38/1] w-full bg-slate-950/95 overflow-hidden cursor-pointer flex items-center justify-center p-2.5 border-b border-slate-100 dark:border-white/5"
                  >
                    <img
                      src={cert.src}
                      alt={cert.title}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 shadow-md">
                      <Maximize2 className="size-2.5 text-cyan-400" />
                      <span>Tap to zoom</span>
                    </div>
                  </div>

                  {/* Card Metadata */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                          {cert.number} / 11
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                        {cert.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCertIndex(idx)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-500 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Maximize2 className="size-3.5 text-cyan-500" />
                      <span>Inspect Credential</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Controls & Indicator */}
            <div className="flex items-center justify-between px-6 mt-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeMobileIndex === 0}
                className="size-9 rounded-full bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:pointer-events-none active:scale-90 transition-all shadow-sm"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {CERTIFICATES_DATA.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => scrollToSlide(dotIdx)}
                    className={`transition-all rounded-full ${
                      activeMobileIndex === dotIdx
                        ? 'w-6 h-2 bg-cyan-500'
                        : 'w-2 h-2 bg-slate-300 dark:bg-neutral-700'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeMobileIndex === CERTIFICATES_DATA.length - 1}
                className="size-9 rounded-full bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:pointer-events-none active:scale-90 transition-all shadow-sm"
                aria-label="Next certificate"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Mobile Grid View */
          <div className="grid grid-cols-1 gap-3 px-5 py-2">
            {CERTIFICATES_DATA.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCertIndex(idx)}
                className="rounded-xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 p-3 flex gap-3 items-center shadow-md cursor-pointer active:scale-[0.98] transition-all"
              >
                <div className="relative w-24 h-18 aspect-[4/3] rounded-lg bg-slate-950 overflow-hidden flex-shrink-0 flex items-center justify-center p-1 border border-slate-200/20 dark:border-white/5">
                  <img
                    src={cert.src}
                    alt={cert.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-500">
                      {cert.number} / 11
                    </span>
                    <span className="text-[10px] text-muted-foreground">Tap to view</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Modal Header */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between w-full max-w-4xl mx-auto pb-3 border-b border-white/10"
            >
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                    {CERTIFICATES_DATA[selectedCertIndex].number} / 11
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white truncate mt-1">
                  {CERTIFICATES_DATA[selectedCertIndex].title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Image View */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            >
              <motion.img
                key={selectedCertIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={CERTIFICATES_DATA[selectedCertIndex].src}
                alt={CERTIFICATES_DATA[selectedCertIndex].title}
                className="max-h-[68vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10 bg-black/40"
              />
            </div>

            {/* Modal Navigation Footer */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between w-full max-w-4xl mx-auto pt-3 border-t border-white/10"
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedCertIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : CERTIFICATES_DATA.length - 1
                  )
                }
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                <ChevronLeft className="size-4" />
                <span>Prev</span>
              </button>

              <p className="text-xs text-neutral-400 text-center max-w-md line-clamp-1 px-2">
                {CERTIFICATES_DATA[selectedCertIndex].desc}
              </p>

              <button
                type="button"
                onClick={() =>
                  setSelectedCertIndex((prev) =>
                    prev !== null && prev < CERTIFICATES_DATA.length - 1 ? prev + 1 : 0
                  )
                }
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CertificatesSection;
