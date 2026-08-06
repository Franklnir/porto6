import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const required = [
  'astro.config.ts',
  'src/pages/index.astro',
  'src/layouts/BaseLayout.astro',
  'src/content.config.ts',
  'src/styles/global.css',
  'vercel.json',
  'wrangler.jsonc',
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) throw new Error(`Missing required files: ${missing.join(', ')}`);

const fragments = readdirSync('src/features/portfolio/fragments/sections').filter((name) => name.endsWith('.html'));
if (fragments.length !== 12) throw new Error(`Expected 12 section fragments, found ${fragments.length}`);

const mediaManifest = JSON.parse(readFileSync('public/assets/media/manifest.json', 'utf8'));
if (!Array.isArray(mediaManifest) || mediaManifest.length === 0) throw new Error('No externalized media assets found');

for (const file of fragments) {
  const content = readFileSync(join('src/features/portfolio/fragments/sections', file), 'utf8');
  if (content.includes('data:image/')) throw new Error(`Embedded data URI remains in ${file}`);
  if (content.includes('<script')) throw new Error(`Inline script remains in ${file}`);
}

console.log(`Structure OK: ${fragments.length} sections, ${mediaManifest.length} externalized media assets.`);
