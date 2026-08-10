import { expect, test } from '@playwright/test';

function parseProjectKeys(value: string): string[] {
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) throw new Error('Project catalog must be an array');
  const projects: unknown[] = parsed;
  return projects.map((project) => {
    if (
      typeof project !== 'object' ||
      project === null ||
      !('key' in project) ||
      typeof project.key !== 'string'
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

  const desktopNav = page.locator('#desktopNav');
  await expect(desktopNav.locator('a', { hasText: 'Kapabilitas' })).toHaveCount(0);
  await expect(desktopNav.locator('a')).toHaveCount(5);
  expect(
    await desktopNav
      .locator('a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href'))),
  ).toEqual(['#about', '#projects', '#experience', '#certificates', '#faq']);
  await expect(desktopNav.locator('a[href="#certificates"]')).toHaveText('Sertifikat');
  await expect(desktopNav.locator('a[href="#certificates"]')).toHaveAttribute(
    'href',
    '#certificates',
  );
  await expect(page.locator('#mobileMenu a[href="#certificates"]')).toContainText('Sertifikat');
  await expect(page.locator('#mobileMenu a[href="#certificates"]')).toHaveAttribute(
    'href',
    '#certificates',
  );
});

test('capability cards expose the complete engineering scope', async ({ page }) => {
  await page.goto('/#services');

  const cards = page.locator('#services .service-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0)).toContainText('ESP32, Sensor Integration & SBC');
  await expect(cards.nth(0)).toContainText('MQTT / Mosquitto / Firebase / Supabase');
  await expect(cards.nth(1)).toContainText('modular monolith');
  await expect(cards.nth(1)).toContainText('PostgreSQL, MySQL, NoSQL, Redis, queue, worker');
  await expect(cards.nth(2)).toContainText('FastAPI AI services / Hugging Face');
  await expect(cards.nth(2)).toContainText('Hermes Agent & 9Router');
});

test('theme picker offers and persists all five appearances', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.removeItem('irsyad-theme');
  });
  await page.reload();

  const isMobile = (page.viewportSize()?.width ?? 0) <= 760;
  if (isMobile) await page.locator('#menuBtn').click();

  const toggle = page.locator('.header-theme-toggle');
  const picker = page.locator(isMobile ? '.mobile-theme-options' : '.header-theme-picker');
  if (!isMobile) await toggle.click();

  await expect(picker).toBeVisible();
  await expect(picker.locator('[data-theme-option]')).toHaveCount(5);
  await picker.locator('[data-theme-option="dark"]').click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#themeColor')).toHaveAttribute('content', '#10110f');

  if (!isMobile) await toggle.click();
  await picker.locator('[data-theme-option="flowy"]').click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'flowy');
  await expect(page.locator('#themeColor')).toHaveAttribute('content', '#f7f0d7');

  if (!isMobile) await toggle.click();
  await picker.locator('[data-theme-option="neo"]').click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'neo');
  await expect(page.locator('#themeColor')).toHaveAttribute('content', '#f7f7f5');

  if (!isMobile) await toggle.click();
  await picker.locator('[data-theme-option="brand"]').click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'brand');
  await expect(page.locator('#themeColor')).toHaveAttribute('content', '#f5ecdc');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'brand');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('irsyad-theme'))).toBe('brand');
});

test('certificate section exposes all source documents', async ({ page }) => {
  await page.goto('/#certificates');

  const section = page.locator('#certificates');
  await expect(section).toBeVisible();
  await expect(section.locator('.certificate-card')).toHaveCount(6);
  await expect(section.locator('.certificate-card').first().locator('h3')).toHaveText(
    'Introduction to Cyber Security',
  );

  const links = await section
    .locator('.certificate-card')
    .evaluateAll((cards) => cards.map((card) => (card as HTMLAnchorElement).href));

  for (const link of links) {
    const response = await page.request.get(link);
    expect(response.ok()).toBeTruthy();
  }
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
