import { parseBody, jsonError } from "@/lib/api";
import { getQuoteFailureMessage, logEmailError, sendQuoteNotification } from "@/lib/email";
import { saveQuoteLead } from "@/lib/lead-store";
import { quoteSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = await parseBody(request, quoteSchema);

  if (!parsed.ok) {
    return Response.json(
      { success: false, errors: parsed.errors, message: "Please fix the highlighted fields and try again." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return jsonError("Spam submission blocked.", 400);
  }

  try {
    await Promise.all([saveQuoteLead(parsed.data), sendQuoteNotification(parsed.data)]);
    return Response.json({ success: true });
  } catch (error) {
    logEmailError("Quote submission failed", error);
    return jsonError(getQuoteFailureMessage(error), 500);
  }
}
