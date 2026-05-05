import { PortfolioItem } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { BlueprintFrame } from "@/components/ui/blueprint-frame";
import { BlueprintNote } from "@/components/ui/blueprint-note";

export function CaseStudySheet({ item }: { item: PortfolioItem }) {
  return (
    <>
      <section className="pb-12 pt-16 md:pt-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.82fr]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <BlueprintNote>{item.industry}</BlueprintNote>
              <span className="rounded-full border border-[#163A70]/12 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#163A70]/76">
                {item.statusLabel}
              </span>
            </div>
            <h1 className="max-w-3xl text-5xl leading-tight md:text-6xl">{item.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-[#1F2937]/78">{item.summary}</p>
            {item.note ? <p className="max-w-2xl text-sm leading-7 text-[#163A70]/64">{item.note}</p> : null}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Start a similar project</ButtonLink>
              {item.liveUrl ? (
                <ButtonLink href={item.liveUrl} target="_blank" rel="noreferrer" variant="secondary">
                  View live site
                </ButtonLink>
              ) : null}
              <ButtonLink href="/work" variant="secondary">
                Back to work
              </ButtonLink>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[34px] bg-[#163A70] p-8 text-[#F8F4EC]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.16em] text-[#F8F4EC]/64">Key result</p>
              <p className="mt-4 font-[var(--font-sora)] text-4xl font-semibold">{item.heroMetric}</p>
              <div className="mt-8 space-y-3 text-sm leading-7 text-[#F8F4EC]/78">
                {item.results.map((result) => (
                  <p key={result}>- {result}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-24">
        <Container className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <BlueprintFrame label="Project sheet" meta="PS-01">
            <h2 className="text-3xl">Project summary</h2>
            <p className="mt-4 text-base leading-8 text-[#1F2937]/78">
              {item.kind === "live"
                ? "This page documents a real live build and shows how Oweba approaches structure, visual clarity, and modern frontend execution on shipped work."
                : "This page is a studio concept used to show how Oweba thinks through structure, positioning, and visual direction before a project is ever built."}
            </p>
          </BlueprintFrame>
          <div className="grid gap-6">
            <BlueprintFrame label="Services provided" meta="PS-02">
              <h2 className="text-3xl">Services provided</h2>
              <div className="mt-4 space-y-3 text-base leading-8 text-[#1F2937]/78">
                {item.services.map((service) => (
                  <p key={service}>- {service}</p>
                ))}
              </div>
            </BlueprintFrame>
            <BlueprintFrame label="Build plan" meta="PS-03" className="bg-[#E7E1D6]">
              <div className="space-y-4">
                <h2 className="text-3xl">What this page proves</h2>
                <p className="text-base leading-8 text-[#1F2937]/78">
                  {item.kind === "live"
                    ? "Each live project adds to a smaller but more credible portfolio: real websites, clearer positioning decisions, and work that can be viewed in the browser right now."
                    : "Oweba&apos;s work section should make a clear distinction between live projects and concept directions while still showing the quality of thinking behind both."}
                </p>
              </div>
            </BlueprintFrame>
          </div>
        </Container>
      </section>
    </>
  );
}
