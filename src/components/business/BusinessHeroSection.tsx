import { PageHero } from "@/components/layout/PageHero";

export function BusinessHeroSection() {
  return (
    <PageHero
      icon="trending_up"
      label="BUSINESS"
      imageSrc="/images1/business-hero.jpg"
      imageAlt="Business Growth"
      titleKey="business"
      descKey="businessDesc"
      ctaHref="#divisions"
      ctaLabelKey="exploreDivisions"
    />
  );
}
