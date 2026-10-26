"use client";

import React, { useState } from "react";
import { HeroSection } from "./HeroSection";
import { MarqueeStrip } from "./MarqueeStrip";
import { SelectedWork } from "./SelectedWork";
import { SkillsProximity } from "./SkillsProximity";
import { VisualStrip } from "./VisualStrip";
import { ProcessWaypoints } from "./ProcessWaypoints";
import { ContactSection } from "./ContactSection";
import { ProjectDetailOverlay } from "./ProjectDetailOverlay";
import { DemoProject } from "@/lib/demo-content";

export function LandingExperience() {
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);

  return (
    <div className="w-full bg-[#0A0F0D] text-[#F5F5DC] overflow-x-hidden selection:bg-[#008080] selection:text-[#F5F5DC]">
      {/* 1. Orchestrated Hero Section with Graphic Panel and Rotating Word */}
      <HeroSection />

      {/* 2. Infinite Marquee Strip under Hero */}
      <MarqueeStrip />

      {/* 3. Selected Work (Infinite Looped Panels with Real Images) */}
      <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />

      {/* 4. Skills (Proximity Scale Grid with Stroke Icons) */}
      <SkillsProximity />

      {/* 5. Slim Visual Strip with Workspace Parallax */}
      <VisualStrip />

      {/* 6. Engineering Process (MotionPath Waypoints with Icons) */}
      <ProcessWaypoints />

      {/* 7. Contact Section with Outline-to-Fill Heading */}
      <ContactSection />

      {/* 8. Project Detail Curve Swipe Overlay with Large Cover Image */}
      <ProjectDetailOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
