import type { Metadata } from "next";
import { fontBody, fontHeading } from "./fonts";
import "./globals.css";
import { getSettings } from "@/lib/content";
import Header from "@/components/Header";
import PublicFooter from "@/components/PublicFooter";
import Cursor from "@/components/Cursor";
import { RouteTransition } from "@/components/morph/route-transition";
import { SkipOnScroll } from "@/components/morph/skip-on-scroll";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = "Ahmed Raza · MERN Stack Developer";
  const description =
    settings.heroParagraph ||
    "I build fast e-commerce stores with Next.js and help brands sell more with Meta ads. Three years of development, three live stores, and one clear focus: websites that bring orders, not just traffic.";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  const socials = {
    githubUrl: settings.githubUrl,
    linkedinUrl: settings.linkedinUrl,
    whatsappUrl: settings.whatsappUrl,
    email: settings.email,
  };

  return (
    <html lang="en" className={`${fontBody.variable} ${fontHeading.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-deep font-body">
        <SkipOnScroll />
        <Cursor />
        <Header wordmark={settings.wordmark} socials={socials} />
        <main id="main-content" className="flex-1">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <PublicFooter />
      </body>
    </html>
  );
}
