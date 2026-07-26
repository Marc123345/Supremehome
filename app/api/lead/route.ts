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

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept so bots don't learn they were caught.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();

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
    propertyType: body.propertyType ?? "",
    city: body.city ?? "",
    service: body.service ?? "",
    message: body.message?.trim() ?? "",
  };

  // TODO: forward `lead` to email / CRM before launch.
  console.log("[supreme-home] new lead", lead);

  return NextResponse.json({ ok: true });
}
