"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Icon } from "@/components/ui/Icon";

const navigation = [
  { href: "/admin", label: "Panel", icon: "business" },
  { href: "/admin/properties", label: "Propiedades", icon: "apartment" },
  { href: "/admin/leads", label: "Consultas", icon: "article" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[#171717] text-white lg:flex">
      <div className="flex items-center gap-3 p-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-white text-black">
          <Icon name="business" className="size-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">Driven Group</h1>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Administración</p>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-4">
        {navigation.map((item) => {
          const active = item.href === "/admin"
            ? pathname === "/admin" || /^\/[a-z]{2}\/admin$/.test(pathname)
            : pathname.includes(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${active ? "bg-white text-black" : "text-zinc-400 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon name={item.icon} className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Icon name="arrow_back" className="size-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

export function AdminMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-light-gray bg-white px-4 py-3 lg:hidden">
      <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Administración">
        {navigation.map((item) => {
          const active = item.href === "/admin"
            ? pathname === "/admin" || /^\/[a-z]{2}\/admin$/.test(pathname)
            : pathname.includes(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${active ? "bg-black text-white" : "text-dark-gray hover:bg-light-gray"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={handleSignOut} className="ml-2 shrink-0 rounded-lg p-2 text-dark-gray hover:bg-light-gray" aria-label="Cerrar sesión">
        <Icon name="arrow_back" className="size-4" />
      </button>
    </header>
  );
}
