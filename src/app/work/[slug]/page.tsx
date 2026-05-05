import { notFound } from "next/navigation";
import { CaseStudySheet } from "@/components/sections/case-study-sheet";
import { FinalCta } from "@/components/sections/final-cta";
import { portfolioItems } from "@/lib/content/site-content";
import { buildMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = portfolioItems.find((entry) => entry.slug === slug);

  if (!item) {
    return buildMetadata({
      title: "Work",
      description: "Portfolio case study",
      path: "/work"
    });
  }

  return buildMetadata({
    title: `${item.title} case study`,
    description: item.summary,
    path: `/work/${item.slug}`
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = portfolioItems.find((entry) => entry.slug === slug);

  if (!item) notFound();

  return (
    <>
      <CaseStudySheet item={item} />
      <FinalCta />
    </>
  );
}
