import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class names, resolving conflicts correctly. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Detect WebGL support by attempting to create a context on a scratch canvas. */
export function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

/** Build a Gmail compose URL with optional subject and body. */
export function getGmailComposeUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  params.append('to', email);
  if (subject) params.append('su', subject);
  if (body) params.append('body', body);
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
}

/**
 * Returns a throttled version of `fn` that fires at most once per `limitMs`.
 *
 * The generic `<T extends unknown[]>` constraint avoids `this: any` and keeps
 * the parameter types fully inferred at the call site.
 */
export function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  limitMs: number,
): (...args: T) => void {
  let lastCall = 0;
  return (...args: T): void => {
    const now = Date.now();
    if (now - lastCall >= limitMs) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Returns a debounced version of `fn` that fires only after `delayMs` of
 * silence. Clears the pending timer on each new call.
 */
export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  delayMs: number,
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: T): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}
