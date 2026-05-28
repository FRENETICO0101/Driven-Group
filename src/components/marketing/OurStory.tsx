"use client";

import Image from "next/image";
import Link from "next/link";

export function OurStory() {
  return (
    <section className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-gray mb-2">DRIVEN GROUP</p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
          Our Story
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 xl:gap-24 items-start">

        {/* Left: Text Blocks */}
        <div className="space-y-12 sm:space-y-16">

          {/* Block 1 */}
          <div>
            <p className="text-base sm:text-lg text-dark-gray leading-[1.8] font-light">
              Driven Group fue fundada en el año 2022 por nuestro CEO Iván Rodríguez con la visión de construir una empresa global desde Guadalajara Jalisco, un punto estratégico dentro de una economía dinámica.
              <br /><br />
              Desde sus inicios en el sector inmobiliario, con enfoque en renta a corto plazo y construcción, la empresa evolucionó en Europa y America del Norte, particularmente en el ámbito comercial, la creación de marcas y el desarrollo de negocios. 
              <br /><br />
              Como parte de su proceso de consolidación, en 2026 se incorpora Ricardo Hernández como socio estratégico, sumándose para fortalecer y acelerar la consolidación y expansión del grupo. 
              <br /><br />
              En ese mismo año, Driven Group estructura formalmente su modelo de negocio en tres divisiones estratégicas: Business, Real Estate y Academy. 
              <br /><br />
              Integrando una unidad dedicada a la formación y transferencia de conocimiento, consolidando así un ecosistema empresarial que abarca desde la creación de negocios hasta la inversión inmobiliaria, con un enfoque en la innovación, la sostenibilidad y el valor compartido que articula negocios, real estate y educación.
            </p>
          </div>

          {/* Read More */}
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 text-dark-gray hover:text-black transition-colors pt-4"
          >
            <span className="editorial-label tracking-[0.15em]">READ MORE</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1.5">arrow_forward</span>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="/images1/business-global.jpg"
              alt="Driven Group Miami Headquarters"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="editorial-label text-gray">MIAMI, FLORIDA</p>
            {/* <p className="editorial-label text-gray">EST. 2003</p> */}
          </div>
        </div>
      </div>

    </section>
  );
}
