# PRD: Ahmed Raza Portfolio

## Product
A personal developer portfolio for **Ahmed Raza** (MERN / Next.js developer, e-commerce specialist, Meta ads marketer, Karachi, Pakistan) with two parts:
1. A public **landing page** (the portfolio).
2. A private **admin panel** where the owner edits the landing page content (projects, thumbnails, headings, skills, services, texts) without touching code.

## Problem
The owner's old portfolio looks AI-generated and is hard-coded: every small text or project change needs a developer edit and a redeploy. Clients judge a developer by his own site first.

## Target users
- **Visitors:** potential clients (store owners, businesses) checking his work before hiring him.
- **Admin:** only Ahmed himself. One user. No public signup, ever.

## Goal
A fast, hand-crafted-looking portfolio that wins client trust, and that the owner can update in minutes from a simple admin panel.

## Core features
1. Landing page: header, hero (SVG illustration, stats), skills grid, projects grid with case-study dialog, services tabs, process steps, contact section, footer, /privacy and /terms pages.
2. All landing content comes from the database. Nothing important is hard-coded.
3. Admin panel (shadcn style, minimal): login, dashboard, projects CRUD with thumbnail upload, skills editor, services editor, site settings (hero texts, stats, socials, contact text).
4. Seed data: the database starts filled with the real content in the Appendix of this file.

## MVP (version 1, exactly this)
- Landing page with all sections, reading content from the database
- Admin login (single admin, password based)
- Projects: create, edit, delete, reorder, thumbnail upload
- Skills: add, edit, delete, reorder
- Services: edit tab titles and bullet lines
- Settings: edit hero eyebrow, hero paragraph, stats, contact heading and text, social links
- Seed script that loads the Appendix content
- Deployed on Vercel with MongoDB Atlas

## Out of scope (do NOT build)
- Blog, comments, contact form with database storage (contact is WhatsApp and email links only)
- Multi-user accounts, roles, public registration
- Payments, analytics dashboard, newsletter
- Multi-language support
- Dark mode toggle

## Success criteria
1. A visitor sees the full portfolio with real content, Lighthouse 95+ scores.
2. Ahmed logs in, adds a new project with a thumbnail, and it appears on the landing page without a redeploy.
3. Ahmed edits the hero paragraph in admin and the landing page shows the new text.
4. A logged-out visitor cannot open any /admin page.
5. The site never looks broken while loading: skeletons everywhere content loads.

## Appendix: Seed content (use exactly, do not rewrite)

### Settings
- Wordmark: `ahmed` + `raza`
- Hero eyebrow: `MERN STACK DEVELOPER · KARACHI, PAKISTAN`
- Hero title: `Nice to meet you! I'm Ahmed.`
- Hero paragraph: `I build fast e-commerce stores with Next.js and help brands sell more with Meta ads. Three years of development, three live stores, and one clear focus: websites that bring orders, not just traffic.`
- Stats: `3+ Years Experience` · `3 Live Stores` · `89 Products Live`
- GitHub: https://github.com/razakhan83
- LinkedIn: https://www.linkedin.com/in/razakdev/
- WhatsApp: https://wa.me/923052622043
- Email: 123raza83@gmail.com
- CV file path: /Ahmed-Raza-CV.pdf
- Contact heading: `Let's work together.`
- Contact text: `Have a store to build, or ads to run? Message me on WhatsApp and I will reply with a clear plan and a fair price.`

### Skills (name: caption)
Next.js: 2 Years Experience · React: 3 Years Experience · JavaScript: 3 Years Experience · Node.js: 3 Years Experience · Express: 3 Years Experience · MongoDB: 3 Years Experience · Tailwind CSS: 2 Years Experience · Meta Ads: 2 Years Experience · Git and GitHub: 3 Years Experience

### Projects
1. **ORNAMENTS BY ARSHAD** — stack: `NEXT.JS · MONGODB · META ADS` — live: https://www.ornamentsbyarshad.com/
   Card text: Client jewellery store, live and selling. Custom storefront, product management and Meta ad campaigns, all handled by me.
   Problem: The client sold only through Instagram messages and needed a proper online store.
   Built: • Full Next.js storefront with product pages, cart and checkout • Admin product uploads with clean processed images • Meta Pixel integration and ad campaign setup
   Result: A live store with running ad campaigns and a monthly management retainer.
2. **CHINA UNIQUE STORE** — stack: `NEXT.JS · MONGODB · TAILWIND CSS` — live: https://www.chinauniquestore.com/
   Card text: My own gadget store, built end to end: storefront, admin panel, orders, payments and courier tracking.
   Problem: I needed a full e-commerce system for my own business, not a rented template.
   Built: • Custom storefront with cart, checkout and customer accounts • Full admin panel: products, orders, inventory, customers • Performance tuning across the whole store
   Result: 89 products live, desktop PageSpeed score of 94.
3. **AAM SAMAN** — stack: `E-COMMERCE · OPERATIONS`
   Card text: My second store, run daily by me: products, orders, packing and customer support.
   Problem: A growing product range needed daily hands-on management.
   Built: • Store operations system covering listings, pricing and order flow • Customer support process on WhatsApp
   Result: A running daily business, managed end to end by one person.
4. **TERRA BOTANICA** — stack: `NEXT.JS · CONCEPT PROJECT` — concept: yes
   Card text: Concept store for a plants brand. Editorial layout, warm colours and a full shopping flow.
5. **PULSEBOARD** — stack: `NEXT.JS · DASHBOARD · CONCEPT PROJECT` — concept: yes
   Card text: Concept SaaS analytics dashboard with charts, KPI cards and a clean dark interface.
6. **TRADING JOURNAL** — stack: `NEXT.JS · CHARTS · CONCEPT PROJECT` — concept: yes
   Card text: Concept dashboard for gold traders: trade journal, win rate and a profit calendar view.

### Services (tab title: bullet lines)
- **E-commerce Stores**: • Custom Next.js storefront, designed for your brand • Product uploads with clean, processed images • Cart, checkout and payment setup • Admin panel for orders and stock • SEO basics configured from day one
- **Meta Ads and Marketing**: • Campaign setup with pixel integration • Daily ad management and budget control • Creative testing for better results • Performance monitoring with clear reports
- **AI Product Videos**: • AI product videos and reels for your catalogue • Model and lifestyle product images • Clean white-background images for listings
- **Website Care**: • Website management and regular updates • Speed optimization and fixes • Monthly support for your store

### Process steps
- 01 Discover: We talk about your business, your products and your goals.
- 02 Design: You approve the design direction before any code is written.
- 03 Build: Your store is built with clean code, tested mobile-first.
- 04 Launch and Grow: Ads, content and improvements continue after launch.

### Privacy page text
This site collects no data directly. Contact happens through WhatsApp and email. Messages sent by visitors are used only to reply. No data is sold or shared.

### Terms page text
Content on this site belongs to Ahmed Raza. Project names and brands belong to their owners. Service details are confirmed individually before any work starts.
