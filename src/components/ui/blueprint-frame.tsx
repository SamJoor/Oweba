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
        "relative overflow-hidden rounded-[34px] border border-[#163A70]/10 bg-white/78 p-6 shadow-[0_22px_50px_rgba(22,58,112,0.09)] md:p-8",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(22,58,112,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
      {(label || meta) ? (
        <div className="relative mb-6 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-[#163A70]/40">
          <span>{label}</span>
          <span>{meta}</span>
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
