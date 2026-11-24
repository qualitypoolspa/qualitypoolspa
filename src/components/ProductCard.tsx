import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/products";
import { href, pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProductImage({ product, className = "" }: { product: Product; className?: string }) {
  const cat = getCategory(product.category);
  const src = product.images?.[0];
  return src ? (
    <Image src={src} alt={product.name} width={800} height={600} className={`object-cover ${className}`} />
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
        <h3 className="font-serif text-xl text-navy group-hover:text-teal">{product.name}</h3>
        <p className="mt-1 text-sm text-navy/70">{pick(product.tagline, lang)}</p>
      </div>
    </Link>
  );
}
