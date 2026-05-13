/**
 * E2E accessibility tests — axe-core on all four main routes
 *
 * Runs @axe-core/playwright against:
 *   - / (home)
 *   - /projects
 *   - /about
 *   - /project/:slug (first project)
 *
 * Each test waits for the page to be fully interactive before scanning,
 * then asserts zero critical or serious axe violations.
 *
 * Known limitations:
 *   - The 3-D WebGL canvas is excluded from axe scanning (it has its own
 *     aria-label and role="img" but axe cannot inspect WebGL content).
 *   - Color contrast checks on Tailwind opacity utilities (text-white/40 etc.)
 *     may produce false positives — review manually if violations appear.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PROJECT_DATA } from '../src/lib/constants/projects';

const FIRST_SLUG = PROJECT_DATA[0]!.slug;

/** Wait for the page to settle before running axe. */
async function waitForPageReady(page: import('@playwright/test').Page) {
  await page.waitForLoadState('networkidle');
}

test.describe('Accessibility — axe-core', () => {
  test('home page has no critical axe violations', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);

    const results = await new AxeBuilder({ page })
      .exclude('canvas') // WebGL canvas — not inspectable by axe
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious',
    );
    expect(
      critical,
      `Critical/serious axe violations on /:\n${critical.map(v => `  [${v.impact}] ${v.id}: ${v.description}`).join('\n')}`,
    ).toHaveLength(0);
  });

  test('projects page has no critical axe violations', async ({ page }) => {
    await page.goto('/projects');
    await waitForPageReady(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious',
    );
    expect(
      critical,
      `Critical/serious axe violations on /projects:\n${critical.map(v => `  [${v.impact}] ${v.id}: ${v.description}`).join('\n')}`,
    ).toHaveLength(0);
  });

  test('about page has no critical axe violations', async ({ page }) => {
    await page.goto('/about');
    await waitForPageReady(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious',
    );
    expect(
      critical,
      `Critical/serious axe violations on /about:\n${critical.map(v => `  [${v.impact}] ${v.id}: ${v.description}`).join('\n')}`,
    ).toHaveLength(0);
  });

  test('project detail page has no critical axe violations', async ({ page }) => {
    await page.goto(`/project/${FIRST_SLUG}`);
    await waitForPageReady(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious',
    );
    expect(
      critical,
      `Critical/serious axe violations on /project/${FIRST_SLUG}:\n${critical.map(v => `  [${v.impact}] ${v.id}: ${v.description}`).join('\n')}`,
    ).toHaveLength(0);
  });
});
