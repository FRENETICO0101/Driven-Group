import { PageHero } from "@/components/layout/PageHero";
import { useTranslations } from "next-intl";

export function AboutHeroSection() {
  const t = useTranslations("nav");

  return (
    <PageHero
      icon="info"
      label={t("about").toUpperCase()}
      imageSrc="/images1/about-driven-group-miami.png"
      imagePosition="center 52%"
      imageAlt="Liderazgo de Driven Group frente a la bahía de Miami"
      titleKey="about"
      descKey="aboutDesc"
      ctaHref="#mission"
      ctaLabelKey="discoverValues"
    />
  );
}
