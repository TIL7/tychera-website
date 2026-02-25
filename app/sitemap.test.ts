import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap metadata route", () => {
  it("returns all core localized URLs with alternates", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://tycherainvest.com";

    const entries = sitemap();
    expect(entries).toHaveLength(8);

    const urls = entries.map((entry) => entry.url).sort();
    expect(urls).toEqual(
      [
        "https://tycherainvest.com/en",
        "https://tycherainvest.com/en/contact",
        "https://tycherainvest.com/en/expertise",
        "https://tycherainvest.com/en/institution",
        "https://tycherainvest.com/fr",
        "https://tycherainvest.com/fr/contact",
        "https://tycherainvest.com/fr/expertise",
        "https://tycherainvest.com/fr/institution",
      ].sort()
    );

    entries.forEach((entry) => {
      expect(entry.alternates?.languages?.fr).toBeDefined();
      expect(entry.alternates?.languages?.en).toBeDefined();
      expect(entry.alternates?.languages?.["x-default"]).toBeDefined();
    });
  });
});
