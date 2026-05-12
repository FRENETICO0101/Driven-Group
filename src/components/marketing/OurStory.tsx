"use client";

import Image from "next/image";
import Link from "next/link";

export function OurStory() {
  return (
    <section className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-slate-400 mb-2">DRIVEN GROUP</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Our Story
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 xl:gap-24 items-start">

        {/* Left: Text Blocks */}
        <div className="space-y-12 sm:space-y-16">

          {/* Block 1 */}
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-6 tracking-tight leading-[1.2]">
              A Legacy of Excellence
            </h3>
            <p className="text-base sm:text-lg text-slate-600 leading-[1.8] font-light">
              Founded in the heart of Miami, Driven Group emerged from a vision to redefine luxury real estate investment. For over two decades, we have cultivated relationships with the most discerning investors and curated a portfolio of properties that represent the pinnacle of architectural achievement and lifestyle aspiration. Our commitment to excellence has established us as the premier destination for those seeking not just properties, but strategic vehicles for wealth consolidation.
            </p>
          </div>

          {/* Block 2 */}
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-6 tracking-tight leading-[1.2]">
              Our Philosophy
            </h3>
            <p className="text-base sm:text-lg text-slate-600 leading-[1.8] font-light">
              We believe that exceptional real estate transcends mere transactions. Every property in our collection tells a story of craftsmanship, innovation, and the pursuit of perfection. Our team of specialists brings unparalleled market knowledge and deeply personal approach to every client relationship. From waterfront estates to corporate flagships, we understand that finding the perfect property is about understanding dreams and delivering on the promise of extraordinary returns.
            </p>
          </div>

          {/* Read More */}
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors pt-4"
          >
            <span className="editorial-label tracking-[0.15em]">READ MORE</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1.5">arrow_forward</span>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1582321868612-08e6461a0f7d?w=600&h=750&fit=crop&q=90"
              alt="Driven Group Miami Headquarters"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="editorial-label text-slate-400">MIAMI, FLORIDA</p>
            <p className="editorial-label text-slate-400">EST. 2003</p>
          </div>
        </div>
      </div>

    </section>
  );
}
