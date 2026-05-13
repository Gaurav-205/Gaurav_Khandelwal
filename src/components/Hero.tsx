'use client';

import { memo, useCallback, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useReducedMotion } from '@/features/gallery/useReducedMotion';
import { SAMPLE_IMAGES } from '@/lib/constants/projects';
import { GALLERY_CONFIG } from '@/lib/constants/gallery';
import GalleryFallback from '@/features/gallery/GalleryFallback';
import KeyboardHint from './ui/KeyboardHint';
import HelpButton from './ui/HelpButton';
import HeroOverlay from './HeroOverlay';

const GalleryCanvasDynamic = dynamic(() => import('@/features/gallery/GalleryCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="h-screen w-full rounded-lg overflow-hidden bg-zinc-950 animate-pulse"
      role="status"
      aria-label="Loading gallery"
    />
  ),
});

const SHORTCUTS = [
  { key: '↑ ↓ ← →', description: 'Navigate gallery' },
  { key: 'Enter / Space', description: 'Pause/Resume auto-play' },
  { key: 'ESC', description: 'Go back' },
  { key: 'Mouse Wheel', description: 'Scroll gallery' },
  { key: '?', description: 'Show this help' },
];

/**
 * Hero — `'use client'` boundary (intentional and minimal).
 *
 * This component calls `useRouter`, `useState`, `useEffect`, and reads
 * `localStorage` — all browser-only APIs that are unavailable in React Server
 * Components. The client boundary therefore cannot be pushed further up or
 * further down without breaking these hook dependencies.
 *
 * Children rendered inside this client tree:
 * - `HeroOverlay` — a React Server Component that renders the static title
 *   overlay; it ships zero JavaScript to the browser.
 * - `GalleryCanvas` — a WebGL client component that drives the 3-D gallery.
 * - `GalleryFallback` — a plain CSS/image grid shown when the user has
 *   `prefers-reduced-motion: reduce` set. No Three.js, no framer-motion.
 *
 * The `'use client'` boundary is intentional and minimal. No further static
 * markup can be extracted without breaking the hook dependencies.
 */
const Hero = memo(({ onImagesLoaded }: { onImagesLoaded?: () => void }) => {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [hasSeenHint, setHasSeenHint] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenKeyboardHint');
    if (seen) {
      setShowHint(false);
      setHasSeenHint(true);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowHelp((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleDismissHint = useCallback(() => {
    localStorage.setItem('hasSeenKeyboardHint', 'true');
    setHasSeenHint(true);
  }, []);

  const handleImageClick = useCallback(
    (slug: string) => router.push(`/project/${slug}`),
    [router],
  );

  return (
    <main className="min-h-screen h-full w-full">
      {reducedMotion ? (
        // Reduced-motion path: plain static grid, no WebGL, no animation.
        <GalleryFallback
          images={SAMPLE_IMAGES}
          onImageClick={handleImageClick}
          onImagesLoaded={onImagesLoaded}
          reason="reduced-motion"
        />
      ) : (
        // WebGL path: dynamically imported so Three.js is never bundled for
        // users who never reach this branch. GalleryCanvas handles its own
        // WebGL-unavailable fallback internally.
        <GalleryCanvasDynamic
          images={SAMPLE_IMAGES}
          speed={GALLERY_CONFIG.SPEED}
          zSpacing={GALLERY_CONFIG.Z_SPACING}
          visibleCount={GALLERY_CONFIG.VISIBLE_COUNT}
          falloff={GALLERY_CONFIG.FALLOFF}
          fadeSettings={GALLERY_CONFIG.FADE_SETTINGS}
          blurSettings={GALLERY_CONFIG.BLUR_SETTINGS}
          onImageClick={handleImageClick}
          onImagesLoaded={onImagesLoaded}
          className="h-screen w-full rounded-lg overflow-hidden"
        />
      )}

      {/* Static title overlay — server component, zero JS */}
      <HeroOverlay />

      {/* Keyboard hint and help — only shown in the WebGL path */}
      {!reducedMotion && !hasSeenHint && showHint && (
        <div className="hidden md:block">
          <KeyboardHint
            keys={['↑', '↓', '←', '→']}
            description="Navigate with arrow keys"
            onDismiss={handleDismissHint}
          />
        </div>
      )}

      {!reducedMotion && (
        <div className="hidden md:block">
          <HelpButton
            shortcuts={SHORTCUTS}
            isOpen={showHelp}
            onToggle={() => setShowHelp((p) => !p)}
          />
        </div>
      )}
    </main>
  );
});

Hero.displayName = 'Hero';

export default Hero;
