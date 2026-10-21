import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms · Ahmed Raza",
};

export default function TermsPage() {
  return (
    <div className="w-full bg-background py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep tracking-tight mb-8">
          Terms<span className="text-primary">.</span>
        </h1>
        <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mb-12 font-normal">
          Content on this site belongs to Ahmed Raza. Project names and brands
          belong to their owners. Service details are confirmed individually before
          any work starts.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-deep transition-colors font-medium text-sm sm:text-base group"
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
