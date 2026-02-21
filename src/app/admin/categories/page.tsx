import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { getCategories } from "@/src/actions/categories";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { formatDate } from "@/src/lib/utils";
import CategoryFormDialog from "@/src/components/admin/category-form-dialog";

export const metadata: Metadata = {
  title: "Categories | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getCategories(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1E1E1E]">
            Categories
          </h1>
          <p className="text-[#6B7280] mt-1">{categories.length} categories</p>
        </div>
        <CategoryFormDialog>
          <Button>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </CategoryFormDialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-200">
                {[
                  "Name",
                  "Slug",
                  "Status",
                  "Sort Order",
                  "Created",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-[#6B7280] text-sm"
                  >
                    No categories yet
                  </td>
                </tr>
              ) : (
                categories.map((cat: (typeof categories)[number]) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-cream-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-[#1E1E1E] text-sm">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-[#6B7280]">
                      {cat.slug}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={cat.isActive ? "default" : "secondary"}>
                        {cat.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {cat.sortOrder}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {formatDate(cat.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <CategoryFormDialog
                        initialData={{
                          id: cat.id,
                          name: cat.name,
                          slug: cat.slug,
                          description: cat.description ?? "",
                          sortOrder: cat.sortOrder,
                          isActive: cat.isActive,
                        }}
                      >
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </CategoryFormDialog>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
