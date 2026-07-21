import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

interface PropertyCardProps {
  image: string;
  imageAlt: string;
  title: string;
  slug: string;
}

export function PropertyCard({ image, imageAlt, title, slug }: PropertyCardProps) {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/real-estate/${slug}`}>
      <article className="group flex h-full flex-col">
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={image}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 35vw"
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/20" />
        </div>
        <div className="mt-6 flex-1">
          <h3 className="font-serif text-2xl leading-tight text-black md:text-3xl">{title}</h3>
        </div>
      </article>
    </Link>
  );
}
