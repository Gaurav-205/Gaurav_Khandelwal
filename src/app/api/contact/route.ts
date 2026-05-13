/**
 * POST /api/contact
 *
 * Pipeline:
 *   1. Parse JSON body
 *   2. Validate with Zod (ContactSchema)
 *   3. Silently discard honeypot submissions
 *   4. Rate-limit by IP (3 req / 10 min via Upstash — skipped if not configured)
 *   5. Dispatch via contactService (Resend in prod, no-op in dev)
 *   6. Return { ok: true } or a generic error
 *
 * Security:
 *   - No personal data is logged in production
 *   - Generic error responses avoid leaking internal details
 *   - Rate limiting prevents spam (requires Upstash env vars — see rateLimiter.ts)
 *   - Honeypot silently accepts bot submissions so bots don't know they were blocked
 */

import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '@/server/contact/contactSchema';
import { sendContactMessage } from '@/server/contact/contactService';
import { checkRateLimit } from '@/server/contact/rateLimiter';

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse ────────────────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // ── 2. Validate ─────────────────────────────────────────────────────────
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // ── 3. Honeypot ─────────────────────────────────────────────────────────
    if (parsed.data.honeypot) {
      return NextResponse.json({ ok: true });
    }

    // ── 4. Rate limit ────────────────────────────────────────────────────────
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';

    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    // ── 5. Send ──────────────────────────────────────────────────────────────
    await sendContactMessage(parsed.data);

    // ── 6. Respond ───────────────────────────────────────────────────────────
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
