import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/programs/community-engagement`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/programs/resource-distribution`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/programs/technology-amplification`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/donate`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${site.url}/join`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/articles`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articles: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${site.url}/articles/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...articles];
}
