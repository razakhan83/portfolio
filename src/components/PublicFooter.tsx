"use client";

import { usePathname } from "next/navigation";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";

export default function PublicFooter() {
  const pathname = usePathname();

  // The footer must appear on public pages only — never in /admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <HalftoneWordmarkFooter
      wordmark="ahmed raza"
      label="Ahmed Raza"
      meta="©2026 · Karachi, Pakistan"
      palette={{ background: "#004C4C", ink: "#F5F5DC", warm: "#E9762B" }}
      fontFamily="'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif"
      fontWeight={800}
      columns={[
        {
          title: "Work",
          links: [
            { label: "Projects", href: "#projects" },
            { label: "Services", href: "#services" },
            { label: "Process", href: "#process" },
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ],
        },
        {
          title: "Social",
          links: [
            { label: "GitHub", href: "https://github.com/razakhan83" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/razakdev" },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "123raza83@gmail.com", href: "mailto:123raza83@gmail.com" },
            { label: "WhatsApp", href: "https://wa.me/923052622043" },
          ],
        },
      ]}
    />
  );
}
