import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

const coreRoutes = [
  { path: "", priority: 1.0 },
  { path: "/expertise", priority: 0.9 },
  { path: "/institution", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return coreRoutes.flatMap(({ path, priority }) => {
    const frUrl = `${siteUrl}/fr${path}`;
    const enUrl = `${siteUrl}/en${path}`;

    return locales.map((locale) => ({
      url: locale === "fr" ? frUrl : enUrl,
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: {
        languages: {
          fr: frUrl,
          en: enUrl,
          "x-default": frUrl,
        },
      },
    }));
  });
}
