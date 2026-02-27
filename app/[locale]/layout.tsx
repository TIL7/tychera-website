import { notFound } from "next/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import { locales } from "@/i18n/config";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OrganizationJsonLd from "@/components/sections/OrganizationJsonLd";
import { generateRootMetadata } from "@/lib/metadata";
import "@/app/globals.css";

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

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = generateRootMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2283a2" },
    { media: "(prefers-color-scheme: dark)", color: "#2283a2" },
  ],
};

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const params = await props.params;
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfairDisplay.variable}`}>
        <TooltipProvider>
          <OrganizationJsonLd locale={locale} />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="pt-32">
              {props.children}
            </main>
            <Footer />
          </NextIntlClientProvider>
          <Toaster
            position="top-right"
            richColors
            closeButton
            theme="light"
            expand
          />
          <SpeedInsights />
        </TooltipProvider>
      </body>
    </html>
  );
}
