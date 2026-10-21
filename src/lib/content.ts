import { cache } from "react";
import { unstable_cache } from "next/cache";
import connectDB from "@/lib/db";
import { Setting, Project, Skill, Service, ProcessStep } from "@/models";
import {
  defaultSettings,
  defaultProjects,
  defaultSkills,
  defaultServices,
  defaultProcessSteps,
  type SiteSettings,
  type ProjectItem,
  type SkillItem,
  type ServiceItem,
  type ProcessStepItem,
} from "@/lib/defaults";

export type {
  SiteSettings,
  ProjectItem,
  SkillItem,
  ServiceItem,
  ProcessStepItem,
  Wordmark,
  StatItem,
} from "@/lib/defaults";

export const getSettings = cache(
  unstable_cache(
    async (): Promise<SiteSettings> => {
      try {
        await connectDB();
        const doc = await Setting.findOne().lean();
        if (doc) {
          return {
            wordmark: {
              first: doc.wordmark?.first || defaultSettings.wordmark.first,
              rest: doc.wordmark?.rest || defaultSettings.wordmark.rest,
            },
            heroEyebrow: doc.heroEyebrow || defaultSettings.heroEyebrow,
            heroTitle: doc.heroTitle || defaultSettings.heroTitle,
            heroParagraph: doc.heroParagraph || defaultSettings.heroParagraph,
            stats:
              Array.isArray(doc.stats) && doc.stats.length > 0
                ? doc.stats.map((s) => ({ value: s.value, label: s.label }))
                : defaultSettings.stats,
            githubUrl: doc.githubUrl ?? defaultSettings.githubUrl,
            linkedinUrl: doc.linkedinUrl ?? defaultSettings.linkedinUrl,
            whatsappUrl: doc.whatsappUrl ?? defaultSettings.whatsappUrl,
            email: doc.email ?? defaultSettings.email,
            cvPath: doc.cvPath ?? defaultSettings.cvPath,
            contactHeading: doc.contactHeading || defaultSettings.contactHeading,
            contactText: doc.contactText || defaultSettings.contactText,
          };
        }
      } catch (err) {
        console.error("Failed to fetch settings from DB, falling back to defaults:", err);
      }
      return defaultSettings;
    },
    ["settings"],
    { tags: ["portfolio-content"] }
  )
);

export const getProjects = cache(
  unstable_cache(
    async (): Promise<ProjectItem[]> => {
      try {
        await connectDB();
        const docs = await Project.find({ isPublished: true })
          .sort({ sortOrder: 1 })
          .lean();

        if (docs && docs.length > 0) {
          return docs.map((doc) => ({
            id: doc._id ? String(doc._id) : undefined,
            title: doc.title,
            stackLine: doc.stackLine || "",
            description: doc.description || "",
            imageUrl: doc.imageUrl || "",
            liveUrl: doc.liveUrl || "",
            githubUrl: doc.githubUrl || "",
            isConcept: Boolean(doc.isConcept),
            problem: doc.problem || "",
            builtBullets: Array.isArray(doc.builtBullets)
              ? [...doc.builtBullets]
              : [],
            result: doc.result || "",
            sortOrder: typeof doc.sortOrder === "number" ? doc.sortOrder : 0,
            isPublished: doc.isPublished !== false,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch projects from DB, falling back to defaults:", err);
      }
      return defaultProjects;
    },
    ["projects"],
    { tags: ["portfolio-content"] }
  )
);

export const getSkills = cache(
  unstable_cache(
    async (): Promise<SkillItem[]> => {
      try {
        await connectDB();
        const docs = await Skill.find().sort({ sortOrder: 1 }).lean();
        if (docs && docs.length > 0) {
          return docs.map((doc) => ({
            id: doc._id ? String(doc._id) : undefined,
            name: doc.name,
            caption: doc.caption || "",
            sortOrder: typeof doc.sortOrder === "number" ? doc.sortOrder : 0,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch skills from DB, falling back to defaults:", err);
      }
      return defaultSkills;
    },
    ["skills"],
    { tags: ["portfolio-content"] }
  )
);

export const getServices = cache(
  unstable_cache(
    async (): Promise<ServiceItem[]> => {
      try {
        await connectDB();
        const docs = await Service.find().sort({ sortOrder: 1 }).lean();
        if (docs && docs.length > 0) {
          return docs.map((doc) => ({
            id: doc._id ? String(doc._id) : undefined,
            title: doc.title,
            bullets: Array.isArray(doc.bullets) ? [...doc.bullets] : [],
            sortOrder: typeof doc.sortOrder === "number" ? doc.sortOrder : 0,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch services from DB, falling back to defaults:", err);
      }
      return defaultServices;
    },
    ["services"],
    { tags: ["portfolio-content"] }
  )
);

export const getProcessSteps = cache(
  unstable_cache(
    async (): Promise<ProcessStepItem[]> => {
      try {
        await connectDB();
        const docs = await ProcessStep.find().sort({ sortOrder: 1 }).lean();
        if (docs && docs.length > 0) {
          return docs.map((doc) => ({
            id: doc._id ? String(doc._id) : undefined,
            number: doc.number || "",
            title: doc.title,
            text: doc.text || "",
            sortOrder: typeof doc.sortOrder === "number" ? doc.sortOrder : 0,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch process steps from DB, falling back to defaults:", err);
      }
      return defaultProcessSteps;
    },
    ["processsteps"],
    { tags: ["portfolio-content"] }
  )
);
