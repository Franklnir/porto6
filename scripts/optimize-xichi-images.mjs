import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const targetDirs = [
  'c:/Users/frank/Downloads/irsyad-portfolio-astro-production/xichi-brand-website/public/assets',
  'c:/Users/frank/Downloads/irsyad-portfolio-astro-production/irsyad-portfolio-astro/xichi-brand-website/public/assets',
];

const subfolders = ['culture', 'products', 'showcase'];

async function processDirectory(baseDir) {
  let totalOrigBytes = 0;
  let totalOptBytes = 0;
  let count = 0;

  for (const sub of subfolders) {
    const dirPath = path.join(baseDir, sub);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

      const inputPath = path.join(dirPath, file);
      const outputFilename = path.basename(file, ext) + '.webp';
      const outputPath = path.join(dirPath, outputFilename);

      const statOrig = fs.statSync(inputPath);
      totalOrigBytes += statOrig.size;

      // We maintain up to 1400px width/height, Lanczos3 filter, Quality 88, effort 6, smartSubsample: true
      // This preserves razor-sharp edges and high retina clarity without blurriness (tidak burik).
      const pipeline = sharp(inputPath)
        .resize(1400, 1400, {
          fit: 'inside',
          withoutEnlargement: true,
          kernel: sharp.kernel.lanczos3,
        })
        .webp({
          quality: 88,
          effort: 6,
          smartSubsample: true,
        });

      await pipeline.toFile(outputPath);
      const statOpt = fs.statSync(outputPath);
      totalOptBytes += statOpt.size;
      count++;

      const savingPct = Math.round((1 - statOpt.size / statOrig.size) * 100);
      console.log(
        `[${sub}] ${file} (${(statOrig.size / 1024).toFixed(1)} KB) -> ${outputFilename} (${(statOpt.size / 1024).toFixed(1)} KB) [${savingPct}% saved]`
      );
    }
  }

  return { count, totalOrigBytes, totalOptBytes };
}

async function run() {
  console.log('--- Starting Pro Image Optimization (High-Fidelity WebP 1400px Lanczos3 Q88) ---');
  for (const dir of targetDirs) {
    console.log(`\nProcessing target: ${dir}`);
    const res = await processDirectory(dir);
    console.log(`\nProcessed ${res.count} images in ${dir}`);
    console.log(`Original total: ${(res.totalOrigBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized total: ${(res.totalOptBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total saved: ${( (1 - res.totalOptBytes / res.totalOrigBytes) * 100 ).toFixed(1)}% bandwidth reduction!`);
  }
}

run().catch((err) => {
  console.error('Optimization error:', err);
  process.exit(1);
});
