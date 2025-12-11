import type { Metadata } from "next";
import { PROJECT_DATA } from '@/lib/constants';
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
      title: 'Project Not Found - Piyusha Bhalerao',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} - Piyusha Bhalerao`,
    description: project.description,
    keywords: [project.category, 'UI/UX Design', 'Portfolio', project.title, 'Piyusha Bhalerao'],
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return <ProjectClient params={params} />;
}