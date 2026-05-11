"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card";
import { FormStatus } from "@/components/forms/form-status";
import { InputField, TextareaField } from "@/components/forms/form-field";
import { contactSchema } from "@/lib/schemas";

type Errors = Partial<
  Record<"name" | "businessName" | "email" | "phone" | "preferredTime1" | "preferredTime2" | "preferredTime3" | "message", string[]>
>;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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
    const parsed = contactSchema.safeParse(payload);

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
      setError("The contact form is not configured yet.");
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
        subject: `New Oweba call request from ${parsed.data.businessName}`,
        inquiry_type: "Book a call",
        name: parsed.data.name,
        business_name: parsed.data.businessName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        preferred_time_1: parsed.data.preferredTime1 || "N/A",
        preferred_time_2: parsed.data.preferredTime2 || "N/A",
        preferred_time_3: parsed.data.preferredTime3 || "N/A",
        message: parsed.data.message
      })
    });

    const json = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok || !json?.success) {
      setError(json?.message || "We couldn't send your message right now. Please try again in a moment.");
      return;
    }

    router.push("/thank-you?type=contact");
  }

  return (
    <SurfaceCard className="space-y-5 border-[#163A70]/10">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#2F6BFF]">Sheet C-01</p>
        <h3 className="text-2xl">Book a call</h3>
        <p className="mt-2 text-sm leading-7 text-[#1F2937]/76">
          Send a few times that work for you and a quick note. We will confirm the best slot by email.
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
        <div className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[#163A70]">Preferred call times</p>
          <div className="grid gap-4 md:grid-cols-3">
            <InputField label="Option 1" type="datetime-local" name="preferredTime1" error={errors.preferredTime1?.[0]} />
            <InputField label="Option 2" type="datetime-local" name="preferredTime2" error={errors.preferredTime2?.[0]} />
            <InputField label="Option 3" type="datetime-local" name="preferredTime3" error={errors.preferredTime3?.[0]} />
          </div>
        </div>
        <TextareaField
          label="Quick note"
          name="message"
          placeholder="What are you looking for help with?"
          error={errors.message?.[0]}
        />
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <FormStatus error={error} />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Request a call"}
        </Button>
      </form>
    </SurfaceCard>
  );
}
