import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import { locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site-url";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

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

  const baseUrl = SITE_URL;

  const titles: Record<Locale, { default: string; template: string }> = {
    fr: {
      default: "TYCHERA Investments LTD",
      template: "%s | TYCHERA Investments LTD",
    },
    en: {
      default: "TYCHERA Investments LTD",
      template: "%s | TYCHERA Investments LTD",
    },
  };

  const descriptions: Record<Locale, string> = {
    fr: "Architecte du Financement des Projets en Afrique. Le pont entre capital international et potentiel africain.",
    en: "Architect of Project Financing in Africa. The bridge between international capital and African potential.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/fr`,
      },
    },
    openGraph: {
      locale: locale === "en" ? "en_US" : "fr_RW",
      siteName: "TYCHERA Investments LTD",
    },
  };
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const params = await props.params;
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <div className={`${inter.variable} ${playfairDisplay.variable}`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main className="pt-32">
          {props.children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}

