"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { StackBlueprintGraphic } from "@/components/graphics/stack-blueprint-graphic";
import { Container } from "@/components/ui/container";
import { SurfaceCard } from "@/components/ui/card";

const stackGroups = [
  {
    label: "Frontend",
    items: ["Next.js", "TypeScript", "Tailwind", "Figma"]
  },
  {
    label: "Backend",
    items: ["Next.js", "Resend", "Zod"]
  },
  {
    label: "Data",
    items: ["Supabase"]
  },
  {
    label: "Workflow",
    items: ["Client focused builds", "High Performance", "Thoughtful iteration"]
  }
] as const;

export function OurStackSection() {
  return (
    <section id="our-stack" className="section-divider py-10 scroll-mt-32 md:py-24">
      <Container className="space-y-5 md:space-y-8">
        <div className="max-w-4xl space-y-4 md:space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-white/18" />
            <motion.div
              animate={{ scale: [1, 1.16, 1] }}
              transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/#our-stack"
                onClick={(event) => {
                  event.preventDefault();
                  const target = document.getElementById("our-stack");
                  if (!target) return;
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                  window.history.replaceState(null, "", "/#our-stack");
                }}
                className="eyebrow-label inline-flex rounded-none border-x-0 border-y border-white/15 bg-transparent px-0 py-1 shadow-none transition-colors hover:text-white"
                style={{ color: "#F8F4EC" }}
                aria-label="Scroll to the Our Stack section"
              >
                Our stack
              </Link>
            </motion.div>
          </div>
          <p
            className="max-w-3xl font-[var(--font-sora)] text-[1rem] font-semibold leading-[1.15] tracking-normal md:text-[1.6rem] md:leading-[1]"
            style={{ color: "#F8F4EC" }}
          >
            Modern, Versatile, and Impressive.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <SurfaceCard className="faux-3d-card rounded-[22px] border-white/14 bg-[rgba(11,16,32,0.92)] p-5 text-[#F5F7FB] md:rounded-[36px] md:p-8">
            <p className="eyebrow-label text-[#A7B8FF]">Why this stack</p>
            <div className="mt-4 flex h-full flex-col gap-6">
              <div className="space-y-4">
                <h3 className="text-[1.65rem] leading-[1.08] text-white md:text-[2.9rem] md:leading-[1.02]" style={{ color: "#F8F4EC" }}>
                  Built for performance, built for growth.
                </h3>
                <p className="max-w-md text-sm leading-7 text-white/76 md:text-base md:leading-8">
                  Our stack supports a wide range of needs and goals, and will perform and last as your business grows and evolves.
                </p>
              </div>

              <div className="hidden md:block">
                <StackBlueprintGraphic />
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard className="faux-3d-card overflow-hidden rounded-[22px] border-white/12 bg-[rgba(248,244,236,0.9)] p-4 md:rounded-[36px] md:p-6">
            <div className="grid gap-3 lg:grid-cols-2">
              {stackGroups.map((group) => (
                <div key={group.label} className="faux-3d-card rounded-[18px] border border-[#163A70]/8 bg-white/72 p-4 md:rounded-[24px]">
                  <p className="eyebrow-label text-[#163A70]/46">{group.label}</p>
                  <div className="mt-4 grid gap-2.5">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="faux-3d-card rounded-[16px] border border-[#163A70]/8 bg-white/88 px-3 py-3 text-[0.95rem] font-medium leading-5 text-[#163A70]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </Container>
    </section>
  );
}
