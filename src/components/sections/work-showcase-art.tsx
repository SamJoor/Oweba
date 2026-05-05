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

export function WorkShowcaseArt() {
  const [featured, ...secondary] = portfolioItems;

  return (
    <section className="section-divider py-16 md:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Live work"
          title="Two live websites that show the current Oweba standard."
          description="The portfolio is intentionally small right now, but both projects are real and both reflect the way Oweba approaches clarity, trust, and polished execution."
          invert
        />
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Link href={`/work/${featured.slug}`} className="group">
            <div className="faux-3d-card relative overflow-hidden rounded-[38px] border border-[#163A70]/10 bg-[#163A70] p-6 text-[#F8F4EC] shadow-[0_30px_70px_rgba(22,58,112,0.18)] md:p-8">
              <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[featured.accent]} opacity-90`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%)]" />
              <div className="relative grid min-h-[31rem] gap-8 lg:grid-cols-[1fr_0.7fr]">
                <div className="flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.22em] text-white/70">
                      <p>{featured.industry}</p>
                      <span className="rounded-full border border-white/16 px-3 py-1 text-[10px] tracking-[0.18em] text-white/82">{featured.statusLabel}</span>
                    </div>
                    <h3 className="max-w-xl text-5xl leading-[1.02] text-white">{featured.title}</h3>
                    <p className="max-w-xl text-base leading-8 text-white/82">{featured.summary}</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {featured.results.map((result) => (
                      <div key={result} className="rounded-[22px] border border-white/14 bg-black/12 px-4 py-4 text-sm leading-6 text-white/86 backdrop-blur">
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-[28px] border border-white/14 bg-black/12 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/62">Case study highlight</p>
                  <p className="font-[var(--font-sora)] text-4xl font-semibold text-white">{featured.heroMetric}</p>
                  <div className="space-y-3 text-sm leading-7 text-white/78">
                    {featured.services.map((service) => (
                      <p key={service} className="border-t border-white/10 pt-3">
                        {service}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid gap-6">
            {secondary.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="group">
                <SurfaceCard className="faux-3d-card h-full space-y-5">
                  <div className={`h-44 rounded-[26px] bg-gradient-to-br ${accentMap[item.accent]} p-5 text-[#F8F4EC]`}>
                    <div className="flex h-full flex-col justify-between rounded-[20px] border border-white/15 bg-black/12 p-4 backdrop-blur">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/70">{item.industry}</p>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">{item.statusLabel}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-[var(--font-sora)] text-3xl font-semibold">{item.title}</p>
                        <p className="text-sm text-white/82">{item.heroMetric}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm leading-7 text-[#1F2937]/76">{item.summary}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#163A70]/48">Live website</p>
                  </div>
                </SurfaceCard>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
