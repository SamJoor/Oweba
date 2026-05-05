import { cn } from "@/lib/utils";

type OwebaWordmarkProps = {
  className?: string;
  tone?: "midnight" | "light";
  showGuides?: boolean;
};

const toneMap = {
  midnight: {
    primary: "#0B1020",
    secondary: "#2F6BFF",
    accent: "#6EE7FF",
    markStroke: "#F5F7FB",
    guide: "rgba(11,16,32,0.14)"
  },
  light: {
    primary: "#F5F7FB",
    secondary: "rgba(167,184,255,0.95)",
    accent: "rgba(110,231,255,0.92)",
    markStroke: "#F5F7FB",
    guide: "rgba(245,247,251,0.18)"
  }
} as const;

export function OwebaWordmark({
  className,
  tone = "midnight",
  showGuides = false
}: OwebaWordmarkProps) {
  const palette = toneMap[tone];

  return (
    <svg
      viewBox="0 0 620 120"
      aria-label="Oweba"
      role="img"
      className={cn("h-auto w-[256px]", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {showGuides ? (
        <g stroke={palette.guide} strokeWidth="1">
          <line x1="14" y1="24" x2="604" y2="24" />
          <line x1="14" y1="60" x2="604" y2="60" />
          <line x1="14" y1="96" x2="604" y2="96" />
          <line x1="38" y1="12" x2="38" y2="108" />
          <line x1="74" y1="12" x2="74" y2="108" />
          <line x1="110" y1="12" x2="110" y2="108" />
          <line x1="180" y1="12" x2="180" y2="108" />
          <line x1="252" y1="12" x2="252" y2="108" />
          <line x1="324" y1="12" x2="324" y2="108" />
          <line x1="414" y1="12" x2="414" y2="108" />
          <line x1="510" y1="12" x2="510" y2="108" />
        </g>
      ) : null}
      <g transform="translate(18 18)">
        <rect width="84" height="84" rx="24" fill={palette.primary} />
        <circle cx="42" cy="42" r="20" stroke={palette.markStroke} strokeWidth="5" />
        <path d="M42 6V12" stroke={palette.accent} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M42 72V78" stroke={palette.accent} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M6 42H12" stroke={palette.accent} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M72 42H78" stroke={palette.accent} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M16 16L20 20" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" />
        <path d="M64 64L68 68" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" />
        <path d="M64 20L68 16" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" />
        <path d="M16 68L20 64" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" />
      </g>
      <g fill={palette.primary}>
        <text
          x="134"
          y="80"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="50"
          fontWeight="700"
          letterSpacing="7"
        >
          OWEBA
        </text>
      </g>
    </svg>
  );
}
