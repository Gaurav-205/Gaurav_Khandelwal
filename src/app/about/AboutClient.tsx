'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackPageView, trackExternalLink, trackCTAClick } from '@/lib/analytics';

export default function AboutClient() {
  const [activeSection, setActiveSection] = useState('informations');
  const router = useRouter();

  useEffect(() => {
    // Track page view
    trackPageView('/about');

    // Allow scrolling for this page but hide scrollbar completely
    document.documentElement.classList.add('hide-scrollbar');
    document.body.classList.add('hide-scrollbar');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Additional scrollbar hiding using setProperty
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.documentElement.style.removeProperty('scrollbar-width');
      document.documentElement.style.removeProperty('-ms-overflow-style');
      document.body.style.removeProperty('scrollbar-width');
      document.body.style.removeProperty('-ms-overflow-style');
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
        transition={{ duration: 0.6, delay: 0.3 }}
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
        transition={{ duration: 0.6, delay: 0.3 }}
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
        <section id="informations" className="py-20 md:py-32 px-4 md:px-6">
          <motion.div
            className="max-w-4xl w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Small label with divider */}
            <motion.div
              className="mb-8 md:mb-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="text-white/40 font-montserrat text-xs tracking-widest">
                01
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <p className="text-white/60 font-montserrat text-xs md:text-sm tracking-wide">
                Informations
              </p>
            </motion.div>

            {/* Main heading - Information section bigger */}
            <motion.h1
              className="text-white font-montserrat font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Gaurav Khandelwal is a Full-Stack Developer & Designer.
            </motion.h1>

            {/* Description */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                I&apos;m a developer and designer from Kota, Rajasthan, who believes that technology has the power 
                to make a difference. I embody the &quot;jack of all trades&quot; mindset, cultivating broad skills 
                across multiple domains while maintaining depth in key areas.
              </p>
              
              <p className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                Currently pursuing B.Tech in Computer Science & Engineering at MIT ADT University, Pune. 
                My approach combines theoretical learning with practical application through projects and community engagement.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Section 2: Fields of Practice */}
        <section id="fields" className="py-20 md:py-32 px-4 md:px-6">
          <motion.div
            className="max-w-4xl w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-8 md:mb-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-white/40 font-montserrat text-xs tracking-widest">
                02
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <p className="text-white/60 font-montserrat text-xs md:text-sm tracking-wide">
                Fields of Practice
              </p>
            </motion.div>

            <motion.div
              className="space-y-8 md:space-y-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="border-l-2 border-white/10 pl-6">
                <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3">
                  Full-Stack Development
                </h2>
                <p className="text-white/60 font-montserrat font-light text-sm md:text-base">
                  MERN Stack (MongoDB, Express.js, React, Node.js) • Vite • Tailwind CSS • Progressive Web Apps
                </p>
              </div>
              
              <div className="border-l-2 border-white/10 pl-6">
                <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3">
                  UI/UX Design & Research
                </h2>
                <p className="text-white/60 font-montserrat font-light text-sm md:text-base">
                  Figma • Wireframing & Prototyping • Design Systems • Design Thinking Facilitation
                </p>
              </div>
              
              <div className="border-l-2 border-white/10 pl-6">
                <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3">
                  API Development & Automation
                </h2>
                <p className="text-white/60 font-montserrat font-light text-sm md:text-base">
                  Postman API Student Expert (Certified) • RESTful API Design • n8n Workflow Automation
                </p>
              </div>
              
              <div className="border-l-2 border-white/10 pl-6">
                <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3">
                  Database & Server Architecture
                </h2>
                <p className="text-white/60 font-montserrat font-light text-sm md:text-base">
                  MongoDB • Database Management • Server-Side Logic • Platform Integration
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Section 3: Socials */}
        <section id="socials" className="py-20 md:py-32 px-4 md:px-6">
          <motion.div
            className="max-w-4xl w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-8 md:mb-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-white/40 font-montserrat text-xs tracking-widest">
                03
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <p className="text-white/60 font-montserrat text-xs md:text-sm tracking-wide">
                Socials
              </p>
            </motion.div>

            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a 
                href="https://github.com/Gaurav-205" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackExternalLink('https://github.com/Gaurav-205', 'GitHub')}
                className="group flex items-center gap-4 text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors"
              >
                <span className="text-white/40 text-sm group-hover:translate-x-2 transition-transform duration-300">→</span>
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/gaurav-khandelwal-17a127358" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackExternalLink('https://linkedin.com/in/gaurav-khandelwal-17a127358', 'LinkedIn')}
                className="group flex items-center gap-4 text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors"
              >
                <span className="text-white/40 text-sm group-hover:translate-x-2 transition-transform duration-300">→</span>
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Section 4: Contact */}
        <section id="contact" className="py-20 md:py-32 px-4 md:px-6">
          <motion.div
            className="max-w-4xl w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-8 md:mb-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-white/40 font-montserrat text-xs tracking-widest">
                04
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <p className="text-white/60 font-montserrat text-xs md:text-sm tracking-wide">
                Contact
              </p>
            </motion.div>

            <motion.div
              className="space-y-8 md:space-y-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a href="mailto:gauravkhandelwal205@gmail.com" className="block text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors">
                gauravkhandelwal205@gmail.com
              </a>
              
              <p className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                B.Tech Student at MIT School of Computing, Pune. Available for freelance projects, 
                internships, and collaborative opportunities.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="mailto:gauravkhandelwal205@gmail.com"
                  onClick={() => trackCTAClick('Send Email', 'About Contact Section')}
                  className="px-8 py-3 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
                >
                  Send Email →
                </a>
                <a
                  href="https://linkedin.com/in/gaurav-khandelwal-17a127358"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick('Connect on LinkedIn', 'About Contact Section')}
                  className="px-8 py-3 border border-white/20 text-white font-montserrat text-sm tracking-wide hover:bg-white/5 transition-colors duration-300 rounded-full"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Bottom left info - hidden on mobile, visible on desktop */}
      <motion.div
        className="fixed bottom-6 left-6 z-50 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className="flex items-center space-x-4 font-montserrat text-sm text-white/60">
          <div>
            <p>GMT+5:30</p>
            <p>Available</p>
          </div>
          <div>
            <p>Kota, Rajasthan</p>
            <p>MIT ADT Pune</p>
          </div>
        </div>
      </motion.div>
      </div>
    </FadeTransition>
  );
}