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
    description: 'A fun, interactive web platform that helps people plan creative pranks. Live and serving real users with secure login, beautiful 3D animations, and an admin dashboard for managing everything.',
    image: '/projects/mobile-banking-app.svg',
    role: 'Full-Stack Developer & DevOps Engineer',
    year: '2025',
    category: 'Production Full-Stack Application',
    techStack: ['Next.js 16', 'React 19', 'Express.js', 'MongoDB Atlas', 'TypeScript', 'Tailwind CSS v4', 'Three.js', 'GSAP', 'Docker', 'GitHub Actions', 'Vibe Coding'],
    liveUrl: 'https://prankwizard.netlify.app',
    githubUrl: 'https://github.com/Gaurav-205/LetsSpiceUp',
    sections: [
      {
        title: 'The Challenge',
        content: 'Planning pranks was chaotic and unorganized. People needed a fun, secure way to coordinate their ideas without worrying about privacy or losing their plans. The goal was to create something that felt playful but worked like a professional application secure, fast, and always available.'
      },
      {
        title: 'The Solution',
        content: 'Built an engaging web app with a simple 4-step wizard that guides users through planning their perfect prank. Added a mesmerizing 3D background with floating spheres that respond to your mouse, making the experience feel alive and interactive. Users can sign in with email or Google, and admins get a powerful dashboard to manage everything. The interface is smooth, responsive, and works beautifully on any device.'
      },
      {
        title: 'How It Works',
        content: 'The platform uses modern web technologies to deliver a fast, secure experience. The frontend provides smooth animations and instant feedback, while the backend handles user accounts, data storage, and security. Multiple layers of protection keep user data safe, including encrypted passwords, login rate limits, and secure sessions. The entire system runs on cloud servers with automatic updates and monitoring to ensure it\'s always online and performing well.'
      },
      {
        title: 'Real-World Impact',
        content: 'Successfully launched and serving real users at prankwizard.netlify.app. The site loads in under 2 seconds, maintains 99.9% uptime, and has been deployed multiple times with zero downtime. Users enjoy the interactive 3D experience while admins can easily manage the platform. This project demonstrates the ability to build production-ready applications that are both fun and professionally engineered combining creative design with solid technical foundations.'
      }
    ]
  },
  {
    id: 2,
    slug: 'kampus-kart',
    title: 'KampusKart',
    description: 'A one-stop campus hub for MIT ADT University that brings together everything students need from finding classrooms to chatting with friends, checking event schedules to reporting issues. All in one place, always accessible.',
    image: '/projects/ecommerce-platform.svg',
    role: 'Full-Stack Developer',
    year: '2025',
    category: 'Campus Management Platform',
    techStack: ['React 19', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Google Maps API'],
    liveUrl: 'https://kampuskart.netlify.app',
    githubUrl: 'https://github.com/kalviumcommunity/S72_Gaurav_Capstone_KampusKart',
    sections: [
      {
        title: 'The Challenge',
        content: 'Students at MIT ADT University had to juggle multiple apps and websites just to find basic information facility hours, event schedules, and campus locations. Important updates got lost, and there was no easy way to connect with the campus community or report issues.'
      },
      {
        title: 'The Solution',
        content: 'Created a unified campus platform with 12 essential features: an interactive map to navigate campus, real-time chat to connect with everyone, a lost & found system, event calendar with easy RSVP, clubs directory, facility booking, feedback system, and a centralized news feed. Everything students need is now just a click away, with a clean interface that works perfectly on phones and computers.'
      },
      {
        title: 'How It Works',
        content: 'The platform combines a fast, modern interface with a robust backend that handles thousands of users simultaneously. Real-time chat lets students message instantly with typing indicators and reactions. The interactive map uses Google Maps to help navigate campus buildings and facilities. Secure login keeps accounts safe, while automatic cloud backups ensure no data is ever lost. The system runs 24/7 with automatic monitoring to catch and fix any issues immediately.'
      },
      {
        title: 'Real-World Impact',
        content: 'Currently live and serving students at MIT ADT University with lightning-fast load times under 3 seconds. The platform handles over 1,000 students online at once, with chat messages delivered in under 100 milliseconds. Successfully centralized all campus services into one easy-to-use hub, dramatically improving how students engage with campus life and access important information. Maintains 99.9% uptime, ensuring students can always access what they need.'
      }
    ]
  },
  {
    id: 3,
    slug: 'onam-festival-website',
    title: 'Onam Festival Website',
    description: 'A vibrant festival platform for MIT ADT University\'s Onam celebrations that made registration effortless and merchandise shopping fun. Helped 400+ students participate and generated ₹25,000 in sales.',
    image: '/projects/dashboard-analytics.svg',
    role: 'Full-Stack Developer & UI/UX Designer',
    year: '2025',
    category: 'Event Management Platform',
    techStack: ['React 18', 'Express.js', 'MongoDB', 'Node.js', 'Tailwind CSS 3', 'Vite 7', 'Nodemailer'],
    liveUrl: 'https://onammitadt.netlify.app',
    githubUrl: 'https://github.com/Gaurav-205/Onam',
    sections: [
      {
        title: 'The Challenge',
        content: 'Organizing MIT ADT University\'s Onam festival traditionally meant manual registrations, paper forms, and cash-only merchandise sales. This created long queues, tracking nightmares, and limited participation. The festival committee needed a modern solution that could handle hundreds of registrations while making the experience smooth and enjoyable.'
      },
      {
        title: 'The Solution',
        content: 'Built a beautiful, easy-to-use website where students could register for events like the Pookalam competition and Onasadya feast in just a few clicks. Added an online store for festival merchandise with a shopping cart that remembers items even if you close the browser. Automatic email confirmations kept everyone informed, and the responsive design worked perfectly on phones, tablets, and computers.'
      },
      {
        title: 'How It Works',
        content: 'The platform features a step-by-step registration process that guides users through event selection and payment. The shopping cart saves items automatically, so students can browse and buy at their convenience. Email notifications are sent instantly after registration or purchase. The entire system is built to be accessible to everyone, following web accessibility standards, and runs smoothly on cloud servers with automatic backups to protect all registration data.'
      },
      {
        title: 'Real-World Impact',
        content: 'Successfully managed 400+ event registrations across multiple Onam celebrations, completely eliminating manual paperwork. The online store generated ₹25,000 in merchandise revenue through 75 transactions. Students rated the experience 4.7 out of 5 stars, and participation increased by 40% compared to previous years. The platform maintained perfect uptime throughout the festival period, ensuring no one missed out on registering or shopping.'
      }
    ]
  },
  {
    id: 4,
    slug: 'coming-soon',
    title: 'Coming Soon',
    description: 'Working on something exciting! A new project is currently in development. Stay tuned for updates.',
    image: '/projects/design-system-library.svg',
    role: 'Full-Stack Developer',
    year: '2025',
    category: 'In Development',
    techStack: ['React', 'Node.js', 'TypeScript'],
    sections: [
      {
        title: 'In Development',
        content: 'This project is currently under development. Check back soon for updates on this exciting new addition to the portfolio!'
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
