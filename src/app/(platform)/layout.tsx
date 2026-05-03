/**
 * Driven Group - Platform Layout
 * Layout for admin/authenticated pages
 */
import type { ReactNode } from "react";

export default function PlatformLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-black border-r border-white/5 flex flex-col h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-full bg-white flex items-center justify-center text-black">
            <span className="material-symbols-outlined font-bold">home</span>
          </div>
          <div>
            <h1 className="text-slate-100 text-lg font-bold leading-tight">Driven Group</h1>
            <p className="text-primary text-xs font-medium uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary font-semibold transition-all shadow-lg shadow-white/5 text-slate-900"
            href="/admin"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
            href="/admin/properties"
          >
            <span className="material-symbols-outlined">apartment</span>
            <span>Propiedades</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
            href="/inquiries"
          >
            <span className="material-symbols-outlined">mail</span>
            <span>Consultas</span>
          </a>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all">
            <span className="material-symbols-outlined">logout</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
