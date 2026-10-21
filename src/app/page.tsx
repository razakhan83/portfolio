import { getSettings, getSkills } from "@/lib/content";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";

export default async function Home() {
  const [settings, skills] = await Promise.all([
    getSettings(),
    getSkills(),
  ]);

  return (
    <main>
      <Hero settings={settings} />
      <Skills skills={skills} />
    </main>
  );
}
