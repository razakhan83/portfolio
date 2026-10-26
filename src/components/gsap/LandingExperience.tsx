"use client";

import React, { useState } from "react";
import { HeroSection } from "./HeroSection";
import { SelectedWork } from "./SelectedWork";
import { SkillsProximity } from "./SkillsProximity";
import { ProcessWaypoints } from "./ProcessWaypoints";
import { ContactSection } from "./ContactSection";
import { ProjectDetailOverlay } from "./ProjectDetailOverlay";
import { DemoProject } from "@/lib/demo-content";

export function LandingExperience() {
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);

  return (
    <div className="w-full bg-[#0A0F0D] text-[#F5F5DC] overflow-x-hidden selection:bg-[#008080] selection:text-[#F5F5DC]">
      {/* 1. Orchestrated Hero Section */}
      <HeroSection />

      {/* 2. Selected Work (Infinite Looped Panels & Timeline Clear & Rebuild) */}
      <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />

      {/* 3. Skills (Proximity Scale Grid) */}
      <SkillsProximity />

      {/* 4. Engineering Process (MotionPath Waypoints) */}
      <ProcessWaypoints />

      {/* 5. Contact Section */}
      <ContactSection />

      {/* 6. Project Detail Curve Swipe Overlay */}
      <ProjectDetailOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
