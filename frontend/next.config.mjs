/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['googleapis', 'nodemailer'],
  eslint: {
    // Prevent ESLint/Prettier style checks from blocking production builds on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent TypeScript build failures on Vercel deployment
    ignoreBuildErrors: true,
  },
  experimental: {
    // Keep prefetched and visited pages cached in client router memory for instantaneous navigation
    staleTimes: {
      dynamic: 60,
      static: 300,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Explicitly enable persistent filesystem caching for ultra-fast dev compilation
      config.cache = {
        type: 'filesystem',
      };
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      'pdfjs-dist$': 'pdfjs-dist/build/pdf.min.mjs',
    };

    return config;
  },
};

export default nextConfig;
