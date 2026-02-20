"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/src/cart-context";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: string;
    slug: string;
    stockQuantity: number;
    image: string | null;
  };
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartContext();

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      slug: product.slug,
      stockQuantity: product.stockQuantity,
      quantity,
    });

    setAdded(true);
    toast.success(`Added to your cart`);

    setTimeout(() => setAdded(false), 2000);
  }

  const isOutOfStock = product.stockQuantity === 0;

  return (
    <Button
      onClick={handleAdd}
      disabled={isOutOfStock || added}
      size="lg"
      className={className}
    >
      {added ? (
        <>
          <Check className="h-5 w-5" />
          Added to Cart
        </>
      ) : isOutOfStock ? (
        "Out of Stock"
      ) : (
        <>
          <ShoppingBag className="h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
