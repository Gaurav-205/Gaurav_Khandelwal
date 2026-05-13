'use client';

/**
 * GalleryFallback — plain non-WebGL gallery grid.
 *
 * Used in two situations:
 *   1. WebGL is unavailable (detected by GalleryCanvas after mount).
 *   2. The user has `prefers-reduced-motion: reduce` set (detected by Hero).
 *
 * Renders a responsive grid of clickable project cards. Each card navigates
 * to the project detail page via the `onImageClick` callback, matching the
 * behaviour of the 3-D gallery exactly.
 *
 * No Three.js, no framer-motion, no animation — intentionally static.
 */

import { memo, useEffect } from 'react';
import Image from 'next/image';
import type { NormalizedImage } from './useTextureLoader';

interface GalleryFallbackProps {
  images: NormalizedImage[];
  /** Called with the project slug when a card is clicked. */
  onImageClick?: (slug: string) => void;
  /** Called once on mount so the loading screen can be dismissed. */
  onImagesLoaded?: () => void;
  /** Reason shown as a small accessible label above the grid. */
  reason?: 'no-webgl' | 'reduced-motion';
}

const REASON_LABEL: Record<NonNullable<GalleryFallbackProps['reason']>, string> = {
  'no-webgl': 'WebGL is not available in this browser.',
  'reduced-motion': 'Animations are reduced based on your system preferences.',
};

const GalleryFallback = memo(
  ({ images, onImageClick, onImagesLoaded, reason }: GalleryFallbackProps) => {
    // Signal the loading screen immediately — no async texture loading needed.
    useEffect(() => {
      onImagesLoaded?.();
    }, [onImagesLoaded]);

    return (
      <div className="h-screen w-full overflow-y-auto bg-black px-4 py-24 md:py-28">
        {reason && (
          <p className="sr-only" role="status">
            {REASON_LABEL[reason]}
          </p>
        )}

        <div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2"
          role="list"
          aria-label="Project gallery"
        >
          {images.map((img) => (
            <div key={img.slug} role="listitem">
              {onImageClick && img.slug ? (
                <button
                  type="button"
                  onClick={() => onImageClick(img.slug)}
                  className="group w-full rounded-lg border border-white/10 bg-zinc-900/60 text-left overflow-hidden transition-colors hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  aria-label={`View project: ${img.alt}`}
                >
                  <CardInner img={img} clickable />
                </button>
              ) : (
                <div className="w-full rounded-lg border border-white/10 bg-zinc-900/60 overflow-hidden">
                  <CardInner img={img} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

GalleryFallback.displayName = 'GalleryFallback';

/** Inner card content — shared between the clickable and non-clickable variants. */
function CardInner({ img, clickable = false }: { img: NormalizedImage; clickable?: boolean }) {
  return (
    <>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={img.src || '/projects/coming-soon.png'}
          alt={img.alt || 'Project image'}
          fill
          className={`object-cover transition-[filter] duration-300${clickable ? ' group-hover:brightness-110' : ''}`}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <p className={`px-4 py-3 font-montserrat text-sm transition-colors${clickable ? ' text-white/80 group-hover:text-white' : ' text-white/80'}`}>
        {img.alt}
      </p>
    </>
  );
}

export default GalleryFallback;
