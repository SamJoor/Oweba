import { PreviewOutput } from "@/lib/preview";
import { ContactInput, QuoteInput } from "@/lib/schemas";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
  body?: {
    message?: string;
  };
};

export class EmailConfigurationError extends Error {
  constructor(message = "Web3Forms is not configured.") {
    super(message);
    this.name = "EmailConfigurationError";
  }
}

export class EmailDeliveryError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "EmailDeliveryError";
    this.status = status;
  }
}

function getAccessKey() {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new EmailConfigurationError("Email service is missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.");
  }

  return accessKey;
}

async function submitWeb3Form(payload: Record<string, string>) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      access_key: getAccessKey(),
      from_name: "Oweba Website",
      ...payload
    })
  });

  const json = (await response.json().catch(() => null)) as Web3FormsResponse | null;

  if (!response.ok || !json?.success) {
    throw new EmailDeliveryError(
      json?.message || json?.body?.message || "Web3Forms could not send the form submission.",
      response.status
    );
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
    status: error instanceof EmailDeliveryError ? error.status : undefined
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
  await submitWeb3Form({
    subject: `New Oweba call request from ${input.businessName}`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    business_name: input.businessName,
    inquiry_type: "Book a call",
    preferred_time_1: input.preferredTime1 || "N/A",
    preferred_time_2: input.preferredTime2 || "N/A",
    preferred_time_3: input.preferredTime3 || "N/A",
    message: input.message
  });
}

export async function sendQuoteNotification(input: QuoteInput) {
  await submitWeb3Form({
    subject: `New Oweba quote request from ${input.businessName}`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    business_name: input.businessName,
    website_url: input.websiteUrl || "N/A",
    industry: input.industry,
    budget_range: input.budgetRange,
    timeline: input.timeline,
    needs: input.needs,
    goals: input.goals
  });
}

export async function sendPreviewNotification(email: string, businessName: string, preview: PreviewOutput) {
  void email;
  void businessName;
  void preview;
  return;
}
