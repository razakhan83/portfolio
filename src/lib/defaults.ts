export interface Wordmark {
  first: string;
  rest: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface SiteSettings {
  wordmark: Wordmark;
  heroEyebrow: string;
  heroTitle: string;
  heroParagraph: string;
  stats: StatItem[];
  githubUrl: string;
  linkedinUrl: string;
  whatsappUrl: string;
  email: string;
  cvPath: string;
  contactHeading: string;
  contactText: string;
}

export interface SkillItem {
  id?: string;
  name: string;
  caption: string;
  sortOrder: number;
}

export interface ProjectItem {
  id?: string;
  title: string;
  stackLine: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  isConcept: boolean;
  problem: string;
  builtBullets: string[];
  result: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface ServiceItem {
  id?: string;
  title: string;
  bullets: string[];
  sortOrder: number;
}

export interface ProcessStepItem {
  id?: string;
  number: string;
  title: string;
  text: string;
  sortOrder: number;
}

export const defaultSettings: SiteSettings = {
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

export const defaultSkills: SkillItem[] = [
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

export const defaultProjects: ProjectItem[] = [
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

export const defaultServices: ServiceItem[] = [
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

export const defaultProcessSteps: ProcessStepItem[] = [
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
