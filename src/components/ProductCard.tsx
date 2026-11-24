import Image from "next/image";
import Link from "next/link";
import { getCategory, type CategorySlug } from "@/data/categories";
import type { ProductCardData, ProductImage as Img } from "@/data/products";
import { href, type Locale } from "@/i18n/config";

/** A product's main photo, or tasteful placeholder art when it has none. */
export function ProductImage({
  name,
  category,
  image,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  name: string;
  category: CategorySlug;
  image?: Img;
  className?: string;
  sizes?: string;
}) {
  const cat = getCategory(category);
  return image ? (
    <div className={`relative overflow-hidden ${image.contain ? "bg-white" : "bg-sand"} ${className}`}>
      <Image
        src={image.src}
        alt={name}
        fill
        sizes={sizes}
        className={`transition duration-700 group-hover:scale-105 ${image.contain ? "object-contain p-4" : "object-cover"}`}
      />
    </div>
  ) : (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${cat?.tone ?? ""} ${className}`}
      aria-hidden="true"
    >
      <span className="font-serif text-xl italic text-white/70">{name}</span>
    </div>
  );
}

/** Product card. Works in server and client components (takes plain card data). */
export function ProductCard({ product, lang, sampleLabel }: { product: ProductCardData; lang: Locale; sampleLabel: string }) {
  return (
    <Link
      href={href(lang, `/products/${product.category}/${product.slug}`)}
      className="group block overflow-hidden bg-white transition hover:shadow-xl"
    >
      <div className="relative">
        <ProductImage name={product.name} category={product.category} image={product.image} className="aspect-[4/3] w-full" />
        {product.sample && (
          <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
            {sampleLabel}
          </span>
        )}
      </div>
      <div className="p-5">
        {product.brand && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">{product.brand}</p>
        )}
        <h3 className="mt-1 font-serif text-xl text-navy group-hover:text-teal">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-navy/70">{product.tagline}</p>
      </div>
    </Link>
  );
}
