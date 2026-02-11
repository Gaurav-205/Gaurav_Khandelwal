import type { Metadata } from "next";
import { PROJECT_DATA } from '@/lib/constants/projects';
import ProjectClient from './ProjectClient';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
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

export default function ProjectPage({ params }: ProjectPageProps) {
  return <ProjectClient params={params} />;
}