'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AuroraText } from '@/components/ui/effects/aurora-text';
import { WordRotate } from '@/components/ui/effects/word-rotate';
import { TypingAnimation } from '@/components/ui/effects/typing-animation';
import { MagicCard } from '@/components/ui/effects/magic-card';
import { Marquee } from '@/components/ui/effects/marquee';
import { DotPattern } from '@/components/ui/effects/dot-pattern';
import { SocialTooltipIcons } from '@/components/ui/widgets/social-tooltip-icons';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { RobotCanvas } from '@/components/ui/widgets/robot-hero';
import { CareerEducationTimeline } from '@/components/sections/career-education-timeline';
import { SkillsCardsStack } from '@/components/sections/skills-cards-stack';
import { CertificatesSection } from '@/components/sections/certificates-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ResumeSection } from '@/components/sections/resume-section';
import { BentoGrid, BentoCard } from '@/components/ui/widgets/bento-grid';
import { CinematicHero } from '@/components/ui/widgets/cinematic-landing-hero';
import { PdfViewerDialog } from '@/components/ui/pdf-viewer-dialog';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { PROJECT_CATEGORIES } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  Bot,
  TrendingUp,
  Wind,
  FileText,
  ExternalLink,
  Bell,
  Calendar,
  Download,
  ArrowRight,
  ShieldCheck,
  Activity,
  Network,
  GitBranch,
  Loader2,
} from 'lucide-react';

interface LandingPageProps {
  onStartCall?: () => void;
  isConnected?: boolean;
  isConnecting?: boolean;
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

function BentoGraphRiskBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80"
          alt="Financial Network & Risk Graph"
          fill
          className="object-cover object-center opacity-25 dark:opacity-20 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 group-hover:opacity-100 transition-opacity">
        <div className="w-52 rounded-xl bg-slate-900/90 dark:bg-neutral-900/90 border border-slate-700/60 dark:border-white/15 p-3 text-left shadow-2xl font-mono text-[10px] backdrop-blur-md">
          <div className="flex items-center justify-between text-cyan-400 font-bold mb-1">
            <span className="flex items-center gap-1">
              <Network className="size-3" /> SEC 13-F Holdings
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">G-CVaR</span>
          </div>
          <div className="space-y-1 text-slate-300 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Contagion Penalty γ:</span>
              <span className="font-bold text-white">0.28</span>
            </div>
            <div className="flex justify-between">
              <span>CVaR @ 95% Cut:</span>
              <span className="font-bold text-emerald-400">-25.9%</span>
            </div>
            <div className="flex justify-between">
              <span>Crisis Windows:</span>
              <span className="font-bold text-white">552 Sub-periods</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BentoInstabilityBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=700&q=80"
          alt="Market Instability & Volatility Regime"
          fill
          className="object-cover object-center opacity-25 dark:opacity-20 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 group-hover:opacity-100 transition-opacity">
        <div className="w-52 rounded-xl bg-slate-900/90 dark:bg-neutral-900/90 border border-slate-700/60 dark:border-white/15 p-3 text-left shadow-2xl font-mono text-[10px] backdrop-blur-md">
          <div className="flex items-center justify-between text-amber-400 font-bold mb-1">
            <span className="flex items-center gap-1">
              <Activity className="size-3" /> Instability Index I_t
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Crisis Mode</span>
          </div>
          <div className="space-y-1 text-slate-300 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Regime Shift:</span>
              <span className="font-bold text-amber-400">λ_t = 0.85</span>
            </div>
            <div className="flex justify-between">
              <span>Ledoit-Wolf Shrinkage:</span>
              <span className="font-bold text-white">α = 0.42</span>
            </div>
            <div className="flex justify-between">
              <span>Max Drawdown Cut:</span>
              <span className="font-bold text-emerald-400">-32.5%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BentoXaiDagBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80"
          alt="Neural Pipeline DAG Architecture"
          fill
          className="object-cover object-center opacity-25 dark:opacity-20 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 group-hover:opacity-100 transition-opacity">
        <div className="w-56 rounded-xl bg-slate-900/90 dark:bg-neutral-900/90 border border-slate-700/60 dark:border-white/15 p-3 text-left shadow-2xl font-mono text-[10px] backdrop-blur-md">
          <div className="flex items-center justify-between text-purple-400 font-bold mb-1">
            <span className="flex items-center gap-1">
              <GitBranch className="size-3" /> 7-Agent DAG
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Mistral-7B</span>
          </div>
          <div className="space-y-1 text-slate-300 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Grounding Ratio:</span>
              <span className="font-bold text-emerald-400">100% (0% Hallucination)</span>
            </div>
            <div className="flex justify-between">
              <span>Blackboard Sync:</span>
              <span className="font-bold text-white">Verified Vector</span>
            </div>
            <div className="flex justify-between">
              <span>Audit Standard:</span>
              <span className="font-bold text-cyan-400">MiFID II &amp; EU AI Act</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BentoVoicePipelineBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80"
          alt="Audio Spectrum & Conversational Agent"
          fill
          className="object-cover object-center opacity-25 dark:opacity-20 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 group-hover:opacity-100 transition-opacity">
        <div className="w-52 rounded-xl bg-slate-900/90 dark:bg-neutral-900/90 border border-slate-700/60 dark:border-white/15 p-3 text-left shadow-2xl font-mono text-[10px] backdrop-blur-md">
          <div className="flex items-center justify-between text-pink-400 font-bold mb-1">
            <span className="flex items-center gap-1">
              <Mic className="size-3" /> LiveKit WebRTC
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300">Live Agent</span>
          </div>
          <div className="space-y-1 text-slate-300 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Voice Response TTFT:</span>
              <span className="font-bold text-emerald-400">&lt;500ms</span>
            </div>
            <div className="flex justify-between">
              <span>Supervisor Model:</span>
              <span className="font-bold text-white">LangGraph Graph</span>
            </div>
            <div className="flex justify-between">
              <span>Convex Solver:</span>
              <span className="font-bold text-cyan-400">CLARABEL (38ms)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BentoAqiModelBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=700&q=80"
          alt="Atmospheric Sky & Air Quality Sensing"
          fill
          className="object-cover object-center opacity-25 dark:opacity-20 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 group-hover:opacity-100 transition-opacity">
        <div className="w-52 rounded-xl bg-slate-900/90 dark:bg-neutral-900/90 border border-slate-700/60 dark:border-white/15 p-3 text-left shadow-2xl font-mono text-[10px] backdrop-blur-md">
          <div className="flex items-center justify-between text-blue-400 font-bold mb-1">
            <span className="flex items-center gap-1">
              <Wind className="size-3" /> Delhi AQI Network
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">XGBoost</span>
          </div>
          <div className="space-y-1 text-slate-300 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Test Accuracy R²:</span>
              <span className="font-bold text-emerald-400">0.912</span>
            </div>
            <div className="flex justify-between">
              <span>Sensor Array:</span>
              <span className="font-bold text-white">10 CPCB Stations</span>
            </div>
            <div className="flex justify-between">
              <span>RMSE Loss:</span>
              <span className="font-bold text-cyan-400">18.4 μg/m³</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BentoSwarmRobotsBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=80"
          alt="Autonomous Robotics & Precision IoT Hardware"
          fill
          className="object-cover object-center opacity-25 dark:opacity-20 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 group-hover:opacity-100 transition-opacity">
        <div className="w-52 rounded-xl bg-slate-900/90 dark:bg-neutral-900/90 border border-slate-700/60 dark:border-white/15 p-3 text-left shadow-2xl font-mono text-[10px] backdrop-blur-md">
          <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
            <span className="flex items-center gap-1">
              <Bot className="size-3" /> Swarm Robotics
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">ESP32 Mesh</span>
          </div>
          <div className="space-y-1 text-slate-300 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Coverage Efficiency:</span>
              <span className="font-bold text-emerald-400">98.4%</span>
            </div>
            <div className="flex justify-between">
              <span>Disease Classifier:</span>
              <span className="font-bold text-white">Edge CNN</span>
            </div>
            <div className="flex justify-between">
              <span>Mesh Latency:</span>
              <span className="font-bold text-cyan-400">&lt;15ms</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BentoVoiceAgentArchBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
          alt="Groq LPUs & Neural Computing Circuit"
          fill
          className="object-cover object-center opacity-25 dark:opacity-20 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 group-hover:opacity-100 transition-opacity">
        <div className="w-56 rounded-xl bg-slate-900/90 dark:bg-neutral-900/90 border border-slate-700/60 dark:border-white/15 p-3 text-left shadow-2xl font-mono text-[10px] backdrop-blur-md">
          <div className="flex items-center justify-between text-cyan-400 font-bold mb-1">
            <span className="flex items-center gap-1">
              <Cpu className="size-3" /> Groq LPU + WebRTC
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">&lt;500ms TTFT</span>
          </div>
          <div className="space-y-1 text-slate-300 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Primary LLM:</span>
              <span className="font-bold text-emerald-400">Groq LPU (Sub-90ms)</span>
            </div>
            <div className="flex justify-between">
              <span>Neural TTS:</span>
              <span className="font-bold text-white">Cartesia Sonic-3</span>
            </div>
            <div className="flex justify-between">
              <span>Fallback Engine:</span>
              <span className="font-bold text-cyan-400">Gemini 2.5 Flash</span>
            </div>
            <div className="flex justify-between">
              <span>UI Auto-Nav:</span>
              <span className="font-bold text-amber-400">LiveKit DataChannel</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const projectMetaMap: Record<
  string,
  {
    venue: string;
    tags: string[];
    colSpan: string;
    bg: React.ReactNode;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  'voice-agent-portfolio-architecture': {
    venue: 'Production Voice AI Architecture & WebRTC System',
    tags: ['Groq LPU (<90ms)', 'Cartesia Sonic-3', 'LiveKit WebRTC', 'Next.js 15 App Router', 'Gemini Fallback'],
    colSpan: 'col-span-3 md:col-span-2',
    bg: <BentoVoiceAgentArchBackground />,
    Icon: Mic,
  },
  'regime-adaptive-supervisory-governance': {
    venue: 'Springer Nature LNCS / IJCACI 2026',
    tags: ['Composite Instability I_t', 'Ledoit-Wolf Shrinkage', 'Regime Switching', '2005–2025 Dataset'],
    colSpan: 'col-span-3 md:col-span-1',
    bg: <BentoInstabilityBackground />,
    Icon: Activity,
  },
  'adaptive-portfolio-governance': {
    venue: 'Elsevier EAAI (EAAI-26-14280, Under Review)',
    tags: ['5-Agent Blackboard', 'Graph-Regularized CVaR', 'SEC 13-F Graph', '25.9% Risk Reduction'],
    colSpan: 'col-span-3 md:col-span-2',
    bg: <BentoGraphRiskBackground />,
    Icon: Network,
  },
  'supervisory-portfolio-xai-governance': {
    venue: 'Elsevier Computers & Operations Research / CAS Journal',
    tags: ['7-Agent DAG Pipeline', 'Mistral-7B (Ollama)', '0% Hallucination', 'MiFID II Compliance'],
    colSpan: 'col-span-3 md:col-span-1',
    bg: <BentoXaiDagBackground />,
    Icon: GitBranch,
  },
  'agentic-portfolio-chatbot': {
    venue: 'M.Tech Thesis & Real-Time Production System',
    tags: ['LiveKit WebRTC', '<500ms Latency', 'LangGraph Supervisor', 'CLARABEL Convex Solver'],
    colSpan: 'col-span-3 md:col-span-1',
    bg: <BentoVoicePipelineBackground />,
    Icon: Mic,
  },
  'personalised-aqi-system': {
    venue: 'Machine Learning & Environmental AI',
    tags: ['XGBoost Ensemble', 'R² = 0.912', '10 CPCB Delhi Stations', 'FastAPI & Next.js'],
    colSpan: 'col-span-3 md:col-span-1',
    bg: <BentoAqiModelBackground />,
    Icon: Wind,
  },
  'swarm-robots-agriculture': {
    venue: 'Autonomous Hardware & IoT Systems',
    tags: ['ESP32 Mesh Network', 'Decentralized Swarm', 'Edge CNN Vision', 'Precision Agriculture'],
    colSpan: 'col-span-3 md:col-span-1',
    bg: <BentoSwarmRobotsBackground />,
    Icon: Bot,
  },
};

const paperCaseStudyMap: Record<number, string> = {
  0: '/projects/adaptive-portfolio-governance',
  1: '/projects/regime-adaptive-supervisory-governance',
  2: '/projects/supervisory-portfolio-xai-governance',
};

export function LandingPage({
  onStartCall,
  isConnected = false,
  isConnecting = false,
}: LandingPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewerPdf, setViewerPdf] = useState<{ url: string; title: string; subtitle?: string } | null>(null);
  const heroRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => { });
    }
  }, []);

  const categories = PROJECT_CATEGORIES;

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === activeCategory);

  const [showOpening, setShowOpening] = useState(false);
  const [showRobotIcon, setShowRobotIcon] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowRobotIcon((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
        <CinematicHero
          mode="opening"
          onComplete={handleOpeningComplete}
        />
      )}

      {/* Top Glassy Navbar (Root-Level Fixed z-[100]) */}
      <Navbar
        onStartCall={onStartCall}
        isConnected={isConnected}
        isConnecting={isConnecting}
      />

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-2rem)] lg:min-h-screen w-full flex flex-col justify-center overflow-hidden isolate bg-[#f3f6fa] dark:bg-[#0d0f14] transition-colors duration-300"
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
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pt-20 sm:pt-24 pb-8 sm:pb-10 z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="max-w-2xl lg:max-w-2xl flex flex-col items-start text-left space-y-4">

            {/* Category Tagline with WordRotate Animation */}
            <div className="h-6 flex items-center">
              <WordRotate
                words={[
                  "AUTONOMOUS ROBOTICS & SWARM INTELLIGENCE",
                  "MULTI-AGENT NEURAL REASONING ARCHITECTURES",
                  "ZERO-HALLUCINATION DETERMINISTIC SYSTEMS",
                  "CONVEX OPTIMIZATION (CVXPY & CLARABEL)",
                  "REAL-TIME SENSOR FUSION & ACTUATION PIPELINES",
                ]}
                className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-800 dark:text-neutral-300 font-bold"
                duration={2600}
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12]">
              Autonomous Robotics &amp; <br className="hidden sm:inline" />
              <AuroraText
                colors={["#00ffc6", "#3b82f6", "#a855f7", "#ec4899"]}
                className="font-extrabold text-slate-950 dark:text-white inline-block"
              >
                Intelligent Swarms.
              </AuroraText>
            </h1>

            {/* Description Subtext with TypingAnimation */}
            <TypingAnimation
              duration={16}
              className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-neutral-300 max-w-lg leading-relaxed font-normal text-left"
            >
              Engineering decentralized robotic swarms, multi-agent coordination protocols, and mathematical convex solvers built to perceive, navigate, and execute high-stakes decisions with zero hallucination.
            </TypingAnimation>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/documents/resume/kandula_jithendra_subramanyam_resume.pdf"
                download="Kandula_Jithendra_Subramanyam_Resume.pdf"
                className="group inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-xl shadow-black/10 dark:shadow-white/10 cursor-pointer"
              >
                <Download className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Download Resume</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-neutral-900/60 hover:bg-white/90 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-sm hover:scale-105 cursor-pointer shadow-sm"
              >
                <span>Explore Projects</span>
              </a>
            </div>
          </div>

          {/* Right Column: Free-Moving 3D Robot Mascot (Completely Unboxed) */}
          <div
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("trigger-robot-love"));
              }
            }}
            className="w-full lg:w-auto lg:flex-1 flex items-center justify-center relative min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] select-none cursor-pointer"
          >
            <RobotCanvas
              className="w-full h-[340px] sm:h-[400px] lg:h-[440px]"
              scale={1.14}
              pantallaColor="#00ffc6"
              pantallaBrillo={1.4}
            />
          </div>
        </div>
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
            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm rounded-3xl overflow-hidden group border border-slate-200 dark:border-white/10 shadow-xl">
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
            <div className="relative z-10 space-y-5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  About Kandula Jithendra Subramanyam
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-800 dark:text-neutral-200 leading-relaxed sm:leading-[1.8]">
                I am an M.Tech Artificial Intelligence &amp; Data Science researcher at <strong className="text-slate-950 dark:text-white">K J Somaiya College of Engineering (Somaiya Vidyavihar University, Mumbai)</strong>. My work focuses on bridging autonomous agentic swarms with convex mathematical optimization for high-stakes decision domains.
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed">
                As first and corresponding author of three research manuscripts spanning <strong className="text-slate-900 dark:text-neutral-200">Elsevier EAAI</strong>, <strong className="text-slate-900 dark:text-neutral-200">Elsevier Computers &amp; Operations Research</strong>, and <strong className="text-slate-900 dark:text-neutral-200">Springer Nature LNCS</strong>, I formulate systems where probabilistic language models do not hallucinate, but instead collaborate with convex solvers (CVXPY/CLARABEL), bipartite institutional co-holding graphs, and deterministic regime-switching engines over 20-year empirical universes.
              </p>

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
              <span>Peer-Reviewed Science & Publications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Research Papers & Manuscripts
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.researchPapers.map((paper, idx) => (
            <MagicCard
              key={idx}
              className="p-7 rounded-2xl bg-white/95 dark:bg-[#1e1e1e] backdrop-blur-xl border border-slate-200 dark:border-[#3c3c3c] shadow-md dark:shadow-none hover:border-slate-400 dark:hover:border-[#4d4d4d] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-[#111111] text-slate-900 dark:text-white border border-slate-200 dark:border-[#3c3c3c] font-bold">
                    {paper.publisher}
                  </span>
                  <span className="text-xs font-mono text-amber-700 dark:text-amber-400 flex items-center gap-1.5 font-semibold">
                    <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                    {paper.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {paper.title}
                </h3>

                {paper.authors && (
                  <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mb-2">
                    <span className="font-semibold text-slate-700 dark:text-neutral-300">Authors:</span> {paper.authors}
                  </p>
                )}

                {paper.manuscriptId && (
                  <div className="inline-block mb-3 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 font-semibold">
                    Manuscript ID: {paper.manuscriptId}
                  </div>
                )}

                {paper.conferenceLocation && (
                  <div className="inline-block mb-3 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 font-semibold">
                    Venue: {paper.conferenceLocation}
                  </div>
                )}

                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {paper.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-500 block mb-2 font-bold">
                    Focus Areas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
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

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  {paperCaseStudyMap[idx] && (
                    <Link
                      href={paperCaseStudyMap[idx]}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#f12e54] hover:bg-[#d92244] text-white shadow-sm transition-all group cursor-pointer"
                    >
                      <Layers className="size-3.5" />
                      <span>Explore Case Study</span>
                      <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}

                  {paper.pdfUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setViewerPdf({
                          url: paper.pdfUrl!,
                          title: paper.title,
                          subtitle: `${paper.publisher} · ${paper.status}`,
                        })
                      }
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-neutral-200 border border-slate-300 dark:border-white/10 shadow-xs transition-all group cursor-pointer"
                    >
                      <FileText className="size-3.5 group-hover:scale-110 transition-transform" />
                      <span>Read Manuscript (PDF)</span>
                    </button>
                  )}
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
            const meta = projectMetaMap[project.id] || {
              venue: project.category,
              tags: [project.category],
              colSpan: idx % 3 === 1 ? 'col-span-3 md:col-span-2' : 'col-span-3 md:col-span-1',
              bg: <BentoGraphRiskBackground />,
              Icon: FileText,
            };

            return (
              <BentoCard
                key={project.id}
                name={project.title}
                className={meta.colSpan}
                background={meta.bg}
                Icon={meta.Icon}
                venue={meta.venue}
                tags={meta.tags}
                description={project.tagline || project.description}
                href={`/projects/${project.id}`}
                cta="View Case Study & Data"
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
      {/* 7. VERIFIED CERTIFICATES & ACCREDITATIONS (INFINITE SLIDER) */}
      {/* ============================================================ */}
      <CertificatesSection />

      {/* ============================================================ */}
      {/* 8. EXPERIENCE & EDUCATION 3D TIMELINE */}
      {/* ============================================================ */}
      <CareerEducationTimeline />

      {/* ============================================================ */}
      {/* 9. RESUME SECTION */}
      {/* ============================================================ */}
      <ResumeSection />

      {/* ============================================================ */}
      {/* 10. ANIMATED CONTACT SECTION */}
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
            disabled={isConnecting}
            className={cn(
              "group flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer font-semibold",
              isConnected
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-rose-950/80 hover:text-rose-300 hover:border-rose-500/50"
                : isConnecting
                ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/50 cursor-wait"
                : "bg-white dark:bg-[#1e1e1e] hover:bg-slate-900 dark:hover:bg-white text-slate-900 dark:text-white hover:text-white dark:hover:text-black border-slate-300 dark:border-[#3c3c3c]"
            )}
          >
            {isConnecting ? (
              <>
                <Loader2 className="size-4 animate-spin text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Connecting...
                </span>
              </>
            ) : isConnected ? (
              <>
                <Mic className="size-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  End Call
                </span>
              </>
            ) : (
              <>
                <span className="relative flex items-center justify-center size-4 shrink-0 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {showRobotIcon ? (
                      <motion.span
                        key="robot"
                        initial={{ opacity: 0, y: 3, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -3, scale: 0.85 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-center size-4"
                      >
                        <Bot className="size-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="mic"
                        initial={{ opacity: 0, y: 3, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -3, scale: 0.85 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-center size-4"
                      >
                        <Mic className="size-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="text-xs font-mono uppercase tracking-wider">
                  Ask
                </span>
              </>
            )}
          </button>
        </div>
      )}
      {/* Interactive PDF Document Viewer Modal */}
      <PdfViewerDialog
        open={!!viewerPdf}
        onOpenChange={(open) => !open && setViewerPdf(null)}
        url={viewerPdf?.url || null}
        title={viewerPdf?.title}
        subtitle={viewerPdf?.subtitle}
      />
    </div>
  );
}
