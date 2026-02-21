"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { useCartContext } from "@/src/lib/cart-context";
import {
  formatPrice,
  getDiscountPercentage,
  isInStock,
  getLowStockThreshold,
  truncate,
} from "@/src/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    compareAtPrice: string | null;
    shortDescription: string | null;
    stockQuantity: number;
    images: Array<{ url: string; altText: string | null }>;
    category: { name: string } | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartContext();
  const primaryImage = product.images[0];
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const inStock = isInStock(product.stockQuantity);
  const lowStock = getLowStockThreshold(product.stockQuantity);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!inStock) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: primaryImage?.url ?? null,
      slug: product.slug,
      stockQuantity: product.stockQuantity,
    });

    toast.success(`${truncate(product.name, 30)} added to cart`);
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block rounded-3xl overflow-hidden bg-white shadow-card border border-cream-200 hover:shadow-product transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] bg-cream-100 overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText ?? product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-cream-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && <Badge variant="default">-{discount}%</Badge>}
          {!inStock && <Badge variant="secondary">Sold Out</Badge>}
          {lowStock && inStock && (
            <Badge variant="destructive">Low Stock</Badge>
          )}
        </div>

        {/* Quick add */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full shadow-soft"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4" />
            {inStock ? "Add to Cart" : "Sold Out"}
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.category && (
          <p className="text-xs text-[#6B7280] uppercase tracking-widest mb-1">
            {product.category.name}
          </p>
        )}
        <h3 className="font-serif font-medium text-[#1E1E1E] text-base leading-tight">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        <div className="flex items-center gap-2 mt-3">
          <span className="font-semibold text-olive-700">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-[#6B7280] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
