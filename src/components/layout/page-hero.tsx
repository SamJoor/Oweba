import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Request a quote",
  secondaryHref = "/work",
  secondaryLabel = "See the work"
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const external = secondaryHref.startsWith("http");

  return (
    <section className="pb-12 pt-16 md:pb-16 md:pt-24">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] border border-[#163A70]/10 bg-white/72 p-8 shadow-[0_24px_60px_rgba(22,58,112,0.1)] md:p-12 lg:p-14">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(22,58,112,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top,rgba(47,107,255,0.12),transparent_55%)] md:block" />
          <div className="eyebrow-label absolute inset-x-8 top-8 flex items-center justify-between text-[#163A70]/34">
            <span>OWEBA PLAN SHEET</span>
            <span>REV 01</span>
          </div>
          <div className="absolute bottom-8 right-8 hidden h-18 w-18 rounded-full border border-[#163A70]/10 md:block" />
          <div className="absolute bottom-17 right-17 hidden h-0.5 w-8 bg-[#163A70]/10 md:block" />
          <div className="absolute bottom-8 right-[8.75rem] hidden h-8 w-0.5 bg-[#163A70]/10 md:block" />
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={primaryHref} size="lg">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink
              href={secondaryHref}
              variant="secondary"
              size="lg"
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
