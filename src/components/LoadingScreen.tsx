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
  
  // Use Framer Motion's spring for smooth animation
  const springCount = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 0.5
  });
  
  // Transform to integer for display
  const displayCount = useTransform(springCount, (value) => Math.floor(value));

  useEffect(() => {
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      
      // Base speed: reach 90 in about 1.2 seconds
      const baseProgress = Math.min((elapsed / 1200) * 90, 90);
      
      // If images are loaded, speed up to 100
      let targetCount = baseProgress;
      if (imagesLoaded) {
        // Smoothly transition from current to 100
        const remainingDistance = 100 - targetCountRef.current;
        targetCount = targetCountRef.current + remainingDistance * 0.15; // Fast catch-up
        
        if (targetCount >= 99.5) {
          targetCount = 100;
        }
      } else if (baseProgress >= 85) {
        // Slow down significantly after 85 if images not loaded
        const slowProgress = 85 + (baseProgress - 85) * 0.3;
        targetCount = Math.min(slowProgress, 95); // Cap at 95 until loaded
      }
      
      targetCountRef.current = targetCount;
      springCount.set(targetCount);
      
      // Complete when we reach 100
      if (targetCount >= 100) {
        setIsComplete(true);
        setTimeout(onComplete, ANIMATION_DELAYS.LOADING_COMPLETE);
        return;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [imagesLoaded, onComplete, springCount]);

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