import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { publishedInsights } from "@/lib/content/insights"
import { projects } from "@/lib/content/projects"

/**
 * Sitemap.
 * Only routes that exist and render content are listed — no entries for the
 * blog posts and case studies that used to 404.
 */
// Required by `output: 'export'` — the sitemap is generated at build time.
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ai-systems`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]

  // Only include detail pages that actually exist
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.hasDetailPage)
    .map((p) => ({
      url: `${base}/case-studies/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))

  const insightRoutes: MetadataRoute.Sitemap = publishedInsights.map((i) => ({
    url: `${base}/blog/${i.slug}`,
    lastModified: new Date(i.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...insightRoutes]
}
