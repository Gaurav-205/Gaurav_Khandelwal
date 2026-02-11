'use client';

import { motion } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import CountUp from './ui/CountUp';
import { ANIMATION_DELAYS, ANIMATION_DURATIONS } from '@/lib/constants/animations';
import { Z_INDEX } from '@/lib/constants/zIndex';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = memo(({ onComplete }: LoadingScreenProps) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleCountComplete = useCallback(() => {
    setIsComplete(true);
    setTimeout(onComplete, ANIMATION_DELAYS.LOADING_COMPLETE);
  }, [onComplete]);

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
      </div>
    </motion.div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;