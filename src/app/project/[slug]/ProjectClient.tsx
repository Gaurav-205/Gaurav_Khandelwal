'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECT_DATA } from '@/lib/constants/projects';
import Image from 'next/image';
import { trackPageView, trackExternalLink } from '@/lib/analytics';

interface ProjectClientProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectClient({ params }: ProjectClientProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const project = PROJECT_DATA.find(p => p.slug === resolvedParams?.slug);

  useEffect(() => {
    // Track page view
    if (project) {
      trackPageView(`/project/${project.slug}`);
    }

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
  }, [router, project]);

  if (!project) {
    return (
      <FadeTransition>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Project not found</h1>
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </FadeTransition>
    );
  }

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

        {/* Project navigation */}
        <motion.div
          className="fixed top-4 left-4 md:left-6 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="font-montserrat">
            <p className="text-white/60 text-xs mb-1">Project {project.id} of {PROJECT_DATA.length}</p>
            <h2 className="text-white font-normal text-base lg:text-lg tracking-wide">
              {project.title}
            </h2>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="pt-20 pb-16 px-4 md:px-6">
          {/* Hero section */}
          <section className="flex items-center justify-center min-h-[70vh]">
            <motion.div
              className="max-w-6xl w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {/* Project title */}
              <motion.h1
                className="text-white font-montserrat font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                {project.title}
              </motion.h1>

              {/* Project description */}
              <motion.p
                className="text-white/80 font-montserrat font-light text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                {project.description}
              </motion.p>

              {/* Project details */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
              >
                <div>
                  <h3 className="text-white/60 font-montserrat text-sm mb-2 tracking-wide">ROLE</h3>
                  <p className="text-white font-montserrat text-base">{project.role}</p>
                </div>
                <div>
                  <h3 className="text-white/60 font-montserrat text-sm mb-2 tracking-wide">YEAR</h3>
                  <p className="text-white font-montserrat text-base">{project.year}</p>
                </div>
                <div>
                  <h3 className="text-white/60 font-montserrat text-sm mb-2 tracking-wide">CATEGORY</h3>
                  <p className="text-white font-montserrat text-base">{project.category}</p>
                </div>
              </motion.div>

              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.8 }}
                >
                  <h3 className="text-white/60 font-montserrat text-sm mb-4 tracking-wide">TECH STACK</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/5 border border-white/10 text-white/90 font-montserrat text-sm rounded-full hover:bg-white/10 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTAs */}
              {(project.liveUrl || project.githubUrl) && (
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLink(project.liveUrl!, `${project.title} - Live Site`)}
                      className="px-8 py-3 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
                    >
                      View Live Site →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLink(project.githubUrl!, `${project.title} - GitHub`)}
                      className="px-8 py-3 border border-white/20 text-white font-montserrat text-sm tracking-wide hover:bg-white/5 transition-colors duration-300 rounded-full"
                    >
                      View on GitHub
                    </a>
                  )}
                </motion.div>
              )}
            </motion.div>
          </section>

          {/* Project image */}
          <section className="py-20 md:py-32">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </section>

          {/* Project content sections */}
          {project.sections?.map((section, index) => (
            <section key={index} className="py-20 md:py-32">
              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-white/40 font-montserrat text-sm tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>
                <h2 className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-6">
                  {section.title}
                </h2>
                <p className="text-white/80 font-montserrat font-light text-base md:text-lg leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            </section>
          ))}

          {/* Divider */}
          <div className="max-w-6xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Navigation to next/previous project */}
          <section className="py-20 md:py-32">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center">
                {project.id > 1 ? (
                  <Link
                    href={`/project/${PROJECT_DATA[project.id - 2].slug}`}
                    className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors font-montserrat text-sm tracking-wide"
                  >
                    <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    <div>
                      <div className="text-white/40 text-xs mb-1">PREVIOUS</div>
                      <div>{PROJECT_DATA[project.id - 2].title}</div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                
                {project.id < PROJECT_DATA.length ? (
                  <Link
                    href={`/project/${PROJECT_DATA[project.id].slug}`}
                    className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors font-montserrat text-sm tracking-wide text-right"
                  >
                    <div>
                      <div className="text-white/40 text-xs mb-1">NEXT</div>
                      <div>{PROJECT_DATA[project.id].title}</div>
                    </div>
                    <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </FadeTransition>
  );
}