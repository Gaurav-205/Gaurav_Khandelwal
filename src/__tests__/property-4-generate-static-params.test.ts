/**
 * Property 4: generateStaticParams is a bijection of PROJECT_DATA slugs
 *
 * Calling generateStaticParams SHALL return an array of length
 * PROJECT_DATA.length whose entries equal PROJECT_DATA.map(p => ({ slug: p.slug })).
 *
 * Validates: Requirements 4.2, 4.3
 */
import { describe, it, expect, vi } from 'vitest';
import { PROJECT_DATA } from '../lib/constants/projects';

// Mock next/navigation (used by notFound in page.tsx)
vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NOT_FOUND'); },
}));

// Dynamically import the page module to get generateStaticParams
// We import it as a module — no JSX rendering needed for this test
describe('Property 4 — generateStaticParams: bijection of PROJECT_DATA slugs', () => {
  it('returns exactly PROJECT_DATA.length entries', async () => {
    const { generateStaticParams } = await import('../app/project/[slug]/page');
    const result = await generateStaticParams();
    expect(result).toHaveLength(PROJECT_DATA.length);
  });

  it('each entry has a slug matching the corresponding PROJECT_DATA entry', async () => {
    const { generateStaticParams } = await import('../app/project/[slug]/page');
    const result = await generateStaticParams();
    const expected = PROJECT_DATA.map((p) => ({ slug: p.slug }));
    expect(result).toEqual(expected);
  });

  it('no duplicate slugs', async () => {
    const { generateStaticParams } = await import('../app/project/[slug]/page');
    const result = await generateStaticParams();
    const slugs = result.map((r) => r.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });
});
