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

const expectedSectionComponents = [
  'AboutSection.astro',
  'CapabilitiesSection.astro',
  'CertificatesSection.astro',
  'ContactSection.astro',
  'ExperienceSection.astro',
  'FaqSection.astro',
  'FeaturedProjectSection.astro',
  'HeroSection.astro',
  'MyToolsSection.astro',
  'ProcessEngineeringSection.astro',
  'ProjectPortfolioSection.astro',
  'TechnologySection.astro',
  'TestimonialSection.astro',
];

const expectedSectionFragments = [
  'about.html',
  'contact.html',
  'experience.html',
  'faq.html',
  'featured-project.html',
  'process-engineering.html',
  'technology.html',
  'testimonial.html',
];

const sectionComponents = readdirSync('src/features/portfolio/components/sections').filter((name) => name.endsWith('.astro'));
const missingComponents = expectedSectionComponents.filter((name) => !sectionComponents.includes(name));
if (missingComponents.length) throw new Error(`Missing section components: ${missingComponents.join(', ')}`);
const unexpectedComponents = sectionComponents.filter((name) => !expectedSectionComponents.includes(name));
if (unexpectedComponents.length) throw new Error(`Unexpected section components: ${unexpectedComponents.join(', ')}`);

const fragments = readdirSync('src/features/portfolio/fragments/sections').filter((name) => name.endsWith('.html'));
const missingFragments = expectedSectionFragments.filter((name) => !fragments.includes(name));
if (missingFragments.length) throw new Error(`Missing section fragments: ${missingFragments.join(', ')}`);
const unexpectedFragments = fragments.filter((name) => !expectedSectionFragments.includes(name));
if (unexpectedFragments.length) throw new Error(`Unexpected section fragments: ${unexpectedFragments.join(', ')}`);

const mediaManifest = JSON.parse(readFileSync('public/assets/media/manifest.json', 'utf8'));
if (!Array.isArray(mediaManifest) || mediaManifest.length === 0) throw new Error('No externalized media assets found');

for (const file of fragments) {
  const content = readFileSync(join('src/features/portfolio/fragments/sections', file), 'utf8');
  if (content.includes('data:image/')) throw new Error(`Embedded data URI remains in ${file}`);
  if (content.includes('<script')) throw new Error(`Inline script remains in ${file}`);
}

const nativeSections = [
  'CapabilitiesSection.astro',
  'CertificatesSection.astro',
  'MyToolsSection.astro',
  'ProjectPortfolioSection.astro',
];
for (const file of nativeSections) {
  const content = readFileSync(`src/features/portfolio/components/sections/${file}`, 'utf8');
  if (content.includes('?raw') || content.includes('RawFragment')) {
    throw new Error(`${file} must remain a native Astro component`);
  }
}

const projectOverlayComponent = readFileSync(
  'src/features/portfolio/components/ProjectViewOverlay.astro',
  'utf8',
);
if (!projectOverlayComponent.includes('projectCatalog')) {
  throw new Error('Project overlay is missing the serialized project catalog');
}

console.log(
  `Structure OK: ${sectionComponents.length} section components, ${fragments.length} raw section fragments, ${mediaManifest.length} externalized media assets.`,
);
