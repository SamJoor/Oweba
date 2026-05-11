import { services } from "@/lib/content/site-content";
import { formatCurrency } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { BlueprintFrame } from "@/components/ui/blueprint-frame";

export function PricingBoard() {
  return (
    <section className="pb-10 md:pb-24">
      <Container className="grid gap-4 md:gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <BlueprintFrame label="Pricing board" meta="PR-01" className="bg-[#163A70] text-[#F8F4EC]">
          <h2 className="max-w-md text-[1.85rem] leading-tight text-[#F8F4EC] md:text-4xl">Good websites are scoped like projects, not sold like mystery boxes.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#F8F4EC]/74 md:mt-5 md:leading-8">
            These are starting points for serious engagements. Final proposals depend on content readiness, page count, integrations, and whether the project is a redesign or a full rebuild.
          </p>
        </BlueprintFrame>
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <BlueprintFrame
              key={service.slug}
              className="h-full"
              label={`Scope ${index + 1}`}
              meta="Starting from"
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                <h2 className="text-[1.35rem] leading-tight md:text-2xl">{service.name}</h2>
                <p className="font-[var(--font-sora)] text-[1.45rem] text-[#2F6BFF] md:text-2xl">From ${formatCurrency(service.startingAt)}</p>
              </div>
              <p className="mt-3 text-[0.95rem] leading-7 text-[#1F2937]/76 md:mt-4 md:text-base md:leading-8">{service.summary}</p>
              <div className="mt-4 grid gap-3 border-y border-[#163A70]/10 py-3 text-sm text-[#163A70]/78 sm:grid-cols-2 md:mt-5 md:py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#163A70]/44">Monthly support</p>
                  <p className="mt-1 font-[var(--font-sora)] text-lg text-[#163A70] md:text-xl">From ${formatCurrency(service.monthlySupportAt)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#163A70]/44">Growth plan</p>
                  <p className="mt-1 font-[var(--font-sora)] text-lg text-[#163A70] md:text-xl">From ${formatCurrency(service.monthlyGrowthAt)}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm leading-6 text-[#163A70]/80 md:leading-7">
                {service.bullets.map((bullet) => (
                  <p key={bullet}>- {bullet}</p>
                ))}
              </div>
            </BlueprintFrame>
          ))}
        </div>
      </Container>
    </section>
  );
}
