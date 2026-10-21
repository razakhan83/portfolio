import type { ServiceItem } from "@/lib/content";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./morph/tabs";
import { WhatsAppIcon } from "./icons";

export interface ServicesProps {
  services: ServiceItem[];
  whatsappUrl?: string;
}

export default function Services({
  services,
  whatsappUrl = "https://wa.me/923052622043",
}: ServicesProps) {
  const sortedServices = [...services].sort((a, b) => a.sortOrder - b.sortOrder);
  const defaultTab = sortedServices[0]?.title || "";

  return (
    <section id="services" className="w-full bg-background border-t border-border py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading with Teal Full Stop */}
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep tracking-tight mb-12 sm:mb-16">
          Services<span className="text-primary">.</span>
        </h2>

        {/* Morph Tabs */}
        {sortedServices.length > 0 && (
          <Tabs defaultValue={defaultTab} className="w-full">
            {/* Tab list with gliding underline */}
            <TabsList className="w-full">
              {sortedServices.map((service) => (
                <TabsTrigger key={service.title} value={service.title}>
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content Panels */}
            {sortedServices.map((service) => (
              <TabsContent key={service.title} value={service.title}>
                <div className="bg-surface border border-border rounded-xl p-6 sm:p-10 max-w-3xl">
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-deep tracking-tight mb-6">
                    {service.title}
                  </h3>

                  {/* Bullet points with • character */}
                  <ul className="space-y-3.5 mb-8">
                    {service.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-muted text-base sm:text-lg leading-relaxed"
                      >
                        <span className="text-primary font-bold select-none text-xl leading-none mt-1">
                          •
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* WhatsApp Action Button inside each panel */}
                  <div className="pt-4 border-t border-border/60">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-[#FFFEF7] font-semibold text-sm sm:text-base px-7 py-3 min-h-[44px] rounded-lg hover:bg-deep transition-all duration-150 active:scale-[0.98] inline-flex items-center justify-center gap-2.5 shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </section>
  );
}
