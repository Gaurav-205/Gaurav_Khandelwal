/**
 * Property 1: Active section drives sidebar class
 *
 * For each value in ['informations', 'fields', 'socials', 'contact'],
 * rendering AboutContent with that activeSection SHALL produce exactly one
 * nav item with 'text-white' and all others with 'text-white/40'.
 *
 * Validates: Requirements 1.3
 */
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import AboutContent from '../app/about/AboutContent';

// Mock next/link — renders a plain <a> in tests
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

// Mock @/lib/utils
vi.mock('@/lib/utils', () => ({
  getGmailComposeUrl: (email: string, subject?: string) =>
    `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject ?? ''}`,
}));

const NAV_IDS = ['informations', 'fields', 'socials', 'contact'] as const;

describe('Property 1 — AboutContent: active section drives sidebar class', () => {
  NAV_IDS.forEach((activeId) => {
    it(`when activeSection="${activeId}", exactly one nav link has text-white and the rest have text-white/40`, () => {
      const { container } = render(<AboutContent activeSection={activeId} />);

      // The sidebar nav links are <a href="#id"> elements inside the fixed sidebar div
      const sidebarNav = container.querySelector('.fixed.top-4.left-4');
      expect(sidebarNav).not.toBeNull();

      const navLinks = sidebarNav!.querySelectorAll('a[href^="#"]');
      expect(navLinks.length).toBe(NAV_IDS.length);

      const activeLinks = Array.from(navLinks).filter((el) =>
        el.className.includes('text-white') && !el.className.includes('text-white/40')
      );
      const inactiveLinks = Array.from(navLinks).filter((el) =>
        el.className.includes('text-white/40')
      );

      expect(activeLinks).toHaveLength(1);
      expect(inactiveLinks).toHaveLength(NAV_IDS.length - 1);
      expect(activeLinks[0].getAttribute('href')).toBe(`#${activeId}`);
    });
  });
});
