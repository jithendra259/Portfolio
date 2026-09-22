'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
  icon?: React.ReactNode;
  image?: string;
  category?: 'Professional' | 'Education' | 'Research' | string;
  color?: string;
  badge?: string;
  link?: {
    url: string;
    text: string;
  };
}

interface Timeline3DProps {
  events: TimelineEvent[];
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  accentColor?: string;
  showImages?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

const defaultColors = {
  background: 'bg-transparent',
  primary: 'bg-slate-800 dark:bg-white',
  secondary: 'bg-slate-600 dark:bg-neutral-400',
  text: 'text-slate-900 dark:text-white',
  accent: 'bg-emerald-500',
};

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  primaryColor: string;
  accentColor: string;
  showImages: boolean;
  activeEvent: string | null;
  setActiveEvent: (id: string | null) => void;
  mousePosition: { x: number; y: number };
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  index,
  primaryColor,
  accentColor,
  showImages,
  activeEvent,
  setActiveEvent,
  mousePosition,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;
  const isExpanded = activeEvent === event.id;

  return (
    <motion.div
      ref={ref}
      className={`relative mb-10 w-full md:mb-16 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} flex md:w-1/2 ${
        isEven ? 'md:justify-start' : 'md:justify-end'
      }`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: 'easeOut',
          },
        },
      }}
    >
      {/* Timeline node */}
      <div
        className={`absolute left-6 md:left-auto ${
          isEven ? 'md:left-0' : 'md:right-0'
        } top-0 -translate-x-1/2 transform ${
          isEven ? 'md:-translate-x-1/2' : 'md:translate-x-1/2'
        } z-20`}
      >
        <motion.div
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border-4 border-[#f8fafc] bg-slate-900 text-white shadow-lg transition-transform dark:border-[#000000] dark:bg-white dark:text-black"
          whileHover={{ scale: 1.15 }}
          onClick={() => setActiveEvent(isExpanded ? null : event.id)}
          animate={{
            boxShadow: isExpanded
              ? [
                  '0 0 0 rgba(255,255,255,0.4)',
                  '0 0 15px rgba(255,255,255,0.8)',
                  '0 0 0 rgba(255,255,255,0.4)',
                ]
              : '0 0 0 rgba(255,255,255,0)',
          }}
          transition={{
            repeat: isExpanded ? Infinity : 0,
            duration: 1.5,
          }}
        >
          {event.icon || <span className="font-mono text-xs font-bold">{index + 1}</span>}
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        className={`relative z-10 ml-14 w-[calc(100%-3.5rem)] overflow-hidden rounded-2xl bg-white/95 shadow-lg backdrop-blur-xl hover:shadow-xl md:ml-0 md:w-[calc(100%-2.5rem)] dark:bg-[#1e1e1e] ${
          isEven ? 'md:ml-8' : 'md:mr-8'
        } border border-slate-200 transition-colors dark:border-[#3c3c3c]`}
        whileHover={{
          y: -4,
          transition: { duration: 0.2 },
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateY(${
            mousePosition.x * (isEven ? -2 : 2)
          }deg) rotateX(${mousePosition.y * -2}deg)`,
        }}
        onMouseEnter={() => setActiveEvent(event.id)}
      >
        {showImages && event.image && (
          <div className="group relative h-40 overflow-hidden sm:h-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              initial={{ scale: 1.1 }}
              animate={{
                scale: isExpanded ? 1.05 : 1,
              }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {event.category && (
              <div className="absolute top-3 right-3">
                <span className="rounded-full border border-white/20 bg-black/75 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
                  {event.category}
                </span>
              </div>
            )}

            {event.badge && (
              <div className="absolute bottom-3 left-3">
                <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] font-extrabold tracking-tight text-black dark:bg-white dark:text-black">
                  {event.badge}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold tracking-wider text-slate-700 dark:text-neutral-300">
              {event.date}
            </span>

            <div className="size-2 animate-pulse rounded-full bg-slate-900 dark:bg-white" />
          </div>

          <h3 className="text-lg leading-snug font-bold text-slate-900 sm:text-xl dark:text-white">
            {event.title}
          </h3>

          {event.subtitle && (
            <div className="mt-1 font-mono text-xs text-slate-500 dark:text-neutral-400">
              {event.subtitle}
            </div>
          )}

          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 'auto',
              opacity: 1,
            }}
            className="mt-3 overflow-hidden"
          >
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-neutral-300">
              {event.description}
            </p>

            {event.highlights && event.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 dark:border-[#2a2a2a]">
                {event.highlights.map((h, hIdx) => (
                  <li
                    key={hIdx}
                    className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-neutral-400"
                  >
                    <span className="shrink-0 font-bold text-slate-900 dark:text-white">›</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {event.link && (
              <a
                href={event.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
              >
                <span>{event.link.text}</span>
                <ExternalLink className="size-3" />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-slate-900 dark:bg-white"
          initial={{ width: '0%' }}
          animate={{ width: isExpanded ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

export const Timeline3D: React.FC<Timeline3DProps> = ({
  events,
  backgroundColor = defaultColors.background,
  primaryColor = defaultColors.primary,
  textColor = defaultColors.text,
  accentColor = defaultColors.accent,
  showImages = true,
  className = '',
  title,
  subtitle,
}) => {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      className={`w-full ${backgroundColor} overflow-hidden py-8 ${textColor} ${className}`}
      ref={containerRef}
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Main timeline content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {(title || subtitle) && (
            <div className="mb-12 text-center">
              {subtitle && (
                <span className="mb-2 block font-mono text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-neutral-400">
                  {subtitle}
                </span>
              )}
              {title && (
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  {title}
                </h2>
              )}
            </div>
          )}

          <div className="relative">
            {/* Central line */}
            <div className="absolute left-6 h-full w-[2px] -translate-x-1/2 transform rounded-full bg-slate-300 md:left-1/2 dark:bg-[#3c3c3c]" />

            {/* Timeline events */}
            {events.map((event, index) => (
              <TimelineItem
                key={event.id}
                event={event}
                index={index}
                primaryColor={primaryColor}
                accentColor={accentColor}
                showImages={showImages}
                activeEvent={activeEvent}
                setActiveEvent={setActiveEvent}
                mousePosition={mousePosition}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline3D;
