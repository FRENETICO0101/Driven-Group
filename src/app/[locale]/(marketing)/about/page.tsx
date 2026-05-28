import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { CEOsSection } from "@/components/about/CEOsSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { ReputationSection } from "@/components/about/ReputationSection";

export const dynamic = 'force-dynamic';

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  title: "About Us — Driven Group",
  description:
    "Meet the leadership behind Driven Group. Over two decades of excellence in luxury real estate, strategic investment, and transformative partnerships.",
  openGraph: {
    title: "About Us — Driven Group",
    description:
      "Meet the leadership behind Driven Group. Over two decades of excellence in luxury real estate, strategic investment, and transformative partnerships.",
    url: `${siteUrl}/about`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "About Driven Group",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHeroSection />
      <CEOsSection />
      <ValuesSection />
      <ReputationSection />
    </main>
  );
}
