import Link from "next/link";
import { articles } from "@/lib/content/site-content";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { BlueprintFrame } from "@/components/ui/blueprint-frame";

export const metadata = buildMetadata({
  title: "Resources",
  description: "Oweba insights on website strategy, conversion, SEO foundations, and small business digital credibility.",
  path: "/resources"
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="A blog-ready structure for long-term SEO and credibility."
        description="These starter articles give Oweba a flexible resource hub that can support search visibility, internal linking, and thought leadership over time."
      />
      <section className="pb-16 md:pb-24">
        <Container className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <BlueprintFrame label="Reference board" meta="RB-01" className="bg-[#163A70] text-[#F8F4EC]">
            <h2 className="max-w-md text-4xl leading-tight text-[#F8F4EC]">A blueprint library for better websites.</h2>
            <p className="mt-5 max-w-md text-sm leading-8 text-[#F8F4EC]/74">
              These articles are structured like reference sheets: clear, useful, and designed to support trust, search visibility, and better project conversations.
            </p>
          </BlueprintFrame>
          <div className="grid gap-6 lg:grid-cols-2">
            {articles.map((article, index) => (
              <Link key={article.slug} href={`/resources/${article.slug}`}>
                <BlueprintFrame label={`Reference ${index + 1}`} meta={article.readTime} className={`h-full ${index % 2 === 1 ? "lg:translate-y-8" : ""}`}>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">{article.category}</p>
                  <h2 className="mt-3 text-2xl">{article.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#1F2937]/76">{article.excerpt}</p>
                </BlueprintFrame>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
