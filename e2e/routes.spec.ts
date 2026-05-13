/**
 * E2E tests — route navigation and content
 *
 * Covers:
 *   - Home page loads and shows the main landmark
 *   - Projects page shows heading and all project titles
 *   - About page shows the h1 heading
 *   - Dynamic project route renders the correct project title
 *   - Prev/next navigation links work on a project detail page
 *   - Invalid slug shows the 404 page
 *   - Navigation links are present and functional
 */
import { test, expect } from '@playwright/test';
import { PROJECT_DATA } from '../src/lib/constants/projects';

const FIRST = PROJECT_DATA[0]!;
const SECOND = PROJECT_DATA[1];
const LAST = PROJECT_DATA[PROJECT_DATA.length - 1]!;

test.describe('Home', () => {
  test('loads the main landmark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeVisible({ timeout: 60_000 });
  });

  test('navigation links to Projects and About are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Projects/i }).first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByRole('link', { name: /About/i }).first()).toBeVisible({ timeout: 30_000 });
  });
});

test.describe('Projects page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: /Selected Projects/i })).toBeVisible({ timeout: 60_000 });
  });

  test('shows the Selected Projects heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Selected Projects/i })).toBeVisible();
  });

  test('shows every project title', async ({ page }) => {
    for (const project of PROJECT_DATA) {
      await expect(page.getByText(project.title).first()).toBeVisible();
    }
  });

  test('clicking a project card navigates to the detail page', async ({ page }) => {
    await page.getByRole('link', { name: new RegExp(FIRST.title, 'i') }).first().click();
    await expect(page).toHaveURL(`/project/${FIRST.slug}`);
    await expect(page.getByRole('heading', { level: 1, name: FIRST.title })).toBeVisible({ timeout: 30_000 });
  });
});

test.describe('About page', () => {
  test('loads and shows the h1 heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 60_000 });
  });

  test('shows the Information section', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText(/Information/i).first()).toBeVisible({ timeout: 30_000 });
  });
});

test.describe('Project detail — first project', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/project/${FIRST.slug}`);
    await expect(page.getByRole('heading', { level: 1, name: FIRST.title })).toBeVisible({ timeout: 60_000 });
  });

  test('renders the project title as h1', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: FIRST.title })).toBeVisible();
  });

  test('renders the role, year, and category', async ({ page }) => {
    await expect(page.getByText(FIRST.role)).toBeVisible();
    await expect(page.getByText(FIRST.year)).toBeVisible();
    await expect(page.getByText(FIRST.category)).toBeVisible();
  });

  test('has no PREVIOUS link (first project)', async ({ page }) => {
    await expect(page.getByText('PREVIOUS')).not.toBeVisible();
  });

  test('has a NEXT link pointing to the second project', async ({ page }) => {
    if (!SECOND) test.skip();
    const nextLink = page.getByText('NEXT').locator('..');
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', `/project/${SECOND!.slug}`);
  });
});

test.describe('Project detail — last project', () => {
  test('has no NEXT link', async ({ page }) => {
    await page.goto(`/project/${LAST.slug}`);
    await expect(page.getByRole('heading', { level: 1, name: LAST.title })).toBeVisible({ timeout: 60_000 });
    await expect(page.getByText('NEXT')).not.toBeVisible();
  });
});

test.describe('404 handling', () => {
  test('invalid project slug shows not-found page', async ({ page }) => {
    await page.goto('/project/does-not-exist-xyz');
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible({ timeout: 30_000 });
  });
});
