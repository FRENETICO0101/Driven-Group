import { HeroSection } from "@/components/marketing/HeroSection";
import { OurStory } from "@/components/marketing/OurStory";
import { FeaturedProperties } from "@/components/marketing/FeaturedProperties";
import { CTASection } from "@/components/marketing/CTASection";
import { getFeaturedProperties } from "@/server/services/property.service";
import { getLocale } from "next-intl/server";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  return buildLocalizedMetadata({
    locale,
    pathname: "/",
    title: isEnglish ? "Driven Group | Strategic Wealth Ecosystem" : "Driven Group | Ecosistema estratégico de patrimonio",
    description: isEnglish
      ? "Real estate, business, and education for strategic decisions and enduring value."
      : "Real estate, negocios y educación para decisiones estratégicas y valor duradero.",
    imageAlt: "Driven Group",
  });
}

export default async function HomePage() {
  const properties = await getFeaturedProperties(4);

  return (
    <>
      <HeroSection />
      <OurStory />
      <FeaturedProperties properties={properties} />
      <CTASection />
    </>
  );
}
