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
        title="Digital Commerce"
        description="End-to-end e-commerce solutions for enterprise-scale operations."
        longDescription="We architect and operate premium digital marketplaces that connect global buyers with curated products and services. Our technology stack integrates payment processing, logistics, and analytics to deliver seamless commercial experiences."
        image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=1000&fit=crop"
        imageAlt="Digital Commerce Technology Platform"
        highlights={[
          "Multi-currency payment processing and settlement",
          "Global logistics and supply chain optimization",
          "Advanced analytics and customer intelligence",
          "White-label marketplace infrastructure",
        ]}
      />

      {/* Global Markets */}
      <BusinessDivision
        title="Global Markets"
        description="Strategic access to international investment and trading opportunities."
        longDescription="Our global markets division provides institutional-grade access to alternative investments, commodities, and securities across emerging and developed markets. We leverage proprietary research and local partnerships to identify high-conviction opportunities."
        image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=1000&fit=crop"
        imageAlt="Global Markets Financial Operations"
        highlights={[
          "Institutional investment advisory services",
          "Commodity and derivative trading platforms",
          "Cross-border transaction facilitation",
          "Risk management and portfolio optimization",
        ]}
        reversed
      />

      {/* Strategic Alliances */}
      <BusinessDivision
        title="Strategic Alliances"
        description="Partnership networks that drive exponential business growth."
        longDescription="We cultivate deep partnerships with industry leaders, technology innovators, and financial institutions. These alliances create synergies that accelerate market entry, reduce capital requirements, and amplify competitive advantages across our entire ecosystem."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop"
        imageAlt="Strategic Partnerships and Collaboration"
        highlights={[
          "Joint venture and co-investment structures",
          "Technology and innovation partnerships",
          "Distribution and market access agreements",
          "Equity stake partnerships with aligned vision",
        ]}
      />

      {/* Luxury Assets */}
      <BusinessDivision
        title="Luxury Assets"
        description="Curation and stewardship of ultra-premium real estate and tangible assets."
        longDescription="Our luxury assets division manages a carefully curated portfolio of world-class properties and collectibles. Beyond ownership, we provide comprehensive stewardship including enhancement, management, and strategic disposition planning for high-net-worth clients and institutions."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop"
        imageAlt="Luxury Real Estate Portfolio"
        highlights={[
          "Ultra-premium residential property curation",
          "Commercial and development opportunity sourcing",
          "Property enhancement and value-add strategies",
          "Succession planning and estate stewardship",
        ]}
        reversed
      />
      </section>

      <BusinessCTA />
    </main>
  );
}
