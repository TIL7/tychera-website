/**
 * Organization JSON-LD Structured Data
 *
 * Renders schema.org Organization + FinancialService markup
 * for search engine rich results.
 */

interface OrganizationJsonLdProps {
  locale: string;
}

export default function OrganizationJsonLd({ locale }: OrganizationJsonLdProps): React.ReactElement {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService"],
    name: "TYCHERA Investments LTD",
    legalName: "TYCHERA Investments LTD",
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/images/tychera-logo-white-new.png`,
    description:
      locale === "en"
        ? "Architect of Project Financing in Africa. The bridge between international capital and African potential."
        : "Architecte du Financement des Projets en Afrique. Le pont entre capital international et potentiel africain.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Immeuble OHANA",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+250722138799",
      contactType: "customer service",
      email: "contact@tycherainvestments.com",
      availableLanguage: ["French", "English"],
    },
    founder: {
      "@type": "Person",
      name: "Kamal Alawo Adjayi",
      jobTitle: "CEO & Founder",
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
