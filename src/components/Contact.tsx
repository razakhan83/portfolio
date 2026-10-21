import type { SiteSettings } from "@/lib/content";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon, MailIcon } from "./icons";

export interface ContactProps {
  settings: SiteSettings;
}

export default function Contact({ settings }: ContactProps) {
  const whatsappHref = settings.whatsappUrl || "https://wa.me/923052622043";
  const emailHref = `mailto:${settings.email || "123raza83@gmail.com"}`;
  const contactHeading = settings.contactHeading || "Let's work together.";
  const contactText =
    settings.contactText ||
    "Have a store to build, or ads to run? Message me on WhatsApp and I will reply with a clear plan and a fair price.";

  return (
    <section id="contact" className="w-full bg-deep py-20 sm:py-28 text-background">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-start text-left">
        {/* Contact Heading */}
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-background mb-6">
          {contactHeading.endsWith(".") ? (
            <>
              {contactHeading.slice(0, -1)}
              <span className="text-primary">.</span>
            </>
          ) : (
            contactHeading
          )}
        </h2>

        {/* Contact Supporting Line */}
        <p className="text-background/85 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-12">
          {contactText}
        </p>

        {/* Main Action Buttons & Email Link */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16 w-full sm:w-auto">
          {/* Large WhatsApp Button: Surface background with Deep text */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface text-deep font-semibold text-base sm:text-lg px-8 py-4 min-h-[44px] rounded-lg hover:bg-background transition-all duration-150 active:scale-[0.98] inline-flex items-center justify-center gap-3 shadow-none tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
          >
            <WhatsAppIcon className="w-5 h-5 text-deep" />
            <span>Message on WhatsApp</span>
          </a>

          {/* Clear Email Link */}
          <a
            href={emailHref}
            className="text-background/90 hover:text-primary transition-colors text-base sm:text-lg font-medium inline-flex items-center justify-center gap-2.5 underline underline-offset-8 px-2 py-3 min-h-[44px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
            aria-label={`Send email to ${settings.email || "Ahmed Raza"}`}
          >
            <MailIcon className="w-5 h-5" />
            <span>{settings.email || "123raza83@gmail.com"}</span>
          </a>
        </div>

        {/* Social Icons Row in surface colour */}
        <div className="pt-8 border-t border-background/20 w-full flex items-center gap-2 sm:gap-4 text-surface/75">
          <span className="text-xs uppercase tracking-widest text-background/60 font-semibold mr-2">
            Socials
          </span>
          {settings.githubUrl && (
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 hover:text-surface transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
          )}
          {settings.linkedinUrl && (
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 hover:text-surface transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          )}
          {settings.whatsappUrl && (
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 hover:text-surface transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
              aria-label="WhatsApp Contact"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          )}
          {settings.email && (
            <a
              href={`mailto:${settings.email}`}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 hover:text-surface transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
              aria-label="Email Ahmed Raza"
            >
              <MailIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
