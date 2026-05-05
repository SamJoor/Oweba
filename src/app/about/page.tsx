import { OwebaStoryPage } from "@/components/pages/oweba-story-page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn how Oweba combines strategy, premium design, and modern development for small and medium-sized businesses.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <OwebaStoryPage
      eyebrow="About Oweba"
      title="A focused studio for businesses that need a better first impression online."
      description="Oweba exists for service businesses that do great work offline but are undersold by their website. We combine positioning, premium design, and modern development to close that gap."
    />
  );
}
