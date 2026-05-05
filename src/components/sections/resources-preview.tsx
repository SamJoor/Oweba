import Link from "next/link";
import { articles } from "@/lib/content/site-content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { SurfaceCard } from "@/components/ui/card";

export function ResourcesPreview() {
  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="SEO-ready structure"
          title="A content foundation that can grow with Oweba."
          description="The site includes a resource hub structure so Oweba can publish service-focused articles, build internal links, and strengthen long-term organic visibility."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/resources/${article.slug}`}>
              <SurfaceCard className="h-full space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">{article.category}</p>
                <h3 className="text-2xl">{article.title}</h3>
                <p className="text-sm leading-7 text-[#1F2937]/76">{article.excerpt}</p>
                <p className="text-sm font-medium text-[#163A70]">{article.readTime}</p>
              </SurfaceCard>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
