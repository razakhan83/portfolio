"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectItem } from "@/lib/content";
import { GitHubIcon, ArrowUpRightIcon } from "./icons";
import {
  MorphDialog,
  MorphDialogTrigger,
  MorphDialogContent,
  MorphDialogTitle,
} from "./morph/morph-dialog";

export interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const initial = project.title.trim().charAt(0).toUpperCase();
  const cleanId = (project.id || project.title)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  const transitionName = `vt-project-${cleanId}`;

  // Check if project has case study details (real client or business project)
  const hasCaseStudy =
    !project.isConcept &&
    (Boolean(project.problem) ||
      (project.builtBullets && project.builtBullets.length > 0) ||
      Boolean(project.result));

  return (
    <MorphDialog transitionName={transitionName}>
      {/* ── CARD TRIGGER (grows into the dialog) ── */}
      <MorphDialogTrigger className="h-full">
        <article className="group bg-surface border border-border rounded-xl overflow-hidden flex flex-col h-full transition-all duration-150 hover:border-primary/60 active:scale-[0.98]">
          {/* 1. Thumbnail Image Container (16/10 aspect ratio) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface border-b border-border select-none">
            {project.imageUrl ? (
              <>
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
              <div className="w-full h-full flex flex-col items-center justify-center bg-surface relative overflow-hidden">
                <span className="font-heading font-black text-7xl sm:text-8xl text-deep/15 tracking-tighter">
                  {initial}
                </span>
                <span className="absolute bottom-3 right-4 font-heading text-xs font-semibold uppercase tracking-widest text-muted/60">
                  {project.stackLine
                    ? project.stackLine.split("·")[0].trim()
                    : "PROJECT"}
                </span>
              </div>
            )}
          </div>

          {/* 2. Card Content */}
          <div className="p-6 sm:p-8 flex flex-col flex-1">
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

            <p className="text-sm font-semibold tracking-wider uppercase text-primary mb-3">
              {project.stackLine}
            </p>

            <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 flex-1">
              {project.description}
            </p>

            {/* Links row: clicking links must NOT trigger the dialog */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex items-center gap-2 pt-4 border-t border-border/60 text-deep">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors duration-150 px-2.5 py-2 -ml-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                    onClick={(e) => e.stopPropagation()}
                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 hover:text-primary transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      </MorphDialogTrigger>

      {/* ── CASE STUDY DIALOG CONTENT (shared view transition) ── */}
      <MorphDialogContent aria-label={`Case study: ${project.title}`}>
        {/* Dialog Header Thumbnail / Monogram */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface border border-border mb-6 select-none">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-surface relative overflow-hidden">
              <span className="font-heading font-black text-8xl text-deep/15 tracking-tighter">
                {initial}
              </span>
              <span className="absolute bottom-3 right-4 font-heading text-xs font-semibold uppercase tracking-widest text-muted/60">
                {project.stackLine
                  ? project.stackLine.split("·")[0].trim()
                  : "CASE STUDY"}
              </span>
            </div>
          )}
        </div>

        {/* Title row + optional CONCEPT tag */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <MorphDialogTitle>{project.title}</MorphDialogTitle>
          {project.isConcept && (
            <span className="shrink-0 border border-muted/50 text-muted text-xs font-semibold px-2.5 py-0.5 rounded tracking-widest uppercase">
              CONCEPT
            </span>
          )}
        </div>

        {/* Stack Line */}
        <p className="text-sm font-semibold tracking-wider uppercase text-primary mb-6">
          {project.stackLine}
        </p>

        {/* Dialog Body */}
        <div className="space-y-6 text-deep">
          {/* Brief Card text overview */}
          <p className="text-muted text-base leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Real Project Case Study: Problem / Built / Result */}
          {hasCaseStudy ? (
            <div className="space-y-6 pt-4 border-t border-border">
              {project.problem && (
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary mb-2">
                    Problem
                  </h4>
                  <p className="text-muted leading-relaxed text-sm sm:text-base">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.builtBullets && project.builtBullets.length > 0 && (
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary mb-2">
                    What I Built
                  </h4>
                  <ul className="space-y-2 text-muted text-sm sm:text-base leading-relaxed">
                    {project.builtBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-primary font-bold select-none leading-tight">
                          •
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.result && (
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary mb-2">
                    Result
                  </h4>
                  <p className="text-muted leading-relaxed text-sm sm:text-base">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Concept Project: Description & honest concept line */
            <div className="p-4 rounded-lg bg-surface border border-border/80 text-xs sm:text-sm text-muted">
              <p className="font-medium text-deep mb-1">Concept Exploration</p>
              <p className="leading-relaxed">
                This is an independent concept build created to explore
                high-performance Next.js architecture, interactive motion, and
                clean editorial design.
              </p>
            </div>
          )}
        </div>

        {/* Links row at bottom */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap items-center gap-4 pt-6 mt-8 border-t border-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-[#FFFEF7] font-semibold text-sm px-6 py-3 min-h-[44px] rounded-lg hover:bg-deep transition-all duration-150 inline-flex items-center justify-center gap-2 shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Visit Live Store</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border text-deep hover:text-primary hover:border-primary transition-all duration-150 font-semibold text-sm px-5 py-3 min-h-[44px] rounded-lg inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>View Source</span>
              </a>
            )}
          </div>
        )}
      </MorphDialogContent>
    </MorphDialog>
  );
}
