import type { Metadata } from "next";
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About - Piyusha Bhalerao",
  description: "Learn more about Piyusha Bhalerao, a UI/UX designer who believes design has the power to make a difference and create positive change.",
  keywords: ["About", "UI/UX Designer", "Piyusha Bhalerao", "Design Philosophy", "Contact"],
};

export default function AboutPage() {
  return <AboutClient />;
}