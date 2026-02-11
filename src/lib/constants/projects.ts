// Project data with Gaurav Khandelwal's actual projects
export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  role: string;
  year: string;
  category: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  sections?: Array<{
    title: string;
    content: string;
  }>;
}

export const PROJECT_DATA: ProjectData[] = [
  {
    id: 1,
    slug: 'prank-wizard',
    title: 'Prank Wizard',
    description: 'A full-stack prank planning platform with 4-step wizard, 3D animations, and comprehensive security implementation. Features JWT authentication, role-based admin dashboard, and production-ready deployment.',
    image: '/projects/mobile-banking-app.svg',
    role: 'Full-Stack Developer & UI/UX Designer',
    year: '2025',
    category: 'Full-Stack Web Application',
    techStack: ['Next.js 16', 'Express.js', 'MongoDB', 'TypeScript', 'Tailwind CSS v4', 'Three.js', 'GSAP'],
    liveUrl: 'https://prankwizard.netlify.app',
    githubUrl: 'https://github.com/Gaurav-205/LetsSpiceUp',
    sections: [
      {
        title: 'Challenge',
        content: 'Create an engaging, secure platform for prank planning that combines interactive UI with robust backend architecture. The challenge was to build a production-ready application with enterprise-level security while maintaining a playful, engaging user experience.'
      },
      {
        title: 'Technical Implementation',
        content: 'Built with Next.js 16 frontend featuring 25 reusable React components, interactive 3D Ballpit background using Three.js, and GSAP animations. Backend uses Express.js with 14 RESTful API endpoints, service layer architecture, and MongoDB for data persistence.'
      },
      {
        title: 'Security & DevOps',
        content: 'Implemented 8-layer security including rate limiting, bcrypt hashing, Helmet.js headers, XSS prevention, and RBAC. Used Docker multi-stage builds, GitHub Actions CI/CD with 5 automated checks, and achieved 99.9% uptime with zero-downtime deployments.'
      },
      {
        title: 'Impact',
        content: 'Achieved 95+ Lighthouse performance score with 100% TypeScript coverage. Successfully deployed to production with 24/7 uptime using keep-alive services. Demonstrates enterprise-grade development practices in a student project.'
      }
    ]
  },
  {
    id: 2,
    slug: 'kampus-kart',
    title: 'KampusKart',
    description: 'A comprehensive campus portal democratizing access to campus information and services. Features 12 core modules including interactive maps, real-time chat, and facilities management with 40-60% reduction in administrative overhead.',
    image: '/projects/ecommerce-platform.svg',
    role: 'Full-Stack Developer & Product Designer',
    year: '2025',
    category: 'Campus Management Platform',
    techStack: ['React 19', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
    liveUrl: 'https://kampuskart.netlify.app',
    sections: [
      {
        title: 'Problem Statement',
        content: 'Campus information was scattered across multiple platforms, creating inefficiencies and barriers to student engagement. Students struggled to access dining menus, facility schedules, event information, and campus services through a unified interface.'
      },
      {
        title: 'Solution Architecture',
        content: 'Developed 12 integrated modules: Interactive Campus Map with Google Maps API, real-time shuttle tracking, dining services hub, facilities management, campus updates engine, feedback system, lost & found with AI search, global chat platform, clubs portal, user profiles with gamification, events calendar, and news feed.'
      },
      {
        title: 'Technical Features',
        content: 'Real-time communication using Socket.IO for instant messaging and updates. Cloudinary integration for optimized image handling. Node-cron keep-alive service for 24/7 availability. Comprehensive security implementation with mobile-responsive design.'
      },
      {
        title: 'Impact & Results',
        content: 'Reduced administrative overhead by 40-60% for routine queries. Centralized platform improved student engagement and streamlined campus operations. Serves as a model for digital campus transformation.'
      }
    ]
  },
  {
    id: 3,
    slug: 'onam-festival-website',
    title: 'Onam Festival Website',
    description: 'A cultural event platform with multi-step registration, e-commerce functionality, and automated systems. Achieved 100+ user registrations, ₹25,000 merchandise revenue, and 95 Lighthouse performance score.',
    image: '/projects/dashboard-analytics.svg',
    role: 'Full-Stack Developer & UI/UX Designer',
    year: '2025',
    category: 'Event Management Platform',
    techStack: ['React 18', 'Express.js', 'MongoDB', 'Node.js', 'Tailwind CSS 3', 'Vite 7', 'Nodemailer'],
    liveUrl: 'https://onammitadt.netlify.app',
    sections: [
      {
        title: 'Event Management Challenge',
        content: 'Traditional festival organization relied on manual processes for registration, merchandise sales, and attendee management. The goal was to create a digital platform that could handle the entire event lifecycle while celebrating cultural heritage.'
      },
      {
        title: 'Feature Development',
        content: 'Multi-step event registration with email confirmations, e-commerce functionality for traditional merchandise, persistent shopping cart, automated email systems via Nodemailer, QR code generation for check-ins, and real-time capacity tracking.'
      },
      {
        title: 'Performance Optimization',
        content: 'Achieved 40% bundle size reduction through code splitting, 65% image weight reduction with WebP conversion, implemented lazy loading with Intersection Observer, and scored 97 on Lighthouse mobile performance.'
      },
      {
        title: 'Cultural Impact',
        content: 'Increased participation by 40% through centralized platform. Generated ₹25,000 in merchandise revenue. Achieved 4.6/5 average satisfaction rating. Demonstrated how technology can enhance cultural celebrations while maintaining traditional values.'
      }
    ]
  },
  {
    id: 4,
    slug: 'ai-powered-platform',
    title: 'AI-Powered Platform',
    description: 'An innovative AI-driven solution currently in development. This project will showcase advanced machine learning capabilities and intelligent automation features.',
    image: '/projects/design-system-library.svg',
    role: 'Full-Stack Developer & AI Engineer',
    year: '2025',
    category: 'Artificial Intelligence',
    techStack: ['React', 'Python', 'TensorFlow', 'Node.js', 'MongoDB'],
    sections: [
      {
        title: 'Coming Soon',
        content: 'This exciting project is currently under development. It will feature cutting-edge AI technologies and innovative user experiences. Stay tuned for updates on this revolutionary platform that will transform how users interact with intelligent systems.'
      }
    ]
  },
  {
    id: 5,
    slug: 'blockchain-application',
    title: 'Blockchain Application',
    description: 'A decentralized application leveraging blockchain technology for secure and transparent operations. Currently in the planning and development phase.',
    image: '/projects/corporate-website.svg',
    role: 'Blockchain Developer & UI/UX Designer',
    year: '2025',
    category: 'Blockchain Technology',
    techStack: ['Solidity', 'Web3.js', 'React', 'Node.js', 'Ethereum'],
    sections: [
      {
        title: 'Coming Soon',
        content: 'This groundbreaking blockchain application is in active development. It will demonstrate the power of decentralized technologies and smart contracts. The project aims to solve real-world problems through innovative blockchain solutions.'
      }
    ]
  },
  {
    id: 6,
    slug: 'mobile-app-project',
    title: 'Mobile App Project',
    description: 'A cross-platform mobile application designed to enhance user productivity and engagement. Features modern UI/UX design and seamless performance.',
    image: '/projects/social-media-app.svg',
    role: 'Mobile Developer & UI/UX Designer',
    year: '2025',
    category: 'Mobile Development',
    techStack: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Expo'],
    sections: [
      {
        title: 'Coming Soon',
        content: 'This mobile application is being crafted with attention to detail and user experience. It will showcase modern mobile development practices and innovative features that will set new standards in mobile app design and functionality.'
      }
    ]
  },
  {
    id: 7,
    slug: 'iot-solution',
    title: 'IoT Solution',
    description: 'An Internet of Things solution that connects physical devices with digital platforms. Currently developing smart automation and monitoring capabilities.',
    image: '/projects/booking-system-ux.svg',
    role: 'IoT Developer & Systems Designer',
    year: '2025',
    category: 'Internet of Things',
    techStack: ['Arduino', 'Raspberry Pi', 'Node.js', 'MQTT', 'React'],
    sections: [
      {
        title: 'Coming Soon',
        content: 'This IoT project will bridge the gap between physical and digital worlds. It focuses on creating intelligent systems that can monitor, analyze, and respond to real-world conditions automatically, making everyday life more efficient and connected.'
      }
    ]
  },
  {
    id: 8,
    slug: 'data-analytics-dashboard',
    title: 'Data Analytics Dashboard',
    description: 'A comprehensive data visualization and analytics platform for business intelligence. Features real-time data processing and interactive visualizations.',
    image: '/projects/brand-identity-system.svg',
    role: 'Data Engineer & Frontend Developer',
    year: '2025',
    category: 'Data Analytics',
    techStack: ['Python', 'D3.js', 'React', 'PostgreSQL', 'Apache Kafka'],
    sections: [
      {
        title: 'Coming Soon',
        content: 'This advanced analytics platform is being developed to provide powerful insights through data visualization. It will feature real-time data processing, interactive charts, and intelligent reporting capabilities for data-driven decision making.'
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
