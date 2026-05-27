export function BusinessCTA() {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-white border border-light-gray rounded-lg p-12 sm:p-16 md:p-20 text-center">
        <p className="editorial-label text-gray mb-4">PARTNERSHIP OPPORTUNITIES</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black leading-[1.2] mb-6 max-w-2xl mx-auto">
          Explore Strategic Partnerships
        </h2>
        <p className="text-dark-gray text-lg leading-relaxed max-w-xl mx-auto mb-12">
          We're always seeking visionary partners to expand our ecosystem and create transformative value together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors">
            Get in Touch
          </button>
          <button className="px-8 py-3 border border-light-gray text-black text-sm font-semibold rounded-lg hover:bg-white transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
