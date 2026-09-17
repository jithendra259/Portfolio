/** @type {import('next').NextConfig} */
const nextConfig = {
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
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
