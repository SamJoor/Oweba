"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroBlueprintScene } from "@/components/three/hero-blueprint-scene";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getCalendlyUrl } from "@/lib/utils";

export function HomeHero() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.5 });

  const boardRotateX = useTransform(smoothY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [8, -8]);
  const boardRotateY = useTransform(smoothX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-10, 10]);
  const boardTranslateY = useTransform(smoothY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [8, -8]);
  const boardTranslateX = useTransform(smoothX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-10, 10]);

  const frameTranslateX = useTransform(smoothX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [8, -8]);
  const frameTranslateY = useTransform(smoothY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [6, -6]);

  const glowX = useTransform(smoothX, [-0.5, 0.5], [35, 65]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [30, 70]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(248, 244, 236, 0.24), transparent 24%)`;

  const heroHeadlineStyle = {
    fontSize: "clamp(1.35rem, 2.75vw, 2.45rem)",
    lineHeight: 1.14
  } as const;

  return (
    <section className="pb-10 pt-4 md:pb-14 md:pt-5">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[26px] border border-[rgba(255,255,255,0.46)] bg-[rgba(255,255,255,0.36)] px-6 pb-7 pt-20 shadow-[0_28px_80px_rgba(22,58,112,0.1)] backdrop-blur-xl md:min-h-[clamp(35rem,74svh,41rem)] md:px-10 md:pb-7 md:pt-20 xl:px-14 xl:pb-8"
          onMouseMove={(event) => {
            if (prefersReducedMotion) return;
            const rect = event.currentTarget.getBoundingClientRect();
            pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
            pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
          }}
          onMouseLeave={() => {
            pointerX.set(0);
            pointerY.set(0);
          }}
          style={{ perspective: 1800 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(22,58,112,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.03)_1px,transparent_1px)] bg-[size:38px_38px] opacity-55" />
          <motion.div className="absolute inset-0 opacity-70" style={{ background: glare }} />
          <motion.div className="absolute -left-[8%] top-[-12%] h-[130%] w-[32%] rotate-[22deg] border border-[#163A70]/14" style={{ x: frameTranslateX, y: frameTranslateY }} />
          <motion.div className="absolute -right-[6%] top-[6%] h-[88%] w-[36%] rotate-[10deg] border border-[#163A70]/14" style={{ x: boardTranslateX, y: boardTranslateY }} />
          <motion.div className="absolute left-[2%] top-[8%] h-px w-[35%] bg-[#163A70]/14" style={{ x: frameTranslateX }} />
          <motion.div className="absolute right-[4%] bottom-[11%] h-px w-[32%] bg-[#163A70]/14" style={{ x: boardTranslateX }} />
          <motion.div className="absolute left-[1.5%] bottom-[19%] h-[34%] w-px bg-[#163A70]/12" style={{ y: frameTranslateY }} />
          <div className="absolute inset-x-6 top-12 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#1F2937]/40 md:inset-x-10 xl:inset-x-14">
            <span>Sheet H-01</span>
            <span>Website architecture for growth</span>
          </div>
          <motion.div className="absolute -left-12 top-[30%] h-[1px] w-24 rotate-[90deg] bg-[#163A70]/12" style={{ y: frameTranslateY }} />
          <motion.div className="absolute -right-12 bottom-[22%] h-[1px] w-24 rotate-[90deg] bg-[#163A70]/12" style={{ y: boardTranslateY }} />
          <div className="relative grid gap-8 md:gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center xl:gap-12">
            <div className="space-y-7 md:space-y-8">
              <div className="max-w-4xl space-y-6">
                <h1 className="max-w-[16ch] md:max-w-none font-semibold tracking-[-0.02em] text-[#1F2937]" style={heroHeadlineStyle}>
                  <span className="relative block text-balance md:whitespace-nowrap">
                    Your business does serious work.
                    <span className="absolute -left-4 top-[1.08em] h-px w-[calc(100%+1.1rem)] bg-[#2F6BFF]/34" />
                    <span className="absolute -left-4 top-[1.22em] h-px w-[calc(100%+1.1rem)] bg-[#163A70]/14" />
                  </span>
                  <span className="relative mt-2 block text-balance md:mt-1 md:whitespace-nowrap">
                    Your website should too.
                    <span className="absolute -left-4 top-[1.08em] h-px w-[calc(100%+1.3rem)] bg-[#2F6BFF]/34" />
                  </span>
                </h1>
                <p className="max-w-xl text-[1.02rem] leading-7 text-[#1F2937]/78 md:text-[1.08rem] md:leading-8">
                  Oweba creates bespoke digital architectures for small and medium businesses. Crafted, intelligent, and built to perform.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center md:gap-4">
                <ButtonLink href="/contact" size="hero">
                  Request a quote
                </ButtonLink>
                <ButtonLink href={getCalendlyUrl()} size="hero" variant="ghost" target="_blank" rel="noreferrer" className="gap-2 px-2">
                  Book a call <ArrowRight size={18} />
                </ButtonLink>
              </div>
            </div>

            <div className="relative min-h-[21rem] lg:min-h-[29rem]" style={{ perspective: "1600px" }}>
              <motion.div className="absolute inset-[6%_6%_2%_12%] rotate-[8deg] rounded-[24px] border border-[#E7E1D6]/70" style={{ x: frameTranslateX, y: frameTranslateY, rotateX: boardRotateX, rotateY: boardRotateY }} />
              <motion.div className="absolute inset-[3%_10%_10%_7%] rotate-[8deg] rounded-[24px] border border-[#163A70]/24" style={{ x: boardTranslateX, y: boardTranslateY, rotateX: boardRotateX, rotateY: boardRotateY }} />
              <motion.div className="absolute inset-[5%_4%_13%_10%] rotate-[8deg] rounded-[24px] border border-[#163A70]/16 bg-white/18" style={{ x: boardTranslateX, y: boardTranslateY, rotateX: boardRotateX, rotateY: boardRotateY }} />
              <motion.div
                className="title-block absolute inset-[0%_7%_8%_14%] rotate-[8deg] rounded-[20px] p-4 shadow-[0_24px_56px_rgba(22,58,112,0.12)] md:p-5"
                style={{
                  x: boardTranslateX,
                  y: boardTranslateY,
                  rotateX: boardRotateX,
                  rotateY: boardRotateY,
                  transformStyle: "preserve-3d"
                }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
              >
                <div className="grid h-full gap-4 rounded-[18px] border border-[#163A70]/16 p-4 md:grid-rows-[1fr_auto] md:p-5">
                  <div className="title-block-dark relative overflow-hidden rounded-[18px] p-4 text-[#F8F4EC] shadow-[0_24px_54px_rgba(22,58,112,0.28)]">
                    <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#F8F4EC]/82" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#2F6BFF]" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#F8F4EC]/56">WebGL concept board</span>
                    </div>
                    <div className="h-[18.5rem] pt-5 md:h-[21rem]">
                      <HeroBlueprintScene />
                    </div>
                  </div>

                  <div className="grid gap-4 border-t border-[#163A70]/10 pt-4 text-[10px] uppercase tracking-[0.18em] text-[#163A70]/54 md:grid-cols-[1.25fr_0.95fr]">
                    <div className="space-y-2">
                      <span className="block">Project: web architecture for growth</span>
                      <div className="h-px w-full bg-[#163A70]/10" />
                      <div className="grid gap-2">
                        <div className="h-7 border border-[#163A70]/10 bg-white/34" />
                        <div className="grid grid-cols-4 gap-2">
                          {[0, 1, 2, 3].map((item) => (
                            <div key={item} className="h-7 border border-[#163A70]/10 bg-white/34" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="block">Client: SMB innovators</span>
                      <div className="h-px w-full bg-[#163A70]/10" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-7 border border-[#163A70]/10 bg-white/34" />
                        <div className="h-7 border border-[#163A70]/10 bg-white/34" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="blueprint-line left-[10%] top-[10%] h-[72%] w-px" style={{ y: frameTranslateY }} />
              <motion.div className="blueprint-line left-[15%] top-[8%] h-px w-[70%]" style={{ x: frameTranslateX }} />
              <motion.div className="blueprint-line bottom-[16%] left-[23%] h-px w-[56%]" style={{ x: boardTranslateX }} />
              <div className="absolute left-[4%] top-[19%] text-[10px] uppercase tracking-[0.18em] text-[#1F2937]/40 [writing-mode:vertical-rl]">
                presentation board
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
