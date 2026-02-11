import type { Metadata } from "next";
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: "Projects - Gaurav Khandelwal",
  description: "A collection of full-stack web development and UI/UX design projects showcasing innovative solutions and creative problem-solving by Gaurav Khandelwal.",
  keywords: ["Full-Stack Development", "Projects", "Portfolio", "Web Development", "UI/UX Design", "Gaurav Khandelwal"],
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}