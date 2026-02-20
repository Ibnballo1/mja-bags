"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCartContext } from "@/src/cart-context";
import { createOrder } from "../actions/orders";
import { checkoutSchema, type CheckoutInput } from "@/src/schemas";
import { formatPrice } from "@/src/utils";
import Image from "next/image";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, items, clearCart } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: { country: "Nigeria" },
    },
  });

  async function onSubmit(data: CheckoutInput) {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createOrder(data, items);
      clearCart();
      // Redirect to Paystack
      window.location.href = result.authorizationUrl;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to process order",
      );
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="h-16 w-16 text-cream-300 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-[#1E1E1E] mb-2">
          Your cart is empty
        </h1>
        <p className="text-[#6B7280] mb-6">
          Add some products to your cart before checking out.
        </p>
        <Button asChild>
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl font-bold text-[#1E1E1E] mb-10">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Contact */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-cream-200">
                <h2 className="font-serif text-xl font-semibold text-[#1E1E1E] mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input
                      id="customerName"
                      {...register("customerName")}
                      className="mt-1.5"
                      placeholder="Your full name"
                    />
                    {errors.customerName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email Address *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      {...register("customerEmail")}
                      className="mt-1.5"
                      placeholder="your@email.com"
                    />
                    {errors.customerEmail && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.customerEmail.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      {...register("customerPhone")}
                      className="mt-1.5"
                      placeholder="+234..."
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-cream-200">
                <h2 className="font-serif text-xl font-semibold text-[#1E1E1E] mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      {...register("shippingAddress.street")}
                      className="mt-1.5"
                      placeholder="123 Street Name"
                    />
                    {errors.shippingAddress?.street && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.shippingAddress.street.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        {...register("shippingAddress.city")}
                        className="mt-1.5"
                        placeholder="Lagos"
                      />
                      {errors.shippingAddress?.city && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.shippingAddress.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        {...register("shippingAddress.state")}
                        className="mt-1.5"
                        placeholder="Lagos"
                      />
                      {errors.shippingAddress?.state && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.shippingAddress.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        {...register("shippingAddress.postalCode")}
                        className="mt-1.5"
                        placeholder="100001"
                      />
                      {errors.shippingAddress?.postalCode && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.shippingAddress.postalCode.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        {...register("shippingAddress.country")}
                        className="mt-1.5"
                        defaultValue="Nigeria"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-cream-200">
                <h2 className="font-serif text-xl font-semibold text-[#1E1E1E] mb-4">
                  Order Notes
                </h2>
                <Textarea
                  {...register("notes")}
                  placeholder="Any special instructions? (optional)"
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-cream-200 sticky top-24">
                <h2 className="font-serif text-xl font-semibold text-[#1E1E1E] mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <ul className="space-y-4 mb-6">
                  {items.map((item) => (
                    <li
                      key={item.productId}
                      className="flex gap-3 items-center"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-cream-300" />
                          </div>
                        )}
                        <span className="absolute -top-1 -right-1 bg-olive-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1E1E1E] truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-[#6B7280]">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#1E1E1E]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <Separator className="mb-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-[#6B7280]">
                    <span>Subtotal</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#6B7280]">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                <Separator className="mb-4" />

                <div className="flex justify-between mb-6">
                  <span className="font-serif font-semibold text-[#1E1E1E]">
                    Total
                  </span>
                  <span className="font-serif font-bold text-xl text-olive-700">
                    {formatPrice(cart.total)}
                  </span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatPrice(cart.total)}`
                  )}
                </Button>

                <p className="text-xs text-[#6B7280] text-center mt-4">
                  Secured by Paystack. Your payment info is encrypted.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
