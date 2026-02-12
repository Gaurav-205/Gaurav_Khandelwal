'use client';

import { motion } from 'framer-motion';
import { memo, useCallback, useState, useEffect } from 'react';
import CountUp from './ui/CountUp';
import { ANIMATION_DELAYS, ANIMATION_DURATIONS } from '@/lib/constants/animations';
import { Z_INDEX } from '@/lib/constants/zIndex';

interface LoadingScreenProps {
  onComplete: () => void;
  imagesLoaded: boolean;
}

const LoadingScreen = memo(({ onComplete, imagesLoaded }: LoadingScreenProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const [canComplete, setCanComplete] = useState(false);

  // Allow completion only when images are loaded
  useEffect(() => {
    if (imagesLoaded) {
      setCanComplete(true);
    }
  }, [imagesLoaded]);

  const handleCountComplete = useCallback(() => {
    // Only complete if images are loaded
    if (canComplete) {
      setIsComplete(true);
      setTimeout(onComplete, ANIMATION_DELAYS.LOADING_COMPLETE);
    }
  }, [onComplete, canComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{ zIndex: Z_INDEX.LOADING }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ 
        duration: ANIMATION_DURATIONS.LOADING_FADE,
        ease: 'easeInOut'
      }}
    >
      <div className="text-center">
        <CountUp
          from={0}
          to={100}
          duration={ANIMATION_DURATIONS.LOADING_COUNT + 1}
          className="text-2xl md:text-4xl font-light text-white tracking-wider"
          onEnd={handleCountComplete}
          pauseAtEnd={!canComplete}
        />
      </div>
    </motion.div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;