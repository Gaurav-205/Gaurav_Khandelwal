/**
 * No-op provider — used in development and test environments.
 *
 * Logs a redacted summary (no personal data) so you can verify the form
 * pipeline works without sending real email.
 */

import type { ContactPayload } from '../contactSchema';

export async function sendViaNoop(payload: ContactPayload): Promise<void> {
  console.info('[contact:noop] submission received', {
    nameLength:    payload.name.length,
    emailDomain:   payload.email.split('@')[1],
    messageLength: payload.message.length,
  });
}
