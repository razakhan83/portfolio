import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import connectDB from "@/lib/db";
import { Project, Skill, Service, ProcessStep } from "@/models";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export const metadata = {
  title: "Dashboard · Admin Panel",
};

async function getLiveCounts() {
  await connection();
  await connectDB();
  const [
    totalProjects,
    publishedProjects,
    totalSkills,
    totalServices,
    totalProcessSteps,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ isPublished: true }),
    Skill.countDocuments(),
    Service.countDocuments(),
    ProcessStep.countDocuments(),
  ]);

  return {
    totalProjects,
    publishedProjects,
    totalSkills,
    totalServices,
    totalProcessSteps,
  };
}

async function DashboardContent() {
  const counts = await getLiveCounts();

  const statCards = [
    {
      title: "Projects",
      value: counts.totalProjects,
      subtext: `${counts.publishedProjects} published`,
      badge: `${counts.publishedProjects} published`,
      href: "/admin/projects",
      icon: (
        <svg
          className="w-5 h-5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      ),
    },
    {
      title: "Skills",
      value: counts.totalSkills,
      subtext: "Technical skills",
      badge: "In grid",
      href: "/admin/skills",
      icon: (
        <svg
          className="w-5 h-5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: "Services",
      value: counts.totalServices,
      subtext: "Morph tabs",
      badge: "Active",
      href: "/admin/services",
      icon: (
        <svg
          className="w-5 h-5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      title: "Process Steps",
      value: counts.totalProcessSteps,
      subtext: "Workflow steps",
      badge: "Numbered 01-04",
      href: "/admin/process",
      icon: (
        <svg
          className="w-5 h-5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    {
      title: "Manage Projects",
      description: "Add, edit, reorder or publish projects and case study bullets.",
      href: "/admin/projects",
      badge: `${counts.totalProjects} items`,
    },
    {
      title: "Manage Skills",
      description: "Update skills, experience captions, and display order.",
      href: "/admin/skills",
      badge: `${counts.totalSkills} items`,
    },
    {
      title: "Manage Services",
      description: "Edit service offerings, bullet points, and tab details.",
      href: "/admin/services",
      badge: `${counts.totalServices} items`,
    },
    {
      title: "Manage Process Steps",
      description: "Customize the 4-step workflow, numbers, and text.",
      href: "/admin/process",
      badge: `${counts.totalProcessSteps} items`,
    },
    {
      title: "Site Settings",
      description: "Configure hero texts, stats, social URLs, email, CV, and contact copy.",
      href: "/admin/settings",
      badge: "Global",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-deep tracking-tight">
          Overview<span className="text-primary">.</span>
        </h2>
        <p className="text-muted text-sm sm:text-base mt-1">
          Live overview of your portfolio content and fast links to manage each section.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            <Card className="bg-surface border-border hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-xs p-5 flex flex-col justify-between h-full">
              <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted">
                  {card.title}
                </CardTitle>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {card.icon}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-deep tracking-tight group-hover:text-primary transition-colors">
                  {card.value}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-muted font-normal">{card.subtext}</span>
                  <span className="font-mono text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {card.badge}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-deep">
            Content Managers
          </h3>
          <span className="text-xs text-muted">Direct management links</span>
        </div>

        <div className="bg-surface border border-border rounded-xl divide-y divide-border overflow-hidden shadow-2xs">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center justify-between p-4 sm:p-5 hover:bg-background/80 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm sm:text-base text-deep group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                  <span className="text-xs font-mono font-medium text-muted bg-background border border-border px-2 py-0.5 rounded">
                    {link.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted line-clamp-1">
                  {link.description}
                </p>
              </div>

              <div className="shrink-0 text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-44 bg-border/40 rounded mb-2" />
        <div className="h-4 w-72 bg-border/40 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5 h-36">
            <div className="h-4 w-20 bg-border/40 rounded mb-4" />
            <div className="h-9 w-12 bg-border/40 rounded mb-3" />
            <div className="h-3 w-28 bg-border/40 rounded" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="h-6 w-36 bg-border/40 rounded" />
        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-border/30 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
