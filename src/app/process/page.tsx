import { PageHero } from "@/components/layout/page-hero";
import { ProcessSectionArt } from "@/components/sections/process-section-art";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Process",
  description: "See how Oweba moves from discovery and positioning through premium design, development, and launch support.",
  path: "/process"
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A premium build process that stays practical."
        description="You should know what is happening, why it matters, and how decisions move the site forward. Oweba’s process is structured, fast-moving, and transparent."
      />
      <ProcessSectionArt />
      <FinalCta />
    </>
  );
}
