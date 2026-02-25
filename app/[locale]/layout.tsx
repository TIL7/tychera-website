import { notFound } from "next/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import { locales } from "@/i18n/config";
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

