/**
 * Rate limiter for POST /api/contact.
 *
 * Uses Upstash Redis + @upstash/ratelimit (sliding window).
 * Limit: 3 requests per IP per 10 minutes.
 *
 * Setup (Upstash free tier — 10,000 requests/day):
 *   1. Create a Redis database at https://console.upstash.com
 *   2. Copy the REST URL and token
 *   3. Add to Vercel environment variables:
 *        UPSTASH_REDIS_REST_URL=https://...
 *        UPSTASH_REDIS_REST_TOKEN=...
 *   4. These are server-only — no NEXT_PUBLIC_ prefix
 *
 * If Upstash is not configured (env vars missing), rate limiting is skipped
 * gracefully so local development and preview deploys are not blocked.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis }     from '@upstash/redis';

let ratelimit: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  if (ratelimit) return ratelimit;

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Not configured — skip rate limiting (dev / preview)
    return null;
  }

  ratelimit = new Ratelimit({
    redis:     Redis.fromEnv(),
    limiter:   Ratelimit.slidingWindow(3, '10 m'),
    analytics: false,
    prefix:    'portfolio:contact',
  });

  return ratelimit;
}

/**
 * Returns true if the request should be allowed, false if rate-limited.
 * Always returns true when Upstash is not configured.
 */
export async function checkRateLimit(ip: string): Promise<boolean> {
  const limiter = getRateLimiter();
  if (!limiter) return true;

  const { success } = await limiter.limit(ip);
  return success;
}
