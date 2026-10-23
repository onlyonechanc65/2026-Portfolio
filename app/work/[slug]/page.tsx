import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "@/components/Portfolio";
import { caseStudies } from "@/lib/content";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  const title = cs.title.startsWith("[") ? `Case Study ${cs.num}` : cs.title;
  return {
    title: `${title} | Chanc Baylor`,
    description: cs.summary,
    alternates: { canonical: `/work/${cs.slug}` },
  };
}

/** A shareable link: opens the home grid with this case study already in the lightbox. */
export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!caseStudies.some((c) => c.slug === slug)) notFound();
  return <Portfolio initialSlug={slug} />;
}
