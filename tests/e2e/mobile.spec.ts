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

test('mobile vertical scroll advances the horizontal project rail', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#projects');
  await section.evaluate((element) => {
    const scrollArea = element.querySelector<HTMLElement>('#projectDetailsScroll');
    if (!scrollArea) throw new Error('Project scroll area is missing');
    const destination = window.scrollY + scrollArea.getBoundingClientRect().top
      + (scrollArea.offsetHeight - window.innerHeight) * 0.55;
    window.scrollTo({ top: destination, behavior: 'instant' });
  });

  await expect.poll(async () => page.locator('#projectDetailsCurrent').textContent()).not.toBe('01');
  const transform = await page.locator('#projectDetailsTrack').evaluate(
    (track) => getComputedStyle(track).transform,
  );
  expect(transform).not.toBe('none');
});
