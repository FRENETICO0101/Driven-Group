"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "The Skyline Penthouse",
    location: "Manhattan, New York",
    price: "$48,500,000",
    image: "/images/property-1.jpg",
    beds: 5,
    baths: 6,
    sqft: "8,200",
  },
  {
    id: 2,
    title: "Villa Mediterranea",
    location: "Malibu, California",
    price: "$32,000,000",
    image: "/images/property-2.jpg",
    beds: 7,
    baths: 9,
    sqft: "12,500",
  },
  {
    id: 3,
    title: "Alpine Sanctuary",
    location: "Aspen, Colorado",
    price: "$28,750,000",
    image: "/images/property-3.jpg",
    beds: 6,
    baths: 7,
    sqft: "9,800",
  },
]

export function FeaturedProperties() {
  return (
    <section id="properties" className="section-aman">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-aman mb-4">Featured Residences</p>
            <h2 className="heading-aman">
              Exceptional<br className="hidden md:block" /> Properties
            </h2>
          </div>
          <Link
            href="#"
            className="group inline-flex items-center gap-3 text-[13px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            View All Residences
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal Scroll Properties */}
        <div className="scroll-aman -mx-6 px-6 lg:-mx-12 lg:px-12">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PropertyCard({
  property,
}: {
  property: (typeof properties)[number]
}) {
  return (
    <Link 
      href="#" 
      className="group block flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw]"
    >
      {/* Image Container */}
      <div className="image-aman relative aspect-[4/5]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/20" />
      </div>

      {/* Content */}
      <div className="mt-6">
        <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          {property.location}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">
          {property.title}
        </h3>
        
        {/* Specs */}
        <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
          <span>{property.beds} Beds</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{property.baths} Baths</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{property.sqft} Sq Ft</span>
        </div>

        <p className="mt-4 font-serif text-xl text-foreground">
          {property.price}
        </p>
      </div>
    </Link>
  )
}
