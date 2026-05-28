interface BusinessDivisionProps {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  reversed?: boolean;
}

export function BusinessDivision({
  title,
  description,
  longDescription,
  image,
  imageAlt,
  highlights,
  reversed,
}: BusinessDivisionProps) {
  return (
    <section className="py-20 sm:py-24 md:py-32 border-t border-pale">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-center ${
            reversed ? "md:grid-flow-col-dense" : ""
          }`}
        >
          {/* Content */}
          <div className={reversed ? "md:col-start-2" : ""}>
            <p className="editorial-label text-gray mb-4">Driven Group</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.1] mb-6 tracking-tight text-balance">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-dark-gray mb-5 leading-[1.8] font-light">
              {description}
            </p>
            <p className="text-sm text-mid-gray leading-[1.8] font-light mb-10">
              {longDescription}
            </p>

            {/* Highlights */}
            <div className="space-y-3 border-t border-pale pt-8">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="w-px h-4 bg-dark-gray mt-1 shrink-0" />
                  <p className="text-sm text-dark-gray leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={reversed ? "md:col-start-1 md:row-start-1" : ""}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
