import { cn } from "@/lib/utils";

export function BlueprintFrame({
  children,
  className,
  label,
  meta
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  meta?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-[#163A70]/10 bg-white/82 p-5 shadow-[0_14px_34px_rgba(22,58,112,0.07)] md:rounded-[34px] md:p-8 md:shadow-[0_22px_50px_rgba(22,58,112,0.09)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(22,58,112,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.025)_1px,transparent_1px)] bg-[size:34px_34px] md:bg-[size:28px_28px]" />
      {(label || meta) ? (
        <div className="relative mb-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-[#163A70]/40 md:mb-6 md:tracking-[0.22em]">
          <span>{label}</span>
          <span>{meta}</span>
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
