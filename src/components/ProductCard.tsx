import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/products";
import { href, pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProductImage({
  product,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  product: Product;
  className?: string;
  sizes?: string;
}) {
  const cat = getCategory(product.category);
  const img = product.images?.[0];
  return img ? (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <Image
        src={img.src}
        alt={product.name}
        fill
        sizes={sizes}
        className="object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  ) : (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${cat?.tone ?? ""} ${className}`}
      aria-hidden="true"
    >
      <span className="font-serif text-xl italic text-white/70">{product.name}</span>
    </div>
  );
}

export function ProductCard({ product, lang, dict }: { product: Product; lang: Locale; dict: Dictionary }) {
  return (
    <Link
      href={href(lang, `/products/${product.category}/${product.slug}`)}
      className="group block overflow-hidden bg-white transition hover:shadow-xl"
    >
      <div className="relative">
        <ProductImage product={product} className="aspect-[4/3] w-full" />
        {product.sample && (
          <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
            {dict.products.sample}
          </span>
        )}
      </div>
      <div className="p-5">
        {product.brand && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">{product.brand}</p>
        )}
        <h3 className="mt-1 font-serif text-xl text-navy group-hover:text-teal">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-navy/70">{pick(product.tagline, lang)}</p>
      </div>
    </Link>
  );
}
