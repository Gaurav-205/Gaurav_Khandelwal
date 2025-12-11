'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECT_DATA } from '@/lib/constants';
import Image from 'next/image';

export default function ProjectsClient() {
  const router = useRouter();

  useEffect(() => {
    // Allow scrolling for this page but hide scrollbar completely
    document.documentElement.classList.add('hide-scrollbar');
    document.body.classList.add('hide-scrollbar');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // ESC key functionality to go back
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.documentElement.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return (
    <FadeTransition>
      <div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar">
        
        {/* Back button */}
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

        {/* Header */}
        <motion.div
          className="fixed top-4 left-4 md:left-6 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="font-montserrat">
            <h2 className="text-white font-normal text-base lg:text-lg tracking-wide">
              Projects
            </h2>
            <p className="text-white/60 text-xs">All Projects</p>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="pt-20 pb-16 px-4 md:px-6">
          {/* Title section */}
          <section className="flex items-center justify-center min-h-[40vh]">
            <motion.div
              className="max-w-6xl w-full text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.h1
                className="text-white font-montserrat font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Selected Works
              </motion.h1>

              <motion.p
                className="text-white/80 font-montserrat font-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                A collection of projects showcasing my approach to user-centered design and creative problem-solving.
              </motion.p>
            </motion.div>
          </section>

          {/* Projects grid */}
          <section className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {PROJECT_DATA.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/project/${project.slug}`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-6 bg-gray-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-white font-montserrat font-normal text-xl md:text-2xl group-hover:text-white/80 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/60 font-montserrat text-sm tracking-wide">
                        {project.category} • {project.year}
                      </p>
                      <p className="text-white/70 font-montserrat font-light text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call to action */}
          <section className="mt-20">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-6">
                Let's work together
              </h2>
              <p className="text-white/80 font-montserrat font-light text-base md:text-lg leading-relaxed mb-8">
                I'm always interested in new opportunities and collaborations. 
                Let's create something amazing together.
              </p>
              <Link
                href="/about#contact"
                className="inline-block text-white font-montserrat font-normal text-base tracking-wide border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Get in touch
              </Link>
            </motion.div>
          </section>
        </div>
      </div>
    </FadeTransition>
  );
}