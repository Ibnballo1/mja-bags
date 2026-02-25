// src/components/layout/footer.tsx

import Link from "next/link";
import { Separator } from "@/src/components/ui/separator";
import { Instagram, Twitter, Mail } from "lucide-react";

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
    <footer className="bg-primary text-primary-foreground mt-24 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-noise" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Mission */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="font-serif text-3xl lg:text-4xl font-bold tracking-tighter hover:text-secondary transition-colors"
            >
              MAJ<span className="text-secondary">.</span>
            </Link>
            <p className="mt-6 text-base text-primary-foreground/70 leading-relaxed max-w-xs">
              Handcrafting premium lifestyle bags for those who appreciate the
              intersection of heritage craftsmanship and modern elegance.
            </p>
            <div className="mt-8 flex gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-primary-foreground/20 hover:border-secondary hover:text-secondary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-primary-foreground/20 hover:border-secondary hover:text-secondary transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@majbags.com"
                className="p-2 rounded-full border border-primary-foreground/20 hover:border-secondary hover:text-secondary transition-all"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Nav Links Sections */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="lg:pl-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-6">
                {section}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-primary-foreground/60 hover:text-primary-foreground hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-primary-foreground/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-primary-foreground/40 font-medium tracking-wide">
              © {new Date().getFullYear()} MAJ Bags. Created with intention.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-foreground/40">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Lagos, Nigeria
            </span>
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-foreground/40">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Worldwide Shipping
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
