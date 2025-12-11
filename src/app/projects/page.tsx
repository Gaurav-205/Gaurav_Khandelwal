import type { Metadata } from "next";
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: "Projects - Piyusha Bhalerao",
  description: "A collection of UI/UX design projects showcasing user-centered design and creative problem-solving by Piyusha Bhalerao.",
  keywords: ["UI/UX Design", "Projects", "Portfolio", "User Experience", "User Interface", "Piyusha Bhalerao"],
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}