import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MAJ Bags Privacy Policy — how we collect, use, and protect your personal information.",
};

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you:

**Account registration:** Name, email address, and password when you create an account.

**Order placement:** Name, email address, phone number, billing address, and shipping address. Payment information (card number, CVV, expiry) is processed directly by Paystack and is never stored on our servers.

**Contact and communication:** Any information you include in messages sent to us via our contact form, email, or WhatsApp.

**Automatically collected information:** When you visit our website, we automatically collect certain technical information including your IP address, browser type, operating system, referring URLs, pages viewed, and the time and date of your visit. We use cookies and similar tracking technologies to collect this data.`,
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

- **Process and fulfil your orders**, including sending order confirmations, shipping notifications, and receipts
- **Manage your account** and provide customer support
- **Communicate with you** about products, services, promotions, and events (only where you have consented)
- **Improve our website and services** through analytics and user feedback
- **Detect and prevent fraud** and ensure the security of our platform
- **Comply with legal obligations** including tax records and financial regulations
- **Respond to your enquiries** and resolve disputes

We do not use your personal information for automated decision-making or profiling that produces legal or similarly significant effects.`,
  },
  {
    id: "sharing",
    title: "3. Sharing Your Information",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

**Service providers:** Trusted third-party companies that assist us in operating our business, including Paystack (payment processing), courier services (delivery), and Supabase (data hosting). These providers are contractually obligated to keep your information confidential and use it only to provide services on our behalf.

**Legal requirements:** We may disclose your information if required by law, court order, or governmental authority, or to protect our rights, property, or the safety of our customers.

**Business transfers:** If MAJ Bags is acquired, merged, or sold, your information may be transferred as part of that transaction. We will notify you via email and prominent notice on our website before your information is transferred.

We require all third parties to respect the security of your personal data and to treat it in accordance with applicable law.`,
  },
  {
    id: "cookies",
    title: "4. Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to improve your experience on our website. Cookies are small text files stored on your device.

**Essential cookies:** Required for the website to function correctly, including maintaining your shopping cart and session login state. These cannot be disabled.

**Analytics cookies:** Help us understand how visitors use our website (e.g., which pages are most visited) so we can improve the experience. We use privacy-respecting analytics tools.

**Marketing cookies:** Used to show you relevant advertisements on third-party platforms. These are only active if you have consented.

You can control cookies through your browser settings. Disabling certain cookies may affect website functionality. Our cookie preferences are set on your first visit and you can update them at any time.`,
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    content: `We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy and to comply with our legal obligations.

- **Account data:** Retained for as long as your account is active, plus 2 years after account closure for legal and tax compliance.
- **Order data:** Retained for 7 years to comply with Nigerian tax and financial record-keeping requirements.
- **Contact and support records:** Retained for 2 years after the last communication.
- **Marketing preferences:** Until you withdraw consent or request deletion.

When data is no longer required, it is securely deleted or anonymised.`,
  },
  {
    id: "your-rights",
    title: "6. Your Rights",
    content: `Under applicable data protection law, you have the right to:

**Access:** Request a copy of the personal information we hold about you.

**Correction:** Request that we correct inaccurate or incomplete information.

**Deletion:** Request that we delete your personal information, subject to certain legal exceptions.

**Restriction:** Request that we limit how we process your information in certain circumstances.

**Portability:** Receive your personal data in a structured, commonly used format.

**Object:** Object to processing based on legitimate interests or for marketing purposes.

**Withdraw consent:** Where processing is based on your consent, you may withdraw it at any time without affecting the lawfulness of prior processing.

To exercise any of these rights, email us at privacy@majbags.com. We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.`,
  },
  {
    id: "security",
    title: "7. Data Security",
    content: `We take the security of your personal information seriously. We implement appropriate technical and organisational measures including:

- SSL/TLS encryption for all data in transit
- Encrypted storage of sensitive data
- Access controls limiting data access to authorised personnel only
- Regular security assessments and updates
- Payment data handled exclusively by PCI-DSS compliant Paystack — we never see or store your full card details

While we strive to protect your information, no method of internet transmission is 100% secure. If you believe your account has been compromised, contact us immediately at hello@majbags.com.`,
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: `Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will delete it promptly.`,
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will notify you by email (if you have an account) and by posting a notice on our website at least 14 days before the changes take effect.

Your continued use of our website and services after the effective date of the updated policy constitutes your acceptance of the changes. We encourage you to review this policy periodically.`,
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us:

**Email:** privacy@majbags.com
**General enquiries:** hello@majbags.com
**Mailing address:** MAJ Bags, Victoria Island, Lagos, Nigeria

We are committed to resolving any concerns you may have about our privacy practices.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs text-[#6B7280] uppercase tracking-[0.25em] mb-3">
            Legal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E1E1E] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#6B7280]">
            Last updated: <time dateTime="2025-01-01">1 January 2025</time>
          </p>
          <p className="text-[#6B7280] mt-3 text-sm leading-relaxed max-w-2xl">
            At MAJ Bags, your privacy matters to us. This policy explains what
            personal information we collect, how we use it, and your rights over
            it. Please read it carefully.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Table of contents — sticky sidebar */}
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

          {/* Content */}
          <article className="lg:col-span-3 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="font-serif text-xl font-bold text-[#1E1E1E] mb-4">
                  {section.title}
                </h2>
                <div className="prose prose-sm max-w-none text-[#6B7280] leading-relaxed">
                  {section.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("**") && para.includes(":**")) {
                      const parts = para.split(/\*\*(.*?)\*\*/g);
                      return (
                        <p key={i} className="mb-4">
                          {parts.map((part, j) =>
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
                    }
                    if (para.startsWith("- ")) {
                      return (
                        <ul key={i} className="mb-4 space-y-2 ml-4">
                          {para.split("\n").map((line, j) => (
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
                      <p key={i} className="mb-4">
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
                For any questions about this policy, visit our{" "}
                <Link
                  href="/contact"
                  className="text-olive-700 hover:underline"
                >
                  Contact page
                </Link>{" "}
                or email{" "}
                <a
                  href="mailto:privacy@majbags.com"
                  className="text-olive-700 hover:underline"
                >
                  privacy@majbags.com
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
