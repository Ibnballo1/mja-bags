"use client";

import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/src/cart-context";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/src/utils";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, items, removeItem, updateQuantity } = useCartContext();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-product flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cream-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-olive-700" />
            <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">
              Your Cart
            </h2>
            {cart.itemCount > 0 && (
              <span className="bg-olive-100 text-olive-700 text-xs font-medium px-2 py-0.5 rounded-full">
                {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-cream-300" />
              </div>
              <div>
                <p className="font-serif text-lg font-medium text-[#1E1E1E]">
                  Your cart is empty
                </p>
                <p className="text-sm text-[#6B7280] mt-1">
                  Discover our collection and find something you love
                </p>
              </div>
              <Button asChild onClick={onClose}>
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-cream-300" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="text-sm font-medium text-[#1E1E1E] hover:text-olive-700 transition-colors line-clamp-2"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm font-semibold text-olive-700 mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-cream-300 flex items-center justify-center text-[#6B7280] hover:border-olive-600 hover:text-olive-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.stockQuantity}
                          className="w-7 h-7 rounded-full border border-cream-300 flex items-center justify-center text-[#6B7280] hover:border-olive-600 hover:text-olive-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-[#6B7280] hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-200 p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-[#6B7280]">
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#6B7280]">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-[#1E1E1E]">
                <span className="font-serif">Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>

            <Button asChild className="w-full" size="lg" onClick={onClose}>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={onClose}
              asChild
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
