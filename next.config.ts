import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/seanhardjanto.com";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
