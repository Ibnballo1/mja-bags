import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";

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
    default: "MAJ Bags — Premium Lifestyle Bags",
    template: "%s | MAJ Bags",
  },
  description:
    "Discover MAJ Bags — premium handcrafted bags for those who appreciate quality, craftsmanship, and timeless elegance.",
  keywords: [
    "premium bags",
    "luxury handbags",
    "leather bags",
    "tote bags",
    "MAJ Bags",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "MAJ Bags",
    title: "MAJ Bags — Premium Lifestyle Bags",
    description:
      "Premium handcrafted bags for those who appreciate quality and timeless elegance.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MAJ Bags",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAJ Bags — Premium Lifestyle Bags",
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
      <body className="bg-background text-foreground font-sans antialiased bg-noise">
        <main className="min-h-screen relative flex flex-col">{children}</main>
        <Toaster closeButton richColors position="top-center" />
      </body>
    </html>
  );
}
