'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import AboutInteractions from './AboutInteractions';
import AboutContent from './AboutContent';
import { ABOUT_NAV_ITEMS, ABOUT_SECTION_LABELS } from '@/lib/constants';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * About page client shell.
 *
 * Retains only the browser-dependent concerns:
 *   • `activeSection` state (drives the sidebar label and nav active class)
 *   • `handleSectionChange` callback (passed to AboutInteractions scroll-spy)
 *   • framer-motion entry animations for the back button and sidebar nav
 *   • FadeTransition page wrapper
 *
 * All static content (bio, skills, links, timezone) is rendered by
 * `<AboutContent>`, a React Server Component that receives `activeSection`
 * as a prop.
 */
export default function AboutClient() {
  const [activeSection, setActiveSection] = useState('informations');

  const handleSectionChange = useCallback((id: string) => setActiveSection(id), []);

  return (
    <FadeTransition>
      {/* Behaviour-only island */}
      <AboutInteractions onSectionChange={handleSectionChange} />

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

      {/* Sidebar nav container — framer-motion entry animation, desktop only */}
      <motion.div
        className="fixed top-4 left-4 md:left-6 z-50 hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex flex-col space-y-4 font-montserrat">
          <h2 className="text-white font-normal text-base lg:text-lg tracking-wide">
            {ABOUT_SECTION_LABELS[activeSection]}
          </h2>
          <div className="flex flex-col space-y-2 text-xs lg:text-sm">
            {ABOUT_NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left transition-colors cursor-pointer ${
                  activeSection === id ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Static content rendered by the Server Component */}
      <AboutContent activeSection={activeSection} />
    </FadeTransition>
  );
}