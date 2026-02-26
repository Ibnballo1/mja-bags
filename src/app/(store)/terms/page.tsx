import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "MAJ Bags Terms of Service — the agreement governing your use of our website and purchase of our products.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the MAJ Bags website (www.majbags.com) or placing an order with us, you confirm that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.

If you do not agree to these terms, please do not use our website or services. We reserve the right to update these terms at any time. Continued use of the website after changes are posted constitutes acceptance of those changes.

These terms apply to all visitors, users, and customers. They constitute the entire agreement between you and MAJ Bags regarding your use of our services.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: `You must be at least 18 years of age to use our website and purchase products. By placing an order, you represent and warrant that you are 18 years of age or older and have the legal capacity to enter into binding contracts.

If you are purchasing on behalf of a company or organisation, you represent that you have the authority to bind that entity to these terms.`,
  },
  {
    id: "products",
    title: "3. Products & Pricing",
    content: `**Product descriptions:** We make every effort to accurately describe and display our products, including colours, dimensions, and materials. However, we cannot guarantee that your device's display will accurately reflect the actual colour of products.

**Pricing:** All prices are displayed in Nigerian Naira (NGN) and are inclusive of applicable taxes. Prices are subject to change without notice. The price applicable to your order is the price shown at the time of checkout.

**Availability:** Product availability is not guaranteed. If an item becomes unavailable after you place an order, we will notify you promptly and offer a full refund or the option to wait for restocking.

**Errors:** We reserve the right to correct any pricing or description errors. If a pricing error occurs on your order, we will contact you before processing payment. You may choose to proceed at the correct price or cancel.`,
  },
  {
    id: "orders",
    title: "4. Orders & Contract Formation",
    content: `**Placing an order:** When you place an order on our website, you are making an offer to purchase the selected products at the listed price. Receipt of an order confirmation email does not constitute acceptance of your order.

**Order acceptance:** Your order is accepted and a contract is formed when we dispatch your items and send a shipping confirmation email. We reserve the right to refuse or cancel any order at our discretion, including where:
- Products are unavailable or out of stock
- Pricing or product information errors exist
- We suspect fraudulent activity
- Payment cannot be processed

**Order changes:** Once an order is placed, changes can only be accommodated within 2 hours of purchase, subject to our ability to act before dispatch. Please contact us immediately at hello@majbags.com.`,
  },
  {
    id: "payment",
    title: "5. Payment",
    content: `All payments are processed securely through Paystack, a PCI-DSS compliant payment gateway. We accept Visa, Mastercard, and Verve cards as well as bank transfers.

By providing your payment information, you authorise us to charge the full order amount including applicable taxes and shipping charges.

MAJ Bags does not store your full card details. Payment information is encrypted and processed directly by Paystack. We are not liable for any issues arising from the payment processing system.

Orders will not be processed or dispatched until full payment has been received and confirmed.`,
  },
  {
    id: "shipping",
    title: "6. Shipping & Delivery",
    content: `**Delivery times:** We aim to deliver within the timeframes stated on our Shipping page. These are estimates and not guarantees. Delays may occur due to courier issues, public holidays, or circumstances outside our control.

**Risk of loss:** Risk of loss or damage to products transfers to you upon delivery to the specified address.

**Incorrect addresses:** We are not responsible for orders delivered to an incorrect address provided by the customer. If a parcel is returned to us due to an incorrect address, we will contact you to arrange re-delivery (additional charges may apply).

**Failed deliveries:** If a delivery attempt fails, our courier will leave instructions for re-delivery or collection. If the parcel is not collected within the courier's stated timeframe, it may be returned to us. We will contact you to arrange re-delivery.

Full shipping terms are detailed on our **Shipping & Returns** page.`,
  },
  {
    id: "returns",
    title: "7. Returns, Exchanges & Refunds",
    content: `We want you to love your MAJ bag. If you are not satisfied, our return policy allows returns within 30 days of delivery, subject to the following conditions:

**Eligible items:** Unused, in original condition with all tags attached and original packaging intact.

**Ineligible items:** 
- Items showing signs of use, wear, or damage not caused by MAJ Bags
- Custom, bespoke, or personalised items
- Items purchased on sale or at a discount (unless faulty)

**Process:** To initiate a return, email hello@majbags.com with your order number and reason. We will provide a return authorisation and instructions. Returns sent without authorisation will not be processed.

**Refunds:** Approved refunds are processed within 3–5 business days of receiving the returned item. Refunds are issued to the original payment method.

Full return terms are detailed on our **Shipping & Returns** page.`,
  },
  {
    id: "warranty",
    title: "8. Quality Guarantee",
    content: `All MAJ Bags products are covered by a 1-year quality guarantee from the date of purchase. This covers:

- Stitching failure under normal use
- Hardware defects (broken clasps, faulty zips, damaged D-rings)
- Material defects not caused by misuse or poor care

This guarantee does not cover:
- Normal wear and tear
- Damage caused by misuse, accidents, or neglect
- Damage from failure to follow our Care Guide
- Cosmetic damage that does not affect functionality

To claim under our quality guarantee, email hello@majbags.com with your order number and photos of the defect. We will assess the claim and, at our discretion, offer repair, replacement, or refund.`,
  },
  {
    id: "intellectual-property",
    title: "9. Intellectual Property",
    content: `All content on the MAJ Bags website — including text, images, logos, product designs, and graphics — is the property of MAJ Bags or its licensors and is protected by copyright, trademark, and other intellectual property laws.

You may not reproduce, distribute, modify, transmit, or use any content from this website for commercial purposes without our prior written consent. Personal, non-commercial use is permitted provided you retain all copyright and proprietary notices.

The MAJ name, logo, and brand identity are trademarks of MAJ Bags. Use of our trademarks without prior written consent is strictly prohibited.`,
  },
  {
    id: "limitation",
    title: "10. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, MAJ Bags shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products, including but not limited to:

- Loss of data or profits
- Business interruption
- Personal injury (other than as required by law)
- Any matter beyond our reasonable control

Our total liability for any claim arising from these terms or your use of our services shall not exceed the amount paid for the specific product giving rise to the claim.

Nothing in these terms limits our liability for death or personal injury caused by our negligence, fraud, or any matter that cannot be excluded by law.`,
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.

If you are a consumer in another jurisdiction, you may also have rights under the laws of your local jurisdiction. Nothing in these terms affects your statutory rights.`,
  },
  {
    id: "contact",
    title: "12. Contact",
    content: `If you have any questions about these Terms of Service, please contact us:

**Email:** legal@majbags.com
**General:** hello@majbags.com
**Address:** MAJ Bags, Victoria Island, Lagos, Nigeria

We are committed to resolving any concerns fairly and promptly.`,
  },
];

export default function TermsPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs text-[#6B7280] uppercase tracking-[0.25em] mb-3">
            Legal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E1E1E] mb-4">
            Terms of Service
          </h1>
          <p className="text-[#6B7280]">
            Last updated: <time dateTime="2025-01-01">1 January 2025</time>
          </p>
          <p className="text-[#6B7280] mt-3 text-sm leading-relaxed max-w-2xl">
            Please read these Terms of Service carefully before using our
            website or placing an order. By using MAJ Bags, you agree to be
            bound by these terms.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs text-[#6B7280] uppercase tracking-widest mb-4">
                Contents
              </p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-[#6B7280] hover:text-olive-700 py-1 transition-colors leading-snug"
                  >
                    {s.title.replace(/^\d+\.\s/, "")}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article className="lg:col-span-3 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="font-serif text-xl font-bold text-[#1E1E1E] mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-sm text-[#6B7280] leading-relaxed">
                  {section.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("- ")) {
                      return (
                        <ul key={i} className="space-y-2 ml-4">
                          {para
                            .split("\n")
                            .filter((l) => l.startsWith("- "))
                            .map((line, j) => (
                              <li key={j} className="list-disc">
                                {line
                                  .replace(/^- /, "")
                                  .split(/\*\*(.*?)\*\*/g)
                                  .map((part, k) =>
                                    k % 2 === 1 ? (
                                      <strong
                                        key={k}
                                        className="text-[#1E1E1E] font-semibold"
                                      >
                                        {part}
                                      </strong>
                                    ) : (
                                      part
                                    ),
                                  )}
                              </li>
                            ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={i}>
                        {para.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                          j % 2 === 1 ? (
                            <strong
                              key={j}
                              className="text-[#1E1E1E] font-semibold"
                            >
                              {part}
                            </strong>
                          ) : (
                            part
                          ),
                        )}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}

            <div className="border-t border-cream-200 pt-10">
              <p className="text-sm text-[#6B7280]">
                These terms were last updated on 1 January 2025. For questions,
                visit our{" "}
                <Link
                  href="/contact"
                  className="text-olive-700 hover:underline"
                >
                  Contact page
                </Link>
                .
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
