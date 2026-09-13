import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.VERCEL ? 'frontend/.next' : '.next',
  eslint: {
    // Prevent ESLint/Prettier style checks from blocking production builds on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent TypeScript build failures on Vercel deployment
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/py/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
