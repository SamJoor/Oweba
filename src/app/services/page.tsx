import { PageHero } from "@/components/layout/page-hero";
import { ServiceGridArt } from "@/components/sections/service-grid-art";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description: "Explore Oweba’s website design, redesign, landing page, support, and strategy services for growing businesses.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Website services built for trust, clarity, and conversion."
        description="Oweba keeps the offer simple: premium websites, redesigns, landing pages, and support that help small and medium businesses show up more credibly online."
      />
      <ServiceGridArt />
      <FinalCta />
    </>
  );
}
