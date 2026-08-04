import Image from "next/image";

type AcademyBrand = "driven-academy" | "modo-rico" | "nexoramr";
type LogoTone = "adaptive" | "light" | "dark";

const assets = {
  "driven-academy": {
    light: "/images1/brand-academy-light.png",
    dark: "/images1/brand-academy-dark.png",
    alt: "Driven Academy",
  },
  "modo-rico": {
    light: "/images1/modo-rico-logo-on-light.png",
    dark: "/images1/modo-rico-logo-on-dark.png",
    alt: "Modo Rico - Metodo Driven",
  },
  nexoramr: {
    light: "/images1/nexoramr-logo-on-light.png",
    dark: "/images1/nexoramr-logo-on-dark.png",
    alt: "NEXORAMR by Driven Academy",
  },
} as const;

export function AcademyBrandLogo({ brand, tone = "adaptive", className = "" }: { brand: AcademyBrand; tone?: LogoTone; className?: string }) {
  const asset = assets[brand];

  if (tone !== "adaptive") {
    return <span className={`relative block aspect-[2.03] ${className}`}><Image src={asset[tone]} alt={asset.alt} fill sizes="(max-width: 640px) 220px, 320px" className="object-contain" /></span>;
  }

  return (
    <span className={`relative block aspect-[2.03] ${className}`}>
      <Image src={asset.light} alt={asset.alt} fill sizes="(max-width: 640px) 220px, 320px" className="academy-brand-logo-on-light object-contain" />
      <Image src={asset.dark} alt="" aria-hidden fill sizes="(max-width: 640px) 220px, 320px" className="academy-brand-logo-on-dark object-contain" />
    </span>
  );
}
