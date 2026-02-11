import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/SmoothCursor";

export const metadata: Metadata = {
  title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
  description: "Portfolio of Gaurav Khandelwal, a Full-Stack Developer and UI/UX Designer passionate about creating innovative solutions that solve real-world problems and inspire positive change.",
  keywords: ["Full-Stack Developer", "UI/UX Designer", "Portfolio", "Web Development", "React", "Next.js", "TypeScript", "Gaurav Khandelwal"],
  authors: [{ name: "Gaurav Khandelwal" }],
  openGraph: {
    title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
    description: "Portfolio showcasing innovative web applications and design solutions",
    type: "website",
    locale: "en_US",
    siteName: "Gaurav Khandelwal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
    description: "Portfolio showcasing innovative web applications and design solutions",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-montserrat antialiased">
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
