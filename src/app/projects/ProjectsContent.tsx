import { PROJECT_DATA } from '@/lib/constants/projects';
import Link from 'next/link';
import Image from 'next/image';
import { getGmailComposeUrl } from '@/lib/utils';

export default function ProjectsContent() {
  return (
    <div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar">
      {/* Main content */}
      <div className="pt-20 pb-16 px-4 md:px-6">

        {/* Hero title */}
        <section className="flex items-center justify-center min-h-[50vh] py-20 md:py-32">
          <div className="max-w-6xl w-full text-center">
            <div className="mb-8">
              <span className="text-white/40 font-montserrat text-sm tracking-widest">PORTFOLIO</span>
            </div>

            <h1 className="text-white font-montserrat font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-8">
              Selected Works
            </h1>

            <p className="text-white/80 font-montserrat font-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Projects that show my work across full-stack web development, mobile app development,
              real-time systems, Firebase, MongoDB, cloud deployment, and UI/UX-focused product thinking.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Projects grid */}
        <section className="max-w-7xl mx-auto py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {PROJECT_DATA.map((project) => (
              <div
                key={project.id}
                className="group"
              >
                <Link href={`/project/${project.slug}`}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-6 bg-gray-900 border border-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:brightness-110 group-hover:contrast-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 font-montserrat text-xs tracking-widest">
                        {String(project.id).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                    </div>

                    <h3 className="text-white font-montserrat font-normal text-xl md:text-2xl group-hover:text-white/70 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-white/60 font-montserrat text-sm tracking-wide">
                      {project.category} • {project.year}
                    </p>

                    <p className="text-white/70 font-montserrat font-light text-base leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 font-montserrat text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-3 py-1 text-white/50 font-montserrat text-xs">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* CTA */}
        <section className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-white/40 font-montserrat text-sm tracking-widest">LET&apos;S CONNECT</span>
            </div>

            <h2 className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-6">
              Have a project or internship opportunity?
            </h2>
            <p className="text-white/80 font-montserrat font-light text-base md:text-lg leading-relaxed mb-8">
              I am open to internships, freelance work, and collaborative projects where I can contribute
              to full-stack development, frontend engineering, Flutter development, or UI/UX-focused
              product work.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/about#contact"
                className="px-8 py-3 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
              >
                Get in touch →
              </Link>
              <a
                href={getGmailComposeUrl('gauravkhandelwal205@gmail.com', 'Internship Opportunity')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white/20 text-white font-montserrat text-sm tracking-wide hover:bg-white/5 transition-colors duration-300 rounded-full"
              >
                Send Email
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
