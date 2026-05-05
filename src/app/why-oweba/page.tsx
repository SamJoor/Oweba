import { OwebaStoryPage } from "@/components/pages/oweba-story-page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Why Oweba",
  description: "See why Oweba focuses on trust, positioning, and premium website execution for serious businesses.",
  path: "/why-oweba"
});

export default function WhyOwebaPage() {
  return (
    <OwebaStoryPage
      eyebrow="Why Oweba"
      title="A better website should make your business easier to trust and easier to choose."
      description="Oweba is built for businesses that do serious work and need a website that communicates that clearly, confidently, and credibly."
    />
  );
}
