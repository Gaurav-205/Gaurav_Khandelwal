import { describe, it, expect } from 'vitest';
import { PROJECT_DATA } from '@/lib/constants/projects';

describe('PROJECT_DATA', () => {
  it('uses unique slugs', () => {
    const slugs = PROJECT_DATA.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
