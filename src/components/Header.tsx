import Link from "next/link";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon, MailIcon } from "./icons";
import type { Wordmark } from "@/lib/content";

export interface HeaderProps {
  wordmark: Wordmark;
  socials: {
    githubUrl?: string;
    linkedinUrl?: string;
    whatsappUrl?: string;
    email?: string;
  };
}

export default function Header({ wordmark, socials }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background w-full">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Wordmark: left */}
        <Link
          href="/"
          className="font-heading font-bold text-2xl tracking-tight inline-flex items-center gap-1 group"
          aria-label={`${wordmark.first} ${wordmark.rest} home`}
        >
          <span className="text-deep">{wordmark.first}</span>
          <span className="text-primary">{wordmark.rest}</span>
        </Link>

        {/* Social Icons: right (NO nav menu links) */}
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
    </header>
  );
}
