import {
  getSettings,
  getSkills,
  getProjects,
  getServices,
  getProcessSteps,
} from "@/lib/content";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default async function Home() {
  const [settings, skills, projects, services, processSteps] = await Promise.all([
    getSettings(),
    getSkills(),
    getProjects(),
    getServices(),
    getProcessSteps(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const sameAsLinks = [
    settings.githubUrl,
    settings.linkedinUrl,
    settings.whatsappUrl,
  ].filter(Boolean);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Raza",
    jobTitle: "MERN Stack Developer & E-Commerce Specialist",
    email: settings.email || "123raza83@gmail.com",
    url: siteUrl,
    sameAs: sameAsLinks,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero settings={settings} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Services services={services} whatsappUrl={settings.whatsappUrl} />
      <Process processSteps={processSteps} />
      <Contact settings={settings} />
    </>
  );
}
