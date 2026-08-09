(() => {
  'use strict';

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const compactMotion = matchMedia('(max-width: 760px), (pointer: coarse)');
  const darkSections = ['.projects', '.process', '.contact']
    .map((selector) => document.querySelector<HTMLElement>(selector))
    .filter((section): section is HTMLElement => section !== null);

  if (reducedMotion.matches || darkSections.length === 0) return;

  let frame = 0;
  const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  const resetSection = (section: HTMLElement) => {
    section.classList.remove('dark-cover-entering');
    section.style.removeProperty('--dark-cover-radius');
    section.style.removeProperty('--dark-cover-shadow');
  };

  const renderDarkSectionCover = () => {
    frame = 0;

    if (document.body.classList.contains('modal-open')) {
      darkSections.forEach(resetSection);
      return;
    }

    const viewport = Math.max(window.innerHeight, 1);
    const revealStart = viewport * 0.98;
    const revealEnd = viewport * 0.04;
    let candidate: { element: HTMLElement; progress: number } | null = null;

    for (const element of darkSections) {
      const rect = element.getBoundingClientRect();
      if (rect.top > revealEnd && rect.top < revealStart && rect.bottom > 0) {
        const progress = clamp((revealStart - rect.top) / (revealStart - revealEnd));
        if (candidate === null || progress > candidate.progress) candidate = { element, progress };
      }
    }

    darkSections.forEach((section) => {
      if (candidate === null || section !== candidate.element) resetSection(section);
    });

    if (candidate === null) return;

    const eased = 1 - Math.pow(1 - candidate.progress, 3);
    const maxRadius = compactMotion.matches ? 18 : Math.min(54, viewport * 0.055);
    const radius = (1 - eased) * maxRadius;
    const shadow = compactMotion.matches ? 0.04 + eased * 0.08 : 0.06 + eased * 0.18;

    candidate.element.classList.add('dark-cover-entering');
    candidate.element.style.setProperty('--dark-cover-radius', `${radius.toFixed(2)}px`);
    candidate.element.style.setProperty('--dark-cover-shadow', shadow.toFixed(3));
  };

  const queueDarkSectionCover = () => {
    if (frame !== 0) return;
    frame = requestAnimationFrame(renderDarkSectionCover);
  };

  addEventListener('scroll', queueDarkSectionCover, { passive: true });
  addEventListener('resize', queueDarkSectionCover, { passive: true });
  addEventListener('orientationchange', queueDarkSectionCover, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) queueDarkSectionCover();
  });

  renderDarkSectionCover();
})();

export {};
