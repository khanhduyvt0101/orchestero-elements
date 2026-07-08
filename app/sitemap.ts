import type { MetadataRoute } from "next"

import { registryStyles } from "@/lib/registry-styles"
import siteConfig from "@/site.config.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...registryStyles.map((style) => ({
      url: `${siteConfig.url}${style.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: style.status === "available" ? 0.9 : 0.6,
    })),
    {
      url: `${siteConfig.url}/r/styles/default/registry.json`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]
}
