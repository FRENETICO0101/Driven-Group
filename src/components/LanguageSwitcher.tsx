'use client';

import { useRouter as useNextRouter, usePathname as useNextPathname } from "next/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useNextRouter();
  const pathname = useNextPathname();

  const handleLanguageChange = (newLocale: string) => {
    if (locale !== newLocale) {
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPathname);
    }
  };

  return (
    <div className="flex gap-1.5 items-center">
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide transition-all duration-300 ${
          locale === 'es'
            ? 'bg-black text-white'
            : 'text-gray hover:text-black hover:bg-white/50'
        }`}
        aria-label="Cambiar a español"
        aria-current={locale === 'es' ? 'page' : undefined}
      >
        ES
      </button>
      <span className="text-light-gray">/</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide transition-all duration-300 ${
          locale === 'en'
            ? 'bg-black text-white'
            : 'text-gray hover:text-black hover:bg-white/50'
        }`}
        aria-label="Switch to English"
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        EN
      </button>
    </div>
  );
}
