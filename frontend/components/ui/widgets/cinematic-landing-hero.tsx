"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";

if (typeof window !== "undefined") {
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
  mode = "opening",
  onComplete,
  brandName = "JITHENDRA",
  tagline1 = "JITHENDRA",
  tagline2 = "SUBRAMANYAM",
  welcomeTitle1 = "Welcome to",
  welcomeTitle2 = "Portfolio",
  cardHeading = "Autonomous Agentic Intelligence",
  cardDescription = <>Engineered with modular multi-agent architectures, CVXPY portfolio optimization, and real-time voice pipelines.</>,
  metricValue = 100,
  metricLabel = "% Autonomous Swarm",
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
  const handleSkip = () => {
    if (entranceTimelineRef.current) {
      entranceTimelineRef.current.kill();
    }
    if (scrollTriggerInstanceRef.current) {
      scrollTriggerInstanceRef.current.kill();
    }
    if (scrollerRef.current) {
      gsap.to(scrollerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete?.();
        },
      });
    } else {
      onComplete?.();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Scroll-Driven GSAP ScrollTrigger Sequence with Entrance Reveal
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Initial states
      // Welcome Layer (visible at start, ready for clean dramatic text reveal)
      gsap.set(".welcome-layer", { autoAlpha: 1 });
      gsap.set(".welcome-text-1", { autoAlpha: 0, y: 55, scale: 0.88, filter: "blur(25px)", rotationX: -20 });
      gsap.set(".welcome-text-2", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });

      // Alex Kane Editorial Layer (hidden initially, revealed after welcome)
      gsap.set(".alex-accent", { autoAlpha: 0, y: -20, scale: 0.8 });
      gsap.set(".alex-top-title", { autoAlpha: 0, y: -45, filter: "blur(25px)", scale: 0.95 });
      gsap.set(".alex-bottom-title", { autoAlpha: 0, y: 45, filter: "blur(25px)", scale: 0.95 });
      gsap.set(".alex-oval-portrait", { autoAlpha: 0, scale: 0.65, filter: "blur(15px)" });
      gsap.set([".alex-subtext", ".alex-scroll-chevron"], { autoAlpha: 0, y: 20 });

      // 3D Card and Mockup (hidden below viewport)
      gsap.set(".main-card", { y: window.innerHeight + 300, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });

      // 2. Entrance Timeline: Plays automatically when website opens
      const entranceTl = gsap.timeline({ delay: 0.2 });
      entranceTimelineRef.current = entranceTl;

      entranceTl
        // Text Reveal Part 1: "Welcome to" with 3D unblur
        .to(".welcome-text-1", {
          duration: 1.3,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          ease: "expo.out"
        })
        // Text Reveal Part 2: "Portfolio" with horizontal clip wipe
        .to(".welcome-text-2", {
          duration: 1.1,
          clipPath: "inset(0 0% 0 0)",
          ease: "power4.inOut"
        }, "-=0.7")
        // Let visitor absorb the welcome message
        .to({}, { duration: 1.1 })
        // Smoothly dissolve welcome layer
        .to(".welcome-layer", {
          duration: 0.75,
          autoAlpha: 0,
          scale: 1.05,
          filter: "blur(16px)",
          ease: "power2.inOut"
        })
        // Reveal Editorial Name ("JITHENDRA SUBRAMANYAM") and Avatar
        .to(".alex-top-title", {
          duration: 1.2,
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          ease: "expo.out"
        }, "-=0.4")
        .to(".alex-bottom-title", {
          duration: 1.2,
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          ease: "expo.out"
        }, "-=0.9")
        .to(".alex-oval-portrait", {
          duration: 1.2,
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "back.out(1.25)"
        }, "-=1.0")
        .to([".alex-accent", ".alex-subtext", ".alex-scroll-chevron"], {
          duration: 0.8,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.6");

      // 3. The ScrollTrigger Master Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          scroller: scrollerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onLeave: () => {
            handleSkip();
          },
        },
      });

      scrollTriggerInstanceRef.current = scrollTl.scrollTrigger || null;

      // =========================================================================
      // PHASE 1: Dismiss Welcome (if still showing) + Text & Photo Split Out
      // =========================================================================
      scrollTl
        // Ensure welcome layer vanishes on scroll
        .to(".welcome-layer", {
          autoAlpha: 0,
          scale: 1.1,
          filter: "blur(20px)",
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        // Ensure editorial elements are visible if user scrolled during entrance
        .to([".alex-top-title", ".alex-bottom-title", ".alex-oval-portrait"], {
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.1
        }, 0)
        // Top text "JITHENDRA" slides out horizontally to the left
        .to(".alex-top-title", {
          x: "-85vw",
          autoAlpha: 0,
          scale: 1.1,
          filter: "blur(20px)",
          ease: "power2.inOut",
          duration: 2,
        }, 0)
        // Bottom text "SUBRAMANYAM" slides out horizontally to the right
        .to(".alex-bottom-title", {
          x: "85vw",
          autoAlpha: 0,
          scale: 1.1,
          filter: "blur(20px)",
          ease: "power2.inOut",
          duration: 2,
        }, 0)
        // Script accent & subtitle fade out
        .to([".alex-accent", ".alex-subtext", ".alex-scroll-chevron"], {
          autoAlpha: 0,
          scale: 0.8,
          ease: "power2.out",
          duration: 1,
        }, 0)
        // Centered oval portrait of Jithendra zooms through the camera (fly-through portal)
        .to(".alex-oval-portrait", {
          scale: 3.2,
          autoAlpha: 0,
          filter: "blur(25px)",
          ease: "power2.in",
          duration: 2.2,
        }, 0)

        // =========================================================================
        // PHASE 2: 3D Physical Card Rises & Expands
        // =========================================================================
        .to(".main-card", {
          y: 0,
          ease: "power3.inOut",
          duration: 2.2,
        }, 1.2)
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1.5,
        })
        // 3D iPhone mockup pops up in 3D perspective
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 45, rotationY: -30, autoAlpha: 0, scale: 0.65 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8"
        )
        .fromTo(".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 },
          "-=1.5"
        )
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 },
          "-=2.0"
        )
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")

        // Savor the 3D card
        .to({}, { duration: 2.0 })

        // =========================================================================
        // PHASE 3: 3D Card Pullback and Exit
        // =========================================================================
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", { 
          width: isMobile ? "92vw" : "85vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback")
        .to(".main-card", {
          y: -window.innerHeight - 300,
          ease: "power3.in",
          duration: 1.5,
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });

    }, scrollerRef);

    return () => ctx.revert();
  }, [metricValue, onComplete]);

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden bg-black select-none scroll-smooth",
        className
      )}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* The Scroll Track providing 3600px of scrollable room */}
      <div ref={trackRef} className="relative w-full h-[3600px] pointer-events-none">

        {/* Pinned Viewport Container (sticky across the entire 3600px scroll) */}
        <div
          ref={containerRef}
          className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black text-white font-sans antialiased pointer-events-auto"
          style={{ perspective: "1500px" }}
        >
          <div className="film-grain" aria-hidden="true" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-[60] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105"
      >
        <span>Skip [ESC]</span>
        <X className="size-3.5" />
      </button>

      {/* ========================================================================= */}
      {/* 0. WELCOME TO PORTFOLIO (Clean Dramatic Text Reveal Entrance)             */}
      {/* ========================================================================= */}
      <div className="welcome-layer absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-30 select-none pointer-events-none">
        <h1 className="flex flex-col items-center tracking-tight font-extrabold max-w-5xl">
          <span className="welcome-text-1 text-hero-matte text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 sm:mb-4 inline-block transform-style-3d will-change-transform font-black">
            {welcomeTitle1}
          </span>
          <span className="welcome-text-2 text-hero-matte text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black inline-block tracking-tighter will-change-transform bg-gradient-to-r from-white via-neutral-200 to-[#ccff00] bg-clip-text text-transparent">
            {welcomeTitle2}
          </span>
        </h1>
      </div>

      {/* ========================================================================= */}
      {/* 1. ALEX KANE REFERENCE EDITORIAL HERO (Jithendra + Proportional Layout)     */}
      {/* ========================================================================= */}
      <div className="alex-editorial-layer absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 sm:px-8">
        
        {/* Script Accent Floating Above */}
        <span className="alex-accent absolute top-[13vh] sm:top-[15vh] font-serif italic text-2xl sm:text-4xl md:text-5xl text-white/90 z-20 select-none">
          A
        </span>

        {/* Top Giant Neon Title: JITHENDRA (Balanced & fitted) */}
        <h1 className="alex-top-title editorial-neon-text font-black text-[13vw] sm:text-[12vw] md:text-[10.5vw] lg:text-[9.5vw] tracking-[0.02em] text-center uppercase will-change-transform z-10">
          JITHENDRA
        </h1>

        {/* Centered Vertical Oval Cutout with Jithendra's Photo (Slender & proportional) */}
        <div className="alex-oval-portrait absolute z-20 flex items-center justify-center will-change-transform">
          <div className="relative w-[120px] sm:w-[145px] md:w-[170px] lg:w-[190px] h-[165px] sm:h-[200px] md:h-[240px] lg:h-[270px] rounded-[60px] sm:rounded-[75px] md:rounded-[90px] lg:rounded-[100px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.98)] border-2 border-black bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/jithendra.jpeg"
              alt="Kandula Jithendra Subramanyam"
              className="w-full h-full object-cover object-top filter contrast-[1.06] brightness-[0.98]"
            />
            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>

        {/* Bottom Giant Neon Title: SUBRAMANYAM (Balanced & fitted) */}
        <h1 className="alex-bottom-title editorial-neon-text font-black text-[10.5vw] sm:text-[9.5vw] md:text-[8.5vw] lg:text-[7.6vw] tracking-[0.02em] text-center uppercase will-change-transform z-10 -mt-1 sm:-mt-2 md:-mt-3">
          SUBRAMANYAM
        </h1>

        {/* Editorial Subtitle running horizontally across lower section */}
        <div className="alex-subtext absolute bottom-[10vh] sm:bottom-[12vh] z-30 flex items-center justify-center text-center px-6">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal tracking-wide text-white/80 font-sans drop-shadow-md">
            Designing human experiences in code.
          </p>
        </div>

        {/* Scroll Chevron Indicator */}
        <div className="alex-scroll-chevron absolute bottom-4 sm:bottom-6 z-30 flex flex-col items-center gap-1 text-white/60 animate-bounce">
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown className="size-4" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. 3D PHYSICAL DEPTH CARD & IPHONE MOCKUP                                  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile, Grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            {/* 1. BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[5rem] lg:text-[7rem] font-black uppercase tracking-tighter text-white lg:mt-0 drop-shadow-2xl">
                {brandName}
              </h2>
            </div>

            {/* 2. IPHONE MOCKUP */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                
                {/* iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Screen Content */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                    </div>

                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Status</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Agent Swarm</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/10 text-cyan-300 flex items-center justify-center font-bold text-sm border border-cyan-400/20 shadow-lg shadow-black/50 font-mono">JS</div>
                      </div>

                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#00ffc6" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-cyan-200/60 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/5 flex items-center justify-center mr-3 border border-cyan-400/20 shadow-inner text-cyan-400 font-mono text-xs font-bold">
                            AI
                          </div>
                          <div className="flex-1">
                            <div className="text-[11px] font-mono text-neutral-200 font-bold mb-1">CVXPY Portfolio Optimizer</div>
                            <div className="h-1.5 w-24 bg-cyan-500/60 rounded-full shadow-inner" />
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center mr-3 border border-emerald-400/20 shadow-inner text-emerald-400 font-mono text-xs font-bold">
                            RTC
                          </div>
                          <div className="flex-1">
                            <div className="text-[11px] font-mono text-neutral-200 font-bold mb-1">LiveKit WebRTC Voice Pipeline</div>
                            <div className="h-1.5 w-20 bg-emerald-500/60 rounded-full shadow-inner" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-cyan-500/20 to-blue-900/10 flex items-center justify-center border border-cyan-400/30 shadow-inner">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">⚡</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Multi-Agent Swarm</p>
                    <p className="text-cyan-200/60 text-[10px] lg:text-xs font-medium">Active & Verified</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30 shadow-inner">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">📊</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Risk Analytics</p>
                    <p className="text-emerald-200/60 text-[10px] lg:text-xs font-medium">CVXPY Optimized</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. ACCOUNTABILITY TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
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
