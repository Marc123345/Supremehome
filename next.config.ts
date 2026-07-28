import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Site photography is now self-hosted under /public/photos (Pexels and
    // Unsplash sources, both licensed for commercial use without attribution).
    // Nothing on the site hotlinks a remote image any more, so no
    // remotePatterns entry is required. Add one here only if the client's
    // photography ends up on an external CDN.
  },
};

export default nextConfig;
