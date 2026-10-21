"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AdminNavContent from "./AdminNavContent";

interface AdminHeaderProps {
  email: string;
}

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/skills": "Skills",
  "/admin/services": "Services",
  "/admin/process": "Process Steps",
  "/admin/settings": "Settings",
};

export default function AdminHeader({ email }: AdminHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Match title or fallback to capitalize segment
  const currentTitle =
    pageTitles[pathname] ||
    pathname
      .replace("/admin", "")
      .replace("/", "")
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase()) ||
    "Dashboard";

  return (
    <header className="h-16 border-b border-border bg-surface/90 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile Slide-over Sheet Trigger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-deep hover:bg-background/80 min-h-[44px] min-w-[44px] rounded-lg cursor-pointer"
                  aria-label="Open navigation menu"
                />
              }
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 p-0 bg-surface border-r border-border"
            >
              <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation links for portfolio admin control panel
              </SheetDescription>
              <AdminNavContent onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Current Section Title */}
        <h1 className="font-heading font-bold text-lg sm:text-xl text-deep tracking-tight">
          {currentTitle}
        </h1>
      </div>

      {/* Admin Email Pill / Indicator */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-full text-xs font-medium text-deep shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="truncate max-w-[140px] sm:max-w-[220px]">{email}</span>
        </div>
      </div>
    </header>
  );
}
