import Image from "next/image";
import { DigitalCardProfile } from "@/lib/digitalCards";

interface DigitalBusinessCardProps {
  profile: DigitalCardProfile;
}

const getMapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function DigitalBusinessCard({
  profile,
}: DigitalBusinessCardProps) {
  return (
    <main className="min-h-screen bg-white px-4 py-8 text-foreground">
      <section className="mx-auto w-full max-w-[480px] rounded-xl border border-border bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col items-center text-center">
          <Image
            src="/images/tychera-logo-color-final.svg"
            alt="TYCHERA"
            width={281}
            height={72}
            className="h-[72px] w-auto"
            priority
          />
          <h1 className="mt-5 text-3xl font-serif leading-tight">{profile.name}</h1>
          <p className="mt-1 text-sm font-medium text-primary">{profile.title}</p>
        </div>

        <div className="space-y-3">
          <a
            href={profile.vcfPath}
            download
            className="block rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Save Contact
          </a>
          <a
            href={`tel:${profile.whatsappPhone}`}
            className="block rounded-md border border-primary bg-white px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            Call
          </a>
          <a
            href={`https://wa.me/${profile.whatsappPhone.replace("+", "")}`}
            className="block rounded-md border border-secondary bg-white px-4 py-3 text-center text-sm font-semibold text-secondary transition-colors hover:bg-secondary/5"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="block rounded-md border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Email
          </a>
        </div>

        <div className="mt-6 space-y-2 text-sm text-foreground/80">
          <a href={profile.website} className="block underline underline-offset-2">
            {profile.website.replace(/^https?:\/\//, "")}
          </a>
          <p>{profile.address}</p>
          <a
            href={getMapsUrl(profile.address)}
            className="block text-primary underline underline-offset-2"
          >
            Open in Maps
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Powered by TYCHERA Investments Ltd
        </p>
      </section>
    </main>
  );
}
