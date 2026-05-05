"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card";
import { FormStatus } from "@/components/forms/form-status";
import { InputField, TextareaField } from "@/components/forms/form-field";

type Errors = Partial<Record<"name" | "businessName" | "email" | "phone" | "message", string[]>>;

export function ContactForm() {
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

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(json.message || "Something went wrong.");
      setErrors(json.errors || {});
      return;
    }

    router.push("/thank-you?type=contact");
  }

  return (
    <SurfaceCard className="space-y-5 border-[#163A70]/10">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">Sheet C-01</p>
        <h3 className="text-2xl">General inquiry</h3>
        <p className="mt-2 text-sm leading-7 text-[#1F2937]/76">
          Best for businesses that know they need a better website and want to start the conversation.
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
        <TextareaField
          label="What are you trying to improve?"
          name="message"
          placeholder="Tell us about your current website, your business, and what you want the new site to do better."
          error={errors.message?.[0]}
        />
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <FormStatus error={error} />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send inquiry"}
        </Button>
      </form>
    </SurfaceCard>
  );
}
