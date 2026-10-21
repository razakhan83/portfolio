# DESIGN: Ahmed Raza Portfolio

## Overall feel
Light, warm, editorial. A senior developer's site, designed by hand. Reference for LAYOUT only: https://portfolio-shahroz.vercel.app/ (same section order and grid ideas, completely different colours, theme and content).

## Colours (strict palette, nothing else)
- Background: Beige `#F5F5DC` (warm off-white). Pure white #FFFFFF is banned.
- Card surface: `#FFFEF7` (warm paper) with 1px solid border `#DED9BE`
- Primary: Teal `#008080`
- Deep teal (body text, headings, dark section): `#004C4C`
- Muted text: `#5A6B62` (warm grey-green)
- Contact section + footer band: Deep teal `#004C4C` background, beige `#F5F5DC` text
- Admin panel: shadcn neutral theme (white/grey) with teal `#008080` as the accent. Admin is a tool, keep it plain and fast.

## Typography
- Headings: **Cabinet Grotesk** (Fontshare), bold, tight letter spacing, very large sizes like the reference.
- Body: **Plus Jakarta Sans** (Google Fonts).
- Banned fonts: Inter, Geist, Space Grotesk.
- Section headings end with a teal full stop, like the reference (`Projects.`).
- Project titles: ALL CAPS, bold.

## Shape and spacing
- Radius: `rounded-lg` everywhere (8 to 12px max). No pill overload.
- Borders over shadows: 1px solid borders. Heavy drop shadows banned. Micro-shadow only where a dialog needs separation.
- Generous whitespace. Hairline dividers between sections.

## Landing page layout (top to bottom)
1. **Header:** wordmark left (`ahmed` deep teal + `raza` teal), social icons right (GitHub, LinkedIn, WhatsApp, X) as custom SVG or Phosphor icons. Hairline bottom border.
2. **Hero:** two columns. Left: eyebrow (small caps, teal), huge H1 with the name underlined in teal, paragraph, buttons: `Download CV` (text + teal underline) and `WhatsApp Me` (solid teal). Right: custom flat geometric SVG developer illustration (teal + deep teal shapes on beige, NO gradients, NO photo), thin outline circle overlapping its lower-left edge. Stats row below: three stats with Morph Number Flip.
3. **Skills:** 3-column grid. Big bold skill name + small muted experience caption. Hairline top border per row like the reference.
4. **Projects:** heading `Projects.` Two-column card grid. Card: image (16/10), title row (ALL CAPS title left, GitHub + Live icon links right), teal stack line, description. Click opens the Morph Dialog case study (Problem / What I Built / Result, bullet character •). Concept projects carry a small clean `CONCEPT` tag (typography only, no emoji).
5. **Services:** heading `Services.` Morph Tabs (gliding teal underline, sliding panel). Bullets with • character. WhatsApp button inside each panel.
6. **Process:** heading `How I Work.` Vertical numbered steps (01 to 04), title + one line. Not cards in a row.
7. **Contact:** dark deep-teal band. Big beige heading, one line of text, WhatsApp button (beige bg) + email link.
8. **Footer:** wordmark + socials repeated, hairline divider, copyright + Privacy / Terms links.

## Admin panel layout (shadcn, minimal)
- Left sidebar: Dashboard, Projects, Skills, Services, Settings, View Site, Logout.
- Top bar: page title + admin email.
- Dashboard: small stat cards (total projects, published projects, skills count) + quick links. Nothing decorative.
- Projects page: shadcn Table (thumbnail, title, stack, published switch, edit/delete), `Add Project` button, form in a Sheet or Dialog with image upload preview.
- Skills / Services pages: simple editable lists (inputs in rows, add/remove, save).
- Settings page: one form for all site texts and links.
- All admin forms: labels above inputs, clear save button, toast on success, confirm dialog before delete.

## Icons
- Phosphor Icons or custom inline SVG only. **Lucide is banned** (overused, screams AI template).
- Social icons: simple custom SVG paths.

## Animation spec
- Headings: scroll reveal with a teal block wiping across, then text shows (Motion, whileInView, once).
- Sections/cards: fade-up, small stagger. Transform and opacity only, 60fps.
- Projects: Morph Dialog morph open/close.
- Services: Morph Tabs glide.
- Stats: Morph Number Flip on scroll into view.
- Route change (home, privacy, terms): Morph Page Transition crossfade.
- Custom cursor: small teal dot, pointer-fine devices only, native cursor stays visible.
- Hover: 100 to 150ms ease-out, colour/opacity shifts. Buttons: `active:scale-[0.98]`.
- `prefers-reduced-motion`: disable wipe, morph and cursor effects.

## Loading and empty states
- Skeleton screens in warm beige tones (`animate-pulse`) for: project cards while images load, any client-fetched content.
- Suspense fallbacks for async server sections.
- Admin tables: skeleton rows while loading. Empty states: one line of text + action button (for example, "No projects yet. Add your first project.").

## Banned list (instant AI-template signals)
Harsh or rainbow gradients · glow orbs · dot grids · glassmorphism · bento grids · 3 feature cards in a row · fake terminal windows · emojis in headings/badges · checkmark bullets · coloured left stripe on cards · pill-shaped everything · neon colours · low-contrast pastels · stock avatars · fake testimonials · sparkle/magic icons · floating animated arrows · Space Grotesk / Inter / Geist · Lucide icons · pure white background.

## Responsive
- Mobile first. Hero stacks (illustration below text), projects grid becomes 1 column, skills 2 columns then 1.
- Admin usable at 360px width (sidebar collapses to top bar with menu button).
- Test widths: 360, 768, 1440.
