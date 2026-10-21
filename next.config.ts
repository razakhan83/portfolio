import type { NextConfig } from "next";
import * as dns from "node:dns";

try {
  const setServers =
    dns.setServers ?? (dns as unknown as { default?: { setServers?: typeof dns.setServers } }).default?.setServers;
  if (typeof setServers === "function") {
    setServers(["8.8.8.8", "1.1.1.1"]);
  }
} catch {
  // Ignore if not supported
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
