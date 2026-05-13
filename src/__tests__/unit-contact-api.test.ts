/**
 * Unit tests — POST /api/contact
 *
 * Covers:
 *   - Invalid email returns 400
 *   - Short message returns 400
 *   - Missing name returns 400
 *   - Honeypot field returns 200 without calling the provider
 *   - Valid payload calls the provider and returns { ok: true }
 *   - Provider failure returns 500
 *   - Rate-limited request returns 429
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// ── Mock the service layer so no real email is sent ──────────────────────────
vi.mock('@/server/contact/contactService', () => ({
  sendContactMessage: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/server/contact/rateLimiter', () => ({
  checkRateLimit: vi.fn().mockResolvedValue(true),
}));

import { POST } from '@/app/api/contact/route';
import { sendContactMessage } from '@/server/contact/contactService';
import { checkRateLimit } from '@/server/contact/rateLimiter';

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeRequest(body: unknown, ip = '127.0.0.1'): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

const VALID = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'Hello, this is a test message.',
};

// ── Tests ────────────────────────────────────────────────────────────────────

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(sendContactMessage).mockResolvedValue(undefined);
    vi.mocked(checkRateLimit).mockResolvedValue(true);
  });

  it('returns 400 for invalid email', async () => {
    const res = await POST(makeRequest({ ...VALID, email: 'not-an-email' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it('returns 400 for message shorter than 5 characters', async () => {
    const res = await POST(makeRequest({ ...VALID, message: 'Hi' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 for name shorter than 2 characters', async () => {
    const res = await POST(makeRequest({ ...VALID, name: 'A' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 for missing required fields', async () => {
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    expect(res.status).toBe(400);
  });

  it('returns 200 without calling provider when honeypot is filled', async () => {
    const res = await POST(makeRequest({ ...VALID, honeypot: 'bot-value' }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it('calls sendContactMessage and returns { ok: true } for valid payload', async () => {
    const res = await POST(makeRequest(VALID));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(sendContactMessage).toHaveBeenCalledWith(
      expect.objectContaining({ name: VALID.name, email: VALID.email }),
    );
  });

  it('returns 500 when provider throws', async () => {
    vi.mocked(sendContactMessage).mockRejectedValueOnce(new Error('SMTP error'));
    const res = await POST(makeRequest(VALID));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe('Server error');
  });

  it('returns 429 when rate limit is exceeded', async () => {
    vi.mocked(checkRateLimit).mockResolvedValueOnce(false);
    const res = await POST(makeRequest(VALID));
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error).toMatch(/too many/i);
  });

  it('does not call provider when rate-limited', async () => {
    vi.mocked(checkRateLimit).mockResolvedValueOnce(false);
    await POST(makeRequest(VALID));
    expect(sendContactMessage).not.toHaveBeenCalled();
  });
});
