'use client';

import { memo, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GalleryCanvas from './ui/gallery/GalleryCanvas';
import { SAMPLE_IMAGES } from '@/lib/constants/projects';
import { GALLERY_CONFIG } from '@/lib/constants/gallery';
import KeyboardHint from './ui/KeyboardHint';
import HelpButton from './ui/HelpButton';
import HeroOverlay from './HeroOverlay';

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
 *
 * No further static markup can be extracted into a Server Component without
 * breaking the hook dependencies that live in this component.
 */
const Hero = memo(({ onImagesLoaded }: { onImagesLoaded?: () => void }) => {
  const router = useRouter();
  const [showHint, setShowHint] = useState(true);
  const [hasSeenHint, setHasSeenHint] = useState(false);
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
    (slug: string) => {
      router.push(`/project/${slug}`);
    },
    [router],
  );

  return (
    <main className="min-h-screen h-full w-full">
      {/* 3-D gallery — client-only, WebGL */}
      <GalleryCanvas
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

      {/* Static title overlay — server component, zero JS */}
      <HeroOverlay />

      {/* Keyboard hint — desktop, first-time visitors only */}
      {!hasSeenHint && showHint && (
        <div className="hidden md:block">
          <KeyboardHint
            keys={['↑', '↓', '←', '→']}
            description="Navigate with arrow keys"
            onDismiss={handleDismissHint}
          />
        </div>
      )}

      {/* Help button — desktop only */}
      <div className="hidden md:block">
        <HelpButton
          shortcuts={SHORTCUTS}
          isOpen={showHelp}
          onToggle={() => setShowHelp((p) => !p)}
        />
      </div>
    </main>
  );
});

Hero.displayName = 'Hero';

export default Hero;
