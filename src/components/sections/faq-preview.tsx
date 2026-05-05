import Link from "next/link";
import { faqs } from "@/lib/content/site-content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { SurfaceCard } from "@/components/ui/card";

export function FaqPreview() {
  return (
    <section className="section-divider py-16 md:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="FAQ"
          title="The questions most businesses ask before they hire us."
          description="We keep the process transparent because trust starts before the proposal does."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {faqs.slice(0, 4).map((faq, index) => (
            <SurfaceCard key={faq.question} className={`${index % 2 === 1 ? "md:translate-y-8" : ""}`}>
              <div className="flex items-center justify-between gap-4 border-b border-[#163A70]/8 pb-4">
                <h3 className="text-xl">{faq.question}</h3>
                <span className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">Q0{index + 1}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#1F2937]/76">{faq.answer}</p>
            </SurfaceCard>
          ))}
        </div>
        <Link href="/faq" className="inline-flex text-sm font-semibold text-[#2F6BFF]">
          See all FAQs
        </Link>
      </Container>
    </section>
  );
}
