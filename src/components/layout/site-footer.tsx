import Link from "next/link";
import { navLinks } from "@/lib/content/site-content";
import { siteConfig } from "@/lib/site";
import { OwebaLogo } from "@/components/brand/oweba-logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getCalendlyUrl } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#163A70] py-16 text-[#F8F4EC]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40" />
      <Container className="relative grid gap-12 lg:grid-cols-[1.25fr_0.8fr_0.95fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[#F8F4EC]/52">
            <span>Sheet A-09</span>
            <span className="h-px w-10 bg-white/18" />
            <span>Oweba blueprint system</span>
          </div>
          <OwebaLogo className="w-[320px]" tone="light" />
          <p className="max-w-xl text-base leading-8 text-[#F8F4EC]/78">
            Premium websites for service businesses that need sharper positioning, stronger trust, and a more confident first impression online.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">
              Request a quote
            </ButtonLink>
            <ButtonLink href={getCalendlyUrl()} target="_blank" rel="noreferrer" variant="secondary" className="border-white/20 bg-white/8 text-[#F8F4EC] hover:bg-white/12">
              Book a call
            </ButtonLink>
          </div>
        </div>
        <div className="space-y-4">
          <p className="font-[var(--font-sora)] text-lg font-semibold text-white">Plan Index</p>
          <div className="grid gap-3">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-[#F8F4EC]/76 hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/resources" className="text-sm text-[#F8F4EC]/76 hover:text-white">
              Resources
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <p className="font-[var(--font-sora)] text-lg font-semibold text-white">Studio Contact</p>
          <div className="space-y-2 text-sm leading-7 text-[#F8F4EC]/76">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.location}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
