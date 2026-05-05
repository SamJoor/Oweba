import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { QuoteForm } from "@/components/forms/quote-form";
import { getCalendlyUrl } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Oweba, request a quote, or book a discovery call for your next website project.",
  path: "/contact"
});

export default function ContactPage() {
  const calendlyUrl = getCalendlyUrl();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a quote request, a general inquiry, or a discovery call."
        description="Pick the path that fits your stage. Oweba keeps the first step simple so the project can move quickly if it is a good fit."
        secondaryHref={calendlyUrl}
        secondaryLabel="Book a discovery call"
      />
      <section className="pb-16 md:pb-24">
        <Container className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[34px] border border-[#163A70]/10 bg-[#163A70] p-7 text-[#F8F4EC] shadow-[0_24px_60px_rgba(22,58,112,0.16)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#F8F4EC]/54">Contact blueprint</p>
            <h2 className="mt-4 text-4xl leading-tight text-[#F8F4EC]">Choose the route that matches the stage of the project.</h2>
            <div className="mt-8 space-y-4">
              {[
                "General inquiry for early-stage conversations",
                "Quote request for defined scope, budget, or timeline",
                "Calendly booking for a live discovery call"
              ].map((item, index) => (
                <div key={item} className="grid grid-cols-[34px_1fr] gap-3 border-t border-white/10 pt-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/14 text-xs font-semibold">
                    0{index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-7 text-[#F8F4EC]/76">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <ContactForm />
            <QuoteForm />
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="overflow-hidden rounded-[34px] border border-[#163A70]/10 bg-white/72 p-4 shadow-[0_18px_50px_rgba(22,58,112,0.08)] md:p-6">
            <div className="mb-4 flex items-center justify-between gap-4 px-2 text-[10px] uppercase tracking-[0.2em] text-[#163A70]/48">
              <span>Schedule board</span>
              <span>Book a discovery call</span>
            </div>
            <iframe
              title="Book a discovery call with Oweba"
              src={`${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1`}
              className="h-125 w-full rounded-[24px] border-0 md:h-190"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
