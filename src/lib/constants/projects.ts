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
        title: 'Problem',
        content: 'Creating an engaging, secure platform for prank planning that combines interactive UI with robust backend architecture. The challenge was building a production-ready application with enterprise-level security while maintaining a playful, engaging user experience.'
      },
      {
        title: 'Solution',
        content: 'Built a comprehensive 4-step wizard interface with 25 reusable React components, interactive 3D Ballpit background using Three.js for visual engagement, and GSAP animations for smooth transitions. Implemented role-based admin dashboard for prank coordination, user management, and event moderation with comprehensive analytics.'
      },
      {
        title: 'Technical Implementation',
        content: 'Next.js 16 frontend with TypeScript for type safety and Tailwind CSS v4 for styling. Express.js backend with 14 RESTful API endpoints, service layer architecture, and MongoDB for data persistence. 8-layer security implementation including JWT authentication, bcrypt password hashing with salt rounds, rate limiting, Helmet.js security headers, XSS prevention, and role-based access control (RBAC). Docker multi-stage builds for optimized containerization with GitHub Actions CI/CD pipeline featuring 5 automated checks including linting, testing, and security scanning.'
      },
      {
        title: 'Impact',
        content: 'Achieved 95+ Lighthouse performance score with 100% TypeScript coverage ensuring code quality and maintainability. Successfully deployed to production with 24/7 uptime using keep-alive services. Maintained 99.9% uptime with zero-downtime deployments through automated CI/CD. Demonstrates enterprise-grade development practices including comprehensive security, automated testing, and production monitoring.'
      }
    ]
  },
  {
    id: 2,
    slug: 'kampus-kart',
    title: 'KampusKart',
    description: 'A full-stack campus portal for MIT ADT University centralizing essential services. Features 12 core modules including interactive mapping, real-time chat, and facilities management with 24/7 uptime.',
    image: '/projects/ecommerce-platform.svg',
    role: 'Full-Stack Developer',
    year: '2025',
    category: 'Campus Management Platform',
    techStack: ['React 19', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Google Maps API'],
    liveUrl: 'https://kampuskart.netlify.app',
    githubUrl: 'https://github.com/kalviumcommunity/S72_Gaurav_Capstone_KampusKart',
    sections: [
      {
        title: 'Problem',
        content: 'Campus information at MIT ADT University was scattered across multiple platforms, creating inefficiencies for students and faculty trying to access essential services like dining menus, facility schedules, event information, and campus navigation.'
      },
      {
        title: 'Solution',
        content: 'Developed a comprehensive campus portal with 12 integrated modules: Interactive Campus Map with Google Maps API integration, facilities management system, campus updates engine with department feeds, feedback and grievance system, lost & found repository with AI-powered search, real-time global chat platform, clubs and recruitment portal, user profile system with gamification, events calendar with RSVP, and centralized news feed.'
      },
      {
        title: 'Technical Implementation',
        content: 'React 19 frontend with Vite build tooling and Tailwind CSS for modern UI development. Node.js + Express.js backend with MongoDB database for flexible data storage. Real-time bidirectional communication via Socket.IO for instant messaging with typing indicators and reactions. JWT authentication with Passport.js for secure user sessions. Automated CI/CD pipeline with GitHub Actions for continuous integration and deployment. Deployed on Netlify (frontend) and Render (backend) with Node-cron keep-alive service ensuring 24/7 availability.'
      },
      {
        title: 'Impact',
        content: 'Achieved < 3 second load times with Vite-powered builds, handling 1000+ concurrent connections, and < 100ms latency for real-time chat. Production deployment currently serving live users at MIT ADT University with 99.9% uptime. Successfully centralized campus services into a single unified platform improving student engagement and operational efficiency.'
      }
    ]
  },
  {
    id: 3,
    slug: 'onam-festival-website',
    title: 'Onam Festival Website',
    description: 'A production-deployed MERN stack platform for MIT ADT University\'s Onam celebrations. Features event registration, e-commerce functionality, and cultural content management with 400+ registrations and ₹25,000 merchandise revenue.',
    image: '/projects/dashboard-analytics.svg',
    role: 'Full-Stack Developer & UI/UX Designer',
    year: '2025',
    category: 'Event Management Platform',
    techStack: ['React 18', 'Express.js', 'MongoDB', 'Node.js', 'Tailwind CSS 3', 'Vite 7', 'Nodemailer'],
    liveUrl: 'https://onammitadt.netlify.app',
    sections: [
      {
        title: 'Problem',
        content: 'Traditional festival organization at MIT ADT University relied on manual processes for registration and merchandise sales, creating inefficiencies and limiting participation tracking.'
      },
      {
        title: 'Solution',
        content: 'Built a full-stack MERN application featuring multi-step event registration with form validation, e-commerce shopping cart with persistent state, automated email confirmations via Nodemailer, and WCAG 2.1 compliant responsive design ensuring accessibility across all devices.'
      },
      {
        title: 'Technical Implementation',
        content: 'React 18 frontend with Vite build tooling and Tailwind CSS for rapid UI development. Express.js backend with MongoDB for data persistence and Nodemailer for automated email notifications. Deployed on Netlify (frontend) and Render (backend) with automated CI/CD via GitHub Actions.'
      },
      {
        title: 'Impact',
        content: '400+ successful registrations across multiple Onam events including Pookalam competition and Onasadya feast. Generated ₹25,000 in merchandise revenue through 75 shopping transactions. Achieved 4.7/5 average satisfaction rating from 120+ survey responses. Increased participation by 40% compared to previous years with 99.9% uptime during the festival period.'
      }
    ]
  },
  {
    id: 4,
    slug: 'ai-powered-platform',
    title: 'AI-Powered Platform',
    description: 'An innovative AI-drive  n solution currently in development. This project will showcase advanced machine learning capabilities and intelligent automation features.',
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
