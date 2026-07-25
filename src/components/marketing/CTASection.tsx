import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";

export function CTASection() {
  const t = useTranslations("cta");
  return (
    <section className="py-24 sm:py-28 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="border border-black rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden bg-black text-white shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(178,144,99,0.25),transparent_31%),linear-gradient(120deg,rgba(255,255,255,0.08),transparent_42%)]" />
        <div className="absolute -right-24 -bottom-32 opacity-15">
          <Icon name="apartment" className="h-[380px] w-[380px] text-white" />
        </div>
        <div className="absolute left-0 top-0 h-1 w-24 bg-white sm:w-36" />
        <div className="max-w-3xl relative z-10">
          <p className="editorial-label text-light-gray mb-5">{t("label")}</p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            {t("headline")}
          </h2>
          <p className="text-base sm:text-lg text-light-gray mb-8 sm:mb-10 leading-[1.8] font-light max-w-2xl">
            {t("body")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="/contact" className="bg-white px-8 sm:px-10 py-4 rounded-lg sm:rounded-xl font-semibold text-base text-black transition-all hover:bg-light-gray hover:-translate-y-0.5 inline-block text-center shadow-lg">
              {t("scheduleBtn")}
              <Icon name="arrow_forward" className="ml-2 inline-block h-[18px] w-[18px] align-middle" />
            </a>
            <a href="/real-estate" className="border border-white/35 px-8 sm:px-10 py-4 rounded-lg sm:rounded-xl font-semibold text-base text-white hover:border-white hover:bg-white/10 transition-all inline-block text-center">
              {t("exploreBtn")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
