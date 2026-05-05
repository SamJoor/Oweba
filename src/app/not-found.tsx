import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="pb-16 pt-16 md:pb-24 md:pt-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[36px] border border-white/50 bg-white/72 p-8 text-center shadow-[0_18px_50px_rgba(22,58,112,0.1)] md:p-14">
          <p className="text-sm uppercase tracking-[0.18em] text-[#2F6BFF]">404</p>
          <h1 className="mt-4 text-4xl md:text-5xl">That page doesn’t exist.</h1>
          <p className="mt-5 text-base leading-8 text-[#1F2937]/76">
            The route may have changed, or the page may no longer be available.
          </p>
          <div className="mt-8">
            <ButtonLink href="/">Return home</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
