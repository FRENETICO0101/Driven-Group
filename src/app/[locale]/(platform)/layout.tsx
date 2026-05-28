import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto grow">{children}</main>
    </div>
  );
}
