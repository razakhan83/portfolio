import { getSettings, getSkills, getProjects } from "@/lib/content";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default async function Home() {
  const [settings, skills, projects] = await Promise.all([
    getSettings(),
    getSkills(),
    getProjects(),
  ]);

  return (
    <main>
      <Hero settings={settings} />
      <Skills skills={skills} />
      <Projects projects={projects} />
    </main>
  );
}
