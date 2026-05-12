'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import ProjectsInteractions from './ProjectsInteractions';
import ProjectsContent from './ProjectsContent';

export default function ProjectsClient() {
  return (
    <FadeTransition>
      {/* Behaviour-only island */}
      <ProjectsInteractions />

      {/* Back button — framer-motion entry animation */}
      <motion.div
        className="fixed top-4 right-4 md:right-6 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          href="/"
          className="text-white font-montserrat font-normal text-sm tracking-wide hover:text-white/70 transition-colors duration-300"
        >
          Back
        </Link>
      </motion.div>

      {/* Header — framer-motion entry animation */}
      <motion.div
        className="fixed top-4 left-4 md:left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="font-montserrat">
          <h2 className="text-white font-normal text-base lg:text-lg tracking-wide">Projects</h2>
          <p className="text-white/60 text-xs">All Projects</p>
        </div>
      </motion.div>

      {/* Static content — server-rendered */}
      <ProjectsContent />
    </FadeTransition>
  );
}
