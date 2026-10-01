import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's Image Optimization API has proven unreliable in production for
    // this project (confirmed: /_next/image requests for local /public assets
    // failed in production while the Shopify CDN originals kept loading fine).
    // Disabling it globally means no image on the site depends on that API's
    // availability/quota — see src/components/cdn-image.tsx.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "qotun.net", pathname: "/cdn/shop/**" },
    ],
  },
};

export default nextConfig;
