import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.shadcnblocks.com",
      },
    ],
  },
};

export default nextConfig;
