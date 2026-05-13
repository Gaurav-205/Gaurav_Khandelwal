/**
 * src/content/projects.ts — project content layer.
 *
 * This file owns the human-readable content for every project: titles,
 * descriptions, roles, tech stacks, narrative sections, and URLs.
 *
 * It is intentionally separate from the validation schema (src/lib/constants/projects.ts)
 * and the rich case-study data (src/lib/constants/projectCaseStudy.ts) so that
 * content edits never require touching infrastructure code.
 *
 * To add a project:
 *   1. Add an entry here.
 *   2. Add the matching case-study entry in src/lib/constants/projectCaseStudy.ts.
 *   3. Drop the cover image in public/projects/.
 *   4. Run `npm run validate:content` to catch missing images or bad URLs before deploying.
 *
 * NOTE: `slug` is typed as `string` here to keep this file free of cross-module
 * imports (which would create a circular dependency with the validation layer).
 * The slug is validated against ProjectCaseStudySlug at merge time in projects.ts.
 */

export interface ProjectContentEntry {
  /** Unique URL-safe identifier. Must match a ProjectCaseStudySlug. */
  slug: string;
  title: string;
  description: string;
  /** Path relative to /public, e.g. '/projects/kampuskart.png' */
  image: string;
  role: string;
  year: string;
  category: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  sections?: Array<{ title: string; content: string }>;
}

/**
 * Ordered project list. The display order here drives the gallery, the
 * projects grid, and the prev/next navigation on detail pages.
 *
 * Do NOT rely on numeric `id` for ordering — use array position instead.
 * The `id` field on the merged ProjectData is derived from this order at
 * build time and is only used for display ("Project 1 of 4").
 */
export const PROJECT_CONTENT: ProjectContentEntry[] = [
  {
    slug: 'kampus-kart',
    title: 'KampusKart',
    description:
      'A full-stack campus portal for MIT ADT University serving 400+ users across maps, events, lost and found, complaints, facilities, clubs, profiles, admin workflows, and real-time chat.',
    image: '/projects/kampuskart.png',
    role: 'Full-Stack Developer',
    year: '2025',
    category: 'Campus Management Platform',
    techStack: [
      'React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Material UI',
      'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT',
      'Google Maps API', 'Jest', 'Vitest', 'GitHub Actions',
    ],
    liveUrl: 'https://kampuskart.netlify.app',
    githubUrl: 'https://github.com/kalviumcommunity/S72_Gaurav_Capstone_KampusKart',
    sections: [
      {
        title: 'The Challenge',
        content:
          'Students and faculty often depend on disconnected sources for campus navigation, events, announcements, lost and found, complaints, facilities, club recruitment, and communication. KampusKart was built to centralize these workflows into one practical campus platform for MIT ADT University.',
      },
      {
        title: 'The Solution',
        content:
          'I developed a full-stack campus portal with modules for campus maps, news, events, lost and found, complaints, facilities, club recruitments, user profiles, authentication, admin workflows, and global chat. The platform supports search, filters, image uploads, status tracking, role-based access, and responsive layouts for both desktop and mobile users.',
      },
      {
        title: 'Technical Implementation',
        content:
          'The frontend uses React, TypeScript, Vite, Tailwind CSS, Material UI, feature-based modules, reusable components, and responsive UI patterns. The backend uses Express.js, MongoDB, Mongoose, JWT authentication, Google OAuth, Socket.IO, Cloudinary uploads, Nodemailer, validation middleware, rate limiting, and repository/service layers. Real-time chat supports messages, replies, emoji reactions, read receipts, file attachments, and search.',
      },
      {
        title: 'Outcome',
        content:
          'KampusKart demonstrates my ability to build and organize a larger product with 8 major workflows, 58 REST/API endpoints, 400+ users, and 157 test cases covering authentication, validation, models, CRUD routes, UI behavior, and smoke tests.',
      },
    ],
  },
  {
    slug: 'sahara-pet-care',
    title: 'Sahara Pet Care',
    description:
      'A Flutter and Firebase pet care app for caregiver discovery, service booking, pet profiles, adoption, shopping, orders, chat, live tracking, notifications, and cross-platform deployment.',
    image: '/projects/sahara-pet-care.svg',
    role: 'Flutter Developer',
    year: '2026',
    category: 'Cross-Platform Pet Care App',
    techStack: [
      'Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore',
      'Firebase Messaging', 'Provider', 'Google Maps Flutter', 'Geolocator', 'Cloudinary',
    ],
    githubUrl: 'https://github.com/Gaurav-205/Sahara',
    sections: [
      {
        title: 'The Challenge',
        content:
          'Pet owners need a single place to discover caregivers, manage pets, book services, shop for products, track orders, explore adoption options, and communicate with caregivers. Sahara was designed to bring these workflows into one cross-platform mobile experience.',
      },
      {
        title: 'The Solution',
        content:
          'I built Sahara as a Flutter app backed by Firebase services. The app includes authentication, caregiver discovery, pet profiles, booking flows, favorites, adoption, shopping, cart and order workflows, chat models, notifications, and location-based features. The goal was to create a mobile-first product with clear user flows and maintainable state management.',
      },
      {
        title: 'Technical Implementation',
        content:
          'The application uses Flutter, Dart, Material 3, Firebase Auth, Cloud Firestore, Firebase Messaging, Provider state management, Google Maps, geolocation, Cloudinary media handling, shared preferences, and modular screens, services, models, providers, widgets, and utility layers. State is organized across modules for authentication, bookings, pets, caregivers, favorites, location, and cart management.',
      },
      {
        title: 'Outcome',
        content:
          'Sahara shows my ability to work beyond web development by building a cross-platform Flutter/Firebase application with 6 major workflows and a 5-stage booking lifecycle involving automation, active service tracking, geolocation, and Google Maps integration.',
      },
    ],
  },
  {
    slug: 'onam-festival-website',
    title: 'Onam Festival Website',
    description:
      "A full-stack cultural event and commerce platform for MIT ADT University's Onam celebration, processing 105 orders and INR 40K+ in sales across a 7-day festival commerce workflow.",
    image: '/projects/onam-festival.png',
    role: 'Full-Stack Developer and UI/UX Designer',
    year: '2025',
    category: 'Event Commerce Platform',
    techStack: [
      'React 18', 'Vite 7', 'React Router', 'Tailwind CSS',
      'Node.js', 'Express.js', 'MongoDB', 'Mongoose',
      'Nodemailer', 'express-validator', 'GitHub Actions', 'Netlify', 'Render',
    ],
    liveUrl: 'https://onammitadt.netlify.app',
    githubUrl: 'https://github.com/Gaurav-205/Onam',
    sections: [
      {
        title: 'The Challenge',
        content:
          'University festival operations can become difficult to manage when event information, merchandise orders, payment coordination, and communication are handled manually. The goal was to create a festive, responsive platform that could present Onam celebration content while supporting backend order workflows.',
      },
      {
        title: 'The Solution',
        content:
          'I built a full-stack Onam festival portal with cultural landing sections, Sadya information, event highlights, a traditional shopping catalog, backend-powered order handling, email utilities, and safe production controls. The frontend focuses on clear navigation and festive visuals, while the backend supports order creation, retrieval, filtering, status updates, validation, and diagnostics.',
      },
      {
        title: 'Technical Implementation',
        content:
          'The frontend uses React, Vite, React Router, and Tailwind CSS. The backend uses Express.js, MongoDB, Mongoose, Nodemailer, express-validator, CORS controls, rate limiting, request IDs, structured logging, and health diagnostics. I implemented 4 order-management APIs for order creation, lookup, filtering, and status updates with MongoDB persistence and server-side total validation. The checkout flow is feature-flagged for controlled activation.',
      },
      {
        title: 'Outcome',
        content:
          'The platform supported a 7-day university festival commerce workflow, processing 105 orders and INR 40K+ in sales. It also introduced production controls such as checkout feature flags, CORS allowlists, rate limiting, request IDs, health diagnostics, and structured logging.',
      },
    ],
  },
  {
    slug: 'prank-wizard',
    title: 'Prank Wizard',
    description:
      'A full-stack prank planning platform with a 4-step persisted workflow, JWT and Google OAuth authentication, password reset, protected routes, admin management, and deployment-ready engineering.',
    image: '/projects/prank-wizard.png',
    role: 'Full-Stack Developer',
    year: '2026',
    category: 'Full-Stack Web Application',
    techStack: [
      'Next.js 16', 'React 19', 'TypeScript', 'Express.js', 'MongoDB',
      'JWT', 'Passport.js', 'Google OAuth', 'Tailwind CSS v4',
      'Three.js', 'GSAP', 'Docker', 'GitHub Actions',
    ],
    liveUrl: 'https://prankwizard.netlify.app',
    githubUrl: 'https://github.com/Gaurav-205/LetsSpiceUp',
    sections: [
      {
        title: 'The Challenge',
        content:
          'The project needed to turn a playful idea into a structured product with secure accounts, persistent form progress, protected user flows, admin management, and production-ready deployment. The challenge was to keep the experience fun while still applying serious full-stack engineering practices.',
      },
      {
        title: 'The Solution',
        content:
          'I built a prank planning platform with a 4-step persisted workflow, user registration, login, Google OAuth, password reset, protected routes, user dashboard, profile management, prank history, and an admin dashboard for managing users and prank submissions.',
      },
      {
        title: 'Technical Implementation',
        content:
          'The frontend uses Next.js, React, TypeScript, Tailwind CSS, GSAP, and Three.js. The backend uses Express.js, MongoDB, Mongoose, JWT authentication, Passport.js Google OAuth, bcrypt password hashing, sessions, rate limiting, input sanitization, security headers, CORS configuration, environment validation, health checks, Docker support, and GitHub Actions.',
      },
      {
        title: 'Outcome',
        content:
          'Prank Wizard demonstrates my ability to build a complete full-stack product with authentication, protected routes, persistent workflows, MongoDB-backed admin management, role-based access control, pagination, dashboard statistics, security headers, and deployment configuration.',
      },
    ],
  },
];
