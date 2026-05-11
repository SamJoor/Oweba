import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-4xl space-y-4 md:space-y-6", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className={cn("h-px w-10 bg-[#163A70]/18", invert && "bg-white/18")} />
          <Badge
            className={cn(
              "rounded-none border-x-0 border-y border-[#163A70]/12 bg-transparent px-0 py-1 shadow-none",
              invert && "border-white/15 bg-transparent text-[#F8F4EC]"
            )}
          >
            {eyebrow}
          </Badge>
        </div>
      ) : null}
      <div className="space-y-3 md:space-y-4">
        <h2
          className={cn("max-w-4xl text-[2.05rem] leading-[1.08] tracking-normal md:text-6xl md:leading-[1.02]", invert && "text-[#F8F4EC]")}
          style={invert ? { color: "#F8F4EC" } : undefined}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn("max-w-2xl text-[0.98rem] leading-7 text-[#1F2937]/78 md:text-[1.12rem] md:leading-9", invert && "text-[#F8F4EC]/76")}
            style={invert ? { color: "rgba(248, 244, 236, 0.76)" } : undefined}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
