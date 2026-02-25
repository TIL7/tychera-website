/**
 * Organization JSON-LD Structured Data
 *
 * Renders schema.org Organization + FinancialService markup
 * for search engine rich results.
 */

import { SITE_URL } from "@/lib/site-url";

interface OrganizationJsonLdProps {
  locale?: "fr" | "en";
}

export default function OrganizationJsonLd({ locale }: OrganizationJsonLdProps = {}): React.ReactElement {
  const localizedUrl = locale ? `${SITE_URL}/${locale}` : SITE_URL;
  const localizedDescription =
    locale === "en"
      ? "Clarity in decisions. Enduring outcomes. Architect of Project Financing in Africa."
      : locale === "fr"
        ? "Clarity in decisions. Enduring outcomes. Architecte du Financement des Projets en Afrique."
        : "Clarity in decisions. Enduring outcomes. Architect of project financing in Africa.";

  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService"],
    name: "TYCHERA Investments LTD",
    legalName: "TYCHERA Investments LTD",
    url: localizedUrl,
    logo: `${SITE_URL}/images/tychera-logo-white-new.png`,
    description: localizedDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Immeuble OHANA",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+250722138799",
        contactType: "customer service",
        email: "contact@tycherainvest.com",
        availableLanguage: ["French", "English"],
      },
    ],
    founder: {
      "@type": "Person",
      name: "Kamal Alawo ADJAYI",
      jobTitle: "CEO",
    },
    areaServed: {
      "@type": "Continent",
      name: "Africa",
    },
    sameAs: [
      "https://www.linkedin.com/company/tychera-investments",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
