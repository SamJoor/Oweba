"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-title";
import { getCalendlyUrl } from "@/lib/utils";

const blueprintViews = [
  {
    key: "positioning",
    label: "Positioning",
    kicker: "Say the right thing first",
    title: "A homepage should make the business instantly legible.",
    copy:
      "Oweba structures the first screen around what the company does, who it helps, and why it feels credible. That clarity changes how every section after it performs.",
    bullets: ["Sharper service framing", "More believable headlines", "Clear category fit"],
    stat: "20 seconds",
    statLabel: "to make the right first impression"
  },
  {
    key: "trust",
    label: "Trust",
    kicker: "Reduce hesitation",
    title: "Proof is designed into the page, not bolted on at the end.",
    copy:
      "Reviews, outcomes, credentials, and visual authority are placed exactly where prospects need reassurance. The site should feel established before anyone picks up the phone.",
    bullets: ["Case-study structure", "Reviews and credibility bars", "Premium visual tone"],
    stat: "Higher quality",
    statLabel: "inquiries when trust is visible early"
  },
  {
    key: "conversion",
    label: "Conversion",
    kicker: "Guide the next step",
    title: "The best business sites feel calm, but they still move people forward.",
    copy:
      "Every Oweba build is shaped around action: booking, requesting a quote, or making contact. The journey is designed so the next step feels obvious instead of pushy.",
    bullets: ["CTA hierarchy", "Low-friction contact paths", "Service pages that sell"],
    stat: "Less friction",
    statLabel: "between visit and inquiry"
  },
  {
    key: "mobile",
    label: "Mobile",
    kicker: "Built for real traffic",
    title: "Most businesses are judged on mobile first, whether they realize it or not.",
    copy:
      "Oweba treats mobile as the main viewing context, not the smaller version of desktop. The hierarchy, spacing, and contact experience are tuned for quick decision-making on the go.",
    bullets: ["Thumb-friendly layouts", "Fast page architecture", "Clean readable sections"],
    stat: "Mobile-first",
    statLabel: "design and development standard"
  }
] as const;

export function WebsiteBlueprintSection() {
  const [activeKey, setActiveKey] = useState<(typeof blueprintViews)[number]["key"]>("positioning");
  const active = blueprintViews.find((item) => item.key === activeKey) ?? blueprintViews[0];

  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="How Oweba works"
          title="A serious business website is part positioning system, part trust layer, part sales tool."
          description="Instead of showing a gimmicky generator, Oweba shows the thinking behind the work. Explore the blueprint below to see what actually changes when a business site is built properly."
        />
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[36px] border border-[#163A70]/12 bg-[#163A70] p-6 text-[#F8F4EC] shadow-[0_24px_60px_rgba(22,58,112,0.16)] md:p-8">
            <div className="grid gap-3">
              {blueprintViews.map((view) => {
                const isActive = view.key === activeKey;
                return (
                  <button
                    key={view.key}
                    type="button"
                    onClick={() => setActiveKey(view.key)}
                    className={`rounded-[24px] border px-5 py-5 text-left transition ${
                      isActive
                        ? "border-white/24 bg-white text-[#163A70] shadow-[0_18px_40px_rgba(0,0,0,0.14)]"
                        : "border-white/10 bg-white/6 text-[#F8F4EC] hover:bg-white/10"
                    }`}
                  >
                    <p className={`text-xs uppercase tracking-[0.18em] ${isActive ? "text-[#2F6BFF]" : "text-[#F8F4EC]/58"}`}>{view.kicker}</p>
                    <p className="mt-2 font-[var(--font-sora)] text-2xl font-semibold">{view.label}</p>
                    <p className={`mt-3 text-sm leading-7 ${isActive ? "text-[#1F2937]/74" : "text-[#F8F4EC]/74"}`}>{view.copy}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-white/50 bg-white/78 p-6 shadow-[0_24px_60px_rgba(22,58,112,0.1)] md:p-8">
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(135deg,rgba(47,107,255,0.16),transparent)]" />
            <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">{active.kicker}</p>
                <h3 className="max-w-xl text-4xl leading-tight">{active.title}</h3>
                <p className="max-w-xl text-base leading-8 text-[#1F2937]/76">{active.copy}</p>
                <div className="space-y-3 text-sm text-[#163A70]/78">
                  {active.bullets.map((bullet) => (
                    <p key={bullet}>• {bullet}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ButtonLink href="/work">See examples</ButtonLink>
                  <ButtonLink href={getCalendlyUrl()} target="_blank" rel="noreferrer" variant="secondary">
                    Book a call
                  </ButtonLink>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[30px] border border-[#163A70]/10 bg-[#F8F4EC] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#163A70]/52">Website blueprint</p>
                  <div className="mt-4 grid gap-3">
                    {blueprintViews.map((view, index) => (
                      <div
                        key={view.key}
                        className={`rounded-[20px] border px-4 py-3 ${
                          view.key === activeKey
                            ? "border-[#2F6BFF]/20 bg-white shadow-[0_12px_30px_rgba(22,58,112,0.08)]"
                            : "border-[#163A70]/8 bg-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium text-[#163A70]">
                            0{index + 1}. {view.label}
                          </span>
                          <span className="h-2 w-2 rounded-full bg-[#2F6BFF]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[30px] bg-[#163A70] p-6 text-[#F8F4EC]">
                  <p className="text-sm uppercase tracking-[0.18em] text-[#F8F4EC]/58">Why it matters</p>
                  <p className="mt-4 font-[var(--font-sora)] text-4xl font-semibold">{active.stat}</p>
                  <p className="mt-3 text-sm leading-7 text-[#F8F4EC]/74">{active.statLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
