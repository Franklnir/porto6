import { expect, test } from '@playwright/test';

function parseProjectKeys(value: string): string[] {
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) throw new Error('Project catalog must be an array');
  const projects: unknown[] = parsed;
  return projects.map((project) => {
    if (
      typeof project !== 'object'
      || project === null
      || !('key' in project)
      || typeof project.key !== 'string'
    ) {
      throw new Error('Project catalog contains an invalid key');
    }
    return project.key;
  });
}

test('homepage renders the preserved portfolio sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText("I'm Irsyad, a Web and IoT");
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#featured-projects')).toBeVisible();
  await expect(page.locator('#projects')).toBeVisible();
  await expect(page.locator('#faq')).toBeVisible();
});

test('project cards and overlay use the same content catalog', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('[data-project-detail]');
  await expect(cards).toHaveCount(6);

  const catalogSource = await page.locator('#projectCatalog').textContent();
  if (!catalogSource) throw new Error('Project catalog is empty');
  const catalog = parseProjectKeys(catalogSource);
  const cardKeys = await cards.evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-project-detail')),
  );
  expect(cardKeys).toEqual(catalog);

  const firstProjectButton = cards
    .first()
    .getByRole('button', { name: /View Platform Operasi Akademik Sekolah/i });
  await firstProjectButton.dispatchEvent('click');
  await expect(page.locator('#projectView')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#caseTitle')).toHaveText('Platform Operasi Akademik Sekolah');
});

test('dark page cover animates the real section without an overlay', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#darkPageCurtain')).toHaveCount(0);
  for (const selector of ['#projects', '#process', '#contact']) {
    const section = page.locator(selector);
    await section.evaluate((element) => {
      const destination = window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.7;
      window.scrollTo({ top: destination, behavior: 'instant' });
    });

    await expect(section).toHaveClass(/dark-cover-entering/);
    await expect(page.locator('.dark-cover-entering')).toHaveCount(1);
    const radius = await section.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).borderTopLeftRadius),
    );
    expect(radius).toBeGreaterThan(0);
  }
});

test('profile handoff cancellation does not raise a page error', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });
  await page.goto('/');

  const about = page.locator('#about');
  for (let iteration = 0; iteration < 3; iteration += 1) {
    await about.evaluate((element) => {
      const destination = window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.7;
      window.scrollTo({ top: destination, behavior: 'instant' });
    });
    await page.waitForTimeout(40);
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(40);
  }

  await page.waitForTimeout(750);
  expect(pageErrors).toEqual([]);
});

test('tool marquees move while the tools section is visible', async ({ page }) => {
  await page.goto('/');
  const tools = page.locator('#my-tools');
  await tools.scrollIntoViewIfNeeded();
  await expect(tools).toHaveClass(/tools-motion-visible/);

  const flow = tools.locator('.tool-flow').first();
  const initialTransform = await flow.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(500);
  const movedTransform = await flow.evaluate((element) => getComputedStyle(element).transform);
  expect(movedTransform).not.toBe(initialTransform);
});

test('page has no document-level horizontal overflow', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
