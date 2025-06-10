import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // other config options here if needed
  images: {
    domains: [
      "images.stockx.com",
      "stockx-assets.imgix.net",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
