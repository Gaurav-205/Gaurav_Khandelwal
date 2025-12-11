'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import Link from 'next/link';
import { ANIMATION_DELAYS, ANIMATION_DURATIONS, Z_INDEX } from '@/lib/constants';

const transitionConfig = {
  duration: ANIMATION_DURATIONS.NAVIGATION_SLIDE,
  delay: ANIMATION_DELAYS.NAVIGATION_APPEAR / 1000
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const slideFromTop = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
};

const baseClasses = `fixed text-white font-montserrat font-normal tracking-wide mix-blend-exclusion transition-colors duration-300`;
const linkClasses = `cursor-pointer hover:text-white/70`;

const Navigation = memo(() => {
  return (
    <>
      {/* Top left logo - responsive positioning */}
      <motion.div
        className={`${baseClasses} top-4 left-4 md:left-6 text-lg md:text-xl tracking-[0.2em] ${linkClasses} hover:text-white/80`}
        style={{ zIndex: Z_INDEX.NAVIGATION }}
        variants={slideFromLeft}
        initial="hidden"
        animate="visible"
        transition={transitionConfig}
      >
        <Link href="/">PB</Link>
      </motion.div>

      {/* Top center profession - responsive positioning */}
      <motion.div
        className={`${baseClasses} top-4 left-1/2 -translate-x-1/2 text-sm md:text-base text-center`}
        style={{ zIndex: Z_INDEX.NAVIGATION }}
        variants={slideFromTop}
        initial="hidden"
        animate="visible"
        transition={transitionConfig}
      >
        Independent UI/UX Designer
      </motion.div>

      {/* Top right navigation links - responsive positioning */}
      <motion.div
        className={`${baseClasses} top-4 right-4 md:right-6 text-sm md:text-base flex space-x-4 md:space-x-6`}
        style={{ zIndex: Z_INDEX.NAVIGATION }}
        variants={slideFromRight}
        initial="hidden"
        animate="visible"
        transition={transitionConfig}
      >
        <Link href="/projects" className={linkClasses}>Projects</Link>
        <Link href="/about" className={linkClasses}>About</Link>
      </motion.div>

      {/* Bottom right social links - hidden on mobile */}
      <motion.div
        className={`${baseClasses} bottom-6 right-6 hidden md:flex flex-col items-end space-y-0.5 text-sm`}
        style={{ zIndex: Z_INDEX.NAVIGATION }}
        variants={slideFromRight}
        initial="hidden"
        animate="visible"
        transition={transitionConfig}
      >
        <a 
          href="mailto:piyusha.bhalerao@example.com" 
          className={linkClasses}
          aria-label="Send email to Piyusha"
        >
          E-mail
        </a>
        <a 
          href="https://behance.net/piyushabhalerao" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={linkClasses}
          aria-label="Visit Behance profile"
        >
          Behance
        </a>
        <a 
          href="https://instagram.com/piyusha.design" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={linkClasses}
          aria-label="Visit Instagram profile"
        >
          Instagram
        </a>
      </motion.div>
    </>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;