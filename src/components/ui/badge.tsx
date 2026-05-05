import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow-label inline-flex items-center rounded-full border border-[#163A70]/10 bg-white/72 px-3.5 py-1.5 text-[#163A70] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
        className
      )}
    >
      {children}
    </span>
  );
}
