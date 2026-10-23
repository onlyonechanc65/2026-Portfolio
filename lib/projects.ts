import type { Img, VisualWork } from "./content";
import { IMG } from "./images.generated";

const img = (key: keyof typeof IMG, alt: string): Img => ({ ...IMG[key], alt });

/* Visual-work projects on the wall, in the order they should appear. */
export const projects: VisualWork[] = [
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
