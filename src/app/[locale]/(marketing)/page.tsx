import { HeroSection } from "@/components/marketing/HeroSection";
import { OurStory } from "@/components/marketing/OurStory";
import { StatsSection } from "@/components/marketing/StatsSection";
import { FeaturedProperties } from "@/components/marketing/FeaturedProperties";
import { CTASection } from "@/components/marketing/CTASection";
import { getFeaturedProperties } from "@/server/services/property.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const properties = await getFeaturedProperties(3);

  return (
    <>
      <HeroSection />
      <OurStory />
      <StatsSection />
      <FeaturedProperties properties={properties} />
      <CTASection />
    </>
  );
}
