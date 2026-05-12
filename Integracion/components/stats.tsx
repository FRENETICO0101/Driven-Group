const stats = [
  { value: "$4.2B+", label: "Total Sales Volume" },
  { value: "500+", label: "Properties Sold" },
  { value: "15+", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
]

export function Stats() {
  return (
    <section className="section-aman bg-charcoal">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-[11px] tracking-[0.3em] text-cream/40 uppercase mb-4">
            Our Legacy
          </p>
          <h2 className="font-serif text-3xl text-cream md:text-4xl lg:text-5xl">
            A Tradition of Excellence
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-px bg-cream/10 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-charcoal p-8 text-center md:p-12 lg:p-16"
            >
              <p className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-4 text-[11px] tracking-[0.2em] text-cream/50 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
