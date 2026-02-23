// src/app/admin/products/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Package, Edit3, MoreVertical } from "lucide-react"; // Added icons
import { getAllProductsAdmin } from "../../../actions/product";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { formatPrice, formatDate } from "@/src/lib/utils";
import DeleteProductButton from "@/src/components/admin/delete-product-button";

export const metadata: Metadata = {
  title: "Products | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <div className="space-y-6 p-4 md:p-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1E1E1E]">
            Products
          </h1>
          <p className="text-[#6B7280] mt-1">
            {products.length} total products
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="border-none md:border shadow-sm">
        <CardContent className="p-0">
          {/* Mobile Product List (Cards) */}
          <div className="grid grid-cols-1 divide-y divide-cream-100 md:hidden">
            {products.length === 0 ? (
              <EmptyState />
            ) : (
              products.map((product) => (
                <div key={product.id} className="p-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-cream-300" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-[#1E1E1E] truncate">
                        {product.name}
                      </h3>
                      <span className="font-bold text-sm">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mb-2">
                      {product.category?.name ?? "Uncategorized"}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-[10px]">
                        {product.isActive ? "Active" : "Draft"}
                      </Badge>
                      <span
                        className={`text-xs font-medium ${product.stockQuantity <= 5 ? "text-amber-600" : "text-green-600"}`}
                      >
                        Stock: {product.stockQuantity}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 flex-1"
                      >
                        <Link href={`/admin/products/${product.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.name}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Product Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200 bg-cream-50/30">
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Product
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Category
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Price
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Stock
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-right text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <EmptyState />
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-cream-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0].url}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-5 w-5 text-cream-300" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[#1E1E1E] truncate max-w-[200px]">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-[#6B7280] font-mono">
                              {product.sku ?? "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">
                        {product.category?.name ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-medium ${product.stockQuantity === 0 ? "text-red-500" : product.stockQuantity <= 5 ? "text-amber-600" : "text-green-600"}`}
                        >
                          {product.stockQuantity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={product.isActive ? "default" : "secondary"}
                        >
                          {product.isActive ? "Active" : "Draft"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-olive-700"
                          >
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <Edit3 className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeleteProductButton
                            productId={product.id}
                            productName={product.name}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <Package className="h-10 w-10 text-cream-300 mx-auto mb-3" />
      <p className="text-[#6B7280]">No products yet</p>
      <Link
        href="/admin/products/new"
        className="text-olive-700 text-sm hover:underline mt-1 block"
      >
        Add your first product
      </Link>
    </div>
  );
}
