'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Error label */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-white/40 font-montserrat text-xs tracking-widest">
            ERROR
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-normal mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Something went wrong
        </motion.h1>

        <motion.p
          className="text-white/70 font-montserrat font-light text-base md:text-lg leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We encountered an unexpected error. Please try again or return to the homepage.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            onClick={reset}
            className="px-8 py-3 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-8 py-3 border border-white/20 text-white font-montserrat text-sm tracking-wide hover:bg-white/5 transition-colors duration-300 rounded-full"
          >
            Go home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}