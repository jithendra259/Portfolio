'use client';

import React, { useState } from 'react';
import { AuroraText } from '@/components/ui/aurora-text';
import { WordRotate } from '@/components/ui/word-rotate';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { MagicCard } from '@/components/ui/magic-card';
import { IconCloud } from '@/components/ui/icon-cloud';
import { Marquee } from '@/components/ui/marquee';
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
    <div className="portfolioshell w-full min-h-screen bg-[#07080b] text-slate-100 overflow-x-hidden relative selection:bg-[#a7f3d0] selection:text-black font-sans">
      
      {/* ============================================================ */}
      {/* 1. HERO SECTION (With Video, Animations & Matching Colors) */}
      {/* ============================================================ */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden isolate" id="home">
        
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none brightness-100 contrast-105"
        >
          <source src="/herosection.mp4" type="video/mp4" />
        </video>

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] z-[1] pointer-events-none" />

        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-black/40 z-[2] pointer-events-none" />

        {/* Top Navbar */}
        <header className="fixed top-0 left-0 right-0 w-full px-6 sm:px-12 md:px-16 lg:px-20 pt-6 sm:pt-8 flex items-center justify-between z-40 pointer-events-none">
          
          {/* Brand Avatar & Name */}
          <a href="#home" className="pointer-events-auto flex items-center gap-3 group">
            <div className="size-10 rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center font-bold text-sm text-[#a7f3d0] shadow-inner group-hover:border-[#a7f3d0] transition-colors">
              J
            </div>
            <span className="font-bold tracking-widest text-sm sm:text-base text-white uppercase font-mono">
              JITHENDRA
            </span>
          </a>

          {/* Center Navigation Pill (Enlarged and Perfect Center) */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <nav className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#0d0f17]/90 backdrop-blur-2xl border border-white/15 text-sm font-medium text-slate-200 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
              <a href="#home" className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full hover:text-white hover:bg-white/15 transition-all">
                Home
              </a>
              <a href="#about" className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full hover:text-white hover:bg-white/15 transition-all">
                About
              </a>
              <a href="#projects" className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full hover:text-white hover:bg-white/15 transition-all">
                Projects
              </a>
              <a href="#experience" className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full hover:text-white hover:bg-white/15 transition-all">
                Experience
              </a>
              <a href="#contact" className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full hover:text-white hover:bg-white/15 transition-all">
                Contact
              </a>
            </nav>
          </div>

          {/* Right Status Badge */}
          <div className="hidden md:flex items-center gap-2 pointer-events-auto">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-300 tracking-widest uppercase font-semibold">
              AVAILABLE
            </span>
          </div>
        </header>

        {/* Hero Content */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-24 z-10 flex items-center">
          <div className="max-w-3xl flex flex-col items-start text-left space-y-6">
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-slate-300 uppercase">
              <span className="size-2 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b] animate-ping" />
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
                className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#e5a93b] font-semibold"
                duration={2600}
              />
            </div>

            {/* Main Headline with AuroraText Glow on Mint Green */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05]">
              Systems that <br />
              <AuroraText
                colors={["#a7f3d0", "#6ee7b7", "#34d399", "#ffffff"]}
                className="font-medium"
              >
                think,
              </AuroraText>{" "}
              then act.
            </h1>

            {/* Description Subtext with TypingAnimation */}
            <TypingAnimation
              duration={22}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal text-left"
            >
              I design intelligent products where agents, data, and human judgment work together. Focused on reliable systems for high-stakes decisions.
            </TypingAnimation>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#a7f3d0] hover:bg-[#86efac] text-[#0a1a12] font-semibold text-sm transition-all duration-200 hover:scale-105 cursor-pointer shadow-lg"
              >
                <span>Explore the approach</span>
                <span className="text-base">↗</span>
              </a>

              {onStartCall && (
                <button
                  onClick={onStartCall}
                  className="inline-flex items-center gap-2 text-sm text-white hover:text-[#a7f3d0] underline underline-offset-8 transition-colors cursor-pointer group font-medium"
                >
                  <span>Start a conversation</span>
                  <span className="text-base group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">↘</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom space padding */}
        <div className="h-6" />
      </section>

      {/* ============================================================ */}
      {/* 2. INFINITE MONOCHROME TECH LOGO MARQUEE */}
      {/* ============================================================ */}
      <section className="py-12 bg-[#06070a] border-y border-white/[0.08] overflow-hidden relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#06070a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#06070a] to-transparent z-10" />

        <Marquee pauseOnHover className="[--duration:28s] [--gap:4.5rem]">
          {techLogos.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3.5 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}/ffffff`}
                alt={`${tech.name} logo`}
                className="h-7 w-auto object-contain"
                loading="lazy"
              />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white/90 font-sans">
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
        <div className="relative p-8 sm:p-12 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10">
          
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#a7f3d0] -translate-x-1 -translate-y-1" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#a7f3d0] translate-x-1 -translate-y-1" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#a7f3d0] -translate-x-1 translate-y-1" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#a7f3d0] translate-x-1 translate-y-1" />

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="size-3 rounded-full bg-[#a7f3d0] animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#a7f3d0] font-bold">
              ● AGENTIC AI & QUANTITATIVE SYSTEMS
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-white leading-relaxed tracking-tight">
            &ldquo;{PORTFOLIO_DATA.developer.bio}&rdquo;
          </h3>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400 uppercase">
              {PORTFOLIO_DATA.developer.fullName} • {PORTFOLIO_DATA.developer.location}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#a7f3d0]">
              <Zap className="size-3.5" /> SUB-500MS REACTION TIME
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. RESEARCH PAPERS & PUBLICATIONS */}
      {/* ============================================================ */}
      <section className="py-16 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto" id="research">
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#a7f3d0] mb-2 font-bold">
              <BookOpen className="size-3.5" />
              <span>Peer-Reviewed Science</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Research Papers & Publications
            </h2>
          </div>
          <span className="text-xs font-mono text-[#a7f3d0] px-3 py-1 rounded-full bg-[#a7f3d0]/10 border border-[#a7f3d0]/30 font-bold">
            2 Manuscripts Under Review (2026)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.researchPapers.map((paper, idx) => (
            <MagicCard
              key={idx}
              className="p-7 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-[#a7f3d0]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#a7f3d0]/15 text-[#a7f3d0] border border-[#a7f3d0]/30 font-bold">
                    {paper.publisher}
                  </span>
                  <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                    {paper.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {paper.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {paper.description}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                  Focus Areas:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {paper.focusAreas.map((area, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-white/5"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#a7f3d0] mb-2 font-bold">
              <Layers className="size-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured AI & Full-Stack Projects
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#a7f3d0]/20 text-[#a7f3d0] font-bold border border-[#a7f3d0]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
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
              className="p-7 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-[#a7f3d0]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#a7f3d0]/10 text-[#a7f3d0] border border-[#a7f3d0]/20">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">{project.period}</span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github className="size-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#a7f3d0] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="space-y-2 mb-6">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="size-3.5 text-[#a7f3d0] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-white/5"
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
              <span className="text-xs font-mono uppercase text-[#a7f3d0] font-bold flex items-center gap-1.5 mb-2">
                <Cpu className="size-3.5" /> Technical Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Technical Skills & Systems Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-[#a7f3d0]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                      <Sparkles className="size-4 text-[#a7f3d0]" />
                      <h4 className="font-mono text-xs font-bold uppercase text-white tracking-wider">
                        {cat.category}
                      </h4>
                    </div>

                    <div className="space-y-1.5">
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-800/40"
                        >
                          <span className="text-slate-300">{skill.name}</span>
                          <span className="text-[10px] font-mono text-[#a7f3d0]">{skill.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Tech Sphere */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
            <span className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider font-bold">
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
      {/* 7. EXPERIENCE & EDUCATION TIMELINE */}
      {/* ============================================================ */}
      <section className="py-20 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto" id="experience">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#a7f3d0] font-bold mb-2">
              <Briefcase className="size-4" />
              <span>Career Journey</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
              Professional Experience
            </h2>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#a7f3d0] before:via-[#a7f3d0]/40 before:to-transparent">
              {PORTFOLIO_DATA.experience.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-6 top-1.5 size-4 rounded-full bg-[#07080b] border-2 border-[#a7f3d0] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(167,243,208,0.5)]" />
                  
                  <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 hover:border-[#a7f3d0]/30 transition-all space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-bold text-base text-white">{item.role}</h3>
                      <span className="text-xs font-mono text-[#a7f3d0]">{item.period}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {item.company} • {item.location}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="space-y-1.5 pt-2">
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="size-3.5 text-[#a7f3d0] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications Column */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#a7f3d0] font-bold mb-2">
              <GraduationCap className="size-4" />
              <span>Academic Background</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
              Education & Highlights
            </h2>

            <div className="space-y-6">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-slate-900/60 border border-white/10 hover:border-[#a7f3d0]/30 transition-all space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-base text-white">{edu.degree}</h3>
                    <span className="text-xs font-mono text-[#a7f3d0] px-2.5 py-0.5 rounded bg-[#a7f3d0]/10 border border-[#a7f3d0]/20">
                      {edu.score}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {edu.institution} • {edu.location} ({edu.period})
                  </div>
                  <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}

              {/* Test Scores & Certifications Card */}
              <div className="p-6 rounded-xl bg-slate-900/80 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#a7f3d0] font-bold">
                  <Award className="size-4 text-amber-400" /> Standardized Test Scores & Certifications
                </div>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.testScores.map((score, sIdx) => (
                    <span key={sIdx} className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {score}
                    </span>
                  ))}
                  {PORTFOLIO_DATA.certifications.map((cert, cIdx) => (
                    <span key={cIdx} className="text-xs font-mono px-3 py-1 rounded-full bg-[#a7f3d0]/10 text-[#a7f3d0] border border-[#a7f3d0]/30">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. CONTACT & FOOTER */}
      {/* ============================================================ */}
      <footer className="py-20 border-t border-white/10 text-center text-xs font-mono text-slate-400 space-y-6" id="contact">
        <div className="max-w-2xl mx-auto px-6 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Let&apos;s Build Next-Gen AI Together
          </h3>
          <p className="text-xs text-slate-300">
            Open for Agentic AI, Multi-Agent Systems, Quantitative Research, and Full-Stack Engineering roles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`mailto:${PORTFOLIO_DATA.developer.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a7f3d0] hover:bg-[#86efac] text-[#0a1a12] font-bold transition-all shadow-md"
            >
              <Mail className="size-4" />
              <span>{PORTFOLIO_DATA.developer.email}</span>
            </a>
            <a
              href={`tel:${PORTFOLIO_DATA.developer.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-white/15 transition-all"
            >
              <Phone className="size-4 text-[#a7f3d0]" />
              <span>{PORTFOLIO_DATA.developer.phone}</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/5 max-w-xl mx-auto">
          <a href={PORTFOLIO_DATA.developer.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#a7f3d0] transition-colors">
            GitHub
          </a>
          <a href={PORTFOLIO_DATA.developer.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#a7f3d0] transition-colors">
            LinkedIn
          </a>
          <a href={PORTFOLIO_DATA.developer.socials.email} className="hover:text-[#a7f3d0] transition-colors">
            Email
          </a>
        </div>
        
        <p className="pt-2 text-slate-500">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.developer.fullName}. ALL RIGHTS RESERVED.
        </p>
      </footer>

      {/* Floating Bottom-Right Voice Assistant Button */}
      {onStartCall && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={onStartCall}
            className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-slate-900/95 hover:bg-[#a7f3d0] text-white hover:text-[#0a1a12] border border-[#a7f3d0]/40 shadow-[0_0_30px_-2px_rgba(167,243,208,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer font-semibold"
          >
            <div className="size-3 rounded-full bg-[#a7f3d0] group-hover:bg-[#0a1a12] animate-ping" />
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
