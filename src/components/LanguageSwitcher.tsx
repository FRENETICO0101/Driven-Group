'use client';

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'es'
            ? 'bg-black text-white'
            : 'text-gray hover:text-dark-gray'
        }`}
      >
        ES
      </button>
      <span className="text-gray">/</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-black text-white'
            : 'text-gray hover:text-dark-gray'
        }`}
      >
        EN
      </button>
    </div>
  );
}
