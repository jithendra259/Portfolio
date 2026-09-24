'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Mic,
  Network,
  Phone,
  ShieldCheck,
  TrendingUp,
  Wind,
  Zap,
} from 'lucide-react';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { CareerEducationTimeline } from '@/components/sections/career-education-timeline';
import { CertificatesSection } from '@/components/sections/certificates-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ResumeSection } from '@/components/sections/resume-section';
import { SkillsCardsStack } from '@/components/sections/skills-cards-stack';
import { AuroraText } from '@/components/ui/effects/aurora-text';
import { DotPattern } from '@/components/ui/effects/dot-pattern';
import { MagicCard } from '@/components/ui/effects/magic-card';
import { Marquee } from '@/components/ui/effects/marquee';
import { TypingAnimation } from '@/components/ui/effects/typing-animation';
import { WordRotate } from '@/components/ui/effects/word-rotate';
import { PdfViewerDialog } from '@/components/ui/pdf-viewer-dialog';
import { BentoCard, BentoGrid } from '@/components/ui/widgets/bento-grid';
import { CinematicHero } from '@/components/ui/widgets/cinematic-landing-hero';
import { RobotCanvas } from '@/components/ui/widgets/robot-hero';
import { SocialTooltipIcons } from '@/components/ui/widgets/social-tooltip-icons';
import { PROJECT_CATEGORIES } from '@/data/projects';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  onStartCall?: () => void;
  isConnected?: boolean;
  isConnecting?: boolean;
}

const techLogos = [
  { name: 'LangChain / LangGraph', slug: 'langchain' },
  { name: 'Python', slug: 'python' },
  { name: 'CVXPY Optimization', slug: 'python' },
  { name: 'Next.js 15', slug: 'nextdotjs' },
  { name: 'React 19', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'FastAPI / Flask', slug: 'fastapi' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'PyTorch', slug: 'pytorch' },
  { name: 'LiveKit WebRTC', slug: 'webrtc' },
  { name: 'OpenAI / Mistral', slug: 'openai' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Git & GitHub', slug: 'github' },
];

function BentoGraphRiskBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80"
          alt="Financial Network & Risk Graph"
          fill
          className="object-cover object-center opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 dark:opacity-20"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex flex-col gap-1.5 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 transition-opacity group-hover:opacity-100">
        <div className="w-52 rounded-xl border border-slate-700/60 bg-slate-900/90 p-3 text-left font-mono text-[10px] shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-neutral-900/90">
          <div className="mb-1 flex items-center justify-between font-bold text-cyan-400">
            <span className="flex items-center gap-1">
              <Network className="size-3" /> SEC 13-F Holdings
            </span>
            <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] text-cyan-300">
              G-CVaR
            </span>
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
          className="object-cover object-center opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 dark:opacity-20"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex flex-col gap-1.5 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 transition-opacity group-hover:opacity-100">
        <div className="w-52 rounded-xl border border-slate-700/60 bg-slate-900/90 p-3 text-left font-mono text-[10px] shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-neutral-900/90">
          <div className="mb-1 flex items-center justify-between font-bold text-amber-400">
            <span className="flex items-center gap-1">
              <Activity className="size-3" /> Instability Index I_t
            </span>
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] text-amber-300">
              Crisis Mode
            </span>
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
          className="object-cover object-center opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 dark:opacity-20"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex flex-col gap-1.5 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 transition-opacity group-hover:opacity-100">
        <div className="w-56 rounded-xl border border-slate-700/60 bg-slate-900/90 p-3 text-left font-mono text-[10px] shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-neutral-900/90">
          <div className="mb-1 flex items-center justify-between font-bold text-purple-400">
            <span className="flex items-center gap-1">
              <GitBranch className="size-3" /> 7-Agent DAG
            </span>
            <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] text-purple-300">
              Mistral-7B
            </span>
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
          className="object-cover object-center opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 dark:opacity-20"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex flex-col gap-1.5 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 transition-opacity group-hover:opacity-100">
        <div className="w-52 rounded-xl border border-slate-700/60 bg-slate-900/90 p-3 text-left font-mono text-[10px] shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-neutral-900/90">
          <div className="mb-1 flex items-center justify-between font-bold text-pink-400">
            <span className="flex items-center gap-1">
              <Mic className="size-3" /> LiveKit WebRTC
            </span>
            <span className="rounded bg-pink-500/20 px-1.5 py-0.5 text-[9px] text-pink-300">
              Live Agent
            </span>
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
          className="object-cover object-center opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 dark:opacity-20"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex flex-col gap-1.5 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 transition-opacity group-hover:opacity-100">
        <div className="w-52 rounded-xl border border-slate-700/60 bg-slate-900/90 p-3 text-left font-mono text-[10px] shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-neutral-900/90">
          <div className="mb-1 flex items-center justify-between font-bold text-blue-400">
            <span className="flex items-center gap-1">
              <Wind className="size-3" /> Delhi AQI Network
            </span>
            <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] text-blue-300">
              XGBoost
            </span>
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
          className="object-cover object-center opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 dark:opacity-20"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex flex-col gap-1.5 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 transition-opacity group-hover:opacity-100">
        <div className="w-52 rounded-xl border border-slate-700/60 bg-slate-900/90 p-3 text-left font-mono text-[10px] shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-neutral-900/90">
          <div className="mb-1 flex items-center justify-between font-bold text-emerald-400">
            <span className="flex items-center gap-1">
              <Bot className="size-3" /> Swarm Robotics
            </span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-300">
              ESP32 Mesh
            </span>
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
          className="object-cover object-center opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 dark:opacity-20"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/75 dark:to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex flex-col gap-1.5 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] opacity-95 transition-opacity group-hover:opacity-100">
        <div className="w-56 rounded-xl border border-slate-700/60 bg-slate-900/90 p-3 text-left font-mono text-[10px] shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-neutral-900/90">
          <div className="mb-1 flex items-center justify-between font-bold text-cyan-400">
            <span className="flex items-center gap-1">
              <Cpu className="size-3" /> Groq LPU + WebRTC
            </span>
            <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] text-cyan-300">
              &lt;500ms TTFT
            </span>
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
    tags: [
      'Groq LPU (<90ms)',
      'Cartesia Sonic-3',
      'LiveKit WebRTC',
      'Next.js 15 App Router',
      'Gemini Fallback',
    ],
    colSpan: 'col-span-3 md:col-span-2',
    bg: <BentoVoiceAgentArchBackground />,
    Icon: Mic,
  },
  'regime-adaptive-supervisory-governance': {
    venue: 'Springer Nature LNCS / IJCACI 2026',
    tags: [
      'Composite Instability I_t',
      'Ledoit-Wolf Shrinkage',
      'Regime Switching',
      '2005–2025 Dataset',
    ],
    colSpan: 'col-span-3 md:col-span-1',
    bg: <BentoInstabilityBackground />,
    Icon: Activity,
  },
  'adaptive-portfolio-governance': {
    venue: 'Elsevier EAAI (EAAI-26-14280, Under Review)',
    tags: [
      '5-Agent Blackboard',
      'Graph-Regularized CVaR',
      'SEC 13-F Graph',
      '25.9% Risk Reduction',
    ],
    colSpan: 'col-span-3 md:col-span-2',
    bg: <BentoGraphRiskBackground />,
    Icon: Network,
  },
  'supervisory-portfolio-xai-governance': {
    venue: 'Elsevier Computers & Operations Research / CAS Journal',
    tags: [
      '7-Agent DAG Pipeline',
      'Mistral-7B (Ollama)',
      '0% Hallucination',
      'MiFID II Compliance',
    ],
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
  const [viewerPdf, setViewerPdf] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);
  const heroRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const categories = PROJECT_CATEGORIES;

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === activeCategory);

  const [showOpening, setShowOpening] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('cinematic_hero_seen');
      if (!seen) {
        setShowOpening(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleReplay = () => {
      setShowOpening(true);
    };
    window.addEventListener('replay-cinematic-intro', handleReplay);
    return () => window.removeEventListener('replay-cinematic-intro', handleReplay);
  }, []);

  const handleOpeningComplete = useCallback(() => {
    setShowOpening(false);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('cinematic_hero_seen', 'true');
      } catch {}
    }
  }, []);

  return (
    <div className="portfolioshell relative min-h-screen w-full overflow-x-clip bg-[#f1f4f9] font-sans text-slate-900 transition-colors duration-300 selection:bg-neutral-800 selection:text-white dark:bg-[#0d0f14] dark:text-neutral-100">
      {/* Cinematic Opening Animation Effect */}
      {showOpening && <CinematicHero mode="opening" onComplete={handleOpeningComplete} />}

      {/* Top Glassy Navbar (Root-Level Fixed z-[100]) */}
      <Navbar onStartCall={onStartCall} isConnected={isConnected} isConnecting={isConnecting} />

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[calc(100vh-2rem)] w-full flex-col justify-center overflow-hidden bg-[#f3f6fa] transition-colors duration-300 lg:min-h-screen dark:bg-[#0d0f14]"
        id="home"
      >
        {/* Ambient Gradient Background */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-slate-200/50 via-[#f1f4f9]/70 to-slate-200/40 dark:from-[#161a24]/60 dark:via-[#0d0f14]/85 dark:to-[#141822]/50" />

        {/* Subtle Grid Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

        {/* Soft Vignette Gradients */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#f3f6fa]/90 via-[#f3f6fa]/40 to-transparent dark:from-[#0d0f14]/90 dark:via-[#0d0f14]/40 dark:to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#f1f4f9] via-transparent to-[#f3f6fa]/60 dark:from-[#0d0f14] dark:via-transparent dark:to-[#12151d]/40" />

        {/* Hero Content */}
        <div className="z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-6 pt-20 pb-8 sm:px-12 sm:pt-24 sm:pb-10 md:px-16 lg:flex-row lg:gap-12 lg:px-20">
          <div className="flex max-w-2xl flex-col items-start space-y-4 text-left lg:max-w-2xl">
            {/* Category Tagline with WordRotate Animation */}
            <div className="flex h-6 items-center">
              <WordRotate
                words={[
                  'AGENTIC AI & MULTI-AGENT SYSTEMS ENGINEER',
                  'ZERO-HALLUCINATION DETERMINISTIC AI PIPELINES',
                  'LANGGRAPH · CVXPY · REAL-TIME VOICE AGENTS',
                  'QUANTITATIVE FINANCE & PORTFOLIO GOVERNANCE',
                  'FULL-STACK AI DEVELOPER · NEXT.JS 15 · PYTHON',
                ]}
                className="font-mono text-xs font-bold tracking-widest text-slate-800 uppercase sm:text-sm dark:text-neutral-300"
                duration={2600}
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl leading-[1.12] font-extrabold tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-5xl dark:text-white">
              Agentic AI &amp; <br className="hidden sm:inline" />
              <AuroraText
                colors={['#00ffc6', '#3b82f6', '#a855f7', '#ec4899']}
                className="inline-block font-extrabold text-slate-950 dark:text-white"
              >
                Developer.
              </AuroraText>
            </h1>

            {/* Description Subtext with TypingAnimation */}
            <TypingAnimation
              duration={16}
              className="max-w-lg text-left text-xs leading-relaxed font-normal text-slate-700 sm:text-sm md:text-base dark:text-neutral-300"
            >
              Building modular multi-agent AI systems, LangGraph swarms, and real-time voice
              pipelines engineered for zero-hallucination, convex optimization, and production-grade
              agentic intelligence.
            </TypingAnimation>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/documents/resume/kandula_jithendra_subramanyam_resume.pdf"
                download="Kandula_Jithendra_Subramanyam_Resume.pdf"
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white shadow-xl shadow-black/10 transition-all duration-300 hover:scale-105 hover:bg-slate-800 sm:px-6 sm:py-3 sm:text-sm dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-neutral-200"
              >
                <Download className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Download Resume</span>
              </a>

              <a
                href="#projects"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-4 py-2.5 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/90 sm:px-5 sm:py-3 sm:text-sm dark:border-white/15 dark:bg-neutral-900/60 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <span>Explore Projects</span>
              </a>
            </div>
          </div>

          {/* Right Column: Free-Moving 3D Robot Mascot (Completely Unboxed) */}
          <div
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('trigger-robot-love'));
              }
            }}
            className="relative flex min-h-[340px] w-full cursor-pointer items-center justify-center select-none sm:min-h-[400px] lg:min-h-[440px] lg:w-auto lg:flex-1"
          >
            <RobotCanvas
              className="h-[340px] w-full sm:h-[400px] lg:h-[440px]"
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
      <section className="relative overflow-hidden border-y border-slate-300/80 bg-slate-200/50 py-12 transition-colors duration-300 dark:border-white/10 dark:bg-[#12151d]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-200/60 to-transparent sm:w-36 dark:from-[#12151d]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-200/60 to-transparent sm:w-36 dark:from-[#12151d]" />

        <Marquee pauseOnHover className="[--duration:28s] [--gap:4.5rem]">
          {techLogos.map((tech) => (
            <div
              key={tech.name}
              className="flex cursor-pointer items-center gap-3.5 opacity-75 transition-opacity duration-300 hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}`}
                alt={`${tech.name} logo`}
                className="h-7 w-auto object-contain brightness-0 transition-all dark:invert"
                loading="lazy"
              />
              <span className="font-sans text-lg font-bold tracking-tight text-slate-800 sm:text-xl dark:text-white/90">
                {tech.name}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ============================================================ */}
      {/* 3. ABOUT SECTION */}
      {/* ============================================================ */}
      <section
        className="relative mx-auto max-w-7xl px-6 py-20 sm:px-12 sm:py-28 md:px-16 lg:px-20"
        id="about"
      >
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-500">
            <Bot className="size-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Kandula Jithendra Subramanyam
          </h2>
          <p className="max-w-2xl text-base text-slate-500 dark:text-neutral-400">
            {PORTFOLIO_DATA.developer.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Image + Quick Info */}
          <div className="flex flex-col items-center gap-6 lg:col-span-4 lg:items-start">
            <div className="group relative w-full max-w-[280px] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl sm:max-w-xs dark:border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.png"
                alt={PORTFOLIO_DATA.developer.fullName}
                className="aspect-[4/5] h-auto w-full rounded-3xl object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-950/80 px-4 py-1.5 font-mono text-[11px] font-bold tracking-wider text-emerald-300 shadow-lg backdrop-blur-sm">
                ✦ {PORTFOLIO_DATA.developer.status}
              </div>
            </div>

            {/* Contact quick links */}
            <div className="flex w-full max-w-[280px] flex-col gap-2 sm:max-w-xs">
              <a
                href={`mailto:${PORTFOLIO_DATA.developer.email}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:border-slate-400 hover:shadow-md dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-white/20"
              >
                <Mail className="size-3.5 shrink-0 text-slate-500 dark:text-neutral-400" />
                <span className="truncate">{PORTFOLIO_DATA.developer.email}</span>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-300">
                <MapPin className="size-3.5 shrink-0 text-slate-500 dark:text-neutral-400" />
                <span>{PORTFOLIO_DATA.developer.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio + Stats */}
          <div className="relative flex flex-col items-start justify-center gap-8 lg:col-span-8">
            <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

            <div className="relative z-10 space-y-5">
              <p className="text-base leading-[1.85] text-slate-700 sm:text-lg dark:text-neutral-200">
                I am an{' '}
                <strong className="text-slate-950 dark:text-white">
                  Agentic AI &amp; Multi-Agent Systems Engineer
                </strong>{' '}
                pursuing M.Tech in Artificial Intelligence &amp; Data Science at{' '}
                <strong className="text-slate-950 dark:text-white">
                  K J Somaiya College of Engineering, Somaiya Vidyavihar University, Mumbai
                </strong>
                . I design and build modular LangGraph agent swarms, CVXPY convex solvers,
                deterministic regime-switching engines, and real-time WebRTC voice pipelines for
                production-grade agentic intelligence.
              </p>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-neutral-400">
                As first and corresponding author of{' '}
                <strong className="text-slate-800 dark:text-neutral-200">3 research papers</strong>{' '}
                across{' '}
                <strong className="text-slate-800 dark:text-neutral-200">Elsevier EAAI</strong>,{' '}
                <strong className="text-slate-800 dark:text-neutral-200">
                  Elsevier Computers &amp; Operations Research
                </strong>
                , and{' '}
                <strong className="text-slate-800 dark:text-neutral-200">Springer Nature LNCS</strong>
                , I formulate systems where probabilistic language models collaborate with convex
                solvers and bipartite institutional graphs — achieving{' '}
                <strong className="text-emerald-600 dark:text-emerald-400">0% hallucination</strong>{' '}
                over 20-year empirical universes.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="relative z-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {PORTFOLIO_DATA.developer.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/60"
                >
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {stat.value.split(' ')[0]}
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {['LangGraph', 'CVXPY', 'Python', 'Next.js 15', 'LiveKit WebRTC', 'Mistral-7B', 'MongoDB', 'FastAPI'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 font-mono text-[11px] font-semibold text-slate-700 shadow-xs backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. RESEARCH PAPERS & PUBLICATIONS */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-12 md:px-16 lg:px-20" id="research">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end dark:border-[#3c3c3c]">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-slate-700 uppercase dark:text-neutral-400">
              <BookOpen className="size-3.5" />
              <span>Peer-Reviewed Science & Publications</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Research Papers & Manuscripts
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PORTFOLIO_DATA.researchPapers.map((paper, idx) => (
            <MagicCard
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/95 p-7 shadow-md backdrop-blur-xl transition-all hover:border-slate-400 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:shadow-none dark:hover:border-[#4d4d4d]"
            >
              <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-[11px] font-bold text-slate-900 dark:border-[#3c3c3c] dark:bg-[#111111] dark:text-white">
                    {paper.publisher}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <span className="size-2 animate-pulse rounded-full bg-amber-500" />
                    {paper.status}
                  </span>
                </div>

                <h3 className="mb-2 text-xl leading-snug font-bold text-slate-900 dark:text-white">
                  {paper.title}
                </h3>

                {paper.authors && (
                  <p className="mb-2 font-mono text-[11px] text-slate-500 dark:text-neutral-400">
                    <span className="font-semibold text-slate-700 dark:text-neutral-300">
                      Authors:
                    </span>{' '}
                    {paper.authors}
                  </p>
                )}

                {paper.manuscriptId && (
                  <div className="mb-3 inline-block rounded border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
                    Manuscript ID: {paper.manuscriptId}
                  </div>
                )}

                {paper.conferenceLocation && (
                  <div className="mb-3 inline-block rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Venue: {paper.conferenceLocation}
                  </div>
                )}

                <p className="mb-6 text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
                  {paper.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 dark:border-white/5">
                <div>
                  <span className="mb-2 block font-mono text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-neutral-500">
                    Focus Areas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {paper.focusAreas.map((area, aIdx) => (
                      <span
                        key={aIdx}
                        className="rounded border border-slate-200 bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] text-slate-700 dark:border-[#3c3c3c] dark:bg-[#111111] dark:text-neutral-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2 dark:border-white/5">
                  {paperCaseStudyMap[idx] && (
                    <Link
                      href={paperCaseStudyMap[idx]}
                      className="group inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#f12e54] px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#d92244]"
                    >
                      <Layers className="size-3.5" />
                      <span>Explore Case Study</span>
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
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
                      className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-slate-100 px-3.5 py-1.5 font-mono text-xs font-semibold text-slate-800 shadow-xs transition-all hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/15"
                    >
                      <FileText className="size-3.5 transition-transform group-hover:scale-110" />
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
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-12 md:px-16 lg:px-20" id="projects">
        <div className="mb-12 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end dark:border-[#3c3c3c]">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-slate-700 uppercase dark:text-neutral-400">
              <Layers className="size-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Featured AI & Full-Stack Projects
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-[#3c3c3c] dark:bg-[#111111]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border border-slate-800 bg-slate-900 font-bold text-white shadow-sm dark:border-[#4d4d4d] dark:bg-[#1e1e1e] dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-neutral-400 dark:hover:bg-[#1e1e1e]/60 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Bento Grid */}
        <BentoGrid className="auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3">
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
