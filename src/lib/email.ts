import nodemailer from "nodemailer";
import { ContactInput, QuoteInput } from "@/lib/schemas";
import { PreviewOutput } from "@/lib/preview";

type EmailConfig = {
  to: string;
  from: string;
  host: string;
  port: number;
  user: string;
  pass: string;
};

type SmtpError = Error & {
  code?: string;
  command?: string;
  response?: string;
  responseCode?: number;
};

export class EmailConfigurationError extends Error {
  constructor(message = "Email service is not configured.") {
    super(message);
    this.name = "EmailConfigurationError";
  }
}

function getEmailConfig(): EmailConfig {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!to || !from || !host || !user || !pass) {
    throw new EmailConfigurationError(
      "Email service is missing CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, SMTP_HOST, SMTP_USER, or SMTP_PASS."
    );
  }

  if (!Number.isFinite(port)) {
    throw new EmailConfigurationError("SMTP_PORT must be a valid number.");
  }

  return { to, from, host, port, user, pass };
}

function getTransporter() {
  const config = getEmailConfig();

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

export function describeEmailError(error: unknown) {
  if (error instanceof EmailConfigurationError) {
    return error.message;
  }

  if (error instanceof Error) {
    const smtpError = error as SmtpError;

    if (smtpError.response?.includes("SmtpClientAuthentication is disabled")) {
      return "SMTP client authentication is disabled for this Outlook mailbox.";
    }

    if (smtpError.responseCode === 535 || smtpError.code === "EAUTH") {
      return "SMTP rejected the login. Check the mailbox, app password, and whether SMTP AUTH is enabled.";
    }

    if (smtpError.code === "ECONNECTION" || smtpError.code === "ETIMEDOUT") {
      return "SMTP could not connect. Check SMTP_HOST and SMTP_PORT.";
    }

    return error.message;
  }

  return "Unknown email delivery error.";
}

export function logEmailError(context: string, error: unknown) {
  if (!(error instanceof Error)) {
    console.error(context, error);
    return;
  }

  const smtpError = error as SmtpError;

  console.error(context, {
    name: error.name,
    message: describeEmailError(error),
    code: smtpError.code,
    command: smtpError.command,
    responseCode: smtpError.responseCode,
    response: smtpError.response
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
  const mailer = getTransporter();

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
  if (!email) return;
  const mailer = getTransporter();

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
