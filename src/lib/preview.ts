import { PreviewInput } from "@/lib/schemas";

export type PreviewOutput = {
  headline: string;
  supportingCopy: string;
  primaryCta: string;
  secondaryCta: string;
  trustBar: string[];
  sections: {
    title: string;
    copy: string;
  }[];
};

const styleDescriptors = {
  Premium: "polished, high-trust, refined",
  Modern: "clean, sharp, current",
  Bold: "confident, energetic, conversion-focused",
  Minimal: "clear, spacious, restrained",
} as const;

export function buildFallbackPreview(input: PreviewInput): PreviewOutput {
  const descriptor = styleDescriptors[input.style];
  const goal = input.goal ? input.goal.toLowerCase() : "growth";
  const intro = input.tagline?.trim()
    ? `${input.businessName} helps customers ${input.tagline.toLowerCase()}.`
    : `${input.businessName} gives ${input.industry.toLowerCase()} customers a stronger first impression online.`;

  return {
    headline: `${input.businessName} needs a ${descriptor} website built to drive ${goal}.`,
    supportingCopy: `${intro} This preview shows how Oweba would position the business with clear trust signals, a stronger value proposition, and a site structure designed to turn visits into real conversations.`,
    primaryCta: input.goal === "Bookings" ? "Book your visit" : "Request a quote",
    secondaryCta: "See recent work",
    trustBar: [
      `${input.industry} positioning`,
      "Mobile-first design",
      "SEO-ready structure",
      "Clear conversion flow",
    ],
    sections: [
      {
        title: "Why clients choose us",
        copy: `A clearer message, better visual trust, and a website experience shaped around how ${input.industry.toLowerCase()} customers decide.`,
      },
      {
        title: "What the experience includes",
        copy: "Fast-loading pages, strong service framing, local proof opportunities, and a cleaner path toward inquiry or booking.",
      },
      {
        title: "What happens next",
        copy: "The next step is a short discovery call to confirm priorities, scope the right website package, and map the launch timeline.",
      },
    ],
  };
}
