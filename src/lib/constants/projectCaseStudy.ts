export type ProjectCaseStudySlug =
  | 'kampus-kart'
  | 'sahara-pet-care'
  | 'onam-festival-website'
  | 'prank-wizard';

/** Rich case-study fields merged into each project entry in `projects.ts`. */
export type ProjectCaseStudyFields = {
  architecture: {
    title: string;
    description: string;
    diagramSrc: string;
  };
  screenshots: Array<{ src: string; alt: string; caption: string }>;
  whatILearned: {
    title?: string;
    bullets: string[];
  };
};

export const PROJECT_CASE_STUDY: Record<ProjectCaseStudySlug, ProjectCaseStudyFields> = {
  'kampus-kart': {
    architecture: {
      title: 'Architecture',
      description:
        'Browser clients talk to a REST API on Express with JWT and Google OAuth. MongoDB holds domain data. Socket.IO powers global chat on the same Node process with Cloudinary for uploads.',
      diagramSrc: '/projects/kampus-kart/architecture.svg',
    },
    screenshots: [
      {
        src: '/projects/kampus-kart/shot-01.svg',
        alt: 'KampusKart campus map concept with POI layers and search.',
        caption: 'Campus map & POIs — layered map, search, and facility markers.',
      },
      {
        src: '/projects/kampus-kart/shot-02.svg',
        alt: 'KampusKart real-time chat concept with threads and reactions.',
        caption: 'Real-time chat — threads, reactions, attachments, read receipts.',
      },
      {
        src: '/projects/kampus-kart/shot-03.svg',
        alt: 'KampusKart admin workflows concept for complaints and moderation.',
        caption: 'Admin workflows — complaints, lost & found, and role-based tools.',
      },
      {
        src: '/projects/kampus-kart/shot-04.svg',
        alt: 'KampusKart events and clubs directory concept.',
        caption: 'Events & clubs — listings, filters, and recruitment-friendly layouts.',
      },
    ],
    whatILearned: {
      title: 'What I learned',
      bullets: [
        'Splitting a large campus product into feature modules early kept UI and API changes predictable.',
        'Designing Socket.IO events alongside REST resources reduced duplicate state between chat and profiles.',
        'Investing in automated tests for auth and uploads paid off when refactoring upload paths to Cloudinary.',
      ],
    },
  },
  'sahara-pet-care': {
    architecture: {
      title: 'Architecture',
      description:
        'Flutter clients use Provider for app state. Firebase Auth identifies users; Firestore stores pets, caregivers, bookings, and orders. FCM handles push; Maps and Geolocation support discovery and live tracking.',
      diagramSrc: '/projects/sahara-pet-care/architecture.svg',
    },
    screenshots: [
      {
        src: '/projects/sahara-pet-care/shot-01.svg',
        alt: 'Sahara caregiver discovery and profile preview concept.',
        caption: 'Caregiver discovery — profiles, ratings, and map-aware matching.',
      },
      {
        src: '/projects/sahara-pet-care/shot-02.svg',
        alt: 'Sahara five-stage booking lifecycle concept.',
        caption: 'Booking lifecycle — request through completion with status automation.',
      },
      {
        src: '/projects/sahara-pet-care/shot-03.svg',
        alt: 'Sahara shopping and orders concept.',
        caption: 'Shop & orders — cart, checkout-shaped flows, and order history.',
      },
      {
        src: '/projects/sahara-pet-care/shot-04.svg',
        alt: 'Sahara chat and notifications concept.',
        caption: 'Chat & notifications — in-app messaging models and FCM reminders.',
      },
    ],
    whatILearned: {
      title: 'What I learned',
      bullets: [
        'Modeling Firestore collections for read-heavy caregiver lists forced clear denormalization rules.',
        'Keeping booking state in a dedicated provider reduced cross-screen bugs in long flows.',
        'Treating maps and geolocation as optional degradation paths improved cold-start reliability.',
      ],
    },
  },
  'onam-festival-website': {
    architecture: {
      title: 'Architecture',
      description:
        'A Vite React SPA talks to Express APIs. MongoDB stores orders with server-side totals. Nodemailer sends confirmations; feature flags gate checkout in production.',
      diagramSrc: '/projects/onam-festival-website/architecture.svg',
    },
    screenshots: [
      {
        src: '/projects/onam-festival-website/shot-01.svg',
        alt: 'Onam festival landing and cultural sections concept.',
        caption: 'Festival experience — landing narrative, Sadya, and event highlights.',
      },
      {
        src: '/projects/onam-festival-website/shot-02.svg',
        alt: 'Onam shopping catalog concept.',
        caption: 'Merchandise catalog — festive UI with product grids and detail views.',
      },
      {
        src: '/projects/onam-festival-website/shot-03.svg',
        alt: 'Onam order pipeline and validation concept.',
        caption: 'Order pipeline — validated writes, totals on the server, and status updates.',
      },
      {
        src: '/projects/onam-festival-website/shot-04.svg',
        alt: 'Onam production controls concept with diagnostics.',
        caption: 'Production controls — checkout flags, rate limits, and structured logs.',
      },
    ],
    whatILearned: {
      title: 'What I learned',
      bullets: [
        'Shipping commerce under a time-bound festival meant prioritizing safe toggles over feature breadth.',
        'Server-side total validation prevented inconsistent order states when the catalog changed mid-event.',
        'Clear request IDs in logs turned chaotic festival-week debugging into traceable timelines.',
      ],
    },
  },
  'prank-wizard': {
    architecture: {
      title: 'Architecture',
      description:
        'Next.js handles marketing and the authenticated wizard UI. Express exposes JSON APIs with JWT sessions and Google OAuth via Passport. MongoDB stores users, pranks, and admin views.',
      diagramSrc: '/projects/prank-wizard/architecture.svg',
    },
    screenshots: [
      {
        src: '/projects/prank-wizard/shot-01.svg',
        alt: 'Prank Wizard four-step wizard concept.',
        caption: 'Four-step wizard — persisted progress and playful but structured UX.',
      },
      {
        src: '/projects/prank-wizard/shot-02.svg',
        alt: 'Prank Wizard authentication and OAuth concept.',
        caption: 'Authentication — email/password plus Google OAuth and password reset.',
      },
      {
        src: '/projects/prank-wizard/shot-03.svg',
        alt: 'Prank Wizard user dashboard and history concept.',
        caption: 'User dashboard — prank history, profile, and protected navigation.',
      },
      {
        src: '/projects/prank-wizard/shot-04.svg',
        alt: 'Prank Wizard admin moderation concept.',
        caption: 'Admin surface — user management, submissions, and RBAC-aware actions.',
      },
    ],
    whatILearned: {
      title: 'What I learned',
      bullets: [
        'Persisting multi-step form state server-side made refreshes feel native without fragile local-only hacks.',
        'Separating admin routes and policies early avoided leaking privileged actions into shared components.',
        'Balancing Three.js flair with bundle cost pushed me toward lazy scenes on non-critical pages.',
      ],
    },
  },
};
