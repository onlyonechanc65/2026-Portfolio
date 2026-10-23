# CLAUDE.md — Chanc Baylor Portfolio

Design and build brief for my personal portfolio. Read this before making any design or code decision, and follow it unless I say otherwise.

---

## 1. Project

- **Owner:** Chanc Baylor, Senior UX / Product Designer
- **Purpose:** Get hired for UI / UX / Product Design roles
- **Audience:** Hiring managers, design leads and recruiters. They skim fast, so show who I am and my best work within 10 seconds, then reward anyone who digs in.
- **Domain:** chancbaylor.com (already owned, on Vercel)
- **Stack:** Custom-coded and deployed on **Vercel**. Default to Next.js (App Router) + Tailwind CSS unless I say otherwise.
- **Repo:** github.com/onlyonechanc65/2026-Portfolio (connected to Vercel). Nothing is live on chancbaylor.com yet, so it's safe to deploy over.
- **Phase now:** Layout is **approved**. Build the real site with clearly labeled placeholders, deploy it, then swap in my content as I send it one case study at a time. Don't invent projects, clients or metrics.
- **Layout reference:** `design/mockup/Main.dc.html` is the approved mockup (a Claude design-canvas file; read it for structure, copy, spacing and breakpoints, it won't run on its own). Match it.
- **Fonts:** `app/fonts/Satoshi-Variable.woff2` and `app/fonts/Satoshi-VariableItalic.woff2` (license in `app/fonts/FFL.txt`).

### Approved profile copy (use exactly)
- Name: Chanc Baylor
- Title line: Senior Product Designer @ ServiceNow
- Intro: "I design the hard parts of enterprise products: onboarding, permissions and data-heavy workflows. 8+ years turning research and analytics into measurable wins across SaaS, fintech, healthcare and e-commerce for ServiceNow, T. Rowe Price, PointClickCare, Under Armour & more."
- Bullets:
  - 30+ experiences shipped for a portal with 1.1M+ annual visits
  - Onboarding drop-off cut from 35% to 20%
  - Time-to-publish cut from two weeks to 3–4 days
- Closing line: "Research-led, from usability testing and behavioral analytics to design systems and high-fidelity prototypes."
- LinkedIn icon button + orange email pill (baylorchanc@gmail.com) on **one line**
- "Currently at" card: ServiceNow / Senior UX Designer / 2024 – Present

### Approved layout decisions
- Left column (320px on desktop): Profile, Currently at, Clients, Location (Baltimore, Maryland + live time), About & Resume (orange "View resume"), Photo stack
- Main area: 2 featured case-study cards in a row that will hold a 3rd later, then the masonry wall (carousel card first, then visual-work cards)
- Masonry columns in the main area: 5 at ≥1600px, 4 at ≥1280px, 3 at 768–1279px, 2 at 480–767px, 1 below 480px
- Tablet (≤1023px): left column goes full width as a 2-column grid; Profile and Photo stack span both columns so no card sits alone on a row
- Phone (≤599px): everything stacks in one column
- Lightbox on phone: frame fills the width, prev/next arrows move to the bottom

---

## 2. Reference / Inspiration

**Primary reference:** dannpetty.com (Dann Petty's portfolio)

Use it for **structure, layout and interaction patterns only**. Never copy its content, imagery, logos, copy or personal branding. My colors and type replace its look completely.

### What I like about it

**The whole site is one bento / masonry wall.**
- The homepage is a dense, full-bleed **masonry grid of cards**: about 6 columns on wide desktop, with tight gutters (~8–10px) and small outer margins.
- Cards come in varied heights and aspect ratios (portrait, landscape, square), so the wall feels collected and alive, not templated.
- Work is the hero. There's no big marketing hero section; the grid *is* the first thing you see.

**Profile card anchors the top-left.**
- First column, first card: avatar, name, title @ company, a short value statement (no "Experiments" section), a LinkedIn icon (linkedin.com/in/cbaylor), and an email pill button (baylorchanc@gmail.com).
- After you scroll, a small **sticky name pill** (avatar + name + ↑ back-to-top) stays pinned top-left.

**Widget cards mixed in with the work.** These make it feel personal and "designed," not like a gallery:
- **"Currently at"** card: company, role, years, and a logo badge
- **Clients / brands** strip: a row of small circular logos with a year range (e.g. "2014–2026")
- **Location** card: city, "formerly …", and a **live local time**, on a subtle dotted-map texture
- **To-Do list** card: a checklist where some items are struck through (a playful status widget)
- **Product / CTA** card: a screenshot, a one-line description, and a full-width pill button
- **Photo-stack** card: 3–4 slightly rotated, overlapping photos with a title and a count in the corner (e.g. "11")
- **Image carousel** card: a large card with prev/next arrows, a caption pill bottom-left, and dot pagination bottom-right

**Lightbox / detail view.**
- Clicking any card opens a **full-screen overlay**: the grid stays behind it, **heavily blurred and darkened**.
- The project title and subtitle sit top-left (e.g. "Project Name / Landing page design"), with a circular **✕** close button top-right.
- **‹ ›** circular arrow buttons sit at the left and right edges to step through projects without closing.
- The content is a centered, rounded-corner frame that **scrolls vertically inside the overlay**, so long full-page designs can be viewed top to bottom.
- Esc closes it, and the arrow keys navigate.

**Card styling.**
- Rounded corners (~12–16px) and no borders; cards separate from the background by tone alone.
- Image cards are edge-to-edge media. Text and widget cards use the dark card color with small type.
- A subtle hover: slight scale (1.01–1.02) or brightness lift, with a pointer cursor.

### How my version should differ (UX / Product focus)
Dann's site leans toward visual shots. I'm going for **product design** roles, so:
- **Case studies are first-class.** 3–4 featured case-study cards should be larger (span 2 columns or extra height), sit near the top of the grid, and carry a title, my role, and a one-line outcome.
- Clicking a case study opens a **case-study page or long-form lightbox**: problem → my role → process → solution → impact/results. Smaller visual pieces can keep the simple image lightbox.
- Include an **About / Resume** card with a link to my resume PDF.
- Keep it scannable and fast: a hiring manager should be able to spot "best work" in seconds.

---

## 3. Brand: Colors

Use **only** these colors (plus transparent or opacity variants of them). Define them as CSS variables / Tailwind tokens.

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#000000` | Page background |
| `--card` | `#0C0C0C` | Card / surface background |
| `--accent` | `#F48622` | Highlights, links, active states, key CTAs, small details |
| `--text` | `#E8DCD6` | Primary text ("white") |
| `--text-muted` | `#E8DCD6` at ~60% opacity | Secondary text, captions, meta |
| `--line` | `#E8DCD6` at ~8–10% opacity | Dividers and hairlines, only if needed |

Rules:
- It's a **dark theme only**. No light mode.
- Use the accent **sparingly**: one or two orange moments per viewport (a CTA, a checkmark, a link hover, the live-time dot). It should feel like a signal, not a fill color.
- Never use pure `#FFFFFF`. "White" is always `#E8DCD6`.
- Lightbox backdrop: `#000000` at ~70% opacity plus a strong backdrop blur.

---

## 4. Brand: Typography

**Typeface: Satoshi** (by Indian Type Foundry, via Fontshare; free under the ITF Free Font License).
- Self-host the `.woff2` files from my attached `Satoshi_Complete` folder (`Fonts/WEB/fonts/`). Prefer **`Satoshi-Variable.woff2`** (+ `Satoshi-VariableItalic.woff2`) for one file covering weights 300–900, and load it with `next/font/local`.
- Use one family across the site. Create hierarchy with weight and size, not a second font.

Starting scale (adjust once the layout is in place):

| Role | Weight | Size (desktop) | Notes |
|---|---|---|---|
| Display / name | 700 | 20–24px in profile card; 48–64px on case-study headers | Tight tracking (-0.02em) |
| Card title | 500–700 | 14–16px | |
| Body | 400 | 14–16px | Line-height 1.5 |
| Meta / caption | 400–500 | 11–12px | Muted color |

Dann's site uses small, quiet UI text so the work stays loud. Keep that.

---

## 5. Layout & Responsiveness

- Masonry columns: **6** at ≥1600px · **5** at ≥1280px · **4** at ≥1024px · **3** at ≥768px · **2** at ≥480px · **1** on small phones
- Gutters ~8–10px; outer page padding ~10–16px
- Profile card is always first. On mobile it becomes the top block, and the sticky name pill still appears on scroll.
- Lightbox on mobile: full-screen, swipe left/right to navigate, ✕ stays reachable top-right.
- Images: use `next/image` with lazy loading and blur placeholders, since the grid will be image-heavy.

---

## 6. Interaction & Motion

- Card hover: subtle scale / brightness, 150–200ms ease-out
- Lightbox: fade plus a slight scale-up on open (~200ms), with the backdrop blur animating in
- Live local time on the location card, updating every minute
- Respect `prefers-reduced-motion` (turn off scale and animation)
- Nothing flashy. Motion should feel calm and precise.

---

## 7. Accessibility

- Every card is a real `<button>` or `<a>` with a descriptive label; full keyboard navigation
- Lightbox: trap focus, close on Esc, return focus to the card that opened it, ← → to navigate
- Meaningful `alt` text on all images (I'll supply it with my content)
- Check that text meets contrast on both `#000000` and `#0C0C0C`

---

## 8. Placeholder content (layout phase only)

Use these card slots so I can judge the layout. Use gray image blocks and "Project Title / Role · Outcome" text:
1. Profile card (Chanc Baylor, **Senior Product Designer @ ServiceNow**, value statement, LinkedIn, **orange email pill**: email and "View resume" are the two orange CTAs)
2. **2** large featured case-study cards to start (a 3rd will be added later, so the row must hold 3)
3. "Currently at" card
4. Clients / brands logo strip (placeholder circles)
5. Location + live time card: **Baltimore, Maryland**
6. ~~To-Do card~~: removed, don't include
7. Resume / About CTA card
8. 1 photo-stack card and 1 carousel card
9. 12–20 smaller visual-work cards of mixed aspect ratios

---

## 9. Don'ts

- No em dashes (—) in any copy, except in date ranges

- No Dann Petty content, images, logos or copy
- No light mode, extra colors, gradients or extra fonts
- No generic portfolio hero ("Hi, I'm…" with a big headline). The grid is the hero.
- No invented clients, metrics or project names
- Don't over-animate
