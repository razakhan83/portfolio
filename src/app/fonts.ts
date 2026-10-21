import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

export const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const fontHeading = localFont({
  src: [
    {
      path: "./fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});
