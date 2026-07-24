import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://w1teen8.github.io/svoi-gastrocafe";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
