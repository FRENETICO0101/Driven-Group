export function BusinessCTA() {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-lg p-12 sm:p-16 md:p-20 text-center">
        <p className="editorial-label text-slate-400 mb-4">PARTNERSHIP OPPORTUNITIES</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.2] mb-6 max-w-2xl mx-auto">
          Explore Strategic Partnerships
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed max-w-xl mx-auto mb-12">
          We're always seeking visionary partners to expand our ecosystem and create transformative value together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
            Get in Touch
          </button>
          <button className="px-8 py-3 border border-slate-300 text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
