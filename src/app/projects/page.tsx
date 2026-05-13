import type { Metadata } from "next";
import { ProjectsClient } from '@/features/projects';

export const metadata: Metadata = {
  title: "Projects - Gaurav Khandelwal",
  description: "Shipped web and mobile projects across MERN, Flutter, Firebase, MongoDB, Socket.IO, CI/CD, and cloud deployment by Gaurav Khandelwal.",
  keywords: ["Full-Stack Development", "MERN Stack", "Flutter", "Firebase", "Projects", "Portfolio", "Gaurav Khandelwal", "KampusKart", "Sahara Pet Care", "Onam Festival"],
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}