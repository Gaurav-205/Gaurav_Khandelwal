import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { PROJECT_DATA } from '@/lib/constants/projects';
import ProjectClient from './ProjectClient';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECT_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = PROJECT_DATA.find(p => p.slug === resolvedParams.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found - Gaurav Khandelwal',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} - Gaurav Khandelwal`,
    description: project.description,
    keywords: [project.category, 'Full-Stack Development', 'Portfolio', project.title, 'Gaurav Khandelwal'],
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECT_DATA.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectClient project={project} />;
}
