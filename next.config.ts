import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography lives on Unsplash until the client's own
    // job photos and drone footage are supplied. Add their CDN host here
    // when that happens.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
