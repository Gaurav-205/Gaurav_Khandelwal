"use client";

import { useState } from 'react';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
  honeypot: z.string().optional(),
});

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
      setError('Please complete the form correctly.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      form.reset();
    } catch (err: any) {
      setStatus('error');
      setError(err?.message ?? 'Unknown error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <input type="hidden" name="honeypot" />
      <div className="mb-3">
        <label className="block text-white mb-1">Name</label>
        <input name="name" required className="w-full p-2 rounded bg-black/30 border border-white/10 text-white" />
      </div>
      <div className="mb-3">
        <label className="block text-white mb-1">Email</label>
        <input name="email" type="email" required className="w-full p-2 rounded bg-black/30 border border-white/10 text-white" />
      </div>
      <div className="mb-3">
        <label className="block text-white mb-1">Message</label>
        <textarea name="message" rows={6} required className="w-full p-2 rounded bg-black/30 border border-white/10 text-white" />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === 'sending'} className="px-6 py-2 bg-white text-black rounded-full">
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'success' && <span className="text-green-400">Message sent — I will reply soon.</span>}
        {status === 'error' && <span className="text-red-400">{error}</span>}
      </div>
    </form>
  );
}
