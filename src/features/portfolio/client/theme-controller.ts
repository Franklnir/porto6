type Theme = 'light' | 'dark' | 'flowy' | 'neo' | 'brand';

const STORAGE_KEY = 'irsyad-theme';
const root = document.documentElement;
const themeColor = document.querySelector<HTMLMetaElement>('#themeColor');
const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const headerPicker = document.querySelector<HTMLElement>('.header-theme-picker');

const themeNames: Record<Theme, string> = {
  light: 'Utama',
  dark: 'Gelap',
  flowy: 'Flowy',
  neo: 'Neo Brutal',
  brand: 'Brand Ink',
};

const themeColors: Record<Theme, string> = {
  light: '#f4f4ef',
  dark: '#10110f',
  flowy: '#f7f0d7',
  neo: '#f7f7f5',
  brand: '#f5ecdc',
};

const isTheme = (value: string | undefined): value is Theme => (
  value === 'light' || value === 'dark' || value === 'flowy' || value === 'neo' || value === 'brand'
);

const closePicker = (): void => {
  headerPicker?.removeAttribute('data-open');
  themeToggle?.setAttribute('aria-expanded', 'false');
};

const updateControls = (theme: Theme): void => {
  themeToggle?.setAttribute('data-current-theme', theme);
  themeToggle?.setAttribute('aria-label', `Tema aktif: ${themeNames[theme]}. Pilih tema`);
  themeToggle?.setAttribute('title', `Tema aktif: ${themeNames[theme]}`);

  document.querySelectorAll<HTMLButtonElement>('[data-theme-option]').forEach((option) => {
    const isActive = option.dataset.themeOption === theme;
    option.setAttribute('aria-checked', String(isActive));
  });
};

const applyTheme = (theme: Theme, persist = false): void => {
  root.dataset.theme = theme;
  themeColor?.setAttribute('content', themeColors[theme]);
  updateControls(theme);

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // The selected theme remains active when browser storage is unavailable.
    }
  }
};

const currentTheme = root.dataset.theme;
const initialTheme: Theme = isTheme(currentTheme) ? currentTheme : 'brand';
applyTheme(initialTheme);

themeToggle?.addEventListener('click', () => {
  const willOpen = !headerPicker?.hasAttribute('data-open');
  headerPicker?.toggleAttribute('data-open', willOpen);
  themeToggle.setAttribute('aria-expanded', String(willOpen));
});

document.querySelectorAll<HTMLButtonElement>('[data-theme-option]').forEach((option) => {
  option.addEventListener('click', () => {
    const selectedTheme = option.dataset.themeOption;
    if (!isTheme(selectedTheme)) return;

    applyTheme(selectedTheme, true);
    closePicker();
  });
});

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof Node && !document.querySelector('.theme-control')?.contains(target)) {
    closePicker();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closePicker();
  themeToggle?.focus();
});
