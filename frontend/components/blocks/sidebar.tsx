'use client';

import * as React from 'react';
import { PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({
  children,
  defaultOpen = true,
  className,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>
      <div className={cn('relative flex h-full w-full overflow-hidden', className)}>{children}</div>
    </SidebarContext.Provider>
  );
}

export const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open } = useSidebar();

    return (
      <aside
        ref={ref}
        className={cn(
          'border-border bg-card/60 relative h-full shrink-0 border-r backdrop-blur-sm transition-all duration-300 ease-in-out',
          open ? 'w-60' : 'w-0 overflow-hidden border-r-0 opacity-0',
          className
        )}
        {...props}
      >
        <div className="h-full w-60 overflow-y-auto">{children}</div>
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex h-full scrollbar-thin flex-col overflow-y-auto', className)}
      {...props}
    >
      {children}
    </div>
  );
});
SidebarContent.displayName = 'SidebarContent';

export function SidebarRail({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-border/40 hover:bg-border absolute top-0 right-0 bottom-0 w-1 cursor-col-resize transition-colors',
        className
      )}
    />
  );
}

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(e) => {
        toggleSidebar();
        onClick?.(e);
      }}
      aria-label="Toggle Sidebar"
      {...props}
    >
      <PanelLeft className="size-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';
