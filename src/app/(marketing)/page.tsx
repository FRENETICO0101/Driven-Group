import { HeroSection } from "@/components/marketing/HeroSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { FeaturedProperties } from "@/components/marketing/FeaturedProperties";
import { CTASection } from "@/components/marketing/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProperties />
      <CTASection />
    </>
  );
}
