import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Shop: [
    { href: "/shop", label: "All Products" },
    { href: "/shop?featured=true", label: "Featured" },
    { href: "/shop?category=totes", label: "Totes" },
    { href: "/shop?category=clutches", label: "Clutches" },
  ],
  Company: [
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
    { href: "/care-guide", label: "Care Guide" },
  ],
  Support: [
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-olive-950 text-cream-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-3xl font-bold text-cream-50 tracking-tight"
            >
              MJA<span className="text-gold-400">.</span>
            </Link>
            <p className="mt-4 text-sm text-cream-300 leading-relaxed max-w-xs">
              Premium handcrafted bags for those who appreciate quality,
              craftsmanship, and timeless elegance.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-400 hover:text-gold-400 transition-colors text-sm"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-400 hover:text-gold-400 transition-colors text-sm"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-cream-50 uppercase tracking-widest mb-4">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-400 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-olive-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream-500">
            © {new Date().getFullYear()} MJA Bags. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-cream-500">
              Made with care in Lagos, Nigeria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
