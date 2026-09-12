import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Prevent ESLint/Prettier style checks from blocking production builds on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Typecheck is verified in CI / local verification
    ignoreBuildErrors: false,
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
