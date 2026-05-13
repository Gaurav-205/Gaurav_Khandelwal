import { ProjectData, PROJECT_DATA, getAdjacentProjects } from '@/lib/constants/projects';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectContentProps {
  project: ProjectData;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  const coverIsSvg = project.image.endsWith('.svg');
  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar">

      {/* Project nav label */}
      <div className="fixed top-4 left-4 md:left-6 z-50">
        <div className="font-montserrat">
          <p className="text-white/60 text-xs mb-1">
            Project {project.id} of {PROJECT_DATA.length}
          </p>
          <h2 className="text-white font-normal text-base lg:text-lg tracking-wide">{project.title}</h2>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-20 pb-16 px-4 md:px-6">

        {/* Hero */}
        <section className="flex items-center justify-center min-h-[70vh]">
          <div className="max-w-6xl w-full">
            <h1 className="text-white font-montserrat font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
              {project.title}
            </h1>

            <p className="text-white/80 font-montserrat font-light text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mb-12">
              {project.description}
            </p>

            {/* Meta grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { label: 'ROLE', value: project.role },
                { label: 'YEAR', value: project.year },
                { label: 'CATEGORY', value: project.category },
              ].map(({ label, value }) => (
                <div key={label}>
                  <h3 className="text-white/60 font-montserrat text-sm mb-2 tracking-wide">{label}</h3>
                  <p className="text-white font-montserrat text-base">{value}</p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-12">
                <h3 className="text-white/60 font-montserrat text-sm mb-4 tracking-wide">TECH STACK</h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/5 border border-white/10 text-white/90 font-montserrat text-sm rounded-full hover:bg-white/10 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
                  >
                    View Live Site →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 border border-white/20 text-white font-montserrat text-sm tracking-wide hover:bg-white/5 transition-colors duration-300 rounded-full"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Cover image */}
        <section className="py-20 md:py-32" aria-label="Project cover">
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={coverIsSvg ? 'object-contain p-6 md:p-10' : 'object-cover'}
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section
          className="py-20 md:py-32"
          aria-labelledby={`${project.slug}-architecture-heading`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
              <span className="text-white/40 font-montserrat text-sm tracking-widest">A1</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <h2
              id={`${project.slug}-architecture-heading`}
              className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-4"
            >
              {project.architecture.title}
            </h2>
            <p className="text-white/75 font-montserrat font-light text-base md:text-lg leading-relaxed max-w-3xl mb-10">
              {project.architecture.description}
            </p>
            <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={project.architecture.diagramSrc}
                  alt={`${project.title} architecture diagram`}
                  fill
                  className="object-contain p-4 md:p-8"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Screenshot gallery */}
        <section
          className="py-20 md:py-32"
          aria-labelledby={`${project.slug}-gallery-heading`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
              <span className="text-white/40 font-montserrat text-sm tracking-widest">A2</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <h2
              id={`${project.slug}-gallery-heading`}
              className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-4"
            >
              Product gallery
            </h2>
            <p className="text-white/60 font-montserrat text-sm md:text-base mb-12 max-w-3xl">
              Illustrative frames below are placeholders so the layout ships cleanly. Drop in 16:10 PNG or WebP exports from each repo when you have them — paths live in{' '}
              <code className="text-white/80">src/lib/constants/projectCaseStudy.ts</code>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {project.screenshots.map((shot, i) => (
                <figure key={shot.src} className="space-y-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      className="object-contain p-3 md:p-5"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <figcaption className="text-white/80 font-montserrat text-sm leading-relaxed">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative sections */}
        {project.sections?.map((section, index) => (
          <section key={`${index}-${section.title}`} className="py-20 md:py-32">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-white/40 font-montserrat text-sm tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <h2 className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-6">
                {section.title}
              </h2>
              <p className="text-white/80 font-montserrat font-light text-base md:text-lg leading-relaxed">
                {section.content}
              </p>
            </div>
          </section>
        ))}

        {/* What I learned */}
        <section
          className="py-20 md:py-32"
          aria-labelledby={`${project.slug}-learned-heading`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
              <span className="text-white/40 font-montserrat text-sm tracking-widest">99</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <h2
              id={`${project.slug}-learned-heading`}
              className="text-white font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl mb-8"
            >
              {project.whatILearned.title ?? 'What I learned'}
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-white/80 font-montserrat font-light text-base md:text-lg leading-relaxed marker:text-white/40">
              {project.whatILearned.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Prev / Next navigation */}
        <section className="py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              {prev ? (
                <Link
                  href={`/project/${prev.slug}`}
                  className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors font-montserrat text-sm tracking-wide"
                >
                  <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  <div>
                    <div className="text-white/40 text-xs mb-1">PREVIOUS</div>
                    <div>{prev.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/project/${next.slug}`}
                  className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors font-montserrat text-sm tracking-wide text-right"
                >
                  <div>
                    <div className="text-white/40 text-xs mb-1">NEXT</div>
                    <div>{next.title}</div>
                  </div>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
