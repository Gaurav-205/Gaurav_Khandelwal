'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutClient() {
  const [activeSection, setActiveSection] = useState('informations');
  const router = useRouter();

  useEffect(() => {
    // Allow scrolling for this page but hide scrollbar completely
    document.documentElement.classList.add('hide-scrollbar');
    document.body.classList.add('hide-scrollbar');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Additional Windows-specific scrollbar hiding using setProperty
    document.documentElement.style.setProperty('scrollbar-width', 'none');
    document.documentElement.style.setProperty('-ms-overflow-style', 'none');
    document.body.style.setProperty('scrollbar-width', 'none');
    document.body.style.setProperty('-ms-overflow-style', 'none');

    // Scroll spy functionality
    const handleScroll = () => {
      const sections = [
        { id: 'informations', element: document.getElementById('informations') },
        { id: 'fields', element: document.getElementById('fields') },
        { id: 'socials', element: document.getElementById('socials') },
        { id: 'contact', element: document.getElementById('contact') }
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionBottom = sectionTop + section.element.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    // ESC key functionality to go back
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.push('/');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    handleScroll(); // Initial check
    
    return () => {
      document.documentElement.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.documentElement.style.removeProperty('scrollbar-width');
      document.documentElement.style.removeProperty('-ms-overflow-style');
      document.body.style.removeProperty('scrollbar-width');
      document.body.style.removeProperty('-ms-overflow-style');
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <FadeTransition>
      <div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar" style={{ scrollbarWidth: 'none' } as React.CSSProperties}>
      
      {/* Back button - responsive positioning */}
      <motion.div
        className="fixed top-4 right-4 md:right-6 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Link 
          href="/"
          className="text-white font-montserrat font-normal text-sm tracking-wide hover:text-white/70 transition-colors duration-300"
        >
          Back
        </Link>
      </motion.div>

      {/* Dynamic Left sidebar menu - responsive */}
      <motion.div
        className="fixed top-4 left-4 md:left-6 z-50 hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex flex-col space-y-4 font-montserrat">
          <h2 className="text-white font-normal text-base lg:text-lg tracking-wide">
            {activeSection === 'informations' && 'Informations'}
            {activeSection === 'fields' && 'Fields of Practice'}
            {activeSection === 'socials' && 'Socials'}
            {activeSection === 'contact' && 'Contact'}
          </h2>
          <div className="flex flex-col space-y-2 text-xs lg:text-sm">
            <button 
              onClick={() => scrollToSection('informations')}
              className={`text-left transition-colors cursor-pointer ${
                activeSection === 'informations' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
            >
              Informations
            </button>
            <button 
              onClick={() => scrollToSection('fields')}
              className={`text-left transition-colors cursor-pointer ${
                activeSection === 'fields' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
            >
              Fields of practices
            </button>
            <button 
              onClick={() => scrollToSection('socials')}
              className={`text-left transition-colors cursor-pointer ${
                activeSection === 'socials' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
            >
              Socials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`text-left transition-colors cursor-pointer ${
                activeSection === 'contact' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
            >
              Contact
            </button>
            <span className="text-white/60 hover:text-white/80 transition-colors cursor-pointer">Credits</span>
          </div>
        </div>
      </motion.div>

      {/* Main content area - responsive layout */}
      <div className="pt-16 pb-16 md:pt-20 md:pb-20 px-4 md:px-0 md:ml-24">
        {/* Section 1: Informations */}
        <section id="informations" className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh] px-4 md:px-6">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {/* Small label */}
            <motion.p
              className="text-white/60 font-montserrat text-xs md:text-sm mb-8 md:mb-12 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Informations
            </motion.p>

            {/* Main heading - Information section bigger */}
            <motion.h1
              className="text-white font-montserrat font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              Gaurav Khandelwal is a Full-Stack Developer & UI/UX Designer.
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              I&apos;m a developer and designer who believes that technology has the power to make a difference. 
              I&apos;m passionate about creating innovative solutions that solve real-world problems. 
              My ultimate goal is to build products that not only function flawlessly but also 
              inspire positive change and improve people&apos;s lives.
            </motion.p>
          </motion.div>
        </section>

        {/* Section 2: Fields of Practice */}
        <section id="fields" className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh] px-4 md:px-6">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-white/60 font-montserrat text-xs md:text-sm mb-8 md:mb-12 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Fields of Practice
            </motion.p>

            <motion.div
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
                Full-Stack Web Development
              </h2>
              <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
                UI/UX Design & Research
              </h2>
              <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
                Mobile & Web App Development
              </h2>
              <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
                Database Design & Architecture
              </h2>
              <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
                API Development & Integration
              </h2>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 3: Socials */}
        <section id="socials" className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh] px-4 md:px-6">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-white/60 font-montserrat text-xs md:text-sm mb-8 md:mb-12 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Socials
            </motion.p>

            <motion.div
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a href="https://github.com/Gaurav-205" target="_blank" rel="noopener noreferrer" className="block text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/gaurav-khandelwal-17a127358" target="_blank" rel="noopener noreferrer" className="block text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors">
                LinkedIn
              </a>
              <a href="https://twitter.com/gaurav_dev" target="_blank" rel="noopener noreferrer" className="block text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors">
                Twitter (X)
              </a>
              <a href="https://instagram.com/gaurav.codes" target="_blank" rel="noopener noreferrer" className="block text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors">
                Instagram
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh] px-4 md:px-6">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-white/60 font-montserrat text-xs md:text-sm mb-8 md:mb-12 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Contact
            </motion.p>

            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a href="mailto:gauravkhandelwal205@gmail.com" className="block text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors">
                gauravkhandelwal205@gmail.com
              </a>
              <p className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                Available for freelance projects and full-time opportunities. 
                Let&apos;s build something amazing together.
              </p>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Bottom left info - hidden on mobile, visible on desktop */}
      <motion.div
        className="fixed bottom-6 left-6 z-50 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <div className="flex items-center space-x-4 font-montserrat text-sm text-white/60">
          <div>
            <p>GMT+5:30</p>
            <p>Available</p>
          </div>
          <div>
            <p>Pune, India</p>
            <p>Feb. 2025</p>
          </div>
        </div>
      </motion.div>
      </div>
    </FadeTransition>
  );
}