export function AcademyCTA() {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-lg p-12 sm:p-16 md:p-20 text-center">
        <p className="editorial-label text-slate-400 mb-4">STAY UPDATED</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.2] mb-6 max-w-2xl mx-auto">
          Be the First to Know
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed max-w-xl mx-auto mb-12">
          Join our waitlist to receive exclusive updates on program launches, special opportunities, and early-bird pricing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
          />
          <button className="px-8 py-3 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap">
            Notify Me
          </button>
        </div>
      </div>
    </section>
  );
}
