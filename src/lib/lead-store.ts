import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { PreviewOutput } from "@/lib/preview";
import { ContactInput, PreviewInput, QuoteInput } from "@/lib/schemas";

const dataDirectory = path.join(process.cwd(), "data");
const submissionsPath = path.join(dataDirectory, "lead-submissions.jsonl");

type LeadSubmission =
  | { type: "contact"; submittedAt: string; payload: ContactInput }
  | { type: "quote"; submittedAt: string; payload: QuoteInput }
  | { type: "preview"; submittedAt: string; payload: PreviewInput; preview: PreviewOutput };

async function persistLead(entry: LeadSubmission) {
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(submissionsPath, `${JSON.stringify(entry)}\n`, "utf8");
}

export async function saveContactLead(payload: ContactInput) {
  await persistLead({
    type: "contact",
    submittedAt: new Date().toISOString(),
    payload
  });
}

export async function saveQuoteLead(payload: QuoteInput) {
  await persistLead({
    type: "quote",
    submittedAt: new Date().toISOString(),
    payload
  });
}

export async function savePreviewLead(payload: PreviewInput, preview: PreviewOutput) {
  await persistLead({
    type: "preview",
    submittedAt: new Date().toISOString(),
    payload,
    preview
  });
}
