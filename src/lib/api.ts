import { ZodSchema } from "zod";

export async function parseBody<T>(request: Request, schema: ZodSchema<T>) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return {
      ok: false as const,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    ok: true as const,
    data: parsed.data,
  };
}

export function jsonError(message: string, status = 400) {
  return Response.json({ success: false, message }, { status });
}
