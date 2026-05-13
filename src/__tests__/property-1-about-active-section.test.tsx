/**
 * Property 1: AboutContent renders all four sections for any activeSection value.
 *
 * After the P1 fix (duplicate sidebar removal), the sidebar nav lives only in
 * AboutClient (the client shell). AboutContent no longer renders a sidebar —
 * it renders the scrollable section content only.
 *
 * This test verifies:
 *   1. AboutContent renders without error for every valid activeSection value.
 *   2. All four section headings are present in the output regardless of
 *      which section is active (the prop controls the shell sidebar, not
 *      which sections are shown).
 *   3. AboutContent does NOT render a duplicate fixed sidebar (the bug that
 *      was fixed in P1).
 *
 * Validates: Requirements 1.1, 1.2 (server component, renders all sections)
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutContent } from '@/features/about';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('@/lib/utils', () => ({
  getGmailComposeUrl: (email: string, subject?: string) =>
    `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject ?? ''}`,
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// Mock ContactForm — it's a client component with its own fetch logic
vi.mock('@/components/ContactForm', () => ({
  default: () => <div data-testid="contact-form" />,
}));

const NAV_IDS = ['informations', 'fields', 'socials', 'contact'] as const;

describe('Property 1 — AboutContent: renders all sections for any activeSection', () => {
  NAV_IDS.forEach((activeId) => {
    it(`renders without error when activeSection="${activeId}"`, () => {
      expect(() => render(<AboutContent activeSection={activeId} />)).not.toThrow();
    });
  });

  it('renders all four section labels in the content area', () => {
    render(<AboutContent activeSection="informations" />);
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Fields of Practice')).toBeInTheDocument();
    expect(screen.getByText('Socials')).toBeInTheDocument();
    // "Contact" appears as both a section label and an h3 heading — use getAllByText
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the main h1 heading', () => {
    render(<AboutContent activeSection="informations" />);
    expect(
      screen.getByRole('heading', { level: 1, name: /full-stack developer/i }),
    ).toBeInTheDocument();
  });

  it('does NOT render a duplicate fixed sidebar (P1 regression guard)', () => {
    const { container } = render(<AboutContent activeSection="informations" />);
    const fixedSidebar = container.querySelector('.fixed.top-4.left-4');
    expect(fixedSidebar).toBeNull();
  });

  it('renders the GitHub and LinkedIn social links', () => {
    render(<AboutContent activeSection="socials" />);
    const githubLinks = screen.getAllByRole('link', { name: /GitHub/i });
    expect(githubLinks.some(l => l.getAttribute('href') === 'https://github.com/Gaurav-205')).toBe(true);
    // LinkedIn appears in both socials and contact sections
    const linkedinLinks = screen.getAllByRole('link', { name: /LinkedIn/i });
    expect(linkedinLinks.some(l => l.getAttribute('href')?.includes('linkedin.com'))).toBe(true);
  });

  it('renders the ContactForm in the contact section', () => {
    render(<AboutContent activeSection="contact" />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });
});
