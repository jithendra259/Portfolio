'use client';

import React, { useState } from 'react';
import { AuroraText } from '@/components/ui/aurora-text';
import { WordRotate } from '@/components/ui/word-rotate';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { MagicCard } from '@/components/ui/magic-card';
import { IconCloud } from '@/components/ui/icon-cloud';
import { Marquee } from '@/components/ui/marquee';
import { EmailRevealButton } from '@/components/ui/email-reveal-button';
import { SocialTooltipIcons } from '@/components/ui/social-tooltip-icons';
import { Navbar } from '@/components/app/navbar';
import { Footer } from '@/components/app/footer';
import { ResumePrinter } from '@/components/ui/resume-printer';
import { CareerEducationTimeline } from '@/components/app/career-education-timeline';
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
} from 'lucide-react';

interface LandingPageProps {
  onStartCall?: () => void;
}

const techIcons = [
  "typescript",
  "javascript",
  "python",
  "react",
  "nextdotjs",
  "pytorch",
  "fastapi",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "tailwindcss",
  "postgresql",
  "redis",
  "mongodb",
  "vercel",
  "linux",
  "webrtc",
  "openai",
  "huggingface",
  "langchain",
  "pandas",
  "numpy",
  "scipy",
];

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

export function LandingPage({ onStartCall }: LandingPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const categories = ['All', 'Agentic AI', 'Quantitative Finance', 'Full-Stack', 'Robotics & IoT'];

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === activeCategory);

  return (
    <div className="portfolioshell w-full min-h-screen bg-[#f8fafc] dark:bg-[#000000] text-slate-900 dark:text-white overflow-x-hidden relative selection:bg-neutral-800 selection:text-white font-sans transition-colors duration-300">
      
      {/* Top Glassy Navbar (Root-Level Fixed z-[100]) */}
      <Navbar onStartCall={onStartCall} />

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden isolate bg-white dark:bg-[#000000] transition-colors duration-300" id="home">
        
        {/* Background Video (Commented out) */}
        {/*
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90 brightness-105 contrast-105"
        >
          <source src="/herosection.mp4" type="video/mp4" />
        </video>
        */}

        {/* Ambient Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/70 via-slate-50/80 to-slate-200/50 dark:from-[#111111]/60 dark:via-[#000000]/80 dark:to-[#1e1e1e]/40 z-[1] pointer-events-none" />

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] z-[2] pointer-events-none" />

        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent dark:from-black/90 dark:via-black/40 dark:to-transparent z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-white/60 dark:from-[#000000] dark:via-transparent dark:to-black/40 z-[2] pointer-events-none" />

        {/* Hero Content */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pt-32 pb-20 z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="max-w-3xl flex flex-col items-start text-left space-y-6">
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-slate-600 dark:text-neutral-400 uppercase font-semibold">
              <span className="size-2 rounded-full bg-emerald-500 dark:bg-neutral-300 shadow-[0_0_10px_rgba(255,255,255,0.4)] animate-ping" />
              <span>AVAILABLE FOR SELECT COLLABORATIONS</span>
            </div>

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

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-semibold text-sm transition-all duration-200 hover:scale-105 cursor-pointer shadow-md dark:hover:bg-neutral-200"
              >
                <span>Explore the approach</span>
                <span className="text-base">↗</span>
              </a>

              {onStartCall && (
                <button
                  onClick={onStartCall}
                  className="inline-flex items-center gap-2 text-sm text-slate-900 dark:text-white hover:text-neutral-400 underline underline-offset-8 transition-colors cursor-pointer group font-medium"
                >
                  <span>Start a conversation</span>
                  <span className="text-base group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">↘</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Resume Thermal Printer */}
          <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-auto pt-6 lg:pt-0">
            <ResumePrinter />
          </div>
        </div>

        {/* Bottom space padding */}
        <div className="h-6" />
      </section>

      {/* ============================================================ */}
      {/* 2. INFINITE MONOCHROME TECH LOGO MARQUEE */}
      {/* ============================================================ */}
      <section className="py-12 bg-slate-100/90 dark:bg-[#111111] border-y border-slate-200 dark:border-[#3c3c3c] overflow-hidden relative transition-colors duration-300">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-slate-100 dark:from-[#111111] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-slate-100 dark:from-[#111111] to-transparent z-10" />

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
      {/* 3. ABOUT & PHILOSOPHY MANIFESTO FRAME */}
      {/* ============================================================ */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-5xl mx-auto" id="about">
        <div className="relative p-8 sm:p-12 rounded-2xl bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl border border-slate-200 dark:border-[#3c3c3c] shadow-xl dark:shadow-2xl transition-colors duration-300">
          
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-900 dark:border-white -translate-x-1 -translate-y-1" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-900 dark:border-white translate-x-1 -translate-y-1" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-900 dark:border-white -translate-x-1 translate-y-1" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-900 dark:border-white translate-x-1 translate-y-1" />

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="size-3 rounded-full bg-slate-900 dark:bg-white animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-neutral-300 font-bold">
              ● AGENTIC AI & QUANTITATIVE SYSTEMS
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-slate-900 dark:text-white leading-relaxed tracking-tight">
            &ldquo;{PORTFOLIO_DATA.developer.bio}&rdquo;
          </h3>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#3c3c3c] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase font-medium">
              {PORTFOLIO_DATA.developer.fullName} • {PORTFOLIO_DATA.developer.location}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-900 dark:text-neutral-300 font-bold">
              <Zap className="size-3.5" /> SUB-500MS REACTION TIME
            </div>
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
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-[#1e1e1e] dark:text-white font-bold border border-slate-800 dark:border-[#4d4d4d] shadow-sm'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e1e1e]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with MagicCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <MagicCard
              key={project.id}
              className="p-7 rounded-2xl bg-white/95 dark:bg-[#1e1e1e] backdrop-blur-xl border border-slate-200 dark:border-[#3c3c3c] shadow-md dark:shadow-none hover:border-slate-400 dark:hover:border-[#4d4d4d] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-[#111111] text-slate-900 dark:text-white border border-slate-200 dark:border-[#3c3c3c] font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">{project.period}</span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#111111] hover:bg-slate-200 dark:hover:bg-[#3c3c3c] text-slate-700 dark:text-neutral-300 transition-colors"
                        title="GitHub"
                      >
                        <Github className="size-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="space-y-2 mb-6">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                      <CheckCircle2 className="size-3.5 text-slate-900 dark:text-white shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-[#3c3c3c]">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111111] text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-[#3c3c3c]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </MagicCard>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. TECHNICAL SKILLS & 3D ICON CLOUD */}
      {/* ============================================================ */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto" id="skills">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Numbered Skills Matrix */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-slate-700 dark:text-neutral-400 font-bold flex items-center gap-1.5 mb-2">
                <Cpu className="size-3.5" /> Technical Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Technical Skills & Systems Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/90 dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#3c3c3c] shadow-sm flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-[#3c3c3c]">
                      <Sparkles className="size-4 text-slate-900 dark:text-white" />
                      <h4 className="font-mono text-xs font-bold uppercase text-slate-900 dark:text-white tracking-wider">
                        {cat.category}
                      </h4>
                    </div>

                    <div className="space-y-1.5">
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-100 dark:bg-[#111111]"
                        >
                          <span className="text-slate-700 dark:text-neutral-300">{skill.name}</span>
                          <span className="text-[10px] font-mono text-slate-900 dark:text-neutral-400 font-semibold">{skill.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Tech Sphere */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 dark:bg-[#111111] border border-slate-200 dark:border-[#3c3c3c] shadow-md backdrop-blur-xl">
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 mb-2 uppercase tracking-wider font-bold">
              Interactive 3D Tech Sphere
            </span>
            <div className="relative flex size-full max-w-md items-center justify-center overflow-hidden">
              <IconCloud
                images={techIcons.map(
                  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
                )}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. EXPERIENCE & EDUCATION 3D TIMELINE */}
      {/* ============================================================ */}
      <CareerEducationTimeline />

      {/* ============================================================ */}
      {/* 8. CONTACT SECTION */}
      {/* ============================================================ */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-4xl mx-auto text-center space-y-8" id="contact">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-[#111111] border border-slate-300 dark:border-[#3c3c3c] text-xs font-mono uppercase tracking-widest text-slate-800 dark:text-neutral-300 font-bold shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span>CONNECT &amp; COLLABORATE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Let&apos;s Build Next-Gen AI Together
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Open for Agentic AI, Multi-Agent Swarms, Quantitative Research, and Full-Stack Engineering roles.
          </p>
        </div>

        {/* Cyberpunk Email Reveal & Copy Button */}
        <div className="py-2 flex justify-center">
          <EmailRevealButton
            name={PORTFOLIO_DATA.developer.fullName}
            email={PORTFOLIO_DATA.developer.email}
          />
        </div>

        {/* Direct Phone Call Link */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <a
            href={`tel:${PORTFOLIO_DATA.developer.phone}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#1e1e1e] hover:bg-slate-100 dark:hover:bg-[#3c3c3c] text-slate-900 dark:text-white border border-slate-200 dark:border-[#3c3c3c] transition-all shadow-sm text-xs font-mono"
          >
            <Phone className="size-4 text-slate-900 dark:text-white" />
            <span>{PORTFOLIO_DATA.developer.phone}</span>
          </a>
        </div>
      </section>

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
