import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "../actions/product";
import { getCategories } from "../actions/categories";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "./ShopFilter";
import ShopPagination from "./ShopPagination";

export const metadata: Metadata = {
  title: "Shop All Bags",
  description: "Browse our complete collection of premium handcrafted bags.",
};

interface ShopPageProps {
  searchParams: Promise<{
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const [productsData, categories] = await Promise.all([
    getProducts({
      categoryId: params.categoryId,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      sortBy: params.sortBy as
        | "newest"
        | "price_asc"
        | "price_desc"
        | "name_asc"
        | undefined,
      page: params.page ? Number(params.page) : 1,
      search: params.search,
    }),
    getCategories(true),
  ]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-4xl font-bold text-[#1E1E1E]">
            {params.search
              ? `Results for "${params.search}"`
              : "The Collection"}
          </h1>
          <p className="text-[#6B7280] mt-2">
            {productsData.total} {productsData.total === 1 ? "piece" : "pieces"}{" "}
            available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters sidebar */}
          <aside className="hidden lg:block">
            <ShopFilters
              categories={categories}
              currentFilters={{
                categoryId: params.categoryId,
                minPrice: params.minPrice,
                maxPrice: params.maxPrice,
                sortBy: params.sortBy,
              }}
            />
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Mobile sort/filter bar */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Suspense>
                <ShopFilters
                  categories={categories}
                  currentFilters={{
                    categoryId: params.categoryId,
                    minPrice: params.minPrice,
                    maxPrice: params.maxPrice,
                    sortBy: params.sortBy,
                  }}
                  mobile
                />
              </Suspense>
            </div>

            {productsData.data.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎒</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E1E1E] mb-2">
                  No products found
                </h2>
                <p className="text-[#6B7280]">
                  Try adjusting your filters or browse all products.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {productsData.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {productsData.totalPages > 1 && (
                  <div className="mt-12">
                    <ShopPagination
                      currentPage={productsData.page}
                      totalPages={productsData.totalPages}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
