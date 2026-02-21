"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: Array<{
    url: string;
    altText: string | null;
  }>;
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];

  function prev() {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-cream-100 rounded-3xl flex items-center justify-center">
        <span className="text-cream-300 text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square bg-cream-100 rounded-3xl overflow-hidden group">
        {activeImage && (
          <Image
            src={activeImage.url}
            alt={activeImage.altText ?? productName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-soft"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 text-[#1E1E1E]" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-soft"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 text-[#1E1E1E]" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    i === activeIndex ? "bg-white w-4" : "bg-white/60",
                  )}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200",
                i === activeIndex
                  ? "ring-2 ring-olive-600 ring-offset-2"
                  : "opacity-60 hover:opacity-100",
              )}
              aria-label={`View image ${i + 1}`}
              aria-current={i === activeIndex}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${productName} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
