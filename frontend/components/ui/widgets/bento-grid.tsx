import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/primitives/button';
import { cn } from '@/lib/shadcn/utils';

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
  venue?: string;
  tags?: string[];
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div className={cn('grid w-full auto-rows-[22rem] grid-cols-3 gap-4', className)} {...props}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  venue,
  tags,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-3 flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl',
      // light styles
      'bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      // dark styles
      'dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]',
      className
    )}
    {...props}
  >
    {/* Full card clickable overlay for instant navigation */}
    <Link href={href} className="absolute inset-0 z-20 cursor-pointer" aria-label={name}>
      <span className="sr-only">{name} - View Project Details</span>
    </Link>

    <div>{background}</div>
    <div className="p-4">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        {venue && (
          <span className="mb-1 inline-block self-start rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200">
            {venue}
          </span>
        )}
        <Icon className="h-10 w-10 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{name}</h3>
        <p className="line-clamp-2 max-w-lg text-xs text-neutral-400 sm:text-sm">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {tags.slice(0, 4).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className={cn(
          'pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden'
        )}
      >
        <Button variant="link" asChild size="sm" className="pointer-events-auto z-30 p-0">
          <Link href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </Link>
        </Button>
      </div>
    </div>

    <div
      className={cn(
        'pointer-events-none absolute bottom-0 z-30 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex'
      )}
    >
      <Button variant="link" asChild size="sm" className="pointer-events-auto p-0">
        <Link href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </Link>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
