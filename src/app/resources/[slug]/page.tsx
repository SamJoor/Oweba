import { notFound } from "next/navigation";
import { getArticleBySlug, articleBodies } from "@/lib/content/resources";
import { articles } from "@/lib/content/site-content";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { BlueprintFrame } from "@/components/ui/blueprint-frame";
import { BlueprintNote } from "@/components/ui/blueprint-note";

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return buildMetadata({
      title: "Resources",
      description: "Resources and articles",
      path: "/resources"
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/resources/${article.slug}`
  });
}

export default async function ResourceArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <article className="pb-16 pt-16 md:pb-24 md:pt-24">
      <Container className="max-w-4xl">
        <BlueprintNote>{article.category}</BlueprintNote>
        <h1 className="mt-4 text-5xl leading-tight md:text-6xl">{article.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#1F2937]/76">{article.excerpt}</p>
        <BlueprintFrame label="Reference sheet" meta="RS-01" className="mt-10">
          <div className="prose-copy space-y-6 text-base text-[#1F2937]/82">
            {articleBodies[slug]?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </BlueprintFrame>
        <div className="mt-10">
          <ButtonLink href="/contact">Talk to Oweba about your website</ButtonLink>
        </div>
      </Container>
    </article>
  );
}
