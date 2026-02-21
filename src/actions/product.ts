"use server";

import { db } from "@/src/db";
import { products, productImages, categories } from "@/src/db/schema";
import { eq, and, like, gte, lte, desc, asc, isNull, sql } from "drizzle-orm";
import {
  productSchema,
  productFiltersSchema,
} from "@/src/lib/validation/schemas";
import { requireAdmin } from "@/src/lib/auth/helpers";
import { revalidatePath } from "next/cache";
import type { ProductFiltersInput } from "@/src/lib/validation/schemas";

export async function getProducts(
  rawFilters: Partial<ProductFiltersInput> = {},
) {
  const filters = productFiltersSchema.parse(rawFilters);
  const offset = (filters.page - 1) * filters.limit;

  const conditions = [isNull(products.deletedAt), eq(products.isActive, true)];

  if (filters.categoryId) {
    conditions.push(eq(products.categoryId, filters.categoryId));
  }

  if (filters.minPrice !== undefined) {
    conditions.push(gte(products.price, String(filters.minPrice)));
  }

  if (filters.maxPrice !== undefined) {
    conditions.push(lte(products.price, String(filters.maxPrice)));
  }

  if (filters.search) {
    conditions.push(like(products.name, `%${filters.search}%`));
  }

  const orderBy =
    filters.sortBy === "price_asc"
      ? asc(products.price)
      : filters.sortBy === "price_desc"
        ? desc(products.price)
        : filters.sortBy === "name_asc"
          ? asc(products.name)
          : desc(products.createdAt);

  const [data, countResult] = await Promise.all([
    db.query.products.findMany({
      where: and(...conditions),
      with: {
        images: {
          orderBy: [asc(productImages.sortOrder)],
          limit: 1,
        },
        category: true,
      },
      orderBy: [orderBy],
      limit: filters.limit,
      offset,
    }),
    db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(and(...conditions)),
  ]);

  const total = Number(countResult[0]?.count ?? 0);

  return {
    data,
    total,
    page: filters.page,
    limit: filters.limit,
    totalPages: Math.ceil(total / filters.limit),
  };
}

export async function getFeaturedProducts(limit = 8) {
  return db.query.products.findMany({
    where: and(
      isNull(products.deletedAt),
      eq(products.isActive, true),
      eq(products.isFeatured, true),
    ),
    with: {
      images: {
        orderBy: [asc(productImages.sortOrder)],
        limit: 1,
      },
      category: true,
    },
    orderBy: [desc(products.createdAt)],
    limit,
  });
}

export async function getProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: and(
      isNull(products.deletedAt),
      eq(products.isActive, true),
      eq(products.slug, slug),
    ),
    with: {
      images: {
        orderBy: [asc(productImages.sortOrder)],
      },
      category: true,
    },
  });
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string | null,
  limit = 4,
) {
  const conditions = [isNull(products.deletedAt), eq(products.isActive, true)];

  if (categoryId) {
    conditions.push(eq(products.categoryId, categoryId));
  }

  const related = await db.query.products.findMany({
    where: and(...conditions),
    with: {
      images: {
        orderBy: [asc(productImages.sortOrder)],
        limit: 1,
      },
      category: {
        columns: {
          name: true,
        },
      },
    },
    limit: limit + 1,
  });

  return related.filter((p) => p.id !== productId).slice(0, limit);
}

export async function createProduct(
  data: Omit<Parameters<typeof productSchema.parse>[0], never>,
) {
  await requireAdmin();
  const validated = productSchema.parse(data);

  const [product] = await db
    .insert(products)
    .values({
      ...validated,
      price: String(validated.price),
      compareAtPrice: validated.compareAtPrice
        ? String(validated.compareAtPrice)
        : null,
    })
    .returning();

  revalidatePath("/shop");
  revalidatePath("/admin/products");

  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<Parameters<typeof productSchema.parse>[0]>,
) {
  await requireAdmin();
  const validated = productSchema.partial().parse(data);

  const updateData: Record<string, unknown> = {
    ...validated,
    updatedAt: new Date(),
  };

  if (validated.price !== undefined) {
    updateData.price = String(validated.price);
  }

  if (validated.compareAtPrice !== undefined) {
    updateData.compareAtPrice = validated.compareAtPrice
      ? String(validated.compareAtPrice)
      : null;
  }

  const [product] = await db
    .update(products)
    .set(updateData)
    .where(eq(products.id, id))
    .returning();

  revalidatePath("/shop");
  revalidatePath(`/shop/${product?.slug}`);
  revalidatePath("/admin/products");

  return product;
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  await db
    .update(products)
    .set({ deletedAt: new Date(), isActive: false })
    .where(eq(products.id, id));

  revalidatePath("/shop");
  revalidatePath("/admin/products");
}

export async function addProductImage(
  productId: string,
  imageUrl: string,
  altText?: string,
  sortOrder = 0,
  isPrimary = false,
) {
  await requireAdmin();

  if (isPrimary) {
    await db
      .update(productImages)
      .set({ isPrimary: false })
      .where(eq(productImages.productId, productId));
  }

  const [image] = await db
    .insert(productImages)
    .values({
      productId,
      url: imageUrl,
      altText: altText ?? null,
      sortOrder,
      isPrimary,
    })
    .returning();

  revalidatePath("/admin/products");

  return image;
}

export async function deleteProductImage(imageId: string) {
  await requireAdmin();

  await db.delete(productImages).where(eq(productImages.id, imageId));

  revalidatePath("/admin/products");
}

export async function getAllProductsAdmin() {
  await requireAdmin();

  return db.query.products.findMany({
    where: isNull(products.deletedAt),
    with: {
      images: {
        orderBy: [asc(productImages.sortOrder)],
        limit: 1,
      },
      category: true,
    },
    orderBy: [desc(products.createdAt)],
  });
}
