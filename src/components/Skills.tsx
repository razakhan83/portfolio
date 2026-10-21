import type { SkillItem } from "@/lib/content";

export interface SkillsProps {
  skills: SkillItem[];
}

export default function Skills({ skills }: SkillsProps) {
  const sortedSkills = [...skills].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="skills" className="w-full bg-background border-t border-border py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading with Teal Full Stop */}
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep tracking-tight mb-12 sm:mb-16">
          Skills<span className="text-primary">.</span>
        </h2>

        {/* 3-column desktop, 2-column tablet, 1-column mobile text grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {sortedSkills.map((skill, idx) => (
            <div
              key={skill.id || idx}
              className="border-t border-border pt-5 pb-2 flex flex-col items-start"
            >
              <span className="font-heading font-bold text-xl sm:text-2xl text-deep tracking-tight">
                {skill.name}
              </span>
              <span className="text-sm sm:text-base text-muted font-normal mt-1.5">
                {skill.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
