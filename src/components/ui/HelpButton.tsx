'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Z_INDEX } from '@/lib/constants/zIndex';

interface HelpItem {
  key: string;
  description: string;
}

interface HelpButtonProps {
  shortcuts: HelpItem[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function HelpButton({ shortcuts, isOpen: controlledIsOpen, onToggle }: HelpButtonProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <>
      {/* Help Button */}
      <motion.button
        onClick={handleToggle}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts (Press ?)"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-white group-hover:text-white transition-colors"
        >
          <path 
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 16V12M12 8H12.01" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      {/* Help Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
              onClick={handleToggle}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[100] pointer-events-auto"
              style={{ zIndex: Z_INDEX.NAVIGATION + 40 }}
            >
              <div className="bg-black border border-white/20 rounded-2xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white font-montserrat font-normal text-xl">
                    Keyboard Shortcuts
                  </h2>
                  <button
                    onClick={handleToggle}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M18 6L6 18M6 6L18 18" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </button>
                </div>

                {/* Shortcuts List */}
                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                    >
                      <span className="text-white/80 font-montserrat text-sm">
                        {shortcut.description}
                      </span>
                      <kbd className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-xs font-semibold">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-white/40 font-montserrat text-xs text-center">
                    Press <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white/60 font-mono text-xs">?</kbd> anytime to show this help
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
