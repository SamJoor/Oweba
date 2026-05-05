import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/content/site-content";
import { formatCurrency } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { SurfaceCard } from "@/components/ui/card";

export function ServiceGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Services"
          title="Built for businesses that need more than a prettier homepage."
          description="Every engagement is shaped around trust, clarity, and conversion. That can mean a new custom website, a strategic redesign, a focused landing page, or ongoing support after launch."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <SurfaceCard key={service.slug} className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl">{service.name}</h3>
                  <span className="rounded-full bg-[#163A70]/6 px-3 py-1 text-sm font-medium text-[#163A70]">
                    From ${formatCurrency(service.startingAt)}
                  </span>
                </div>
                <p className="text-base leading-8 text-[#1F2937]/76">{service.summary}</p>
                <div className="grid gap-2 text-sm text-[#163A70]/78">
                  {service.bullets.map((bullet) => (
                    <p key={bullet}>• {bullet}</p>
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
