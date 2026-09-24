import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import 'katex/dist/katex.min.css';
import { APP_CONFIG_DEFAULTS } from '@/app-config';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Toaster } from '@/components/ui/primitives/sonner';
import { NetworkErrorTV } from '@/components/ui/widgets/network-error-tv';
import { App as VoiceAgentApp } from '@/components/voice-agent/app';
import { cn } from '@/lib/shadcn/utils';
import { getStyles } from '@/lib/utils';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-rose-beta-11.vercel.app'
  ),
  title: 'Kandula Jithendra Subramanyam | Agentic AI Developer',
  description:
    'Agentic AI & Multi-Agent Systems Developer — M.Tech AI & Data Science researcher. Builder of LangGraph swarms, CVXPY solvers, and real-time WebRTC voice pipelines. Author of 3 research papers (Elsevier EAAI, Springer LNCS).',
  openGraph: {
    title: 'Kandula Jithendra Subramanyam | Agentic AI Developer',
    description:
      'Agentic AI & Multi-Agent Systems Developer — LangGraph swarms, CVXPY solvers, real-time voice pipelines. 3 research papers (Elsevier EAAI, Springer LNCS).',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-rose-beta-11.vercel.app',
    siteName: 'Jithendra Subramanyam Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kandula Jithendra Subramanyam | Agentic AI Developer',
    description:
      'Agentic AI & Multi-Agent Systems Developer — LangGraph swarms, CVXPY solvers, real-time voice pipelines.',
  },
};

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
});

const commitMono = localFont({
  display: 'swap',
  variable: '--font-commit-mono',
  src: [
    {
      path: '../fonts/CommitMono-400-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/CommitMono-700-Regular.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/CommitMono-400-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/CommitMono-700-Italic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const appConfig = APP_CONFIG_DEFAULTS;
  const styles = getStyles(appConfig);
  const { pageTitle, pageDescription } = appConfig;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        publicSans.variable,
        commitMono.variable,
        'scroll-smooth font-sans antialiased'
      )}
    >
      <head>
        {styles && <style>{styles}</style>}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </head>
      <body suppressHydrationWarning className="overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <VoiceAgentApp appConfig={APP_CONFIG_DEFAULTS}>{children}</VoiceAgentApp>
          <NetworkErrorTV />
          <Toaster position="top-center" />
          <div className="group fixed bottom-0 left-1/2 z-50 mb-2 -translate-x-1/2">
            <ThemeToggle className="translate-y-20 transition-transform delay-150 duration-300 group-hover:translate-y-0" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
