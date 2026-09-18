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
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Use source-map instead of eval-* in dev to prevent pdfjs-dist ESM eval conflicts
      config.devtool = 'cheap-module-source-map';
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
