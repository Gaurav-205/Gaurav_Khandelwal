'use client';

import { useState, useEffect, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { SmoothCursor } from '@/components/ui/SmoothCursor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Prevent scrolling during loading and always after
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen bg-black cursor-none overflow-hidden">
        <SmoothCursor />
        <Navigation />
        <Hero />
      </div>
    </>
  );
}