/**
 * Component tests — project cards (ProjectsContent) and project detail (ProjectContent)
 *
 * Covers:
 *   - ProjectsContent renders a card for every project with title, category, year
 *   - Each card links to the correct /project/:slug URL
 *   - ProjectContent renders all required fields for a given project
 *   - ProjectContent renders prev/next navigation correctly
 *   - ProjectContent renders tech stack tags
 *   - ProjectContent renders live/GitHub CTAs when URLs are present
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProjectsContent from '@/features/projects/ProjectsContent';
import ProjectContent from '@/features/project/ProjectContent';
import { PROJECT_DATA } from '@/lib/constants/projects';

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => <a href={href} className={className}>{children}</a>,
}));

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
    fill: _fill,
    priority: _priority,
    sizes: _sizes,
    loading: _loading,
  }: {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    loading?: string;
  }) => <img src={src} alt={alt} className={className} />,
}));

vi.mock('@/lib/utils', () => ({
  getGmailComposeUrl: (email: string, subject?: string) =>
    `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject ?? ''}`,
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// ── ProjectsContent ───────────────────────────────────────────────────────────

describe('ProjectsContent', () => {
  it('renders the "Selected Works" heading', () => {
    render(<ProjectsContent />);
    expect(screen.getByRole('heading', { name: /Selected Works/i })).toBeInTheDocument();
  });

  it('renders a card for every project in PROJECT_DATA', () => {
    render(<ProjectsContent />);
    PROJECT_DATA.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('each project card links to /project/:slug', () => {
    render(<ProjectsContent />);
    PROJECT_DATA.forEach(project => {
      const link = screen.getByRole('link', { name: new RegExp(project.title, 'i') });
      expect(link).toHaveAttribute('href', `/project/${project.slug}`);
    });
  });

  it('renders category and year for each project', () => {
    render(<ProjectsContent />);
    PROJECT_DATA.forEach(project => {
      // category • year appears as a single text node
      expect(screen.getByText(`${project.category} • ${project.year}`)).toBeInTheDocument();
    });
  });

  it('renders the CTA heading', () => {
    render(<ProjectsContent />);
    expect(
      screen.getByRole('heading', { name: /Have a project or internship opportunity/i }),
    ).toBeInTheDocument();
  });
});

// ── ProjectContent ────────────────────────────────────────────────────────────

describe('ProjectContent', () => {
  const project = PROJECT_DATA[0]!;

  it('renders the project title as h1', () => {
    render(<ProjectContent project={project} />);
    expect(screen.getByRole('heading', { level: 1, name: project.title })).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<ProjectContent project={project} />);
    expect(screen.getByText(project.description)).toBeInTheDocument();
  });

  it('renders role, year, and category in the meta grid', () => {
    render(<ProjectContent project={project} />);
    expect(screen.getByText(project.role)).toBeInTheDocument();
    expect(screen.getByText(project.year)).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
  });

  it('renders all tech stack tags', () => {
    render(<ProjectContent project={project} />);
    project.techStack?.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('renders the live site link when liveUrl is present', () => {
    const withLive = PROJECT_DATA.find(p => p.liveUrl);
    if (!withLive) return;
    render(<ProjectContent project={withLive} />);
    const link = screen.getByRole('link', { name: /View Live Site/i });
    expect(link).toHaveAttribute('href', withLive.liveUrl);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders the GitHub link when githubUrl is present', () => {
    const withGithub = PROJECT_DATA.find(p => p.githubUrl);
    if (!withGithub) return;
    render(<ProjectContent project={withGithub} />);
    const link = screen.getByRole('link', { name: /View on GitHub/i });
    expect(link).toHaveAttribute('href', withGithub.githubUrl);
  });

  it('renders all narrative section titles', () => {
    render(<ProjectContent project={project} />);
    project.sections?.forEach(section => {
      expect(screen.getAllByText(section.title).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders the whatILearned bullets', () => {
    render(<ProjectContent project={project} />);
    project.whatILearned.bullets.forEach(bullet => {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    });
  });

  it('renders no PREVIOUS link for the first project', () => {
    const first = PROJECT_DATA[0]!;
    render(<ProjectContent project={first} />);
    expect(screen.queryByText('PREVIOUS')).not.toBeInTheDocument();
  });

  it('renders no NEXT link for the last project', () => {
    const last = PROJECT_DATA[PROJECT_DATA.length - 1]!;
    render(<ProjectContent project={last} />);
    expect(screen.queryByText('NEXT')).not.toBeInTheDocument();
  });

  it('renders PREVIOUS and NEXT links for a middle project', () => {
    if (PROJECT_DATA.length < 3) return;
    const mid = PROJECT_DATA[1]!;
    render(<ProjectContent project={mid} />);
    expect(screen.getByText('PREVIOUS')).toBeInTheDocument();
    expect(screen.getByText('NEXT')).toBeInTheDocument();
  });

  it('PREVIOUS link points to the correct slug', () => {
    if (PROJECT_DATA.length < 2) return;
    const second = PROJECT_DATA[1]!;
    render(<ProjectContent project={second} />);
    const prevSection = screen.getByText('PREVIOUS').closest('a');
    expect(prevSection).toHaveAttribute('href', `/project/${PROJECT_DATA[0]!.slug}`);
  });
});
