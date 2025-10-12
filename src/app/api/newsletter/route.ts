import { NextResponse } from "next/server";

// Simple in-memory rate limiter (per-IP) for demo purposes
const buckets = new Map<string, { tokens: number; updatedAt: number }>();
const CAPACITY = 10; // max 10 requests per hour per IP
const REFILL_MS = 60 * 60 * 1000; // 1 hour

function allow(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip) ?? { tokens: CAPACITY, updatedAt: now };
  // Refill based on elapsed time
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
    const email: string = (body?.email || "").toString().trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    // TODO: Integrate with ESP (Resend/Mailchimp/Brevo) here.
    // For now, no-op success response.
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
