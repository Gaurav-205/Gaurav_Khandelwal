// Animation constants
export const ANIMATION_DELAYS = {
  LOADING_COMPLETE: 500,
  NAVIGATION_APPEAR: 1500,
  AUTO_PLAY_RESUME: 3000,
} as const;

export const ANIMATION_DURATIONS = {
  LOADING_COUNT: 3,
  LOADING_FADE: 0.5,
  NAVIGATION_SLIDE: 1,
  CURSOR_SCALE: 150,
} as const;

// 3D Gallery constants
export const GALLERY_CONFIG = {
  SPEED: 1.2,
  Z_SPACING: 3,
  VISIBLE_COUNT: 12,
  FALLOFF: { near: 0.8, far: 14 },
  FADE_SETTINGS: {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.75, end: 0.95 },
  },
  BLUR_SETTINGS: {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 8.0,
  },
} as const;

// Project data with detailed information
export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  role: string;
  year: string;
  category: string;
  sections?: Array<{
    title: string;
    content: string;
  }>;
}

export const PROJECT_DATA: ProjectData[] = [
  {
    id: 1,
    slug: 'mobile-banking-app',
    title: 'Mobile Banking App',
    description: 'A comprehensive mobile banking application focused on user experience and security. Designed to simplify financial transactions while maintaining the highest security standards.',
    image: '/projects/mobile-banking-app.svg',
    role: 'UI/UX Designer, User Researcher',
    year: '2024',
    category: 'Mobile App Design',
    sections: [
      {
        title: 'Challenge',
        content: 'Traditional banking apps often suffer from complex navigation and poor user experience. The challenge was to create an intuitive interface that makes banking accessible to users of all technical backgrounds while ensuring security remains paramount.'
      },
      {
        title: 'Solution',
        content: 'I designed a clean, minimalist interface with clear visual hierarchy and intuitive navigation patterns. The app features biometric authentication, smart categorization of transactions, and personalized financial insights to help users manage their money better.'
      },
      {
        title: 'Impact',
        content: 'The redesigned app saw a 40% increase in user engagement and a 25% reduction in customer support tickets. User satisfaction scores improved significantly, with particular praise for the simplified onboarding process.'
      }
    ]
  },
  {
    id: 2,
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform designed to enhance the online shopping experience with intuitive navigation, personalized recommendations, and seamless checkout process.',
    image: '/projects/ecommerce-platform.svg',
    role: 'Lead UI/UX Designer',
    year: '2024',
    category: 'Web Design',
    sections: [
      {
        title: 'Research & Discovery',
        content: 'Through extensive user research and competitive analysis, I identified key pain points in the existing shopping experience. Users struggled with product discovery and the checkout process was too complex, leading to high cart abandonment rates.'
      },
      {
        title: 'Design Process',
        content: 'I implemented a user-centered design approach, creating detailed user personas and journey maps. The new design features improved search functionality, streamlined product pages, and a simplified one-page checkout process.'
      }
    ]
  },
  {
    id: 3,
    slug: 'brand-identity-system',
    title: 'Brand Identity System',
    description: 'Complete brand identity design for a sustainable fashion startup, including logo design, color palette, typography, and brand guidelines.',
    image: '/projects/brand-identity-system.svg',
    role: 'Brand Designer',
    year: '2023',
    category: 'Brand Identity',
    sections: [
      {
        title: 'Brand Strategy',
        content: 'Developed a comprehensive brand strategy that reflects the company\'s commitment to sustainability and ethical fashion. The visual identity needed to appeal to environmentally conscious consumers while maintaining a premium feel.'
      },
      {
        title: 'Visual Identity',
        content: 'Created a modern, clean logo that incorporates subtle references to nature and sustainability. The color palette draws from earth tones, and the typography is both elegant and accessible across all touchpoints.'
      }
    ]
  },
  {
    id: 4,
    slug: 'dashboard-analytics',
    title: 'Analytics Dashboard',
    description: 'A comprehensive analytics dashboard for marketing teams to track campaign performance, user engagement, and ROI metrics in real-time.',
    image: '/projects/dashboard-analytics.svg',
    role: 'UI/UX Designer',
    year: '2024',
    category: 'Dashboard Design',
    sections: [
      {
        title: 'User Research',
        content: 'Conducted interviews with marketing professionals to understand their daily workflows and pain points with existing analytics tools. The main challenges were information overload and difficulty in finding actionable insights.'
      },
      {
        title: 'Information Architecture',
        content: 'Designed a clear information hierarchy that prioritizes the most important metrics while allowing users to drill down into detailed data when needed. Implemented customizable widgets and saved views for different user roles.'
      }
    ]
  },
  {
    id: 5,
    slug: 'social-media-app',
    title: 'Social Media App',
    description: 'A next-generation social media platform focused on meaningful connections and mental health, with features designed to promote positive interactions.',
    image: '/projects/social-media-app.svg',
    role: 'Senior UI/UX Designer',
    year: '2023',
    category: 'Mobile App Design',
    sections: [
      {
        title: 'Problem Statement',
        content: 'Traditional social media platforms often contribute to anxiety and negative mental health outcomes. The goal was to create a platform that encourages genuine connections and positive interactions while minimizing harmful behaviors.'
      },
      {
        title: 'Design Philosophy',
        content: 'Implemented design patterns that promote mindful usage, including time limits, positive reinforcement mechanisms, and features that encourage users to engage meaningfully rather than passively consume content.'
      }
    ]
  },
  {
    id: 6,
    slug: 'corporate-website',
    title: 'Corporate Website Redesign',
    description: 'Complete redesign of a corporate website to improve user experience, increase conversions, and better reflect the company\'s modern brand identity.',
    image: '/projects/corporate-website.svg',
    role: 'UI/UX Designer, Front-end Developer',
    year: '2023',
    category: 'Web Design',
    sections: [
      {
        title: 'Analysis',
        content: 'The existing website had poor navigation, outdated design, and low conversion rates. Through analytics review and user testing, I identified key areas for improvement including page load times, mobile responsiveness, and content organization.'
      },
      {
        title: 'Redesign Strategy',
        content: 'Created a modern, responsive design with improved navigation, faster loading times, and clear calls-to-action. The new design increased conversion rates by 35% and reduced bounce rate by 28%.'
      }
    ]
  },
  {
    id: 7,
    slug: 'booking-system-ux',
    title: 'Booking System UX',
    description: 'User experience design for a comprehensive booking system used by hotels, restaurants, and service providers to manage reservations and customer interactions.',
    image: '/projects/booking-system-ux.svg',
    role: 'UX Designer, User Researcher',
    year: '2024',
    category: 'UX Design',
    sections: [
      {
        title: 'User Journey Mapping',
        content: 'Mapped out the complete user journey from initial booking inquiry to post-service follow-up. Identified multiple friction points in the existing system that were causing booking abandonment and customer frustration.'
      },
      {
        title: 'Solution Design',
        content: 'Designed a streamlined booking flow with smart defaults, real-time availability checking, and automated confirmation processes. The new system reduced booking time by 60% and increased completion rates significantly.'
      }
    ]
  },
  {
    id: 8,
    slug: 'design-system-library',
    title: 'Design System Library',
    description: 'A comprehensive design system and component library created to ensure consistency across multiple products and improve development efficiency.',
    image: '/projects/design-system-library.svg',
    role: 'Design Systems Lead',
    year: '2023',
    category: 'Design Systems',
    sections: [
      {
        title: 'System Architecture',
        content: 'Built a scalable design system with atomic design principles, including a comprehensive component library, design tokens, and detailed documentation. The system serves as the foundation for all product designs across the organization.'
      },
      {
        title: 'Implementation',
        content: 'Collaborated closely with development teams to ensure seamless implementation. Created detailed specifications, usage guidelines, and interactive prototypes to facilitate adoption across multiple product teams.'
      }
    ]
  }
];

// Extract images for the 3D gallery
export const SAMPLE_IMAGES: Array<{ src: string; alt: string; slug: string }> = PROJECT_DATA.map(project => ({
  src: project.image,
  alt: project.title,
  slug: project.slug
}));

// Z-index layers
export const Z_INDEX = {
  CURSOR: 100,
  NAVIGATION: 60,
  LOADING: 50,
  GALLERY_OVERLAY: 10,
} as const;

// Cursor spring configuration
export const CURSOR_SPRING_CONFIG = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};