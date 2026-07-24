import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://w1teen8.github.io/svoi-gastrocafe";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
