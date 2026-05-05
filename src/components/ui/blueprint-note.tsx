import { cn } from "@/lib/utils";

export function BlueprintNote({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 border-y border-[#163A70]/12 px-0 py-1 text-[10px] uppercase tracking-[0.22em] text-[#163A70]/52",
        className
      )}
    >
      <span className="h-px w-6 bg-[#163A70]/18" />
      <span>{children}</span>
    </div>
  );
}
