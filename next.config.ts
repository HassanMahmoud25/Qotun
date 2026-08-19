import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "qotun.net", pathname: "/cdn/shop/**" },
    ],
  },
};

export default nextConfig;
