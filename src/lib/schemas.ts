import { z } from "zod";

const previewStyles = ["Premium", "Modern", "Bold", "Minimal"] as const;
const previewGoals = ["Leads", "Bookings", "Trust", "Sales"] as const;
const quoteBudgetRanges = ["$500-$1k", "$1k-$3k", "$3k-$7k", "$7k-$15k", "$15k+"] as const;
const quoteTimelines = ["ASAP", "2-4 weeks", "1-2 months", "Flexible"] as const;

export const previewSchema = z.object({
  businessName: z.string().min(2, "Enter your business name."),
  industry: z.string().min(2, "Enter your industry or business type."),
  tagline: z.string().max(120, "Keep the tagline under 120 characters.").optional().or(z.literal("")),
  style: z.string().refine((value): value is (typeof previewStyles)[number] => previewStyles.includes(value as (typeof previewStyles)[number]), {
    message: "Select a style."
  }),
  goal: z
    .string()
    .refine((value): value is (typeof previewGoals)[number] => previewGoals.includes(value as (typeof previewGoals)[number]), {
      message: "Select a goal."
    })
    .optional(),
  contactEmail: z.email("Enter a valid email address.").optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  businessName: z.string().min(2, "Enter your business name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  preferredTime1: z.string().optional().or(z.literal("")),
  preferredTime2: z.string().optional().or(z.literal("")),
  preferredTime3: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Share a quick note so we can prepare."),
  website: z.string().max(0).optional(),
});

export const quoteSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  businessName: z.string().min(2, "Enter your business name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  industry: z.string().min(2, "Enter your industry."),
  needs: z.string().min(10, "Tell us what you need."),
  budgetRange: z.string().refine(
    (value): value is (typeof quoteBudgetRanges)[number] => quoteBudgetRanges.includes(value as (typeof quoteBudgetRanges)[number]),
    "Select a budget."
  ),
  timeline: z.string().refine(
    (value): value is (typeof quoteTimelines)[number] => quoteTimelines.includes(value as (typeof quoteTimelines)[number]),
    "Select a timeline."
  ),
  goals: z.string().min(20, "Share a little more about the main goal."),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type PreviewInput = z.infer<typeof previewSchema>;
