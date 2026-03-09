'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface KeyboardHintProps {
  keys: string[];
  description: string;
  onDismiss?: () => void;
}

export default function KeyboardHint({ keys, description, onDismiss }: KeyboardHintProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show hint after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Auto-dismiss after 10 seconds
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-3 shadow-xl">
        <div className="flex items-center gap-2">
          {keys.map((key, index) => (
            <span key={index} className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white/20 border border-white/30 rounded text-white font-mono text-xs font-semibold">
                {key}
              </kbd>
              {index < keys.length - 1 && (
                <span className="text-white/60 text-xs">+</span>
              )}
            </span>
          ))}
        </div>
        <span className="text-white/90 font-montserrat text-sm">{description}</span>
        <button
          onClick={handleDismiss}
          className="ml-2 text-white/60 hover:text-white transition-colors"
          aria-label="Dismiss hint"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
