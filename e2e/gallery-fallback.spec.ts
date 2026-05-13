/**
 * E2E visual smoke tests — 3D gallery fallback
 *
 * Verifies that the non-WebGL fallback renders correctly in two scenarios:
 *
 *   1. WebGL disabled — simulate by overriding HTMLCanvasElement.getContext
 *      to return null before the page loads. GalleryCanvas detects this and
 *      renders GalleryFallback with reason="no-webgl".
 *
 *   2. Reduced motion — simulate by setting the prefers-reduced-motion media
 *      feature. Hero detects this via useReducedMotion and renders
 *      GalleryFallback with reason="reduced-motion" directly, bypassing
 *      GalleryCanvas entirely.
 *
 * Both paths must:
 *   - Show a project card for every project in PROJECT_DATA
 *   - Make each card clickable (navigates to /project/:slug)
 *   - Not render a <canvas> element
 */
import { test, expect } from '@playwright/test';
import { PROJECT_DATA } from '../src/lib/constants/projects';

const FIRST = PROJECT_DATA[0]!;

test.describe('Gallery fallback — WebGL disabled', () => {
  test.beforeEach(async ({ page }) => {
    // Override getContext before any scripts run so checkWebGLSupport() returns false
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
        if (type === 'webgl' || type === 'experimental-webgl') return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (original as any).call(this, type, ...args);
      };
    });
    await page.goto('/');
    // Wait for the fallback grid to appear (no canvas, so no WebGL loading delay)
    await expect(page.getByRole('list', { name: /Project gallery/i })).toBeVisible({ timeout: 30_000 });
  });

  test('renders a project card for every project', async ({ page }) => {
    for (const project of PROJECT_DATA) {
      await expect(page.getByText(project.title).first()).toBeVisible();
    }
  });

  test('does not render a WebGL canvas', async ({ page }) => {
    // The R3F canvas should not be present when WebGL is unavailable
    const canvases = page.locator('canvas');
    await expect(canvases).toHaveCount(0);
  });

  test('clicking a project card navigates to the detail page', async ({ page }) => {
    await page.getByRole('button', { name: new RegExp(FIRST.title, 'i') }).click();
    await expect(page).toHaveURL(`/project/${FIRST.slug}`, { timeout: 15_000 });
  });
});

test.describe('Gallery fallback — reduced motion', () => {
  test.use({
    contextOptions: {
      reducedMotion: 'reduce',
    },
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('list', { name: /Project gallery/i })).toBeVisible({ timeout: 30_000 });
  });

  test('renders a project card for every project', async ({ page }) => {
    for (const project of PROJECT_DATA) {
      await expect(page.getByText(project.title).first()).toBeVisible();
    }
  });

  test('does not render a WebGL canvas', async ({ page }) => {
    await expect(page.locator('canvas')).toHaveCount(0);
  });

  test('clicking a project card navigates to the detail page', async ({ page }) => {
    await page.getByRole('button', { name: new RegExp(FIRST.title, 'i') }).click();
    await expect(page).toHaveURL(`/project/${FIRST.slug}`, { timeout: 15_000 });
  });
});
