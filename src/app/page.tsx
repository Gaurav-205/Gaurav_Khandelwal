'use client';

import { useState, useEffect, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FadeTransition from '@/components/ui/FadeTransition';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Mark that the user has seen the loading screen
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasSeenLoading', 'true');
    }
  }, []);

  const handleImagesLoaded = useCallback(() => {
    setImagesLoaded(true);
  }, []);

  useEffect(() => {
    // Check if this is the first visit in this session
    if (typeof window !== 'undefined') {
      const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
      if (!hasSeenLoading) {
        setIsLoading(true);
        setShowLoading(true);
      }
    }

    // Prevent scrolling during loading and always after
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // If loading, show loading screen without fade transition
  if (showLoading && isLoading) {
    return (
      <>
        <LoadingScreen onComplete={handleLoadingComplete} imagesLoaded={imagesLoaded} />
        {/* Preload Hero in background so images start loading */}
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
        <Hero onImagesLoaded={handleImagesLoaded} />
      </div>
    </FadeTransition>
  );
}