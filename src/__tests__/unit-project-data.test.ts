/**
 * Unit tests — PROJECT_DATA integrity
 *
 * Covers: unique slugs, valid URLs, required fields, year format,
 * id ordering, and getAdjacentProjects navigation helper.
 */
import { describe, it, expect } from 'vitest';
import { PROJECT_DATA, getAdjacentProjects } from '@/lib/constants/projects';

const HTTPS_RE = /^https:\/\//;
const SLUG_RE  = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const YEAR_RE  = /^\d{4}$/;

describe('PROJECT_DATA — field integrity', () => {
  it('has at least one project', () => {
    expect(PROJECT_DATA.length).toBeGreaterThan(0);
  });

  it('every slug is unique', () => {
    const slugs = PROJECT_DATA.map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every slug matches kebab-case pattern', () => {
    PROJECT_DATA.forEach(p => {
      expect(p.slug, `slug "${p.slug}"`).toMatch(SLUG_RE);
    });
  });

  it('every id equals its 1-based array position', () => {
    PROJECT_DATA.forEach((p, i) => {
      expect(p.id, `project at index ${i}`).toBe(i + 1);
    });
  });

  it('every year is a 4-digit string', () => {
    PROJECT_DATA.forEach(p => {
      expect(p.year, `year for "${p.slug}"`).toMatch(YEAR_RE);
    });
  });

  it('every required text field is non-empty', () => {
    PROJECT_DATA.forEach(p => {
      expect(p.title.trim(),       `title for "${p.slug}"`).not.toBe('');
      expect(p.description.trim(), `description for "${p.slug}"`).not.toBe('');
      expect(p.role.trim(),        `role for "${p.slug}"`).not.toBe('');
      expect(p.category.trim(),    `category for "${p.slug}"`).not.toBe('');
    });
  });

  it('every image path starts with / and has a supported extension', () => {
    const EXT_RE = /\.(png|jpg|jpeg|webp|svg|avif)$/i;
    PROJECT_DATA.forEach(p => {
      expect(p.image, `image for "${p.slug}"`).toMatch(/^\//);
      expect(p.image, `image extension for "${p.slug}"`).toMatch(EXT_RE);
    });
  });

  it('every liveUrl starts with https://', () => {
    PROJECT_DATA.filter(p => p.liveUrl).forEach(p => {
      expect(p.liveUrl, `liveUrl for "${p.slug}"`).toMatch(HTTPS_RE);
    });
  });

  it('every githubUrl starts with https://', () => {
    PROJECT_DATA.filter(p => p.githubUrl).forEach(p => {
      expect(p.githubUrl, `githubUrl for "${p.slug}"`).toMatch(HTTPS_RE);
    });
  });

  it('every project has at least 3 screenshots', () => {
    PROJECT_DATA.forEach(p => {
      expect(p.screenshots.length, `screenshots for "${p.slug}"`).toBeGreaterThanOrEqual(3);
    });
  });

  it('every screenshot has non-empty alt text and caption', () => {
    PROJECT_DATA.forEach(p => {
      p.screenshots.forEach((s, i) => {
        expect(s.alt.trim(),     `alt for "${p.slug}" shot[${i}]`).not.toBe('');
        expect(s.caption.trim(), `caption for "${p.slug}" shot[${i}]`).not.toBe('');
      });
    });
  });

  it('every project has at least one whatILearned bullet', () => {
    PROJECT_DATA.forEach(p => {
      expect(p.whatILearned.bullets.length, `bullets for "${p.slug}"`).toBeGreaterThan(0);
    });
  });
});

describe('getAdjacentProjects', () => {
  it('returns null prev for the first project', () => {
    const first = PROJECT_DATA[0]!;
    const { prev } = getAdjacentProjects(first.slug);
    expect(prev).toBeNull();
  });

  it('returns null next for the last project', () => {
    const last = PROJECT_DATA[PROJECT_DATA.length - 1]!;
    const { next } = getAdjacentProjects(last.slug);
    expect(next).toBeNull();
  });

  it('returns correct prev and next for a middle project', () => {
    if (PROJECT_DATA.length < 3) return; // skip if fewer than 3 projects
    const mid = PROJECT_DATA[1]!;
    const { prev, next } = getAdjacentProjects(mid.slug);
    expect(prev?.slug).toBe(PROJECT_DATA[0]!.slug);
    expect(next?.slug).toBe(PROJECT_DATA[2]!.slug);
  });

  it('returns null prev and null next for an unknown slug', () => {
    const { prev, next } = getAdjacentProjects('does-not-exist');
    expect(prev).toBeNull();
    expect(next).toBeNull();
  });

  it('adjacent projects form a consistent chain', () => {
    // Walking forward through next links should visit every project in order
    const visited: string[] = [];
    let current: typeof PROJECT_DATA[number] | null = PROJECT_DATA[0]!;
    while (current) {
      visited.push(current.slug);
      current = getAdjacentProjects(current.slug).next;
    }
    expect(visited).toEqual(PROJECT_DATA.map(p => p.slug));
  });
});
