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

  return (
    <main>
      <Hero settings={settings} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Services services={services} whatsappUrl={settings.whatsappUrl} />
      <Process processSteps={processSteps} />
      <Contact settings={settings} />
    </main>
  );
}
