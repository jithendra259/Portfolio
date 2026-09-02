'use client';

import React, { useState } from 'react';
import Timeline3D, { TimelineEvent } from '@/components/ui/3d-interactive-timeline';
import { Briefcase, GraduationCap, Sparkles, Award } from 'lucide-react';

export function CareerEducationTimeline() {
  const [filter, setFilter] = useState<'All' | 'Professional' | 'Education'>('All');

  // Exact chronological timeline events
  const allEvents: TimelineEvent[] = [
    {
      id: 'mtech-ai',
      date: 'Aug 2024 – Apr 2026',
      title: 'M.Tech in Artificial Intelligence & Data Science',
      subtitle: 'K J Somaiya College of Engineering • Mumbai, India',
      badge: 'CGPA: 8.06',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      description:
        'Thesis research on Agentic AI Framework for Stock Portfolio Management. Specialized in Multi-Agent Swarms, Convex Portfolio Optimization (CVXPY/CLARABEL), Market Regime Adaptation, and Explainable AI.',
      highlights: [
        'Authored 2 research papers submitted to Elsevier EAAI and Springer conference proceedings.',
        'Engineered 10+ collaborative agent roles with auditable reasoning and anti-hallucination guardrails.',
      ],
      icon: <GraduationCap className="size-4 text-white dark:text-black" />,
    },
    {
      id: 'thesis-research',
      date: 'Oct 2025 – Apr 2026',
      title: 'Thesis Researcher – Agentic AI Portfolio Governance',
      subtitle: 'K J Somaiya College of Engineering • Mumbai, India',
      badge: 'Thesis & Research',
      category: 'Professional',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=80',
      description:
        'Architected an autonomous multi-agent quantitative financial system with CVXPY convex solvers, real-time instability detection, and compliance-aware validation.',
      highlights: [
        'Built full verification pipeline combining Mistral-7B, LangGraph, MongoDB, and NetworkX.',
        'Pioneered explainable governance audit logging for institutional portfolio risk management.',
      ],
      icon: <Briefcase className="size-4 text-white dark:text-black" />,
    },
    {
      id: 'scholarrank-ai',
      date: 'May 2025 – Aug 2025',
      title: 'Full-Stack Developer Intern',
      subtitle: 'ScholarRankAI • Remote',
      badge: 'Production Systems',
      category: 'Professional',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      description:
        'Engineered responsive React interfaces and integrated high-throughput REST APIs for production enterprise workflows.',
      highlights: [
        'Optimized frontend performance, removing rendering bottlenecks across application screens.',
        'Collaborated in Agile sprints, automated CI/CD checks, and production code reviews.',
      ],
      icon: <Briefcase className="size-4 text-white dark:text-black" />,
    },
    {
      id: 'mnj-software',
      date: 'Mar 2024 – May 2024',
      title: 'UI/UX Developer Intern',
      subtitle: 'MNJ Software Pvt. Ltd. • India',
      badge: 'Frontend Engineering',
      category: 'Professional',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      description:
        'Translated complex UI/UX designs and wireframes into highly optimized, accessible frontend components.',
      highlights: [
        'Improved page-load performance by 25% and boosted active engagement metrics by 15%.',
        'Ensured full responsive cross-browser compatibility and seamless API integrations.',
      ],
      icon: <Briefcase className="size-4 text-white dark:text-black" />,
    },
    {
      id: 'gate-2024',
      date: 'Feb 2024',
      title: 'GATE 2024 Examination (AI & CS)',
      subtitle: 'IIT Organizing Institute • National Qualification',
      badge: 'National Ranker',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
      description:
        'Demonstrated strong theoretical, mathematical, and algorithmic mastery in national-level Graduate Aptitude Test in Engineering.',
      highlights: [
        'GATE AI & Data Science: Score 33.3',
        'GATE Computer Science: Score 23.2',
        'Demonstrated expertise in Probability, Linear Algebra, Machine Learning & Algorithms.',
      ],
      icon: <Award className="size-4 text-white dark:text-black" />,
    },
    {
      id: 'btech-ece',
      date: 'Aug 2019 – Jul 2023',
      title: 'B.Tech in Electronics & Communication Engineering',
      subtitle: 'Presidency University • Bangalore, India',
      badge: 'CGPA: 7.77',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      description:
        'Rigorous engineering foundation in signal processing, embedded systems, microcontrollers, and IoT sensor networks.',
      highlights: [
        'Capstone Project: Swarm Robots for Agriculture — autonomous multi-robot coordination with computer vision.',
        'Developed foundational programming expertise in Python, C, data structures, and embedded robotics.',
      ],
      icon: <GraduationCap className="size-4 text-white dark:text-black" />,
    },
    {
      id: 'jee-mains-2019',
      date: 'Jan – Apr 2019',
      title: 'JEE Mains 2019 Examination',
      subtitle: 'National Testing Agency (NTA)',
      badge: '85.6 Percentile',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      description:
        'Secured competitive 85.6 Percentile in the Joint Entrance Examination (Main), testing nationwide aptitude in advanced Mathematics, Physics, and Chemistry.',
      highlights: [
        '85.6 Percentile nationwide standing.',
        'Demonstrated rapid analytical reasoning and complex mathematical problem solving.',
      ],
      icon: <Award className="size-4 text-white dark:text-black" />,
    },
    {
      id: 'intermediate-mpc',
      date: 'Jun 2017 – Jun 2019',
      title: 'Higher Secondary / Intermediate (MPC)',
      subtitle: 'Sri Chaitanya Junior College • India',
      badge: 'CGPA: 9.28',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
      description:
        'Intensive focus on Mathematics, Physics, and Chemistry, laying theoretical foundations for quantitative modeling, calculus, and algorithms.',
      highlights: [
        'Graduated with 9.28 CGPA distinction.',
        'Demonstrated strong analytical problem-solving foundation leading to top engineering admissions.',
      ],
      icon: <GraduationCap className="size-4 text-white dark:text-black" />,
    },
    {
      id: 'school-ssc',
      date: 'Jun 2016 – Jun 2017',
      title: '10th Grade (SSC) - Secondary School Certificate',
      subtitle: 'T V N R M National High School • India',
      badge: 'CGPA: 9.5 / 10.0',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
      description:
        'Completed secondary schooling with High Academic Distinction (9.5 CGPA), excelling in mathematics, sciences, and foundational computing.',
      highlights: [
        'Academic distinction with 9.5 / 10.0 CGPA.',
        'Active participant in science exhibitions and mathematics Olympiads.',
      ],
      icon: <GraduationCap className="size-4 text-white dark:text-black" />,
    },
  ];

  const filteredEvents =
    filter === 'All' ? allEvents : allEvents.filter((ev) => ev.category === filter);

  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto" id="experience">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-xs font-mono uppercase text-slate-600 dark:text-neutral-400 font-bold tracking-widest flex items-center gap-1.5 mb-2">
          <Sparkles className="size-3.5" /> Chronological Journey
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Experience &amp; Education
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mt-3">
          Interactive 3D timeline tracking engineering milestones, academic degrees, national exam benchmarks, and research breakthroughs.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-slate-200/80 dark:bg-[#1e1e1e] border border-slate-300 dark:border-[#3c3c3c] mt-8 backdrop-blur-md">
          {(['All', 'Professional', 'Education'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-md'
                  : 'text-slate-700 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {tab === 'All' ? 'All Milestones' : tab === 'Professional' ? 'Career & Research' : 'Academic & Exams'}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Interactive Timeline */}
      <Timeline3D events={filteredEvents} />
    </section>
  );
}

export default CareerEducationTimeline;
