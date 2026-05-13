/**
 * src/lib/constants/projects.ts — project data infrastructure.
 *
 * Responsibilities:
 *   1. Define the Zod schema and TypeScript type for a fully-merged project.
 *   2. Merge content (src/content/projects.ts) with case-study data
 *      (src/lib/constants/projectCaseStudy.ts).
 *   3. Assign stable numeric `id` values from array position (1-indexed)
 *      so reordering PROJECT_CONTENT never breaks prev/next navigation.
 *   4. Validate the merged array at module load time and throw fast on errors.
 *   5. Export PROJECT_DATA, SAMPLE_IMAGES, and navigation helpers.
 *
 * To add or reorder projects, edit src/content/projects.ts only.
 */

import { z } from 'zod';
import { PROJECT_CASE_STUDY, type ProjectCaseStudySlug } from './projectCaseStudy';
import { PROJECT_CONTENT } from '@/content/projects';

// ─── Zod schemas ────────────────────────────────────────────────────────────

const SectionSchema = z.object({ title: z.string(), content: z.string() });

const ScreenshotSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1),
});

const ArchitectureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  diagramSrc: z.string().startsWith('/'),
});

const WhatILearnedSchema = z.object({
  title: z.string().optional(),
  bullets: z.array(z.string().min(1)).min(1),
});

/** Slug must be lowercase, hyphen-separated, no spaces or special chars. */
const SlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase-hyphenated (e.g. my-project)');

/** URL must be https:// or a relative path starting with /. */
const UrlSchema = z
  .string()
  .refine(
    (v) => v.startsWith('https://') || v.startsWith('/'),
    'URL must start with https:// or /',
  );

/** Image path must start with / and end with a supported extension. */
const ImagePathSchema = z
  .string()
  .startsWith('/', 'Image path must be absolute (start with /)')
  .regex(
    /\.(png|jpg|jpeg|webp|svg|avif)$/i,
    'Image must be .png, .jpg, .jpeg, .webp, .svg, or .avif',
  );

export const ProjectSchema = z.object({
  /** 1-indexed position in PROJECT_CONTENT — derived at build time, not authored. */
  id: z.number().int().positive(),
  slug: SlugSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  image: ImagePathSchema,
  role: z.string().min(1),
  year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit string'),
  category: z.string().min(1),
  techStack: z.array(z.string().min(1)).optional(),
  liveUrl: UrlSchema.optional(),
  githubUrl: UrlSchema.optional(),
  sections: z.array(SectionSchema).optional(),
  architecture: ArchitectureSchema,
  screenshots: z.array(ScreenshotSchema).min(3).max(8),
  whatILearned: WhatILearnedSchema,
});

export type ProjectData = z.infer<typeof ProjectSchema>;

// ─── Merge content + case-study + derived id ────────────────────────────────

function buildProject(
  entry: (typeof PROJECT_CONTENT)[number],
  index: number,
): ProjectData {
  const caseStudy = PROJECT_CASE_STUDY[entry.slug as ProjectCaseStudySlug];
  if (!caseStudy) {
    throw new Error(
      `Missing PROJECT_CASE_STUDY entry for slug: "${entry.slug}". ` +
        `Add it to src/lib/constants/projectCaseStudy.ts.`,
    );
  }
  return {
    ...entry,
    ...caseStudy,
    // id is derived from array position — never authored manually.
    // This means reordering PROJECT_CONTENT is safe: prev/next navigation
    // uses getAdjacentProjects() which works on array index, not id.
    id: index + 1,
  };
}

export const PROJECT_DATA: ProjectData[] = PROJECT_CONTENT.map(buildProject);

// ─── Gallery images ──────────────────────────────────────────────────────────

/** Cover images for the 3-D gallery, in display order. */
export const SAMPLE_IMAGES: Array<{ src: string; alt: string; slug: string }> =
  PROJECT_DATA.map((p) => ({ src: p.image, alt: p.title, slug: p.slug }));

// ─── Navigation helpers ──────────────────────────────────────────────────────

/**
 * Returns the previous and next projects relative to `slug` using array
 * position, not the numeric `id` field.
 *
 * This means reordering PROJECT_CONTENT never produces broken nav links,
 * because the lookup is always index-based.
 */
export function getAdjacentProjects(slug: string): {
  prev: ProjectData | null;
  next: ProjectData | null;
} {
  const index = PROJECT_DATA.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? (PROJECT_DATA[index - 1] ?? null) : null,
    next: index < PROJECT_DATA.length - 1 ? (PROJECT_DATA[index + 1] ?? null) : null,
  };
}

// ─── Runtime validation ──────────────────────────────────────────────────────

const ProjectsArraySchema = z
  .array(ProjectSchema)
  .min(1, 'PROJECT_DATA must contain at least one project')
  .superRefine((items, ctx) => {
    // Duplicate slug check
    const seen = new Map<string, number>();
    items.forEach((p, i) => {
      const prev = seen.get(p.slug);
      if (prev !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate slug "${p.slug}" at positions ${prev} and ${i}`,
          path: [i, 'slug'],
        });
      } else {
        seen.set(p.slug, i);
      }
    });

    // id must equal array position + 1
    items.forEach((p, i) => {
      if (p.id !== i + 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Project at index ${i} has id=${p.id} but expected id=${i + 1}. Do not author id manually — it is derived from array position.`,
          path: [i, 'id'],
        });
      }
    });
  });

const parsed = ProjectsArraySchema.safeParse(PROJECT_DATA);
if (!parsed.success) {
  console.error('[projects] Validation failed:\n', parsed.error.format());
  throw new Error(
    '[projects] PROJECT_DATA is invalid — see console for details. ' +
      'Run `npm run validate:content` for a full report.',
  );
}
