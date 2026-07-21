'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useRouter } from 'next/navigation';

export function AdminNavbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-3">
          <BrandLogo className="w-20" />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">ADMIN</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/admin" className="text-sm text-dark-gray hover:text-black transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/properties" className="text-sm text-dark-gray hover:text-black transition-colors">
            Propiedades
          </Link>
          <Link href="/admin/inquiries" className="text-sm text-dark-gray hover:text-black transition-colors">
            Inquiries
          </Link>
        </nav>

        {/* User Info + Logout */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-semibold text-black">{session?.user?.name || session?.user?.email}</p>
            <p className="text-xs text-gray uppercase tracking-wide">{session?.user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-dark-gray hover:text-black transition-colors border-l border-light-gray pl-6"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
