import { buildMetadata } from "@/lib/metadata";
import { BlueprintIntro } from "@/components/intro/blueprint-intro";
import { HomeHero } from "@/components/sections/home-hero";
import { WhyChooseSection } from "@/components/sections/why-choose";
import { OurStackSection } from "@/components/sections/our-stack";

export const metadata = buildMetadata({
  title: "Premium websites for small and growing businesses",
  description:
    "Oweba builds premium, conversion-focused websites for service businesses that need stronger trust, sharper positioning, and more qualified leads.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <BlueprintIntro />
      <HomeHero />
      <WhyChooseSection />
      <OurStackSection />
    </>
  );
}
