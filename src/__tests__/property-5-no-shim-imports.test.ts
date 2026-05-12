/**
 * Property 5: No shim imports in application source
 *
 * For all .ts and .tsx files under src/app/ and src/components/, no import
 * statement SHALL contain the string '3d-gallery-photography', ensuring the
 * re-export shim is not referenced by application code.
 *
 * Validates: Requirements 7.1, 7.2
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '../..');

function collectFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full, exts));
    } else if (exts.some((ext) => full.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

const APP_DIR = join(ROOT, 'src/app');
const COMPONENTS_DIR = join(ROOT, 'src/components');
const SHIM_FILE = join(ROOT, 'src/components/ui/3d-gallery-photography.tsx');

const allFiles = [
  ...collectFiles(APP_DIR, ['.ts', '.tsx']),
  ...collectFiles(COMPONENTS_DIR, ['.ts', '.tsx']),
].filter((f) => f !== SHIM_FILE); // exclude the shim itself

describe('Property 5 — No shim imports in application source', () => {
  it('finds zero import statements referencing 3d-gallery-photography in src/app/', () => {
    const appFiles = collectFiles(APP_DIR, ['.ts', '.tsx']);
    const violations: string[] = [];

    for (const file of appFiles) {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (
          (line.includes('import') || line.includes('require')) &&
          line.includes('3d-gallery-photography')
        ) {
          violations.push(`${file}:${i + 1} — ${line.trim()}`);
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('finds zero import statements referencing 3d-gallery-photography in src/components/ (excluding the shim itself)', () => {
    const componentFiles = collectFiles(COMPONENTS_DIR, ['.ts', '.tsx']).filter(
      (f) => f !== SHIM_FILE
    );
    const violations: string[] = [];

    for (const file of componentFiles) {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (
          (line.includes('import') || line.includes('require')) &&
          line.includes('3d-gallery-photography')
        ) {
          violations.push(`${file}:${i + 1} — ${line.trim()}`);
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it(`scanned ${allFiles.length} source files in total`, () => {
    // Informational — confirms the test actually ran over real files
    expect(allFiles.length).toBeGreaterThan(0);
  });
});
