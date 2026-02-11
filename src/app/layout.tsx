import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/SmoothCursor";

export const metadata: Metadata = {
  title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
  description: "Portfolio of Gaurav Khandelwal from Kota, Rajasthan. B.Tech in Computer Science & Engineering (Product Software Engineering) at MIT ADT University, Pune. Full-Stack Developer and UI/UX Designer passionate about creating innovative solutions.",
  keywords: ["Full-Stack Developer", "UI/UX Designer", "Portfolio", "Web Development", "React", "Next.js", "TypeScript", "Gaurav Khandelwal", "MIT ADT University", "Pune", "Kota", "Rajasthan"],
  authors: [{ name: "Gaurav Khandelwal" }],
  openGraph: {
    title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
    description: "B.Tech student at MIT ADT University, Pune. Portfolio showcasing innovative web applications and design solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Gaurav Khandelwal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
    description: "B.Tech student at MIT ADT University, Pune. Portfolio showcasing innovative web applications and design solutions.",
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
