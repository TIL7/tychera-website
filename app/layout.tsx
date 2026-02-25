import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OrganizationJsonLd from "@/components/sections/OrganizationJsonLd";
import { generateRootMetadata } from "@/lib/metadata";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <TooltipProvider>
          <OrganizationJsonLd />
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
