'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 404 label */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-white/40 font-montserrat text-xs tracking-widest">
            404
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-normal mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-normal mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-white/70 font-montserrat font-light text-base md:text-lg leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
          >
            Return Home →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}