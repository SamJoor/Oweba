import { parseBody, jsonError } from "@/lib/api";
import { sendPreviewNotification } from "@/lib/email";
import { savePreviewLead } from "@/lib/lead-store";
import { getOpenAIClient } from "@/lib/openai";
import { buildFallbackPreview } from "@/lib/preview";
import { previewSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = await parseBody(request, previewSchema);

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
    const fallback = buildFallbackPreview(parsed.data);
    const client = getOpenAIClient();
    let preview = fallback;

    if (client) {
      const response = await client.responses.create({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        input: [
          {
            role: "system",
            content:
              "You create concise, premium website copy for small and medium businesses. Return JSON only with keys headline, supportingCopy, primaryCta, secondaryCta, trustBar, sections. trustBar must be an array of 4 short strings. sections must be an array of 3 objects with title and copy. Keep copy polished, believable, and conversion-aware."
          },
          {
            role: "user",
            content: `Business name: ${parsed.data.businessName}
Industry: ${parsed.data.industry}
Tagline: ${parsed.data.tagline || "N/A"}
Style: ${parsed.data.style}
Goal: ${parsed.data.goal || "Growth"}

Write copy for a premium homepage preview. Avoid hype. Avoid generic phrases. Make it sound like a real business website.`
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "website_preview",
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["headline", "supportingCopy", "primaryCta", "secondaryCta", "trustBar", "sections"],
              properties: {
                headline: { type: "string" },
                supportingCopy: { type: "string" },
                primaryCta: { type: "string" },
                secondaryCta: { type: "string" },
                trustBar: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 4,
                  maxItems: 4
                },
                sections: {
                  type: "array",
                  minItems: 3,
                  maxItems: 3,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["title", "copy"],
                    properties: {
                      title: { type: "string" },
                      copy: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      });

      const raw = response.output_text?.trim();
      if (raw) {
        preview = JSON.parse(raw);
      }
    }

    await Promise.all([
      savePreviewLead(parsed.data, preview),
      parsed.data.contactEmail ? sendPreviewNotification(parsed.data.contactEmail, parsed.data.businessName, preview) : Promise.resolve()
    ]);

    return Response.json({ success: true, preview });
  } catch (error) {
    console.error("Preview generation failed", error);
    return jsonError("We couldn't generate the preview right now. Please try again in a moment.", 500);
  }
}
