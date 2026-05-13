/**
 * POST /api/contact
 *
 * Validates the contact form submission and forwards it to a notification
 * pipeline. Until a real provider is wired (see TODO below), the route
 * returns { ok: true } without logging personal data.
 *
 * Security notes:
 *   - Honeypot field silently discards bot submissions.
 *   - Full message payloads are NOT logged in production to avoid collecting
 *     personal data in server logs.
 *   - TODO: Add rate limiting (e.g. Upstash Redis + @upstash/ratelimit) to
 *     prevent spam. One approach: 3 requests per IP per 10 minutes.
 *   - TODO: Add origin check (Referer / Origin header) if CSRF becomes a concern.
 *
 * TODO — wire one real delivery path before going live:
 *   Option A: Resend   → import { Resend } from 'resend'; resend.emails.send(...)
 *   Option B: SendGrid → @sendgrid/mail
 *   Option C: Nodemailer + SMTP (Gmail app password or Mailgun SMTP)
 *   Option D: Netlify Forms (no server code needed — add data-netlify="true" to the form)
 *   Option E: GitHub issue webhook (personal CRM via GitHub API)
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(5).max(2000),
  honeypot: z.string().optional(),
});

const IS_PROD = process.env.NODE_ENV === 'production';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Honeypot — silently accept so bots don't know they were blocked
    if (parsed.data.honeypot) {
      return NextResponse.json({ ok: true });
    }

    // In development, log a redacted summary so you can verify the form works
    // without exposing personal data in production logs.
    if (!IS_PROD) {
      console.info('[contact] submission received', {
        nameLength: parsed.data.name.length,
        emailDomain: parsed.data.email.split('@')[1],
        messageLength: parsed.data.message.length,
      });
    }

    // ── TODO: replace this block with a real provider ──────────────────────
    // Example (Resend):
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: 'portfolio@yourdomain.com',
    //     to: 'gauravkhandelwal205@gmail.com',
    //     subject: `Portfolio contact from ${parsed.data.name}`,
    //     text: parsed.data.message,
    //     replyTo: parsed.data.email,
    //   });
    // ───────────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true });
  } catch {
    // Return a generic error — do not leak internal details
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
