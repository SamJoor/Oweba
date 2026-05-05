import Link from "next/link";
import { portfolioItems } from "@/lib/content/site-content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { SurfaceCard } from "@/components/ui/card";

const accentMap = {
  premium: "from-[#163A70] to-[#2F6BFF]",
  modern: "from-[#2F6BFF] to-[#90b0ff]",
  bold: "from-[#163A70] to-[#4f84ff]",
  minimal: "from-[#d9d4cb] to-[#ffffff]"
};

export function WorkShowcase() {
  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Selected work"
          title="Designed to look elevated. Built to move people toward action."
          description="Oweba’s case study structure is ready for real client work, with project pages that explain the business context, service scope, and measurable outcomes."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <Link key={item.slug} href={`/work/${item.slug}`} className="group">
              <SurfaceCard className="h-full space-y-5">
                <div className={`h-56 rounded-[24px] bg-gradient-to-br ${accentMap[item.accent]} p-6 text-[#F8F4EC]`}>
                  <div className="flex h-full flex-col justify-between rounded-[18px] border border-white/15 bg-black/10 p-5 backdrop-blur">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">{item.industry}</p>
                    <div className="space-y-2">
                      <p className="font-[var(--font-sora)] text-3xl font-semibold">{item.title}</p>
                      <p className="text-sm text-white/85">{item.heroMetric}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="text-sm leading-7 text-[#1F2937]/76">{item.summary}</p>
                </div>
              </SurfaceCard>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
