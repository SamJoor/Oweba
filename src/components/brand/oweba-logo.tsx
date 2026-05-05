import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function OwebaLogo({
  className,
  priority = false,
  link = false,
  tone = "midnight"
}: {
  className?: string;
  priority?: boolean;
  link?: boolean;
  tone?: "midnight" | "light";
}) {
  const mark = tone === "light" ? (
    <div className={cn("inline-flex rounded-2xl bg-white/92 px-4 py-3 shadow-[0_14px_34px_rgba(11,16,32,0.18)]", className)}>
      <Image
        src="/brand/oweba-logo-reference-transparent%20copy.png"
        alt="Oweba"
        width={713}
        height={290}
        priority={priority}
        unoptimized
        sizes="(max-width: 768px) 280px, 312px"
        className="h-auto w-[280px]"
      />
    </div>
  ) : (
    <Image
      src="/brand/oweba-logo-reference-transparent%20copy.png"
      alt="Oweba"
      width={713}
      height={290}
      priority={priority}
      unoptimized
      sizes="(max-width: 768px) 280px, 312px"
      className={cn("h-auto w-[280px]", className)}
    />
  );

  if (link) {
    return (
      <Link href="/" aria-label="Oweba home" data-priority={priority}>
        {mark}
      </Link>
    );
  }

  return mark;
}
