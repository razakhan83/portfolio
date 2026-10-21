import type { Metadata } from "next";
import { fontBody, fontHeading } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Raza · Portfolio",
  description: "MERN Stack Developer & E-Commerce Specialist based in Karachi, Pakistan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontBody.variable} ${fontHeading.variable}`}>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
