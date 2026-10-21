import {
  getSettings,
  getSkills,
  getProjects,
  getServices,
} from "@/lib/content";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";

export default async function Home() {
  const [settings, skills, projects, services] = await Promise.all([
    getSettings(),
    getSkills(),
    getProjects(),
    getServices(),
  ]);

  return (
    <main>
      <Hero settings={settings} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Services services={services} whatsappUrl={settings.whatsappUrl} />
    </main>
  );
}
