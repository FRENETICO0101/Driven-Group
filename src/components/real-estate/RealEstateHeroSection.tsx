import { PageHero } from "@/components/layout/PageHero";

export function RealEstateHeroSection() {
  return (
    <PageHero
      icon="apartment"
      label="REAL ESTATE"
      imageSrc="/images1/real-estate-miami-vertical-developments.png"
      imagePosition="center 52%"
      imageAlt="Luxury residential developments in Miami"
      titleKey="realEstate"
      descKey="realEstateDesc"
      ctaHref="#listings"
      ctaLabelKey="browsePortfolio"
    />
  );
}
