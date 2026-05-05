import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { SurfaceCard } from "@/components/ui/card";

export function TestimonialsSectionArt() {
  return (
    <section className="bg-[#163A70] py-16 text-[#F8F4EC] md:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Studio proof"
          title="Early-stage studio, clear standards."
          description="Until Oweba has a larger client roster, the strongest proof is honesty, taste, and the quality of the system being built."
          invert
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard className="border-white/12 bg-white/8 text-[#F8F4EC] shadow-none">
            <p className="text-lg leading-9 text-[#F8F4EC]/86 md:text-2xl">
              Oweba is still early, so the site should not pretend there are dozens of launches behind it. What it can show honestly is one real live build, a strong design point of view, and a thoughtful process for turning that into client-ready work.
            </p>
            <div className="mt-8 flex items-end justify-between gap-6 border-t border-white/10 pt-6">
              <div>
                <p className="font-[var(--font-sora)] text-xl text-white">What you can judge now</p>
                <p className="text-sm text-[#F8F4EC]/68">Design quality, clarity, and build discipline</p>
              </div>
              <p className="max-w-xs text-right text-sm leading-7 text-[#F8F4EC]/62">
                The strongest signal for an early studio is whether the work already feels considered and trustworthy.
              </p>
            </div>
          </SurfaceCard>
          <div className="grid gap-6">
            {[
              {
                title: "What the work section should show",
                copy: "A real launched site, clearly labeled concept directions, and enough detail to make the studio's thinking visible."
              },
              {
                title: "What gets added next",
                copy: "Real client case studies, before-and-after stories, measured results, and testimonial proof as Oweba's roster grows."
              }
            ].map((item) => (
              <SurfaceCard key={item.title} className="border-white/12 bg-white/8 text-[#F8F4EC] shadow-none">
                <p className="font-[var(--font-sora)] text-lg text-white">{item.title}</p>
                <p className="mt-4 text-base leading-8 text-[#F8F4EC]/84">{item.copy}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
