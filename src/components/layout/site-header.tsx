"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getCalendlyUrl } from "@/lib/utils";
import { OwebaLogo } from "@/components/brand/oweba-logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const headerLinks = [
  { href: "/about", label: "About" },
  { href: "/#why-oweba", label: "Why Oweba" },
  { href: "/#our-stack", label: "Our Stack" },
  { href: "/work", label: "Our Work" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleSectionJump = (href: string, closeMenu = false) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("/#") || pathname !== "/") {
      if (closeMenu) setOpen(false);
      return;
    }

    const targetId = href.slice(2);
    const target = document.getElementById(targetId);

    if (!target) {
      if (closeMenu) setOpen(false);
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);

    if (closeMenu) setOpen(false);
  };

  return (
    <header className="pointer-events-none sticky top-3 z-50">
      <Container>
        <div className="pointer-events-auto relative overflow-hidden rounded-[18px] border border-[rgba(248,244,236,0.42)] bg-[rgba(248,244,236,0.24)] px-5 py-3 shadow-[0_16px_40px_rgba(22,58,112,0.08)] backdrop-blur-2xl md:px-7">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(22,58,112,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.02)_1px,transparent_1px)] bg-[size:34px_34px] opacity-50" />
          <div className="relative flex items-center justify-between gap-6">
            <div className="min-w-[9.5rem]">
              <OwebaLogo className="w-[113px] md:w-[126px]" priority link />
            </div>
            <nav className="hidden flex-1 items-center justify-center gap-9 lg:flex">
              {headerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleSectionJump(item.href)}
                  className="relative text-sm font-medium text-[#1F2937] after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-[#163A70]/45 after:transition-transform hover:text-[#163A70] hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden min-w-[11rem] items-center justify-end gap-3 lg:flex">
              <ButtonLink href={getCalendlyUrl()} target="_blank" rel="noreferrer" className="shadow-[0_14px_35px_rgba(47,107,255,0.22)]">
                Book a call
              </ButtonLink>
            </div>
            <button
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="rounded-full border border-[#163A70]/10 bg-white/78 p-3 text-[#1F2937] lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>
      {open ? (
        <div className="pointer-events-auto mx-auto mt-2 w-[min(90rem,calc(100%-2.5rem))] rounded-[18px] border border-[#163A70]/8 bg-[rgba(248,244,236,0.84)] shadow-[0_18px_40px_rgba(22,58,112,0.08)] backdrop-blur-xl lg:hidden">
          <Container className="flex flex-col gap-4 py-6">
            {headerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleSectionJump(item.href, true)}
                className="text-base font-medium text-[#1F2937]"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <ButtonLink href={getCalendlyUrl()} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                Book a call
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
