/**
 * src/lib/analytics.ts — interaction tracking.
 *
 * What this does:
 *   Tracks page views and interaction events. In production it forwards events
 *   to Vercel Web Analytics (https://vercel.com/docs/analytics) via the
 *   `window.va` function that Vercel injects when Analytics is enabled in the
 *   project dashboard. No personal data is collected; Vercel Analytics is
 *   privacy-friendly and GDPR-compliant by default.
 *
 * What this does NOT do:
 *   - It does not store events in localStorage.
 *   - It does not send data to any third-party service other than Vercel.
 *   - It does not set cookies or fingerprint users.
 *
 * Local development:
 *   `window.va` is not injected locally, so all calls are no-ops in dev.
 *   Events are logged to the console in development so you can verify
 *   instrumentation without needing a live Vercel deployment.
 *
 * To enable in production:
 *   1. Go to your Vercel project → Analytics tab → Enable.
 *   2. Deploy. Vercel injects the `va` script automatically.
 *   No code changes are needed.
 *
 * To swap for a different provider (e.g. Plausible, Fathom):
 *   Replace the `sendEvent` function below. The rest of the module is
 *   provider-agnostic.
 */

declare global {
  interface Window {
    /** Injected by Vercel Analytics when enabled in the project dashboard. */
    va?: (command: 'event', name: string, properties?: Record<string, string>) => void;
  }
}

const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Low-level send. Calls `window.va` if available; logs to console in dev.
 * Safe to call on the server — the `typeof window` guard prevents SSR errors.
 */
function sendEvent(name: string, properties?: Record<string, string>): void {
  if (typeof window === 'undefined') return;

  if (IS_DEV) {
    console.log('[analytics]', name, properties ?? '');
    return;
  }

  window.va?.('event', name, properties);
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Track a page view. Call once per route change. */
export function trackPageView(page: string): void {
  sendEvent('page_view', { page });
}

/** Track a click on a project card or detail page. */
export function trackProjectClick(slug: string, title: string): void {
  sendEvent('project_click', { slug, title });
}

/** Track a click on an external link (GitHub, LinkedIn, live site). */
export function trackExternalLink(url: string, label: string): void {
  sendEvent('external_link', { url, label });
}

/** Track a click on a call-to-action button (Get in touch, Send Email, etc.). */
export function trackCTAClick(cta: string, location: string): void {
  sendEvent('cta_click', { cta, location });
}
