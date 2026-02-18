import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DigitalBusinessCard from "@/components/DigitalBusinessCard";
import { digitalCardByToken } from "@/lib/digitalCards";

interface CardPageProps {
  params: Promise<{ token: string }>;
}

export const metadata: Metadata = {
  title: {
    absolute: "Contact | TYCHERA",
  },
  other: {
    robots: "noindex, nofollow, noarchive",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default async function CardPage({ params }: CardPageProps) {
  const { token } = await params;
  const profile = digitalCardByToken[token];

  if (!profile) {
    notFound();
  }

  return <DigitalBusinessCard profile={profile} />;
}
