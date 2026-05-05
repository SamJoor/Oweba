import { cn } from "@/lib/utils";

export function Container({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-[90rem] px-5 md:px-8 xl:px-10", className)}>{children}</div>;
}
