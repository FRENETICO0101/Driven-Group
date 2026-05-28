import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getAllProperties } from "@/server/services/property.service";
import { RealEstateHeroSection } from "@/components/real-estate/RealEstateHeroSection";
import { PropertyFilters } from "@/components/real-estate/PropertyFilters";
import { PropertyListing } from "@/components/real-estate/PropertyListing";
import { PropertyListingSkeleton } from "@/components/loading/PropertyListingSkeleton";

export const dynamic = "force-dynamic";

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  title: "Miami Real Estate — Driven Group",
  description:
    "Premium real estate portfolio in Miami. Luxury residences, commercial properties, and development opportunities across Miami's finest neighborhoods.",
  openGraph: {
    title: "Miami Real Estate — Driven Group",
    description:
      "Premium real estate portfolio in Miami. Luxury residences, commercial properties, and development opportunities across Miami's finest neighborhoods.",
    url: `${siteUrl}/real-estate`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Miami Real Estate",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/real-estate`,
  },
};

// Dynamically import the map component for client-side rendering
const MiamiPropertyMap = dynamic(
  () => import("@/components/real-estate/MiamiPropertyMap").then((mod) => ({ default: mod.MiamiPropertyMap })),
  { ssr: false, loading: () => <div className="w-full h-96 md:h-screen bg-pale rounded-lg animate-pulse" /> }
);

interface PageProps {
  searchParams: Promise<{ type?: string; district?: string; status?: string }>;
}

async function ListingContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = {
    type: params.type ?? "",
    district: params.district ?? "",
    status: params.status ?? "",
  };

  const properties = await getAllProperties(filters);

  return (
    <>
      <PropertyFilters
        currentType={filters.type}
        currentDistrict={filters.district}
        currentStatus={filters.status}
      />
      
      {/* Map + Listing Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 sm:px-8 py-12">
        {/* Map Sidebar (Desktop) / Full Width (Mobile) */}
        <div className="lg:col-span-1 lg:sticky lg:top-32 h-fit">
          <h3 className="font-serif text-lg text-black mb-4">Miami Districts</h3>
          <Suspense fallback={<div className="w-full h-96 bg-pale rounded-lg animate-pulse" />}>
            <MiamiPropertyMap properties={properties} selectedDistrict={filters.district} />
          </Suspense>
        </div>

        {/* Properties Listing */}
        <div className="lg:col-span-2" id="listings">
          <PropertyListing properties={properties} />
        </div>
      </div>
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
