// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3000/api/:path*", // backend
  //     },
  //   ];
  // },
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
