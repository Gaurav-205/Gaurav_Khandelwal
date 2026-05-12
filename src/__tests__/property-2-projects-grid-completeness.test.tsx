/**
 * Property 2: All projects appear in ProjectsContent
 *
 * For each project in PROJECT_DATA, rendering ProjectsContent SHALL produce
 * output that contains that project's title, so that no project is silently
 * omitted from the grid.
 *
 * Validates: Requirements 2.3
 */
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { PROJECT_DATA, ProjectsContent } from '@/features/projects';

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

// Mock @/lib/utils
vi.mock('@/lib/utils', () => ({
  getGmailComposeUrl: (email: string, subject?: string) =>
    `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject ?? ''}`,
}));

describe('Property 2 — ProjectsContent: all projects appear in the grid', () => {
  it(`renders all ${PROJECT_DATA.length} project titles`, () => {
    const { getByText } = render(<ProjectsContent />);

    PROJECT_DATA.forEach((project) => {
      // Each project title must appear in the rendered output
      expect(getByText(project.title)).toBeTruthy();
    });
  });

  PROJECT_DATA.forEach((project) => {
    it(`project "${project.title}" (id=${project.id}) is present`, () => {
      const { getByText } = render(<ProjectsContent />);
      expect(getByText(project.title)).toBeTruthy();
    });
  });
});
