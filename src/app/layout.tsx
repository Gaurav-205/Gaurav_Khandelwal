import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/SmoothCursor";

export const metadata: Metadata = {
  title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
  description: "Portfolio of Gaurav Khandelwal from Kota, Rajasthan. B.Tech in Computer Science & Engineering (Product Software Engineering) at MIT ADT University, Pune. Full-Stack Developer and UI/UX Designer passionate about creating innovative solutions.",
  keywords: ["Full-Stack Developer", "UI/UX Designer", "Portfolio", "Web Development", "React", "Next.js", "TypeScript", "Gaurav Khandelwal", "MIT ADT University", "Pune", "Kota", "Rajasthan"],
  authors: [{ name: "Gaurav Khandelwal" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://gauravkhandelwal.com'),
  openGraph: {
    title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
    description: "B.Tech student at MIT ADT University, Pune. Portfolio showcasing innovative web applications and design solutions.",
    type: "website",
    locale: "en_US",
    url: '/',
    siteName: "Gaurav Khandelwal Portfolio",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gaurav Khandelwal - Full-Stack Developer & Designer Portfolio',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Khandelwal - Full-Stack Developer & Designer",
    description: "B.Tech student at MIT ADT University, Pune. Portfolio showcasing innovative web applications and design solutions.",
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
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://gauravkhandelwal.com',
    image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gauravkhandelwal.com'}/og-image.png`,
    jobTitle: 'Full-Stack Developer & UI/UX Designer',
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
