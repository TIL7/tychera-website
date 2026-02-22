import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

const pages = [
  { path: "", priority: 1.0 },
  { path: "/expertise", priority: 0.9 },
  { path: "/institution", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // French (default locale)
    entries.push({
      url: `${SITE_URL}/fr${page.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: page.priority,
      alternates: {
        languages: {
          fr: `${SITE_URL}/fr${page.path}`,
          en: `${SITE_URL}/en${page.path}`,
        },
      },
    });

    // English
    entries.push({
      url: `${SITE_URL}/en${page.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: page.priority,
      alternates: {
        languages: {
          fr: `${SITE_URL}/fr${page.path}`,
          en: `${SITE_URL}/en${page.path}`,
        },
      },
    });
  }

  return entries;
}
