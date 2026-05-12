"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Camera, Layers, Grid3X3 } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "The Aston Martin Residences",
    location: "Downtown Miami",
    price: "$12,500,000",
    address: "300 Biscayne Blvd Way, Miami, FL 33131",
    beds: 5,
    baths: 6,
    sqft: "7,200",
    description: "An architectural masterpiece in the heart of Downtown Miami, this penthouse offers unparalleled views of Biscayne Bay and the Atlantic Ocean.",
    photos: ["/images/property-1.jpg", "/images/gallery-1.jpg", "/images/gallery-2.jpg"],
    renderings: ["/images/rendering-1.jpg", "/images/rendering-2.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 2,
    title: "Villa Mediterranea",
    location: "Miami Beach",
    price: "$32,000,000",
    address: "4567 Pine Tree Dr, Miami Beach, FL 33140",
    beds: 7,
    baths: 9,
    sqft: "12,500",
    description: "A stunning waterfront estate on prestigious Pine Tree Drive, featuring 200 feet of water frontage and a private dock.",
    photos: ["/images/property-2.jpg", "/images/gallery-3.jpg", "/images/gallery-4.jpg"],
    renderings: ["/images/rendering-1.jpg", "/images/rendering-2.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 3,
    title: "Coral Gables Estate",
    location: "Coral Gables",
    price: "$18,750,000",
    address: "1234 Alhambra Circle, Coral Gables, FL 33134",
    beds: 6,
    baths: 7,
    sqft: "9,800",
    description: "Mediterranean-inspired masterpiece in the historic Coral Gables, featuring imported Italian marble and hand-painted ceilings.",
    photos: ["/images/property-3.jpg", "/images/property-6.jpg", "/images/gallery-1.jpg"],
    renderings: ["/images/rendering-2.jpg", "/images/rendering-1.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 4,
    title: "Brickell Skyline Penthouse",
    location: "Brickell",
    price: "$8,900,000",
    address: "1000 Brickell Plaza, Miami, FL 33131",
    beds: 4,
    baths: 5,
    sqft: "5,400",
    description: "Stunning full-floor penthouse with 360-degree views of Biscayne Bay and the Miami skyline. Smart home technology throughout.",
    photos: ["/images/property-4.jpg", "/images/property-8.jpg", "/images/gallery-2.jpg"],
    renderings: ["/images/rendering-1.jpg", "/images/rendering-2.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 5,
    title: "Star Island Mansion",
    location: "Star Island",
    price: "$65,000,000",
    address: "42 Star Island Dr, Miami Beach, FL 33139",
    beds: 10,
    baths: 12,
    sqft: "18,000",
    description: "Iconic Star Island estate with 150 feet of waterfront, private dock, tennis court, and resort-style pool.",
    photos: ["/images/property-5.jpg", "/images/property-10.jpg", "/images/gallery-3.jpg"],
    renderings: ["/images/rendering-2.jpg", "/images/rendering-1.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 6,
    title: "Key Biscayne Oceanfront",
    location: "Key Biscayne",
    price: "$24,500,000",
    address: "789 Ocean Lane, Key Biscayne, FL 33149",
    beds: 6,
    baths: 8,
    sqft: "8,900",
    description: "Direct oceanfront estate with private beach access, offering the ultimate in coastal luxury living.",
    photos: ["/images/property-7.jpg", "/images/property-2.jpg", "/images/gallery-4.jpg"],
    renderings: ["/images/rendering-1.jpg", "/images/rendering-2.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 7,
    title: "Fisher Island Retreat",
    location: "Fisher Island",
    price: "$28,000,000",
    address: "5678 Fisher Island Dr, Miami Beach, FL 33109",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    description: "Exclusive residence on America's wealthiest island, accessible only by ferry or yacht. World-class amenities.",
    photos: ["/images/property-9.jpg", "/images/property-4.jpg", "/images/gallery-1.jpg"],
    renderings: ["/images/rendering-2.jpg", "/images/rendering-1.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 8,
    title: "Venetian Islands Villa",
    location: "Venetian Islands",
    price: "$15,750,000",
    address: "234 W San Marino Dr, Miami Beach, FL 33139",
    beds: 5,
    baths: 6,
    sqft: "7,100",
    description: "Modern architectural gem on the prestigious Venetian Islands with wide bay views and downtown skyline panoramas.",
    photos: ["/images/property-8.jpg", "/images/property-1.jpg", "/images/gallery-2.jpg"],
    renderings: ["/images/rendering-1.jpg", "/images/rendering-2.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 9,
    title: "Bal Harbour Oceanfront",
    location: "Bal Harbour",
    price: "$42,000,000",
    address: "10101 Collins Ave, Bal Harbour, FL 33154",
    beds: 6,
    baths: 8,
    sqft: "9,500",
    description: "Ultra-luxury oceanfront residence with direct beach access, steps from world-class shopping at Bal Harbour Shops.",
    photos: ["/images/property-10.jpg", "/images/property-5.jpg", "/images/gallery-3.jpg"],
    renderings: ["/images/rendering-2.jpg", "/images/rendering-1.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
  {
    id: 10,
    title: "Coconut Grove Estate",
    location: "Coconut Grove",
    price: "$19,500,000",
    address: "3456 Main Hwy, Coconut Grove, FL 33133",
    beds: 7,
    baths: 8,
    sqft: "11,200",
    description: "Sprawling estate in the heart of Coconut Grove, featuring lush tropical gardens and a private guest house.",
    photos: ["/images/property-6.jpg", "/images/property-3.jpg", "/images/gallery-4.jpg"],
    renderings: ["/images/rendering-1.jpg", "/images/rendering-2.jpg"],
    floorplans: ["/images/floorplan-1.jpg"],
  },
]

type MediaType = "photos" | "renderings" | "floorplans"

interface LightboxState {
  isOpen: boolean
  propertyId: number | null
  mediaType: MediaType
  currentIndex: number
}

export default function RealEstatePage() {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    propertyId: null,
    mediaType: "photos",
    currentIndex: 0,
  })

  const openLightbox = (propertyId: number, mediaType: MediaType, index: number = 0) => {
    setLightbox({
      isOpen: true,
      propertyId,
      mediaType,
      currentIndex: index,
    })
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      propertyId: null,
      mediaType: "photos",
      currentIndex: 0,
    })
    document.body.style.overflow = ""
  }

  const getCurrentMedia = () => {
    if (!lightbox.propertyId) return []
    const property = properties.find((p) => p.id === lightbox.propertyId)
    if (!property) return []
    return property[lightbox.mediaType]
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    const media = getCurrentMedia()
    if (direction === "prev") {
      setLightbox((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex === 0 ? media.length - 1 : prev.currentIndex - 1,
      }))
    } else {
      setLightbox((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex === media.length - 1 ? 0 : prev.currentIndex + 1,
      }))
    }
  }

  const switchMediaType = (mediaType: MediaType) => {
    setLightbox((prev) => ({
      ...prev,
      mediaType,
      currentIndex: 0,
    }))
  }

  return (
    <>
      <Header />
      
      <main className="pt-24 lg:pt-32">
        {/* Page Header */}
        <section className="px-6 pb-16 md:pb-24 lg:px-12">
          <div className="mx-auto max-w-[1800px]">
            <Link 
              href="/" 
              className="mb-8 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
            
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="label-aman mb-4">Our Portfolio</p>
                <h1 className="heading-aman">
                  Exclusive<br className="hidden md:block" /> Residences
                </h1>
              </div>
              <p className="max-w-md text-muted-foreground leading-relaxed">
                Discover our curated collection of Miami&apos;s most exceptional properties, 
                each representing the pinnacle of luxury living.
              </p>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-[1800px]">
            <div className="grid gap-16 md:gap-24">
              {properties.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  index={index}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightbox.isOpen && lightbox.propertyId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 text-cream/70 transition-colors hover:text-cream"
          >
            <X size={28} />
          </button>

          {/* Media type switcher */}
          <div className="absolute left-6 top-6 flex gap-4">
            <button
              onClick={() => switchMediaType("photos")}
              className={`flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                lightbox.mediaType === "photos" ? "text-cream" : "text-cream/50 hover:text-cream/70"
              }`}
            >
              <Camera size={16} />
              Photos
            </button>
            <button
              onClick={() => switchMediaType("renderings")}
              className={`flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                lightbox.mediaType === "renderings" ? "text-cream" : "text-cream/50 hover:text-cream/70"
              }`}
            >
              <Layers size={16} />
              Renderings
            </button>
            <button
              onClick={() => switchMediaType("floorplans")}
              className={`flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                lightbox.mediaType === "floorplans" ? "text-cream" : "text-cream/50 hover:text-cream/70"
              }`}
            >
              <Grid3X3 size={16} />
              Floor Plans
            </button>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => navigateLightbox("prev")}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-cream/70 transition-colors hover:text-cream"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={() => navigateLightbox("next")}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-cream/70 transition-colors hover:text-cream"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image */}
          <div className="relative h-[80vh] w-[90vw] max-w-6xl">
            <Image
              src={getCurrentMedia()[lightbox.currentIndex]}
              alt="Property media"
              fill
              className="object-contain"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] text-cream/70">
            {lightbox.currentIndex + 1} / {getCurrentMedia().length}
          </div>
        </div>
      )}
    </>
  )
}

function PropertyCard({
  property,
  index,
  onOpenLightbox,
}: {
  property: (typeof properties)[number]
  index: number
  onOpenLightbox: (propertyId: number, mediaType: MediaType, index?: number) => void
}) {
  const isReversed = index % 2 === 1

  return (
    <div className={`grid gap-8 lg:grid-cols-2 lg:gap-16 ${isReversed ? "lg:direction-rtl" : ""}`}>
      {/* Image Section */}
      <div className={`${isReversed ? "lg:order-2" : ""}`}>
        <div 
          className="image-aman relative aspect-[4/3] cursor-pointer"
          onClick={() => onOpenLightbox(property.id, "photos", 0)}
        >
          <Image
            src={property.photos[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-700 hover:bg-black/20" />
          
          {/* Photo count badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-charcoal/80 px-3 py-2 text-[10px] tracking-[0.15em] text-cream uppercase">
            <Camera size={14} />
            {property.photos.length} Photos
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <button
            onClick={() => onOpenLightbox(property.id, "photos", 0)}
            className="group relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={property.photos[1] || property.photos[0]}
              alt="Photo"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
              <Camera size={16} className="text-cream opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </button>
          <button
            onClick={() => onOpenLightbox(property.id, "renderings", 0)}
            className="group relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={property.renderings[0]}
              alt="Rendering"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
              <Layers size={16} className="text-cream opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </button>
          <button
            onClick={() => onOpenLightbox(property.id, "floorplans", 0)}
            className="group relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={property.floorplans[0]}
              alt="Floor Plan"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
              <Grid3X3 size={16} className="text-cream opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex flex-col justify-center ${isReversed ? "lg:order-1 lg:text-right" : ""}`}>
        <p className="label-aman mb-3">{property.location}</p>
        <h2 className="font-serif text-3xl text-foreground md:text-4xl lg:text-5xl">
          {property.title}
        </h2>
        <p className="mt-2 text-[13px] text-muted-foreground">{property.address}</p>
        
        <p className="mt-6 text-muted-foreground leading-relaxed">
          {property.description}
        </p>

        {/* Specs */}
        <div className={`mt-8 flex gap-8 ${isReversed ? "lg:justify-end" : ""}`}>
          <div>
            <p className="font-serif text-3xl text-foreground">{property.beds}</p>
            <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">Bedrooms</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-foreground">{property.baths}</p>
            <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">Bathrooms</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-foreground">{property.sqft}</p>
            <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">Sq Ft</p>
          </div>
        </div>

        {/* Price */}
        <p className="mt-8 font-serif text-2xl text-foreground md:text-3xl">
          {property.price}
        </p>

        {/* Actions */}
        <div className={`mt-8 flex gap-4 ${isReversed ? "lg:justify-end" : ""}`}>
          <button className="btn-aman">
            Schedule Tour
          </button>
          <button className="group flex items-center gap-2 text-[11px] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground">
            View Details
            <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
