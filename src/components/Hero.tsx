'use client';

import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import InfiniteGallery from './ui/3d-gallery-photography';
import { SAMPLE_IMAGES, GALLERY_CONFIG, Z_INDEX } from '@/lib/constants';

const Hero = memo(() => {
  const router = useRouter();

  const handleImageClick = useCallback((slug: string) => {
    router.push(`/project/${slug}`);
  }, [router]);

  return (
    <main className="min-h-screen h-full w-full">
      <InfiniteGallery
        images={SAMPLE_IMAGES}
        speed={GALLERY_CONFIG.SPEED}
        zSpacing={GALLERY_CONFIG.Z_SPACING}
        visibleCount={GALLERY_CONFIG.VISIBLE_COUNT}
        falloff={GALLERY_CONFIG.FALLOFF}
        fadeSettings={GALLERY_CONFIG.FADE_SETTINGS}
        blurSettings={GALLERY_CONFIG.BLUR_SETTINGS}
        onImageClick={handleImageClick}
        className="h-screen w-full rounded-lg overflow-hidden"
      />
      
      {/* Main title overlay - perfectly centered */}
      <div 
        className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center mix-blend-exclusion text-white"
        style={{ zIndex: Z_INDEX.GALLERY_OVERLAY }}
      >
        <h1 className="font-serif text-4xl md:text-7xl tracking-tight text-center">
          <span className="italic">Piyusha Bhalerao</span>
        </h1>
      </div>
      
      {/* Navigation instructions */}
      <div 
        className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold text-white px-4"
        style={{ zIndex: Z_INDEX.GALLERY_OVERLAY }}
        role="status"
        aria-live="polite"
      >
        <p className="hidden md:block">Use mouse wheel, arrow keys to navigate • Click images or press Enter/Space to view projects</p>
        <p className="block md:hidden">Swipe, pinch to zoom, or tap images to navigate</p>
        <p className="opacity-60">Auto-play resumes after 3 seconds of inactivity</p>
      </div>
    </main>
  );
});

Hero.displayName = 'Hero';

export default Hero;