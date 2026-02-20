import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Package, Shield, Truck } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "../actions/product";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  formatPrice,
  getDiscountPercentage,
  isInStock,
  getLowStockThreshold,
} from "@/src/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription ?? product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | MJA Bags`,
      description:
        product.shortDescription ?? product.description.slice(0, 160),
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(
    product.id,
    product.categoryId,
    4,
  );

  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const inStock = isInStock(product.stockQuantity);
  const lowStock = getLowStockThreshold(product.stockQuantity);
  const primaryImage = product.images[0];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav
          className="text-sm text-[#6B7280] mb-8 flex items-center gap-2"
          aria-label="Breadcrumb"
        >
          <a href="/" className="hover:text-olive-700 transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/shop" className="hover:text-olive-700 transition-colors">
            Shop
          </a>
          {product.category && (
            <>
              <span>/</span>
              <a
                href={`/shop?categoryId=${product.categoryId}`}
                className="hover:text-olive-700 transition-colors"
              >
                {product.category.name}
              </a>
            </>
          )}
          <span>/</span>
          <span className="text-[#1E1E1E] font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20">
          {/* Gallery */}
          <div className="mb-8 lg:mb-0">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Info */}
          <div className="lg:py-4">
            {/* Category */}
            {product.category && (
              <p className="text-xs text-[#6B7280] uppercase tracking-widest mb-3">
                {product.category.name}
              </p>
            )}

            {/* Name */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-2xl font-bold text-olive-700">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-[#6B7280] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {discount && <Badge variant="default">-{discount}% OFF</Badge>}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-400"}`}
              />
              <span
                className={`text-sm font-medium ${inStock ? "text-green-700" : "text-red-600"}`}
              >
                {inStock
                  ? lowStock
                    ? `Only ${product.stockQuantity} left in stock`
                    : "In Stock"
                  : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            {product.shortDescription && (
              <p className="text-[#6B7280] leading-relaxed mb-6">
                {product.shortDescription}
              </p>
            )}

            {/* Add to cart */}
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                slug: product.slug,
                stockQuantity: product.stockQuantity,
                image: primaryImage?.url ?? null,
              }}
              className="w-full mb-4"
            />

            <Separator className="my-8" />

            {/* Full description */}
            <div className="prose prose-sm max-w-none">
              <h3 className="font-serif text-base font-semibold text-[#1E1E1E] mb-3">
                About This Piece
              </h3>
              <div className="text-[#6B7280] leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Features */}
            <div className="space-y-4">
              {[
                {
                  icon: Truck,
                  text: "Free shipping on all orders within Nigeria",
                },
                { icon: Shield, text: "1-year quality guarantee on all bags" },
                { icon: Package, text: "Premium packaging included" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-[#6B7280]"
                >
                  <Icon className="h-4 w-4 text-olive-600 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* SKU */}
            {product.sku && (
              <p className="text-xs text-[#6B7280] mt-6">
                SKU: <span className="font-mono">{product.sku}</span>
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-3xl font-bold text-[#1E1E1E] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
