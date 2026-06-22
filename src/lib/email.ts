import { Resend } from "resend";
import { PreviewOutput } from "@/lib/preview";
import { siteConfig } from "@/lib/site";
import { ContactInput, QuoteInput } from "@/lib/schemas";

export class EmailConfigurationError extends Error {
  constructor(message = "Resend is not configured.") {
    super(message);
    this.name = "EmailConfigurationError";
  }
}

export class EmailDeliveryError extends Error {
  status?: number;
  details?: Record<string, unknown>;

  constructor(message: string, status?: number, details?: Record<string, unknown>) {
    super(message);
    this.name = "EmailDeliveryError";
    this.status = status;
    this.details = details;
  }
}

function toErrorDetails(value: unknown) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const details: Record<string, unknown> = {};

  for (const key of ["name", "message", "statusCode", "status", "code", "type"]) {
    if (record[key] !== undefined) {
      details[key] = record[key];
    }
  }

  if ("errors" in record && Array.isArray(record.errors)) {
    details.errors = record.errors;
  }

  return Object.keys(details).length > 0 ? details : record;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new EmailConfigurationError("Email service is missing RESEND_API_KEY.");
  }

  return new Resend(apiKey);
}

function getFromEmail() {
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) {
    throw new EmailConfigurationError("Email service is missing RESEND_FROM_EMAIL.");
  }

  return fromEmail;
}

function getRecipientEmail() {
  return process.env.RESEND_TO_EMAIL || siteConfig.email;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildFieldRows(fields: Array<{ label: string; value: string }>) {
  return fields
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px 14px;border:1px solid #d9deea;font-weight:600;color:#163A70;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border:1px solid #d9deea;color:#1F2937;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");
}

function buildHtmlEmail(title: string, intro: string, fields: Array<{ label: string; value: string }>) {
  return `
    <div style="margin:0;padding:32px;background:#F4F7FC;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:720px;margin:0 auto;background:#FFFFFF;border:1px solid #D9DEE9;border-radius:20px;overflow:hidden;">
        <div style="padding:24px 28px;background:#163A70;color:#F8F4EC;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;">Oweba Intake</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1;color:#F8F4EC;">${escapeHtml(title)}</h1>
        </div>
        <div style="padding:24px 28px;">
          <p style="margin:0 0 20px;color:#42526B;line-height:1.7;">${escapeHtml(intro)}</p>
          <table style="width:100%;border-collapse:collapse;border-spacing:0;background:#FCFDFF;">
            ${buildFieldRows(fields)}
          </table>
        </div>
      </div>
    </div>
  `;
}

function buildTextEmail(title: string, fields: Array<{ label: string; value: string }>) {
  return [title, "", ...fields.map(({ label, value }) => `${label}: ${value}`)].join("\n");
}

async function sendEmail({
  subject,
  replyTo,
  html,
  text
}: {
  subject: string;
  replyTo?: string;
  html: string;
  text: string;
}) {
  const resend = getResendClient();
  const from = getFromEmail();
  const to = getRecipientEmail();
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    html,
    text
  });

  if (error) {
    throw new EmailDeliveryError(error.message, undefined, {
      provider: "resend",
      from,
      to,
      replyTo,
      subject,
      error: toErrorDetails(error)
    });
  }

  if (process.env.NODE_ENV === "development") {
    console.info("Email accepted by provider", {
      provider: "resend",
      emailId: data?.id,
      from,
      to,
      replyTo,
      subject
    });
  }
}

export function describeEmailError(error: unknown) {
  if (error instanceof EmailConfigurationError || error instanceof EmailDeliveryError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown email delivery error.";
}

export function logEmailError(context: string, error: unknown) {
  if (!(error instanceof Error)) {
    console.error(context, error);
    return;
  }

  console.error(context, {
    name: error.name,
    message: describeEmailError(error),
    status: error instanceof EmailDeliveryError ? error.status : undefined,
    details: error instanceof EmailDeliveryError ? error.details : undefined,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined
  });
}

function createMessageFailure(error: unknown) {
  const reason = describeEmailError(error);
  return process.env.NODE_ENV === "development"
    ? `We couldn't send your message right now. ${reason}`
    : "We couldn't send your message right now. Please try again in a moment.";
}

export function getContactFailureMessage(error: unknown) {
  return createMessageFailure(error);
}

export function getQuoteFailureMessage(error: unknown) {
  return process.env.NODE_ENV === "development"
    ? `We couldn't submit your request right now. ${describeEmailError(error)}`
    : "We couldn't submit your request right now. Please try again shortly.";
}

export async function sendContactNotification(input: ContactInput) {
  const fields = [
    { label: "Name", value: input.name },
    { label: "Business name", value: input.businessName },
    { label: "Email", value: input.email },
    { label: "Phone", value: input.phone },
    { label: "Preferred time 1", value: input.preferredTime1 || "N/A" },
    { label: "Preferred time 2", value: input.preferredTime2 || "N/A" },
    { label: "Message", value: input.message }
  ];

  await sendEmail({
    subject: `New Oweba call request from ${input.businessName}`,
    replyTo: input.email,
    html: buildHtmlEmail("Book a call request", "A new discovery call request was submitted from the Oweba website.", fields),
    text: buildTextEmail("Book a call request", fields)
  });
}

export async function sendQuoteNotification(input: QuoteInput) {
  const fields = [
    { label: "Name", value: input.name },
    { label: "Business name", value: input.businessName },
    { label: "Email", value: input.email },
    { label: "Phone", value: input.phone },
    { label: "Industry", value: input.industry },
    { label: "Needs", value: input.needs },
    { label: "Budget range", value: input.budgetRange },
    { label: "Timeline", value: input.timeline },
    { label: "Goals", value: input.goals }
  ];

  await sendEmail({
    subject: `New Oweba quote request from ${input.businessName}`,
    replyTo: input.email,
    html: buildHtmlEmail("Quote request", "A new quote request was submitted from the Oweba website.", fields),
    text: buildTextEmail("Quote request", fields)
  });
}

export async function sendPreviewNotification(email: string, businessName: string, preview: PreviewOutput) {
  const fields = [
    { label: "Business name", value: businessName },
    { label: "Email", value: email },
    { label: "Headline", value: preview.headline },
    { label: "Primary CTA", value: preview.primaryCta }
  ];

  await sendEmail({
    subject: `New Oweba preview request from ${businessName}`,
    replyTo: email,
    html: buildHtmlEmail("Preview request", "A new preview request was submitted from the Oweba website.", fields),
    text: buildTextEmail("Preview request", fields)
  });
}
