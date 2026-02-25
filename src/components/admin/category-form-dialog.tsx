"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Separator } from "@/src/components/ui/separator";
import {
  categorySchema,
  type CategoryInput,
} from "@/src/lib/validation/schemas";
import { createCategory, updateCategory } from "@/src/actions/categories";
import { slugify } from "@/src/lib/utils";
import { toast } from "sonner";

interface CategoryFormDialogProps {
  children: ReactNode;
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    sortOrder: number;
    isActive: boolean;
  };
}

export default function CategoryFormDialog({
  children,
  initialData,
}: CategoryFormDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ?? {
      isActive: true,
      sortOrder: 0,
    },
  });

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    // 1. Manually update the 'name' field in the form state
    setValue("name", value, { shouldValidate: true });

    // 2. Update the slug if not in edit mode
    if (!isEdit) {
      setValue("slug", slugify(value), { shouldValidate: true });
    }
  }

  function onSubmit(data: CategoryInput) {
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateCategory(initialData.id, data);
          toast.success("Category updated");
        } else {
          await createCategory(data);
          toast.success("Category created");
          reset();
        }
        setOpen(false);
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to save category",
        );
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "New Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="cat-name">Name *</Label>
            <Input
              id="cat-name"
              {...register("name")} // Keep this for registration
              onChange={(e) => {
                // This overrides the register's onChange safely
                handleNameChange(e);
              }}
              className="mt-1.5"
              placeholder="Tote Bags"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cat-slug">Slug *</Label>
            <Input
              id="cat-slug"
              {...register("slug")}
              className="mt-1.5 font-mono text-sm"
              placeholder="tote-bags"
            />
            {errors.slug && (
              <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cat-description">Description</Label>
            <Textarea
              id="cat-description"
              {...register("description")}
              className="mt-1.5 resize-none"
              rows={3}
              placeholder="Optional description"
            />
          </div>

          <div>
            <Label htmlFor="cat-sort">Sort Order</Label>
            <Input
              id="cat-sort"
              type="number"
              min={0}
              {...register("sortOrder")}
              className="mt-1.5"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <input
              type="checkbox"
              {...register("isActive")}
              className="w-5 h-5 rounded accent-olive-600"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
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
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
