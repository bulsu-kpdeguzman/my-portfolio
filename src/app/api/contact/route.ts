import { site } from "@/data/site";

export const runtime = "nodejs";

const MAX_NAME = 80;
const MAX_MESSAGE = 4000;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Not configured." }, { status: 500 });
  }

  let body: { name?: unknown; message?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME) : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!message || message.length > MAX_MESSAGE) {
    return Response.json({ error: "Message required." }, { status: 400 });
  }
  if (body.website) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [site.email.toLowerCase()],
      subject: `Portfolio message from ${name || "someone"}`,
      text: `${message}\n\n— ${name || "Anonymous"}`,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "Send failed." }, { status: 502 });
  }

  return Response.json({ ok: true });
}