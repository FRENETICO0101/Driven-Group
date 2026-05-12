"use client"

import Image from "next/image"
import Link from "next/link"

const experiences = [
  {
    id: 1,
    title: "Private Viewings",
    description: "Exclusive access to properties before they reach the market",
    image: "/images/gallery-1.jpg",
  },
  {
    id: 2,
    title: "Curated Collections",
    description: "Personalized property portfolios tailored to your vision",
    image: "/images/gallery-2.jpg",
  },
  {
    id: 3,
    title: "Concierge Services",
    description: "Seamless transition and lifestyle management",
    image: "/images/gallery-3.jpg",
  },
]

export function Experiences() {
  return (
    <section id="experiences" className="section-aman bg-sand">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <p className="label-aman mb-4">The Driven Experience</p>
          <h2 className="heading-aman">
            Beyond the
            <br />
            Ordinary
          </h2>
          <p className="mt-8 body-aman">
            We offer a suite of bespoke services designed to elevate every 
            aspect of your real estate journey.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {experiences.map((experience) => (
            <Link 
              key={experience.id} 
              href="#contact"
              className="group block"
            >
              {/* Image */}
              <div className="image-aman relative aspect-[3/4]">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-all duration-700 group-hover:bg-charcoal/20" />
              </div>
              
              {/* Content */}
              <div className="mt-6">
                <h3 className="font-serif text-2xl text-foreground">
                  {experience.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {experience.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
