import { ContactInput, PreviewInput, QuoteInput } from "@/lib/schemas";
import { PreviewOutput } from "@/lib/preview";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function saveContactLead(input: ContactInput) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase.from("contact_inquiries").insert({
    name: input.name,
    business_name: input.businessName,
    email: input.email,
    phone: input.phone,
    message: input.message,
    source: "contact_form",
  });
}

export async function saveQuoteLead(input: QuoteInput) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase.from("quote_requests").insert({
    name: input.name,
    business_name: input.businessName,
    email: input.email,
    phone: input.phone,
    website_url: input.websiteUrl || null,
    industry: input.industry,
    needs: input.needs,
    budget_range: input.budgetRange,
    timeline: input.timeline,
    goals: input.goals,
  });
}

export async function savePreviewLead(input: PreviewInput, output: PreviewOutput) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase.from("preview_generations").insert({
    business_name: input.businessName,
    industry: input.industry,
    tagline: input.tagline || null,
    style: input.style,
    goal: input.goal || null,
    contact_email: input.contactEmail || null,
    generated_headline: output.headline,
    generated_copy: output.supportingCopy,
    generated_sections: output.sections,
  });
}
