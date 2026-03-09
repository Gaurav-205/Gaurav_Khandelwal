'use client';

import { memo, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InfiniteGallery from './ui/3d-gallery-photography';
import { SAMPLE_IMAGES } from '@/lib/constants/projects';
import { GALLERY_CONFIG } from '@/lib/constants/gallery';
import { Z_INDEX } from '@/lib/constants/zIndex';
import KeyboardHint from './ui/KeyboardHint';
import HelpButton from './ui/HelpButton';

const Hero = memo(({ onImagesLoaded }: { onImagesLoaded?: () => void }) => {
  const router = useRouter();
  const [showHint, setShowHint] = useState(true);
  const [hasSeenHint, setHasSeenHint] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // Check if user has seen the hint before
    const seen = localStorage.getItem('hasSeenKeyboardHint');
    if (seen) {
      setShowHint(false);
      setHasSeenHint(true);
    }

    // Listen for "?" key to toggle help
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowHelp(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleDismissHint = useCallback(() => {
    localStorage.setItem('hasSeenKeyboardHint', 'true');
    setHasSeenHint(true);
  }, []);

  const handleImageClick = useCallback((slug: string) => {
    router.push(`/project/${slug}`);
  }, [router]);

  const shortcuts = [
    { key: '↑ ↓ ← →', description: 'Navigate gallery' },
    { key: 'Enter / Space', description: 'Pause/Resume auto-play' },
    { key: 'ESC', description: 'Go back' },
    { key: 'Mouse Wheel', description: 'Scroll gallery' },
    { key: '?', description: 'Show this help' },
  ];

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
        onImagesLoaded={onImagesLoaded}
        className="h-screen w-full rounded-lg overflow-hidden"
      />
      
      {/* Main title overlay - perfectly centered */}
      <div 
        className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center mix-blend-exclusion text-white"
        style={{ zIndex: Z_INDEX.GALLERY_OVERLAY }}
      >
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-7xl tracking-tight">
            <span className="italic">Gaurav Khandelwal</span>
          </h1>
          <p className="mt-4 text-white/60 font-montserrat text-sm tracking-widest">
            {SAMPLE_IMAGES.length} PROJECTS
          </p>
        </div>
      </div>
      
      {/* Keyboard Hint - Desktop only, first time visitors */}
      {!hasSeenHint && showHint && (
        <div className="hidden md:block">
          <KeyboardHint 
            keys={['↑', '↓', '←', '→']} 
            description="Navigate with arrow keys"
            onDismiss={handleDismissHint}
          />
        </div>
      )}

      {/* Help Button - Desktop only */}
      <div className="hidden md:block">
        <HelpButton shortcuts={shortcuts} isOpen={showHelp} onToggle={() => setShowHelp(!showHelp)} />
      </div>
    </main>
  );
});

Hero.displayName = 'Hero';

export default Hero;