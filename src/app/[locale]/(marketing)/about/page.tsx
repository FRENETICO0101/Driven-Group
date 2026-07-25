import { getLocale } from "next-intl/server";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { CEOsSection } from "@/components/about/CEOsSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { ReputationSection } from "@/components/about/ReputationSection";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  return buildLocalizedMetadata({
    locale,
    pathname: "/about",
    title: isEnglish ? "About Driven Group" : "Nosotros | Driven Group",
    description: isEnglish
      ? "Meet the leadership and strategic vision behind Driven Group."
      : "Conoce el liderazgo y la visión estratégica que impulsan Driven Group.",
    imageAlt: isEnglish ? "About Driven Group" : "Nosotros | Driven Group",
  });
}

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
