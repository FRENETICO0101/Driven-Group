export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16 md:mb-20">

          {/* Brand */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-2 tracking-tight">Driven Group</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Premium real estate investment platform for corporate wealth consolidation.</p>
          </div>

          {/* Properties */}
          <div>
            <h4 className="editorial-label text-slate-400 mb-4 tracking-[0.15em]">PROPERTIES</h4>
            <ul className="space-y-2.5 text-slate-600 text-sm">
              <li>
                <a href="/real-estate" className="hover:text-slate-900 transition-colors">Browse All</a>
              </li>
              <li>
                <a href="/real-estate?type=residential" className="hover:text-slate-900 transition-colors">Residential</a>
              </li>
              <li>
                <a href="/real-estate?type=commercial" className="hover:text-slate-900 transition-colors">Commercial</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="editorial-label text-slate-400 mb-4 tracking-[0.15em]">COMPANY</h4>
            <ul className="space-y-2.5 text-slate-600 text-sm">
              <li>
                <a href="/about" className="hover:text-slate-900 transition-colors">About</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-slate-900 transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 transition-colors">News</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="editorial-label text-slate-400 mb-4 tracking-[0.15em]">LEGAL</h4>
            <ul className="space-y-2.5 text-slate-600 text-sm">
              <li>
                <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + Footer */}
        <div className="border-t border-slate-200 pt-12 sm:pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
            <p className="text-slate-400 text-xs tracking-wider">© 2026 DRIVEN GROUP. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined text-base">instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined text-base">language</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined text-base">linkedin</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
