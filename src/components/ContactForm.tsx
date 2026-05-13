"use client";

/**
 * ContactForm — client component.
 *
 * Submits to POST /api/contact. The API dispatches via Resend when
 * RESEND_API_KEY is set in the environment, and falls back to a no-op
 * (dev logging only) otherwise.
 *
 * Set NEXT_PUBLIC_CONTACT_API_LIVE=true in Vercel once the provider is
 * configured — this controls the success message shown to users.
 */

import { useState } from 'react';
import { ContactSchema } from '@/server/contact/contactSchema';
import { getGmailComposeUrl } from '@/lib/utils';

const GMAIL_URL = getGmailComposeUrl(
  'gauravkhandelwal205@gmail.com',
  'Portfolio Inquiry',
);

/** Whether the contact API is wired to a real email provider. */
const API_IS_LIVE = process.env.NEXT_PUBLIC_CONTACT_API_LIVE === 'true';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      honeypot: String(data.get('honeypot') ?? ''),
    };

    const parsed = ContactSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus('error');
      setError('Please complete all fields correctly.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {/* Honeypot — hidden from real users, filled by bots */}
      <input type="text" name="honeypot" className="sr-only" tabIndex={-1} aria-hidden="true" />

      <div>
        <label htmlFor="contact-name" className="block text-white font-montserrat text-sm mb-1">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          minLength={2}
          maxLength={100}
          className="w-full p-2 rounded bg-black/30 border border-white/10 text-white font-montserrat text-sm focus:outline-none focus:border-white/40"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-white font-montserrat text-sm mb-1">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          className="w-full p-2 rounded bg-black/30 border border-white/10 text-white font-montserrat text-sm focus:outline-none focus:border-white/40"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-white font-montserrat text-sm mb-1">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          minLength={5}
          maxLength={2000}
          className="w-full p-2 rounded bg-black/30 border border-white/10 text-white font-montserrat text-sm focus:outline-none focus:border-white/40 resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-2 bg-white text-black font-montserrat text-sm tracking-wide rounded-full hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>

        {status === 'success' && (
          <span className="text-green-400 font-montserrat text-sm">
            {API_IS_LIVE
              ? 'Message sent — I will reply soon.'
              : 'Received. To make sure I see it, you can also email me directly.'}
          </span>
        )}

        {status === 'error' && (
          <span className="text-red-400 font-montserrat text-sm">{error}</span>
        )}
      </div>

      {/* Direct email fallback — always visible so no lead is silently lost */}
      <p className="text-white/50 font-montserrat text-xs pt-2">
        Prefer email?{' '}
        <a
          href={GMAIL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white/80 transition-colors"
        >
          gauravkhandelwal205@gmail.com
        </a>
      </p>
    </form>
  );
}
