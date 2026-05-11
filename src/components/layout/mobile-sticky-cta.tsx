import { ButtonLink } from "@/components/ui/button";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-40 px-4 lg:hidden">
      <div className="mx-auto flex max-w-sm items-center gap-2 rounded-[18px] border border-[#163A70]/10 bg-white/94 p-2 shadow-[0_14px_34px_rgba(22,58,112,0.14)] backdrop-blur">
        <ButtonLink href="/contact" className="h-11 flex-1 px-4 text-sm">
          Book a call
        </ButtonLink>
        <ButtonLink href="/pricing" className="h-11 flex-1 px-4 text-sm" variant="secondary">
          Pricing
        </ButtonLink>
      </div>
    </div>
  );
}
