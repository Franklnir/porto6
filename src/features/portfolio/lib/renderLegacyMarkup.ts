import { siteConfig } from '@/config/site';

const replacements: Readonly<Record<string, string>> = {
  '[CANONICAL_URL]': siteConfig.url,
  '[EMAIL]': siteConfig.email,
  '[CV_URL]': siteConfig.links.cv,
  '[GITHUB_URL]': siteConfig.links.github,
  '[LINKEDIN_URL]': siteConfig.links.linkedin,
};

export function renderLegacyMarkup(markup: string): string {
  return Object.entries(replacements).reduce(
    (result, [token, value]) => result.replaceAll(token, value),
    markup,
  );
}
