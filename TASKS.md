# TASKS: Ahmed Raza Portfolio

Work top to bottom. One task at a time. Every task ends with: `npm run build` clean, lint clean, manual check, commit, report (shape defined in RULES.md). Tick the box when done.

## Phase 0: Project setup
- [x] TASK-001: Scaffold Next.js (App Router, TypeScript, Tailwind v4) in a fresh repo. Add `.env.example` and `.gitignore` (`.env.local` ignored). Acceptance: dev server runs, empty page loads.
- [x] TASK-002: Install the agent skills (exact commands and picks in README step 3): morph-ui, the Matt Pocock set (setup-matt-pocock-skills, grill-me, tdd, diagnosing-bugs, code-review), vercel-react-best-practices, frontend-design, shadcn, emil-design-eng. Run `/setup-matt-pocock-skills` once (issue tracker: local files, docs: repo root). Copy `morph.css` next to `globals.css`, import it AFTER Tailwind v4. Acceptance: the skill folders exist in the project, the setup skill has run, and a test Morph component (Tabs) renders on a scratch page, then the scratch page is removed.
- [ ] TASK-003: Install and wire fonts: Cabinet Grotesk (Fontshare) for headings, Plus Jakarta Sans (Google) for body via next/font, `display: swap`. Set the colour tokens from DESIGN.md as Tailwind v4 theme variables. Acceptance: a test heading uses Cabinet Grotesk in deep teal on beige.
- [ ] TASK-004: Install shadcn/ui (only the components the admin needs: button, input, label, table, dialog, sheet, switch, toast/sonner, alert-dialog). Acceptance: one shadcn button renders in the admin shell.

## Phase 1: Database and content layer
- [ ] TASK-005: MongoDB Atlas connection in `src/lib/db.ts` (cached connection, no new connection per request). Mongoose models for: settings, projects, skills, services, processSteps, admins (schemas in ARCHITECTURE.md). Acceptance: a script connects and lists collections.
- [ ] TASK-006: Seed script `scripts/seed.ts`: loads ALL content from the PRD.md Appendix and creates the admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env (bcrypt hash, cost 12). Safe to run twice (upsert, no duplicates). Acceptance: after seeding, every collection has the PRD content.
- [ ] TASK-007: Content data layer `src/lib/content.ts`: one function per section (getSettings, getProjects, getSkills, getServices, getProcessSteps), React `cache()` + cache tag `portfolio-content`. If the database is empty, return the PRD Appendix defaults so the page never renders blank. Acceptance: a server page prints the seeded hero title and 6 project titles.

## Phase 2: Landing page (public site)
- [ ] TASK-008: Site layout: header (wordmark + social icons), footer (wordmark, socials, copyright, /privacy and /terms links), hairline dividers. Acceptance: header and footer show on every public page, icons have aria labels.
- [ ] TASK-009: Hero: eyebrow, H1 with teal-underlined name and teal full stop, paragraph, Download CV + WhatsApp buttons, custom flat SVG developer illustration (teal shapes, no gradients, no photo) with the outline circle, stats row with Morph Number Flip triggered on view. All text from getSettings(). Acceptance: hero matches DESIGN.md at 360px and 1440px.
- [ ] TASK-010: Skills section: 3-column grid from getSkills(), big bold name + muted caption, hairline row borders. Acceptance: all 9 seeded skills show in sort order.
- [ ] TASK-011: Projects section: 2-column card grid from getProjects() (published only, sort order). Card: next/image thumbnail (AVIF/WebP, skeleton while loading), ALL-CAPS title, GitHub + Live icon links, teal stack line, description, CONCEPT tag where isConcept is true. Acceptance: 6 seeded projects show, images lazy-load below the fold.
- [ ] TASK-012: Project case-study dialog: clicking a card opens the Morph Dialog (card grows into the panel) with Problem / What I Built (bullet character •) / Result, plus Live and GitHub buttons. Close returns to the card. Acceptance: dialog opens and closes smoothly, keyboard Esc closes it, focus is trapped inside while open.
- [ ] TASK-013: Services section: Morph Tabs from getServices(), gliding teal underline, sliding panel, bullets with •, WhatsApp button in each panel. Acceptance: 4 tabs glide and slide, content matches the seed.
- [ ] TASK-014: Process section: vertical numbered steps (01 to 04) from getProcessSteps(). Not cards in a row. Acceptance: 4 steps show in order.
- [ ] TASK-015: Contact section (deep teal band, beige text) + footer: heading, text, WhatsApp button, email link, all from getSettings(). Acceptance: buttons link correctly.
- [ ] TASK-016: /privacy and /terms pages with the PRD text, same header and footer, Morph Page Transition crossfade between public routes. Acceptance: both pages render, one h1 each.
- [ ] TASK-017: Animation pass: heading wipe reveals (Motion whileInView, once), fade-up sections with small stagger, custom teal cursor dot (pointer-fine only, native cursor stays visible), hover states 100 to 150ms ease-out, buttons active:scale-[0.98], prefers-reduced-motion disables wipe, morph and cursor. Acceptance: no animation uses anything except transform and opacity.

## Phase 3: Admin auth
- [ ] TASK-018: Login page `/admin/login`: email + password form (shadcn), zod validation, bcrypt check against the admins collection, JWT (AUTH_SECRET) in httpOnly, secure, sameSite=lax cookie, 7 days. Failed attempts limited (5 per 10 minutes per IP). Acceptance: correct login reaches /admin, wrong password shows a clear error.
- [ ] TASK-019: Protection: middleware guards `/admin/*` (except login) and `/api/admin/*`; every admin server action and API route ALSO verifies the session server-side. `/admin` has robots noindex. Acceptance: logged out, /admin and /api/admin/upload both refuse; logged in, both work.

## Phase 4: Admin panel
- [ ] TASK-020: Admin shell: shadcn sidebar (Dashboard, Projects, Skills, Services, Settings, View Site, Logout), top bar with page title and admin email, collapses to a top bar with menu button at 360px. Dashboard: stat cards (total projects, published projects, skills count) + quick links. Acceptance: shell renders, dashboard numbers match the database.
- [ ] TASK-021: Projects admin: shadcn Table (thumbnail, title, stack, published Switch, edit, delete). Add Project button opens a form (Sheet or Dialog): title, stackLine, description, liveUrl, githubUrl, isConcept, problem, builtBullets (one per line), result, sortOrder, isPublished. Delete asks for confirmation (alert-dialog). Every save calls revalidateTag('portfolio-content'). Acceptance: add, edit, publish/unpublish and delete a project in admin, and the landing page reflects each change with no redeploy.
- [ ] TASK-022: Thumbnail upload: project form uploads an image to `/api/admin/upload` (session verified, server validates type jpg/png/webp/avif and max 5 MB), server sends it to Cloudinary folder `portfolio-projects`, saves only the returned URL. Upload shows a preview and a skeleton/progress state, never a silent failure. Acceptance: upload a real image, it appears in the form, in the table, and on the landing page card.
- [ ] TASK-023: Skills admin: editable list (name, caption, sort order), add and delete rows, one Save button, toast on success. Acceptance: change a caption in admin, landing page skills grid shows it.
- [ ] TASK-024: Services admin: list of tabs, edit title and bullets (one per line), reorder if simple, Save with toast. Acceptance: edit a bullet, landing page tab shows it.
- [ ] TASK-025: Settings admin: one form for every settings field (hero eyebrow, hero title, hero paragraph, stats value+label rows, social URLs, email, CV path, contact heading, contact text), Save with toast. Acceptance: edit the hero paragraph, landing page hero shows the new text.

## Phase 5: Polish, performance, QA
- [ ] TASK-026: Loading and empty states pass: skeletons (warm beige pulse) for project cards and admin tables, Suspense fallbacks for async sections, admin empty states with one line of text + action button. Acceptance: throttle the network in devtools, no blank white screens anywhere.
- [ ] TASK-027: Performance pass: dynamic imports for the Morph Dialog and admin editors, check for unused dependencies and remove them, confirm images use correct `sizes`, run Lighthouse on the landing page. Acceptance: Lighthouse 95+ in Performance, Accessibility, Best Practices, SEO (report the actual numbers).
- [ ] TASK-028: Full QA checklist:
  - [ ] Landing: every section renders seeded/edited content, all links work
  - [ ] Mobile 360px, tablet 768px, desktop 1440px checked on landing and admin
  - [ ] Admin: logged-out access refused, login works, CRUD works for projects, skills, services, settings
  - [ ] Upload: wrong file type and a file over 5 MB are both rejected with a clear message
  - [ ] Accessibility: one h1 per page, alt text, aria labels, keyboard can open and close the project dialog
  - [ ] No secrets in git history, `.env.local` not committed
- [ ] TASK-029: Deploy: connect the repo to Vercel, set all env vars from .env.example in Vercel, deploy, run the seed against production Atlas once, set NEXT_PUBLIC_SITE_URL. Acceptance: live URL serves the portfolio, admin login works on production, one content edit in production admin appears on the live landing page.

## Later (not in v1, do not build now)
- Blog, analytics, contact form storage, multi-language, dark mode. Only when the owner asks.
