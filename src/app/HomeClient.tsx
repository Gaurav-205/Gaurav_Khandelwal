'use client';

import { useState, useEffect, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FadeTransition from '@/components/ui/FadeTransition';

/**
 * Client island for the home page.
 * Owns the first-visit loading screen and image-loaded handshake.
 * Static metadata and layout live in the server component (page.tsx).
 */
export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasSeenLoading', 'true');
    }
  }, []);

  const handleImagesLoaded = useCallback(() => {
    setImagesLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
      if (!hasSeenLoading) {
        setIsLoading(true);
        setShowLoading(true);
      }
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (showLoading && isLoading) {
    return (
      <>
        <LoadingScreen onComplete={handleLoadingComplete} imagesLoaded={imagesLoaded} />
        {/* Preload Hero in background so textures start loading immediately */}
        <div style={{ position: 'fixed', opacity: 0, pointerEvents: 'none' }}>
          <Hero onImagesLoaded={handleImagesLoaded} />
        </div>
      </>
    );
  }

  return (
    <FadeTransition>
      <div className="min-h-screen bg-black md:cursor-none overflow-hidden">
        <Navigation />
        <main id="main-content">
          <Hero onImagesLoaded={handleImagesLoaded} />
        </main>
      </div>
    </FadeTransition>
  );
}
