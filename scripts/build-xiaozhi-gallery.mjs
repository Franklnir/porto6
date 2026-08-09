import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageExtensions = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp']);
const galleries = [
  { slug: 'xiaozhi', title: 'Xiaozhi AI' },
  { slug: 'platform-operasi-akademik', title: 'Platform Operasi Akademik' },
  { slug: 'monitoring-energi', title: 'Monitoring Listrik' }
];

for (const { slug, title } of galleries) {
  const galleryDir = path.join(root, 'public', 'assets', 'projects', slug);
  const manifestPath = path.join(galleryDir, 'manifest.json');
  await mkdir(galleryDir, { recursive: true });

  const entries = await readdir(galleryDir, { withFileTypes: true });
  const items = entries
    .filter(entry => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map(entry => ({
      src: `/assets/projects/${slug}/${entry.name}`,
      alt: `${title} - ${path.basename(entry.name, path.extname(entry.name)).replaceAll(/[-_]+/g, ' ')}`
    }))
    .sort((a, b) => a.src.localeCompare(b.src, 'en'));

  await writeFile(manifestPath, `${JSON.stringify({ items }, null, 2)}\n`);
  console.log(`${title} gallery: ${items.length} image(s) indexed.`);
}
