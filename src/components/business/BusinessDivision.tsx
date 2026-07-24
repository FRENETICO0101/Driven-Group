interface BusinessDivisionProps {
  id: string;
  index: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  reversed?: boolean;
}

export function BusinessDivision({ id, index, title, description, longDescription, image, imageAlt, highlights, reversed }: BusinessDivisionProps) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-12 sm:px-8 sm:py-16 md:py-20">
      <div className={`wealth-interactive mx-auto grid max-w-6xl items-center gap-8 rounded-2xl border border-light-gray bg-white p-5 shadow-[0_14px_36px_rgba(37,37,37,0.04)] sm:p-8 md:grid-cols-2 md:gap-12 lg:p-10 ${reversed ? 'md:grid-flow-col-dense' : ''}`}>
        <div className={reversed ? 'md:col-start-2' : ''}>
          <div className="mb-5 flex items-center gap-3">
            <span className="editorial-label text-gray">{index}</span>
            <span className="h-px w-10 bg-light-gray" />
            <span className="editorial-label text-gray">Driven Business</span>
          </div>
          <h2 className="font-serif text-3xl font-bold leading-[1.08] text-black sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-relaxed text-dark-gray sm:text-lg">{description}</p>
          {longDescription && <p className="mt-4 text-sm leading-relaxed text-dark-gray">{longDescription}</p>}
          {highlights.length > 0 && (
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2 text-sm leading-relaxed text-dark-gray">
                  <span className="material-symbols-outlined mt-0.5 text-base text-black">check_circle</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={reversed ? 'md:col-start-1 md:row-start-1' : ''}>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-light-gray/15">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
