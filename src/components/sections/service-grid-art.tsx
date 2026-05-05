import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/content/site-content";
import { formatCurrency } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { SurfaceCard } from "@/components/ui/card";

export function ServiceGridArt() {
  return (
    <section className="section-divider py-16 md:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Services"
          title="Built for businesses that need more than a prettier homepage."
          description="Every engagement is shaped around trust, clarity, and conversion. That can mean a new custom website, a strategic redesign, a focused landing page, or ongoing support after launch."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <SurfaceCard
              key={service.slug}
              className={`flex h-full flex-col justify-between gap-8 overflow-hidden ${index % 2 === 1 ? "lg:translate-y-8" : ""}`}
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#163A70]/8 pb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">0{index + 1}</p>
                  <h3 className="mt-3 max-w-sm text-3xl leading-tight">{service.name}</h3>
                </div>
                <span className="rounded-full border border-[#163A70]/10 bg-[#F8F4EC] px-3 py-1 text-sm font-medium text-[#163A70]">
                  From ${formatCurrency(service.startingAt)}
                </span>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-8 text-[#1F2937]/76">{service.summary}</p>
                <div className="grid gap-2 text-sm text-[#163A70]/78">
                  {service.bullets.map((bullet) => (
                    <p key={bullet}>- {bullet}</p>
                  ))}
                </div>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F6BFF]">
                Explore service details <ArrowRight size={16} />
              </Link>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
