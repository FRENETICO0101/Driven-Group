export function ReputationSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white border-y border-light-gray">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <p className="editorial-label text-gray mb-8 tracking-[0.15em]">CORE PRINCIPLE</p>

        <blockquote className="mb-12">
          <p className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-black leading-[1.3] tracking-tight mb-8">
            "All said and done, it's your reputation that counts"
          </p>
          <p className="text-lg text-dark-gray leading-relaxed font-light">
            This principle guides every decision, every partnership, and every interaction. At Driven Group, we understand that in luxury real estate and strategic investment, trust is the most valuable currency. Our reputation is built on decades of integrity, transparency, and delivering on our promises. We don't just sell properties—we build relationships that endure, creating a legacy of trust that transcends transactions.
          </p>
        </blockquote>

        {/* Supporting Stats */}
        <div className="grid grid-cols-3 gap-8 sm:gap-12 mt-16 pt-12 border-t border-light-gray">
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">20+</p>
            <p className="editorial-label text-gray text-xs">YEARS OF TRUST</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">$2.8B</p>
            <p className="editorial-label text-gray text-xs">IN TRANSACTIONS</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">98%</p>
            <p className="editorial-label text-gray text-xs">CLIENT TRUST RATE</p>
          </div>
        </div>
      </div>
    </section>
  );
}
