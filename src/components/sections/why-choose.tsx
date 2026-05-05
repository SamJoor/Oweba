"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SurfaceCard } from "@/components/ui/card";

const items = [
  {
    label: "01",
    title: "Strategy and execution are one",
    copy: "We design and build with your goals in mind, so the site can grow with you."
  },
  {
    label: "02",
    title: "Designed for trust",
    copy: "Our goal is helping your business feel credible faster and making the next step easier to take."
  },
  {
    label: "03",
    title: "Support beyond launch",
    copy: "We stay by your side after launch whether you want a full redesign in the future or need any updates or maintenance."
  }
];

export function WhyChooseSection() {
  return (
    <section id="why-oweba" className="section-divider py-10 md:py-12 scroll-mt-32">
      <Container className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-white/18" />
          <motion.div
            animate={{ scale: [1, 1.16, 1] }}
            transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/#why-oweba"
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById("why-oweba");
                if (!target) return;
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.replaceState(null, "", "/#why-oweba");
              }}
              className="eyebrow-label inline-flex rounded-none border-x-0 border-y border-white/15 bg-transparent px-0 py-1 shadow-none transition-colors hover:text-white"
              style={{ color: "#F8F4EC" }}
              aria-label="Scroll to the Why Oweba section"
            >
              Why Oweba
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr] xl:items-start">
          <div className="space-y-5">
            <div className="max-w-4xl space-y-4 text-[#F8F4EC]">
              <h3
                className="max-w-3xl text-[2rem] font-normal leading-[1.06] tracking-[-0.03em] md:text-[2.7rem]"
                style={{ color: "#F8F4EC" }}
              >
                Our mission is to provide enterprise quality websites that perform.
              </h3>
            </div>

            <SurfaceCard className="faux-3d-card overflow-hidden rounded-[28px] border-[#163A70]/10 bg-[#E7E1D6] p-0">
              <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[160px] border-b border-[#163A70]/8 md:min-h-[190px] md:border-b-0 md:border-r">
                  <Image
                    src="/brand/why-oweba-blueprint.jpg"
                    alt="A designer sketching website layouts across large blueprint boards"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 28vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,32,0.04),rgba(11,16,32,0.14))]" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/55 bg-white/74 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#163A70] backdrop-blur">
                    Blueprint approach
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-3 p-4 md:p-5">
                  <div className="space-y-2">
                    <p className="eyebrow-label text-[#163A70]/46">What that means in practice</p>
                    <p className="text-lg leading-tight text-[#163A70] md:text-[1.35rem]">
                      A Focus on Building for your Growth, Not Just Building a Site.
                    </p>
                    <p className="text-sm leading-6 text-[#1F2937]/74">
                      We work closely with you to design a site that fits your business and goals, then construct it with care and precision. The result is a digital representation of your business built to perform.
                    </p>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </div>

          <div className="grid gap-3 xl:pt-1">
            {items.map((item, index) => (
              <SurfaceCard key={item.title} className={`faux-3d-card grid gap-3 rounded-[24px] p-5 md:grid-cols-[72px_1fr] md:items-start ${index === 1 ? "xl:ml-4" : index === 2 ? "xl:ml-8" : ""}`}>
                <div className="border-b border-[#163A70]/8 pb-3 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                  <p className="font-[var(--font-sora)] text-2xl text-[#2F6BFF]">{item.label}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#163A70]/42">Reason</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[1.32rem] leading-[1.05]">{item.title}</h3>
                  <p className="max-w-2xl text-[0.94rem] leading-6 text-[#1F2937]/76">{item.copy}</p>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
