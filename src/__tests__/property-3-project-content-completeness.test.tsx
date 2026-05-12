/**
 * Property 3: ProjectContent renders all sections for any project
 *
 * For each valid ProjectData object in PROJECT_DATA, rendering ProjectContent
 * with that object SHALL produce output containing the project's title,
 * description, category, year, role, each tech stack tag (when present),
 * and each content section title (when present).
 *
 * Validates: Requirements 3.2
 */
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { PROJECT_DATA, ProjectContent } from '@/features/project';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

describe('Property 3 — ProjectContent: renders all fields for any project', () => {
  PROJECT_DATA.forEach((project) => {
    describe(`project "${project.title}" (id=${project.id})`, () => {
      it('renders title, description, role, year, category', () => {
        const { getAllByText } = render(<ProjectContent project={project} />);

        // Title appears at least once (hero h1 + nav label)
        expect(getAllByText(project.title).length).toBeGreaterThanOrEqual(1);
        // Use getAllByText for all fields — some values may appear in multiple places
        // (e.g. "In Development" is both a category and a section title)
        expect(getAllByText(project.description).length).toBeGreaterThanOrEqual(1);
        expect(getAllByText(project.role).length).toBeGreaterThanOrEqual(1);
        expect(getAllByText(project.year).length).toBeGreaterThanOrEqual(1);
        expect(getAllByText(project.category).length).toBeGreaterThanOrEqual(1);
      });

      if (project.techStack && project.techStack.length > 0) {
        it('renders all tech stack tags', () => {
          const { getByText } = render(<ProjectContent project={project} />);
          project.techStack!.forEach((tech) => {
            expect(getByText(tech)).toBeTruthy();
          });
        });
      }

      if (project.sections && project.sections.length > 0) {
        it('renders all content section titles', () => {
          const { getAllByText } = render(<ProjectContent project={project} />);
          project.sections!.forEach((section) => {
            // Use getAllByText — section titles may coincide with other text (e.g. category)
            expect(getAllByText(section.title).length).toBeGreaterThanOrEqual(1);
          });
        });
      }

      it('renders architecture, gallery, and what I learned', () => {
        const { getByRole, getByText } = render(<ProjectContent project={project} />);
        expect(getByRole('heading', { name: project.architecture.title })).toBeTruthy();
        expect(getByRole('heading', { name: 'Product gallery' })).toBeTruthy();
        expect(
          getByRole('heading', { name: project.whatILearned.title ?? 'What I learned' }),
        ).toBeTruthy();
        expect(getByText(project.screenshots[0]!.caption)).toBeTruthy();
        expect(getByText(project.whatILearned.bullets[0]!)).toBeTruthy();
      });
    });
  });
});
