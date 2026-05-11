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
    <section className="pb-8 pt-10 md:pb-16 md:pt-24">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-[#163A70]/10 bg-white/80 p-6 shadow-[0_16px_38px_rgba(22,58,112,0.08)] md:rounded-[36px] md:p-12 md:shadow-[0_24px_60px_rgba(22,58,112,0.1)] lg:p-14">
          <div className="absolute inset-0 hidden bg-[linear-gradient(rgba(22,58,112,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.03)_1px,transparent_1px)] bg-[size:30px_30px] md:block" />
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top,rgba(47,107,255,0.12),transparent_55%)] md:block" />
          <div className="eyebrow-label absolute inset-x-6 top-5 flex items-center justify-between text-[#163A70]/34 md:inset-x-8 md:top-8">
            <span>OWEBA PLAN SHEET</span>
            <span className="hidden sm:inline">REV 01</span>
          </div>
          <div className="absolute bottom-8 right-8 hidden h-18 w-18 rounded-full border border-[#163A70]/10 md:block" />
          <div className="absolute bottom-17 right-17 hidden h-0.5 w-8 bg-[#163A70]/10 md:block" />
          <div className="absolute bottom-8 right-[8.75rem] hidden h-8 w-0.5 bg-[#163A70]/10 md:block" />
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
            <ButtonLink href={primaryHref} size="lg" className="w-full sm:w-auto">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink
              href={secondaryHref}
              variant="secondary"
              size="lg"
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="w-full sm:w-auto"
            >
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
