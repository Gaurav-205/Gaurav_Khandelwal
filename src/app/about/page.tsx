import type { Metadata } from "next";
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About - Gaurav Khandelwal",
  description: "Learn more about Gaurav Khandelwal from Kota, Rajasthan. B.Tech in Computer Science & Engineering (Product Software Engineering) at MIT ADT University, Pune. Full-Stack Developer and UI/UX Designer with a jack of all trades mindset.",
  keywords: ["About", "Full-Stack Developer", "UI/UX Designer", "Gaurav Khandelwal", "MIT ADT University", "MIT School of Computing", "Pune", "Kota", "Rajasthan", "B.Tech", "Computer Science"],
};

export default function AboutPage() {
  return <AboutClient />;
}