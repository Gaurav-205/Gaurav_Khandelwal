'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import { ProjectData, PROJECT_DATA } from '@/lib/constants/projects';
import ProjectInteractions from './ProjectInteractions';
import ProjectContent from './ProjectContent';

interface ProjectClientProps {
  project: ProjectData;
}

export default function ProjectClient({ project }: ProjectClientProps) {
  return (
    <FadeTransition>
      {/* Behaviour-only island */}
      <ProjectInteractions slug={project.slug} />

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

      {/* Project nav label — framer-motion entry animation */}
      <motion.div
        className="fixed top-4 left-4 md:left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="font-montserrat">
          <p className="text-white/60 text-xs mb-1">
            Project {project.id} of {PROJECT_DATA.length}
          </p>
          <h2 className="text-white font-normal text-base lg:text-lg tracking-wide">{project.title}</h2>
        </div>
      </motion.div>

      <ProjectContent project={project} />
    </FadeTransition>
  );
}
