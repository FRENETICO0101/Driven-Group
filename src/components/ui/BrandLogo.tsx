import Image from "next/image";
import corporateLogo from "../../../assets/logos/logo-claro-negro.png";
import realEstateLogo from "../../../assets/logos/logo-re-blanco.png";
import businessLogo from "../../../assets/logos/logo-bussines-blanco.png";
import academyLogo from "../../../assets/logos/academy-blanco.png";
import realEstateDarkLogo from "../../../assets/logos/logo-re-negro.png";
import businessDarkLogo from "../../../assets/logos/logo-bussines-negro.png";
import academyDarkLogo from "../../../assets/logos/academy-negro.png";
import menuLogo from "../../../assets/logos/logo-dg.png";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: "corporate" | "realEstate" | "business" | "academy" | "menu";
  dark?: boolean;
  sizes?: string;
}

export function BrandLogo({ className = "w-24", imageClassName = "", variant = "corporate", dark = false, sizes: sizesOverride }: BrandLogoProps) {
  const isDivisionLogo = variant === "realEstate" || variant === "business" || variant === "academy";
  const logo = variant === "realEstate"
    ? (dark ? realEstateDarkLogo : realEstateLogo)
    : variant === "business"
      ? (dark ? businessDarkLogo : businessLogo)
      : variant === "academy"
        ? (dark ? academyDarkLogo : academyLogo)
        : variant === "menu"
          ? menuLogo
        : corporateLogo;
  // Division brand files are square canvases. Keeping their intrinsic ratio
  // prevents the mark from being compressed into a shallow horizontal slot.
  const aspectRatio = variant === "menu" || isDivisionLogo ? "aspect-square" : "aspect-[1.42]";
  const sizes = sizesOverride ?? (variant === "menu" ? "(max-width: 1279px) 0px, 256px" : isDivisionLogo ? "(max-width: 640px) 64px, 96px" : "(max-width: 640px) 80px, 160px");

  return (
    <span data-brand-variant={variant} className={`relative block overflow-hidden ${aspectRatio} ${className}`}>
      <Image
        src={logo}
        alt="Driven Group"
        fill
        sizes={sizes}
        className={`${variant === "menu" ? "object-contain brightness-0 invert" : "object-contain"} object-center ${imageClassName}`}
      />
    </span>
  );
}
