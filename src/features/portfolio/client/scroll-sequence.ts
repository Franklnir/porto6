/**
 * scroll-sequence.ts
 * ------------------
 * Scroll-driven image sequence controller for the hero section.
 * Pure TypeScript + vanilla browser APIs. No framework dependencies.
 *
 * Architecture:
 *   FrameLoader  — priority-based image loading with LRU cache
 *   Renderer     — canvas drawing with DPR-aware cover math
 *   Controller   — scroll → progress → lerp → frame → render loop
 */

// ─── Types ───────────────────────────────────────────────────

interface SequenceManifest {
  readonly frameCount: number;
  readonly pattern: string;
  readonly width: number;
  readonly height: number;
}

// ─── Constants ───────────────────────────────────────────────

const LERP_FACTOR = 0.12;
const LERP_THRESHOLD = 0.0005;
const PRELOAD_AHEAD = 15;
const PRELOAD_BEHIND = 8;
const INITIAL_BATCH = 20;
const CACHE_SIZE = 80;
const RESIZE_DEBOUNCE = 150;
const LOADER_FADE_THRESHOLD = 0.08; // hide loader when 8% frames loaded
const INDICATOR_HIDE_PROGRESS = 0.08;
const IS_DEV = import.meta.env.DEV;

// ─── Utilities ───────────────────────────────────────────────

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function getFrameUrl(pattern: string, index: number): string {
  // Replace %04d with zero-padded frame number (1-based)
  const num = String(index + 1).padStart(4, '0');
  return pattern.replace('%04d', num);
}

function isMobile(): boolean {
  return window.innerWidth <= 860;
}

function isLowEnd(): boolean {
  return navigator.hardwareConcurrency <= 4;
}

// ─── Frame Loader ────────────────────────────────────────────

class FrameLoader {
  private readonly manifest: SequenceManifest;
  private readonly images: (HTMLImageElement | null)[];
  private readonly loadingSet = new Set<number>();
  private readonly loadedSet = new Set<number>();
  private readonly lruOrder: number[] = [];
  private abortController = new AbortController();
  private idleHandle: number | null = null;
  private onProgressCb: ((loaded: number, total: number) => void) | null = null;

  constructor(manifest: SequenceManifest) {
    this.manifest = manifest;
    this.images = new Array<HTMLImageElement | null>(manifest.frameCount).fill(null);
  }

  get frameCount(): number {
    return this.manifest.frameCount;
  }

  get loadedCount(): number {
    return this.loadedSet.size;
  }

  onProgress(cb: (loaded: number, total: number) => void): void {
    this.onProgressCb = cb;
  }

  /** Load a single frame, returns promise. */
  private loadFrame(index: number): Promise<HTMLImageElement> {
    const cachedImage = this.images[index];
    if (cachedImage) {
      return Promise.resolve(cachedImage);
    }
    if (this.loadingSet.has(index)) {
      // Already loading — return a polling promise
      return new Promise((resolve, reject) => {
        const check = (): void => {
          const loadedImage = this.images[index];
          if (loadedImage) {
            resolve(loadedImage);
          } else if (!this.loadingSet.has(index)) {
            reject(new Error(`Frame ${index} failed to load`));
          } else {
            setTimeout(check, 50);
          }
        };
        check();
      });
    }

    this.loadingSet.add(index);

    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = getFrameUrl(this.manifest.pattern, index);

      img.onload = (): void => {
        this.loadingSet.delete(index);
        this.loadedSet.add(index);
        this.images[index] = img;
        this.touchLru(index);
        this.onProgressCb?.(this.loadedSet.size, this.manifest.frameCount);
        resolve(img);
      };

      img.onerror = (): void => {
        this.loadingSet.delete(index);
        if (IS_DEV) console.warn(`[seq] Frame ${index} failed to load`);
        reject(new Error(`Frame ${index} load error`));
      };
    });
  }

  /** Maintain LRU order and evict if over cache limit */
  private touchLru(index: number): void {
    const pos = this.lruOrder.indexOf(index);
    if (pos !== -1) this.lruOrder.splice(pos, 1);
    this.lruOrder.push(index);

    // Evict oldest if cache too large
    while (this.lruOrder.length > CACHE_SIZE) {
      const evict = this.lruOrder.shift();
      if (evict !== undefined) {
        this.images[evict] = null;
        this.loadedSet.delete(evict);
      }
    }
  }

  /** Load initial batch (frame 0, then frames 0..INITIAL_BATCH-1). */
  async loadInitial(): Promise<void> {
    // Frame 0 first for immediate display
    await this.loadFrame(0).catch(() => {});

    // Then the initial batch
    const batchEnd = Math.min(INITIAL_BATCH, this.manifest.frameCount);
    const promises: Promise<HTMLImageElement>[] = [];
    for (let i = 1; i < batchEnd; i++) {
      promises.push(this.loadFrame(i).catch(() => new Image()));
    }
    await Promise.all(promises);
  }

  /** Preload frames around a target index (priority-based). */
  preloadAround(target: number): void {
    const fc = this.manifest.frameCount;
    const start = Math.max(0, target - PRELOAD_BEHIND);
    const end = Math.min(fc - 1, target + PRELOAD_AHEAD);

    // Load target first
    void this.loadFrame(target).catch(() => {});

    // Then ahead (more important)
    for (let i = target + 1; i <= end; i++) {
      void this.loadFrame(i).catch(() => {});
    }

    // Then behind
    for (let i = target - 1; i >= start; i--) {
      void this.loadFrame(i).catch(() => {});
    }
  }

  /** Background idle preload of all remaining frames. */
  startIdlePreload(): void {
    if (typeof requestIdleCallback === 'undefined') {
      // Fallback: load in small batches via setTimeout
      this.idlePreloadFallback(0);
      return;
    }

    let nextIndex = 0;
    const loadNext = (deadline: IdleDeadline): void => {
      while (nextIndex < this.manifest.frameCount && deadline.timeRemaining() > 5) {
        if (!this.images[nextIndex] && !this.loadingSet.has(nextIndex)) {
          void this.loadFrame(nextIndex).catch(() => {});
        }
        nextIndex++;
      }
      if (nextIndex < this.manifest.frameCount) {
        this.idleHandle = requestIdleCallback(loadNext, { timeout: 2000 });
      }
    };

    this.idleHandle = requestIdleCallback(loadNext, { timeout: 1000 });
  }

  private idlePreloadFallback(startIdx: number): void {
    const batchSize = 4;
    let i = startIdx;
    const loadBatch = (): void => {
      const end = Math.min(i + batchSize, this.manifest.frameCount);
      for (; i < end; i++) {
        if (!this.images[i] && !this.loadingSet.has(i)) {
          void this.loadFrame(i).catch(() => {});
        }
      }
      if (i < this.manifest.frameCount) {
        setTimeout(loadBatch, 200);
      }
    };
    loadBatch();
  }

  /** Get image for frame, or nearest loaded frame. Never returns null after init. */
  getFrame(index: number): HTMLImageElement | null {
    const img = this.images[index];
    if (img) {
      this.touchLru(index);
      return img;
    }
    return this.getNearestLoaded(index);
  }

  private getNearestLoaded(target: number): HTMLImageElement | null {
    const fc = this.manifest.frameCount;
    for (let d = 1; d < fc; d++) {
      const nextImage = target + d < fc ? this.images[target + d] : null;
      if (nextImage) return nextImage;
      const previousImage = target - d >= 0 ? this.images[target - d] : null;
      if (previousImage) return previousImage;
    }
    return null;
  }

  destroy(): void {
    this.abortController.abort();
    if (this.idleHandle !== null) {
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(this.idleHandle);
      }
    }
    this.images.fill(null);
    this.loadingSet.clear();
    this.loadedSet.clear();
    this.lruOrder.length = 0;
  }
}

// ─── Canvas Renderer ─────────────────────────────────────────

class Renderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly sourceWidth: number;
  private readonly sourceHeight: number;
  private lastDrawnFrame = -1;
  private dpr = 1;

  constructor(canvas: HTMLCanvasElement, sourceWidth: number, sourceHeight: number) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    this.ctx = ctx;
    this.sourceWidth = sourceWidth;
    this.sourceHeight = sourceHeight;
    this.resize();
  }

  resize(): void {
    const maxDpr = isMobile() ? 1.5 : 2;
    this.dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const rect = this.canvas.getBoundingClientRect();
    const w = Math.round(rect.width * this.dpr);
    const h = Math.round(rect.height * this.dpr);

    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.lastDrawnFrame = -1; // force redraw after resize
    }
  }

  /** Draw image with cover behavior, preserving aspect ratio. */
  draw(img: HTMLImageElement, frameIndex: number): void {
    if (frameIndex === this.lastDrawnFrame) return;

    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const iw = this.sourceWidth;
    const ih = this.sourceHeight;

    // Cover math: scale to fill, then center-crop
    const canvasRatio = cw / ch;
    const imageRatio = iw / ih;

    let sw: number, sh: number, sx: number, sy: number;

    if (canvasRatio > imageRatio) {
      // Canvas is wider → fit width, crop height
      sw = iw;
      sh = iw / canvasRatio;
      sx = 0;
      sy = (ih - sh) / 2;
    } else {
      // Canvas is taller → fit height, crop width
      sh = ih;
      sw = ih * canvasRatio;
      sx = (iw - sw) / 2;
      sy = 0;
    }

    this.ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    this.lastDrawnFrame = frameIndex;
  }

  invalidate(): void {
    this.lastDrawnFrame = -1;
  }
}

// ─── Debug Overlay ───────────────────────────────────────────

class DebugOverlay {
  private readonly el: HTMLElement;
  private frameTimestamps: number[] = [];

  constructor(container: HTMLElement) {
    this.el = document.createElement('div');
    this.el.className = 'seq-debug';
    container.appendChild(this.el);
  }

  update(frame: number, total: number, progress: number, loaded: number): void {
    const now = performance.now();
    this.frameTimestamps.push(now);
    // Keep last 60 timestamps
    while (this.frameTimestamps.length > 60) this.frameTimestamps.shift();
    const fps =
      this.frameTimestamps.length > 1
        ? Math.round(
            ((this.frameTimestamps.length - 1) * 1000) /
              (now - (this.frameTimestamps[0] ?? now))
          )
        : 0;

    this.el.textContent =
      `Frame: ${frame + 1} / ${total}\n` +
      `Progress: ${Math.round(progress * 100)}%\n` +
      `Loaded: ${loaded}\n` +
      `FPS: ${fps}`;
  }

  destroy(): void {
    this.el.remove();
  }
}

// ─── Main Controller ─────────────────────────────────────────

export class ScrollSequenceController {
  private loader: FrameLoader | null = null;
  private renderer: Renderer | null = null;
  private debug: DebugOverlay | null = null;

  private readonly section: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly loaderOverlay: HTMLElement;
  private readonly loaderBar: HTMLElement;
  private readonly loaderPct: HTMLElement;
  private readonly indicator: HTMLElement;

  private targetProgress = 0;
  private currentProgress = 0;
  private currentFrame = 0;
  private rafId: number | null = null;
  private isRunning = false;
  private isVisible = true;
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private frameStep = 1; // 1 = every frame, 2 = every other frame (mobile low-end)
  private loaderHidden = false;

  constructor() {
    const section = document.getElementById('seqScroll');
    const canvas = document.getElementById('seqCanvas') as HTMLCanvasElement | null;
    const loaderOverlay = document.getElementById('seqLoader');
    const loaderBar = document.getElementById('seqLoaderBar');
    const loaderPct = document.getElementById('seqLoaderPct');
    const indicator = document.getElementById('seqIndicator');

    if (!section || !canvas || !loaderOverlay || !loaderBar || !loaderPct || !indicator) {
      if (IS_DEV) console.warn('[seq] Missing DOM elements, aborting init');
      // Set dummy values so TS is happy — controller will not start
      this.section = document.createElement('div');
      this.canvas = document.createElement('canvas');
      this.loaderOverlay = document.createElement('div');
      this.loaderBar = document.createElement('div');
      this.loaderPct = document.createElement('div');
      this.indicator = document.createElement('div');
      return;
    }

    this.section = section;
    this.canvas = canvas;
    this.loaderOverlay = loaderOverlay;
    this.loaderBar = loaderBar;
    this.loaderPct = loaderPct;
    this.indicator = indicator;

    // Detect low-end mobile for frame skipping
    if (isMobile() && isLowEnd()) {
      this.frameStep = 2;
    }

    void this.init();
  }

  private async init(): Promise<void> {
    // Fetch manifest
    let manifest: SequenceManifest;
    try {
      const res = await fetch('/sequences/hero/sequence-manifest.json');
      manifest = (await res.json()) as SequenceManifest;
    } catch {
      if (IS_DEV) console.error('[seq] Failed to fetch sequence manifest');
      this.showFallback();
      return;
    }

    // Create loader
    this.loader = new FrameLoader(manifest);
    this.loader.onProgress((loaded, total) => {
      this.updateLoaderUI(loaded, total);
    });

    // Create renderer
    this.renderer = new Renderer(this.canvas, manifest.width, manifest.height);

    // Debug mode (dev only)
    if (IS_DEV) {
      const stickyEl = this.canvas.parentElement;
      if (stickyEl) {
        this.debug = new DebugOverlay(stickyEl);
      }
    }

    // Load initial frames
    await this.loader.loadInitial();

    // Draw first frame immediately
    const firstFrame = this.loader.getFrame(0);
    if (firstFrame) {
      this.renderer.draw(firstFrame, 0);
    }

    // Hide loader
    this.hideLoader();

    // Start idle preload
    this.loader.startIdlePreload();

    // Bind events
    this.bindEvents();

    // Start render loop
    this.isRunning = true;
    this.tick();

    // Sync to current scroll position (in case user reloaded mid-page)
    this.updateScrollProgress();
  }

  private updateLoaderUI(loaded: number, total: number): void {
    if (this.loaderHidden) return;

    const pct = Math.round((loaded / total) * 100);
    this.loaderBar.style.transform = `scaleX(${loaded / total})`;
    this.loaderPct.textContent = `${pct}%`;

    // Hide loader once we have enough frames
    if (loaded / total >= LOADER_FADE_THRESHOLD) {
      this.hideLoader();
    }
  }

  private hideLoader(): void {
    if (this.loaderHidden) return;
    this.loaderHidden = true;
    this.loaderOverlay.classList.add('is-hidden');
  }

  private showFallback(): void {
    // Hide loader and canvas; poster image will show
    this.loaderOverlay.classList.add('is-hidden');
    this.canvas.style.display = 'none';
  }

  private bindEvents(): void {
    // Scroll — passive, read-only
    window.addEventListener('scroll', this.onScroll, { passive: true });

    // Resize via ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.onResize();
      }, RESIZE_DEBOUNCE);
    });
    this.resizeObserver.observe(this.canvas);

    // Visibility
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  private readonly onScroll = (): void => {
    this.updateScrollProgress();
  };

  private updateScrollProgress(): void {
    const rect = this.section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = this.section.offsetHeight;
    const viewportHeight = window.innerHeight;

    const raw = (window.scrollY - sectionTop) / (sectionHeight - viewportHeight);
    this.targetProgress = clamp(raw, 0, 1);

    // Preload frames around target
    if (this.loader) {
      const targetFrame = Math.round(this.targetProgress * (this.loader.frameCount - 1));
      this.loader.preloadAround(targetFrame);
    }

    // Update scroll indicator
    if (this.targetProgress > INDICATOR_HIDE_PROGRESS) {
      this.indicator.classList.add('is-hidden');
    } else {
      this.indicator.classList.remove('is-hidden');
    }

    // Ensure RAF is running
    if (!this.isRunning) {
      this.isRunning = true;
      this.tick();
    }
  }

  private onResize(): void {
    this.renderer?.resize();
    // Redraw current frame
    if (this.loader && this.renderer) {
      const img = this.loader.getFrame(this.currentFrame);
      if (img) {
        this.renderer.invalidate();
        this.renderer.draw(img, this.currentFrame);
      }
    }
  }

  private readonly onVisibility = (): void => {
    if (document.visibilityState === 'hidden') {
      this.isVisible = false;
    } else {
      this.isVisible = true;
      // Sync to current scroll
      this.updateScrollProgress();
      if (!this.isRunning) {
        this.isRunning = true;
        this.tick();
      }
    }
  };

  private tick = (): void => {
    if (!this.isVisible) {
      this.isRunning = false;
      return;
    }

    // Lerp interpolation
    const delta = this.targetProgress - this.currentProgress;
    if (Math.abs(delta) < LERP_THRESHOLD) {
      this.currentProgress = this.targetProgress;
      // Stop loop when settled
      this.isRunning = false;
    } else {
      this.currentProgress += delta * LERP_FACTOR;
      this.rafId = requestAnimationFrame(this.tick);
    }

    // Calculate frame
    if (!this.loader || !this.renderer) return;

    const totalFrames = this.loader.frameCount;
    let targetFrame = Math.round(this.currentProgress * (totalFrames - 1));

    // Frame stepping for low-end devices
    if (this.frameStep > 1) {
      targetFrame = Math.round(targetFrame / this.frameStep) * this.frameStep;
      targetFrame = clamp(targetFrame, 0, totalFrames - 1);
    }

    if (targetFrame !== this.currentFrame) {
      const img = this.loader.getFrame(targetFrame);
      if (img) {
        this.renderer.draw(img, targetFrame);
        this.currentFrame = targetFrame;
      }
    }

    // Debug overlay
    this.debug?.update(
      this.currentFrame,
      totalFrames,
      this.currentProgress,
      this.loader.loadedCount
    );
  };

  destroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('visibilitychange', this.onVisibility);

    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeObserver?.disconnect();
    this.loader?.destroy();
    this.debug?.destroy();

    this.isRunning = false;
  }
}

// ─── Auto-init ───────────────────────────────────────────────
// Check reduced-motion preference before initializing
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  let controller: ScrollSequenceController | null = null;

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      controller = new ScrollSequenceController();
    });
  } else {
    controller = new ScrollSequenceController();
  }

  // Cleanup on page leave (view transitions)
  document.addEventListener('astro:before-preparation', () => {
    controller?.destroy();
    controller = null;
  });

  // Re-init after view transition navigation
  document.addEventListener('astro:page-load', () => {
    // Only init if the sequence section exists on the new page
    if (document.getElementById('seqScroll') && !controller) {
      controller = new ScrollSequenceController();
    }
  });
}
