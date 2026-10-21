import type { ProjectItem } from "@/lib/content";
import ProjectCard from "./ProjectCard";

export interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="projects" className="w-full bg-background border-t border-border py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading with Teal Full Stop */}
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep tracking-tight mb-12 sm:mb-16">
          Projects<span className="text-primary">.</span>
        </h2>

        {/* 2-column desktop, 1-column mobile card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {sortedProjects.map((project, idx) => (
            <ProjectCard key={project.id || idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
