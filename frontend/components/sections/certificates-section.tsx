'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid, LayoutList, Maximize2, X } from 'lucide-react';
import InfinitePerspectiveSlider from '@/components/ui/widgets/infinite-perspective-slider';
import { CERTIFICATES_DATA } from '@/lib/certificates-data';

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
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20" id="certificates">
      {/* Header */}
      <div className="mx-auto mb-4 flex max-w-7xl flex-col justify-between gap-4 border-b border-slate-200 px-6 pb-4 sm:px-12 md:flex-row md:items-end md:px-16 lg:px-20 dark:border-[#3c3c3c]">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Certificates
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Mobile view switcher (Swipe vs Grid) */}
          <div className="flex items-center rounded-lg border border-slate-300 bg-slate-100 p-0.5 md:hidden dark:border-[#3c3c3c] dark:bg-[#1e1e1e]">
            <button
              type="button"
              onClick={() => setMobileViewMode('carousel')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-all ${
                mobileViewMode === 'carousel'
                  ? 'bg-white font-bold text-cyan-500 shadow-sm dark:bg-[#2a2a2a]'
                  : 'text-muted-foreground'
              }`}
            >
              <LayoutList className="size-3.5" />
              <span>Swipe</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileViewMode('grid')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-all ${
                mobileViewMode === 'grid'
                  ? 'bg-white font-bold text-cyan-500 shadow-sm dark:bg-[#2a2a2a]'
                  : 'text-muted-foreground'
              }`}
            >
              <Grid className="size-3.5" />
              <span>Grid</span>
            </button>
          </div>

          <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-900 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-white">
            11 Accreditations
          </span>
        </div>
      </div>

      {/* Desktop & Tablet: Infinite Perspective 3D Slider */}
      <div className="relative hidden w-full md:block">
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
      <div className="relative block w-full md:hidden">
        {mobileViewMode === 'carousel' ? (
          <div className="w-full">
            {/* Horizontal Snap Scroll Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex touch-pan-x snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-5 py-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {CERTIFICATES_DATA.map((cert, idx) => (
                <div
                  key={idx}
                  className="group flex w-[84vw] max-w-[340px] flex-shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-black/5 transition-all dark:border-white/10 dark:bg-[#18181b] dark:shadow-black/40"
                >
                  {/* Certificate Preview with Unclipped Aspect Ratio */}
                  <div
                    onClick={() => setSelectedCertIndex(idx)}
                    className="relative flex aspect-[1.38/1] w-full cursor-pointer items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-950/95 p-2.5 dark:border-white/5"
                  >
                    <img
                      src={cert.src}
                      alt={cert.title}
                      className="h-full w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full border border-white/20 bg-black/75 px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-md backdrop-blur-md">
                      <Maximize2 className="size-2.5 text-cyan-400" />
                      <span>Tap to zoom</span>
                    </div>
                  </div>

                  {/* Card Metadata */}
                  <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                          {cert.number} / 11
                        </span>
                      </div>
                      <h3 className="line-clamp-1 text-base leading-snug font-bold text-slate-900 dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
                        {cert.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCertIndex(idx)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-cyan-500/10 hover:text-cyan-500 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                    >
                      <Maximize2 className="size-3.5 text-cyan-500" />
                      <span>Inspect Credential</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Controls & Indicator */}
            <div className="mt-2 flex items-center justify-between px-6">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeMobileIndex === 0}
                className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 shadow-sm transition-all active:scale-90 disabled:pointer-events-none disabled:opacity-30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200"
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
                    className={`rounded-full transition-all ${
                      activeMobileIndex === dotIdx
                        ? 'h-2 w-6 bg-cyan-500'
                        : 'h-2 w-2 bg-slate-300 dark:bg-neutral-700'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeMobileIndex === CERTIFICATES_DATA.length - 1}
                className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 shadow-sm transition-all active:scale-90 disabled:pointer-events-none disabled:opacity-30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200"
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
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-md transition-all active:scale-[0.98] dark:border-white/10 dark:bg-[#18181b]"
              >
                <div className="relative flex aspect-[4/3] h-18 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200/20 bg-slate-950 p-1 dark:border-white/5">
                  <img
                    src={cert.src}
                    alt={cert.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-cyan-500">
                      {cert.number} / 11
                    </span>
                    <span className="text-muted-foreground text-[10px]">Tap to view</span>
                  </div>
                  <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {cert.title}
                  </h4>
                  <p className="text-muted-foreground line-clamp-1 text-[11px]">{cert.desc}</p>
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
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 backdrop-blur-xl sm:p-6"
          >
            {/* Modal Header */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex w-full max-w-4xl items-center justify-between border-b border-white/10 pb-3"
            >
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <span className="rounded border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 font-mono text-xs font-bold text-cyan-400">
                    {CERTIFICATES_DATA[selectedCertIndex].number} / 11
                  </span>
                </div>
                <h3 className="mt-1 truncate text-base font-bold text-white sm:text-lg">
                  {CERTIFICATES_DATA[selectedCertIndex].title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertIndex(null)}
                className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Image View */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative my-4 flex flex-1 items-center justify-center overflow-hidden"
            >
              <motion.img
                key={selectedCertIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={CERTIFICATES_DATA[selectedCertIndex].src}
                alt={CERTIFICATES_DATA[selectedCertIndex].title}
                className="max-h-[68vh] w-auto max-w-full rounded-xl border border-white/10 bg-black/40 object-contain shadow-2xl sm:max-h-[78vh]"
              />
            </div>

            {/* Modal Navigation Footer */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex w-full max-w-4xl items-center justify-between border-t border-white/10 pt-3"
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedCertIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : CERTIFICATES_DATA.length - 1
                  )
                }
                className="flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="size-4" />
                <span>Prev</span>
              </button>

              <p className="line-clamp-1 max-w-md px-2 text-center text-xs text-neutral-400">
                {CERTIFICATES_DATA[selectedCertIndex].desc}
              </p>

              <button
                type="button"
                onClick={() =>
                  setSelectedCertIndex((prev) =>
                    prev !== null && prev < CERTIFICATES_DATA.length - 1 ? prev + 1 : 0
                  )
                }
                className="flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
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
