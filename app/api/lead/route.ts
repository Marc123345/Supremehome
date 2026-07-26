import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * ⚠️ DELIVERY IS NOT WIRED UP YET.
 * Right now this validates the submission and logs it server-side so the form
 * works end to end. Before launch, plug in one of:
 *
 *   • Resend / Postmark / SendGrid → email tyler@mysupremehome.com
 *   • The client's CRM webhook (JobNimbus, AccuLynx, Acculynx, etc.)
 *   • A Jotform submission endpoint (they already use Jotform)
 *
 * Replace the `TODO` block below. Until then leads only appear in server logs,
 * so the phone number stays the primary conversion path.
 */

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  propertyType?: string;
  city?: string;
  service?: string;
  message?: string;
  company_website?: string; // honeypot
};

/** Field caps. Without these a single request could log megabytes. */
const LIMITS = {
  name: 120,
  phone: 40,
  email: 200,
  propertyType: 60,
  city: 60,
  service: 120,
  message: 4000,
} as const;

const MAX_BODY_BYTES = 16_000;

function clamp(value: string | undefined, max: number) {
  return (value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  // Reject oversized payloads before parsing them.
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message too long." }, { status: 413 });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message too long." }, { status: 413 });
  }

  let body: LeadPayload;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept so bots don't learn they were caught.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = clamp(body.name, LIMITS.name);
  const phone = clamp(body.phone, LIMITS.phone);
  const email = clamp(body.email, LIMITS.email);

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Please provide your name, phone and email." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name,
    phone,
    email,
    propertyType: clamp(body.propertyType, LIMITS.propertyType),
    city: clamp(body.city, LIMITS.city),
    service: clamp(body.service, LIMITS.service),
    message: clamp(body.message, LIMITS.message),
  };

  // TODO: forward `lead` to email / CRM before launch.
  console.log("[supreme-home] new lead", lead);

  return NextResponse.json({ ok: true });
}
