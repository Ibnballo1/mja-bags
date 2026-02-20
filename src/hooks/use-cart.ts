// src/hooks/use-cart.ts

"use client";

import { useState, useEffect, useCallback } from "react";
import type { CartItem, Cart } from "../types";

const CART_KEY = "mja_cart";

function calculateCart(items: CartItem[]): Cart {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal; // shipping calculated at checkout
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, subtotal, total, itemCount };
}

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // Silent fail
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setIsHydrated(true);
  }, []);

  const persistAndSet = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    saveCart(newItems);
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        let newItems: CartItem[];

        if (existing) {
          const newQty = Math.min(
            existing.quantity + (item.quantity ?? 1),
            item.stockQuantity,
          );
          newItems = prev.map((i) =>
            i.productId === item.productId ? { ...i, quantity: newQty } : i,
          );
        } else {
          newItems = [
            ...prev,
            {
              ...item,
              quantity: Math.min(item.quantity ?? 1, item.stockQuantity),
            },
          ];
        }

        saveCart(newItems);
        return newItems;
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const newItems = prev.filter((i) => i.productId !== productId);
      saveCart(newItems);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setItems((prev) => {
        const newItems = prev.map((i) => {
          if (i.productId !== productId) return i;
          return { ...i, quantity: Math.min(quantity, i.stockQuantity) };
        });
        saveCart(newItems);
        return newItems;
      });
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    persistAndSet([]);
  }, [persistAndSet]);

  const cart = calculateCart(items);

  return {
    cart,
    items,
    isHydrated,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
