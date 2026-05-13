/**
 * Resend email provider.
 *
 * Requires:
 *   RESEND_API_KEY   — API key from resend.com (server-only, no NEXT_PUBLIC_ prefix)
 *   CONTACT_FROM     — verified sender address, e.g. "portfolio@yourdomain.com"
 *   CONTACT_TO       — your inbox, e.g. "gauravkhandelwal205@gmail.com"
 *
 * Setup:
 *   1. Sign up at https://resend.com (free tier: 3,000 emails/month)
 *   2. Add and verify your sending domain (or use the Resend sandbox for testing)
 *   3. Create an API key and add it to Vercel environment variables
 *   4. Set CONTACT_FROM and CONTACT_TO in Vercel environment variables
 *   5. Set NEXT_PUBLIC_CONTACT_API_LIVE=true in Vercel environment variables
 */

import { Resend } from 'resend';
import type { ContactPayload } from '../contactSchema';

export async function sendViaResend(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.CONTACT_FROM;
  const to     = process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    throw new Error(
      'Resend provider is not configured. ' +
      'Set RESEND_API_KEY, CONTACT_FROM, and CONTACT_TO in your environment.',
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `Portfolio contact from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      '',
      payload.message,
    ].join('\n'),
  });

  if (error) {
    throw new Error(`Resend delivery failed: ${error.message}`);
  }
}
