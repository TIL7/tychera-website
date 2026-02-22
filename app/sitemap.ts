import type { MetadataRoute } from "next";

const pages = [
  { path: "", priority: 1.0 },
  { path: "/expertise", priority: 0.9 },
  { path: "/institution", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com";
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // French (default locale)
    entries.push({
      url: `${baseUrl}/fr${page.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: page.priority,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr${page.path}`,
          en: `${baseUrl}/en${page.path}`,
        },
      },
    });

    // English
    entries.push({
      url: `${baseUrl}/en${page.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: page.priority,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr${page.path}`,
          en: `${baseUrl}/en${page.path}`,
        },
      },
    });
  }

  return entries;
}
