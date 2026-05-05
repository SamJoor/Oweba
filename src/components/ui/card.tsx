import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SurfaceCard({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-[28px] border border-white/55 bg-white/80 p-6 shadow-[0_18px_50px_rgba(22,58,112,0.08)] backdrop-blur before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(22,58,112,0.12),transparent)] md:p-7",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
