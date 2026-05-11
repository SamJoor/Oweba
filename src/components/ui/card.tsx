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
        "relative rounded-[20px] border border-white/55 bg-white/84 p-5 shadow-[0_14px_34px_rgba(22,58,112,0.07)] backdrop-blur before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(22,58,112,0.12),transparent)] md:rounded-[28px] md:p-7 md:shadow-[0_18px_50px_rgba(22,58,112,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
