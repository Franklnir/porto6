import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const MIN_ZOOM = 0.35;
const MAX_ZOOM = 2.4;
const ZOOM_STEP = 0.15;
const BASE_PAGE_WIDTH = 860;
const FALLBACK_PAGE_HEIGHT = 1216;
const PAGE_GAP = 18;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function initCvResumeViewer(): void {
  const overlay = document.getElementById('cvResumeViewer');
  if (!overlay || overlay.dataset.cvInitialized === 'true') return;

  const panel = overlay.querySelector<HTMLElement>('.cv-viewer-panel');
  const stage = overlay.querySelector<HTMLElement>('[data-cv-stage]');
  const shell = overlay.querySelector<HTMLElement>('[data-cv-shell]');
  const pages = overlay.querySelector<HTMLElement>('[data-cv-pages]');
  const status = overlay.querySelector<HTMLElement>('[data-cv-status]');
  const download = overlay.querySelector<HTMLAnchorElement>('[data-cv-download]');
  const zoomLabel = overlay.querySelector<HTMLOutputElement>('[data-cv-zoom-label]');
  const tabButtons = [...overlay.querySelectorAll<HTMLButtonElement>('[data-cv-select]')];
  const closeButtons = [...overlay.querySelectorAll<HTMLButtonElement>('[data-cv-close]')];
  const openButtons = [...document.querySelectorAll<HTMLElement>('[data-cv-open]')];
  const header = document.getElementById('siteHeader');
  const siteMain = document.getElementById('main');

  if (
    !panel ||
    !stage ||
    !shell ||
    !pages ||
    !status ||
    !download ||
    !zoomLabel ||
    !tabButtons.length
  ) {
    return;
  }
  const defaultTab = tabButtons[0];
  if (!defaultTab) return;

  overlay.dataset.cvInitialized = 'true';

  let lastFocus: HTMLElement | null = null;
  let zoom = 1;
  let renderId = 0;
  let docWidth = BASE_PAGE_WIDTH;
  let docHeight = FALLBACK_PAGE_HEIGHT;
  let activeSrc = '';
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragScrollLeft = 0;
  let dragScrollTop = 0;

  const updateDocumentSize = (width: number, height: number): void => {
    docWidth = width;
    docHeight = height;
    shell.style.setProperty('--cv-doc-width', `${docWidth}px`);
    shell.style.setProperty('--cv-doc-height', `${docHeight}px`);
  };

  const getFitZoom = (): number => {
    const width = stage.clientWidth || window.innerWidth - 48;
    const height = stage.clientHeight || window.innerHeight * 0.72;
    const fitWidth = (width - 28) / docWidth;
    const fitHeight = (height - 28) / docHeight;
    return clamp(Math.min(fitWidth, fitHeight, 0.86), MIN_ZOOM, MAX_ZOOM);
  };

  const setZoom = (nextZoom: number, keepCenter = true): void => {
    const previousZoom = zoom;
    const centerX = stage.scrollLeft + stage.clientWidth / 2;
    const centerY = stage.scrollTop + stage.clientHeight / 2;
    zoom = clamp(Number(nextZoom.toFixed(2)), MIN_ZOOM, MAX_ZOOM);
    shell.style.setProperty('--cv-zoom', String(zoom));
    zoomLabel.value = `${Math.round(zoom * 100)}%`;
    zoomLabel.textContent = `${Math.round(zoom * 100)}%`;

    if (keepCenter && previousZoom > 0) {
      const ratio = zoom / previousZoom;
      requestAnimationFrame(() => {
        stage.scrollLeft = centerX * ratio - stage.clientWidth / 2;
        stage.scrollTop = centerY * ratio - stage.clientHeight / 2;
      });
    }
  };

  const renderDocument = async (src: string, title: string): Promise<void> => {
    const currentRender = ++renderId;
    activeSrc = src;
    pages.replaceChildren();
    pages.setAttribute('aria-label', title);
    status.hidden = false;
    status.textContent = 'Memuat preview CV...';
    shell.setAttribute('aria-busy', 'true');
    updateDocumentSize(BASE_PAGE_WIDTH, FALLBACK_PAGE_HEIGHT);

    try {
      const loadingTask = getDocument({ url: src });
      const pdf = await loadingTask.promise;
      if (currentRender !== renderId) return;

      let maxPageWidth = BASE_PAGE_WIDTH;
      let totalPageHeight = 0;
      const renderedPages: HTMLCanvasElement[] = [];
      const outputScale = clamp(window.devicePixelRatio || 1, 1, 2);

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        if (currentRender !== renderId) return;

        const naturalViewport = page.getViewport({ scale: 1 });
        const cssScale = BASE_PAGE_WIDTH / naturalViewport.width;
        const viewport = page.getViewport({ scale: cssScale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas rendering is not available.');

        canvas.className = 'cv-document-page';
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        await page.render({
          canvas,
          canvasContext: context,
          viewport,
          transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined,
        }).promise;

        renderedPages.push(canvas);
        maxPageWidth = Math.max(maxPageWidth, viewport.width);
        totalPageHeight += viewport.height;
      }

      if (currentRender !== renderId) return;
      totalPageHeight += Math.max(0, renderedPages.length - 1) * PAGE_GAP;
      updateDocumentSize(maxPageWidth, totalPageHeight);
      pages.replaceChildren(...renderedPages);
      status.hidden = true;
      shell.removeAttribute('aria-busy');
      requestAnimationFrame(() => {
        setZoom(getFitZoom(), false);
        stage.scrollTo({ left: 0, top: 0 });
      });
    } catch (error) {
      if (currentRender !== renderId) return;
      console.error('CV preview could not be rendered.', error);
      status.hidden = false;
      status.textContent = 'Preview CV tidak bisa dimuat. Gunakan tombol Download.';
      shell.removeAttribute('aria-busy');
    }
  };

  const selectDocument = (button: HTMLButtonElement): void => {
    const src = button.dataset.cvSrc;
    const title = button.dataset.cvTitle ?? 'Preview CV';
    const filename = button.dataset.cvFilename ?? 'irsyad-cv.pdf';
    if (!src) return;

    tabButtons.forEach((tab) => {
      tab.setAttribute('aria-pressed', String(tab === button));
    });
    download.href = src;
    download.download = filename;
    stage.scrollTo({ left: 0, top: 0 });
    void renderDocument(src, title);
  };

  const openViewer = (trigger: HTMLElement): void => {
    lastFocus = trigger;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    header?.setAttribute('inert', '');
    siteMain?.setAttribute('inert', '');
    requestAnimationFrame(() => {
      if (!activeSrc) {
        selectDocument(defaultTab);
      } else {
        setZoom(getFitZoom(), false);
      }
      stage.scrollTo({ left: 0, top: 0 });
      panel.focus({ preventScroll: true });
    });
  };

  const closeViewer = (): void => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    header?.removeAttribute('inert');
    siteMain?.removeAttribute('inert');
    lastFocus?.focus({ preventScroll: true });
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      openViewer(button);
    });
  });
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeViewer();
    });
  });
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectDocument(button);
    });
  });

  overlay.querySelectorAll<HTMLButtonElement>('[data-cv-zoom]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.cvZoom;
      if (action === 'in') {
        setZoom(zoom + ZOOM_STEP);
      }
      if (action === 'out') {
        setZoom(zoom - ZOOM_STEP);
      }
      if (action === 'fit') {
        setZoom(getFitZoom(), false);
        stage.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      }
    });
  });

  stage.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    dragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragScrollLeft = stage.scrollLeft;
    dragScrollTop = stage.scrollTop;
    stage.classList.add('is-dragging');
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    stage.scrollLeft = dragScrollLeft - (event.clientX - dragStartX);
    stage.scrollTop = dragScrollTop - (event.clientY - dragStartY);
  });

  const stopDragging = (event: PointerEvent): void => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('is-dragging');
    try {
      stage.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture can already be released by the browser.
    }
  };

  stage.addEventListener('pointerup', stopDragging);
  stage.addEventListener('pointercancel', stopDragging);

  document.addEventListener('keydown', (event) => {
    if (!overlay.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      closeViewer();
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = [
      ...overlay.querySelectorAll<HTMLElement>(
        'button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.offsetParent !== null);

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

initCvResumeViewer();
document.addEventListener('astro:page-load', initCvResumeViewer);

export {};
