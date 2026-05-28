import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProperties } from "@/server/services/property.service";
import { RealEstateHeroSection } from "@/components/real-estate/RealEstateHeroSection";
import { PropertyFilters } from "@/components/real-estate/PropertyFilters";
import { PropertyListing } from "@/components/real-estate/PropertyListing";
import { MapWithRouter } from "@/components/real-estate/MapWithRouter";
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
        alt: "Miami Real Estate — Driven Group",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/real-estate`,
  },
};

interface PageProps {
  searchParams: Promise<{ type?: string; district?: string; status?: string }>;
}

async function ListingContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = {
    type:     params.type     ?? "",
    city:     "Miami", // Always filter by Miami
    district: params.district ?? "",
    status:   params.status   ?? "",
  };

  const properties = await getAllProperties(filters);

  return (
    <>
      {/* Filters bar — sticky below nav */}
      <Suspense fallback={<div className="h-14 bg-white border-b border-light-gray" />}>
        <PropertyFilters
          currentType={filters.type}
          currentDistrict={filters.district}
          currentStatus={filters.status}
        />
      </Suspense>

      {/* Two-column layout: map left, listings right */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
        {/* Mobile: map on top, full width */}
        {/* Desktop: map fixed left sidebar (1/3), listings scroll right (2/3) */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

          {/* Map sidebar — hidden on mobile, sticky on desktop */}
          <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 lg:sticky lg:top-36">
            <div className="mb-4 lg:mb-6">
              <h2 className="font-serif text-lg lg:text-xl text-ink leading-tight mb-1">
                Explore Miami
              </h2>
              <p className="text-xs lg:text-sm text-mid-gray leading-relaxed">
                Click a district on the map to filter properties by neighborhood.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="flex flex-col gap-4">
                  <div className="w-full h-[320px] lg:h-[420px] bg-pale animate-pulse rounded" />
                  <div className="h-40 bg-pale animate-pulse rounded" />
                </div>
              }
            >
              <MapWithRouter
                properties={properties}
                selectedDistrict={filters.district}
              />
            </Suspense>
          </aside>

          {/* Listings — full width on mobile, flex-1 on desktop */}
          <section className="w-full lg:flex-1 min-w-0" id="listings">
            <PropertyListing properties={properties} />
          </section>

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
