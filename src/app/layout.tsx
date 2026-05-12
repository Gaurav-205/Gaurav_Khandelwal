import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/SmoothCursor";
import { ENV } from "@/lib/env";

export const metadata: Metadata = {
  title: "Gaurav Khandelwal - Full-Stack Developer | MERN Stack | Flutter",
  description: "Portfolio of Gaurav Khandelwal, a full-stack developer and Computer Science student at MIT ADT University. Built shipped projects across MERN, Flutter, Firebase, real-time chat, REST APIs, CI/CD, cloud deployment, and event commerce.",
  keywords: ["Gaurav Khandelwal", "Full-Stack Developer", "MERN Stack Developer", "Flutter Developer", "React Developer", "Next.js Developer", "TypeScript", "Node.js", "Express.js", "MongoDB", "Firebase", "Socket.IO", "Portfolio", "MIT ADT University"],
  authors: [{ name: "Gaurav Khandelwal" }],
  metadataBase: new URL(ENV.BASE_URL),
  openGraph: {
    title: "Gaurav Khandelwal - Full-Stack Developer | MERN Stack | Flutter",
    description: "Full-stack developer with shipped projects across MERN, Flutter, Firebase, and cloud deployment. Built a 400+ user campus portal, 58 REST/API endpoints, real-time chat, CI/CD workflows, and an event commerce platform with 105 orders and INR 40K+ sales.",
    type: "website",
    locale: "en_US",
    url: '/',
    siteName: "Gaurav Khandelwal Portfolio",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gaurav Khandelwal - Full-Stack Developer | MERN Stack | Flutter',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Khandelwal - Full-Stack Developer | MERN Stack | Flutter",
    description: "Full-stack developer with shipped projects across MERN, Flutter, Firebase, and cloud deployment. Built a 400+ user campus portal, 58 REST/API endpoints, real-time chat, CI/CD workflows, and an event commerce platform with 105 orders and INR 40K+ sales.",
    images: ['/og-image.png'],
    creator: '@gaurav_dev',
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
  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gaurav Khandelwal',
    url: ENV.BASE_URL,
    image: `${ENV.BASE_URL}/og-image.png`,
    jobTitle: 'Full-Stack Developer | MERN Stack | Flutter',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'MIT ADT University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'MIT School of Computing',
    },
    knowsAbout: [
      'Full-Stack Development',
      'UI/UX Design',
      'React',
      'Next.js',
      'Node.js',
      'MongoDB',
      'TypeScript',
      'Web Development',
    ],
    sameAs: [
      'https://github.com/Gaurav-205',
      'https://linkedin.com/in/gaurav-khandelwal-17a127358',
    ],
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-montserrat antialiased">
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
        >
          Skip to main content
        </a>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
