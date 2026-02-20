import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "../cart-context";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MJA Bags — Premium Lifestyle Bags",
    template: "%s | MJA Bags",
  },
  description:
    "Discover MJA Bags — premium handcrafted bags for those who appreciate quality, craftsmanship, and timeless elegance.",
  keywords: [
    "premium bags",
    "luxury handbags",
    "leather bags",
    "tote bags",
    "MJA Bags",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "MJA Bags",
    title: "MJA Bags — Premium Lifestyle Bags",
    description:
      "Premium handcrafted bags for those who appreciate quality and timeless elegance.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MJA Bags",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MJA Bags — Premium Lifestyle Bags",
    description:
      "Premium handcrafted bags for those who appreciate quality and timeless elegance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#F8F9F6] text-[#1E1E1E] font-sans antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
