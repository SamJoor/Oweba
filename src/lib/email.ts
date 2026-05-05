import { Resend } from "resend";
import { ContactInput, QuoteInput } from "@/lib/schemas";
import { PreviewOutput } from "@/lib/preview";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getEmailConfig() {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) return null;
  return { to, from };
}

export async function sendContactNotification(input: ContactInput) {
  const resend = getResendClient();
  const config = getEmailConfig();
  if (!resend || !config) return;

  await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: input.email,
    subject: `New Oweba contact inquiry from ${input.businessName}`,
    text: [
      `Name: ${input.name}`,
      `Business: ${input.businessName}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      "",
      input.message,
    ].join("\n"),
  });
}

export async function sendQuoteNotification(input: QuoteInput) {
  const resend = getResendClient();
  const config = getEmailConfig();
  if (!resend || !config) return;

  await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: input.email,
    subject: `New Oweba quote request from ${input.businessName}`,
    text: [
      `Name: ${input.name}`,
      `Business: ${input.businessName}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      `Website: ${input.websiteUrl || "N/A"}`,
      `Industry: ${input.industry}`,
      `Budget: ${input.budgetRange}`,
      `Timeline: ${input.timeline}`,
      "",
      `Needs: ${input.needs}`,
      "",
      `Goals: ${input.goals}`,
    ].join("\n"),
  });
}

export async function sendPreviewNotification(email: string, businessName: string, preview: PreviewOutput) {
  const resend = getResendClient();
  const config = getEmailConfig();
  if (!resend || !config || !email) return;

  await resend.emails.send({
    from: config.from,
    to: email,
    subject: `Your Oweba preview for ${businessName}`,
    text: [
      preview.headline,
      "",
      preview.supportingCopy,
      "",
      "Suggested sections:",
      ...preview.sections.map((section) => `- ${section.title}: ${section.copy}`),
    ].join("\n"),
  });
}
