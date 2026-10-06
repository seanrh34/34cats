import type { NextConfig } from "next";

// The site is served from the domain root by default; NEXT_PUBLIC_BASE_PATH can set a sub-path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  output: "export",
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
