import { PageHero } from "@/components/layout/PageHero";

export function AboutHeroSection() {
  return (
    <PageHero
      icon="info"
      label="ABOUT US"
      imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=90"
      imageAlt="Driven Group Leadership"
      titleKey="about"
      descKey="aboutDesc"
      ctaHref="#mission"
      ctaLabelKey="discoverValues"
    />
  );
}
