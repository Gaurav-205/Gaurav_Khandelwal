'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';

interface FadeTransitionProps {
  children: ReactNode;
}

export default function FadeTransition({ children }: FadeTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Fade overlay that starts from center */}
      <motion.div
        initial={{ 
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 1
        }}
        animate={{ 
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 0
        }}
        transition={{
          duration: 0.6, // Reduced from 1s
          ease: [0.4, 0, 0.2, 1],
          clipPath: { duration: 0.6 }, // Reduced from 1s
          opacity: { duration: 0.5, delay: 0.1 } // Reduced from 0.8s and 0.2s delay
        }}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
      />

      {/* Page content with smooth fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{
          duration: 0.5, // Reduced from 0.8s
          delay: 0.15, // Reduced from 0.3s
          ease: [0.4, 0, 0.2, 1]
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}