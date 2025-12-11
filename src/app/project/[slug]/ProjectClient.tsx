'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECT_DATA } from '@/lib/constants';
import Image from 'next/image';

interface ProjectClientProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectClient({ params }: ProjectClientProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const project = PROJECT_DATA.find(p => p.slug === resolvedParams.slug);

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
                className="text-white/80 font-montserrat font-light text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mb-8"
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
            </motion.div>
          </section>

          {/* Project image */}
          <section className="mb-16">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
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
            <section key={index} className="mb-16">
              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-6">
                  {section.title}
                </h2>
                <p className="text-white/80 font-montserrat font-light text-base md:text-lg leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            </section>
          ))}

          {/* Navigation to next/previous project */}
          <section className="mt-20">
            <motion.div
              className="max-w-6xl mx-auto flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {project.id > 1 && (
                <Link
                  href={`/project/${PROJECT_DATA[project.id - 2].slug}`}
                  className="text-white/70 hover:text-white transition-colors font-montserrat text-sm tracking-wide"
                >
                  ← Previous Project
                </Link>
              )}
              <div className="flex-1" />
              {project.id < PROJECT_DATA.length && (
                <Link
                  href={`/project/${PROJECT_DATA[project.id].slug}`}
                  className="text-white/70 hover:text-white transition-colors font-montserrat text-sm tracking-wide"
                >
                  Next Project →
                </Link>
              )}
            </motion.div>
          </section>
        </div>
      </div>
    </FadeTransition>
  );
}