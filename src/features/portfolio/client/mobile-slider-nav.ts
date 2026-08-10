const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function setupMobileSlider(nav: HTMLElement): void {
  if (nav.dataset.sliderReady === 'true') return;

  const targetId = nav.dataset.sliderTarget;
  const itemSelector = nav.dataset.sliderItems;
  const scroller = targetId ? document.getElementById(targetId) : null;
  const previous = nav.querySelector<HTMLButtonElement>('[data-slider-prev]');
  const next = nav.querySelector<HTMLButtonElement>('[data-slider-next]');
  const current = nav.querySelector<HTMLElement>('[data-slider-current]');

  if (!scroller || !itemSelector || !previous || !next || !current) return;

  const items = Array.from(scroller.querySelectorAll<HTMLElement>(itemSelector));
  if (items.length === 0) return;

  nav.dataset.sliderReady = 'true';
  let activeIndex = 0;
  let frame = 0;

  const closestIndex = (): number => {
    const scrollerRect = scroller.getBoundingClientRect();
    const viewportCenter = scrollerRect.left + scroller.clientWidth / 2;
    let closestDistance = Number.POSITIVE_INFINITY;
    let closest = 0;

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const distance = Math.abs(itemRect.left + itemRect.width / 2 - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });

    return closest;
  };

  const update = (): void => {
    frame = 0;
    activeIndex = closestIndex();
    current.textContent = String(activeIndex + 1).padStart(2, '0');
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === items.length - 1;
  };

  const queueUpdate = (): void => {
    if (frame === 0) frame = requestAnimationFrame(update);
  };

  const scrollToIndex = (index: number): void => {
    const targetIndex = Math.min(items.length - 1, Math.max(0, index));
    const item = items[targetIndex];
    if (!item) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const itemCenter = scroller.scrollLeft + itemRect.left - scrollerRect.left + itemRect.width / 2;
    const left = itemCenter - scroller.clientWidth / 2;

    scroller.scrollTo({
      left,
      behavior: matchMedia(REDUCED_MOTION_QUERY).matches ? 'auto' : 'smooth',
    });
  };

  previous.addEventListener('click', () => {
    scrollToIndex(activeIndex - 1);
  });
  next.addEventListener('click', () => {
    scrollToIndex(activeIndex + 1);
  });
  scroller.addEventListener('scroll', queueUpdate, { passive: true });
  new ResizeObserver(queueUpdate).observe(scroller);
  update();
}

function setupMobileSliders(): void {
  document.querySelectorAll<HTMLElement>('[data-mobile-slider-nav]').forEach(setupMobileSlider);
}

setupMobileSliders();
document.addEventListener('astro:page-load', setupMobileSliders);
document.addEventListener('astro:after-swap', setupMobileSliders);

export {};
