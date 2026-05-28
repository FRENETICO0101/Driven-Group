'use client';

import { useTranslations } from "next-intl";
import { BusinessHeroSection } from "@/components/business/BusinessHeroSection";
import { BusinessDivision } from "@/components/business/BusinessDivision";
import { BusinessCTA } from "@/components/business/BusinessCTA";

export default function BusinessPage() {
  const t = useTranslations('business');

  return (
    <main className="min-h-screen bg-white">
      <BusinessHeroSection />

      <section id="divisions">
        {/* Digital Commerce */}
      <BusinessDivision
        title={t('digitalCommerce')}
        description={t('digitalCommerceDesc')}
        image="images1/business-digital.jpg"
        imageAlt="Digital Commerce Technology Platform"
        highlights={[

        ]}
      />

      {/* Global Markets */}
      <BusinessDivision
        title={t('globalMarkets')}
        description={t('globalMarketsDesc')}
        image="images1/business-global.jpg"
        imageAlt="Global Markets Financial Operations"
        highlights={[

        ]}
        reversed
      />

      {/* Strategic Alliances */}
      <BusinessDivision
        title={t('strategicAlliances')}
        description={t('strategicAlliancesDesc')}
        image="images1/business-alliances.jpg"
        imageAlt="Strategic Partnerships and Collaboration"
        highlights={[

        ]}
      />

      {/* Luxury Assets */}
      <BusinessDivision
        title={t('luxuryAssets')}
        description={t('luxuryAssetsDesc')}
        image="images1/business-luxury.jpg"
        imageAlt="Luxury Real Estate Portfolio"
        highlights={[

        ]}
        reversed
      />
      </section>

      <BusinessCTA />
    </main>
  );
}
