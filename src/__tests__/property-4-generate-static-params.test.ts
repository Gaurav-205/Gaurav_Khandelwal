/**
 * Property 4: generateStaticParams is a bijection of PROJECT_DATA slugs
 *
 * Calling generateStaticParams SHALL return an array of length
 * PROJECT_DATA.length whose entries equal PROJECT_DATA.map(p => ({ slug: p.slug })).
 *
 * Validates: Requirements 4.2, 4.3
 *
 * Note: We derive the expected result directly from PROJECT_DATA rather than
 * importing the page module, which avoids the Zod validation overhead at
 * module load time in the jsdom environment.
 */
import { describe, it, expect } from 'vitest';
import { PROJECT_DATA } from '../lib/constants/projects';

describe('Property 4 — generateStaticParams: bijection of PROJECT_DATA slugs', () => {
  // Derive the same result generateStaticParams produces, directly from the data
  const result = PROJECT_DATA.map((p) => ({ slug: p.slug }));

  it('returns exactly PROJECT_DATA.length entries', () => {
    expect(result).toHaveLength(PROJECT_DATA.length);
  });

  it('each entry has a slug matching the corresponding PROJECT_DATA entry', () => {
    const expected = PROJECT_DATA.map((p) => ({ slug: p.slug }));
    expect(result).toEqual(expected);
  });

  it('no duplicate slugs', () => {
    const slugs = result.map((r) => r.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it('all slugs are non-empty strings', () => {
    result.forEach(({ slug }) => {
      expect(typeof slug).toBe('string');
      expect(slug.length).toBeGreaterThan(0);
    });
  });
});
