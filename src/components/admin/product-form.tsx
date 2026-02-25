"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { productSchema, type ProductInput } from "@/src/lib/validation/schemas";
import {
  createProduct,
  updateProduct,
  addProductImage,
  deleteProductImage,
} from "@/src/actions/product";
import { slugify } from "@/src/lib/utils";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

interface ProductFormProps {
  categories: Category[];
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string | null;
    price: string;
    compareAtPrice: string | null;
    sku: string | null;
    stockQuantity: number;
    categoryId: string | null;
    isFeatured: boolean;
    isActive: boolean;
    images: ProductImage[];
  };
}

export default function ProductForm({
  categories,
  initialData,
}: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<ProductImage[]>(
    initialData?.images ?? [],
  );
  const [isUploading, setIsUploading] = useState(false);

  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(initialData.price),
          compareAtPrice: initialData.compareAtPrice
            ? parseFloat(initialData.compareAtPrice)
            : null,
          categoryId: initialData.categoryId ?? undefined,
          sku: initialData.sku ?? undefined,
          shortDescription: initialData.shortDescription ?? undefined,
        }
      : {
          isActive: true,
          isFeatured: false,
          stockQuantity: 0,
        },
  });

  const watchedName = watch("name");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    // register("name").onChange(e);
    setValue("name", name, { shouldValidate: true });
    if (!isEdit) {
      setValue("slug", slugify(name), { shouldValidate: true });
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!initialData?.id) {
      toast.error("Please save the product first before uploading images");
      return;
    }

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", initialData.id);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error);
        }

        const { url } = await res.json();
        const isPrimary = images.length === 0;

        const image = await addProductImage(
          initialData.id,
          url,
          file.name,
          images.length,
          isPrimary,
        );

        setImages((prev) => [...prev, image]);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Upload failed");
      }
    }

    setIsUploading(false);
    e.target.value = "";
  }

  async function handleDeleteImage(imageId: string) {
    try {
      await deleteProductImage(imageId);
      setImages((prev) => prev.filter((i) => i.id !== imageId));
      toast.success("Image removed");
    } catch {
      toast.error("Failed to remove image");
    }
  }

  async function onSubmit(data: ProductInput) {
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateProduct(initialData.id, data);
          toast.success("Product updated successfully");
        } else {
          const product = await createProduct(data);
          toast.success("Product created successfully");
          router.push(`/admin/products/${product.id}/edit`);
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to save product",
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  {...register("name")} // Keep this for registration
                  onChange={(e) => {
                    // This overrides the register's onChange safely
                    handleNameChange(e);
                  }}
                  className="mt-1.5"
                  placeholder="Premium Leather Tote"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  className="mt-1.5 font-mono text-sm"
                  placeholder="premium-leather-tote"
                />
                {errors.slug && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  {...register("shortDescription")}
                  className="mt-1.5"
                  placeholder="Brief product summary (shown in cards)"
                />
              </div>

              <div>
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  className="mt-1.5 resize-none"
                  rows={8}
                  placeholder="Detailed product description..."
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              {!isEdit && (
                <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-xl mb-4">
                  Save the product first to upload images.
                </p>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                  {images.map((img) => (
                    <div key={img.id} className="relative group aspect-square">
                      <Image
                        src={img.url}
                        alt={img.altText ?? "Product image"}
                        fill
                        className="object-cover rounded-xl"
                        sizes="100px"
                      />
                      {img.isPrimary && (
                        <div className="absolute top-1 left-1">
                          <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.id)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {isEdit && (
                <label
                  className={`flex flex-col items-center justify-center border-2 border-dashed border-cream-300 rounded-2xl p-8 cursor-pointer hover:border-olive-400 hover:bg-olive-50 transition-colors ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 text-olive-600 animate-spin mb-2" />
                  ) : (
                    <Upload className="h-8 w-8 text-cream-400 mb-2" />
                  )}
                  <p className="text-sm text-[#6B7280]">
                    {isUploading ? "Uploading..." : "Click to upload images"}
                  </p>
                  <p className="text-xs text-cream-400 mt-1">
                    JPEG, PNG, WebP up to 10MB
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price">Price (₦) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("price")}
                  className="mt-1.5"
                  placeholder="25000"
                />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="compareAtPrice">Compare-at Price (₦)</Label>
                <Input
                  id="compareAtPrice"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("compareAtPrice")}
                  className="mt-1.5"
                  placeholder="35000 (optional)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  {...register("sku")}
                  className="mt-1.5 font-mono"
                  placeholder="MAJ-001"
                />
              </div>

              <div>
                <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  min={0}
                  {...register("stockQuantity")}
                  className="mt-1.5"
                />
                {errors.stockQuantity && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.stockQuantity.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Organization */}
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Category</Label>
                <Select
                  // If no categoryId, use "none" to match the SelectItem value
                  defaultValue={initialData?.categoryId ?? "none"}
                  onValueChange={(v) => {
                    // Convert "none" back to null for your database/schema
                    setValue("categoryId", v === "none" ? null : v);
                  }}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Change value from "" to "none" */}
                    <SelectItem value="none">No Category</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Active</Label>
                  <p className="text-xs text-[#6B7280]">Visible in store</p>
                </div>
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="w-5 h-5 rounded accent-olive-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Featured</Label>
                  <p className="text-xs text-[#6B7280]">Shown on homepage</p>
                </div>
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="w-5 h-5 rounded accent-olive-600"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
