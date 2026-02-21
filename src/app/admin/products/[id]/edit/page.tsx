import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { db } from "@/src/db";
import { products, productImages } from "@/src/db/schema";
import { eq, asc } from "drizzle-orm";
import { getCategories } from "@/src/actions/categories";
import ProductForm from "@/src/components/admin/product-form";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  return {
    title: product
      ? `Edit: ${product.name} | Admin`
      : "Product Not Found | Admin",
  };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        images: {
          orderBy: [asc(productImages.sortOrder)],
        },
      },
    }),
    getCategories(false),
  ]);

  if (!product || product.deletedAt) notFound();

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-olive-700 transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="font-serif text-3xl font-bold text-[#1E1E1E]">
          Edit Product
        </h1>
        <p className="text-[#6B7280] mt-1 font-mono text-sm">{product.slug}</p>
      </div>

      <ProductForm
        categories={categories}
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          sku: product.sku,
          stockQuantity: product.stockQuantity,
          categoryId: product.categoryId,
          isFeatured: product.isFeatured,
          isActive: product.isActive,
          images: product.images,
        }}
      />
    </div>
  );
}
