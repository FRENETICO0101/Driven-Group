import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProperties, getAvailableCities } from "@/server/services/property.service";
import { PropertyListingHero } from "@/components/real-estate/PropertyListingHero";
import { PropertyFilters } from "@/components/real-estate/PropertyFilters";
import { PropertyGrid } from "@/components/real-estate/PropertyGrid";
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
  searchParams: Promise<{ type?: string; city?: string; status?: string }>;
}

async function ListingContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = {
    type: params.type ?? "",
    city: params.city ?? "",
    status: params.status ?? "",
  };

  const [properties, cities] = await Promise.all([
    getAllProperties(filters),
    getAvailableCities(),
  ]);

  return (
    <>
      <PropertyListingHero count={properties.length} />
      <PropertyFilters
        availableCities={cities}
        currentType={filters.type}
        currentCity={filters.city}
        currentStatus={filters.status}
      />
      <PropertyGrid properties={properties} />
    </>
  );
}

export default function RealEstatePage(props: PageProps) {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<PropertyListingSkeleton />}>
        <ListingContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
