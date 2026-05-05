import { processSteps } from "@/lib/content/site-content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";

export function ProcessSection() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Process"
          title="A clean process from first call to launch."
          description="The goal is simple: make good decisions early, keep approvals focused, and launch a site that feels sharp on day one."
        />
        <div className="space-y-5">
          {processSteps.map((step, index) => (
            <div key={step.title} className="grid gap-5 rounded-[28px] border border-white/55 bg-white/70 p-6 shadow-[0_16px_40px_rgba(22,58,112,0.08)] md:grid-cols-[80px_1fr]">
              <div className="font-[var(--font-sora)] text-4xl font-semibold text-[#2F6BFF]">0{index + 1}</div>
              <div className="space-y-2">
                <h3 className="text-2xl">{step.title}</h3>
                <p className="text-base leading-8 text-[#1F2937]/76">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
