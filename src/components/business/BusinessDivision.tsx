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
    <section className="py-20 sm:py-24 md:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? "md:grid-flow-col-dense" : ""}`}>

        {/* Content */}
        <div className={reversed ? "md:col-start-2" : ""}>
          <p className="editorial-label text-gray mb-3">DRIVEN GROUP</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black leading-[1.15] mb-4">
            {title}
          </h2>
          <p className="text-lg text-dark-gray mb-6 leading-relaxed">
            {description}
          </p>
          <p className="text-base text-dark-gray leading-relaxed mb-8">
            {longDescription}
          </p>

          {/* Highlights */}
          <div className="space-y-3">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-black flex-shrink-0 mt-1">check_circle</span>
                <p className="text-dark-gray text-sm leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className={reversed ? "md:col-start-1 md:row-start-1" : ""}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
