import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getCategories } from "@/src/actions/categories";
import ProductForm from "@/src/components/admin/product-form";

export const metadata: Metadata = {
  title: "New Product | Admin",
};

export default async function NewProductPage() {
  const categories = await getCategories(false);

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
          New Product
        </h1>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
