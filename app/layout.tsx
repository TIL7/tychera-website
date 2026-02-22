import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TYCHERA Investments LTD",
    template: "%s | TYCHERA Investments LTD",
  },
  description:
    "Architecte du Financement des Projets en Afrique. Le pont entre capital international et potentiel africain.",
  keywords: [
    "financement de projets",
    "Afrique",
    "investissements",
    "structuration financière",
    "Rwanda",
  ],
  authors: [
    {
      name: "TYCHERA Investments LTD",
      url: "https://tycherainvestments.com",
    },
  ],
  creator: "TYCHERA Investments LTD",
  publisher: "TYCHERA Investments LTD",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com"
  ),
  openGraph: {
    type: "website",
    locale: "fr_RW",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com",
    siteName: "TYCHERA Investments LTD",
    title: "TYCHERA Investments LTD",
    description:
      "Architecte du Financement des Projets en Afrique. Le pont entre capital international et potentiel africain.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TYCHERA Investments LTD",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TYCHERA Investments LTD",
    description:
      "Architecte du Financement des Projets en Afrique. Le pont entre capital international et potentiel africain.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com",
    languages: {
      fr: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com"}/fr`,
      en: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com"}/en`,
    },
  },
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <TooltipProvider>
          {children}
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
