# Handoff: where the portfolio build left off (Oct 23, 2026)

Read `CLAUDE.md` first (design brief). This file records what's built and what's still open.

## Setup
- Repo: github.com/onlyonechanc65/2026-Portfolio. Pushing to `main` deploys to www.chancbaylor.com on Vercel (domain attached, live).
- Stack: Next.js 16 (App Router) + Tailwind 4, Satoshi via `next/font/local`. Test with `npx next build` and `npx next start`.
- Decisions made: masonry uses the approved 5/4/3/2/1 columns (not CLAUDE.md section 5). Case studies open in the lightbox and also have their own URLs (`/work/<slug>`).

## Where things live
- `lib/content.ts`: profile, clients, location, about, photo gallery (`photoStack`), wall order (`visualWork`).
- `lib/case-studies.ts`: the two case studies (blocks: p, h, list, callout, figure, table, quote).
- `lib/projects.ts`: wall projects (image, `detail` images, `result` one-liner, `summary`, `compare` before/after, `video`).
- `lib/images.generated.ts`: sizes + blur placeholders for everything in `public/work/`. New images: export to WebP, add an entry here.
- `public/clients/`: one-color (#E8DCD6) client logos.
- `components/`: `Portfolio.tsx` (grid, cards, sidebar, row-filling `Masonry`, `PhotoCarousel`), `Lightbox.tsx`, `CaseStudyArticle.tsx`, `Previews.tsx` (animated previews, `BeforeAfter`, `LoopVideo`).

## What's on the site
**Sidebar:** profile (photo at `public/work/photos/profile.webp`, approved copy, LinkedIn + orange email pill); Clients logo marquee in resume order (ServiceNow, T. Rowe Price, Aerotek, PointClickCare, Under Armour, Stanley Black & Decker), pauses on hover; Baltimore + live time; About & Resume with Chanc's own copy. "Currently at" card removed.

**Featured case studies** (sections run Problem, Solution, My role, Process, Impact, with callouts for wrong turns, research, tradeoffs, stakeholder feedback):
1. **Partner portal homepage redesign** (`/work/partner-portal`): card keeps the animated before→after + mobile preview; the Solution section uses that animation in place of the before/after stills (`preview` block, `fullScroll`: 28s loop that scrolls desktop and mobile to the bottom); the case study header is `heroVideo` (`public/work/partner-portal/hero-loop.mp4`: one hero load cycle at 0.75x, 3.5s hold, 0.6s fade back to the start); nav, homepage, task-first alternative and mobile figures from the PDF; before/after table; targets labeled as targets.
2. **Partner Comms Image Builder** (`/work/partner-comms-image-builder`): card reads "Sole designer, built with Claude"; recorded tool animation; Solution opens with "What people make with it": 8 real outputs, all 1200×627 in a 2-column grid (`public/work/image-builder/made/`; the 1920×1080 ones were center-cropped). Tool screens use subtitle "On-brand images in minutes" (no widows). Text-scale images removed.

**Wall, in order:** Off the clock photo carousel (5 captioned photos, rotates every 5s, pause button, Italy photos kept apart); Armis launch (looping video, landing page, "Read FAQ" + "acquisition" fixed in the image); LinkedIn partner content and performance analysis (animated CRM events thumbnail: `CrmEventsPreview` in `Previews.tsx` rebuilds the post from layers in `public/work/linkedin-partner/crm/`, headline rises in on view, photo rows drift, still image under reduced motion; lightbox has 3 composite boards of all 9 posts in `public/work/linkedin-partner/`, plus 4 findings from the Q2–Q3 2026 analysis; Chanc designed the posts and ran the analysis, Nikki Kratounis wrote the copy; exact numbers approved for public use); T.Rowe Header Design (made "with Figma"); Aerotek; Cyberpunk promo (before/after); Colby Solar; Who Can I Run To? (before/after); Ravens poster; Tank Davis poster; then four captioned poster designs: Kiana Lede Tribute, The Sunflower, Halloween, Nike kid. Projects with detail images open on the 2nd image, not the thumbnail. Gray placeholders hidden (re-enable in `content.ts`).

**Lightbox:** up to 1440px wide on desktop, unchanged on phones.

**Case study type:** sections use a sticky heading column (180px) beside a full-width body column at ≥1024px, stacked below that (`.cs-section` in `globals.css`). Body copy is 16–18px with no max width; `text-wrap: pretty` keeps lone words off line ends.

## Open items
- **Resume:** live at `public/resume.pdf` (CBaylor_Resume_2026, 2 pages); `about.resumeUrl = "/resume.pdf"`. Chanc will send an updated version later: replace the file at the same path, no code change needed.
- More projects to come; each new project becomes a wall card automatically.
- Unanswered: Partner Portal team is listed by role, not name (ok to add names?); Image Builder screens use a fallback font (real screenshots welcome).

## Conventions
- No em dashes in copy except date ranges; never pure white; accent orange used sparingly.
- Check lone words at line ends and layouts at desktop, tablet and phone before pushing.
- Commits: author Chanc Baylor <onlyonechanc@gmail.com>, committer left as the environment default (Claude <noreply@anthropic.com>) so the signature shows Verified. Use `git -c author... ` or `--author="Chanc Baylor <onlyonechanc@gmail.com>"`; never override the committer. Push to `main` deploys.
