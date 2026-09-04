'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Mail,
  Phone,
  Send,
  Linkedin,
  Github,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight,
  Bot,
  Zap,
  MessageSquare,
  CheckCircle2,
  Copy,
  type LucideIcon,
} from 'lucide-react';
import { EmailRevealButton } from '@/components/ui/email-reveal-button';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

// Floating decorative badge with mouse repulsion and gentle floating motion
interface FloatingBadgeProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  className: string;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  delay?: number;
  href?: string;
}

const FloatingBadge = ({
  icon: Icon,
  label,
  sublabel,
  className,
  mouseX,
  mouseY,
  delay = 0,
  href,
}: FloatingBadgeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22 });
  const springY = useSpring(y, { stiffness: 260, damping: 22 });

  useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX.current - centerX, 2) + Math.pow(mouseY.current - centerY, 2)
        );

        if (distance < 160) {
          const angle = Math.atan2(mouseY.current - centerY, mouseX.current - centerX);
          const force = (1 - distance / 160) * 38;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, x, y]);

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className={cn('absolute pointer-events-auto select-none hidden lg:block z-20', className)}
    >
      <motion.div
        animate={{
          y: [0, -6, 0, 6, 0],
          rotate: [0, 1.5, 0, -1.5, 0],
        }}
        transition={{
          duration: 4.5 + delay * 0.8,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-[#141414]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/40 hover:scale-105 hover:border-emerald-500/40 transition-all cursor-pointer group"
      >
        <div className="size-7 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-slate-800 dark:text-neutral-200 group-hover:text-emerald-500 transition-colors">
          <Icon className="size-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[11px] font-semibold text-slate-800 dark:text-neutral-200 leading-tight flex items-center gap-1">
            {label}
            {href && <ArrowUpRight className="size-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />}
          </div>
          {sublabel && (
            <div className="text-[9px] font-mono text-slate-400 dark:text-neutral-500">
              {sublabel}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // Time state for live clock
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-28 px-4 sm:px-8 max-w-5xl mx-auto overflow-hidden text-center"
      id="contact"
    >
      {/* Dynamic Animated Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.28, 0.15],
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-12 left-1/4 size-96 rounded-full bg-gradient-to-tr from-cyan-500/30 to-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.12, 0.25, 0.12],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-16 right-1/4 size-96 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/20 blur-3xl"
        />
      </div>

      {/* Floating Interactive Repulsion Badges around the Contact Card */}
      <FloatingBadge
        icon={Github}
        label="GitHub Repository"
        sublabel="jithendra259"
        href={PORTFOLIO_DATA.developer.socials.github}
        className="top-12 -left-4 xl:-left-10"
        mouseX={mouseX}
        mouseY={mouseY}
        delay={1}
      />
      <FloatingBadge
        icon={Bot}
        label="Autonomous Swarms"
        sublabel="LangGraph & CrewAI"
        className="top-1/2 -translate-y-1/2 -left-8 xl:-left-14"
        mouseX={mouseX}
        mouseY={mouseY}
        delay={2}
      />
      <FloatingBadge
        icon={Clock}
        label="Response Time"
        sublabel="Usually < 2 hours"
        className="bottom-12 -left-4 xl:-left-10"
        mouseX={mouseX}
        mouseY={mouseY}
        delay={3}
      />
      <FloatingBadge
        icon={Linkedin}
        label="LinkedIn Profile"
        sublabel="jithendra-subramanyam"
        href={PORTFOLIO_DATA.developer.socials.linkedin}
        className="top-12 -right-4 xl:-right-10"
        mouseX={mouseX}
        mouseY={mouseY}
        delay={1.5}
      />
      <FloatingBadge
        icon={Zap}
        label="Quant & Optimizers"
        sublabel="CVXPY Convex Solvers"
        className="top-1/2 -translate-y-1/2 -right-8 xl:-right-14"
        mouseX={mouseX}
        mouseY={mouseY}
        delay={2.5}
      />
      <FloatingBadge
        icon={MapPin}
        label="Location"
        sublabel="India • Remote & Relocate"
        className="bottom-12 -right-4 xl:-right-10"
        mouseX={mouseX}
        mouseY={mouseY}
        delay={3.5}
      />

      {/* Central Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-white/90 via-white/80 to-slate-50/90 dark:from-[#111111]/90 dark:via-[#0e0e0e]/80 dark:to-[#080808]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-2xl shadow-slate-900/5 dark:shadow-black/50 overflow-hidden"
      >
        {/* Animated Card Border Glow Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Top Status & Live Clock Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-slate-200/60 dark:border-white/5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            <span>AVAILABLE FOR SELECT COLLABORATIONS</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400">
            <Clock className="size-3.5 text-emerald-500 animate-spin-slow" />
            <span>IST (UTC+5:30):</span>
            <span className="font-semibold text-slate-900 dark:text-neutral-200">
              {timeString || 'Loading...'}
            </span>
          </div>
        </div>

        {/* Section Heading with Animated Gradient Text */}
        <div className="space-y-4 pt-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white"
          >
            Let&apos;s Build Next-Gen AI Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            Open for Agentic AI, Multi-Agent Swarms, Quantitative Research, and Full-Stack Engineering roles.
            Have a project in mind or want to talk tech? Let&apos;s connect!
          </motion.p>
        </div>

        {/* Cyberpunk Email Reveal & Copy Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="py-6 flex justify-center"
        >
          <EmailRevealButton
            name={PORTFOLIO_DATA.developer.fullName}
            email={PORTFOLIO_DATA.developer.email}
          />
        </motion.div>

        {/* Interactive Action Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          {/* Direct Phone Call Button */}
          <a
            href={`tel:${PORTFOLIO_DATA.developer.phone}`}
            className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wide shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span className="flex size-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
            <Phone className="size-3.5 transition-transform group-hover:rotate-12" />
            <span>{PORTFOLIO_DATA.developer.phone}</span>
          </a>

          {/* Send Direct Email */}
          <a
            href={`mailto:${PORTFOLIO_DATA.developer.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#1c1c1c] text-slate-800 dark:text-white border border-slate-200 dark:border-neutral-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-neutral-800/80 font-medium text-xs tracking-wide shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <Send className="size-3.5 text-emerald-500" />
            <span>Send Email</span>
          </a>

          {/* LinkedIn Connect */}
          <a
            href={PORTFOLIO_DATA.developer.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#1c1c1c] text-slate-800 dark:text-white border border-slate-200 dark:border-neutral-800 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-neutral-800/80 font-medium text-xs tracking-wide shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <Linkedin className="size-3.5 text-blue-500" />
            <span>LinkedIn</span>
            <ArrowUpRight className="size-3 opacity-60" />
          </a>

          {/* GitHub Follow */}
          <a
            href={PORTFOLIO_DATA.developer.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#1c1c1c] text-slate-800 dark:text-white border border-slate-200 dark:border-neutral-800 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-neutral-800/80 font-medium text-xs tracking-wide shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <Github className="size-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="size-3 opacity-60" />
          </a>
        </motion.div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-10 pt-6 border-t border-slate-200/50 dark:border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Verified Credentials</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-amber-500" />
            <span>Fast Turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bot className="size-3.5 text-cyan-500" />
            <span>Autonomous AI Architecture</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
