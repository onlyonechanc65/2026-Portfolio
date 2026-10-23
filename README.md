# chancbaylor.com

Chanc Baylor's portfolio. Next.js (App Router) + Tailwind, deployed on Vercel from `main`.

## Run locally

```bash
npm install
npm run dev
```

## Where things live

- `lib/content.ts`: all copy and content. Anything in `[square brackets]` is a placeholder.
- `public/work/`: put images here, then reference them in `lib/content.ts` as `{ src, alt, width, height }`.
- `components/`: the grid (`Portfolio.tsx`), lightbox (`Lightbox.tsx`) and case-study layout (`CaseStudyArticle.tsx`).
- `CLAUDE.md`: the design brief. `design/mockup/Main.dc.html`: the approved layout.

Each case study has its own shareable URL at `/work/<slug>`, which opens the grid with that case study in the lightbox.
