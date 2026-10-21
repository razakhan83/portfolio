"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectItem } from "@/lib/content";
import { GitHubIcon, ArrowUpRightIcon } from "./icons";

export interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const initial = project.title.trim().charAt(0).toUpperCase();

  return (
    <article className="group bg-surface border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-150 hover:border-primary/60 active:scale-[0.98]">
      {/* 1. Thumbnail Image Container (16/10 aspect ratio) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface border-b border-border select-none">
        {project.imageUrl ? (
          <>
            {/* Skeleton loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-border/40 animate-pulse" />
            )}
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className={`object-cover transition-all duration-300 group-hover:scale-[1.02] ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          /* Editorial surface-colour placeholder panel with project initial */
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface relative overflow-hidden">
            <span className="font-heading font-black text-7xl sm:text-8xl text-deep/15 tracking-tighter">
              {initial}
            </span>
            <span className="absolute bottom-3 right-4 font-heading text-xs font-semibold uppercase tracking-widest text-muted/60">
              {project.stackLine ? project.stackLine.split("·")[0].trim() : "PROJECT"}
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Title row + optional CONCEPT tag */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-deep uppercase tracking-tight">
            {project.title}
          </h3>
          {project.isConcept && (
            <span className="shrink-0 border border-muted/50 text-muted text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded tracking-widest uppercase">
              CONCEPT
            </span>
          )}
        </div>

        {/* Stack line */}
        <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary mb-3">
          {project.stackLine}
        </p>

        {/* Description */}
        <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Links row */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex items-center gap-3 pt-4 border-t border-border/60 text-deep">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium hover:text-primary transition-colors duration-150 p-1 -ml-1 rounded"
                aria-label={`Visit live site for ${project.title}`}
              >
                <span>Live Site</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-primary transition-colors duration-150 rounded"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
