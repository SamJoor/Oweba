export type Service = {
  slug: string;
  name: string;
  summary: string;
  bullets: string[];
  startingAt: string;
  monthlySupportAt: string;
  monthlyGrowthAt: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  results: string[];
  services: string[];
  accent: "premium" | "modern" | "bold" | "minimal";
  heroMetric: string;
  statusLabel: string;
  kind: "live" | "concept";
  note?: string;
  liveUrl?: string;
};

export type Testimonial = {
  name: string;
  company: string;
  quote: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
};
