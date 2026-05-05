import { articles } from "@/lib/content/site-content";

export const articleBodies: Record<string, string[]> = {
  "small-business-website-redesign-signs": [
    "A weak website rarely fails in dramatic ways. It usually leaks trust slowly through dated visuals, vague messaging, and friction in the first 20 seconds.",
    "If your team closes work mostly through referrals, your website still matters because referred prospects use it to verify quality before they reach out.",
    "The biggest red flags are usually soft ones: unclear headlines, weak service structure, missing social proof, poor mobile readability, and forms that feel like afterthoughts.",
  ],
  "service-business-homepage-structure": [
    "A strong homepage should answer three questions quickly: what you do, who it is for, and why a customer should trust you now.",
    "After that, your layout should support momentum with proof, a clear process, and a next step that feels low-friction.",
    "If every section looks fine in isolation but the page still underperforms, the issue is often narrative order rather than visual style alone.",
  ],
  "local-seo-ready-website-foundation": [
    "Most local SEO problems start before SEO begins. They start when a site launches with weak page structure, inconsistent service naming, and thin location relevance.",
    "The easiest way to future-proof local search performance is to build a clean service architecture, semantic headings, and pages that can expand logically over time.",
    "This is why technical setup and message strategy should happen together rather than in separate silos.",
  ],
};

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
