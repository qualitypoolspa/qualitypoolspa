"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/data/products";

// Main photo with clickable thumbnails underneath.
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];
  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          key={main.src}
          src={main.src}
          alt={name}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${name} ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square overflow-hidden bg-sand ring-offset-2 transition ${
                i === active ? "ring-2 ring-navy" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="100px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
