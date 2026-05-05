import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { PreviewSectionArt } from "@/components/sections/preview-section-art";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "Creative direction lab",
  description: "Generate a premium Oweba website direction with controlled templates, tailored copy, and live desktop and mobile previews.",
  path: "/preview"
});

export default function PreviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Creative Direction Lab"
        title="A premium preview experience for businesses deciding what their next site should feel like."
        description="Use Oweba's controlled preview tool to explore a polished website direction, then turn the strongest route into the real build."
        primaryHref="/contact"
        primaryLabel="Request a quote"
        secondaryHref="/work"
        secondaryLabel="See the work"
      />
      <PreviewSectionArt />
      <FinalCta />
    </>
  );
}
