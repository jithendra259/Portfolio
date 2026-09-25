'use client';

import { Bot, CheckCircle2, Code2, Cpu, Mic, Network, Sparkles, Terminal, TrendingUp } from 'lucide-react';
import { CardSticky, ContainerScroll } from '@/components/ui/widgets/cards-stack';
import { IconCloud } from '@/components/ui/widgets/icon-cloud';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

const techIcons = [
  'typescript',
  'javascript',
  'python',
  'react',
  'nextdotjs',
  'pytorch',
  'fastapi',
  'docker',
  'git',
  'github',
  'visualstudiocode',
  'tailwindcss',
  'postgresql',
  'redis',
  'mongodb',
  'vercel',
  'linux',
  'webrtc',
  'openai',
  'huggingface',
  'langchain',
  'pandas',
  'numpy',
  'scipy',
];

const categoryIcons = [
  <Sparkles key="ai-research" className="size-5 text-indigo-500 dark:text-white" />,
  <TrendingUp key="finance" className="size-5 text-emerald-500 dark:text-white" />,
  <Bot key="agentic-llm" className="size-5 text-purple-500 dark:text-white" />,
  <Mic key="voice" className="size-5 text-rose-500 dark:text-white" />,
  <Network key="graph" className="size-5 text-cyan-500 dark:text-white" />,
  <Terminal key="terminal" className="size-5 text-amber-500 dark:text-white" />,
  <Code2 key="code" className="size-5 text-sky-500 dark:text-white" />,
];

const categoryDescriptions = [
  'Pioneering artificial intelligence, deep learning architectures, multi-agent reasoning systems, and verifiable retrieval pipelines.',
  'Formulating convex portfolio optimization, CVaR loss bounds, market regime classification, and quantitative risk modeling via CVXPY and CLARABEL.',
  'Orchestrating autonomous agents with LangGraph, Groq LPU inference, local Mistral models, persistent memory, and audit logging.',
  'Building sub-500ms conversational voice streaming pipelines over LiveKit WebRTC with Deepgram STT and ElevenLabs TTS.',
  'Designing convex optimization solvers (CVXPY / CLARABEL), graph-regularized networks, and structural financial reasoning with NetworkX.',
  'Developing robust numerical pipelines, scientific computing routines, and production database architectures.',
  'Crafting responsive full-stack applications with Next.js, modern TypeScript, RESTful services, and enterprise APIs.',
];

export function SkillsCardsStack() {
  return (
    <section
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-12 md:px-16 lg:px-20"
      id="skills"
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Left Column: Sticky Title + 3D Interactive Icon Cloud */}
        <div className="space-y-4 self-start lg:sticky lg:top-24 lg:col-span-5">
          <div>
            <span className="mb-2 flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700 uppercase dark:text-neutral-400">
              <Cpu className="size-3.5" /> Technical Disciplines
            </span>
            <h2 className="text-3xl leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
              Technical Skills &amp; Systems
            </h2>
          </div>

          {/* Borderless Free-Moving 3D Icon Cloud (Centered & Proportioned) */}
          <div className="relative -my-2 flex w-full items-center justify-center">
            <IconCloud
              radius={140}
              canvasSize={440}
              showControl={false}
              images={techIcons.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)}
            />
          </div>
        </div>

        {/* Right Column: Sticky 3D Stacking Skill Cards */}
        <div className="lg:col-span-7">
          <ContainerScroll className="pb-32">
            {PORTFOLIO_DATA.skillCategories.map((category, index) => (
              <CardSticky
                key={category.category}
                index={index}
                topOffset={100}
                incrementY={32}
                incrementZ={16}
                className="mb-28 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl backdrop-blur-2xl transition-all last:mb-0 sm:p-8 dark:border-[#3c3c3c] dark:bg-[#181818] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              >
                {/* Card Header */}
                <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-[#333333]">
                  <div className="rounded-xl border border-slate-200 bg-slate-100 p-2 shadow-sm dark:border-[#3c3c3c] dark:bg-[#111111]">
                    {categoryIcons[index % categoryIcons.length]}
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-neutral-400">
                      CORE DISCIPLINE
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                      {category.category}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-neutral-300">
                  {categoryDescriptions[index % categoryDescriptions.length]}
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-100/90 p-2.5 transition-colors hover:border-slate-400 dark:border-[#2a2a2a] dark:bg-[#111111]/90 dark:hover:border-[#4d4d4d]"
                    >
                      <CheckCircle2 className="size-3.5 shrink-0 text-slate-900 dark:text-white" />
                      <span className="truncate text-xs font-medium text-slate-800 dark:text-neutral-200">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}

export default SkillsCardsStack;
