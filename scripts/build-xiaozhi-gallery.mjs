import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageExtensions = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp']);
const galleries = [
  { slug: 'xiaozhi', title: 'Xiaozhi AI' },
  { slug: 'platform-operasi-akademik', title: 'Platform Operasi Akademik' },
  { slug: 'monitoring-energi', title: 'Monitoring Listrik' },
];

for (const { slug, title } of galleries) {
  const galleryDir = path.join(root, 'public', 'assets', 'projects', slug);
  const manifestPath = path.join(galleryDir, 'manifest.json');
  await mkdir(galleryDir, { recursive: true });

  const entries = await readdir(galleryDir, { withFileTypes: true });
  const imageEntries = entries.filter(
    (entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()),
  );
  const items = (
    await Promise.all(
      imageEntries.map(async (entry) => {
        const metadata = await sharp(path.join(galleryDir, entry.name)).metadata();
        if (!metadata.width || !metadata.height) {
          throw new Error(`Unable to read dimensions for ${slug}/${entry.name}`);
        }

        return {
          src: `/assets/projects/${slug}/${entry.name}`,
          alt: `${title} - ${path.basename(entry.name, path.extname(entry.name)).replaceAll(/[-_]+/g, ' ')}`,
          width: metadata.width,
          height: metadata.height,
        };
      }),
    )
  ).sort((a, b) => a.src.localeCompare(b.src, 'en'));

  await writeFile(manifestPath, `${JSON.stringify({ items }, null, 2)}\n`);
  console.log(`${title} gallery: ${items.length} image(s) indexed.`);
}
