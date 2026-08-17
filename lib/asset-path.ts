/**
 * next/image renders a plain <img src> (not routed through the basePath-aware
 * /_next/image endpoint) whenever images.unoptimized is true — required for
 * static export. On GitHub Pages that means a bare "/images/x.jpg" 404s,
 * since the site actually lives under "/svoi-gastrocafe/". Wrap every local
 * image src passed to next/image with this.
 */
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
}
