'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AuroraText } from '@/components/ui/aurora-text';
import { WordRotate } from '@/components/ui/word-rotate';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { MagicCard } from '@/components/ui/magic-card';
import { Marquee } from '@/components/ui/marquee';
import { EmailRevealButton } from '@/components/ui/email-reveal-button';
import { SocialTooltipIcons } from '@/components/ui/social-tooltip-icons';
import { Navbar } from '@/components/app/navbar';
import { Footer } from '@/components/app/footer';
import { ResumePrinter } from '@/components/ui/resume-printer';
import { RobotCanvas } from '@/components/ui/robot-hero';
import { CareerEducationTimeline } from '@/components/app/career-education-timeline';
import { SkillsCardsStack } from '@/components/app/skills-cards-stack';
import { ContactSection } from '@/components/app/contact-section';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { DotPattern } from '@/components/ui/dot-pattern';
import { CinematicHero } from '@/components/ui/cinematic-landing-hero';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Mic,
  Cpu,
  Layers,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Zap,
  CheckCircle2,
  Sparkles,
  Bot,
  TrendingUp,
  Wind,
  FileText,
  Bell,
  Calendar,
} from 'lucide-react';

interface LandingPageProps {
  onStartCall?: () => void;
}


const techLogos = [
  { name: "LangChain / LangGraph", slug: "langchain" },
  { name: "Python", slug: "python" },
  { name: "CVXPY Optimization", slug: "python" },
  { name: "Next.js 15", slug: "nextdotjs" },
  { name: "React 19", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "FastAPI / Flask", slug: "fastapi" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "LiveKit WebRTC", slug: "webrtc" },
  { name: "OpenAI / Mistral", slug: "openai" },
  { name: "Docker", slug: "docker" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Git & GitHub", slug: "github" },
];

function BentoFilesBackground() {
  return (
    <div className="absolute top-4 right-4 flex gap-3 pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] opacity-85 group-hover:opacity-100 transition-opacity">
      <div className="w-44 rounded-xl bg-neutral-900/90 border border-white/10 p-3.5 text-left shadow-lg">
        <div className="flex items-center gap-1.5 text-neutral-300 font-mono text-[11px] mb-1.5 font-bold">
          <FileText className="size-3.5 text-neutral-400" />
          <span>seed.txt</span>
        </div>
        <p className="text-[10px] text-neutral-400 leading-relaxed font-mono line-clamp-4">
          A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds.
        </p>
      </div>
      <div className="w-44 rounded-xl bg-neutral-900/90 border border-white/10 p-3.5 text-left shadow-lg hidden sm:block">
        <div className="flex items-center gap-1.5 text-neutral-300 font-mono text-[11px] mb-1.5 font-bold">
          <FileText className="size-3.5 text-neutral-400" />
          <span>governance.py</span>
        </div>
        <p className="text-[10px] text-neutral-400 leading-relaxed font-mono line-clamp-4">
          Multi-agent LangGraph supervisor with CVXPY convex solvers, regime classification, and audit-ready verification pipelines.
        </p>
      </div>
    </div>
  );
}

function BentoNotificationsBackground() {
  return (
    <div className="absolute top-4 right-4 left-4 sm:left-auto sm:w-[320px] flex flex-col gap-2 pointer-events-none [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)] opacity-85 group-hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/90 border border-white/10 shadow-lg">
        <div className="size-7 rounded-full bg-blue-500 flex items-center justify-center shrink-0 text-white shadow-sm">
          <Zap className="size-3.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-neutral-200">Portfolio Rebalanced</span>
            <span className="text-[10px] text-neutral-500 font-mono">· 2m ago</span>
          </div>
          <span className="text-[10px] text-neutral-400 truncate">CVXPY solver converged in 42ms</span>
        </div>
      </div>
      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/90 border border-white/10 shadow-lg">
        <div className="size-7 rounded-full bg-pink-500 flex items-center justify-center shrink-0 text-white shadow-sm">
          <Bot className="size-3.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-neutral-200">Governance Verified</span>
            <span className="text-[10px] text-neutral-500 font-mono">· 5m ago</span>
          </div>
          <span className="text-[10px] text-neutral-400 truncate">Evidence grounding check passed</span>
        </div>
      </div>
      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/90 border border-white/10 shadow-lg">
        <div className="size-7 rounded-full bg-amber-500 flex items-center justify-center shrink-0 text-white shadow-sm">
          <CheckCircle2 className="size-3.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-neutral-200">Swarm Deployed</span>
            <span className="text-[10px] text-neutral-500 font-mono">· 10m ago</span>
          </div>
          <span className="text-[10px] text-neutral-400 truncate">Multi-agent LangGraph pipeline active</span>
        </div>
      </div>
    </div>
  );
}

function BentoConnectedNodesBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] opacity-85 group-hover:opacity-100 transition-opacity">
      <div className="relative w-full max-w-sm h-36 flex items-center justify-between px-8">
        <div className="size-11 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow-xl z-10">
          <Layers className="size-5 text-neutral-300" />
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-neutral-700" fill="none">
          <path d="M 60 72 C 110 72, 140 72, 175 72" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 215 72 C 250 72, 270 36, 310 36" strokeWidth="1.5" />
          <path d="M 215 72 C 250 72, 270 72, 310 72" strokeWidth="1.5" />
          <path d="M 215 72 C 250 72, 270 108, 310 108" strokeWidth="1.5" />
        </svg>

        <div className="size-12 rounded-full bg-white dark:bg-neutral-900 border border-white/25 flex items-center justify-center shadow-2xl z-10">
          <Bot className="size-6 text-emerald-500" />
        </div>

        <div className="flex flex-col gap-2 z-10">
          <div className="size-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow-lg text-[10px] font-bold text-neutral-200">
            AI
          </div>
          <div className="size-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow-lg text-[10px] font-bold text-neutral-200">
            ML
          </div>
          <div className="size-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow-lg text-[10px] font-bold text-neutral-200">
            IoT
          </div>
        </div>
      </div>
    </div>
  );
}

function BentoCalendarBackground() {
  return (
    <div className="absolute top-4 right-4 pointer-events-none [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] opacity-85 group-hover:opacity-100 transition-opacity">
      <div className="w-40 rounded-xl bg-neutral-900/90 border border-white/10 p-3 shadow-xl text-left">
        <div className="text-[11px] font-semibold text-neutral-200 mb-2 font-mono">
          September 2026
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[8px] text-neutral-500 mb-1">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-neutral-400">
          <span className="text-neutral-700">30</span>
          <span className="text-neutral-700">31</span>
          <span className="text-white font-bold bg-emerald-500/20 rounded">1</span>
          <span className="text-white font-bold bg-emerald-500 rounded">2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>
        </div>
      </div>
    </div>
  );
}

export function LandingPage({ onStartCall }: LandingPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const heroRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => { });
    }
  }, []);

  const categories = ['All', 'Agentic AI', 'Quantitative Finance', 'Full-Stack', 'Robotics & IoT'];

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === activeCategory);

  const [showOpening, setShowOpening] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("cinematic_hero_seen");
      if (!seen) {
        setShowOpening(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleReplay = () => {
      setShowOpening(true);
    };
    window.addEventListener("replay-cinematic-intro", handleReplay);
    return () => window.removeEventListener("replay-cinematic-intro", handleReplay);
  }, []);

  const handleOpeningComplete = useCallback(() => {
    setShowOpening(false);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("cinematic_hero_seen", "true");
      } catch {}
    }
  }, []);

  return (
    <div className="portfolioshell w-full min-h-screen bg-[#f1f4f9] dark:bg-[#0d0f14] text-slate-900 dark:text-neutral-100 overflow-x-clip relative selection:bg-neutral-800 selection:text-white font-sans transition-colors duration-300">

      {/* Cinematic Opening Animation Effect */}
      {showOpening && (
        <div className="fixed inset-0 z-[200]">
          <CinematicHero
            mode="opening"
            onComplete={handleOpeningComplete}
          />
        </div>
      )}

      {/* Top Glassy Navbar (Root-Level Fixed z-[100]) */}
      <Navbar onStartCall={onStartCall} />

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden isolate bg-[#f3f6fa] dark:bg-[#0d0f14] transition-colors duration-300"
        id="home"
      >

        {/* Ambient Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 via-[#f1f4f9]/70 to-slate-200/40 dark:from-[#161a24]/60 dark:via-[#0d0f14]/85 dark:to-[#141822]/50 z-[1] pointer-events-none" />

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] z-[2] pointer-events-none" />

        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f3f6fa]/90 via-[#f3f6fa]/40 to-transparent dark:from-[#0d0f14]/90 dark:via-[#0d0f14]/40 dark:to-transparent z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f1f4f9] via-transparent to-[#f3f6fa]/60 dark:from-[#0d0f14] dark:via-transparent dark:to-[#12151d]/40 z-[2] pointer-events-none" />

        {/* Hero Content */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pt-32 pb-20 z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="max-w-3xl flex flex-col items-start text-left space-y-6">


            {/* Category Tagline with WordRotate Animation */}
            <div className="h-6 flex items-center">
              <WordRotate
                words={[
                  "AI ENGINEER / FULL-STACK BUILDER",
                  "AGENTIC AI & MULTI-AGENT SWARMS",
                  "QUANTITATIVE PORTFOLIO GOVERNANCE",
                  "EXPLAINABLE AI RESEARCHER",
                  "REAL-TIME WEBRTC VOICE PIPELINES",
                ]}
                className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-800 dark:text-neutral-300 font-bold"
                duration={2600}
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-slate-950 dark:text-white leading-[1.05]">
              Systems that <br />
              <AuroraText
                colors={["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"]}
                className="font-semibold text-slate-900 dark:text-white"
              >
                think,
              </AuroraText>{" "}
              then act.
            </h1>

            {/* Description Subtext with TypingAnimation */}
            <TypingAnimation
              duration={22}
              className="text-base sm:text-lg text-slate-700 dark:text-neutral-400 max-w-xl leading-relaxed font-normal text-left"
            >
              I design intelligent products where agents, data, and human judgment work together. Focused on reliable systems for high-stakes decisions.
            </TypingAnimation>


            {/* Interactive Thermal Resume Printer (Placed right below buttons as requested) */}
            <div className="pt-4 sm:pt-6 w-full sm:w-auto">
              <ResumePrinter />
            </div>
          </div>

          {/* Right Column: Free-Moving 3D Robot Mascot (Completely Unboxed) */}
          <div
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("trigger-robot-love"));
              }
            }}
            className="w-full lg:flex-1 flex items-center justify-center relative min-h-[460px] sm:min-h-[540px] lg:min-h-[640px] select-none cursor-pointer"
          >
            <RobotCanvas
              className="w-full h-[460px] sm:h-[540px] lg:h-[640px]"
              scale={1.18}
              pantallaColor="#00ffc6"
              pantallaBrillo={1.4}
            />
          </div>
        </div>

        {/* Bottom space padding */}
        <div className="h-6" />
      </section>

      {/* ============================================================ */}
      {/* 2. INFINITE MONOCHROME TECH LOGO MARQUEE */}
      {/* ============================================================ */}
      <section className="py-12 bg-slate-200/50 dark:bg-[#12151d] border-y border-slate-300/80 dark:border-white/10 overflow-hidden relative transition-colors duration-300">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-slate-200/60 dark:from-[#12151d] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-slate-200/60 dark:from-[#12151d] to-transparent z-10" />

        <Marquee pauseOnHover className="[--duration:28s] [--gap:4.5rem]">
          {techLogos.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3.5 opacity-75 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}`}
                alt={`${tech.name} logo`}
                className="h-7 w-auto object-contain brightness-0 dark:invert transition-all"
                loading="lazy"
              />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white/90 font-sans">
                {tech.name}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ============================================================ */}
      {/* 3. ABOUT SECTION */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto relative" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* One Side: Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm rounded-3xl overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.png"
                alt={PORTFOLIO_DATA.developer.fullName}
                className="w-full h-auto object-cover object-top aspect-[4/5] rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Other Side: Matter */}
          <div className="lg:col-span-8 relative flex flex-col items-start text-left justify-center py-6 px-4 sm:px-6 rounded-3xl overflow-hidden">
            {/* Dot Pattern only for the intro / about section matter UI */}
            <DotPattern
              className="[mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
            />
            <p className="relative z-10 text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-normal text-slate-900 dark:text-neutral-100 leading-relaxed sm:leading-[1.85] tracking-normal">
              {PORTFOLIO_DATA.developer.bio}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. RESEARCH PAPERS & PUBLICATIONS */}
      {/* ============================================================ */}
      <section className="py-16 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto" id="research">
        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-[#3c3c3c] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-700 dark:text-neutral-400 mb-2 font-bold">
              <BookOpen className="size-3.5" />
              <span>Peer-Reviewed Science</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Research Papers & Publications
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-900 dark:text-white px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1e1e1e] border border-slate-300 dark:border-[#3c3c3c] font-bold">
            2 Manuscripts Under Review (2026)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.researchPapers.map((paper, idx) => (
            <MagicCard
              key={idx}
              className="p-7 rounded-2xl bg-white/95 dark:bg-[#1e1e1e] backdrop-blur-xl border border-slate-200 dark:border-[#3c3c3c] shadow-md dark:shadow-none hover:border-slate-400 dark:hover:border-[#4d4d4d] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-[#111111] text-slate-900 dark:text-white border border-slate-200 dark:border-[#3c3c3c] font-bold">
                    {paper.publisher}
                  </span>
                  <span className="text-xs font-mono text-amber-700 dark:text-neutral-300 flex items-center gap-1.5 font-semibold">
                    <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                    {paper.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {paper.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {paper.description}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-500 block mb-2 font-bold">
                  Focus Areas:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {paper.focusAreas.map((area, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-100 dark:bg-[#111111] text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-[#3c3c3c]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FEATURED PROJECTS & SYSTEMS */}
      {/* ============================================================ */}
      <section className="py-20 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto" id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-slate-200 dark:border-[#3c3c3c]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-700 dark:text-neutral-400 mb-2 font-bold">
              <Layers className="size-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured AI & Full-Stack Projects
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#3c3c3c] shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${activeCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-[#1e1e1e] dark:text-white font-bold border border-slate-800 dark:border-[#4d4d4d] shadow-sm'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e1e1e]/60'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Bento Grid */}
        <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-[22rem] gap-4">
          {filteredProjects.map((project, idx) => {
            let Icon = FileText;
            let bgNode = <BentoFilesBackground />;
            let colSpan = 'col-span-3 md:col-span-1';

            if (idx === 0) {
              Icon = FileText;
              bgNode = <BentoFilesBackground />;
              colSpan = 'col-span-3 md:col-span-1';
            } else if (idx === 1) {
              Icon = Bell;
              bgNode = <BentoNotificationsBackground />;
              colSpan = 'col-span-3 md:col-span-2';
            } else if (idx === 2) {
              Icon = Cpu;
              bgNode = <BentoConnectedNodesBackground />;
              colSpan = 'col-span-3 md:col-span-2';
            } else {
              Icon = Calendar;
              bgNode = <BentoCalendarBackground />;
              colSpan = 'col-span-3 md:col-span-1';
            }

            return (
              <BentoCard
                key={project.id}
                name={project.title}
                className={colSpan}
                background={bgNode}
                Icon={Icon}
                description={project.tagline || project.description}
                href={project.githubUrl || '#projects'}
                cta="Learn more"
              />
            );
          })}
        </BentoGrid>
      </section>

      {/* ============================================================ */}
      {/* 6. TECHNICAL SKILLS STACK & 3D ICON CLOUD */}
      {/* ============================================================ */}
      <SkillsCardsStack />

      {/* ============================================================ */}
      {/* 7. EXPERIENCE & EDUCATION 3D TIMELINE */}
      {/* ============================================================ */}
      <CareerEducationTimeline />

      {/* ============================================================ */}
      {/* 8. ANIMATED CONTACT SECTION */}
      {/* ============================================================ */}
      <ContactSection />

      {/* ============================================================ */}
      {/* 9. FOOTER WITH NOISE TEXTURE */}
      {/* ============================================================ */}
      <Footer />

      {/* Floating Bottom-Right Voice Assistant Button */}
      {onStartCall && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={onStartCall}
            className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-white dark:bg-[#1e1e1e] hover:bg-slate-900 dark:hover:bg-white text-slate-900 dark:text-white hover:text-white dark:hover:text-black border border-slate-300 dark:border-[#3c3c3c] shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer font-semibold"
          >
            <div className="size-3 rounded-full bg-slate-900 dark:bg-white group-hover:bg-white dark:group-hover:bg-black animate-ping" />
            <Mic className="size-4" />
            <span className="text-xs font-mono uppercase tracking-wider">
              Talk with Voice AI
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
