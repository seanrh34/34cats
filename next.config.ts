import type { NextConfig } from "next";

// Vercel previews serve from the domain root; the 34cats.com host serves under /seanhardjanto.com.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.VERCEL ? "" : "/seanhardjanto.com");

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  output: "export",
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
