"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card";
import { FormStatus } from "@/components/forms/form-status";
import { InputField, SelectField, TextareaField } from "@/components/forms/form-field";
import { quoteSchema } from "@/lib/schemas";

type Errors = Partial<
  Record<
    "name" | "businessName" | "email" | "phone" | "websiteUrl" | "industry" | "needs" | "budgetRange" | "timeline" | "goals",
    string[]
  >
>;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function QuoteForm() {
  const router = useRouter();
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
    const parsed = quoteSchema.safeParse(payload);

    if (!parsed.success) {
      setLoading(false);
      setErrors(parsed.error.flatten().fieldErrors);
      setError("Please fix the highlighted fields and try again.");
      return;
    }

    if (parsed.data.website) {
      setLoading(false);
      setError("Spam submission blocked.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setLoading(false);
      setError("The quote form is not configured yet.");
      return;
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "Oweba Website",
        subject: `New Oweba quote request from ${parsed.data.businessName}`,
        inquiry_type: "Request a quote",
        name: parsed.data.name,
        business_name: parsed.data.businessName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        website_url: parsed.data.websiteUrl || "N/A",
        industry: parsed.data.industry,
        budget_range: parsed.data.budgetRange,
        timeline: parsed.data.timeline,
        needs: parsed.data.needs,
        goals: parsed.data.goals
      })
    });

    const json = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok || !json?.success) {
      setError(json?.message || "We couldn't submit your request right now. Please try again shortly.");
      return;
    }

    router.push("/thank-you?type=quote");
  }

  return (
    <SurfaceCard className="space-y-5 border-[#163A70]/10">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">Sheet C-02</p>
        <h3 className="text-2xl">Request a quote</h3>
        <p className="mt-2 text-sm leading-7 text-[#1F2937]/76">
          Best for businesses that already know the scope, timing, or outcome they want.
        </p>
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="Name" name="name" placeholder="Your name" error={errors.name?.[0]} />
          <InputField label="Business name" name="businessName" placeholder="Your business" error={errors.businessName?.[0]} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="Email" type="email" name="email" placeholder="you@company.com" error={errors.email?.[0]} />
          <InputField label="Phone" name="phone" placeholder="(555) 123-4567" error={errors.phone?.[0]} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="Website URL" name="websiteUrl" placeholder="https://yourwebsite.com" error={errors.websiteUrl?.[0]} />
          <InputField label="Industry" name="industry" placeholder="Dental, legal, HVAC, etc." error={errors.industry?.[0]} />
        </div>
        <TextareaField label="What do you need?" name="needs" placeholder="Custom website, redesign, landing page, support, or a combination." error={errors.needs?.[0]} />
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField label="Budget range" name="budgetRange" defaultValue="" error={errors.budgetRange?.[0]}>
            <option value="" disabled>
              Select a range
            </option>
            <option>$1k-$3k</option>
            <option>$3k-$7k</option>
            <option>$7k-$15k</option>
            <option>$15k+</option>
          </SelectField>
          <SelectField label="Timeline" name="timeline" defaultValue="" error={errors.timeline?.[0]}>
            <option value="" disabled>
              Select timing
            </option>
            <option>ASAP</option>
            <option>2-4 weeks</option>
            <option>1-2 months</option>
            <option>Flexible</option>
          </SelectField>
        </div>
        <TextareaField
          label="Goals / notes"
          name="goals"
          placeholder="What should the new site do better? More leads, better trust, a stronger first impression, clearer service pages, easier booking, and so on."
          error={errors.goals?.[0]}
        />
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <FormStatus error={error} />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Submitting..." : "Submit quote request"}
        </Button>
      </form>
    </SurfaceCard>
  );
}
