export function Footer() {
  return (
    <footer className="border-t border-white/8 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16 md:mb-20">

          {/* Brand */}
          <div>
            <h3 className="text-white font-semibold mb-2 tracking-tight">Driven Group</h3>
            <p className="text-white/50 text-sm leading-relaxed">Premium real estate investment platform for corporate wealth consolidation.</p>
          </div>

          {/* Properties */}
          <div>
            <h4 className="editorial-label text-white/40 mb-4 tracking-[0.15em]">PROPERTIES</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li>
                <a href="/real-estate" className="hover:text-white transition-colors">Browse All</a>
              </li>
              <li>
                <a href="/real-estate?type=residential" className="hover:text-white transition-colors">Residential</a>
              </li>
              <li>
                <a href="/real-estate?type=commercial" className="hover:text-white transition-colors">Commercial</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="editorial-label text-white/40 mb-4 tracking-[0.15em]">COMPANY</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li>
                <a href="/about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">News</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="editorial-label text-white/40 mb-4 tracking-[0.15em]">LEGAL</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + Footer */}
        <div className="border-t border-white/8 pt-12 sm:pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
            <p className="text-white/40 text-xs tracking-wider">© 2026 DRIVEN GROUP. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-base">instagram</span>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-base">language</span>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-base">linkedin</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
