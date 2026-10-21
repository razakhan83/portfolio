import type { Metadata } from "next";
import { fontBody, fontHeading } from "./fonts";
import "./globals.css";
import { getSettings } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import { RouteTransition } from "@/components/morph/route-transition";
import { SkipOnScroll } from "@/components/morph/skip-on-scroll";

export const metadata: Metadata = {
  title: "Ahmed Raza · Portfolio",
  description:
    "MERN Stack Developer & E-Commerce Specialist based in Karachi, Pakistan",
};

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
        <Footer wordmark={settings.wordmark} socials={socials} />
      </body>
    </html>
  );
}
