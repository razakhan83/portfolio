export interface DemoProject {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  overview: string;
  stack: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface DemoProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface DemoLandingContent {
  header: {
    wordmark: string;
    navLinks: { label: string; href: string }[];
    cta: { label: string; href: string };
  };
  hero: {
    displayLines: string[];
    subline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  skills: {
    heading: string;
    subline: string;
    items: string[];
  };
  work: {
    heading: string;
    subline: string;
    projects: DemoProject[];
  };
  process: {
    heading: string;
    subline: string;
    steps: DemoProcessStep[];
  };
  contact: {
    heading: string;
    subline: string;
    buttonLabel: string;
    buttonHref: string;
    email: string;
  };
}

export const demoContent: DemoLandingContent = {
  header: {
    wordmark: "Ahmed Raza",
    navLinks: [
      { label: "Work", href: "#work" },
      { label: "Skills", href: "#skills" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
    cta: {
      label: "WhatsApp",
      href: "https://wa.me/923052622043",
    },
  },
  hero: {
    displayLines: [
      "Building fast web stores",
      "and digital products that scale.",
    ],
    subline:
      "Ahmed Raza · MERN / Next.js Developer crafting high-performance frontends, robust full-stack platforms, and smooth digital interactions.",
    primaryCta: {
      label: "Explore Work",
      href: "#work",
    },
    secondaryCta: {
      label: "Start a Project",
      href: "#contact",
    },
  },
  skills: {
    heading: "Core Stack & Technologies",
    subline: "Move your cursor across the tiles to inspect tool fluency and stack proximity.",
    items: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "GSAP Animations",
      "ScrollTrigger",
      "RESTful APIs",
      "Redux Toolkit",
      "PostgreSQL",
      "Git & GitHub",
      "Docker",
      "Web Performance",
      "E-Commerce UX",
    ],
  },
  work: {
    heading: "Selected Work",
    subline: "Hover to pause the stream. Select any project to open the case study overlay.",
    projects: [
      {
        id: "storefront-engine",
        title: "Storefront Engine",
        category: "Next.js / E-Commerce",
        year: "2026",
        summary:
          "Modular headless e-commerce frontend built with edge rendering, optimistic cart updates, and instant search.",
        overview:
          "Engineered for sub-second page transitions and streamlined shopping funnels. Features server components, micro-cached catalog queries, and responsive checkout UX.",
        stack: ["Next.js 16", "React 19", "Tailwind CSS", "TypeScript", "Edge Runtime"],
        features: [
          "Optimistic cart mutations with server actions",
          "Edge-cached product catalog filtering",
          "Lighthouse 95+ performance metrics across all views",
        ],
        demoUrl: "https://github.com/razakhan83",
        githubUrl: "https://github.com/razakhan83",
      },
      {
        id: "inventory-hub",
        title: "Stock & Order Hub",
        category: "MERN Stack / System",
        year: "2025",
        summary:
          "Multi-location warehouse inventory control system with real-time stock allocation and supplier dispatching.",
        overview:
          "A business-critical management application providing live inventory visibility across distributed storage points with automated low-stock warnings.",
        stack: ["Node.js", "Express", "MongoDB", "React", "WebSockets"],
        features: [
          "Real-time order synchronization via WebSockets",
          "Batch import/export pipelines for SKU adjustments",
          "Role-based permission matrix for warehouse staff",
        ],
        demoUrl: "https://github.com/razakhan83",
        githubUrl: "https://github.com/razakhan83",
      },
      {
        id: "perf-analytics",
        title: "Store Analytics",
        category: "Analytics / Dashboard",
        year: "2025",
        summary:
          "Conversion funnel analyzer tracking visitor sessions, cart drop-off rates, and peak sales velocity.",
        overview:
          "Designed to provide business operators with direct insights into user conversion behavior without heavyweight third-party trackers.",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
        features: [
          "Interactive time-series visualizations",
          "Automated daily summary report generator",
          "Privacy-first telemetry schema",
        ],
        demoUrl: "https://github.com/razakhan83",
        githubUrl: "https://github.com/razakhan83",
      },
      {
        id: "checkout-module",
        title: "Fast Checkout System",
        category: "Full Stack / Payments",
        year: "2026",
        summary:
          "Frictionless one-page checkout module with webhook payment validation and automated order receipts.",
        overview:
          "Created to eliminate shopping cart abandonment by simplifying address auto-fill, coupon calculation, and payment gateway tokenization.",
        stack: ["React 19", "TypeScript", "Node.js", "Tailwind CSS"],
        features: [
          "Single-step layout optimized for mobile screens",
          "Zero-latency tax and shipping recalculation",
          "Strict server-side receipt generation and state locking",
        ],
        demoUrl: "https://github.com/razakhan83",
        githubUrl: "https://github.com/razakhan83",
      },
      {
        id: "catalog-matrix",
        title: "Product Matrix Core",
        category: "React / Architecture",
        year: "2025",
        summary:
          "Dynamic product option configurator handling complex variant combinations with instant UI updates.",
        overview:
          "A client-side architecture solving combinatorial complexity in products with multi-axis variant matrices (sizes, colors, finishes, and custom bundles).",
        stack: ["React", "TypeScript", "Tailwind CSS", "State Machine"],
        features: [
          "Deterministic variant resolution algorithm",
          "Instant price recalculation with zero UI lag",
          "Deep-linking support for exact variant selections",
        ],
        demoUrl: "https://github.com/razakhan83",
        githubUrl: "https://github.com/razakhan83",
      },
    ],
  },
  process: {
    heading: "Engineering Process",
    subline: "A structured, reliable workflow from requirement discovery to production launch.",
    steps: [
      {
        step: "01",
        title: "Discovery & Architecture",
        desc: "Clarifying business outcomes, user paths, API contracts, and database schema requirements before writing code.",
      },
      {
        step: "02",
        title: "Design System & Prototyping",
        desc: "Setting up design tokens, semantic components, layout grids, and interactive states for consistency.",
      },
      {
        step: "03",
        title: "Full-Stack Implementation",
        desc: "Developing typed frontend interfaces, server endpoints, business logic validation, and database operations.",
      },
      {
        step: "04",
        title: "QA, Performance & Release",
        desc: "Auditing Core Web Vitals, verifying cross-browser reliability, tuning build bundles, and deploying to production.",
      },
    ],
  },
  contact: {
    heading: "Let's build something fast.",
    subline:
      "Available for full-stack contracts, e-commerce development, and web application architecture.",
    buttonLabel: "Chat on WhatsApp",
    buttonHref: "https://wa.me/923052622043",
    email: "123raza83@gmail.com",
  },
};
