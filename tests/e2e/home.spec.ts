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
  await expect(page.locator('.site-header .brand')).toContainText('MYPORTFOLIO');
  await expect(page.locator('h1')).toContainText("I'M IRSYAD");
  await expect(page.locator('h1')).toContainText('I BUILD WEB, AI & IoT SYSTEMS.');
  const about = page.locator('#about');
  await expect(about).toBeVisible();
  await expect(about.locator('h2')).toHaveText(
    'MEMBANGUN SISTEM IOT, BACKEND, DAN INTEGRASI AI YANG SIAP DIGUNAKAN.',
  );
  await expect(about.locator('.info strong')).toHaveText([
    'Irsyad',
    'Bekasi, Indonesia',
    'IoT · Backend · AI',
    'Open to Opportunity',
  ]);
  await expect(about.locator('.stat strong')).toHaveText(['ESP32', 'API', 'AI', 'E2E']);
  await about.locator('.stats').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await expect(about.locator('.stat strong')).toHaveText(['ESP32', 'API', 'AI', 'E2E']);
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

test('hero exposes accessible social profile icons', async ({ page }) => {
  await page.goto('/');

  const socialLinks = page.locator('.hero-social-link');
  await expect(socialLinks).toHaveCount(5);
  const profiles = [
    ['GitHub', 'https://github.com/Franklnir'],
    ['Instagram', 'https://www.instagram.com/ir_syad2612/'],
    ['LinkedIn', 'https://www.linkedin.com/in/irsyad-062a30373/'],
    ['Facebook', 'https://www.facebook.com/ir_syad2612'],
    ['WhatsApp', 'https://wa.me/6289531832365'],
  ] as const;
  for (const [index, [title, href]] of profiles.entries()) {
    await expect(socialLinks.nth(index)).toHaveAttribute('title', title);
    await expect(socialLinks.nth(index)).toHaveAttribute('href', href);
    await expect(socialLinks.nth(index)).toHaveAttribute('target', '_blank');
  }
  await expect(page.locator('.hero-meta')).toHaveCount(0);
});

test('hero CV resume action opens the viewer overlay with controls', async ({ page }) => {
  await page.goto('/');

  const overlay = page.locator('#cvResumeViewer');
  await expect(overlay).toHaveAttribute('aria-hidden', 'true');

  await page.locator('.hero-actions [data-cv-open]').click();
  await expect(overlay).toHaveAttribute('aria-hidden', 'false');
  await expect(overlay.locator('.cv-viewer-tab')).toHaveCount(2);
  await expect(overlay.locator('[data-cv-pages] canvas').first()).toBeVisible({
    timeout: 15_000,
  });

  await overlay.getByRole('button', { name: 'IT Support' }).click();
  await expect(overlay.locator('[data-cv-pages] canvas').first()).toBeVisible({
    timeout: 15_000,
  });
  await expect(overlay.locator('[data-cv-download]')).toHaveAttribute(
    'href',
    '/documents/irsyad-cv-it-support.pdf',
  );
  await expect(overlay.locator('[data-cv-download]')).toHaveAttribute(
    'download',
    'irsyad-cv-it-support.pdf',
  );

  const zoomBefore = Number(
    (await overlay.locator('[data-cv-zoom-label]').textContent())?.replace('%', ''),
  );
  await overlay.getByRole('button', { name: 'Perbesar CV' }).click();
  const zoomAfter = Number(
    (await overlay.locator('[data-cv-zoom-label]').textContent())?.replace('%', ''),
  );
  expect(zoomAfter).toBeGreaterThan(zoomBefore);

  await overlay.getByRole('button', { name: 'Tutup overlay CV' }).click();
  await expect(overlay).toHaveAttribute('aria-hidden', 'true');
});

test('mobile certificate and process rails expose button navigation', async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'), 'Mobile slider controls');
  await page.goto('/');

  const certificateNav = page.locator('.certificate-slider-nav');
  await certificateNav.scrollIntoViewIfNeeded();
  await expect(certificateNav).toBeVisible();
  expect(await certificateNav.evaluate((nav) => nav.previousElementSibling?.id)).toBe(
    'certificateViewport',
  );
  await expect(certificateNav.locator('.mobile-slider-button svg')).toHaveCount(2);
  await expect(certificateNav.locator('[data-slider-prev]')).toBeDisabled();
  await certificateNav.locator('[data-slider-next]').click();
  await expect(certificateNav.locator('[data-slider-current]')).toHaveText('02');
  expect(
    await page.locator('#certificateViewport').evaluate((element) => element.scrollLeft),
  ).toBeGreaterThan(0);

  const processNav = page.locator('.process-slider-nav');
  await processNav.scrollIntoViewIfNeeded();
  await expect(processNav).toBeVisible();
  expect(
    await processNav.evaluate((nav) =>
      nav.previousElementSibling?.classList.contains('process-look-progress'),
    ),
  ).toBe(true);
  await expect(processNav.locator('.mobile-slider-button svg')).toHaveCount(2);
  await expect(processNav.locator('[data-slider-prev]')).toBeDisabled();
  await processNav.locator('[data-slider-next]').click();
  await expect(processNav.locator('[data-slider-current]')).toHaveText('02');
  expect(
    await page.locator('#processLookbookStage').evaluate((element) => element.scrollLeft),
  ).toBeGreaterThan(0);
});

test('capability cards expose the complete engineering scope', async ({ page }) => {
  await page.goto('/#services');

  const cards = page.locator('#services .service-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.locator('.service-icon svg')).toHaveCount(3);
  await expect(cards.nth(0).locator('h3')).toHaveText('IoT & Embedded Engineering');
  await expect(cards.nth(0)).toContainText('ESP32 / Sensor Integration / SBC');
  await expect(cards.nth(0)).toContainText('MQTT / Mosquitto');
  await expect(cards.nth(0)).not.toContainText('Firebase');
  await expect(cards.nth(0)).not.toContainText('Supabase');
  await expect(cards.nth(1).locator('h3')).toHaveText('Backend & Platform Engineering');
  await expect(cards.nth(1)).toContainText('Laravel / FastAPI');
  await expect(cards.nth(1)).toContainText('PostgreSQL / MySQL / Redis');
  await expect(cards.nth(1)).toContainText('WebSocket / Worker');
  await expect(cards.nth(2).locator('h3')).toHaveText('AI System Integration');
  await expect(cards.nth(2)).toContainText('AI Models / Hugging Face');
  await expect(cards.nth(2)).toContainText('MCP / Tool Integration');
  await expect(cards.nth(2)).toContainText('AI Agent Integration');
  await expect(cards.nth(2)).not.toContainText('Hermes Agent');
  await expect(cards.nth(2)).not.toContainText('9Router');
});

test('toolkit uses local brand or library icons with official names', async ({ page }) => {
  await page.goto('/#my-tools');

  await expect(page.locator('#my-tools .tool-pill')).toHaveCount(32);
  await expect(page.locator('#my-tools .tool-icon > :is(svg, img)')).toHaveCount(32);
  await expect(page.locator('#my-tools .tool-monogram')).toHaveCount(0);
  await expect(page.locator('#my-tools img[src^="http"]')).toHaveCount(0);
  await expect(page.locator('#my-tools')).toContainText('Google Gemini');
  await expect(page.locator('#my-tools')).toContainText('OpenAI Codex');
  await expect(page.locator('#my-tools')).toContainText('Autodesk Tinkercad');
  await expect(page.locator('#my-tools')).toContainText('Comet');
  await expect(page.locator('#my-tools')).toContainText('diagrams.net (draw.io)');
});

test('technology rail renders local vector logos and complete product names', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.tech-strip .tech')).toHaveCount(30);
  await expect(page.locator('.tech-strip .tech-logo > :is(svg, img)')).toHaveCount(30);
  await expect(page.locator('.tech-strip img[src^="http"]')).toHaveCount(0);
  await expect(page.locator('.tech-strip')).toContainText('Eclipse Mosquitto');
  await expect(page.locator('.tech-strip')).toContainText('Model Context Protocol');
  await expect(page.locator('.tech-strip')).toContainText('Single-board computer');
});

test('theme picker offers and persists all five appearances', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.removeItem('irsyad-theme');
  });
  await page.reload();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'brand');
  await expect(page.locator('#themeColor')).toHaveAttribute('content', '#f5ecdc');

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
  await expect(section.locator('.certificate-card')).toHaveCount(9);
  await expect(section.locator('.certificate-card').first().locator('h3')).toHaveText(
    'Introduction to Cyber Security',
  );
  await expect(section.locator('.certificate-card h3')).toHaveText([
    'Introduction to Cyber Security',
    'Praktikum Data Mining',
    'Praktik Kerja Lapangan',
    'Seminar Nasional Data & AI',
    'Panitia Seminar Web Development & API',
    'Seminar Keamanan Informasi',
    'Seminar Technopreneur & SDGs',
    'Seminar Evolusi Teknologi Web',
    'Seminar Fisika & Robotika',
  ]);

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
  await expect(cards.locator('.portfolio-detail-summary')).toHaveCount(6);
  await expect(cards.first().locator('.portfolio-detail-summary')).toContainText(
    'Monorepo operasional sekolah',
  );

  const catalogSource = await page.locator('#projectCatalog').textContent();
  if (!catalogSource) throw new Error('Project catalog is empty');
  const catalog = parseProjectKeys(catalogSource);
  const cardKeys = await cards.evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-project-detail')),
  );
  expect(cardKeys).toEqual(catalog);

  const firstCard = cards.first();
  const firstProjectTitle = (await firstCard.locator('h3').textContent())?.trim();
  if (!firstProjectTitle) throw new Error('First project title is empty');
  const firstProjectButton = firstCard.locator('button[data-project]');
  await expect(firstProjectButton).toHaveAccessibleName(`View ${firstProjectTitle}`);
  await firstProjectButton.dispatchEvent('click');
  await expect(page.locator('#projectView')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#caseTitle')).toHaveText(firstProjectTitle);
});

test('project cards match the certificate card and preview proportions', async ({ page }) => {
  await page.goto('/#projects');

  const certificateHeight = await page
    .locator('.certificate-card')
    .first()
    .evaluate((card) => (card as HTMLElement).offsetHeight);
  const certificateWidth = await page
    .locator('.certificate-card')
    .first()
    .evaluate((card) => (card as HTMLElement).offsetWidth);
  const certificateMedia = await page
    .locator('.certificate-preview')
    .first()
    .evaluate((media) => ({
      width: (media as HTMLElement).offsetWidth,
      height: (media as HTMLElement).offsetHeight,
    }));
  const metrics = await page.locator('[data-project-detail]').evaluateAll((cards) =>
    cards.map((card) => {
      const media = card.querySelector<HTMLElement>('.portfolio-detail-media');
      if (!media) throw new Error('Project media is missing');
      return {
        key: card.getAttribute('data-project-detail'),
        cardWidth: (card as HTMLElement).offsetWidth,
        cardHeight: (card as HTMLElement).offsetHeight,
        mediaWidth: media.offsetWidth,
        mediaHeight: media.offsetHeight,
      };
    }),
  );

  const firstMetric = metrics[0];
  if (!firstMetric) throw new Error('Project cards are missing');
  expect(new Set(metrics.map(({ cardHeight }) => cardHeight)).size).toBe(1);
  expect(new Set(metrics.map(({ cardWidth }) => cardWidth)).size).toBe(1);
  expect(firstMetric.cardHeight).toBe(certificateHeight);
  expect(firstMetric.cardWidth).toBe(certificateWidth);
  for (const metric of metrics) {
    expect(metric.mediaWidth).toBe(certificateMedia.width);
    expect(metric.mediaHeight).toBe(certificateMedia.height);
  }
});

test('project details expose audited repository and technology data', async ({ page }) => {
  await page.goto('/#projects');

  const catalogSource = await page.locator('#projectCatalog').textContent();
  if (!catalogSource) throw new Error('Project catalog is empty');
  const catalog = JSON.parse(catalogSource) as Array<{
    key: string;
    title: string;
    technologies: string[];
    repositories: Array<{ label: string; url: string; scope: string }>;
    caseStudy: {
      approach: string;
      limitations: string;
      functions: Array<{ title: string; description: string }>;
      workflow: Array<{ title: string; description: string }>;
    };
  }>;

  expect(catalog).toHaveLength(6);
  expect(catalog.every((project) => project.repositories.length > 0)).toBeTruthy();
  expect(catalog.every((project) => project.caseStudy.functions.length > 0)).toBeTruthy();
  expect(catalog.every((project) => project.caseStudy.workflow.length > 0)).toBeTruthy();
  const energy = catalog.find((project) => project.key === 'energy');
  expect(energy?.repositories.map((repository) => repository.url)).toEqual([
    'https://github.com/Franklnir/Dasboard-monitor-listrik',
    'https://github.com/Franklnir/sensor-pzem-004t-v4',
  ]);
  expect(energy?.technologies).toContain('Supabase Realtime');
  expect(energy?.caseStudy.functions).toHaveLength(6);
  expect(energy?.caseStudy.workflow).toHaveLength(7);

  const xiaozhi = catalog.find((project) => project.key === 'cog');
  expect(xiaozhi?.title).toContain('Adaptasi Xiaozhi AI');
  expect(xiaozhi?.caseStudy.approach).toContain('bukan firmware AI yang dibuat dari nol');

  const weather = catalog.find((project) => project.key === 'weather');
  expect(weather?.caseStudy.limitations).toContain('bukan model machine learning');

  await page
    .locator('[data-project-detail="energy"] button[data-project]')
    .dispatchEvent('click');
  await expect(page.locator('#projectView')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('.case-function-item')).toHaveCount(6);
  await expect(page.locator('.case-workflow-list li')).toHaveCount(7);
  await expect(page.locator('.case-function-item').first()).toContainText(
    'Pengukuran listrik lengkap',
  );
  await expect(page.locator('.case-workflow-list li').first()).toContainText(
    'Sensor dibaca oleh ESP32-S3',
  );
  await expect(page.locator('.case-tech-list li', { hasText: 'ESP32-S3 Mini' })).toHaveCount(1);
  await expect(page.locator('.case-repository-link')).toHaveCount(2);
  await expect(page.locator('.case-repository-link').first()).toContainText(
    'Dashboard Monitoring Listrik',
  );
  await expect(page.locator('.case-repository-link').nth(1)).toContainText(
    'Firmware Sensor PZEM',
  );
});

test('project detail gallery preserves image proportions and source resolution', async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'), 'Desktop gallery proportions');
  await page.goto('/');
  await page
    .locator('[data-project-detail="school"] .portfolio-detail-text-link')
    .dispatchEvent('click');

  const gallery = page.locator('[data-case-gallery]');
  const image = gallery.locator('.case-gallery-image').first();
  await expect(image).toBeVisible();
  await expect(gallery).toHaveAttribute('data-media-orientation', 'landscape');

  const metrics = await gallery.evaluate((element) => {
    const media = element.querySelector<HTMLImageElement>('.case-gallery-image');
    if (!media) throw new Error('Project gallery image is missing');
    return {
      frameRatio: element.clientWidth / element.clientHeight,
      sourceRatio: media.naturalWidth / media.naturalHeight,
      renderedWidth: media.clientWidth,
      naturalWidth: media.naturalWidth,
      objectFit: getComputedStyle(media).objectFit,
    };
  });

  expect(Math.abs(metrics.frameRatio - metrics.sourceRatio)).toBeLessThan(0.01);
  expect(metrics.objectFit).toBe('contain');
  expect(metrics.naturalWidth).toBeGreaterThanOrEqual(metrics.renderedWidth);
});

test('project route requests an HD cover without cropping it', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'), 'Desktop project cover resolution');
  await page.goto('/projects/platform-operasi-akademik/');
  await expect(page.getByRole('heading', { name: 'Fungsi Utama' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cara Kerja' })).toBeVisible();
  await expect(page.locator('.function-grid article')).toHaveCount(5);
  await expect(page.locator('.workflow-list li')).toHaveCount(6);

  const metrics = await page.locator('.project-route-visual img').evaluate((element) => {
    const image = element as HTMLImageElement;
    return {
      renderedWidth: image.clientWidth,
      naturalWidth: image.naturalWidth,
      objectFit: getComputedStyle(image).objectFit,
    };
  });

  expect(metrics.objectFit).toBe('contain');
  expect(metrics.naturalWidth).toBeGreaterThanOrEqual(metrics.renderedWidth);
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
