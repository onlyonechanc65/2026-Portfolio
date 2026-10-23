/**
 * All site content lives here. Swap placeholders for real content as it arrives.
 * Anything in [square brackets] is a placeholder.
 *
 * Images: put files in /public/work/... and set `image: { src, alt, width, height }`.
 * When `image` is missing, a gray placeholder block is shown instead.
 */

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Tiny base64 image for the blur-up placeholder (generated when images are added) */
  blurDataURL?: string;
};

import { partnerPortal, imageBuilder } from "./case-studies";
import { projects } from "./projects";

/** The four kinds of story beats the case studies call out */
export type CalloutKind = "Wrong turn" | "Research that changed direction" | "Tradeoff" | "Stakeholder feedback";

export type Figure = {
  /** "stack": full width, one under another. "pair"/"trio": side by side (stacks on phones). */
  layout: "stack" | "pair" | "trio";
  items: { img: Img; label?: string }[];
  caption: string;
  /** Narrow the figure, e.g. for phone screens */
  maxWidth?: number;
};

export type Block =
  | { p: string }
  | { h: string }
  | { list: string[] }
  | { callout: CalloutKind; title: string; text: string }
  | { figure: Figure }
  | { table: { head: string[]; rows: string[][] } }
  | { quote: { text: string; name: string; title: string } };

export type CaseStudy = {
  slug: string;
  num: string;
  title: string;
  role: string;
  outcome: string;
  product: string;
  summary: string;
  hero?: Img;
  /** Animated thumbnail shown on the card and at the top of the case study */
  preview?: "portal" | "builder";
  meta: { label: string; value: string }[];
  sections: { title: string; blocks: Block[]; placeholderImage?: boolean }[];
  impact: { metric: string; label: string }[];
};

export type VisualWork = {
  id: string;
  title: string;
  type: string;
  /** Shows title/type under the image on the wall */
  captioned: boolean;
  /** Placeholder height in px, used only when there is no image */
  placeholderHeight: number;
  image?: Img;
  /** Full-length images shown inside the lightbox, top to bottom */
  detail?: Img[];
  /** One-line result shown on the wall card */
  result?: string;
  /** Short write-up shown above the images in the lightbox */
  summary?: { about: string; did: string; results: string[] };
  /** Animated before/after on the wall card; both shown side by side in the lightbox */
  compare?: { before: Img; after: Img };
};

export const profile = {
  name: "Chanc Baylor",
  title: "Senior Product Designer",
  company: "ServiceNow",
  photo: undefined as Img | undefined,
  intro:
    "I design the hard parts of enterprise products: onboarding, permissions and data-heavy workflows. 8+ years turning research and analytics into measurable wins across SaaS, fintech, healthcare and e-commerce for ServiceNow, T. Rowe Price, PointClickCare, Under Armour & more.",
  closing:
    "Research-led, from usability testing and behavioral analytics to design systems and high-fidelity prototypes.",
  linkedin: "https://www.linkedin.com/in/cbaylor",
  email: "baylorchanc@gmail.com",
};

export const currentRole = {
  company: "ServiceNow",
  role: "Senior UX Designer",
  years: "2024 – Present",
  logo: undefined as Img | undefined,
};

export const clients = {
  range: "2018 – 2026",
  /** Add { name, logo } entries. Placeholder circles show until then. */
  items: Array.from({ length: 7 }, (_, i) => ({
    name: `[Client ${i + 1}]`,
    logo: undefined as Img | undefined,
  })),
};

export const location = {
  city: "Baltimore, Maryland",
  timeZone: "America/New_York",
};

export const about = {
  title: "About & Resume",
  line: "[One line on what you want next, e.g. the kind of team or problem you want to work on.]",
  /** Put the PDF at /public/resume.pdf and set this to "/resume.pdf" */
  resumeUrl: null as string | null,
};

export const photoStack = {
  id: "photo-set",
  title: "[Photo set title]",
  count: "[#]",
  type: "[Photo set]",
  photos: [] as Img[],
};

export const carousel = {
  id: "carousel",
  title: "[Carousel project]",
  type: "[Project type]",
  slides: Array.from({ length: 4 }, (_, i) => ({
    caption: `[Slide caption ${i + 1}]`,
    image: undefined as Img | undefined,
  })),
};

const placeholderCase = (num: string): CaseStudy => ({
  slug: `case-study-${num}`,
  num,
  title: "[Case study title]",
  role: "[Your role]",
  outcome: "[One-line outcome]",
  product: "[Product]",
  summary: "[One-paragraph summary: the product, who it serves, and the outcome.]",
  meta: [
    { label: "Role", value: "[Your role]" },
    { label: "Team", value: "[Team / partners]" },
    { label: "Timeline", value: "[Timeline]" },
    { label: "Tools", value: "[Tools]" },
  ],
  sections: [
    { title: "Problem", blocks: [{ p: "[What was broken, for whom, and why it mattered to the business.]" }] },
    { title: "My role", blocks: [{ p: "[What you owned, who you worked with, and the decisions that were yours.]" }] },
    {
      title: "Process",
      blocks: [{ p: "[Research, synthesis, journey mapping, iterations: the moments that changed direction.]" }],
      placeholderImage: true,
    },
    { title: "Solution", blocks: [{ p: "[The shipped design and the key decisions behind it.]" }], placeholderImage: true },
    { title: "Impact", blocks: [{ p: "[Results after launch, and what you would do next.]" }] },
  ],
  impact: [
    { metric: "[Metric]", label: "[What it measured]" },
    { metric: "[Metric]", label: "[What it measured]" },
    { metric: "[Metric]", label: "[What it measured]" },
  ],
});

/** Featured row holds up to 3. Add the 3rd here when it's ready, e.g. placeholderCase("03"). */
export const caseStudies: CaseStudy[] = [partnerPortal, imageBuilder];
void placeholderCase;

/* Gray placeholder tiles that hold space until more projects arrive. Delete one per real project added. */
const heights = [220, 340, 260, 180, 300, 240, 380, 200, 280, 320];
const captioned = [true, false, true, false, false, true, false, true, false, true];
const placeholders: VisualWork[] = heights.map((h, i) => ({
  id: `work-${String(i + 1).padStart(2, "0")}`,
  title: `[Project title ${i + 1}]`,
  type: "[Project type]",
  captioned: captioned[i],
  placeholderHeight: h,
}));

/* Real projects first (they fill the top row of the wall), then placeholders. */
export const visualWork: VisualWork[] = [...projects, ...placeholders];
