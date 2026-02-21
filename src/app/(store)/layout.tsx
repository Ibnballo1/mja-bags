import type { ReactNode } from "react";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { CartProvider } from "@/src/lib/cart-context";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </CartProvider>
  );
}
