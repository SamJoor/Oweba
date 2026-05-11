import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCta({
  title = "If your website feels behind the business, Oweba can close that gap.",
  copy = "We redesign how the business presents itself online so the right clients feel more confident, faster."
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="rounded-[36px] bg-[#163A70] px-8 py-12 text-[#F8F4EC] shadow-[0_30px_60px_rgba(22,58,112,0.22)] md:px-14 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#F8F4EC]/64">Start the conversation</p>
              <h2 className="text-3xl leading-tight text-[#F8F4EC] md:text-5xl">{title}</h2>
              <p className="text-base leading-8 text-[#F8F4EC]/76 md:text-lg">{copy}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request a quote</ButtonLink>
              <ButtonLink href="/contact" variant="secondary" className="border-white/20 bg-white/8 text-[#F8F4EC] hover:bg-white/14">
                Book a call
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
