import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.join(__dirname, "..", "..");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@holder-v-holder/sdk", "@holder-v-holder/shared"],
  eslint: { ignoreDuringBuilds: true },
  outputFileTracingRoot: monorepoRoot,
};

export default nextConfig;
