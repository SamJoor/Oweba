import { faqs } from "@/lib/content/site-content";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SurfaceCard } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Oweba’s website strategy, timelines, pricing, support, and process.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers before you commit to a project."
        description="Good service starts with clarity. These are the questions Oweba gets most often from businesses considering a new website or redesign."
      />
      <section className="pb-16 md:pb-24">
        <Container className="grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <SurfaceCard key={faq.question}>
              <h2 className="text-2xl">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-[#1F2937]/76">{faq.answer}</p>
            </SurfaceCard>
          ))}
        </Container>
      </section>
    </>
  );
}
