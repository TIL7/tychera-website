export interface DigitalCardProfile {
  name: string;
  title: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  website: string;
  address: string;
  vcfPath: string;
}

export const digitalCardByToken: Record<string, DigitalCardProfile> = {
  f7K2vQ9mLp4R8xT1cN6b: {
    name: "Kamal Alawo Adjayi",
    title: "Managing Director",
    phone: "+250 793 145 440",
    whatsappPhone: "+22890469240",
    email: "kamal.adjayi@tycherainvest.com",
    website: "https://www.tycherainvest.com",
    address: "Immeuble OHANA, Nyarutarama, Kigali - Rwanda",
    vcfPath: "/vcards/a1.vcf",
  },
  u3Jd8sW1pZ5kM9qR2tY4: {
    name: "Hawa KAYISHARAZA",
    title: "Chief Operating Officer",
    phone: "+250 788 885 572",
    whatsappPhone: "+250788885572",
    email: "hawa.kayisharaza@tycherainvest.com",
    website: "https://www.tycherainvest.com",
    address: "Immeuble OHANA, Nyarutarama, Kigali - Rwanda",
    vcfPath: "/vcards/b2.vcf",
  },
};

