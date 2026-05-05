import { services } from "@/lib/content/site-content";
import { formatCurrency } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { BlueprintFrame } from "@/components/ui/blueprint-frame";

export function PricingBoard() {
  return (
    <section className="pb-16 md:pb-24">
      <Container className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <BlueprintFrame label="Pricing board" meta="PR-01" className="bg-[#163A70] text-[#F8F4EC]">
          <h2 className="max-w-md text-4xl leading-tight text-[#F8F4EC]">Good websites are scoped like projects, not sold like mystery boxes.</h2>
          <p className="mt-5 max-w-md text-sm leading-8 text-[#F8F4EC]/74">
            These are starting points for serious engagements. Final proposals depend on content readiness, page count, integrations, and whether the project is a redesign or a full rebuild.
          </p>
        </BlueprintFrame>
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <BlueprintFrame
              key={service.slug}
              className={`h-full ${index % 2 === 1 ? "lg:translate-y-8" : ""}`}
              label={`Scope ${index + 1}`}
              meta="Starting from"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl">{service.name}</h2>
                <p className="font-[var(--font-sora)] text-2xl text-[#2F6BFF]">From ${formatCurrency(service.startingAt)}</p>
              </div>
              <p className="mt-4 text-base leading-8 text-[#1F2937]/76">{service.summary}</p>
              <div className="mt-4 space-y-2 text-sm leading-7 text-[#163A70]/80">
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
