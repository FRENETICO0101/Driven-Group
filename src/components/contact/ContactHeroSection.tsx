import { PageHero } from "@/components/layout/PageHero";
import { useTranslations } from "next-intl";

export function ContactHeroSection() {
  const t = useTranslations("nav");

  return (
    <PageHero
      icon="mail"
      label={t("contact").toUpperCase()}
      imageSrc="/images1/contact-driven-group-miami.png"
      imagePosition="center 52%"
      imageAlt="Reunión estratégica de Driven Group con vista a Miami"
      titleKey="contact"
      descKey="contactDesc"
      ctaHref="#form"
      ctaLabelKey="getInTouch"
    />
  );
}
