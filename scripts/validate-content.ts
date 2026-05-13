/**
 * scripts/validate-content.ts
 *
 * Build-time content validation script.
 * Run with: npm run validate:content
 *
 * Checks:
 *   1. Every project cover image resolves to a real file in /public.
 *   2. Every architecture diagram resolves to a real file in /public.
 *   3. Every screenshot resolves to a real file in /public.
 *   4. All slugs are unique and match the kebab-case pattern.
 *   5. All liveUrl / githubUrl values start with https://.
 *   6. No year is more than 1 year in the future.
 *   7. Every slug in PROJECT_CONTENT has a matching PROJECT_CASE_STUDY entry.
 *   8. Required text fields are non-empty.
 *   9. Screenshots have non-empty alt text and caption.
 *  10. At least 3 screenshots per project.
 *  11. whatILearned.bullets is non-empty.
 *
 * Exits with code 1 if any check fails so CI can block the deploy.
 *
 * Uses relative imports (no @/ alias) so tsx can run this without
 * a custom paths plugin.
 */

import { existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Relative imports — no @/ alias needed in script context
import { PROJECT_CONTENT } from '../src/content/projects';
import { PROJECT_CASE_STUDY } from '../src/lib/constants/projectCaseStudy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC = resolve(__dirname, '..', 'public');

// ── Helpers ──────────────────────────────────────────────────────────────────

const errors: string[] = [];
const warnings: string[] = [];

const err  = (msg: string) => errors.push(`  ✗  ${msg}`);
const warn = (msg: string) => warnings.push(`  ⚠  ${msg}`);

const fileExists = (publicPath: string) => existsSync(join(PUBLIC, publicPath));

const SLUG_RE  = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HTTPS_RE = /^https:\/\//;
const YEAR_RE  = /^\d{4}$/;
const currentYear = new Date().getFullYear();

// ── Per-project checks ───────────────────────────────────────────────────────

const slugsSeen = new Set<string>();

for (const [i, p] of PROJECT_CONTENT.entries()) {
  const prefix = `[${i}] "${p.slug}"`;

  // Slug format
  if (!SLUG_RE.test(p.slug)) {
    err(`${prefix}: slug must be lowercase-hyphenated, got "${p.slug}"`);
  }

  // Duplicate slugs
  if (slugsSeen.has(p.slug)) {
    err(`${prefix}: duplicate slug`);
  }
  slugsSeen.add(p.slug);

  // Cover image exists
  if (!p.image) {
    err(`${prefix}: missing image field`);
  } else if (!fileExists(p.image)) {
    err(`${prefix}: cover image not found → public${p.image}`);
  }

  // URLs must be https://
  if (p.liveUrl   && !HTTPS_RE.test(p.liveUrl))   err(`${prefix}: liveUrl must start with https://`);
  if (p.githubUrl && !HTTPS_RE.test(p.githubUrl)) err(`${prefix}: githubUrl must start with https://`);

  // Year
  if (!YEAR_RE.test(p.year)) {
    err(`${prefix}: year must be a 4-digit string, got "${p.year}"`);
  } else if (parseInt(p.year, 10) > currentYear + 1) {
    warn(`${prefix}: year ${p.year} is more than 1 year in the future`);
  }

  // Required text fields
  for (const field of ['title', 'description', 'role', 'category'] as const) {
    if (!p[field]?.trim()) err(`${prefix}: "${field}" must not be empty`);
  }

  // Case-study entry
  const cs = PROJECT_CASE_STUDY[p.slug as keyof typeof PROJECT_CASE_STUDY];
  if (!cs) {
    err(`${prefix}: no PROJECT_CASE_STUDY entry — add it to src/lib/constants/projectCaseStudy.ts`);
    continue;
  }

  // Architecture diagram
  if (!fileExists(cs.architecture.diagramSrc)) {
    err(`${prefix}: architecture diagram not found → public${cs.architecture.diagramSrc}`);
  }

  // Screenshots — check file exists; accept .png, .webp, or .svg fallback
  if (cs.screenshots.length < 3) {
    err(`${prefix}: need ≥3 screenshots, found ${cs.screenshots.length}`);
  }
  for (const [si, shot] of cs.screenshots.entries()) {
    // Accept the declared path OR a .svg fallback with the same base name.
    // This lets you commit .png paths before the real files are ready —
    // the build will pass as long as the .svg placeholder exists.
    const svgFallback = shot.src.replace(/\.(png|webp|avif)$/i, '.svg');
    const exists = fileExists(shot.src) || fileExists(svgFallback);
    if (!exists) {
      err(`${prefix}: screenshot[${si}] not found → public${shot.src} (also tried ${svgFallback})`);
    } else if (!fileExists(shot.src) && fileExists(svgFallback)) {
      warn(`${prefix}: screenshot[${si}] using SVG placeholder → replace with public${shot.src}`);
    }
    if (!shot.alt?.trim())     err(`${prefix}: screenshot[${si}] has empty alt text`);
    if (!shot.caption?.trim()) err(`${prefix}: screenshot[${si}] has empty caption`);
  }

  // whatILearned
  if (!cs.whatILearned.bullets?.length) {
    err(`${prefix}: whatILearned.bullets must not be empty`);
  }
}

// ── Report ───────────────────────────────────────────────────────────────────

const total = PROJECT_CONTENT.length;
console.log(`\n📋  Validated ${total} project${total !== 1 ? 's' : ''}\n`);

if (warnings.length) {
  console.log('Warnings:');
  warnings.forEach(w => console.log(w));
  console.log('');
}

if (errors.length) {
  console.log('Errors:');
  errors.forEach(e => console.log(e));
  console.log(`\n❌  ${errors.length} error${errors.length !== 1 ? 's' : ''} — fix before deploying.\n`);
  process.exit(1);
} else {
  console.log('✅  All checks passed.\n');
}
