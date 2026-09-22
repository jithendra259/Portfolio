'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/primitives/button';
import { cn } from '@/lib/utils';

// Interface for the props of each individual icon.
export interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string; // Used for custom positioning of the icon.
  href?: string;
  title?: string;
}

// Interface for the main hero component's props.
export interface FloatingIconsHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  icons: IconProps[];
  children?: React.ReactNode;
}

// A single icon component with its own motion logic
const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values for the icon's position, with spring physics for smooth movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        // If the cursor is close enough, gently repel, but settle when hovering over so user can easily click
        if (distance < 120 && distance > 40) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          const force = (1 - distance / 120) * 20;
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
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('absolute', iconData.className)}
    >
      {/* Inner wrapper for the continuous floating animation */}
      <motion.div
        className="bg-card/80 border-border/10 group flex h-16 w-16 cursor-pointer items-center justify-center rounded-3xl border p-3 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-emerald-500/40 md:h-20 md:w-20"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + ((index * 3) % 5),
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        title={iconData.title}
        onClick={() => {
          if (iconData.href) {
            if (
              iconData.href.startsWith('mailto:') ||
              iconData.href.startsWith('tel:') ||
              iconData.href.startsWith('sms:')
            ) {
              window.location.href = iconData.href;
            } else {
              window.open(iconData.href, '_blank', 'noopener,noreferrer');
            }
          }
        }}
      >
        {iconData.href ? (
          <a
            href={iconData.href}
            target={
              iconData.href.startsWith('mailto:') ||
              iconData.href.startsWith('tel:') ||
              iconData.href.startsWith('sms:')
                ? undefined
                : '_blank'
            }
            rel="noopener noreferrer"
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <iconData.icon className="text-foreground pointer-events-none h-8 w-8 transition-transform group-hover:scale-110 md:h-10 md:w-10" />
          </a>
        ) : (
          <iconData.icon className="text-foreground pointer-events-none h-8 w-8 transition-transform group-hover:scale-110 md:h-10 md:w-10" />
        )}
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, children, ...props }, ref) => {
  // Refs to track the raw mouse position
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'bg-background relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Container for the background floating icons */}
      <div className="absolute inset-0 h-full w-full">
        {icons.map((iconData, index) => (
          <Icon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
          />
        ))}
      </div>

      {/* Container for the foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="from-foreground to-foreground/70 bg-gradient-to-b bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
          {title}
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg">{subtitle}</p>
        {children && (
          <div className="mt-6 flex w-full flex-col items-center justify-center">{children}</div>
        )}
        {ctaText && ctaHref && (
          <div className="mt-6">
            <Button asChild size="lg" className="px-8 py-6 text-base font-semibold">
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };
