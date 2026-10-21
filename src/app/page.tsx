import { getSettings } from "@/lib/content";
import Hero from "@/components/Hero";

export default async function Home() {
  const settings = await getSettings();

  return (
    <main>
      <Hero settings={settings} />
    </main>
  );
}
