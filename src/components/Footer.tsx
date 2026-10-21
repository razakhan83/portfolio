"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon, MailIcon } from "./icons";
import type { Wordmark } from "@/lib/content";

export interface FooterProps {
  wordmark: Wordmark;
  socials: {
    githubUrl?: string;
    linkedinUrl?: string;
    whatsappUrl?: string;
    email?: string;
  };
}

const emptySubscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => 2026;

export default function Footer({ wordmark, socials }: FooterProps) {
  const year = useSyncExternalStore(emptySubscribe, getClientYear, getServerYear);
  const formatNamePart = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  const displayName = `${formatNamePart(wordmark.first)} ${formatNamePart(wordmark.rest)}`.trim();

  return (
    <footer className="border-t border-border bg-background w-full mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row: repeats the header row (wordmark + socials) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-border">
          <Link
            href="/"
            className="font-heading font-bold text-2xl tracking-tight inline-flex items-center gap-1 group"
            aria-label={`${wordmark.first} ${wordmark.rest} home`}
          >
            <span className="text-deep">{wordmark.first}</span>
            <span className="text-primary">{wordmark.rest}</span>
          </Link>

          <div className="flex items-center gap-4 text-deep">
            {socials.githubUrl && (
              <a
                href={socials.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
            )}
            {socials.linkedinUrl && (
              <a
                href={socials.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            )}
            {socials.whatsappUrl && (
              <a
                href={socials.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label="WhatsApp Contact"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            )}
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                className="p-1 hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label="Send Email"
              >
                <MailIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom line: small text, copyright + Privacy & Terms links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-sm text-muted">
          <p>
            &copy; {year} {displayName || "Ahmed Raza"}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors duration-150"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors duration-150"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
