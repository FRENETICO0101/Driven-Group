import Image from "next/image";

export function ContactHeroSection() {
  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative min-h-[56svh] overflow-hidden bg-[#151515] sm:min-h-[62vh]" aria-label="Driven Group">
        <Image
          src="/images1/contact-driven-group-miami.webp"
          alt="Driven Group en Miami"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[64%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,.90)_0%,rgba(15,15,15,.67)_28%,rgba(15,15,15,.15)_64%,rgba(15,15,15,.10)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_31%_50%,rgba(255,255,255,.09),transparent_39%)]" />

        <div className="relative mx-auto flex min-h-[56svh] max-w-[1440px] items-center px-7 sm:min-h-[62vh] sm:px-12 lg:px-20">
          <div className="flex w-full max-w-[21rem] items-center justify-center px-10 py-12 sm:max-w-md sm:px-14 sm:py-16">
            <div className="relative aspect-[5.33/1] w-full max-w-[18rem] overflow-hidden drop-shadow-[0_18px_30px_rgba(0,0,0,.7)]">
              <Image src="/images1/logo-dg-blanco-cropped.png" alt="Driven Group" fill priority unoptimized className="object-contain" />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
