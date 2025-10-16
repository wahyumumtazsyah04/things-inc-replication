import { NextResponse } from "next/server";

// Simple token-bucket rate limiter per IP
const buckets = new Map<string, { tokens: number; updatedAt: number }>();
const CAPACITY = 8; // 8 requests per hour per IP
const REFILL_MS = 60 * 60 * 1000; // 1 hour

function allow(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip) ?? { tokens: CAPACITY, updatedAt: now };
  const elapsed = now - bucket.updatedAt;
  if (elapsed > REFILL_MS) {
    bucket.tokens = CAPACITY;
    bucket.updatedAt = now;
  }
  if (bucket.tokens <= 0) {
    buckets.set(ip, bucket);
    return false;
  }
  bucket.tokens -= 1;
  bucket.updatedAt = now;
  buckets.set(ip, bucket);
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    if (!allow(ip)) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const name: string = (body?.name || "").toString().trim();
    const email: string = (body?.email || "").toString().trim();
    const message: string = (body?.message || "").toString().trim();

    // Basic validations
    const errors: Record<string, string> = {};
    if (!name || name.length < 2) errors.name = "Name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) errors.email = "Valid email is required";
    if (!message || message.length < 10) errors.message = "Message must be at least 10 characters";

    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, error: "invalid_input", errors }, { status: 400 });
    }

    // TODO: Integrate with email/CRM provider (e.g., Resend, EmailJS, Mailgun)
    // For now, simulate success.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
