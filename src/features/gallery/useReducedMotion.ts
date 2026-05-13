'use client';

import { useEffect, useState } from 'react';

/**
 * useReducedMotion — reads the browser's `prefers-reduced-motion` media query.
 *
 * Returns `true` when the user has requested reduced motion, `false` otherwise.
 * Defaults to `false` on the server (SSR) so the WebGL gallery is rendered
 * initially; the value is corrected on the client after hydration.
 *
 * Prefer this hook over framer-motion's `useReducedMotion` inside gallery
 * modules so the gallery feature has no framer-motion dependency.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
