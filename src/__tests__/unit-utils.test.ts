/**
 * Unit tests — src/lib/utils.ts
 *
 * Covers: cn, getGmailComposeUrl, throttle, debounce.
 * checkWebGLSupport is a DOM API wrapper — tested implicitly via GalleryCanvas.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cn, getGmailComposeUrl, throttle, debounce } from '@/lib/utils';

// ── cn ───────────────────────────────────────────────────────────────────────

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('resolves Tailwind conflicts — last wins', () => {
    // tailwind-merge keeps the last conflicting utility
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('ignores falsy values', () => {
    expect(cn('a', false && 'b', undefined, null, 'c')).toBe('a c');
  });

  it('handles conditional objects', () => {
    expect(cn({ 'font-bold': true, 'italic': false })).toBe('font-bold');
  });

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('');
  });
});

// ── getGmailComposeUrl ───────────────────────────────────────────────────────

describe('getGmailComposeUrl', () => {
  it('includes the to address', () => {
    const url = getGmailComposeUrl('test@example.com');
    expect(url).toContain('to=test%40example.com');
  });

  it('includes subject when provided', () => {
    const url = getGmailComposeUrl('a@b.com', 'Hello World');
    expect(url).toContain('su=Hello+World');
  });

  it('includes body when provided', () => {
    const url = getGmailComposeUrl('a@b.com', undefined, 'Hi there');
    expect(url).toContain('body=Hi+there');
  });

  it('omits subject param when not provided', () => {
    const url = getGmailComposeUrl('a@b.com');
    expect(url).not.toContain('su=');
  });

  it('starts with the Gmail compose base URL', () => {
    const url = getGmailComposeUrl('a@b.com');
    expect(url).toMatch(/^https:\/\/mail\.google\.com\/mail\/\?/);
  });
});

// ── throttle ─────────────────────────────────────────────────────────────────

describe('throttle', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('calls the function immediately on first invocation', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('suppresses calls within the limit window', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();              // t=0  → fires (lastCall=0)
    vi.advanceTimersByTime(50);
    throttled();              // t=50 → suppressed (50 < 100)
    vi.advanceTimersByTime(30);
    throttled();              // t=80 → suppressed (80 < 100)
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('allows a second call after the limit window passes', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    vi.advanceTimersByTime(101);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('passes arguments through correctly', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled('a', 1);
    expect(fn).toHaveBeenCalledWith('a', 1);
  });
});

// ── debounce ─────────────────────────────────────────────────────────────────

describe('debounce', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('does not call the function before the delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);
    debounced();
    vi.advanceTimersByTime(199);
    expect(fn).not.toHaveBeenCalled();
  });

  it('calls the function after the delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);
    debounced();
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets the timer on each call — only fires once after the last call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);
    debounced();
    vi.advanceTimersByTime(100);
    debounced();
    vi.advanceTimersByTime(100);
    debounced();
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes the most recent arguments', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced('first');
    debounced('second');
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('second');
  });
});
