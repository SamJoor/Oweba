import { Article, FAQItem, PortfolioItem, Service } from "@/lib/types";

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const services: Service[] = [
  {
    slug: "custom-business-websites",
    name: "Custom business websites",
    summary: "Built from strategy up, with clear positioning, premium design, and modern engineering.",
    bullets: ["Messaging and page strategy", "Responsive custom design", "Clean Next.js build"],
    startingAt: "4,500",
  },
  {
    slug: "website-redesigns",
    name: "Website redesigns",
    summary: "For businesses that have outgrown an outdated site and need stronger trust at first glance.",
    bullets: ["Audit of current site", "Improved visual system", "Conversion-focused content structure"],
    startingAt: "3,800",
  },
  {
    slug: "landing-pages",
    name: "Landing pages",
    summary: "High-clarity pages for campaigns, services, offers, and local lead generation.",
    bullets: ["Offer shaping", "CRO-focused layout", "Faster launch cycles"],
    startingAt: "1,800",
  },
  {
    slug: "support-and-growth",
    name: "Support and growth",
    summary: "Ongoing updates, launch support, analytics reviews, and iteration after the site goes live.",
    bullets: ["Care plans", "Performance refinements", "SEO-ready expansions"],
    startingAt: "350/mo",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "ct-epsilon-phi-delts",
    title: "CT Epsilon Phi Delts",
    industry: "Student organization",
    summary: "A founder-built live website focused on clearer chapter information, stronger public-facing structure, and a more polished digital presence for the organization.",
    results: ["Live public website", "Clearer information architecture", "Built from strategy through launch"],
    services: ["Website strategy", "Custom design", "Frontend development", "Content structure"],
    accent: "premium",
    heroMetric: "Live launch",
    statusLabel: "Founder-built live site",
    kind: "live",
    note: "This is a real shipped project in Oweba's portfolio and reflects the studio's current approach to structure, presentation, and build quality.",
    liveUrl: "https://ctepsilonphidelts.org/"
  },
  {
    slug: "samjoor",
    title: "Samjoor",
    industry: "Personal brand",
    summary: "A live portfolio site designed to feel sharper, more modern, and more intentional than a standard personal website, with a stronger visual identity and cleaner presentation.",
    results: ["Live public website", "Sharper visual identity", "Cleaner portfolio presentation"],
    services: ["Website design", "Brand presentation", "Frontend development"],
    accent: "bold",
    heroMetric: "Live site",
    statusLabel: "Founder-built live site",
    kind: "live",
    note: "This project shows Oweba's ability to shape a more design-led digital presence while still keeping the experience direct and easy to navigate.",
    liveUrl: "https://samjoor.com/"
  },
];

export const faqs: FAQItem[] = [
  {
    question: "Who is Oweba best for?",
    answer:
      "Oweba works best for small and medium-sized businesses that need a more credible online presence, better conversion paths, and a site that reflects the quality of their service.",
  },
  {
    question: "Do you only design, or do you build too?",
    answer:
      "Both. We handle strategy, content structure, interface design, and full website development so the launch experience is cohesive from start to finish.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Landing pages can launch in as little as 2 to 3 weeks. Full custom websites usually take 4 to 8 weeks depending on scope, approvals, and content readiness.",
  },
  {
    question: "Can you help if we already have a website?",
    answer:
      "Yes. Redesign projects are a core part of our work, especially when the existing site looks dated, loads slowly, or underperforms as a sales tool.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. We offer ongoing support, content updates, and growth-focused iteration so your site stays sharp after launch.",
  },
];

export const processSteps = [
  {
    title: "Position",
    description:
      "We clarify what makes your business trustworthy, valuable, and easy to choose before we touch the UI.",
  },
  {
    title: "Design",
    description:
      "We shape a premium visual system with conversion paths that feel intentional rather than overproduced.",
  },
  {
    title: "Build",
    description:
      "We develop a fast, responsive site with clean code, strong accessibility, and launch-ready content.",
  },
  {
    title: "Launch and refine",
    description:
      "We QA, launch, and support the first post-launch improvements based on real customer behavior.",
  },
];

export const articles: Article[] = [
  {
    slug: "small-business-website-redesign-signs",
    title: "7 signs your small business website is quietly costing you leads",
    excerpt:
      "The patterns we see when a business has strong service quality but a weak first impression online.",
    category: "Website strategy",
    readTime: "6 min read",
  },
  {
    slug: "service-business-homepage-structure",
    title: "What a high-converting service business homepage actually needs",
    excerpt:
      "A practical blueprint for trust, clarity, and next-step momentum on a business homepage.",
    category: "CRO",
    readTime: "7 min read",
  },
  {
    slug: "local-seo-ready-website-foundation",
    title: "How to build a website foundation that supports local SEO later",
    excerpt:
      "The technical and content decisions that make future SEO work easier instead of messier.",
    category: "SEO",
    readTime: "5 min read",
  },
];
