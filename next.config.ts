import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: true,
  // TypeScript 7 has no programmatic compiler API. The build script runs
  // `tsc --noEmit` before Next.js, so skipping Next's duplicate check is safe.
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
