// src/app/admin/categories/page.tsx

import type { Metadata } from "next";
import { Plus, Edit2, Calendar, Hash, Globe } from "lucide-react";
import { getCategories } from "@/src/actions/categories";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Categories
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} managed
          </p>
        </div>
        <CategoryFormDialog>
          <Button className="w-full sm:w-auto rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </CategoryFormDialog>
      </div>

      {/* Mobile View: List of Cards (Hidden on md+) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {categories.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">
            No categories yet.
          </p>
        ) : (
          categories.map((cat) => (
            <Card
              key={cat.id}
              className="border-border bg-card overflow-hidden rounded-2xl"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Globe className="h-3 w-3" />
                      {cat.slug}
                    </div>
                  </div>
                  <Badge
                    variant={cat.isActive ? "default" : "secondary"}
                    className="rounded-md"
                  >
                    {cat.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                      Order
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Hash className="h-3 w-3 text-secondary" />
                      {cat.sortOrder}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                      Created
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Calendar className="h-3 w-3 text-secondary" />
                      {formatDate(cat.createdAt)}
                    </div>
                  </div>
                </div>

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
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-border hover:bg-primary/5"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-2" />
                    Edit Category
                  </Button>
                </CategoryFormDialog>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Desktop View: Table (Hidden on < md) */}
      <Card className="hidden md:block border-border shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
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
                      className="text-left text-[11px] text-muted-foreground uppercase tracking-[0.1em] font-bold px-6 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-muted-foreground text-sm"
                    >
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-primary/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4 font-bold text-foreground text-sm">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                        /{cat.slug}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={cat.isActive ? "default" : "secondary"}
                          className="rounded-md font-bold"
                        >
                          {cat.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {cat.sortOrder}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 text-primary font-bold"
                          >
                            Edit
                          </Button>
                        </CategoryFormDialog>
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
