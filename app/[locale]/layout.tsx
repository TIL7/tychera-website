import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

type Locale = (typeof locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Locale Layout - i18n Routing
 * 
 * This layout handles locale-based routing for the application.
 * Supports French (fr) as default and English (en) as secondary locale.
 * 
 * @requirements 3.1, 3.4, 5.1, 5.2, 5.3, 5.6, 5.7
 */

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata(
  props: LocaleLayoutProps
): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const isDefault = locale === "fr";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com";
  const canonicalUrl = isDefault ? baseUrl : `${baseUrl}/${locale}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "fr": `${baseUrl}/fr`,
        "en": `${baseUrl}/en`,
        "x-default": baseUrl,
      },
    },
  };
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const params = await props.params;
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-32">
        {props.children}
      </main>
      <Footer />
    </>
  );
}
