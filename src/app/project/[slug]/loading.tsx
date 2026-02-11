'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Loading spinner */}
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/10 border-t-white mx-auto"></div>
        </div>

        {/* Loading label */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-white/40 font-montserrat text-xs tracking-widest">
            LOADING
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        <p className="text-white/60 font-montserrat font-light text-sm">
          Loading project...
        </p>
      </motion.div>
    </div>
  );
}