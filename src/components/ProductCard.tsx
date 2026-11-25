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
        className={`transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${image.contain ? "object-contain p-6" : "object-cover"}`}
      />
    </div>
  ) : (
    <div className={`flex items-center justify-center bg-sand ${className}`} aria-hidden="true" data-category={cat?.slug}>
      <span className="font-serif text-3xl italic text-navy/40">{name}</span>
    </div>
  );
}

/** Product card. Works in server and client components (takes plain card data). */
export function ProductCard({ product, lang, sampleLabel }: { product: ProductCardData; lang: Locale; sampleLabel: string }) {
  return (
    <Link href={href(lang, `/products/${product.category}/${product.slug}`)} className="group block">
      <div className="relative overflow-hidden">
        <ProductImage name={product.name} category={product.category} image={product.image} className="aspect-[4/3] w-full" />
        {product.sample && (
          <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
            {sampleLabel}
          </span>
        )}
      </div>
      <div className="pt-5">
        {product.brand && <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brass">{product.brand}</p>}
        <h3 className="mt-1.5 font-serif text-[1.75rem] leading-tight text-navy">
          <span className="link-line [background-size:0%_1px] group-hover:[background-size:100%_1px]">{product.name}</span>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-navy/65">{product.tagline}</p>
      </div>
    </Link>
  );
}
