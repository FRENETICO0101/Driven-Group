"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function OurStory() {
  return (
    <section className="section-aman bg-background">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <p className="label-aman mb-4">Driven Group</p>
          <h2 className="heading-aman">Our Story</h2>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Left Column - Two Text Blocks */}
          <div className="space-y-12">
            {/* Text Block 1 */}
            <div>
              <h3 className="font-serif text-2xl text-foreground md:text-3xl mb-6">
                A Legacy of Excellence
              </h3>
              <p className="text-base leading-[1.9] text-muted-foreground">
                Founded in the heart of Miami, Driven Group emerged from a vision to 
                redefine luxury real estate. For over two decades, we have cultivated 
                relationships with the most discerning clients and curated a portfolio 
                of properties that represent the pinnacle of architectural achievement 
                and lifestyle aspiration. Our commitment to excellence has established 
                us as the premier destination for those seeking not just a home, but 
                a statement of their success.
              </p>
            </div>

            {/* Text Block 2 */}
            <div>
              <h3 className="font-serif text-2xl text-foreground md:text-3xl mb-6">
                Our Philosophy
              </h3>
              <p className="text-base leading-[1.9] text-muted-foreground">
                We believe that exceptional real estate transcends mere transactions. 
                Every property in our collection tells a story of craftsmanship, 
                innovation, and the pursuit of perfection. Our team of specialists 
                brings unparalleled market knowledge and a deeply personal approach 
                to every client relationship. From waterfront estates to sky-high 
                penthouses, we understand that finding the perfect property is about 
                understanding dreams and delivering on the promise of extraordinary living.
              </p>
            </div>

            {/* Read More Button */}
            <Link
              href="#about"
              className="group inline-flex items-center gap-4 text-[12px] tracking-[0.15em] uppercase text-foreground transition-colors hover:text-muted-foreground"
            >
              Read More
              <ArrowRight 
                size={16} 
                className="transition-transform duration-500 group-hover:translate-x-2" 
              />
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="image-aman relative aspect-[4/5] lg:aspect-[3/4]">
              <Image
                src="/images/property-1.jpg"
                alt="Driven Group Miami headquarters"
                fill
                className="object-cover"
              />
            </div>
            {/* Image Caption */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                Miami, Florida
              </p>
              <p className="text-[11px] tracking-[0.15em] text-muted-foreground">
                Est. 2003
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border pt-16 md:grid-cols-4">
          <div>
            <p className="font-serif text-4xl text-foreground md:text-5xl">$2.8B</p>
            <p className="mt-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              Total Sales Volume
            </p>
          </div>
          <div>
            <p className="font-serif text-4xl text-foreground md:text-5xl">500+</p>
            <p className="mt-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              Properties Sold
            </p>
          </div>
          <div>
            <p className="font-serif text-4xl text-foreground md:text-5xl">20</p>
            <p className="mt-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              Years Experience
            </p>
          </div>
          <div>
            <p className="font-serif text-4xl text-foreground md:text-5xl">98%</p>
            <p className="mt-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              Client Satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
