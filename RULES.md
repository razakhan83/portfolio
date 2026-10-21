# RULES: How the AI must work on this project

## Before any coding
- Read PRD.md, ARCHITECTURE.md, DESIGN.md and TASKS.md fully before writing code.
- Work on ONE task from TASKS.md at a time. Say which task you are starting.
- If a task is unclear, ask. Do not invent features that are not in the PRD.

## Installed skills (use them)
- If a task's requirements are unclear, use `grill-me` and ask the owner before coding.
- For any hard bug, follow the `diagnosing-bugs` loop. Never guess-fix.
- Before reporting a task as done, run `code-review` on your own diff (standards + spec) and fix what it finds.
- Follow `vercel-react-best-practices` for React and Next.js performance, `frontend-design` and `emil-design-eng` for design and animation quality, and the `shadcn` conventions inside the admin panel.

## General
- TypeScript everywhere. No `any` unless there is no other way, and comment why.
- Reuse existing components and helpers. Never create a second version of something that exists.
- Keep functions small and files focused. UI components contain no database logic; database access lives only in `src/lib/` and server actions.
- Do not modify files unrelated to the current task.
- No placeholder lorem ipsum anywhere. Use only the real content from PRD.md.

## UI
- Follow DESIGN.md exactly: colours, fonts, radius, borders, banned list. The banned list overrides any component library default.
- Server Components by default. "use client" only where interaction or animation requires it.
- Every data-driven section needs three states: loading (skeleton), empty, and error.
- Images only through next/image with AVIF/WebP, responsive sizes and lazy loading below the fold.
- Animations: transform and opacity only. Hover transitions 100 to 150ms. Respect prefers-reduced-motion.
- Responsive at 360px, 768px and 1440px. Test all three before finishing a UI task.

## Data and admin
- All content reads go through `src/lib/content.ts`. Components never query MongoDB directly.
- All admin writes verify the session server-side, validate input with zod, then call `revalidateTag('portfolio-content')`.
- Forms: disable the submit button while saving, show a toast on success, show a clear error message on failure. Never fail silently.
- Deletes always ask for confirmation in the UI first.

## Security
- Never put secrets in code, comments or commits. Env vars only.
- Passwords: bcrypt hash only, never plain text, never logged.
- Uploads: validate file type and size on the SERVER before sending to Cloudinary.
- /admin and /api/admin are never accessible without a valid session. No exceptions, no demo or guest mode.
- Do not print env values, tokens or password hashes in build logs or reports.

## Performance
- Lighthouse 95+ is the target for the landing page (Performance, Accessibility, Best Practices, SEO).
- Code-split heavy client components (dialog, admin editors) with dynamic imports.
- Add no dependency without a clear reason. If you add one, say why in your report.
- One h1 per page, semantic landmarks, alt text on images, aria labels on icon-only buttons.

## Testing and build
- After every task: run `npm run build`. It must pass with 0 errors before the task is done.
- Run `npm run lint` and fix what you introduced.
- Manually verify the task's acceptance line in TASKS.md (open the page, click the thing, check mobile width).

## Git
- Commit after every completed task with a clear message, for example `feat(projects): admin CRUD with thumbnail upload`.
- Small commits. Never commit `.env.local` or real secrets.
- Do not rewrite history or force push.

## Reporting (after every task)
Report in this exact shape:
1. Task number and name
2. Files changed
3. What was built
4. Build result (errors or clean)
5. Anything blocked or needing the owner's decision
