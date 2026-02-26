import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about MAJ Bags — orders, shipping, returns, care, and more.",
};

const faqGroups = [
  {
    category: "Orders & Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major debit and credit cards (Visa, Mastercard, Verve) as well as bank transfers, processed securely via Paystack. All transactions are encrypted and your card details are never stored on our servers.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "We begin processing orders quickly, but if you need to make a change, contact us within 2 hours of placing your order at hello@majbags.com or via WhatsApp. Once an order has been dispatched, it cannot be cancelled but you can initiate a return.",
      },
      {
        q: "Will I receive an order confirmation?",
        a: "Yes. As soon as your payment is confirmed, you'll receive a confirmation email with your order number, a summary of items, and your shipping address. If you don't see it within 10 minutes, check your spam folder or contact us.",
      },
      {
        q: "Is it safe to shop on MAJ Bags?",
        a: "Absolutely. Our checkout is secured by SSL encryption and payments are processed by Paystack, one of Africa's most trusted payment gateways. We never store your card information.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "Do you offer free shipping?",
        a: "Yes — all orders within Nigeria ship free, no minimum spend required. For international orders, shipping costs are calculated at checkout based on destination and weight.",
      },
      {
        q: "How long does delivery take?",
        a: "Lagos: 1–2 business days. Other states within Nigeria: 2–4 business days. International: 7–14 business days depending on destination. These are estimates; we'll always provide a tracking number so you can follow your order.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. We currently ship to the UK, USA, Canada, and several other countries. Select your country at checkout to see availability and shipping rates. Customs and import duties, where applicable, are the buyer's responsibility.",
      },
      {
        q: "How do I track my order?",
        a: "Once your order is dispatched, you'll receive an email with a tracking number and a link to our courier's tracking portal. You can also view your order status in your account under 'Order History'.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return window from the date of delivery. Items must be unused, in their original packaging, with all tags attached. Sale items and custom/bespoke pieces are final sale and cannot be returned.",
      },
      {
        q: "How do I start a return?",
        a: "Email us at hello@majbags.com with your order number and reason for return. We'll send you a return authorisation and instructions within 24 hours. Please do not send items back without a return authorisation — they cannot be processed.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive and inspect your returned item (typically 2–3 business days after delivery), we'll process your refund within 3–5 business days. The time for funds to appear in your account depends on your bank.",
      },
      {
        q: "Can I exchange an item for a different size or colour?",
        a: "Yes, where stock allows. Reach out to us within 30 days and we'll do our best to accommodate an exchange. If the item you want is unavailable, we'll issue a full refund or store credit.",
      },
    ],
  },
  {
    category: "Products & Care",
    questions: [
      {
        q: "What materials are your bags made from?",
        a: "Our bags use full-grain and top-grain leather, premium canvas, and solid brass hardware — all sourced from suppliers that meet our ethical and quality standards. Each product page lists the specific materials used.",
      },
      {
        q: "How do I care for my MAJ bag?",
        a: "Leather bags should be kept away from direct sunlight and moisture. Use a leather conditioner every 3–6 months. For canvas bags, spot-clean with a damp cloth. Avoid overloading — it stresses the handles and base. See our full Care Guide for detailed instructions.",
      },
      {
        q: "My bag has a defect. What do I do?",
        a: "All our bags come with a 1-year quality guarantee. If you experience a manufacturing defect — stitching failure, hardware malfunction, or material fault — contact us and we'll arrange a repair, replacement, or refund at no cost to you.",
      },
      {
        q: "Can I request a custom or bespoke bag?",
        a: "We love custom projects. Reach out via the Contact page with your vision — preferred size, colour, hardware, monogram, or any other details — and our team will get back to you with a quote and timeline. Custom orders typically take 4–6 weeks.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    questions: [
      {
        q: "Do I need an account to place an order?",
        a: "You can check out as a guest. However, creating an account gives you access to order history, faster checkout, and exclusive offers. It only takes 30 seconds.",
      },
      {
        q: "How is my personal data used?",
        a: "We use your information only to process orders and communicate with you about them. We never sell your data to third parties. See our Privacy Policy for the full picture.",
      },
      {
        q: "How do I delete my account?",
        a: "Email us at hello@majbags.com from your registered email address with the subject line 'Account Deletion Request'. We'll process it within 7 business days and confirm when it's done.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="bg-cream-100 border-b border-cream-200 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-[#6B7280] uppercase tracking-[0.3em] mb-4">
            Support
          </p>
          <h1 className="font-serif text-5xl font-bold text-[#1E1E1E] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link
              href="/contact"
              className="text-olive-700 font-medium hover:underline"
            >
              Send us a message
            </Link>{" "}
            — we&apos;re always happy to help.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {faqGroups.map((group) => (
          <section key={group.category}>
            <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-8 pb-4 border-b border-cream-200">
              {group.category}
            </h2>
            <div className="space-y-0 divide-y divide-cream-200">
              {group.questions.map((item) => (
                <details
                  key={item.q}
                  className="group py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 select-none">
                    <h3 className="font-medium text-[#1E1E1E] text-base leading-snug">
                      {item.q}
                    </h3>
                    <ChevronDown className="h-5 w-5 text-[#6B7280] flex-shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="mt-4 pr-9">
                    <p className="text-[#6B7280] leading-relaxed text-sm">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="bg-olive-950 rounded-3xl p-10 text-center text-white">
          <h2 className="font-serif text-2xl font-bold mb-3">
            Still have a question?
          </h2>
          <p className="text-olive-300 text-sm mb-6 max-w-sm mx-auto">
            Our team is available Monday to Friday, 9am – 6pm WAT. We aim to
            respond within 4 hours.
          </p>
          <Button asChild variant="default">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
