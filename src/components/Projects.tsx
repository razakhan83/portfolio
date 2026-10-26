"use client";

import type { ProjectItem } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import WipeHeading from "./WipeHeading";
import { Reveal } from "@/components/gsap/reveal";

export interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="projects" className="w-full bg-background border-t border-border py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading with Teal Block Wipe Reveal */}
        <WipeHeading title="Projects." />

        {/* 2-column desktop, 1-column mobile card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {sortedProjects.map((project, idx) => (
            <Reveal
              key={project.id || idx}
              delay={(idx % 2) * 0.1}
              className="h-full"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
