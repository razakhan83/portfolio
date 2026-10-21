# ARCHITECTURE: Ahmed Raza Portfolio

## Stack
- **Framework:** Next.js (latest, App Router) + React 19.3+ + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Morph UI components (copy-paste, React ViewTransition) + Motion (framer-motion) for scroll reveals only
- **Database:** MongoDB Atlas (free tier) + Mongoose
- **Admin UI:** shadcn/ui components
- **Image storage:** Cloudinary (project thumbnails)
- **Auth:** single-admin password login, bcrypt hash + JWT in httpOnly cookie
- **Hosting:** Vercel

## How it works
```
Visitor ──> Landing page (Server Components) ──> cached read of content collections
Admin ──> /admin (login required) ──> Server Actions / route handlers ──> MongoDB
Admin edit ──> revalidateTag('portfolio-content') ──> landing page cache refreshes
Thumbnail upload ──> /api/admin/upload ──> Cloudinary ──> image URL saved in MongoDB
```

## Data models (MongoDB collections)
- **settings** (single document): wordmark parts, heroEyebrow, heroTitle, heroParagraph, stats array [{value, label}], githubUrl, linkedinUrl, whatsappUrl, email, cvPath, contactHeading, contactText
- **projects**: title, stackLine, description, imageUrl, liveUrl, githubUrl, isConcept (bool), problem, builtBullets (string array), result, sortOrder, isPublished (bool)
- **skills**: name, caption, sortOrder
- **services**: title, bullets (string array), sortOrder
- **processSteps**: number, title, text, sortOrder
- **admins**: email, passwordHash (bcrypt). Created once by the seed script from env values. Never a signup route.

## Content reading and caching
- Landing page reads content through one data layer (`src/lib/content.ts`) with React `cache()` + Next.js cache tags (`portfolio-content`).
- Every admin create/update/delete calls `revalidateTag('portfolio-content')` so edits appear without a redeploy.
- If the database is empty (before seeding), the data layer returns the PRD Appendix content as fallback defaults, so the page never renders blank.

## Authentication
- `/admin/login`: email + password form.
- Password checked against the bcrypt hash in the `admins` collection.
- On success: JWT signed with `AUTH_SECRET`, set as httpOnly, secure, sameSite=lax cookie (7 days).
- `middleware.ts` protects every `/admin/*` route except `/admin/login`, and every `/api/admin/*` route.
- Every admin server action and API route ALSO verifies the session server-side. Middleware alone is not trusted.
- Login route is rate-limited by simple in-memory attempt counting (max 5 failed attempts per 10 minutes per IP).

## Image uploads
- Admin uploads a thumbnail in the project form.
- Client sends the file to `/api/admin/upload` (session verified).
- Server validates: image types only (jpg, png, webp, avif), max 5 MB.
- Server uploads to Cloudinary folder `portfolio-projects` and returns the secure URL.
- Only the URL is stored in MongoDB. No image files are stored in the repo or on Vercel disk.

## Folder structure
```
src/
├── app/
│   ├── (site)/            landing page, /privacy, /terms
│   ├── admin/             login + panel pages
│   ├── api/admin/         upload route
│   └── layout.tsx, globals.css
├── components/
│   ├── site/              header, hero, skills, projects, services, process, contact, footer
│   ├── admin/             panel UI (shadcn based)
│   └── morph/             copied Morph UI components + morph.css
├── lib/                   db connection, content data layer, auth helpers
├── models/                Mongoose models
└── types/
scripts/seed.ts            loads PRD Appendix content + creates admin from env
```

## Environment variables (.env.example)
```
MONGODB_URI=
ADMIN_EMAIL=
ADMIN_PASSWORD=        (used once by the seed script, stored only as bcrypt hash)
AUTH_SECRET=           (long random string)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_SITE_URL=
```
Real values live in `.env.local` and in Vercel project settings. Never commit real values.

## Key decisions (do not change without asking the owner)
- **MongoDB, not Supabase:** the owner's stack is MERN. He already runs MongoDB in production on another store.
- **Single admin, no user system:** the only editor is the owner. A full auth product would be wasted scope.
- **Cloudinary for images:** Vercel disk is temporary. Thumbnails must survive redeploys.
- **Content from database with cache tags:** instant edits, still fast for visitors.
- **Morph UI + Motion split:** Morph for component morphs (dialog, tabs, number flip, page transition), Motion only for scroll reveals. No other animation library.

## Security essentials
- Secrets only in env vars, never in client code or git.
- All admin writes verify the session on the server.
- All form input validated on the server (zod schemas) before saving.
- Upload validation: type + size, server-side.
- Passwords never stored in plain text (bcrypt, cost 12).
- Security headers from Next.js defaults; no admin pages indexed (`robots: noindex` on /admin, and `X-Robots-Tag`).
