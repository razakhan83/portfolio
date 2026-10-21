# Portfolio Plan Pack: Ahmed Raza Portfolio (Landing Page + Admin Panel)

This pack replaces the single master prompt file. It follows the vibe coding method from your guide, cut down to only what this project needs.

## Files in this pack
- **PRD.md**: what we are building, MVP, what is OUT of scope, and the Appendix with all real seed content (hero, skills, 6 projects, services, process, privacy/terms text).
- **ARCHITECTURE.md**: stack, database models, auth, image uploads, caching, env vars, and the key decisions with reasons.
- **DESIGN.md**: colours (teal #008080 + beige #F5F5DC), fonts, layout per section, admin look, animation spec, and the banned AI-template list.
- **RULES.md**: the rulebook Antigravity must follow while coding (one task at a time, build clean, verify session server-side, report shape).
- **TASKS.md**: 29 small tasks in 6 phases, each with an acceptance line.
- **README.md**: this file.

## What was removed from your guide (not needed for a portfolio)
- Separate **TEST_PLAN.md**: folded into TASKS.md Phase 5 as a QA checklist.
- Separate **SECURITY.md**: folded into ARCHITECTURE.md (security essentials) + RULES.md. Single-admin app, small surface.
- Separate **DECISIONS.md**: folded into ARCHITECTURE.md as "Key decisions".
- Separate **MEMORY.md**: dropped. TASKS.md checkboxes are the project state, and Muse tracks the rest.
- From your performance prompt: all backend rules (database indexing, N+1 queries, Redis, connection pooling, API gzip) are out. This app has no heavy backend queries. The frontend rules stayed: code splitting, lazy images AVIF/WebP, skeletons, minimal client JS, Lighthouse 95+.

## Decisions already made for you
- **MongoDB Atlas + Mongoose**, not Supabase. Your stack, same as China Unique Store.
- **One admin (you)**, password login, bcrypt + JWT cookie. No signup, no user system.
- **Cloudinary** for project thumbnails, because Vercel disk does not survive redeploys.
- **shadcn/ui** for the admin panel only. The landing page is custom design per DESIGN.md.
- Content is **never hard-coded**: the landing page reads from the database, admin edits refresh it through a cache tag, no redeploy needed.

## How to execute (step by step)
1. Create a new empty GitHub repo (you create repos yourself) and clone it on your PC.
2. Copy these 6 files into the repo root and commit: `docs pack added`.
3. Install the agent skills. In the repo folder, run these one by one. When an installer asks which skills to take, pick ONLY the listed ones, and choose your agent (Antigravity) if it asks:
   - `npx skills add AnmolSaini16/morph-ui` (Morph UI components, also TASK-002)
   - `npx skills add mattpocock/skills` and pick: setup-matt-pocock-skills, grill-me, tdd, diagnosing-bugs, code-review
   - `npx skills add vercel-labs/agent-skills` and pick: vercel-react-best-practices
   - `npx skills add anthropics/skills` and pick: frontend-design
   - `npx skills add shadcn/ui` and pick: shadcn
   - `npx skills add emilkowalski/skills` and pick: emil-design-eng
   Do not install more skills than this set. Extra skills slow the agent down and confuse it.
4. Open the repo in Antigravity. First run `/setup-matt-pocock-skills` one time and answer: issue tracker = local files (your tasks live in TASKS.md), triage labels = default, docs location = repo root. Then paste this as the FIRST build prompt:

```
Read PRD.md, ARCHITECTURE.md, DESIGN.md, RULES.md and TASKS.md in this repo.
Do not write any code yet.
First: confirm you understand the product, the stack and the design rules.
Then explain your plan for TASK-001 only.
Wait for my go-ahead before coding.
```

5. After its answer, say: `Start TASK-001.` When it reports, check the report has the 5 points from RULES.md (task, files changed, what was built, build result, blockers).
6. Send me each report (or just the task number and build result). I verify it against this pack, same as I did for China Unique Store, and tell you PASS or what to send back.
7. Move to the next task only after the current one passes. Never ask Antigravity to do two tasks in one prompt.
8. Accounts you will need ready: MongoDB Atlas (free cluster), Cloudinary (free account). Create them when you reach Phase 1 and Phase 4; Antigravity will give you the exact env values to fill.
9. Before the production deploy (TASK-029), set a strong admin password in the seed env. Never paste passwords or secrets into any chat, including with me.

## The build order at a glance
Phase 0 setup → Phase 1 database + seed + content layer → Phase 2 landing page → Phase 3 admin login → Phase 4 admin panel (projects, upload, skills, services, settings) → Phase 5 QA + Lighthouse + deploy.
