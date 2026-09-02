'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
      className={`relative mb-12 md:mb-16 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 flex ${
        isEven ? 'md:justify-start' : 'md:justify-end'
      }`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: isEven ? 40 : -40,
          y: 20,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
          },
        },
      }}
    >
      {/* Timeline node */}
      <div
        className={`absolute left-1/2 md:left-auto ${
          isEven ? 'md:left-0' : 'md:right-0'
        } top-0 transform -translate-x-1/2 ${
          isEven ? 'md:-translate-x-1/2' : 'md:translate-x-1/2'
        } z-20`}
      >
        <motion.div
          className="size-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center border-4 border-[#f8fafc] dark:border-[#000000] cursor-pointer shadow-lg transition-transform"
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
          {event.icon || (
            <span className="font-bold text-xs font-mono">
              {index + 1}
            </span>
          )}
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        className={`relative z-10 bg-white/95 dark:bg-[#1e1e1e] backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-xl w-full md:w-[calc(100%-2.5rem)] ${
          isEven ? 'md:ml-8' : 'md:mr-8'
        } border border-slate-200 dark:border-[#3c3c3c] transition-colors`}
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
          <div className="relative h-40 sm:h-44 overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
                <span className="bg-black/75 backdrop-blur-md border border-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
                  {event.category}
                </span>
              </div>
            )}

            {event.badge && (
              <div className="absolute bottom-3 left-3">
                <span className="bg-white text-black dark:bg-white dark:text-black px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold tracking-tight">
                  {event.badge}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-neutral-300">
              {event.date}
            </span>
            
            <div className="size-2 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {event.title}
          </h3>

          {event.subtitle && (
            <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 mt-1">
              {event.subtitle}
            </div>
          )}
          
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 'auto',
              opacity: 1,
            }}
            className="overflow-hidden mt-3"
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              {event.description}
            </p>

            {event.highlights && event.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5 border-t border-slate-100 dark:border-[#2a2a2a] pt-3">
                {event.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="text-xs text-slate-600 dark:text-neutral-400 flex items-start gap-1.5">
                    <span className="text-slate-900 dark:text-white font-bold shrink-0">›</span>
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
                className="inline-flex items-center gap-1.5 mt-4 px-3.5 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
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
      className={`w-full ${backgroundColor} py-8 overflow-hidden ${textColor} ${className}`}
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Main timeline content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {subtitle && (
                <span className="text-xs font-mono uppercase text-slate-600 dark:text-neutral-400 font-bold tracking-widest block mb-2">
                  {subtitle}
                </span>
              )}
              {title && (
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h2>
              )}
            </div>
          )}

          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-slate-300 dark:bg-[#3c3c3c] rounded-full" />

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
