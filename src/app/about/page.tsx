import type { Metadata } from "next";
import { AboutClient } from '@/features/about';

export const metadata: Metadata = {
  title: "About - Gaurav Khandelwal",
  description: "About Gaurav Khandelwal — full-stack developer and Software Product Engineering student at MIT ADT University, Pune. Built shipped projects across MERN, Flutter, Firebase, REST APIs, real-time chat, CI/CD, and cloud deployment.",
  keywords: ["About", "Gaurav Khandelwal", "Full-Stack Developer", "MERN Stack", "Flutter Developer", "MIT ADT University", "Software Product Engineering", "React", "Node.js", "MongoDB", "Firebase"],
};

export default function AboutPage() {
  return <AboutClient />;
}