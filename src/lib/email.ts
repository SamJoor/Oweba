import nodemailer from "nodemailer";
import { ContactInput, QuoteInput } from "@/lib/schemas";
import { PreviewOutput } from "@/lib/preview";

function getEmailConfig() {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!to || !from || !host || !user || !pass) return null;

  return { to, from, host, port, user, pass };
}

function getTransporter() {
  const config = getEmailConfig();
  if (!config) return null;

  return {
    config,
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass
      }
    })
  };
}

export async function sendContactNotification(input: ContactInput) {
  const mailer = getTransporter();
  if (!mailer) return;

  await mailer.transporter.sendMail({
    from: mailer.config.from,
    to: mailer.config.to,
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
  const mailer = getTransporter();
  if (!mailer) return;

  await mailer.transporter.sendMail({
    from: mailer.config.from,
    to: mailer.config.to,
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
  const mailer = getTransporter();
  if (!mailer || !email) return;

  await mailer.transporter.sendMail({
    from: mailer.config.from,
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
