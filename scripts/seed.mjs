import fs from "node:fs";
import path from "node:path";
import dns from "node:dns";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Force public DNS resolvers for reliable MongoDB Atlas SRV lookups on Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Ignore if not permitted
}

// 1. Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("Error: MONGODB_URI is missing in environment.");
  process.exit(1);
}

const adminEmail = process.env.ADMIN_EMAIL?.trim();
const adminPassword = process.env.ADMIN_PASSWORD?.trim();

if (!adminEmail) {
  console.error("Error: ADMIN_EMAIL is missing or empty in .env.local.");
  process.exit(1);
}

if (!adminPassword) {
  console.error("Error: ADMIN_PASSWORD is missing or empty in .env.local. Halting seed to prevent creating a weak admin.");
  process.exit(1);
}

// 2. Define Schemas & Models matching ARCHITECTURE.md exactly
const StatSchema = new Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const WordmarkSchema = new Schema(
  {
    first: { type: String, required: true },
    rest: { type: String, required: true },
  },
  { _id: false }
);

const SettingSchema = new Schema(
  {
    wordmark: { type: WordmarkSchema, required: true },
    heroEyebrow: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroParagraph: { type: String, required: true },
    stats: { type: [StatSchema], default: [] },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    whatsappUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    cvPath: { type: String, default: "" },
    contactHeading: { type: String, default: "" },
    contactText: { type: String, default: "" },
  },
  { collection: "settings", timestamps: true }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    stackLine: { type: String, default: "" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    isConcept: { type: Boolean, default: false },
    problem: { type: String, default: "" },
    builtBullets: { type: [String], default: [] },
    result: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { collection: "projects", timestamps: true }
);

const SkillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    caption: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { collection: "skills", timestamps: true }
);

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    bullets: { type: [String], default: [] },
    sortOrder: { type: Number, default: 0 },
  },
  { collection: "services", timestamps: true }
);

const ProcessStepSchema = new Schema(
  {
    number: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    text: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { collection: "processsteps", timestamps: true }
);

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { collection: "admins", timestamps: true }
);

const Setting = mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
const ProcessStep = mongoose.models.ProcessStep || mongoose.model("ProcessStep", ProcessStepSchema);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

// 3. PRD Appendix Seed Data
const seedSetting = {
  wordmark: {
    first: "ahmed",
    rest: "raza",
  },
  heroEyebrow: "MERN STACK DEVELOPER · KARACHI, PAKISTAN",
  heroTitle: "Nice to meet you! I'm Ahmed.",
  heroParagraph:
    "I build fast e-commerce stores with Next.js and help brands sell more with Meta ads. Three years of development, three live stores, and one clear focus: websites that bring orders, not just traffic.",
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "3", label: "Live Stores" },
    { value: "89", label: "Products Live" },
  ],
  githubUrl: "https://github.com/razakhan83",
  linkedinUrl: "https://www.linkedin.com/in/razakdev/",
  whatsappUrl: "https://wa.me/923052622043",
  email: "123raza83@gmail.com",
  cvPath: "/Ahmed-Raza-CV.pdf",
  contactHeading: "Let's work together.",
  contactText:
    "Have a store to build, or ads to run? Message me on WhatsApp and I will reply with a clear plan and a fair price.",
};

const seedSkills = [
  { name: "Next.js", caption: "2 Years Experience", sortOrder: 1 },
  { name: "React", caption: "3 Years Experience", sortOrder: 2 },
  { name: "JavaScript", caption: "3 Years Experience", sortOrder: 3 },
  { name: "Node.js", caption: "3 Years Experience", sortOrder: 4 },
  { name: "Express", caption: "3 Years Experience", sortOrder: 5 },
  { name: "MongoDB", caption: "3 Years Experience", sortOrder: 6 },
  { name: "Tailwind CSS", caption: "2 Years Experience", sortOrder: 7 },
  { name: "Meta Ads", caption: "2 Years Experience", sortOrder: 8 },
  { name: "Git and GitHub", caption: "3 Years Experience", sortOrder: 9 },
];

const seedProjects = [
  {
    title: "ORNAMENTS BY ARSHAD",
    stackLine: "NEXT.JS · MONGODB · META ADS",
    description:
      "Client jewellery store, live and selling. Custom storefront, product management and Meta ad campaigns, all handled by me.",
    imageUrl: "",
    liveUrl: "https://www.ornamentsbyarshad.com/",
    githubUrl: "",
    isConcept: false,
    problem:
      "The client sold only through Instagram messages and needed a proper online store.",
    builtBullets: [
      "Full Next.js storefront with product pages, cart and checkout",
      "Admin product uploads with clean processed images",
      "Meta Pixel integration and ad campaign setup",
    ],
    result:
      "A live store with running ad campaigns and a monthly management retainer.",
    sortOrder: 1,
    isPublished: true,
  },
  {
    title: "CHINA UNIQUE STORE",
    stackLine: "NEXT.JS · MONGODB · TAILWIND CSS",
    description:
      "My own gadget store, built end to end: storefront, admin panel, orders, payments and courier tracking.",
    imageUrl: "",
    liveUrl: "https://www.chinauniquestore.com/",
    githubUrl: "",
    isConcept: false,
    problem:
      "I needed a full e-commerce system for my own business, not a rented template.",
    builtBullets: [
      "Custom storefront with cart, checkout and customer accounts",
      "Full admin panel: products, orders, inventory, customers",
      "Performance tuning across the whole store",
    ],
    result: "89 products live, desktop PageSpeed score of 94.",
    sortOrder: 2,
    isPublished: true,
  },
  {
    title: "AAM SAMAN",
    stackLine: "E-COMMERCE · OPERATIONS",
    description:
      "My second store, run daily by me: products, orders, packing and customer support.",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    isConcept: false,
    problem: "A growing product range needed daily hands-on management.",
    builtBullets: [
      "Store operations system covering listings, pricing and order flow",
      "Customer support process on WhatsApp",
    ],
    result:
      "A running daily business, managed end to end by one person.",
    sortOrder: 3,
    isPublished: true,
  },
  {
    title: "TERRA BOTANICA",
    stackLine: "NEXT.JS · CONCEPT PROJECT",
    description:
      "Concept store for a plants brand. Editorial layout, warm colours and a full shopping flow.",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    isConcept: true,
    problem: "",
    builtBullets: [],
    result: "",
    sortOrder: 4,
    isPublished: true,
  },
  {
    title: "PULSEBOARD",
    stackLine: "NEXT.JS · DASHBOARD · CONCEPT PROJECT",
    description:
      "Concept SaaS analytics dashboard with charts, KPI cards and a clean dark interface.",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    isConcept: true,
    problem: "",
    builtBullets: [],
    result: "",
    sortOrder: 5,
    isPublished: true,
  },
  {
    title: "TRADING JOURNAL",
    stackLine: "NEXT.JS · CHARTS · CONCEPT PROJECT",
    description:
      "Concept dashboard for gold traders: trade journal, win rate and a profit calendar view.",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    isConcept: true,
    problem: "",
    builtBullets: [],
    result: "",
    sortOrder: 6,
    isPublished: true,
  },
];

const seedServices = [
  {
    title: "E-commerce Stores",
    bullets: [
      "Custom Next.js storefront, designed for your brand",
      "Product uploads with clean, processed images",
      "Cart, checkout and payment setup",
      "Admin panel for orders and stock",
      "SEO basics configured from day one",
    ],
    sortOrder: 1,
  },
  {
    title: "Meta Ads and Marketing",
    bullets: [
      "Campaign setup with pixel integration",
      "Daily ad management and budget control",
      "Creative testing for better results",
      "Performance monitoring with clear reports",
    ],
    sortOrder: 2,
  },
  {
    title: "AI Product Videos",
    bullets: [
      "AI product videos and reels for your catalogue",
      "Model and lifestyle product images",
      "Clean white-background images for listings",
    ],
    sortOrder: 3,
  },
  {
    title: "Website Care",
    bullets: [
      "Website management and regular updates",
      "Speed optimization and fixes",
      "Monthly support for your store",
    ],
    sortOrder: 4,
  },
];

const seedProcessSteps = [
  {
    number: "01",
    title: "Discover",
    text: "We talk about your business, your products and your goals.",
    sortOrder: 1,
  },
  {
    number: "02",
    title: "Design",
    text: "You approve the design direction before any code is written.",
    sortOrder: 2,
  },
  {
    number: "03",
    title: "Build",
    text: "Your store is built with clean code, tested mobile-first.",
    sortOrder: 3,
  },
  {
    number: "04",
    title: "Launch and Grow",
    text: "Ads, content and improvements continue after launch.",
    sortOrder: 4,
  },
];

async function seed() {
  try {
    await mongoose.connect(mongoUri);

    // 1. Clear existing collections (idempotent)
    await Promise.all([
      Setting.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Service.deleteMany({}),
      ProcessStep.deleteMany({}),
      Admin.deleteMany({}),
    ]);

    // 2. Insert seed content
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    await Promise.all([
      Setting.create(seedSetting),
      Project.insertMany(seedProjects),
      Skill.insertMany(seedSkills),
      Service.insertMany(seedServices),
      ProcessStep.insertMany(seedProcessSteps),
      Admin.create({
        email: adminEmail,
        passwordHash,
      }),
    ]);

    // 3. Count documents
    const [
      settingsCount,
      projectsCount,
      skillsCount,
      servicesCount,
      processStepsCount,
      adminsCount,
    ] = await Promise.all([
      Setting.countDocuments(),
      Project.countDocuments(),
      Skill.countDocuments(),
      Service.countDocuments(),
      ProcessStep.countDocuments(),
      Admin.countDocuments(),
    ]);

    // Output prints ONLY the document count per collection
    console.log(`settings: ${settingsCount}`);
    console.log(`projects: ${projectsCount}`);
    console.log(`skills: ${skillsCount}`);
    console.log(`services: ${servicesCount}`);
    console.log(`processSteps: ${processStepsCount}`);
    console.log(`admins: ${adminsCount}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

seed();
