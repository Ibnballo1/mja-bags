import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Package } from "lucide-react";
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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1E1E1E]">
            Products
          </h1>
          <p className="text-[#6B7280] mt-1">
            {products.length} total products
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200">
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Product
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Category
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Price
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Stock
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Date
                  </th>
                  <th className="text-right text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <Package className="h-10 w-10 text-cream-300 mx-auto mb-3" />
                      <p className="text-[#6B7280]">No products yet</p>
                      <Link
                        href="/admin/products/new"
                        className="text-olive-700 text-sm hover:underline mt-1 block"
                      >
                        Add your first product
                      </Link>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    const primaryImage = product.images[0];
                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-cream-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                              {primaryImage ? (
                                <Image
                                  src={primaryImage.url}
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
                            <div>
                              <p className="text-sm font-medium text-[#1E1E1E]">
                                {product.name}
                              </p>
                              <p className="text-xs text-[#6B7280] font-mono">
                                {product.sku ?? "—"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                          {product.category?.name ?? "Uncategorized"}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-[#1E1E1E]">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm font-medium ${
                              product.stockQuantity === 0
                                ? "text-red-500"
                                : product.stockQuantity <= 5
                                  ? "text-amber-600"
                                  : "text-green-600"
                            }`}
                          >
                            {product.stockQuantity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary">
                              {product.isActive ? "Active" : "Draft"}
                            </Badge>
                            {product.isFeatured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                          {formatDate(product.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/admin/products/${product.id}/edit`}>
                                Edit
                              </Link>
                            </Button>
                            <DeleteProductButton
                              productId={product.id}
                              productName={product.name}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
