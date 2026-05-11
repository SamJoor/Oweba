import { parseBody, jsonError } from "@/lib/api";
import { getContactFailureMessage, logEmailError, sendContactNotification } from "@/lib/email";
import { saveContactLead } from "@/lib/lead-store";
import { contactSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = await parseBody(request, contactSchema);

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
    await Promise.all([saveContactLead(parsed.data), sendContactNotification(parsed.data)]);
    return Response.json({ success: true });
  } catch (error) {
    logEmailError("Contact submission failed", error);
    return jsonError(getContactFailureMessage(error), 500);
  }
}
