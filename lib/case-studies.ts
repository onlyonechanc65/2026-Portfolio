import type { CaseStudy, Img } from "./content";
import { IMG } from "./images.generated";

const img = (key: keyof typeof IMG, alt: string): Img => ({ ...IMG[key], alt });

/* =====================================================================
   CASE STUDY 01 · Partner Portal
   ===================================================================== */
export const partnerPortal: CaseStudy = {
  slug: "partner-portal",
  num: "01",
  title: "Partner portal homepage redesign",
  role: "Product designer",
  outcome: "Top tasks cut from three clicks to one",
  product: "ServiceNow Partner Portal",
  preview: "portal",
  hero: img(
    "partner-portal/hero",
    "The redesigned Partner Portal homepage: a single navigation above a hero headed The home of your ServiceNow partnership."
  ),
  summary:
    "I rebuilt the information architecture and homepage of the ServiceNow Partner Portal, cutting the portal's highest-traffic tasks from three clicks to one for 2,700 partners.",
  meta: [
    { label: "Role", value: "Product designer, IA and homepage" },
    { label: "Team", value: "UX research, engineering, creative, partner engagement" },
    { label: "Timeline", value: "5 months, shipped Sept 25, 2026" },
    { label: "Tools", value: "Figma, HTML/CSS, ContentSquare" },
  ],
  sections: [
    {
      title: "Problem",
      blocks: [
        {
          p: "Partners came to get things done, and the portal was built for browsing. In testing, partners completed only 37% of core tasks against a ~78% industry benchmark. All ten of the most-visited pages sat three levels deep.",
        },
        {
          p: "57% of visits were transactional, and 80 of 100 tracked sessions opened with a click on a task. Yet the homepage led with promotional cards, and deal registration sat below the fold.",
        },
        {
          callout: "Research that changed direction",
          title: "The average hid two different problems",
          text: "The tree test averaged 37%, but the distribution mattered more. Transactional tasks reached through the partner nav scored 65–100%; content tasks scored 0–20%. That split the work in two: navigations competing for the same tasks, and content sections with no visible boundary between them.",
        },
        {
          figure: {
            layout: "stack",
            items: [
              {
                img: img(
                  "partner-portal/nav-before",
                  "Before: the universal ServiceNow navigation (MyNow, Products, Industries, Learning, Support, Partners, Company) stacked above the partner navigation (Programs, Readiness, Events, Marketing, Resources, Admin, Get Help)."
                ),
                label: "Before",
              },
              {
                img: img(
                  "partner-portal/nav-after",
                  "After: one navigation with Home, My Partnership, Register, Resources and Grow."
                ),
                label: "After",
              },
            ],
            caption:
              "Two navigations with overlapping labels. Tasks that required choosing between them scored 5–55% in testing. One navigation now owns every task.",
          },
        },
      ],
    },
    {
      title: "Solution",
      blocks: [
        { h: "A queue, not a billboard" },
        {
          p: "An action center puts the four highest-volume tasks one click from entry. An open-items list surfaces what each partner actually owes: timecards, deal registration requests, expiring credentials and attestations.",
        },
        {
          p: "The hero stayed, because GPC needs a place to launch new pages like AI Control Tower. I argued it down from a rotating carousel to three static cards: a rotator promotes one page and buries two.",
        },
        {
          figure: {
            layout: "pair",
            items: [
              {
                img: img(
                  "partner-portal/before",
                  "The old Partner Portal homepage: two navigations, promotional banners, a recommended-learning panel and empty deal and deployment registration panels far down the page."
                ),
                label: "Before",
              },
              {
                img: img(
                  "partner-portal/after",
                  "The shipped homepage: one navigation, a hero with a Visit action center link, three static What's new cards, the action center, an open-items list and a credentials module."
                ),
                label: "After",
              },
            ],
            caption:
              "Before: promotions first, tasks buried. After: one navigation, three static cards and an action center with the four top tasks, followed by each partner's open items.",
          },
        },
        {
          callout: "Stakeholder feedback",
          title: "I pushed a task-first homepage. The business chose discovery.",
          text: "I designed a second direction that followed the research to its end: no hero, four task buttons right under the nav, then open items, credentials, and What's new at the bottom. The data backed it, since 80 of 100 sessions opened with a task. Stakeholders chose the hero-led version, and their reasoning was sound. GPC uses the portal to drive awareness, and pages like AI Control Tower have no other route to 2,700 partners.",
        },
        {
          figure: {
            layout: "pair",
            items: [
              {
                img: img(
                  "partner-portal/after",
                  "The shipped, hero-led homepage."
                ),
                label: "Shipped",
              },
              {
                img: img(
                  "partner-portal/task-first",
                  "The task-first alternative: a welcome line, four task buttons and open items at the top, with credentials and What's new below and no hero."
                ),
                label: "Task-first alternative",
              },
            ],
            caption:
              "The alternative I argued for, with every task above the fold and no hero, beside the version that shipped.",
          },
        },
        {
          callout: "Tradeoff",
          title: "Reconciling the two instead of conceding",
          text: "The shipped hero carries a Visit action center link that jumps straight to the tasks, so the hero costs a partner a click, not a hunt. The task layer sits just below the fold rather than below What's new, so the scroll is short and predictable. I'd still revisit collapsing the hero to a slim band for returning partners within a session.",
        },
        {
          figure: {
            layout: "pair",
            items: [
              {
                img: img(
                  "partner-portal/mobile-top",
                  "Mobile homepage, top: the hero with Visit ServiceNow University and Visit action center links, then What's new."
                ),
                label: "Mobile, top",
              },
              {
                img: img(
                  "partner-portal/mobile-tasks",
                  "Mobile homepage, further down: the action center's four task buttons, the open-items list and the credentials module."
                ),
                label: "Mobile, tasks",
              },
            ],
            caption:
              "Mobile. The hero's action center link, the four tasks and the open-items list carry over to a single column.",
            maxWidth: 520,
          },
        },
      ],
    },
    {
      title: "My role",
      blocks: [
        {
          p: "I owned the IA proposal and the end-to-end homepage design across desktop, tablet and mobile. I worked with a staff UX researcher, an engineer, our creative director and the director of partner engagement, and presented the work to 30 stakeholders across 13 teams.",
        },
      ],
    },
    {
      title: "Process",
      blocks: [
        { h: "One navigation instead of two" },
        {
          p: "Labels like Learning, Products and Resources appeared in both the universal ServiceNow nav and the partner nav. Relabeling can't fix that, because the labels will always compete. I proposed reducing the universal nav to a utility strip inside the authenticated portal.",
        },
        { h: "Seven sections to four, three content doors to one" },
        {
          p: "Programs alone carried 40,890 sessions across ten unrelated tasks, from deal registration to incentives. Readiness, Resources and Products all promised content with no boundary between them. I restructured around partner intent instead of internal program structure: My Partnership, Register, Resources and Grow. Resources absorbed all three content surfaces into one filtered destination.",
        },
        {
          callout: "Tradeoff",
          title: "No training section, even though training ranked #1",
          text: "Training was partners' top priority at 47%, but 20% of sessions already exited to ServiceNow University. A training nav item would have rebuilt the exact label collision I was removing. Instead I designed a credentials module that shows team certification progress and hands off to University, serving the 36% of partners who manage org-wide compliance.",
        },
        {
          callout: "Wrong turn",
          title: "I inferred the vocabulary instead of testing it",
          text: "I locked section names without a card sort. The tree test (n=20) was ample to show that content tasks fail and transactional ones succeed, but not to rank individual labels. I validated the structure and inferred the words, and words are exactly what a card sort tests. Next time, I'd run one before naming anything.",
        },
      ],
    },
    {
      title: "Impact",
      blocks: [
        {
          p: "The redesign went live September 25 across desktop, tablet and mobile. Timecards and deal registration, the two pages carrying 10,500 sessions a quarter, dropped from three clicks to one.",
        },
        {
          table: {
            head: ["Structural change", "Before", "After"],
            rows: [
              ["Navigations competing for the same tasks", "2", "1"],
              ["Top-level sections", "7", "4 + Home"],
              ["Separate content surfaces", "3", "1"],
              ["Clicks to log a timecard (7,483 sessions/qtr)", "3", "1"],
              ["Clicks to register a deal (3,025 sessions/qtr)", "3", "1"],
              ["Top-traffic tasks at level 3 or deeper", "10 of 10", "0 of top 4"],
              ["Breakpoints designed", "None", "3"],
            ],
          },
        },
        { h: "Targets under measurement" },
        {
          p: "Analytics are still accruing. Our researcher and I set the measurement plan before launch, so these are targets, not results yet:",
        },
        {
          list: [
            "Tree-test task success: from the 37% baseline toward the ~78% industry benchmark",
            "PSAT ease of findability: toward GPC's 67% target",
            "Search as first click: down from 11% as navigation starts carrying the load",
          ],
        },
      ],
    },
  ],
  impact: [
    { metric: "3 → 1", label: "Clicks for timecards and deal registration, 10,500 sessions a quarter" },
    { metric: "7 → 4", label: "Top-level sections, organized around partner intent" },
    { metric: "2,700", label: "Partners on the shipped redesign" },
    { metric: "30", label: "Stakeholders across 13 teams aligned on the work" },
  ],
};

/* =====================================================================
   CASE STUDY 02 · Partner Comms Image Builder
   ===================================================================== */
export const imageBuilder: CaseStudy = {
  slug: "partner-comms-image-builder",
  num: "02",
  title: "Partner Comms Image Builder",
  role: "Sole designer, built with Claude",
  outcome: "Thumbnail requests down about 90%",
  product: "Self-serve image tool",
  preview: "builder",
  hero: img(
    "image-builder/tool",
    "The Partner Comms Image Builder: a content panel with mode tabs, logo, title color, title and subtitle fields beside a live 1920 by 1080 preview."
  ),
  summary:
    "A self-serve image tool that cut thumbnail design requests by about 90% and turned a 25-minute Photoshop task into a 3-minute one.",
  meta: [
    { label: "Role", value: "Sole designer and builder" },
    { label: "Team", value: "Six reviewers: creative, program management, UX, copy" },
    { label: "Timeline", value: "April–May 2026, 19 versions, launched in June" },
    { label: "Tools", value: "HTML, CSS, JavaScript, html2canvas, Claude" },
  ],
  sections: [
    {
      title: "Problem",
      blocks: [
        {
          p: "Our team handles around 200 thumbnail requests a year, each with 3–10 assets, and each thumbnail took 20–30 minutes in Photoshop. When our AI launch compressed timelines, the queue backed up across email, comms, events and social.",
        },
        {
          p: "People didn't wait. They made their own images, and those images drifted off brand. The real problem wasn't that design was slow. It was that the only fast path was the off-brand one, so my goal was to make the on-brand path the fastest.",
        },
      ],
    },
    {
      title: "Solution",
      blocks: [
        { h: "What people make with it" },
        {
          figure: {
            layout: "pair",
            items: [
              {
                img: img(
                  "image-builder/out-social-workshop",
                  "Social post: green headline Hands-on implementation readiness over a dark navy gradient, with a fuzzy blue and purple 3D sparkle."
                ),
                label: "Social",
              },
              {
                img: img(
                  "image-builder/out-social-ai-control-tower",
                  "Social post: centered headline Ready for the AI Control Tower opportunity? above a glass 3D sparkle and floating panels."
                ),
                label: "Social",
              },
            ],
            caption: "Social posts from the tool's stacked portrait layout, with a 3D icon anchoring the bottom.",
            maxWidth: 760,
          },
        },
        {
          figure: {
            layout: "trio",
            items: [
              { img: img("image-builder/out-shifting-opportunity", "Standard header: The shifting opportunity, beside glass purple sparkles.") },
              { img: img("image-builder/out-partner-advantage", "Standard header: AI is the partner advantage, beside an iridescent star and a glass cursor.") },
              { img: img("image-builder/out-profit", "Standard header: Profit beyond implementation, beside a glass gauge with a lightning bolt.") },
              { img: img("image-builder/out-expertise", "Standard header: Stand out with expertise and IP, beside fuzzy blue and purple sparkles.") },
              { img: img("image-builder/out-focus", "Standard header: Focus drives growth, beside a glass purple arrow and green sparkles.") },
              { img: img("image-builder/out-architect", "Standard header: From implementor to architect, beside a glass cube, spheres and a green sparkle.") },
            ],
            caption:
              "Standard headers for a partner program series. Same locked type scale and two-color headline every time; the words, 3D art and layout side are what change.",
          },
        },
        { h: "Guardrails over a blank canvas" },
        {
          p: "The people using this tool aren't designers, and every open-ended option is a chance to go off brand. So I took options away:",
        },
        {
          list: [
            "Locked type: sizes follow the brand's 1:2:4 scale. People control the words and the title color, not the sizes.",
            "Curated assets: nine backgrounds and a curated set of 3D icons, with no brand-element uploads.",
            "A simpler logo control: every background is dark, so a Light/Dark logo toggle only offered a wrong answer. It became On/Off.",
            "Copy capped by rendered rows, not characters: 30 wide letters fill more space than 30 narrow ones. Titles get two rows and subtitles three, and the preview enforces it, so overlapping text can't reach an export.",
          ],
        },
        {
          figure: {
            layout: "pair",
            items: [
              {
                img: img(
                  "image-builder/standard-text",
                  "Text-only Standard thumbnail: the ServiceNow logo and a centered green headline, Accelerate partner success, over a dark green gradient."
                ),
                label: "Text only",
              },
              {
                img: img(
                  "image-builder/standard-icon",
                  "3D icon Standard thumbnail: a left-aligned headline beside a 3D globe icon."
                ),
                label: "3D icon",
              },
            ],
            caption: "Two of the three content modes. The type scale, logo and margins stay locked; people choose the words, color and art.",
          },
        },
        {
          callout: "Tradeoff",
          title: "Less freedom, given back through single controls",
          text: "Guardrails make the tool harder to misuse, but they take options away. Each time the six reviewers asked for flexibility, I answered with one bounded control instead of a set of free inputs.",
        },
        { h: "Flexibility through one control, not many" },
        {
          p: "A text-scale slider from 100% to 175% moves the headline and subhead together, so the brand ratio holds at every setting. When larger type pushes the subhead toward the 3D icon, the text reflows beside it; the icon is the brand anchor, so it stays put. For photos, one horizontal focal-point slider replaced a crop tool, which would have handed everyone a way to make a bad crop.",
        },
        { h: "Formats named by shape, built from one canvas" },
        {
          p: "Standard and 16:9 render from one 1920×1080 canvas, so they always match. Social gets its own stacked layout, because cropping a landscape design into portrait would cut most of the composition. In every format, the preview is exactly what exports.",
        },
        {
          callout: "Tradeoff",
          title: "Retiring a one-off banner",
          text: "I cut a 1000×375 banner format. It needed special-case logic that hid the logo and footer controls, and it made the whole tool less predictable for everyone else.",
        },
        {
          figure: {
            layout: "stack",
            items: [
              {
                img: img(
                  "image-builder/tool",
                  "The full tool: content panel on the left, format toggle and live preview on the right."
                ),
              },
            ],
            caption:
              "The shipped tool is a single HTML file with fonts, icons and libraries embedded, so it runs from SharePoint with nothing to install. Three content modes, three formats, JPG export.",
          },
        },
      ],
    },
    {
      title: "My role",
      blocks: [
        {
          p: "I was the sole designer and builder: request audit, information architecture, interaction and visual design, front-end build and rollout. Claude handled implementation under my direction. Six reviewers across creative direction, program management, UX and copy reviewed the build.",
        },
      ],
    },
    {
      title: "Process",
      blocks: [
        {
          callout: "Research that changed direction",
          title: "Past requests set the scope",
          text: "Before designing anything, I audited our past thumbnail requests. The same asks kept repeating: a headline and supporting line, event dates and times, regional visuals, and a handful of sizes for email, event pages, the partner portal and social. If a request type repeated, the tool had to handle it. If it was rare, it stayed a design request.",
        },
        {
          callout: "Wrong turn",
          title: "Uploads were the biggest brand risk",
          text: "Early versions let people upload their own logos and backgrounds. In practice, uploads were exactly where images went off brand, so I removed both.",
        },
        {
          callout: "Wrong turn",
          title: "Naming formats by size, then by destination",
          text: "I first labeled formats by pixel size, then by destination: Arc Card, Swoogo. Destinations multiplied and overlapped. The same 16:9 image serves Swoogo event pages and partner portal thumbnails, so a destination label sent people looking for an option that was already there. I settled on labels that describe the output: Standard, 16:9 and Social.",
        },
        {
          callout: "Stakeholder feedback",
          title: "Six reviewers, three features",
          text: "Our copywriter helped replace character limits with rendered-row caps. Program managers asked for type-led social layouts, which became the text-scale slider. Our creative director wanted uploaded photos to sit well in frame, which became the focal-point slider.",
        },
      ],
    },
    {
      title: "Impact",
      blocks: [
        {
          list: [
            "Adoption: 133 of the 737 people it was rolled out to have made at least one image, 267 images between June and October.",
            "Speed: a thumbnail now takes 2–5 minutes instead of 20–30.",
            "Requests: at our usual 200 a year, I'd expect about 67 thumbnail requests in four months. We received 7, all special requests.",
            "Time saved: at 15–28 minutes per image, the 267 images add up to roughly 65–125 hours since launch.",
          ],
        },
        {
          quote: {
            text: "OMG I love this! It shows how designers can actually CREATE useful tools for everyone to use without the lengthy dev times.",
            name: "Aileen Aguilar",
            title: "Senior UX Designer, ServiceNow",
          },
        },
        {
          quote: {
            text: "I love that it empowers the team to create within the brand guidelines and still allows our design preferences to kick in where we want to tweak it.",
            name: "Renee Chu",
            title: "Senior Specialist, ServiceNow",
          },
        },
        { h: "What it taught me" },
        {
          p: "The decisions that mattered most were about what to take away. Every option I removed made the tool faster to use and harder to misuse. The options I did add came from real requests, so each one earned its place.",
        },
      ],
    },
  ],
  impact: [
    { metric: "~90%", label: "Fewer thumbnail requests: 7 received vs. about 67 expected in four months" },
    { metric: "2–5 min", label: "Per thumbnail, down from 20–30 minutes in Photoshop" },
    { metric: "267", label: "Images made by 133 people since June" },
    { metric: "65–125 hrs", label: "Design time saved since launch" },
  ],
};
