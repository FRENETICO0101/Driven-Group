import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Icon } from "@/components/ui/Icon";

interface PropertyCardProps {
  image: string;
  imageAlt: string;
  title: string;
  slug: string;
  priority?: boolean;
}

export function PropertyCard({ image, imageAlt, title, slug, priority = false }: PropertyCardProps) {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/real-estate/${slug}`} className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-gray focus-visible:ring-offset-4">
      <article className="flex h-full flex-col">
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-light-gray/20">
          <Image
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={image}
            fill
            priority={priority}
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 35vw"
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/20" />
        </div>
        <div className="mt-6 flex flex-1 items-start justify-between gap-4">
          <h3 className="font-serif text-2xl leading-tight text-black md:text-3xl">{title}</h3>
          <Icon name="arrow_outward" className="mt-1 h-[18px] w-[18px] text-gray transition-all duration-500 group-hover:translate-x-1 group-hover:text-black" />
        </div>
      </article>
    </Link>
  );
}
