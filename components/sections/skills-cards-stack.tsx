'use client';

import * as React from 'react';
import { ContainerScroll, CardSticky } from '@/components/ui/widgets/cards-stack';
import { IconCloud } from '@/components/ui/widgets/icon-cloud';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Cpu, Sparkles, CheckCircle2, Bot, TrendingUp, Terminal, Code2 } from 'lucide-react';

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
  <Bot key="bot" className="size-5 text-indigo-500 dark:text-white" />,
  <TrendingUp key="finance" className="size-5 text-emerald-500 dark:text-white" />,
  <Terminal key="terminal" className="size-5 text-amber-500 dark:text-white" />,
  <Code2 key="code" className="size-5 text-sky-500 dark:text-white" />,
];

const categoryDescriptions = [
  'Architecting autonomous multi-agent swarms, verification guardrails, and deterministic tool-calling workflows for high-stakes decision domains.',
  'Formulating convex portfolio optimization, CVaR loss bounds, market regime classification, and quantitative risk modeling via CVXPY and CLARABEL.',
  'Building high-throughput numerical pipelines, scientific computing routines, deep learning networks, and production database architectures.',
  'Crafting responsive full-stack applications with Next.js 15, sub-500ms WebRTC voice streams, modern CSS architectures, and enterprise APIs.',
];

export function SkillsCardsStack() {
  return (
    <section className="relative py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto" id="skills">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Sticky Title + 3D Interactive Icon Cloud */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4 self-start">
          <div>
            <span className="text-xs font-mono uppercase text-slate-700 dark:text-neutral-400 font-bold flex items-center gap-1.5 mb-2">
              <Cpu className="size-3.5" /> Technical Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Technical Skills &amp; Systems
            </h2>
          </div>

          {/* Borderless Free-Moving 3D Icon Cloud (Centered & Proportioned) */}
          <div className="relative flex w-full items-center justify-center -my-2">
            <IconCloud
              radius={140}
              canvasSize={440}
              showControl={false}
              images={techIcons.map(
                (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
              )}
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
                className="w-full rounded-2xl border border-slate-200 dark:border-[#3c3c3c] bg-white dark:bg-[#181818] p-6 sm:p-8 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all mb-28 last:mb-0"
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 dark:border-[#333333] pb-4 mb-5">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-[#3c3c3c] shadow-sm">
                    {categoryIcons[index % categoryIcons.length]}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-bold block">
                      CORE DISCIPLINE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {category.category}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-6">
                  {categoryDescriptions[index % categoryDescriptions.length]}
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100/90 dark:bg-[#111111]/90 border border-slate-200/80 dark:border-[#2a2a2a] hover:border-slate-400 dark:hover:border-[#4d4d4d] transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <CheckCircle2 className="size-3.5 text-slate-900 dark:text-white shrink-0" />
                        <span className="text-xs font-medium text-slate-800 dark:text-neutral-200 truncate">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#3c3c3c] text-slate-700 dark:text-neutral-300 shrink-0 shadow-2xs">
                        {skill.level}
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
