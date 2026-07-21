import Image from "next/image";
import corporateLogo from "../../../assets/logos/logo-claro-negro.png";
import realEstateLogo from "../../../assets/logos/logo-re-blanco.png";
import businessLogo from "../../../assets/logos/logo-bussines-blanco.png";
import academyLogo from "../../../assets/logos/academy-blanco.png";
import realEstateDarkLogo from "../../../assets/logos/logo-re-negro.png";
import businessDarkLogo from "../../../assets/logos/logo-bussines-negro.png";
import academyDarkLogo from "../../../assets/logos/academy-negro.png";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: "corporate" | "realEstate" | "business" | "academy";
  dark?: boolean;
}

export function BrandLogo({ className = "w-24", imageClassName = "", variant = "corporate", dark = false }: BrandLogoProps) {
  const isDivisionLogo = variant === "realEstate" || variant === "business" || variant === "academy";
  const logo = variant === "realEstate"
    ? (dark ? realEstateDarkLogo : realEstateLogo)
    : variant === "business"
      ? (dark ? businessDarkLogo : businessLogo)
      : variant === "academy"
        ? (dark ? academyDarkLogo : academyLogo)
        : corporateLogo;
  const aspectRatio = isDivisionLogo ? "aspect-[3.16]" : "aspect-[1.42]";
  const sizes = isDivisionLogo ? "(max-width: 640px) 112px, 192px" : "(max-width: 640px) 80px, 160px";

  return (
    <span data-brand-variant={variant} className={`relative block overflow-hidden ${aspectRatio} ${className}`}>
      <Image
        src={logo}
        alt="Driven Group"
        fill
        sizes={sizes}
        className={`object-cover object-center ${imageClassName}`}
      />
    </span>
  );
}
