import cover1 from '@/assets/images/projects/platform-operasi-akademik.jpg';
import cover2 from '@/assets/images/projects/cog-ai.jpg';
import cover3 from '@/assets/images/projects/monitoring-energi.jpg';
import cover4 from '@/assets/images/projects/layanan-perpustakaan.png';

import type { ImageMetadata } from 'astro';

const projectCovers: Readonly<Record<string, ImageMetadata>> = {
  'platform-operasi-akademik': cover1,
  'cog-ai': cover2,
  'monitoring-energi': cover3,
  'layanan-perpustakaan': cover4,
};

export function getProjectCover(id: string): ImageMetadata | undefined {
  return projectCovers[id];
}
