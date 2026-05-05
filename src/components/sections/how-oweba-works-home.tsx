import { processSteps } from "@/lib/content/site-content";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { SurfaceCard } from "@/components/ui/card";

export function HowOwebaWorksHome() {
  return (
    <section className="section-divider py-16 md:py-24">
      <Container className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="How Oweba works"
            title="A clearer process, so the site feels considered from the first screen to the final handoff."
            description="Oweba is built to keep strategy, design, and development in one flow. That makes the work sharper and the client experience easier to trust."
          />
          <SurfaceCard className="rounded-[34px] bg-[#163A70] text-[#F8F4EC] shadow-[0_24px_60px_rgba(22,58,112,0.16)]">
            <p className="eyebrow-label text-[#F8F4EC]/60">Project principle</p>
            <p className="mt-4 max-w-xl text-3xl leading-tight text-[#F8F4EC] md:text-4xl">
              Good websites are not made by decorating late. They are made by deciding well, early.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/process" variant="secondary" className="border-white/18 bg-white/8 text-[#F8F4EC] hover:bg-white/14">
                See the full process
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost" className="text-[#F8F4EC] hover:bg-white/8">
                Start a project
              </ButtonLink>
            </div>
          </SurfaceCard>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <SurfaceCard key={step.title} className="h-full space-y-5 rounded-[30px]">
              <div className="flex items-center justify-between gap-4 border-b border-[#163A70]/8 pb-4">
                <p className="font-[var(--font-sora)] text-3xl text-[#2F6BFF]">0{index + 1}</p>
                <p className="eyebrow-label text-[#163A70]/44">Phase</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl">{step.title}</h3>
                <p className="text-sm leading-7 text-[#1F2937]/76">{step.description}</p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
