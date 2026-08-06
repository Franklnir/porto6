import { expect, test } from '@playwright/test';

test('homepage renders the preserved portfolio sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Membangun sistem');
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#featured-projects')).toBeVisible();
  await expect(page.locator('#projects')).toBeVisible();
  await expect(page.locator('#faq')).toBeVisible();
});

test('page has no document-level horizontal overflow', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
