import type { NextConfig } from "next";

const repoName = "svoi-gastrocafe";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const basePath = isGithubPagesBuild ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: isGithubPagesBuild ? `/${repoName}/` : "",
  // next/image's src isn't run through the basePath-aware /_next/image route
  // when images are unoptimized (required for static export) — raw <img src>
  // needs the prefix added by hand. Expose it so lib/asset-path.ts can do that.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
