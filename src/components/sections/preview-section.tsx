import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { PreviewGenerator } from "@/components/preview/preview-generator";

export function PreviewSection() {
  return (
    <section className="py-16 md:py-24" id="preview">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="AI preview"
          title="Show prospects the future site before they book the project."
          description="This is Oweba’s standout lead-generation feature: a controlled AI-powered website preview that personalizes messaging without sacrificing design quality."
        />
        <PreviewGenerator />
      </Container>
    </section>
  );
}
