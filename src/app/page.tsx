'use client';

import { useState, useEffect, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { SmoothCursor } from '@/components/ui/SmoothCursor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    // Only complete loading if the page is fully loaded
    if (isPageLoaded) {
      setIsLoading(false);
    }
  }, [isPageLoaded]);

  useEffect(() => {
    // Prevent scrolling during loading and always after
    document.body.style.overflow = 'hidden';
    
    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
    } else {
      // Wait for page to fully load
      const handleLoad = () => {
        setIsPageLoaded(true);
      };

      window.addEventListener('load', handleLoad);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        document.body.style.overflow = 'unset';
      };
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Trigger loading completion when page is loaded
  useEffect(() => {
    if (isPageLoaded && !isLoading) {
      // Page is loaded but loading screen might still be counting
      return;
    }
    if (isPageLoaded) {
      // If countdown finished but page wasn't loaded, now complete it
      handleLoadingComplete();
    }
  }, [isPageLoaded, handleLoadingComplete, isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          onComplete={handleLoadingComplete}
          isPageLoaded={isPageLoaded}
        />
      )}
      
      <div className="min-h-screen bg-black cursor-none overflow-hidden">
        <SmoothCursor />
        <Navigation />
        <Hero />
      </div>
    </>
  );
}