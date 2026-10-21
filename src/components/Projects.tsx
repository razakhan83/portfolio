"use client";

import { motion } from "motion/react";
import type { ProjectItem } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import WipeHeading from "./WipeHeading";
import { staggerContainer, fadeInUp } from "@/lib/motion";

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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {sortedProjects.map((project, idx) => (
            <motion.div key={project.id || idx} variants={fadeInUp} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
