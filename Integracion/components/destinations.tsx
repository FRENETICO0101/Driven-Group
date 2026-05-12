"use client"

import Image from "next/image"
import Link from "next/link"

const destinations = [
  {
    id: 1,
    name: "Los Angeles",
    properties: 48,
    image: "/images/property-1.jpg",
  },
  {
    id: 2,
    name: "Miami",
    properties: 32,
    image: "/images/property-2.jpg",
  },
  {
    id: 3,
    name: "New York",
    properties: 56,
    image: "/images/property-3.jpg",
  },
  {
    id: 4,
    name: "Aspen",
    properties: 24,
    image: "/images/gallery-4.jpg",
  },
]

export function Destinations() {
  return (
    <section id="destinations" className="section-aman">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <p className="label-aman mb-4">Our Destinations</p>
          <h2 className="heading-aman">
            Discover Your
            <br />
            Sanctuary
          </h2>
        </div>

        {/* Destinations Grid - Asymmetric */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              href="#properties"
              className={`group relative block ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`image-aman relative ${
                index === 0 ? "aspect-square" : "aspect-[4/5]"
              }`}>
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[10px] tracking-[0.2em] text-cream/60 uppercase">
                    {destination.properties} Properties
                  </p>
                  <h3 className={`mt-2 font-serif text-cream ${
                    index === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                  }`}>
                    {destination.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
