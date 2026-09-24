'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Film Grain Overlay */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  /* Electric Lime Editorial Typography */
  .editorial-neon-text {
      color: #ccff00;
      text-shadow: 
          0 0 30px rgba(204, 255, 0, 0.35),
          0 0 70px rgba(204, 255, 0, 0.15);
      line-height: 0.85;
  }

  /* Matte Silver Typography with clean drop shadow */
  .text-hero-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 25px rgba(255, 255, 255, 0.2)) 
          drop-shadow(0px 2px 5px rgba(255, 255, 255, 0.1));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: string;
  onComplete?: () => void;
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  welcomeTag?: string;
  welcomeTitle1?: string;
  welcomeTitle2?: string;
  welcomeSubtitle?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
}

export function CinematicHero({
  mode = 'opening',
  onComplete,
  brandName = 'JITHENDRA',
  tagline1 = 'JITHENDRA',
  tagline2 = 'SUBRAMANYAM',
  welcomeTitle1 = 'Welcome to',
  welcomeTitle2 = 'Portfolio',
  cardHeading = 'Autonomous Agentic Intelligence',
  cardDescription = (
    <>
      Engineered with modular multi-agent architectures, CVXPY portfolio optimization, and real-time
      voice pipelines.
    </>
  ),
  metricValue = 100,
  metricLabel = '% Autonomous Swarm',
  className,
  ...props
}: CinematicHeroProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);
  const entranceTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Instant skip button / Escape key
  const handleSkip = useCallback(() => {
    if (entranceTimelineRef.current) {
      entranceTimelineRef.current.kill();
      entranceTimelineRef.current = null;
    }
    if (scrollTriggerInstanceRef.current) {
      scrollTriggerInstanceRef.current.kill();
      scrollTriggerInstanceRef.current = null;
    }
    cancelAnimationFrame(requestRef.current);
    if (scrollerRef.current) {
      gsap.to(scrollerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          onComplete?.();
        },
      });
    } else {
      onComplete?.();
    }
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // 1. Mouse tilt interaction on the iPhone mockup
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (scrollerRef.current && scrollerRef.current.scrollTop > window.innerHeight * 3) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
          mainCardRef.current.style.setProperty('--mouse-y', `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: 'power3.out',
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Scroll-Driven GSAP ScrollTrigger Sequence with Entrance Reveal
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Initial states
      // Welcome Layer (visible at start, ready for clean dramatic text reveal)
      gsap.set('.welcome-layer', { autoAlpha: 1 });
      gsap.set('.welcome-text-1', {
        autoAlpha: 0,
        y: 55,
        scale: 0.88,
        filter: 'blur(25px)',
        rotationX: -20,
      });
      gsap.set('.welcome-text-2', { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' });

      // Alex Kane Editorial Layer (hidden initially, revealed after welcome)
      gsap.set('.alex-accent', { autoAlpha: 0, y: -20, scale: 0.8 });
      gsap.set('.alex-top-title', { autoAlpha: 0, y: -45, filter: 'blur(25px)', scale: 0.95 });
      gsap.set('.alex-bottom-title', { autoAlpha: 0, y: 45, filter: 'blur(25px)', scale: 0.95 });
      gsap.set('.alex-oval-portrait', { autoAlpha: 0, scale: 0.65, filter: 'blur(15px)' });
      gsap.set(['.alex-subtext', '.alex-scroll-chevron'], { autoAlpha: 0, y: 20 });

      // 3D Card and Mockup (hidden below viewport)
      gsap.set('.main-card', { y: window.innerHeight + 300, autoAlpha: 1 });
      gsap.set(
        [
          '.card-left-text',
          '.card-right-text',
          '.mockup-scroll-wrapper',
          '.floating-badge',
          '.phone-widget',
        ],
        { autoAlpha: 0 }
      );

      // 2. Entrance Timeline: Plays automatically when website opens
      const entranceTl = gsap.timeline({ delay: 0.2 });
      entranceTimelineRef.current = entranceTl;

      entranceTl
        // Text Reveal Part 1: "Welcome to" with 3D unblur
        .to('.welcome-text-1', {
          duration: 1.3,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          rotationX: 0,
          ease: 'expo.out',
        })
        // Text Reveal Part 2: "Portfolio" with horizontal clip wipe
        .to(
          '.welcome-text-2',
          {
            duration: 1.1,
            clipPath: 'inset(0 0% 0 0)',
            ease: 'power4.inOut',
          },
          '-=0.7'
        )
        // Let visitor absorb the welcome message
        .to({}, { duration: 1.1 })
        // Smoothly dissolve welcome layer
        .to('.welcome-layer', {
          duration: 0.75,
          autoAlpha: 0,
          scale: 1.05,
          filter: 'blur(16px)',
          ease: 'power2.inOut',
        })
        // Reveal Editorial Name ("JITHENDRA SUBRAMANYAM") and Avatar
        .to(
          '.alex-top-title',
          {
            duration: 1.2,
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            ease: 'expo.out',
          },
          '-=0.4'
        )
        .to(
          '.alex-bottom-title',
          {
            duration: 1.2,
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            ease: 'expo.out',
          },
          '-=0.9'
        )
        .to(
          '.alex-oval-portrait',
          {
            duration: 1.2,
            autoAlpha: 1,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'back.out(1.25)',
          },
          '-=1.0'
        )
        .to(
          ['.alex-accent', '.alex-subtext', '.alex-scroll-chevron'],
          {
            duration: 0.8,
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.6'
        );

      // 3. The ScrollTrigger Master Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          scroller: scrollerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onLeave: () => {
            // Use a short timeout so scrub completes before we kill
            setTimeout(() => handleSkip(), 100);
          },
        },
      });

      scrollTriggerInstanceRef.current = scrollTl.scrollTrigger || null;

      // =========================================================================
      // PHASE 1: Dismiss Welcome (if still showing) + Text & Photo Split Out
      // =========================================================================
      scrollTl
        // Ensure welcome layer vanishes on scroll
        .to(
          '.welcome-layer',
          {
            autoAlpha: 0,
            scale: 1.1,
            filter: 'blur(20px)',
            duration: 0.4,
            ease: 'power2.out',
          },
          0
        )
        // Ensure editorial elements are visible if user scrolled during entrance
        .to(
          ['.alex-top-title', '.alex-bottom-title', '.alex-oval-portrait'],
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.1,
          },
          0
        )
        // Top text "JITHENDRA" slides out horizontally to the left
        .to(
          '.alex-top-title',
          {
            x: '-85vw',
            autoAlpha: 0,
            scale: 1.1,
            filter: 'blur(20px)',
            ease: 'power2.inOut',
            duration: 2,
          },
          0
        )
        // Bottom text "SUBRAMANYAM" slides out horizontally to the right
        .to(
          '.alex-bottom-title',
          {
            x: '85vw',
            autoAlpha: 0,
            scale: 1.1,
            filter: 'blur(20px)',
            ease: 'power2.inOut',
            duration: 2,
          },
          0
        )
        // Script accent & subtitle fade out
        .to(
          ['.alex-accent', '.alex-subtext', '.alex-scroll-chevron'],
          {
            autoAlpha: 0,
            scale: 0.8,
            ease: 'power2.out',
            duration: 1,
          },
          0
        )
        // Centered oval portrait of Jithendra zooms through the camera (fly-through portal)
        .to(
          '.alex-oval-portrait',
          {
            scale: 3.2,
            autoAlpha: 0,
            filter: 'blur(25px)',
            ease: 'power2.in',
            duration: 2.2,
          },
          0
        )

        // =========================================================================
        // PHASE 2: 3D Physical Card Rises & Expands
        // =========================================================================
        .to(
          '.main-card',
          {
            y: 0,
            ease: 'power3.inOut',
            duration: 2.2,
          },
          1.2
        )
        .to('.main-card', {
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          ease: 'power3.inOut',
          duration: 1.5,
        })
        // 3D iPhone mockup pops up in 3D perspective
        .fromTo(
          '.mockup-scroll-wrapper',
          { y: 300, z: -500, rotationX: 45, rotationY: -30, autoAlpha: 0, scale: 0.65 },
          {
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            autoAlpha: 1,
            scale: 1,
            ease: 'expo.out',
            duration: 2.5,
          },
          '-=0.8'
        )
        .fromTo(
          '.phone-widget',
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: 'back.out(1.2)', duration: 1.5 },
          '-=1.5'
        )
        .to('.progress-ring', { strokeDashoffset: 60, duration: 2, ease: 'power3.inOut' }, '-=1.2')
        .to(
          '.counter-val',
          { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: 'expo.out' },
          '-=2.0'
        )
        .fromTo(
          '.floating-badge',
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotationZ: 0,
            ease: 'back.out(1.5)',
            duration: 1.5,
            stagger: 0.2,
          },
          '-=2.0'
        )
        .fromTo(
          '.card-left-text',
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: 'power4.out', duration: 1.5 },
          '-=1.5'
        )
        .fromTo(
          '.card-right-text',
          { x: 50, autoAlpha: 0, scale: 0.8 },
          { x: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 1.5 },
          '<'
        )

        // Savor the 3D card
        .to({}, { duration: 2.0 })

        // =========================================================================
        // PHASE 3: 3D Card Pullback and Exit
        // =========================================================================
        .to(['.mockup-scroll-wrapper', '.floating-badge', '.card-left-text', '.card-right-text'], {
          scale: 0.9,
          y: -40,
          z: -200,
          autoAlpha: 0,
          ease: 'power3.in',
          duration: 1.2,
          stagger: 0.05,
        })
        .to(
          '.main-card',
          {
            width: isMobile ? '92vw' : '85vw',
            height: isMobile ? '92vh' : '85vh',
            borderRadius: isMobile ? '32px' : '40px',
            ease: 'expo.inOut',
            duration: 1.8,
          },
          'pullback'
        )
        .to('.main-card', {
          y: -window.innerHeight - 300,
          ease: 'power3.in',
          duration: 1.5,
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        });
    }, scrollerRef);

    return () => ctx.revert();
  }, [metricValue, handleSkip]);

  return (
    <div
      ref={scrollerRef}
      className={cn(
        'fixed inset-0 z-[200] overflow-x-hidden overflow-y-auto scroll-smooth bg-black select-none',
        className
      )}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* The Scroll Track providing 3600px of scrollable room */}
      <div ref={trackRef} className="pointer-events-none relative h-[3600px] w-full">
        {/* Pinned Viewport Container (sticky across the entire 3600px scroll) */}
        <div
          ref={containerRef}
          className="pointer-events-auto sticky top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black font-sans text-white antialiased"
          style={{ perspective: '1500px' }}
        >
          <div className="film-grain" aria-hidden="true" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="fixed top-6 right-6 z-[60] flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs tracking-wider text-white/80 uppercase shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 hover:text-white"
          >
            <span>Skip [ESC]</span>
            <X className="size-3.5" />
          </button>

          {/* ========================================================================= */}
          {/* 0. WELCOME TO PORTFOLIO (Clean Dramatic Text Reveal Entrance)             */}
          {/* ========================================================================= */}
          <div className="welcome-layer pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center select-none">
            <h1 className="flex max-w-5xl flex-col items-center font-extrabold tracking-tight">
              <span className="welcome-text-1 text-hero-matte transform-style-3d mb-2 inline-block text-4xl font-black will-change-transform sm:mb-4 sm:text-6xl md:text-7xl lg:text-8xl">
                {welcomeTitle1}
              </span>
              <span className="welcome-text-2 text-hero-matte inline-block bg-gradient-to-r from-white via-neutral-200 to-[#ccff00] bg-clip-text text-5xl font-black tracking-tighter text-transparent will-change-transform sm:text-7xl md:text-8xl lg:text-9xl">
                {welcomeTitle2}
              </span>
            </h1>
          </div>

          {/* ========================================================================= */}
          {/* 1. ALEX KANE REFERENCE EDITORIAL HERO (Jithendra + Proportional Layout)     */}
          {/* ========================================================================= */}
          <div className="alex-editorial-layer pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8">
            {/* Script Accent Floating Above */}
            <span className="alex-accent absolute top-[13vh] z-20 font-serif text-2xl text-white/90 italic select-none sm:top-[15vh] sm:text-4xl md:text-5xl">
              A
            </span>

            {/* Top Giant Neon Title: JITHENDRA (Balanced & fitted) */}
            <h1 className="alex-top-title editorial-neon-text z-10 text-center text-[13vw] font-black tracking-[0.02em] uppercase will-change-transform sm:text-[12vw] md:text-[10.5vw] lg:text-[9.5vw]">
              JITHENDRA
            </h1>

            {/* Centered Vertical Oval Cutout with Jithendra's Photo (Slender & proportional) */}
            <div className="alex-oval-portrait absolute z-20 flex items-center justify-center will-change-transform">
              <div className="relative h-[165px] w-[120px] overflow-hidden rounded-[60px] border-2 border-black bg-black shadow-[0_25px_60px_rgba(0,0,0,0.98)] sm:h-[200px] sm:w-[145px] sm:rounded-[75px] md:h-[240px] md:w-[170px] md:rounded-[90px] lg:h-[270px] lg:w-[190px] lg:rounded-[100px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/jithendra.jpeg"
                  alt="Kandula Jithendra Subramanyam"
                  className="h-full w-full object-cover object-top brightness-[0.98] contrast-[1.06] filter"
                />
                {/* Subtle atmospheric vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </div>
            </div>

            {/* Bottom Giant Neon Title: SUBRAMANYAM (Balanced & fitted) */}
            <h1 className="alex-bottom-title editorial-neon-text z-10 -mt-1 text-center text-[10.5vw] font-black tracking-[0.02em] uppercase will-change-transform sm:-mt-2 sm:text-[9.5vw] md:-mt-3 md:text-[8.5vw] lg:text-[7.6vw]">
              SUBRAMANYAM
            </h1>

            {/* Editorial Subtitle running horizontally across lower section */}
            <div className="alex-subtext absolute bottom-[10vh] z-30 flex items-center justify-center px-6 text-center sm:bottom-[12vh]">
              <p className="font-sans text-xs font-normal tracking-wide text-white/80 drop-shadow-md sm:text-sm md:text-base lg:text-lg">
                Designing human experiences in code.
              </p>
            </div>

            {/* Scroll Chevron Indicator */}
            <div className="alex-scroll-chevron absolute bottom-4 z-30 flex animate-bounce flex-col items-center gap-1 text-white/60 sm:bottom-6">
              <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
              <ChevronDown className="size-4" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. 3D PHYSICAL DEPTH CARD & IPHONE MOCKUP                                  */}
          {/* ========================================================================= */}
          <div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            style={{ perspective: '1500px' }}
          >
            <div
              ref={mainCardRef}
              className="main-card premium-depth-card gsap-reveal pointer-events-auto relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] md:h-[85vh] md:w-[85vw] md:rounded-[40px]"
            >
              <div className="card-sheen" aria-hidden="true" />

              {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile, Grid on desktop */}
              <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-0">
                {/* 1. BRAND NAME */}
                <div className="card-right-text gsap-reveal z-20 order-1 flex w-full justify-center lg:order-3 lg:justify-end">
                  <h2 className="text-6xl font-black tracking-tighter text-white uppercase drop-shadow-2xl md:text-[5rem] lg:mt-0 lg:text-[7rem]">
                    {brandName}
                  </h2>
                </div>

                {/* 2. IPHONE MOCKUP */}
                <div
                  className="mockup-scroll-wrapper relative z-10 order-2 flex h-[380px] w-full items-center justify-center lg:order-2 lg:h-[600px]"
                  style={{ perspective: '1000px' }}
                >
                  <div className="relative flex h-full w-full scale-[0.65] transform items-center justify-center md:scale-85 lg:scale-100">
                    {/* iPhone Bezel */}
                    <div
                      ref={mockupRef}
                      className="iphone-bezel transform-style-3d relative flex h-[580px] w-[280px] flex-col rounded-[3rem] will-change-transform"
                    >
                      <div
                        className="hardware-btn absolute top-[120px] -left-[3px] z-0 h-[25px] w-[3px] rounded-l-md"
                        aria-hidden="true"
                      />
                      <div
                        className="hardware-btn absolute top-[160px] -left-[3px] z-0 h-[45px] w-[3px] rounded-l-md"
                        aria-hidden="true"
                      />
                      <div
                        className="hardware-btn absolute top-[220px] -left-[3px] z-0 h-[45px] w-[3px] rounded-l-md"
                        aria-hidden="true"
                      />
                      <div
                        className="hardware-btn absolute top-[170px] -right-[3px] z-0 h-[70px] w-[3px] scale-x-[-1] rounded-r-md"
                        aria-hidden="true"
                      />

                      {/* Screen Content */}
                      <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#050914] text-white shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                        <div
                          className="screen-glare pointer-events-none absolute inset-0 z-40"
                          aria-hidden="true"
                        />

                        {/* Dynamic Island */}
                        <div className="absolute top-[5px] left-1/2 z-50 flex h-[28px] w-[100px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        </div>

                        <div className="relative flex h-full w-full flex-col px-5 pt-12 pb-8">
                          <div className="phone-widget mb-8 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="mb-1 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                                Status
                              </span>
                              <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                                Agent Swarm
                              </span>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/20 bg-white/10 font-mono text-sm font-bold text-cyan-300 shadow-lg shadow-black/50">
                              JS
                            </div>
                          </div>

                          <div className="phone-widget relative mx-auto mb-8 flex h-44 w-44 items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                              <circle
                                cx="88"
                                cy="88"
                                r="64"
                                fill="none"
                                stroke="rgba(255,255,255,0.03)"
                                strokeWidth="12"
                              />
                              <circle
                                className="progress-ring"
                                cx="88"
                                cy="88"
                                r="64"
                                fill="none"
                                stroke="#00ffc6"
                                strokeWidth="12"
                              />
                            </svg>
                            <div className="z-10 flex flex-col items-center text-center">
                              <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">
                                0
                              </span>
                              <span className="mt-0.5 text-[8px] font-bold tracking-[0.1em] text-cyan-200/60 uppercase">
                                {metricLabel}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
                              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/5 font-mono text-xs font-bold text-cyan-400 shadow-inner">
                                AI
                              </div>
                              <div className="flex-1">
                                <div className="mb-1 font-mono text-[11px] font-bold text-neutral-200">
                                  CVXPY Portfolio Optimizer
                                </div>
                                <div className="h-1.5 w-24 rounded-full bg-cyan-500/60 shadow-inner" />
                              </div>
                            </div>
                            <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
                              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 font-mono text-xs font-bold text-emerald-400 shadow-inner">
                                RTC
                              </div>
                              <div className="flex-1">
                                <div className="mb-1 font-mono text-[11px] font-bold text-neutral-200">
                                  LiveKit WebRTC Voice Pipeline
                                </div>
                                <div className="h-1.5 w-20 rounded-full bg-emerald-500/60 shadow-inner" />
                              </div>
                            </div>
                          </div>

                          <div className="absolute bottom-2 left-1/2 h-[4px] w-[120px] -translate-x-1/2 rounded-full bg-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Badges */}
                    <div className="floating-badge floating-ui-badge absolute top-6 left-[-15px] z-30 flex items-center gap-3 rounded-xl p-3 lg:top-12 lg:left-[-80px] lg:gap-4 lg:rounded-2xl lg:p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-b from-cyan-500/20 to-blue-900/10 shadow-inner lg:h-10 lg:w-10">
                        <span className="text-base drop-shadow-lg lg:text-xl" aria-hidden="true">
                          ⚡
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-tight text-white lg:text-sm">
                          Multi-Agent Swarm
                        </p>
                        <p className="text-[10px] font-medium text-cyan-200/60 lg:text-xs">
                          Active & Verified
                        </p>
                      </div>
                    </div>

                    <div className="floating-badge floating-ui-badge absolute right-[-15px] bottom-12 z-30 flex items-center gap-3 rounded-xl p-3 lg:right-[-80px] lg:bottom-20 lg:gap-4 lg:rounded-2xl lg:p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/30 bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 shadow-inner lg:h-10 lg:w-10">
                        <span className="text-base drop-shadow-lg lg:text-lg" aria-hidden="true">
                          📊
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-tight text-white lg:text-sm">
                          Risk Analytics
                        </p>
                        <p className="text-[10px] font-medium text-emerald-200/60 lg:text-xs">
                          CVXPY Optimized
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. ACCOUNTABILITY TEXT */}
                <div className="card-left-text gsap-reveal z-20 order-3 flex w-full flex-col justify-center px-4 text-center lg:order-1 lg:max-w-none lg:px-0 lg:text-left">
                  <h3 className="mb-0 text-2xl font-bold tracking-tight text-white md:text-3xl lg:mb-5 lg:text-4xl">
                    {cardHeading}
                  </h3>
                  <p className="mx-auto hidden max-w-sm text-sm leading-relaxed font-normal text-blue-100/70 md:block md:text-base lg:mx-0 lg:max-w-none lg:text-lg">
                    {cardDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CinematicHero;
