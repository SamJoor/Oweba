import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Thank you",
  description: "Thank you for contacting Oweba.",
  path: "/thank-you"
});

export default async function ThankYouPage({
  searchParams
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const isQuote = type === "quote";

  return (
    <section className="pb-16 pt-16 md:pb-24 md:pt-24">
      <Container>
        <div className="mx-auto max-w-3xl rounded-[28px] border border-white/50 bg-white/72 p-8 text-center shadow-[0_18px_50px_rgba(22,58,112,0.1)] md:p-14">
          <p className="text-sm uppercase tracking-[0.18em] text-[#2F6BFF]">Thank you</p>
          <h1 className="mt-4 text-4xl md:text-5xl">
            {isQuote ? "Your quote request is in." : "Your call request is in."}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#1F2937]/76 md:text-lg">
            Thank you. We will review your details and get back to you shortly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" variant="secondary">
              Back to homepage
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-[#1F2937]/60">
            While you wait, explore the <Link href="/work" className="font-semibold text-[#2F6BFF]">work archive</Link> or try the <Link href="/preview" className="font-semibold text-[#2F6BFF]">creative direction lab</Link>.
          </p>
        </div>
      </Container>
    </section>
  );
}
