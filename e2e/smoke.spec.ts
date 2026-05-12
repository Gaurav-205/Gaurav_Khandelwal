import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('home loads main landmark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeVisible({ timeout: 60_000 });
  });

  test('projects page shows heading', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: /Selected Works/i })).toBeVisible({
      timeout: 60_000,
    });
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 60_000 });
  });

  test('invalid project slug shows not found', async ({ page }) => {
    await page.goto('/project/does-not-exist-xyz');
    await expect(page.getByRole('heading', { name: /Page Not Found/i })).toBeVisible({
      timeout: 60_000,
    });
  });
});
