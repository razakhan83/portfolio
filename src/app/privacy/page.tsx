import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy · Ahmed Raza",
  description:
    "This site collects no data directly. Contact happens through WhatsApp and email. Messages sent by visitors are used only to reply. No data is sold or shared.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy · Ahmed Raza",
    description:
      "This site collects no data directly. Contact happens through WhatsApp and email. Messages sent by visitors are used only to reply. No data is sold or shared.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="w-full bg-background py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep tracking-tight mb-8">
          Privacy<span className="text-primary">.</span>
        </h1>
        <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mb-12 font-normal">
          This site collects no data directly. Contact happens through WhatsApp and
          email. Messages sent by visitors are used only to reply. No data is
          sold or shared.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-deep transition-colors font-medium text-sm sm:text-base group min-h-[44px] px-2 py-2 -ml-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-150">
            &larr;
          </span>
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  );
}
