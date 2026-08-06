import { existsSync, readFileSync } from 'node:fs';

const required = [
  'package.json', 'astro.config.ts', 'tsconfig.json', 'src/pages/index.astro',
  'src/content.config.ts', 'preview-static/index.html', 'scripts/serve-preview.mjs',
];
let failed = false;
const node = process.versions.node.split('.').map(Number);
if (node[0] < 22 || (node[0] === 22 && node[1] < 12)) {
  console.error(`✗ Node ${process.versions.node}; Astro 7 requires Node 22.12+.`);
  failed = true;
} else console.log(`✓ Node ${process.versions.node}`);
for (const file of required) {
  if (existsSync(file)) console.log(`✓ ${file}`);
  else { console.error(`✗ Missing ${file}`); failed = true; }
}
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
console.log(`✓ Project: ${packageJson.name}@${packageJson.version}`);
console.log(`✓ Astro: ${packageJson.dependencies.astro}`);
if (failed) process.exit(1);
console.log('\nEnvironment looks ready. Run: npm install && npm run dev');
