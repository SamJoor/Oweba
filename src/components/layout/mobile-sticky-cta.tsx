import { ButtonLink } from "@/components/ui/button";
import { getCalendlyUrl } from "@/lib/utils";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-full border border-[#163A70]/10 bg-white/92 p-3 shadow-[0_18px_40px_rgba(22,58,112,0.16)] backdrop-blur">
        <ButtonLink href="/preview" className="flex-1" variant="secondary">
          Try lab
        </ButtonLink>
        <ButtonLink href={getCalendlyUrl()} target="_blank" rel="noreferrer" className="flex-1">
          Book call
        </ButtonLink>
      </div>
    </div>
  );
}
