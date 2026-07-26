import Image from "next/image";
import { getLocale } from "next-intl/server";
import { AcademyHeroSection } from "@/components/academy/AcademyHeroSection";
import { AcademyCTA } from "@/components/academy/AcademyCTA";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const siteUrl = "https://drivengroup.com";
const modoRicoUrl = "https://driven-academy.com/modo-rico";

/*
const metadata = {
  title: "Driven Academy — Knowledge with purpose",
  description: "Driven Academy creates practical programs and intelligent tools for leadership, strategy, finance, and personal growth.",
  openGraph: {
    title: "Driven Academy",
    description: "Knowledge, methodology, and intelligent tools to make better decisions.",
    url: `${siteUrl}/academy`,
    type: "website",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Driven Academy" }],
  },
  alternates: { canonical: `${siteUrl}/academy` },
};

*/

export async function generateMetadata() {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  return buildLocalizedMetadata({
    locale,
    pathname: "/academy",
    title: isEnglish ? "Driven Academy | Knowledge with purpose" : "Driven Academy | Conocimiento con propósito",
    description: isEnglish
      ? "Practical programs and intelligent tools for leadership, strategy, finance, and personal growth."
      : "Programas prácticos y herramientas inteligentes para liderazgo, estrategia, finanzas y crecimiento personal.",
    imageAlt: "Driven Academy",
  });
}

const content = {
  es: {
    purposeLabel: "DRIVEN ACADEMY",
    purposeTitle: "Conocimiento que genera un impacto real.",
    purpose: [
      "Driven Academy nació con un propósito claro: compartir conocimiento que genere un impacto real y perdure en el tiempo.",
      "Creemos que la experiencia solo adquiere verdadero valor cuando se transmite para impulsar el crecimiento de otros. Por ello, reunimos años de trayectoria en liderazgo, estrategia, finanzas y desarrollo empresarial para crear programas prácticos, relevantes y orientados a resultados.",
      "Nuestro compromiso es acercar información útil, confiable y de alto valor que permita a las personas tomar mejores decisiones, fortalecer sus capacidades y construir un futuro con mayor propósito y libertad.",
      "En Driven Academy no solo enseñamos conocimientos; compartimos experiencias que inspiran, transforman y trascienden.",
    ],
    ecosystemLabel: "ECOSISTEMA DE APRENDIZAJE",
    cards: [
      { index: "01", title: "Driven Academy", description: "La plataforma de conocimiento de Driven Group: programas educativos, contenidos y experiencias creadas para desarrollar criterio, liderazgo y capacidades aplicables.", image: "/images1/academy-virtual-classroom.webp", alt: "Sesión de aprendizaje de Driven Academy", action: "Conocer Academy", href: modoRicoUrl, external: true },
      { index: "02", title: "Modo Rico", description: "Una metodología práctica para recuperar el control de tus finanzas, construir estabilidad y avanzar con dirección hacia tu libertad financiera.", image: "/images1/academy-nexora-platform-v1.webp", alt: "Modo Rico, aprendizaje financiero digital", action: "Ir a Modo Rico", href: modoRicoUrl, external: true },
      { index: "03", title: "NEXORAMR", description: "Plataforma inteligente de finanzas personales impulsada por IA para visualizar ingresos, gastos, deudas, inversiones, patrimonio y metas en un solo lugar.", image: "/images1/academy-digital-learning-v1.webp", alt: "Plataforma financiera NEXORAMR", action: "Conocer NEXORAMR", href: modoRicoUrl, external: true },
    ],
  },
  en: {
    purposeLabel: "DRIVEN ACADEMY",
    purposeTitle: "Knowledge that creates a real impact.",
    purpose: [
      "Driven Academy was born with a clear purpose: to share knowledge that creates a real and lasting impact.",
      "We believe experience gains its true value when it is shared to support the growth of others. That is why we bring together years of experience in leadership, strategy, finance, and business development to create practical, relevant, results-oriented programs.",
      "Our commitment is to provide useful, reliable, high-value information that helps people make better decisions, strengthen their capabilities, and build a future with greater purpose and freedom.",
      "At Driven Academy, we do not only teach knowledge; we share experiences that inspire, transform, and endure.",
    ],
    ecosystemLabel: "LEARNING ECOSYSTEM",
    cards: [
      { index: "01", title: "Driven Academy", description: "Driven Group's knowledge platform: programs, content, and experiences designed to develop judgment, leadership, and applicable capabilities.", image: "/images1/academy-virtual-classroom.webp", alt: "Driven Academy learning session", action: "Discover Academy", href: modoRicoUrl, external: true },
      { index: "02", title: "Modo Rico", description: "A practical methodology to regain control of your finances, build stability, and move purposefully toward your wealth goals.", image: "/images1/academy-nexora-platform-v1.webp", alt: "Modo Rico digital financial learning", action: "Visit Modo Rico", href: modoRicoUrl, external: true },
      { index: "03", title: "NEXORAMR", description: "An AI-powered personal finance platform to view income, spending, debt, investments, wealth, and goals in one place.", image: "/images1/academy-digital-learning-v1.webp", alt: "NEXORAMR financial platform", action: "Discover NEXORAMR", href: modoRicoUrl, external: true },
    ],
  },
} as const;

function AcademyBrandName({ name }: { name: string }) {
  return name;
}

function AcademyCardTitle({ name }: { name: string }) {
  if (name !== "Modo Rico") return <>{name}</>;

  return (
    <span className="relative block h-20 w-full max-w-[20rem] overflow-hidden bg-[#17140f] p-3 sm:h-24 sm:p-4">
      <Image src="/images1/modo-rico-logo.png" alt="Modo Rico" fill sizes="(max-width: 640px) 100vw, 320px" className="object-contain p-3 sm:p-4" />
    </span>
  );
}

export default async function AcademyPage() {
  const locale = await getLocale();
  const copy = content[locale === "en" ? "en" : "es"];

  return (
    <main className="academy-page">
      <AcademyHeroSection />

      <section id="driven-academy" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20 sm:px-8 sm:py-24 md:py-32">
        <p className="editorial-label mb-3 text-gray">{copy.purposeLabel}</p>
        <h2 className="max-w-3xl font-serif text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl md:text-6xl">{copy.purposeTitle}</h2>
        <div className="mt-10 space-y-6 border-l border-black/15 pl-6 sm:pl-8">
          {copy.purpose.map((paragraph, index) => <p key={paragraph} className={index === copy.purpose.length - 1 ? "font-serif text-xl font-black leading-relaxed text-black sm:text-2xl" : "text-base font-light leading-[1.8] text-dark-gray sm:text-lg"}>{paragraph}</p>)}
        </div>
      </section>

      <section className="bg-[#f5f5f5] px-6 py-20 sm:px-8 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="editorial-label mb-3 text-gray">{copy.ecosystemLabel}</p>
          <div className="mt-8 space-y-6 md:mt-10 md:space-y-8">
            {copy.cards.map((card, index) => {
              const isReversed = index % 2 === 1;

              return (
                <article key={card.title} className={`group grid items-center gap-7 rounded-2xl border border-light-gray bg-white p-5 shadow-[0_14px_36px_rgba(37,37,37,0.05)] sm:p-8 md:grid-cols-2 md:gap-12 lg:p-10 ${isReversed ? "md:grid-flow-col-dense" : ""}`}>
                  <div className={isReversed ? "md:col-start-2" : ""}>
                    <div className="flex items-center gap-3"><span className="editorial-label text-gray">{card.index}</span><span className="h-px w-10 bg-light-gray" /><span className="editorial-label text-gray">DRIVEN ACADEMY</span></div>
                  <h3 className="mt-5 font-serif text-3xl font-black leading-[1.08] text-black sm:text-4xl md:text-5xl"><AcademyCardTitle name={card.title} /></h3>
                    <p className="mt-5 text-base leading-relaxed text-dark-gray sm:text-lg">{card.description}</p>
                    <a href={card.href} target={card.external ? "_blank" : undefined} rel={card.external ? "noreferrer" : undefined} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-black transition-transform hover:translate-x-1">{card.action}<span className="material-symbols-outlined text-base">north_east</span></a>
                  </div>
                  <div className={isReversed ? "md:col-start-1 md:row-start-1" : ""}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-light-gray/20"><Image src={card.image} alt={card.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-white"><AcademyBrandName name={card.title} /></p></div></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <AcademyCTA />
    </main>
  );
}
