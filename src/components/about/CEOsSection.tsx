"use client";

import Image from "next/image";

interface CEO {
  name: string;
  title: string;
  bio: string;
  image: string;
}

const ceos: CEO[] = [
  {
    name: "Carlos Eduardo Villegas",
    title: "Chief Executive Officer & Founder",
    bio: "With over 25 years of experience in luxury real estate and strategic investments, Carlos has shaped Driven Group into a global leader in premium property curation. His visionary approach to market dynamics and deep relationships with institutional investors have defined the company's trajectory.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=90",
  },
  {
    name: "Marina Castillo Romero",
    title: "Chief Operating Officer & Co-Founder",
    bio: "Marina brings unparalleled expertise in corporate strategy and operational excellence. Her innovative approach to client engagement and commitment to sustainable growth has transformed Driven Group into an ecosystem of trust, driving transformative outcomes across all business divisions.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&q=90",
  },
];

export function CEOsSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-slate-400 mb-2">LEADERSHIP</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Our Leadership
        </h2>
      </div>

      {/* CEOs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
        {ceos.map((ceo) => (
          <div key={ceo.name} className="flex flex-col">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl mb-8">
              <Image
                src={ceo.image}
                alt={ceo.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2 tracking-tight">
                {ceo.name}
              </h3>
              <p className="editorial-label text-yellow-600 mb-6 tracking-wide">
                {ceo.title}
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-[1.8] font-light">
                {ceo.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
