'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECT_DATA } from '@/lib/constants/projects';
import Image from 'next/image';
import { trackPageView, trackProjectClick, trackCTAClick } from '@/lib/analytics';

export default function ProjectsClient() {
  const router = useRouter();

  useEffect(() => {
    // Track page view
    trackPageView('/projects');

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

  const handleProjectClick = (slug: string, title: string) => {
    trackProjectClick(slug, title);
  };

  return (
    <FadeTransition>
      <div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar">
        
        {/* Back button */}
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

        {/* Header */}
        <motion.div
          className="fixed top-4 left-4 md:left-6 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
          <section className="flex items-center justify-center min-h-[50vh] py-20 md:py-32">
            <motion.div
              className="max-w-6xl w-full text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="text-white/40 font-montserrat text-sm tracking-widest">
                  PORTFOLIO
                </span>
              </motion.div>

              <motion.h1
                className="text-white font-montserrat font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Selected Works
              </motion.h1>

              <motion.p
                className="text-white/80 font-montserrat font-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                A collection of projects showcasing my approach to user-centered design and creative problem-solving.
              </motion.p>
            </motion.div>
          </section>

          {/* Divider */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Projects grid */}
          <section className="max-w-7xl mx-auto py-20 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
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
                    <div 
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-6 bg-gray-900 border border-white/10"
                      onClick={() => handleProjectClick(project.slug, project.title)}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-white/40 font-montserrat text-xs tracking-widest">
                          {String(project.id).padStart(2, '0')}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                      </div>
                      
                      <h3 className="text-white font-montserrat font-normal text-xl md:text-2xl group-hover:text-white/70 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-white/60 font-montserrat text-sm tracking-wide">
                        {project.category} • {project.year}
                      </p>
                      
                      <p className="text-white/70 font-montserrat font-light text-base leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.techStack.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 font-montserrat text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-3 py-1 text-white/50 font-montserrat text-xs">
                              +{project.techStack.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Call to action */}
          <section className="py-20 md:py-32">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="text-white/40 font-montserrat text-sm tracking-widest">
                  LET'S CONNECT
                </span>
              </motion.div>

              <h2 className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-6">
                Let's work together
              </h2>
              <p className="text-white/80 font-montserrat font-light text-base md:text-lg leading-relaxed mb-8">
                I'm always interested in new opportunities and collaborations. 
                Let's create something amazing together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/about#contact"
                  onClick={() => trackCTAClick('Get in touch', 'Projects Page')}
                  className="px-8 py-3 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
                >
                  Get in touch →
                </Link>
                <a
                  href="mailto:gauravkhandelwal205@gmail.com"
                  onClick={() => trackCTAClick('Send Email', 'Projects Page')}
                  className="px-8 py-3 border border-white/20 text-white font-montserrat text-sm tracking-wide hover:bg-white/5 transition-colors duration-300 rounded-full"
                >
                  Send Email
                </a>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </FadeTransition>
  );
}