/**
 * contactService — provider-agnostic email dispatch.
 *
 * Selects the active provider based on environment:
 *   - RESEND_API_KEY is set  → Resend (production)
 *   - otherwise              → no-op (development / test)
 *
 * To add a new provider (SendGrid, Nodemailer, etc.):
 *   1. Create src/server/contact/providers/yourProvider.ts
 *   2. Add a branch here
 *   3. Add the required env vars to .env.example and Vercel
 */

import type { ContactPayload } from './contactSchema';
import { sendViaResend } from './providers/resendProvider';
import { sendViaNoop }   from './providers/noopProvider';

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(payload);
  }
  return sendViaNoop(payload);
}
