'use client';

import { motion } from 'framer-motion';
import { memo, useCallback, useState, useEffect } from 'react';
import CountUp from './ui/CountUp';
import { ANIMATION_DELAYS, ANIMATION_DURATIONS, Z_INDEX } from '@/lib/constants';

interface LoadingScreenProps {
  onComplete: () => void;
  isPageLoaded: boolean;
}

const LoadingScreen = memo(({ onComplete, isPageLoaded }: LoadingScreenProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const [countComplete, setCountComplete] = useState(false);

  const handleCountComplete = useCallback(() => {
    setCountComplete(true);
  }, []);

  // Complete loading only when both countdown and page loading are done
  useEffect(() => {
    if (countComplete && isPageLoaded && !isComplete) {
      setIsComplete(true);
      setTimeout(onComplete, ANIMATION_DELAYS.LOADING_COMPLETE);
    }
  }, [countComplete, isPageLoaded, isComplete, onComplete]);

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
        />
        
        {/* Loading indicator for when countdown is done but page is still loading */}
        {countComplete && !isPageLoaded && (
          <motion.div
            className="mt-4 text-sm text-white/60 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading assets...
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;