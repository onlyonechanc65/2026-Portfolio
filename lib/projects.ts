import type { Img, VisualWork } from "./content";
import { IMG } from "./images.generated";

const img = (key: keyof typeof IMG, alt: string): Img => ({ ...IMG[key], alt });

/* Visual-work projects on the wall, in the order they should appear. */
export const projects: VisualWork[] = [
  {
    id: "armis-launch",
    title: "Interaction design and landing page for Armis launch",
    type: "Interaction design · Landing page",
    captioned: true,
    placeholderHeight: 0,
    result: "21,080 partners reached at launch; 78.5% went deeper",
    video: {
      src: "/work/armis/armis.mp4",
      poster: img(
        "armis/poster",
        "Armis launch page cards for the First Call Deck, Training and FAQ, with hover states on each link."
      ),
    },
    image: img(
      "armis/landing",
      "The Armis from ServiceNow partner landing page: an intro with a Read press release button, cards for the Armis First Call Deck and Training, and a Frequently asked questions section with a Read FAQ button."
    ),
    summary: {
      about:
        "A partner landing page for the launch of Armis from ServiceNow, giving partners one place for the press release, the first call deck, training and the FAQ, with hover interactions that make each next step obvious.",
      results: [
        "21,080 unique partners reached in the launch month",
        "78.5% of sessions continued deeper into the portal and FAQ",
      ],
    },
  },
  {
    id: "linkedin-partner-content",
    title: "LinkedIn partner content and performance analysis",
    type: "Social design · Performance analysis",
    captioned: true,
    placeholderHeight: 0,
    result: "Carousels averaged 39.3% engagement vs 6.8% for image posts",
    image: img(
      "linkedin-partner/thumb",
      "LinkedIn post headlined Every CRM event in one place, listing CRM Partner Day Sweden, CRM Future Series and CRM AI Academy Sprint above a grid of event photos."
    ),
    summary: {
      about:
        "LinkedIn posts for the ServiceNow partner channel in Q2 and Q3 2026, promoting webinar series, events, industry learning journeys, partner awards and customer stories. I designed the visuals, and Nikki Kratounis wrote the copy.",
      did: "I also analyzed the channel's 104 organic posts and 19 paid ads (about $11K in spend) side by side to find which formats, copy patterns and topics drove clicks and engagement. With only 5 carousels and 19 ads in the set, the format findings are directional.",
      results: [
        "Carousels averaged 39.3% engagement, vs 6.8% for image posts and 5.2% for video",
        "Posts without a link averaged 14.2% engagement, vs 7.7% with one",
        "Whiteboard 2.0, the strongest paid ad at scale: 4,071 clicks on $1,000",
        "A boosted event post cost $24.39 per click and did worse than its organic version",
      ],
    },
    detail: [
      img(
        "linkedin-partner/ai-carousel",
        "Three portrait posts from one carousel: Three ways to build AI momentum this quarter, The Unified AI Platform for Autonomous Security, and Autonomous IT webinar series, each on a dark gradient with glass panels and 3D sparkle shapes."
      ),
      img(
        "linkedin-partner/events-security",
        "Two portrait posts: Choose Your Autonomous Security Journey, with two team photos, and Every CRM event in one place, with a grid of keynote and audience photos."
      ),
      img(
        "linkedin-partner/link-posts",
        "Four landscape link posts: Generic pitches don't win transformational deals, Industry fluency: What customers decide on, Showcase your customer success with nomination dates, and AWS and ServiceNow transform experiences."
      ),
    ],
  },
  {
    id: "t-rowe-price-headers",
    title: "T.Rowe Header Design",
    type: "Campaign headers · Co-branding",
    captioned: true,
    placeholderHeight: 0,
    result: "$1.64M in new AUM from 40+ campaigns in one year",
    image: img(
      "t-rowe-price/headers",
      "Nine co-branded T. Rowe Price campaign headers with partner companies including CarMax, M&T Bank, Syngenta and Experian, each with its own imagery and headline."
    ),
    summary: {
      about:
        "Co-branded campaign headers pairing T. Rowe Price with partner companies, from a body of 40+ multimedia marketing campaigns I designed and launched with Figma.",
      results: [
        "$1.64M in new assets under management within one year",
        "78% audience capture rate",
        "40+ multimedia campaigns designed and launched",
      ],
    },
  },
  {
    id: "aerotek",
    title: "Aerotek social campaign",
    type: "Social ads · Brand system",
    captioned: true,
    placeholderHeight: 0,
    result: "Cost per action cut from $11 to $4.50",
    image: img(
      "aerotek/01",
      "Six Aerotek recruiting ads with navy photo overlays, orange accents and white outline frames, with headlines like Advance your career your way and Now hiring."
    ),
    summary: {
      about:
        "Monthly Facebook, LinkedIn and Google ad campaigns for Aerotek, a staffing firm hiring across manufacturing, logistics and construction. Branding varied from platform to platform, and there was no content strategy to learn from.",
      did: "I set a visual system (navy overlays on photos, orange accents, and outline frames that make full-color photos pop) and built carousel and video templates for monthly A/B testing by audience.",
      results: [
        "Cost per action cut from $11 to $4.50",
        "Engagement up 10% across Facebook, LinkedIn and Google Ads",
      ],
    },
    detail: [
      img(
        "aerotek/02",
        "Aerotek brand consistency challenge, solution and result beside six on-brand recruiting ads."
      ),
      img(
        "aerotek/03",
        "Aerotek content strategy: a December market trends carousel with job and unemployment stats, and a three-part series on maintenance jobs in demand."
      ),
    ],
  },
  {
    id: "cyberpunk-promo",
    title: "Cyberpunk promo",
    type: "Photo manipulation",
    captioned: true,
    placeholderHeight: 0,
    compare: {
      before: img("cyberpunk-promo/before", "Before: the original portrait of a woman resting her hand on her cheek."),
      after: img(
        "cyberpunk-promo/after",
        "After: the same portrait turned cyberpunk, with glowing orange eyes, cybernetic face panels, a barcode and a vertical orange banner of Japanese text."
      ),
    },
  },
  {
    id: "colby-solar",
    title: "Colby Solar",
    type: "Brand identity",
    captioned: true,
    placeholderHeight: 0,
    result: "Residential launch sold $230K in its first 30 days",
    image: img(
      "colby-solar/01",
      "Colby Solar business cards and a wall-mounted sign with the purple house-and-sun logo."
    ),
    summary: {
      about:
        "A brand identity for Colby Solar as it expanded from commercial into residential solar, on a $4,000 budget and a one-month deadline. The client wanted purple instead of the usual green or blue of energy brands.",
      did: "I designed a mark that reads three ways: solar panels, the C in Colby rotated into a house, and a rising sun that doubles as the o. It works in three shades of purple and in black and white, across signage, vehicles, apparel and print.",
      results: [
        "The residential launch sold $230,000 in its first 30 days",
        "One identity carried across the website, marketing materials and signage",
      ],
    },
    detail: [
      img("colby-solar/02", "Colby Solar logo analysis: solar panels, a C rotated into a house, and a rising sun, shown on two purple backgrounds and in black and white."),
      img("colby-solar/03", "A purple Colby Solar van wrap with the logo and a Need a quote? call to action."),
      img("colby-solar/04", "Colby Solar logo on a purple T-shirt and a glossy purple mailer bag."),
    ],
  },
  {
    id: "who-can-i-run-to",
    title: "Who Can I Run To?",
    type: "Movie poster",
    captioned: false,
    placeholderHeight: 0,
    compare: {
      before: img(
        "who-can-i-run-to/before",
        "Before: an orange poster with a small running silhouette above warped dark red type reading Who can I run to?"
      ),
      after: img(
        "who-can-i-run-to/after",
        "After: the same poster in deep red with the warped title type in orange."
      ),
    },
  },
  {
    id: "ravens-poster",
    title: "Ravens Poster",
    type: "Sports poster",
    captioned: false,
    placeholderHeight: 0,
    image: img(
      "ravens-poster/01",
      "Purple Ravens poster: Lamar Jackson hands off to Derrick Henry in front of a giant 87, with the headline Longest run in Ravens history."
    ),
  },
  {
    id: "tank-davis-poster",
    title: "Tank Davis Poster",
    type: "Fight poster",
    captioned: true,
    placeholderHeight: 0,
    image: img(
      "tank-davis-poster/01",
      "Navy and orange poster of Gervonta Tank Davis upside down over a giant orange 30 wins, with three training photos and the quote I knew he was going to tire down."
    ),
  },
];
