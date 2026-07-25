"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminMobileNav, AdminSidebar } from "@/components/layout/AdminSidebar";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes("/admin");

  if (!isAdminRoute) {
    return <main>{children}</main>;
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#f8f8f8]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto grow">
        <AdminMobileNav />
        {children}
      </main>
    </div>
  );
}
