import { afterEach, beforeEach, describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots metadata route", () => {
  const originalVercelEnv = process.env.VERCEL_ENV;
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://tycherainvest.com";
  });

  afterEach(() => {
    if (originalVercelEnv === undefined) {
      delete process.env.VERCEL_ENV;
    } else {
      process.env.VERCEL_ENV = originalVercelEnv;
    }

    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  });

  it("allows crawling in production", () => {
    process.env.VERCEL_ENV = "production";
    const metadata = robots();

    const firstRule = Array.isArray(metadata.rules) ? metadata.rules[0] : metadata.rules;
    expect(firstRule).toBeDefined();
    expect(firstRule?.allow).toBe("/");
    expect(firstRule?.disallow).toEqual(["/studio", "/c/", "/api/"]);
    expect(metadata.sitemap).toBe("https://tycherainvest.com/sitemap.xml");
  });

  it("disallows crawling outside production", () => {
    process.env.VERCEL_ENV = "preview";
    const metadata = robots();

    const firstRule = Array.isArray(metadata.rules) ? metadata.rules[0] : metadata.rules;
    expect(firstRule).toBeDefined();
    expect(firstRule?.disallow).toBe("/");
    expect(metadata.sitemap).toBe("https://tycherainvest.com/sitemap.xml");
  });
});
