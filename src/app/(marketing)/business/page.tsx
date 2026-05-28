import type { Metadata } from "next";
import { BusinessHeroSection } from "@/components/business/BusinessHeroSection";
import { BusinessDivision } from "@/components/business/BusinessDivision";
import { BusinessCTA } from "@/components/business/BusinessCTA";

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  title: "Business Units — Driven Group",
  description:
    "Explora nuestras divisiones de negocio: Comercio Digital, Mercados Globales, Alianzas Estratégicas y Activos de Lujo. Soluciones integradas para inversión corporativa.",
  openGraph: {
    title: "Business Units — Driven Group",
    description:
      "Explora nuestras divisiones de negocio: Comercio Digital, Mercados Globales, Alianzas Estratégicas y Activos de Lujo.",
    url: `${siteUrl}/business`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Driven Group Business Units",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/business`,
  },
};

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-white">
      <BusinessHeroSection />

      <section id="divisions">
        {/* Digital Commerce */}
      <BusinessDivision
        title="Comercio Digital"
        description="Participación en el desarrollo y operación de modelos comerciales en entornos digitales, integrando posicionamiento de marca, canales de venta y ejecución orientada a la eficiencia y escalabilidad."
        image="images1/business-digital.jpg"
        imageAlt="Digital Commerce Technology Platform"
        highlights={[
          
        ]}
      />

      {/* Global Markets */}
      <BusinessDivision
        title="Mercados Gobales"
        description="Presencia en mercados internacionales, con actividad en Europa y América del Norte, mediante estrcuturas comerciales que permiten la expansión y consolidación de negocios en distintos contextos."
        image="images1/business-global.jpg"
        imageAlt="Global Markets Financial Operations"
        highlights={[
          
        ]}
        reversed
      />

      {/* Strategic Alliances */}
      <BusinessDivision
        title="Alianzas Estratégicas"
        description="Colaboración con socios y organizaciones en la construcción de proyectos empresariales, enfocada en la generación de valor conjunto y el fortalecimiento de capacidades."
        image="images1/business-alliances.jpg"
        imageAlt="Strategic Partnerships and Collaboration"
        highlights={[
        
        ]}
      />

      {/* Luxury Assets */}
      <BusinessDivision
        title="Activos de Lujo"
        description="Participación en la gestión y desarrollo de activos de alto valor, bajo una visión patrimonial, enfocados en exclusividad, calidad y posicionamiento dentro de mercados premium."
        image="images1/business-luxury.jpg"
        imageAlt="Luxury Real Estate Portfolio"
        highlights={[
          
        ]}
        reversed
      />
      </section>

      <BusinessCTA />
    </main>
  );
}
