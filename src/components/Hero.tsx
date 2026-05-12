'use client';

import { memo, useCallback, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import { SAMPLE_IMAGES } from '@/lib/constants/projects';
import { GALLERY_CONFIG } from '@/lib/constants/gallery';
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

function ReducedMotionGallery({
  onImagesLoaded,
  onImageClick,
}: {
  onImagesLoaded?: () => void;
  onImageClick: (slug: string) => void;
}) {
  useEffect(() => {
    onImagesLoaded?.();
  }, [onImagesLoaded]);

  return (
    <div className="h-screen w-full overflow-y-auto bg-black px-4 py-24 md:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
        {SAMPLE_IMAGES.map((img) => (
          <button
            key={img.slug}
            type="button"
            onClick={() => onImageClick(img.slug)}
            className="group rounded-lg border border-white/10 bg-zinc-900/60 text-left overflow-hidden transition-colors hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <p className="px-4 py-3 font-montserrat text-sm text-white/80 group-hover:text-white">{img.alt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

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
  const reducedMotion = useReducedMotion();
  const [showHint, setShowHint] = useState(true);
  const [hasSeenHint, setHasSeenHint] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const useStaticGallery = reducedMotion === true;

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
      {useStaticGallery ? (
        <ReducedMotionGallery onImagesLoaded={onImagesLoaded} onImageClick={handleImageClick} />
      ) : (
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

      <HeroOverlay />

      {!useStaticGallery && !hasSeenHint && showHint && (
        <div className="hidden md:block">
          <KeyboardHint
            keys={['↑', '↓', '←', '→']}
            description="Navigate with arrow keys"
            onDismiss={handleDismissHint}
          />
        </div>
      )}

      {!useStaticGallery && (
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
