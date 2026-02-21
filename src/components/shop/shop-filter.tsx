"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ShopFiltersProps {
  categories: Category[];
  currentFilters: {
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
  };
  mobile?: boolean;
}

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

function FiltersContent({
  categories,
  currentFilters,
  onClose,
}: ShopFiltersProps & { onClose?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice ?? "");

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/shop?${params.toString()}`);
      onClose?.();
    },
    [router, searchParams, onClose],
  );

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
    onClose?.();
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push("/shop");
    onClose?.();
  };

  const hasActiveFilters =
    currentFilters.categoryId ||
    currentFilters.minPrice ||
    currentFilters.maxPrice;

  return (
    <div className="space-y-8">
      {/* Sort */}
      <div>
        <Label className="text-xs uppercase tracking-widest text-[#6B7280] mb-3 block">
          Sort By
        </Label>
        <Select
          value={currentFilters.sortBy ?? "newest"}
          onValueChange={(v) => updateFilter("sortBy", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <Label className="text-xs uppercase tracking-widest text-[#6B7280] mb-3 block">
            Category
          </Label>
          <div className="space-y-1">
            <button
              onClick={() => updateFilter("categoryId", undefined)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors",
                !currentFilters.categoryId
                  ? "bg-olive-100 text-olive-800 font-medium"
                  : "text-[#6B7280] hover:bg-cream-100",
              )}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateFilter("categoryId", cat.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors",
                  currentFilters.categoryId === cat.id
                    ? "bg-olive-100 text-olive-800 font-medium"
                    : "text-[#6B7280] hover:bg-cream-100",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <Label className="text-xs uppercase tracking-widest text-[#6B7280] mb-3 block">
          Price Range (₦)
        </Label>
        <div className="flex gap-2 mb-3">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
          />
        </div>
        <Button
          onClick={applyPriceFilter}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Apply
        </Button>
      </div>

      {hasActiveFilters && (
        <Button
          onClick={clearFilters}
          variant="ghost"
          size="sm"
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}

export default function ShopFilters({
  categories,
  currentFilters,
  mobile,
}: ShopFiltersProps) {
  const [open, setOpen] = useState(false);

  if (mobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Products</DialogTitle>
          </DialogHeader>
          <FiltersContent
            categories={categories}
            currentFilters={currentFilters}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="sticky top-24">
      <h2 className="font-serif text-lg font-semibold text-[#1E1E1E] mb-6">
        Filters
      </h2>
      <FiltersContent categories={categories} currentFilters={currentFilters} />
    </div>
  );
}
