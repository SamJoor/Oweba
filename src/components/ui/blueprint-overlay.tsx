import { cn } from "@/lib/utils";

export function BlueprintOverlay({
  className
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(22,58,112,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.035)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute left-8 top-8 h-16 w-16 border border-[#163A70]/10" />
      <div className="absolute right-8 top-8 h-px w-20 bg-[#163A70]/14" />
      <div className="absolute right-8 top-8 h-20 w-px bg-[#163A70]/14" />
      <div className="absolute bottom-8 left-8 h-px w-24 bg-[#163A70]/14" />
      <div className="absolute bottom-8 left-8 h-24 w-px bg-[#163A70]/14" />
      <div className="absolute bottom-10 right-10 h-20 w-20 rounded-full border border-[#163A70]/10" />
    </div>
  );
}
