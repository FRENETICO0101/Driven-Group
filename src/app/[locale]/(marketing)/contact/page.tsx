import { getLocale } from "next-intl/server";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { GetInTouchForm } from "@/components/contact/GetInTouchForm";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  return buildLocalizedMetadata({
    locale,
    pathname: "/contact",
    title: isEnglish ? "Contact Driven Group" : "Contacto | Driven Group",
    description: isEnglish
      ? "Talk with Driven Group about real estate, business, partnerships, and strategic opportunities."
      : "Habla con Driven Group sobre real estate, negocios, alianzas y oportunidades estratégicas.",
    imageAlt: isEnglish ? "Contact Driven Group" : "Contacto | Driven Group",
  });
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHeroSection />
      <ContactInfoSection />
      <GetInTouchForm />
    </main>
  );
}
