import { PageHero } from "@/components/layout/page-hero";
import { BlueprintFrame } from "@/components/ui/blueprint-frame";
import { SurfaceCard } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

type OwebaStoryPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function OwebaStoryPage({ eyebrow, title, description }: OwebaStoryPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="pb-16 md:pb-24">
        <Container className="grid gap-6 lg:grid-cols-3">
          <BlueprintFrame className="lg:col-span-2" label="Studio overview" meta="AB-01">
            <h2 className="text-3xl">What makes Oweba different</h2>
            <div className="prose-copy mt-5 space-y-4 text-base text-[#1F2937]/78">
              <p>Most businesses do not need more pages for the sake of it. They need better positioning, stronger trust signals, and a website that makes the next step obvious.</p>
              <p>That is why Oweba starts with message clarity and decision-making psychology, not decoration. Design matters, but only when it makes the business easier to trust and easier to choose.</p>
              <p>The result is a site that feels modern and expensive without becoming over-designed or difficult to manage.</p>
            </div>
          </BlueprintFrame>
          <SurfaceCard>
            <h3 className="text-2xl">Built around outcomes</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#1F2937]/76">
              <p>- Clearer service positioning</p>
              <p>- Better mobile credibility</p>
              <p>- Higher-quality inquiries</p>
              <p>- SEO-ready page structure</p>
            </div>
          </SurfaceCard>
        </Container>
      </section>
    </>
  );
}
