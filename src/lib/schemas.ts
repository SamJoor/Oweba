import { z } from "zod";

export const previewSchema = z.object({
  businessName: z.string().min(2, "Enter your business name."),
  industry: z.string().min(2, "Enter your industry or business type."),
  tagline: z.string().max(120, "Keep the tagline under 120 characters.").optional().or(z.literal("")),
  style: z.enum(["Premium", "Modern", "Bold", "Minimal"]),
  goal: z.enum(["Leads", "Bookings", "Trust", "Sales"]).optional(),
  contactEmail: z.email("Enter a valid email address.").optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  businessName: z.string().min(2, "Enter your business name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  message: z.string().min(20, "Tell us a bit more so we can respond well."),
  website: z.string().max(0).optional(),
});

export const quoteSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  businessName: z.string().min(2, "Enter your business name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  websiteUrl: z.url("Enter a valid website URL.").optional().or(z.literal("")),
  industry: z.string().min(2, "Enter your industry."),
  needs: z.string().min(10, "Tell us what you need."),
  budgetRange: z.enum(["$1k-$3k", "$3k-$7k", "$7k-$15k", "$15k+"]),
  timeline: z.enum(["ASAP", "2-4 weeks", "1-2 months", "Flexible"]),
  goals: z.string().min(20, "Share your goals or notes."),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type PreviewInput = z.infer<typeof previewSchema>;
