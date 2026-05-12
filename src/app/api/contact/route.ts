import { NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
  honeypot: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Basic spam honeypot
    if (parsed.data.honeypot) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // TODO: Wire up an email provider or serverless mailer here (SendGrid, Mailgun, Nodemailer + SMTP).
    // For now, we log the incoming message and return success so deploys don't fail.
    console.info('Contact form submission:', parsed.data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
