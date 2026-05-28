export function StatsSection() {
  const stats = [
    { value: "$2.8B", label: "Total Sales Volume" },
    { value: "500+",  label: "Properties Sold" },
    { value: "20+",   label: "Years Experience" },
    { value: "98%",   label: "Client Satisfaction" },
  ];

  return (
    <section className="border-y border-pale bg-off-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-pale">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 sm:px-10 first:pl-0 last:pr-0 flex flex-col justify-center py-4 lg:py-0"
            >
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight mb-2">
                {stat.value}
              </p>
              <p className="editorial-label text-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
