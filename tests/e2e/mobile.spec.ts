import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('mobile menu and featured project remain usable', async ({ page }) => {
  await page.goto('/');
  const menu = page.locator('.menu-btn');
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.locator('#mobileMenu')).toHaveClass(/open/);
  await menu.click();
  await page.locator('#featured-projects').scrollIntoViewIfNeeded();
  await expect(page.locator('#featured-projects')).toBeVisible();
});
