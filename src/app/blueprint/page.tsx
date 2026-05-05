import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { WebsiteBlueprintSection } from "@/components/sections/website-blueprint-section";
import { WorkShowcaseArt } from "@/components/sections/work-showcase-art";
import { PreviewSectionArt } from "@/components/sections/preview-section-art";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "Website blueprint",
  description: "See how Oweba structures high-trust business websites around positioning, proof, conversion, and mobile clarity.",
  path: "/blueprint"
});

export default function BlueprintPage() {
  return (
    <>
      <PageHero
        eyebrow="Website Blueprint"
        title="A clearer way to show what Oweba actually builds."
        description="This page breaks down the four layers behind a high-performing business website: positioning, trust, conversion, and mobile usability."
        primaryHref="/contact"
        primaryLabel="Request a quote"
        secondaryHref="/work"
        secondaryLabel="See the work"
      />
      <WebsiteBlueprintSection />
      <PreviewSectionArt />
      <WorkShowcaseArt />
      <FinalCta />
    </>
  );
}
