/**
 * optimize-sequence.mjs
 * ---------------------
 * Converts source animation frames (JPG/PNG) → optimised WebP
 * and generates a sequence-manifest.json for the scroll-driven hero.
 *
 * Usage:
 *   node scripts/optimize-sequence.mjs
 *
 * Reads from: ../IoT_motion_graphics_animation_202608072026-frames/
 * Writes to:  public/sequences/hero/
 */

import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const SOURCE_DIR = join(PROJECT_ROOT, '..', 'IoT_motion_graphics_animation_202608072026-frames');
const OUTPUT_DIR = join(PROJECT_ROOT, 'public', 'sequences', 'hero');

const WEBP_QUALITY = 82;
const WEBP_EFFORT = 4;
const CONCURRENCY = 6; // parallel conversions

async function main() {
  console.log('🎞️  Scroll-sequence frame optimiser');
  console.log(`   Source: ${SOURCE_DIR}`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log();

  // Read source files
  const allFiles = await readdir(SOURCE_DIR);
  const frameFiles = allFiles
    .filter((f) => /^frame-\d{4}\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  if (frameFiles.length === 0) {
    console.error('❌ No frame files found matching pattern frame-NNNN.(jpg|png|webp)');
    process.exit(1);
  }

  console.log(`   Found ${frameFiles.length} source frames`);

  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Get metadata from first frame
  const firstMeta = await sharp(join(SOURCE_DIR, frameFiles[0])).metadata();
  const width = firstMeta.width ?? 1280;
  const height = firstMeta.height ?? 720;
  console.log(`   Source resolution: ${width}×${height}`);
  console.log(`   WebP quality: ${WEBP_QUALITY}, effort: ${WEBP_EFFORT}`);
  console.log();

  // Process in batches
  let completed = 0;
  const total = frameFiles.length;

  async function processFrame(srcFile, index) {
    const frameNum = String(index + 1).padStart(4, '0');
    const outFile = `frame-${frameNum}.webp`;
    const srcPath = join(SOURCE_DIR, srcFile);
    const outPath = join(OUTPUT_DIR, outFile);

    await sharp(srcPath)
      .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
      .toFile(outPath);

    completed++;
    const pct = Math.round((completed / total) * 100);
    process.stdout.write(`\r   Converting: ${completed}/${total} (${pct}%)`);
  }

  // Run in batches for controlled concurrency
  for (let i = 0; i < frameFiles.length; i += CONCURRENCY) {
    const batch = frameFiles.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map((file, j) => processFrame(file, i + j)));
  }

  console.log('\n');

  // Generate manifest
  const manifest = {
    frameCount: frameFiles.length,
    pattern: '/sequences/hero/frame-%04d.webp',
    width,
    height,
    format: 'webp',
    quality: WEBP_QUALITY,
  };

  const manifestPath = join(OUTPUT_DIR, 'sequence-manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(`   ✅ Manifest written: ${manifestPath}`);
  console.log(`   ✅ ${frameFiles.length} frames converted to WebP`);
  console.log(`   📋 Manifest: ${JSON.stringify(manifest)}`);
}

main().catch((err) => {
  console.error('❌ Optimisation failed:', err);
  process.exit(1);
});
