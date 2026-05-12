"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Globe, Heart, Lightbulb, Target, Users } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Driven Group Headquarters"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-cream/80">
            Our Story
          </p>
          <h1 className="font-serif text-5xl font-light text-cream md:text-7xl lg:text-8xl">
            About Us
          </h1>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section-aman">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-stone">
                Who We Are
              </p>
              <h2 className="font-serif text-4xl font-light text-charcoal md:text-5xl">
                Driven Group
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg leading-relaxed text-stone">
                Driven Group is a premier investment and real estate conglomerate headquartered in 
                Miami, Florida. Founded on the principles of excellence, integrity, and innovation, 
                we have established ourselves as a trusted partner for high-net-worth individuals 
                and institutions seeking exceptional opportunities in real estate, business ventures, 
                and wealth management.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-stone">
                With decades of combined experience and a portfolio spanning multiple continents, 
                our team brings unparalleled expertise to every engagement. We believe in building 
                lasting relationships founded on trust, transparency, and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Quote */}
      <section className="bg-charcoal py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <blockquote className="font-serif text-3xl font-light italic leading-relaxed text-cream md:text-4xl lg:text-5xl">
            {'"All said & done, it\'s your reputation that counts"'}
          </blockquote>
          <p className="mt-8 font-sans text-sm uppercase tracking-[0.3em] text-cream/60">
            The Driven Philosophy
          </p>
        </div>
      </section>

      {/* Mission, Passion, Vision */}
      <section className="section-aman bg-sand/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-stone">
              Our Foundation
            </p>
            <h2 className="font-serif text-4xl font-light text-charcoal md:text-5xl">
              What Drives Us
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Mission */}
            <div className="group text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center border border-charcoal/20 transition-colors duration-500 group-hover:bg-charcoal">
                <Target className="h-8 w-8 text-charcoal transition-colors duration-500 group-hover:text-cream" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-light text-charcoal">Mission</h3>
              <p className="leading-relaxed text-stone">
                To deliver exceptional value and unparalleled service to our clients by identifying 
                and executing strategic investments that generate sustainable growth and lasting wealth. 
                We are committed to excellence in every transaction, relationship, and endeavor.
              </p>
            </div>

            {/* Passion */}
            <div className="group text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center border border-charcoal/20 transition-colors duration-500 group-hover:bg-charcoal">
                <Heart className="h-8 w-8 text-charcoal transition-colors duration-500 group-hover:text-cream" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-light text-charcoal">Passion</h3>
              <p className="leading-relaxed text-stone">
                We are passionate about transforming visions into reality. Our dedication goes beyond 
                business—we genuinely care about our clients&apos; success and take pride in being 
                trusted stewards of their investments. Excellence is not just our goal; it&apos;s our obsession.
              </p>
            </div>

            {/* Vision */}
            <div className="group text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center border border-charcoal/20 transition-colors duration-500 group-hover:bg-charcoal">
                <Lightbulb className="h-8 w-8 text-charcoal transition-colors duration-500 group-hover:text-cream" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-light text-charcoal">Vision</h3>
              <p className="leading-relaxed text-stone">
                To be the most trusted and respected name in luxury real estate and strategic investments 
                globally. We envision a future where Driven Group is synonymous with integrity, innovation, 
                and exceptional results across all markets we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership - CEOs */}
      <section className="section-aman">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-stone">
              Leadership
            </p>
            <h2 className="font-serif text-4xl font-light text-charcoal md:text-5xl">
              Meet Our CEOs
            </h2>
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            {/* CEO 1 */}
            <div className="group">
              <div className="relative mb-8 aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/ceo-1.jpg"
                  alt="Alexander Driven - Co-CEO"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-light text-charcoal">Alexander Driven</h3>
                <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-stone">
                  Co-Chief Executive Officer
                </p>
                <p className="leading-relaxed text-stone">
                  With over 25 years of experience in real estate and investment banking, Alexander 
                  has led some of the most significant transactions in Miami&apos;s luxury market. His 
                  strategic vision and commitment to excellence have been instrumental in building 
                  Driven Group into the powerhouse it is today. He holds an MBA from Harvard Business 
                  School and serves on multiple philanthropic boards.
                </p>
                <div className="mt-6 flex gap-6">
                  <div>
                    <p className="font-serif text-2xl text-charcoal">$1.5B+</p>
                    <p className="text-sm text-stone">Transactions Led</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-charcoal">25+</p>
                    <p className="text-sm text-stone">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CEO 2 */}
            <div className="group">
              <div className="relative mb-8 aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/ceo-2.jpg"
                  alt="Marcus Driven - Co-CEO"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-light text-charcoal">Marcus Driven</h3>
                <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-stone">
                  Co-Chief Executive Officer
                </p>
                <p className="leading-relaxed text-stone">
                  Marcus brings a dynamic approach to business development and client relations. 
                  His expertise in digital commerce and global markets has expanded Driven Group&apos;s 
                  reach across four continents. A graduate of Wharton School of Business, Marcus is 
                  known for his innovative strategies and ability to identify emerging opportunities 
                  before they become mainstream.
                </p>
                <div className="mt-6 flex gap-6">
                  <div>
                    <p className="font-serif text-2xl text-charcoal">4</p>
                    <p className="text-sm text-stone">Continents</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-charcoal">200+</p>
                    <p className="text-sm text-stone">Global Partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-aman bg-charcoal">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-cream/60">
              Our Commitment
            </p>
            <h2 className="font-serif text-4xl font-light text-cream md:text-5xl">
              Why Trust Driven Group
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-cream/20 p-8 text-center">
              <Award className="mx-auto mb-4 h-10 w-10 text-cream/80" />
              <h3 className="mb-2 font-serif text-xl text-cream">Excellence</h3>
              <p className="text-sm text-cream/60">
                Award-winning service recognized by industry leaders worldwide
              </p>
            </div>
            <div className="border border-cream/20 p-8 text-center">
              <Users className="mx-auto mb-4 h-10 w-10 text-cream/80" />
              <h3 className="mb-2 font-serif text-xl text-cream">Relationships</h3>
              <p className="text-sm text-cream/60">
                Long-term partnerships built on trust and mutual success
              </p>
            </div>
            <div className="border border-cream/20 p-8 text-center">
              <Globe className="mx-auto mb-4 h-10 w-10 text-cream/80" />
              <h3 className="mb-2 font-serif text-xl text-cream">Global Reach</h3>
              <p className="text-sm text-cream/60">
                International network spanning major markets across the globe
              </p>
            </div>
            <div className="border border-cream/20 p-8 text-center">
              <Target className="mx-auto mb-4 h-10 w-10 text-cream/80" />
              <h3 className="mb-2 font-serif text-xl text-cream">Results</h3>
              <p className="text-sm text-cream/60">
                Proven track record of exceeding client expectations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-aman">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 font-serif text-4xl font-light text-charcoal md:text-5xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-10 text-lg text-stone">
            Connect with our team to explore how Driven Group can help you achieve your goals.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border border-charcoal bg-charcoal px-10 py-4 font-sans text-sm uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-transparent hover:text-charcoal"
          >
            Contact Us
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
