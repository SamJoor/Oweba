import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { PreviewGeneratorArt } from "@/components/preview/preview-generator-art";

export function PreviewSectionArt() {
  return (
    <section className="section-divider py-16 md:py-24" id="preview">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Creative Direction Lab"
          title="Generate a polished website direction without letting the design drift into nonsense."
          description="Oweba's preview tool uses controlled layouts, tailored messaging, and curated visual modes so the result feels credible, premium, and actually useful."
        />
        <div className="rounded-[40px] border border-[#163A70]/10 bg-[#163A70] p-3 shadow-[0_28px_70px_rgba(22,58,112,0.16)] md:p-4">
          <div className="rounded-[34px] bg-[#F8F4EC] p-3 md:p-4">
            <PreviewGeneratorArt />
          </div>
        </div>
      </Container>
    </section>
  );
}
