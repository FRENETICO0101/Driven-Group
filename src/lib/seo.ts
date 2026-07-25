import type { Metadata } from "next";

const siteUrl = "https://drivengroup.com";

type SeoLocale = "es" | "en";

export function getSeoLocale(locale: string): SeoLocale {
  return locale === "en" ? "en" : "es";
}

export function buildLocalizedMetadata({
  locale,
  pathname,
  title,
  description,
  imageAlt,
}: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
  imageAlt: string;
}): Metadata {
  const language = getSeoLocale(locale);
  const normalizedPath = pathname === "/" ? "" : pathname;
  const localizedUrl = `${siteUrl}/${language}${normalizedPath}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: language === "es" ? "es_MX" : "en_US",
      url: localizedUrl,
      siteName: "Driven Group",
      title,
      description,
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        es: `${siteUrl}/es${normalizedPath}`,
        en: `${siteUrl}/en${normalizedPath}`,
        "x-default": `${siteUrl}/es${normalizedPath}`,
      },
    },
  };
}
