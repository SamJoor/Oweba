"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card";
import { FormStatus } from "@/components/forms/form-status";
import { InputField, SelectField } from "@/components/forms/form-field";
import type { PreviewOutput } from "@/lib/preview";
import { BlueprintOverlay } from "@/components/ui/blueprint-overlay";

type PreviewResponse = {
  success: boolean;
  preview?: PreviewOutput;
  errors?: Record<string, string[]>;
  message?: string;
};

type Errors = Partial<Record<"businessName" | "industry" | "tagline" | "style" | "goal" | "contactEmail", string[]>>;

const styleClassMap = {
  Premium: "from-[#163A70] via-[#1b4a90] to-[#2F6BFF]",
  Modern: "from-[#2F6BFF] via-[#5d8cff] to-[#dce6ff]",
  Bold: "from-[#163A70] via-[#2F6BFF] to-[#86a9ff]",
  Minimal: "from-[#f2eee5] via-[#ffffff] to-[#dfe8ff]"
} as const;

export function PreviewGeneratorArt() {
  const [preview, setPreview] = useState<PreviewOutput | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof styleClassMap>("Premium");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    setSelectedStyle((payload.style as keyof typeof styleClassMap) || "Premium");

    const response = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = (await response.json()) as PreviewResponse;
    setLoading(false);

    if (!response.ok || !json.preview) {
      setErrors((json.errors || {}) as Errors);
      setError(json.message || "We couldn't generate your preview just now.");
      return;
    }

    setPreview(json.preview);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
      <SurfaceCard className="relative space-y-5 border-[#163A70]/10 bg-[#163A70] text-[#F8F4EC]">
        <BlueprintOverlay className="opacity-20 [background:unset]" />
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#F8F4EC]/56">Creative direction input</p>
          <h3 className="mt-3 text-3xl text-[#F8F4EC]">Generate a tailored website direction</h3>
          <p className="mt-2 text-sm leading-7 text-[#F8F4EC]/74">
            Enter a few business details and Oweba will generate a polished homepage-style preview using a controlled premium layout system.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <InputField label="Business name" name="businessName" placeholder="Northshore Dental" error={errors.businessName?.[0]} />
          <InputField label="Industry / business type" name="industry" placeholder="Dental clinic, HVAC, legal firm..." error={errors.industry?.[0]} />
          <InputField label="Optional tagline" name="tagline" placeholder="Family-focused care in downtown Chicago" error={errors.tagline?.[0]} />
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="Style" name="style" defaultValue="Premium" error={errors.style?.[0]}>
              <option>Premium</option>
              <option>Modern</option>
              <option>Bold</option>
              <option>Minimal</option>
            </SelectField>
            <SelectField label="Primary goal" name="goal" defaultValue="Leads" error={errors.goal?.[0]}>
              <option>Leads</option>
              <option>Bookings</option>
              <option>Trust</option>
              <option>Sales</option>
            </SelectField>
          </div>
          <InputField label="Optional email to send this preview" name="contactEmail" type="email" placeholder="you@company.com" error={errors.contactEmail?.[0]} />
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <FormStatus error={error} success={preview ? "Preview generated. You can regenerate with a different style any time." : null} />
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Generating preview..." : preview ? "Regenerate preview" : "Generate preview"}
            </Button>
            {preview ? (
              <ButtonLink href="/contact" variant="secondary" className="border-white/18 bg-white/10 text-[#F8F4EC] hover:bg-white/14">
                Get this built
              </ButtonLink>
            ) : null}
          </div>
        </form>
      </SurfaceCard>

      <AnimatePresence mode="wait">
        <motion.div
          key={preview ? "generated" : "empty"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-5"
        >
          <SurfaceCard className="overflow-hidden border-[#163A70]/10 p-0">
            <div className={`relative p-5 md:p-7 ${preview ? `bg-gradient-to-br ${styleClassMap[selectedStyle]}` : "bg-[#E7E1D6]"}`}>
              <BlueprintOverlay className="opacity-45 mix-blend-multiply" />
              <div className="rounded-[26px] bg-white p-4 shadow-[0_20px_50px_rgba(22,58,112,0.16)] md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#163A70]/55">Desktop preview</p>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#163A70]/18" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#2F6BFF]/22" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#163A70]" />
                  </div>
                </div>
                {preview ? (
                  <div className="mt-5 space-y-5">
                    <div className="flex flex-wrap gap-2">
                      {preview.trustBar.map((item) => (
                        <span key={item} className="rounded-full bg-[#163A70]/6 px-3 py-1 text-xs font-medium text-[#163A70]">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h3 className="max-w-2xl text-4xl leading-tight">{preview.headline}</h3>
                      <p className="max-w-2xl text-base leading-8 text-[#1F2937]/76">{preview.supportingCopy}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" className="rounded-full bg-[#163A70] px-5 py-3 text-sm font-medium text-white shadow-[0_12px_25px_rgba(22,58,112,0.18)]">
                        {preview.primaryCta}
                      </button>
                      <button type="button" className="rounded-full border border-[#163A70]/12 px-5 py-3 text-sm font-medium text-[#163A70]">
                        {preview.secondaryCta}
                      </button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {preview.sections.map((section) => (
                        <div key={section.title} className="rounded-[22px] bg-[#F8F4EC] p-4">
                          <p className="font-[var(--font-sora)] text-lg">{section.title}</p>
                          <p className="mt-2 text-sm leading-7 text-[#1F2937]/74">{section.copy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-3xl">Your personalized preview will appear here.</h3>
                    <p className="max-w-xl text-base leading-8 text-[#1F2937]/72">
                      We&apos;ll combine your business details with Oweba&apos;s premium section system and AI-generated messaging for a controlled, polished result.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SurfaceCard>
          {preview ? (
            <SurfaceCard className="relative border-[#163A70]/10">
              <BlueprintOverlay className="opacity-30" />
              <div className="grid gap-5 md:grid-cols-[180px_1fr]">
                <div className="mx-auto w-[150px] rounded-[34px] border border-[#163A70]/10 bg-[#163A70] p-2 shadow-[0_15px_35px_rgba(22,58,112,0.14)]">
                  <div className="overflow-hidden rounded-[28px] bg-[#F8F4EC] p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#163A70]/55">Mobile</p>
                    <div className="mt-3 space-y-3">
                      <div className="h-2 w-12 rounded-full bg-[#2F6BFF]/18" />
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-[#163A70]/14" />
                        <div className="h-2 w-10/12 rounded-full bg-[#163A70]/14" />
                        <div className="h-2 w-8/12 rounded-full bg-[#163A70]/14" />
                      </div>
                      <div className="h-8 rounded-full bg-[#2F6BFF]" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">Next step</p>
                  <h4 className="text-2xl">Want this direction turned into the real site?</h4>
                  <p className="text-sm leading-7 text-[#1F2937]/76">
                    The preview is only the starting point. Oweba turns it into a full custom build with refined copy, complete page architecture, responsive design, and launch support.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <ButtonLink href="/contact">Request a quote</ButtonLink>
                      <ButtonLink href="/contact" variant="secondary">
                      Book a call
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
