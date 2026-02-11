import type { Metadata } from "next";
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About - Gaurav Khandelwal",
  description: "Learn more about Gaurav Khandelwal, a Full-Stack Developer and UI/UX Designer passionate about creating innovative solutions that solve real-world problems and inspire positive change.",
  keywords: ["About", "Full-Stack Developer", "UI/UX Designer", "Gaurav Khandelwal", "Web Development", "Contact"],
};

export default function AboutPage() {
  return <AboutClient />;
}