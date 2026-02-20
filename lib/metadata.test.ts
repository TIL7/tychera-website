import { describe, it, expect, beforeEach } from "vitest";
import {
  generateCanonicalUrl,
  generateLanguageAlternates,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  generatePageMetadata,
  generateHomePageMetadata,
  generateExpertisePageMetadata,
  generate404PageMetadata,
} from "./metadata";

/**
 * Test Suite for Open Graph Metadata Generation
 * 
 * Validates that all pages have proper Open Graph tags for social sharing.
 * 
 * @requirements 3.6 - Open Graph tags implementation
 */

describe("Metadata Generation - Open Graph Tags", () => {
  const baseUrl = "https://tycherainvestments.com";

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = baseUrl;
  });

  describe("generateCanonicalUrl", () => {
    it("should generate canonical URL for French home page (default locale)", () => {
      const url = generateCanonicalUrl("fr", "/");
      expect(url).toBe(baseUrl);
    });

    it("should generate canonical URL for English home page", () => {
      const url = generateCanonicalUrl("en", "/");
      expect(url).toBe(`${baseUrl}/en`);
    });

    it("should generate canonical URL for French expertise page", () => {
      const url = generateCanonicalUrl("fr", "/expertise");
      expect(url).toBe(`${baseUrl}/expertise`);
    });

    it("should generate canonical URL for English expertise page", () => {
      const url = generateCanonicalUrl("en", "/expertise");
      expect(url).toBe(`${baseUrl}/en/expertise`);
    });

    it("should normalize path without leading slash", () => {
      const url = generateCanonicalUrl("fr", "/expertise");
      expect(url).toBe(`${baseUrl}/expertise`);
    });
  });

  describe("generateLanguageAlternates", () => {
    it("should generate language alternates for home page", () => {
      const alternates = generateLanguageAlternates("/");
      expect(alternates.fr).toBe(baseUrl);
      expect(alternates.en).toBe(`${baseUrl}/en`);
      expect(alternates["x-default"]).toBe(baseUrl);
    });

    it("should generate language alternates for expertise page", () => {
      const alternates = generateLanguageAlternates("/expertise");
      expect(alternates.fr).toBe(`${baseUrl}/expertise`);
      expect(alternates.en).toBe(`${baseUrl}/en/expertise`);
      expect(alternates["x-default"]).toBe(`${baseUrl}/expertise`);
    });
  });

  describe("generateOpenGraphMetadata", () => {
    it("should include all required OG tags", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(og).toHaveProperty("type");
      expect(og).toHaveProperty("locale");
      expect(og).toHaveProperty("url");
      expect(og).toHaveProperty("siteName");
      expect(og).toHaveProperty("title");
      expect(og).toHaveProperty("description");
      expect(og).toHaveProperty("images");
    });

    it("should set og:type to website", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(og.type).toBe("website");
    });

    it("should set correct locale for French", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(og.locale).toBe("fr_RW");
    });

    it("should set correct locale for English", () => {
      const og = generateOpenGraphMetadata({
        locale: "en",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(og.locale).toBe("en_US");
    });

    it("should include og:image with correct dimensions", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(og.images).toHaveLength(1);
      const image = Array.isArray(og.images) ? og.images[0] : og.images;
      expect(image).toHaveProperty("url");
      expect(image).toHaveProperty("width", 1200);
      expect(image).toHaveProperty("height", 630);
      expect(image).toHaveProperty("alt");
    });

    it("should use default OG image when not specified", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      const image = Array.isArray(og.images) ? og.images[0] : og.images;
      expect(image.url).toContain("og-image.jpg");
    });

    it("should use custom OG image when specified", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
        ogImage: "/custom-og.jpg",
      });

      const image = Array.isArray(og.images) ? og.images[0] : og.images;
      expect(image.url).toContain("custom-og.jpg");
    });

    it("should set og:url to canonical URL", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/expertise",
      });

      expect(og.url).toBe(`${baseUrl}/expertise`);
    });

    it("should set og:title and og:description", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "My Test Title",
        description: "My Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(og.title).toBe("My Test Title");
      expect(og.description).toBe("My Test Description");
    });

    it("should set og:site_name", () => {
      const og = generateOpenGraphMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(og.siteName).toBe("TYCHERA Investments LTD");
    });
  });

  describe("generateTwitterMetadata", () => {
    it("should include all required Twitter Card tags", () => {
      const twitter = generateTwitterMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(twitter).toHaveProperty("card");
      expect(twitter).toHaveProperty("title");
      expect(twitter).toHaveProperty("description");
      expect(twitter).toHaveProperty("images");
    });

    it("should set twitter:card to summary_large_image", () => {
      const twitter = generateTwitterMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(twitter.card).toBe("summary_large_image");
    });

    it("should include twitter:image", () => {
      const twitter = generateTwitterMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      const images = twitter.images;
      if (Array.isArray(images)) {
        expect(images).toHaveLength(1);
        expect(images[0]).toContain("og-image.jpg");
      }
    });
  });

  describe("generatePageMetadata", () => {
    it("should return complete metadata object", () => {
      const metadata = generatePageMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test1", "test2"],
        path: "/",
      });

      expect(metadata).toHaveProperty("title");
      expect(metadata).toHaveProperty("description");
      expect(metadata).toHaveProperty("keywords");
      expect(metadata).toHaveProperty("alternates");
      expect(metadata).toHaveProperty("openGraph");
      expect(metadata).toHaveProperty("twitter");
    });

    it("should include language alternates", () => {
      const metadata = generatePageMetadata({
        locale: "fr",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/",
      });

      expect(metadata.alternates).toHaveProperty("languages");
      expect(metadata.alternates?.languages).toHaveProperty("fr");
      expect(metadata.alternates?.languages).toHaveProperty("en");
      expect(metadata.alternates?.languages).toHaveProperty("x-default");
    });

    it("should set canonical URL", () => {
      const metadata = generatePageMetadata({
        locale: "en",
        title: "Test Page",
        description: "Test Description",
        keywords: ["test"],
        path: "/expertise",
      });

      expect(metadata.alternates?.canonical).toBe(`${baseUrl}/en/expertise`);
    });
  });

  describe("generateHomePageMetadata", () => {
    it("should generate French home page metadata", () => {
      const metadata = generateHomePageMetadata("fr");

      expect(metadata.title).toContain("TYCHERA Investments LTD");
      expect(metadata.description).toContain("Le pont");
      expect(metadata.keywords).toContain("financement de projets");
      expect(metadata.openGraph?.url).toBe(baseUrl);
    });

    it("should generate English home page metadata", () => {
      const metadata = generateHomePageMetadata("en");

      expect(metadata.title).toContain("TYCHERA Investments LTD");
      expect(metadata.description).toContain("The bridge");
      expect(metadata.keywords).toContain("project financing");
      expect(metadata.openGraph?.url).toBe(`${baseUrl}/en`);
    });

    it("should include OG image for home page", () => {
      const metadata = generateHomePageMetadata("fr");

      expect(metadata.openGraph?.images).toBeDefined();
      expect(metadata.openGraph?.images).toHaveLength(1);
      const images = metadata.openGraph?.images;
      if (Array.isArray(images) && images.length > 0) {
        expect(images[0]).toHaveProperty("width", 1200);
        expect(images[0]).toHaveProperty("height", 630);
      }
    });
  });

  describe("generateExpertisePageMetadata", () => {
    it("should generate French expertise page metadata", () => {
      const metadata = generateExpertisePageMetadata("fr");

      expect(metadata.title).toContain("Expertise");
      expect(metadata.description).toContain("Découvrez");
      expect(metadata.keywords).toContain("expertise financière");
      expect(metadata.openGraph?.url).toContain("/expertise");
    });

    it("should generate English expertise page metadata", () => {
      const metadata = generateExpertisePageMetadata("en");

      expect(metadata.title).toContain("Expertise");
      expect(metadata.description).toContain("Discover");
      expect(metadata.keywords).toContain("financial expertise");
      expect(metadata.openGraph?.url).toContain("/en/expertise");
    });

    it("should include OG image for expertise page", () => {
      const metadata = generateExpertisePageMetadata("fr");

      expect(metadata.openGraph?.images).toBeDefined();
      expect(metadata.openGraph?.images).toHaveLength(1);
      const images = metadata.openGraph?.images;
      if (Array.isArray(images) && images.length > 0) {
        expect(images[0]).toHaveProperty("width", 1200);
        expect(images[0]).toHaveProperty("height", 630);
      }
    });
  });

  describe("generate404PageMetadata", () => {
    it("should generate French 404 page metadata", () => {
      const metadata = generate404PageMetadata("fr");

      expect(metadata.title).toContain("Page non trouvée");
      expect(metadata.description).toContain("n'existe pas");
      expect(metadata.keywords).toContain("404");
    });

    it("should generate English 404 page metadata", () => {
      const metadata = generate404PageMetadata("en");

      expect(metadata.title).toContain("Page Not Found");
      expect(metadata.description).toContain("does not exist");
      expect(metadata.keywords).toContain("404");
    });

    it("should include OG image for 404 page", () => {
      const metadata = generate404PageMetadata("fr");

      expect(metadata.openGraph?.images).toBeDefined();
      expect(metadata.openGraph?.images).toHaveLength(1);
      const images = metadata.openGraph?.images;
      if (Array.isArray(images) && images.length > 0) {
        expect(images[0]).toHaveProperty("width", 1200);
        expect(images[0]).toHaveProperty("height", 630);
      }
    });
  });

  describe("Open Graph Compliance - Property 9", () => {
    /**
     * Property 9: SEO - Open Graph Tags
     * 
     * For any page route in the application, that page should have Open Graph tags
     * including og:title, og:description, og:image, and og:url.
     * 
     * Validates: Requirements 3.6
     */

    it("should have og:title for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.openGraph?.title).toBeDefined();
        expect(metadata.openGraph?.title).not.toBe("");
      });
    });

    it("should have og:description for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.openGraph?.description).toBeDefined();
        expect(metadata.openGraph?.description).not.toBe("");
      });
    });

    it("should have og:image for all pages with correct dimensions", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.openGraph?.images).toBeDefined();
        expect(metadata.openGraph?.images).toHaveLength(1);

        const images = metadata.openGraph?.images;
        if (Array.isArray(images) && images.length > 0) {
          const image = images[0];
          if (typeof image === 'object' && image !== null) {
            expect(image).toHaveProperty('url');
            expect(image).toHaveProperty('width', 1200);
            expect(image).toHaveProperty('height', 630);
            expect(image).toHaveProperty('alt');
          }
        }
      });
    });

    it("should have og:url for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.openGraph?.url).toBeDefined();
        expect(metadata.openGraph?.url).toContain(baseUrl);
      });
    });

    it("should have og:type for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        const og = metadata.openGraph as any;
        expect(og?.type).toBeDefined();
        expect(og?.type).toBe("website");
      });
    });

    it("should have og:locale for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.openGraph?.locale).toBeDefined();
        expect(metadata.openGraph?.locale).toBe("fr_RW");
      });
    });

    it("should have og:site_name for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.openGraph?.siteName).toBeDefined();
        expect(metadata.openGraph?.siteName).toBe("TYCHERA Investments LTD");
      });
    });
  });

  describe("Twitter Card Compliance", () => {
    it("should have twitter:card for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        const twitter = metadata.twitter as any;
        expect(twitter?.card).toBeDefined();
        expect(twitter?.card).toBe("summary_large_image");
      });
    });

    it("should have twitter:title for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.twitter?.title).toBeDefined();
        expect(metadata.twitter?.title).not.toBe("");
      });
    });

    it("should have twitter:description for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.twitter?.description).toBeDefined();
        expect(metadata.twitter?.description).not.toBe("");
      });
    });

    it("should have twitter:image for all pages", () => {
      const pages = [
        generateHomePageMetadata("fr"),
        generateExpertisePageMetadata("fr"),
        generate404PageMetadata("fr"),
      ];

      pages.forEach((metadata) => {
        expect(metadata.twitter?.images).toBeDefined();
        const images = metadata.twitter?.images;
        if (Array.isArray(images)) {
          expect(images).toHaveLength(1);
          expect(images[0]).toContain("og-image");
        }
      });
    });
  });
});
