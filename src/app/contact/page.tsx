import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Book a call with Oweba or request a quote for your next website project.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a call or request a quote."
        description="Use the path that fits your stage. Oweba keeps the first step simple so the project can move quickly if it is a good fit."
        primaryHref="/contact"
        primaryLabel="Book a call"
        secondaryHref="/contact"
        secondaryLabel="Request a quote"
      />
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div id="book-call" className="scroll-mt-28">
              <ContactForm />
            </div>
            <div id="quote" className="scroll-mt-28">
              <QuoteForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
