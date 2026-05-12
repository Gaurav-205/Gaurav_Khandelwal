import { /*getGmailComposeUrl*/ } from '@/lib/utils';
import { ABOUT_NAV_ITEMS, ABOUT_SECTION_LABELS } from '@/lib/constants';
import ContactForm from '@/components/ContactForm';

interface AboutContentProps {
  activeSection: 'informations' | 'fields' | 'socials' | 'contact' | string;
}

/**
 * AboutContent — React Server Component.
 *
 * Renders all static markup for the About page. Receives `activeSection` as a
 * prop so the sidebar nav can reflect the current scroll position without any
 * client state in the content tree.
 *
 * No 'use client' directive. No React hooks. No framer-motion.
 */
export default function AboutContent({ activeSection }: AboutContentProps) {
  return (
    <div
      className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar"
      style={{ scrollbarWidth: 'none' } as React.CSSProperties}
    >
      {/* Sidebar nav — desktop only */}
      <div className="fixed top-4 left-4 md:left-6 z-40 hidden md:block">
        <div className="flex flex-col space-y-4 font-montserrat">
          <h2 className="text-white font-normal text-base lg:text-lg tracking-wide">
            {ABOUT_SECTION_LABELS[activeSection] ?? activeSection}
          </h2>
          <div className="flex flex-col space-y-2 text-xs lg:text-sm">
            {ABOUT_NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-left transition-colors ${
                  activeSection === id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="pt-16 pb-16 md:pt-20 md:pb-20 px-4 md:px-0 md:ml-24">

        {/* 01 — Information */}
        <section id="informations" className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-4xl w-full mx-auto">
            <div className="mb-8 md:mb-12 flex items-center gap-4">
              <span className="text-white/40 font-montserrat text-xs tracking-widest">01</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <p className="text-white/60 font-montserrat text-xs md:text-sm tracking-wide">Information</p>
            </div>

            <h1 className="text-white font-montserrat font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-8 md:mb-12">
              Gaurav Khandelwal is a full-stack developer focused on practical, shipped software products.
            </h1>

            <div className="space-y-6">
              <p className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                I am a Computer Science and Engineering student at MIT Art, Design &amp; Technology University,
                Pune, specialising in Software Product Engineering. I am from Kota, Rajasthan, and I focus
                on building products that solve real user problems with clean interfaces and reliable engineering.
              </p>
              <p className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                My work spans MERN stack applications, Flutter mobile apps, Firebase-backed systems, REST APIs,
                real-time chat, cloud deployment, and UI/UX design. I have built shipped projects across campus
                management, pet care, event commerce, and interactive web experiences.
              </p>
              <p className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                Across my projects, I have worked on authentication, role-based access, admin dashboards,
                MongoDB data models, Firebase services, Socket.IO chat, Google Maps integration, CI/CD
                workflows, testing, and production deployment on Netlify and Render.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* 02 — Fields of Practice */}
        <section id="fields" className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-4xl w-full mx-auto">
            <div className="mb-8 md:mb-12 flex items-center gap-4">
              <span className="text-white/40 font-montserrat text-xs tracking-widest">02</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <p className="text-white/60 font-montserrat text-xs md:text-sm tracking-wide">Fields of Practice</p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {[
                {
                  title: 'Full-Stack Development',
                  sub: 'React, Next.js, TypeScript, Node.js, Express.js, MongoDB, REST APIs, CRUD workflows, authentication, role-based access, and production deployment.',
                },
                {
                  title: 'Mobile App Development',
                  sub: 'Flutter, Dart, Firebase Auth, Cloud Firestore, Firebase Messaging, Provider state management, Google Maps, geolocation, and cross-platform app architecture.',
                },
                {
                  title: 'Frontend Engineering',
                  sub: 'Responsive UI, component architecture, API integration, Tailwind CSS, Material UI, Framer Motion, accessibility, performance optimization, and interactive user experiences.',
                },
                {
                  title: 'Backend and Cloud Systems',
                  sub: 'JWT, OAuth, Passport.js, Socket.IO, Mongoose, validation, Cloudinary, Nodemailer, CI/CD, Docker, Netlify, Render, Firebase, and GitHub Actions.',
                },
              ].map(({ title, sub }) => (
                <div key={title} className="border-l-2 border-white/10 pl-6">
                  <h2 className="text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3">
                    {title}
                  </h2>
                  <p className="text-white/60 font-montserrat font-light text-sm md:text-base">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* 03 — Socials */}
        <section id="socials" className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-4xl w-full mx-auto">
            <div className="mb-8 md:mb-12 flex items-center gap-4">
              <span className="text-white/40 font-montserrat text-xs tracking-widest">03</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <p className="text-white/60 font-montserrat text-xs md:text-sm tracking-wide">Socials</p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {[
                { href: 'https://github.com/Gaurav-205', label: 'GitHub' },
                { href: 'https://linkedin.com/in/gaurav-khandelwal-17a127358', label: 'LinkedIn' },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-white font-montserrat font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight hover:text-white/70 transition-colors"
                >
                  <span className="text-white/40 text-sm group-hover:translate-x-2 transition-transform duration-300">→</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* 04 — Contact */}
        <section id="contact" className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-4xl w-full mx-auto">
            <div className="mb-8 md:mb-12 flex items-center gap-4">
              <span className="text-white/40 font-montserrat text-xs tracking-widest">04</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <p className="text-white/60 font-montserrat text-xs md:text-sm tracking-wide">Contact</p>
            </div>

            <div className="space-y-8 md:space-y-10">
              <p className="text-white font-montserrat font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                I am available for internships, freelance projects, and collaborative opportunities in
                full-stack development, Flutter development, frontend engineering, and UI/UX-focused
                product work. You can also download my resume below or use the contact form to send a message directly.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 items-center">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
                >
                  Download Resume
                </a>
                <a
                  href="https://linkedin.com/in/gaurav-khandelwal-17a127358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-white/20 text-white font-montserrat text-sm tracking-wide hover:bg-white/5 transition-colors duration-300 rounded-full"
                >
                  LinkedIn
                </a>
              </div>

              <div className="pt-8">
                <h3 className="text-white font-montserrat text-xl mb-4">Contact</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom-left timezone info — desktop only */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:block">
        <div className="flex items-center space-x-4 font-montserrat text-sm text-white/80">
          <div>
            <p>GMT+5:30</p>
            <p>Available</p>
          </div>
          <div>
            <p>Pune, Maharashtra</p>
            <p>MIT ADT University</p>
          </div>
        </div>
      </div>
    </div>
  );
}
