"use server";

import { db } from "@/src/db";
import { categories } from "@/src/db/schema";
import { eq, asc } from "drizzle-orm";
import { categorySchema } from "../lib/validation/schemas";
import { requireAdmin } from "@/src/lib/auth/helpers";
import { revalidatePath } from "next/cache";

export async function getCategories(activeOnly = true) {
  const conditions = activeOnly ? eq(categories.isActive, true) : undefined;

  return db.query.categories.findMany({
    where: conditions,
    orderBy: [asc(categories.sortOrder), asc(categories.name)],
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });
}

export async function createCategory(
  data: Parameters<typeof categorySchema.parse>[0],
) {
  await requireAdmin();
  const validated = categorySchema.parse(data);

  const [category] = await db.insert(categories).values(validated).returning();

  revalidatePath("/shop");
  revalidatePath("/admin/categories");

  return category;
}

export async function updateCategory(
  id: string,
  data: Partial<Parameters<typeof categorySchema.parse>[0]>,
  imageUrl?: string,
) {
  await requireAdmin();
  const validated = categorySchema.partial().parse(data);

  const [category] = await db
    .update(categories)
    .set({
      ...validated,
      ...(imageUrl ? { imageUrl } : {}),
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id))
    .returning();

  revalidatePath("/shop");
  revalidatePath("/admin/categories");

  return category;
}

export async function deleteCategory(id: string) {
  await requireAdmin();

  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath("/shop");
  revalidatePath("/admin/categories");
}
