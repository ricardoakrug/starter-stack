import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.shadcnblocks.com',
        protocol: 'https',
      },
      {
        hostname: 'placehold.co',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
