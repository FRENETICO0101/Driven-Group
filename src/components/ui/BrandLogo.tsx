import Image from "next/image";
import corporateLogo from "../../../assets/logos/logo-claro-negro.png";
import menuLogo from "../../../assets/logos/logo-dg.png";

const realEstateLogo = "/images1/brand-real-estate-light.png";
const businessLogo = "/images1/brand-business-light.png";
const academyLogo = "/images1/brand-academy-light.png";
const realEstateDarkLogo = "/images1/brand-real-estate-dark.png";
const businessDarkLogo = "/images1/brand-business-dark.png";
const academyDarkLogo = "/images1/brand-academy-dark.png";
const aboutLightLogo = "/images1/logo-dg-negro-cropped.png";
const aboutDarkLogo = "/images1/logo-dg-blanco-cropped.png";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: "corporate" | "about" | "realEstate" | "business" | "academy" | "menu";
  dark?: boolean;
  sizes?: string;
}

export function BrandLogo({ className = "w-24", imageClassName = "", variant = "corporate", dark = false, sizes: sizesOverride }: BrandLogoProps) {
  const isDivisionLogo = variant === "realEstate" || variant === "business" || variant === "academy";
  const isAboutLogo = variant === "about";
  const logo = variant === "realEstate"
    ? (dark ? realEstateDarkLogo : realEstateLogo)
    : variant === "business"
      ? (dark ? businessDarkLogo : businessLogo)
      : variant === "academy"
        ? (dark ? academyDarkLogo : academyLogo)
        : variant === "about"
          ? (dark ? aboutDarkLogo : aboutLightLogo)
        : variant === "menu"
          ? menuLogo
        : corporateLogo;
  const aspectRatio = variant === "menu" ? "aspect-square" : isAboutLogo ? "aspect-[5.33]" : isDivisionLogo ? "aspect-[3.15]" : "aspect-[1.42]";
  const sizes = sizesOverride ?? (variant === "menu" ? "(max-width: 1279px) 0px, 384px" : isAboutLogo ? "(max-width: 640px) 120px, 160px" : isDivisionLogo ? "(max-width: 640px) 72px, 112px" : "(max-width: 640px) 96px, 128px");

  return (
    <span data-brand-variant={variant} className={`relative block overflow-hidden ${aspectRatio} ${className}`}>
      <Image
        src={logo}
        alt="Driven Group"
        fill
        sizes={sizes}
        className={`${variant === "menu" ? "object-contain brightness-0 invert object-center" : isAboutLogo ? "object-contain" : "object-contain object-center"} ${imageClassName}`}
      />
    </span>
  );
}
