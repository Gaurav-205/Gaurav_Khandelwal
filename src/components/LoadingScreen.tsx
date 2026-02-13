'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { memo, useState, useEffect, useRef } from 'react';
import { ANIMATION_DELAYS } from '@/lib/constants/animations';
import { Z_INDEX } from '@/lib/constants/zIndex';

interface LoadingScreenProps {
  onComplete: () => void;
  imagesLoaded: boolean;
}

const LoadingScreen = memo(({ onComplete, imagesLoaded }: LoadingScreenProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const targetCountRef = useRef(0);
  const maxTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  // Use Framer Motion's spring for smooth animation (faster spring)
  const springCount = useSpring(0, {
    stiffness: 80,
    damping: 20,
    mass: 0.3
  });
  
  // Transform to integer for display
  const displayCount = useTransform(springCount, (value) => Math.floor(value));

  useEffect(() => {
    startTimeRef.current = Date.now();
    
    // Maximum timeout: force complete after 1.5 seconds regardless of image loading
    maxTimeoutRef.current = setTimeout(() => {
      // Force images loaded state
      if (!isComplete) {
        springCount.set(100);
        targetCountRef.current = 100;
        setIsComplete(true);
        setTimeout(onComplete, ANIMATION_DELAYS.LOADING_COMPLETE);
      }
    }, 1500);
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      
      // Base speed: reach 90 in about 0.6 seconds (2x faster)
      const baseProgress = Math.min((elapsed / 600) * 90, 90);
      
      // If images are loaded OR we've waited long enough, speed up to 100
      let targetCount = baseProgress;
      if (imagesLoaded || elapsed > 800) {
        // Smoothly transition from current to 100
        const remainingDistance = 100 - targetCountRef.current;
        targetCount = targetCountRef.current + remainingDistance * 0.25; // Faster catch-up
        
        if (targetCount >= 99.5) {
          targetCount = 100;
        }
      } else if (baseProgress >= 85) {
        // Slow down slightly after 85 if images not loaded
        const slowProgress = 85 + (baseProgress - 85) * 0.5;
        targetCount = Math.min(slowProgress, 95); // Cap at 95 until loaded
      }
      
      targetCountRef.current = targetCount;
      springCount.set(targetCount);
      
      // Complete when we reach 100
      if (targetCount >= 100) {
        setIsComplete(true);
        setTimeout(onComplete, ANIMATION_DELAYS.LOADING_COMPLETE);
        if (maxTimeoutRef.current) {
          clearTimeout(maxTimeoutRef.current);
        }
        return;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
    };
  }, [imagesLoaded, onComplete, springCount, isComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{ zIndex: Z_INDEX.LOADING }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ 
        duration: 0.2,
        ease: 'easeInOut'
      }}
    >
      <div className="text-center">
        <motion.span className="text-2xl md:text-4xl font-light text-white tracking-wider">
          {displayCount}
        </motion.span>
      </div>
    </motion.div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;