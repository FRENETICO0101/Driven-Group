import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { GetInTouchForm } from "@/components/contact/GetInTouchForm";

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  title: "Contact Us — Driven Group",
  description:
    "Get in touch with Driven Group. We're ready to discuss your real estate, business, or partnership inquiries.",
  openGraph: {
    title: "Contact Us — Driven Group",
    description:
      "Get in touch with Driven Group. We're ready to discuss your real estate, business, or partnership inquiries.",
    url: `${siteUrl}/contact`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact Driven Group",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHeroSection />
      <ContactInfoSection />
      <GetInTouchForm />
    </main>
  );
}
