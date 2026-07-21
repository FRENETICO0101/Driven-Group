import { PageHero } from "@/components/layout/PageHero";

export function ContactHeroSection() {
  return (
    <PageHero
      icon="mail"
      label="CONTACT US"
      imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=90"
      imageAlt="Contact Driven Group"
      titleKey="contact"
      descKey="contactDesc"
      ctaHref="#form"
      ctaLabelKey="getInTouch"
    />
  );
}
