import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProperties } from "@/server/services/property.service";
import { RealEstateHeroSection } from "@/components/real-estate/RealEstateHeroSection";
import { PropertyFilters } from "@/components/real-estate/PropertyFilters";
import { PropertyListing } from "@/components/real-estate/PropertyListing";
import { PropertiesMap } from "@/components/real-estate/PropertiesMap";
import { PropertyListingSkeleton } from "@/components/loading/PropertyListingSkeleton";

export const dynamic = "force-dynamic";

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  title: "Portafolio de Activos — Driven Group",
  description:
    "Selección curada de inmuebles comerciales, residenciales y patrimoniales. Inversión estratégica corporativa con visión de ecosistema.",
  openGraph: {
    title: "Portafolio de Activos — Driven Group",
    description:
      "Selección curada de inmuebles comerciales, residenciales y patrimoniales. Inversión estratégica corporativa con visión de ecosistema.",
    url: `${siteUrl}/real-estate`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Portafolio de Activos",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/real-estate`,
  },
};

interface PageProps {
  searchParams: Promise<{
    city?: string;
    commercialUse?: string;
    location?: string;
    type?: string;
  }>;
}

const locationCities = {
  miami: ["Miami", "Miami Beach"],
  mexico: ["Mexico City", "Mexico"],
  madrid: ["Madrid"],
} as const;

async function ListingContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const type = params.type === "COMMERCIAL" ? "COMMERCIAL" : "RESIDENTIAL";
  const location = params.location && params.location in locationCities ? params.location : "";
  const commercialUse = type === "COMMERCIAL" && (params.commercialUse === "retail" || params.commercialUse === "warehouse")
    ? params.commercialUse
    : "";
  const filters = {
    type,
    city: params.city ?? "",
    ...(location ? { cities: locationCities[location as keyof typeof locationCities] } : {}),
  };

  const properties = await getAllProperties(filters);

  return (
    <>
      <PropertyFilters
        currentType={type}
        currentCommercialUse={commercialUse}
        currentLocation={location}
      />
      <PropertiesMap properties={properties} />
      <section id="listings">
        <PropertyListing properties={properties} />
      </section>
    </>
  );
}

export default function RealEstatePage(props: PageProps) {
  return (
    <main className="min-h-screen bg-white">
      <RealEstateHeroSection />
      <Suspense fallback={<PropertyListingSkeleton />}>
        <ListingContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
