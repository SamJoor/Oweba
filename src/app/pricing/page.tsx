import { FinalCta } from "@/components/sections/final-cta";
import { PricingBoard } from "@/components/sections/pricing-board";
import { PageHero } from "@/components/layout/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pricing",
  description: "See Oweba's starting prices for custom websites, redesigns, landing pages, and support retainers.",
  path: "/pricing"
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Starting from"
        title="Clear entry points for serious website projects."
        description="Every proposal is tailored, but transparent starting prices help businesses know whether Oweba is the right fit before the first call."
      />
      <PricingBoard />
      <FinalCta />
    </>
  );
}
