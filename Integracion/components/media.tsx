"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const mediaItems = [
  {
    id: 1,
    title: "Record-Breaking Sale: Malibu Oceanfront Estate",
    source: "Los Angeles Times",
    image: "/images/gallery-1.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Inside the World of Ultra-Luxury Real Estate",
    source: "The Wall Street Journal",
    image: "/images/gallery-2.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "The Art of Selling Multi-Million Dollar Homes",
    source: "Forbes",
    image: "/images/gallery-3.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Celebrity Real Estate: A Behind-the-Scenes Look",
    source: "Variety",
    image: "/images/gallery-4.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Luxury Market Trends: What to Expect in 2026",
    source: "Bloomberg",
    image: "/images/property-1.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "The Rise of Private Real Estate Investments",
    source: "Financial Times",
    image: "/images/property-2.jpg",
    link: "#",
  },
]

export function Media() {
  return (
    <section id="media" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-secondary/20" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="glass-subtle inline-block rounded-full px-4 py-2 text-[11px] tracking-[0.2em] text-muted-foreground">
            TOP-TIER MARKETING
          </span>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
            In The Media
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
            Through television, newspaper, real estate blogs and websites, 
            the Driven Group receives significant media attention for its 
            client&apos;s properties.
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mediaItems.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>

        {/* View More */}
        <div className="mt-12 text-center">
          <Link
            href="#"
            className="glass-button group inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-foreground transition-all hover:scale-105"
          >
            View All Press
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function MediaCard({ item }: { item: (typeof mediaItems)[number] }) {
  return (
    <Link href={item.link} className="glass-card group block overflow-hidden">
      {/* Image */}
      <div className="image-zoom relative aspect-[16/10] rounded-t-[var(--radius)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="glass-strong flex h-10 w-10 items-center justify-center rounded-full">
            <ArrowUpRight size={16} className="text-foreground" />
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg leading-snug text-foreground transition-colors group-hover:text-ring">
          {item.title}
        </h3>
        <div className="mt-3">
          <span className="glass-subtle inline-block rounded-full px-3 py-1 text-[10px] tracking-[0.1em] text-muted-foreground">
            {item.source.toUpperCase()}
          </span>
        </div>
      </div>
    </Link>
  )
}
