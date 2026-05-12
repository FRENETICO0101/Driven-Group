"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Globe, Handshake, ShoppingCart, Diamond, TrendingUp, Users, Building, Briefcase } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const divisions = [
  {
    id: "digital-commerce",
    number: "01",
    title: "Digital Commerce",
    subtitle: "Comercio Digital",
    description: "Transforming the digital landscape through innovative e-commerce solutions and cutting-edge technology platforms that connect brands with global audiences.",
    longDescription: "Our Digital Commerce division leads the way in creating seamless online experiences that drive engagement and revenue. We specialize in developing proprietary platforms, integrating AI-driven analytics, and implementing blockchain solutions for secure transactions. From luxury marketplaces to B2B portals, we build digital ecosystems that scale.",
    image: "/images/business-digital.jpg",
    icon: ShoppingCart,
    stats: [
      { value: "$850M+", label: "Digital Transactions" },
      { value: "12M", label: "Active Users" },
      { value: "45+", label: "Platform Partners" },
    ],
    services: [
      "E-Commerce Platform Development",
      "Digital Marketplace Solutions",
      "Payment Integration Systems",
      "AI-Powered Analytics",
      "Blockchain Commerce",
      "Mobile Commerce Apps",
    ],
  },
  {
    id: "global-markets",
    number: "02",
    title: "Global Markets",
    subtitle: "Mercados Globales",
    description: "Strategic positioning in international financial markets, leveraging deep expertise in emerging economies and established financial centers worldwide.",
    longDescription: "Driven Group's Global Markets division operates at the intersection of traditional finance and emerging opportunities. With offices in Miami, Dubai, Singapore, and London, we provide clients with unparalleled access to investment vehicles, market intelligence, and cross-border transaction capabilities. Our team of analysts and traders navigate complex regulatory landscapes to maximize returns.",
    image: "/images/business-global.jpg",
    icon: Globe,
    stats: [
      { value: "28", label: "Countries Active" },
      { value: "$2.4B", label: "Assets Under Advisory" },
      { value: "156", label: "Institutional Partners" },
    ],
    services: [
      "International Investment Advisory",
      "Cross-Border Transactions",
      "Emerging Market Access",
      "Currency & Forex Solutions",
      "Regulatory Compliance",
      "Market Research & Intelligence",
    ],
  },
  {
    id: "strategic-alliances",
    number: "03",
    title: "Strategic Alliances",
    subtitle: "Alianzas Estrategicas",
    description: "Building powerful partnerships that create synergies, unlock new markets, and establish lasting relationships with industry leaders across sectors.",
    longDescription: "Our Strategic Alliances division is the cornerstone of Driven Group's collaborative approach to business. We identify, cultivate, and manage partnerships with Fortune 500 companies, sovereign wealth funds, family offices, and innovative startups. Through joint ventures, co-investments, and strategic collaborations, we create value that extends beyond traditional business boundaries.",
    image: "/images/business-alliances.jpg",
    icon: Handshake,
    stats: [
      { value: "75+", label: "Active Partnerships" },
      { value: "$1.2B", label: "Joint Ventures Value" },
      { value: "18", label: "Industry Sectors" },
    ],
    services: [
      "Partnership Development",
      "Joint Venture Structuring",
      "Mergers & Acquisitions",
      "Corporate Advisory",
      "Family Office Relations",
      "Institutional Partnerships",
    ],
  },
  {
    id: "luxury-assets",
    number: "04",
    title: "Luxury Assets",
    subtitle: "Activos de Lujo",
    description: "Curating and managing exceptional assets including fine art, rare collectibles, luxury vehicles, yachts, and private aviation for discerning clients.",
    longDescription: "The Luxury Assets division serves ultra-high-net-worth individuals seeking to diversify their portfolios with tangible, appreciating assets. Our specialists possess deep expertise in art authentication, collectible valuation, and luxury asset management. From acquiring a Basquiat to commissioning a custom superyacht, we handle every aspect of luxury asset ownership with discretion and excellence.",
    image: "/images/business-luxury.jpg",
    icon: Diamond,
    stats: [
      { value: "$650M", label: "Assets Under Management" },
      { value: "340+", label: "Art Pieces Curated" },
      { value: "28", label: "Yacht & Aviation Fleet" },
    ],
    services: [
      "Fine Art Advisory & Acquisition",
      "Rare Collectibles Management",
      "Luxury Vehicle Portfolio",
      "Yacht & Aviation Services",
      "Wine & Spirits Collection",
      "Asset Authentication & Valuation",
    ],
  },
]

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/business-hero.jpg"
            alt="Driven Group Business"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-sand">
              Driven Group
            </p>
            <h1 className="font-serif text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Business Divisions
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-lg font-light leading-relaxed text-white/80">
              Four integrated divisions working in harmony to create exceptional value 
              across digital, financial, strategic, and luxury sectors.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">Explore</span>
            <div className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-charcoal py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: TrendingUp, value: "$5.1B+", label: "Total Portfolio Value" },
              { icon: Users, value: "2,400+", label: "Global Team Members" },
              { icon: Building, value: "28", label: "International Offices" },
              { icon: Briefcase, value: "15+", label: "Years of Excellence" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto mb-4 h-6 w-6 text-sand" />
                <p className="font-serif text-3xl text-white md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wider text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      {divisions.map((division, index) => (
        <section
          key={division.id}
          id={division.id}
          className={`section-aman ${index % 2 === 1 ? "bg-stone/30" : "bg-cream"}`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            {/* Division Header */}
            <div className="mb-12 flex items-start justify-between">
              <div>
                <span className="font-serif text-6xl text-stone/30 md:text-8xl">
                  {division.number}
                </span>
              </div>
              <division.icon className="h-10 w-10 text-charcoal/40" />
            </div>

            <div className={`grid gap-12 lg:grid-cols-2 lg:gap-20 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={division.image}
                    alt={division.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Stats Overlay */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {division.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="border-t border-charcoal/20 pt-4">
                      <p className="font-serif text-2xl text-charcoal">{stat.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <p className="mb-2 font-sans text-sm uppercase tracking-[0.2em] text-charcoal/50">
                  {division.subtitle}
                </p>
                <h2 className="font-serif text-4xl font-light text-charcoal md:text-5xl">
                  {division.title}
                </h2>
                <p className="mt-6 font-sans text-lg font-light leading-relaxed text-charcoal/70">
                  {division.description}
                </p>
                <p className="mt-4 font-sans text-base leading-relaxed text-charcoal/60">
                  {division.longDescription}
                </p>

                {/* Services */}
                <div className="mt-10">
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-charcoal/50">
                    Core Services
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {division.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="flex items-center gap-2 text-sm text-charcoal/70"
                      >
                        <div className="h-1 w-1 rounded-full bg-sand" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10">
                  <Link
                    href={`#${division.id}`}
                    className="group inline-flex items-center gap-3 border-b border-charcoal/30 pb-2 text-sm uppercase tracking-[0.15em] text-charcoal transition-all hover:border-charcoal hover:gap-4"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Contact CTA */}
      <section className="bg-charcoal py-24">
        <div className="container mx-auto px-6 text-center lg:px-12">
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-sand">
            Partnership Inquiries
          </p>
          <h2 className="font-serif text-4xl font-light text-white md:text-5xl">
            Ready to Collaborate?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-lg font-light leading-relaxed text-white/70">
            Whether you are seeking investment opportunities, strategic partnerships, 
            or access to our exclusive services, our team is ready to discuss how 
            Driven Group can help achieve your goals.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-sand px-8 py-4 text-sm uppercase tracking-[0.15em] text-charcoal transition-all hover:bg-white"
            >
              Schedule a Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="mailto:business@drivengroup.com"
              className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.15em] text-white transition-all hover:bg-white/10"
            >
              business@drivengroup.com
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
