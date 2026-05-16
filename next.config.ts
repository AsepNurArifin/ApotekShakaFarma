import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yipcujocjnbqgqrjsiut.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
