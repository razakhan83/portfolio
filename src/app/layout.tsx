import type { Metadata } from "next";
import { fontBody, fontHeading } from "./fonts";
import "./globals.css";
import { PublicHeader } from "@/components/gsap/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { RouteTransition } from "@/components/morph/route-transition";
import { SkipOnScroll } from "@/components/morph/skip-on-scroll";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = "Ahmed Raza · MERN Stack Developer";
  const description =
    "Ahmed Raza · MERN & Next.js Developer specializing in full-stack e-commerce and high-conversion web applications.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s · Ahmed Raza",
    },
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "Ahmed Raza Portfolio",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: "/icon.svg",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontBody.variable} ${fontHeading.variable} dark scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#0A0F0D] text-[#F5F5DC] font-body selection:bg-[#008080] selection:text-[#F5F5DC]">
        <SkipOnScroll />
        <PublicHeader />
        <main id="main-content" className="flex-1">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <PublicFooter />
      </body>
    </html>
  );
}
