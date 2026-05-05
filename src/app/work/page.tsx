import { portfolioItems } from "@/lib/content/site-content";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { SurfaceCard } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Work",
  description: "Browse Oweba's current live website work.",
  path: "/work"
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Two live websites that show how Oweba designs and builds today."
        description="A small, honest portfolio: CT Epsilon Phi Delts and Samjoor. Each project has its own tone, but both reflect Oweba's approach to structure, presentation, and polished frontend execution."
      />
      <section className="section-divider pb-10 pt-10 md:pb-14 md:pt-14">
        <Container className="grid gap-6 md:grid-cols-2">
          {portfolioItems.map((item) => (
            <a
              key={item.slug}
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="block h-full"
            >
              <SurfaceCard className="faux-3d-card flex h-full flex-col rounded-[32px] border-white/14 bg-[rgba(248,244,236,0.9)] p-5 md:p-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm uppercase tracking-[0.16em] text-[#2F6BFF]">{item.industry}</p>
                    <p className="rounded-full border border-[#163A70]/12 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#163A70]/54">
                      {item.statusLabel}
                    </p>
                  </div>
                  <div className={`rounded-[26px] border border-[#163A70]/10 bg-gradient-to-br ${item.accent === "premium" ? "from-[#163A70] to-[#2F6BFF]" : "from-[#163A70] to-[#4f84ff]"} p-5 text-[#F8F4EC]`}>
                    <div className="rounded-[20px] border border-white/14 bg-black/10 p-4 backdrop-blur-sm">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Live website</p>
                      <h3 className="mt-3 text-3xl leading-[1.02] text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/78">{item.heroMetric}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-1 flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <p className="text-sm leading-7 text-[#1F2937]/76">{item.summary}</p>
                    <p className="text-sm leading-7 text-[#1F2937]/76">{item.note}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      {item.results.slice(0, 2).map((result) => (
                        <p key={result} className="rounded-[16px] border border-[#163A70]/8 bg-white/72 px-4 py-3 text-sm leading-6 text-[#163A70]">
                          {result}
                        </p>
                      ))}
                    </div>
                    <div className="inline-flex w-full items-center justify-center rounded-full bg-[#2F6BFF] px-5 py-3 text-sm font-medium text-[#F8F4EC] shadow-[0_14px_35px_rgba(47,107,255,0.22)]">
                      View site
                    </div>
                  </div>
                </div>
              </SurfaceCard>
            </a>
          ))}
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
