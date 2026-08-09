import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const generatedDir = path.join(root, 'docs', 'knowledge', 'generated');
const canvasFile = path.join(root, 'docs', 'knowledge', 'project-knowledge-graph.canvas');

const heavyPrefixes = [
  'node_modules/',
  'dist/',
  '.astro/',
  '.vercel/',
  '.wrangler/',
  'coverage/',
  'playwright-report/',
  'test-results/',
  'preview-static/',
  'public/sequences/',
  'public/assets/media/',
  'docs/knowledge/generated/',
];

const noteNodes = [
  {
    id: 'agent-index',
    label: 'Agent Index',
    kind: 'knowledge',
    path: 'docs/knowledge/00-agent-index.md',
    tags: ['agent'],
  },
  {
    id: 'project-map',
    label: 'Project Map',
    kind: 'knowledge',
    path: 'docs/knowledge/01-project-map.md',
    tags: ['architecture'],
  },
  {
    id: 'knowledge-graph',
    label: 'Knowledge Graph',
    kind: 'knowledge',
    path: 'docs/knowledge/02-knowledge-graph.md',
    tags: ['architecture'],
  },
  {
    id: 'maintenance',
    label: 'Knowledge Maintenance',
    kind: 'knowledge',
    path: 'docs/knowledge/03-maintenance.md',
    tags: ['agent'],
  },
  {
    id: 'generated-snapshot',
    label: 'Generated Project Snapshot',
    kind: 'generated',
    path: 'docs/knowledge/generated/project-snapshot.md',
    tags: ['agent'],
  },
  {
    id: 'astro-shell',
    label: 'Astro Shell',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/astro-shell.md',
    tags: ['architecture', 'astro'],
  },
  {
    id: 'portfolio-homepage',
    label: 'Portfolio Homepage',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/portfolio-homepage.md',
    tags: ['architecture', 'portfolio'],
  },
  {
    id: 'portfolio-chrome',
    label: 'Portfolio Chrome',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/portfolio-chrome.md',
    tags: ['portfolio'],
  },
  {
    id: 'legacy-fragments',
    label: 'Legacy Fragments',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/legacy-fragments.md',
    tags: ['migration'],
  },
  {
    id: 'motion-system',
    label: 'Motion System',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/motion-system.md',
    tags: ['motion'],
  },
  {
    id: 'scroll-sequence-hero',
    label: 'Scroll Sequence Hero',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/scroll-sequence-hero.md',
    tags: ['motion', 'asset-pipeline'],
  },
  {
    id: 'project-content',
    label: 'Project Content',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/project-content.md',
    tags: ['content'],
  },
  {
    id: 'project-pages',
    label: 'Project Pages',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/project-pages.md',
    tags: ['content', 'astro'],
  },
  {
    id: 'styling-system',
    label: 'Styling System',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/styling-system.md',
    tags: ['styling'],
  },
  {
    id: 'seo-routing',
    label: 'SEO Routing',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/seo-routing.md',
    tags: ['seo'],
  },
  {
    id: 'quality-deployment',
    label: 'Quality And Deployment',
    kind: 'subsystem',
    path: 'docs/knowledge/nodes/quality-deployment.md',
    tags: ['quality', 'deployment'],
  },
];

const edges = [
  ['agent-index', 'generated-snapshot', 'read-first'],
  ['agent-index', 'project-map', 'routes-to'],
  ['agent-index', 'knowledge-graph', 'visualizes'],
  ['agent-index', 'maintenance', 'updates-through'],
  ['project-map', 'astro-shell', 'contains'],
  ['project-map', 'portfolio-homepage', 'contains'],
  ['project-map', 'project-content', 'contains'],
  ['project-map', 'quality-deployment', 'contains'],
  ['portfolio-homepage', 'portfolio-chrome', 'renders'],
  ['portfolio-homepage', 'legacy-fragments', 'renders'],
  ['portfolio-homepage', 'motion-system', 'loads'],
  ['portfolio-homepage', 'scroll-sequence-hero', 'optionally-renders'],
  ['portfolio-homepage', 'project-pages', 'links-to'],
  ['astro-shell', 'seo-routing', 'feeds'],
  ['astro-shell', 'styling-system', 'imports'],
  ['legacy-fragments', 'styling-system', 'depends-on'],
  ['motion-system', 'styling-system', 'coordinates-with'],
  ['scroll-sequence-hero', 'motion-system', 'parallel-motion'],
  ['scroll-sequence-hero', 'styling-system', 'depends-on'],
  ['project-content', 'project-pages', 'feeds'],
  ['project-content', 'seo-routing', 'feeds'],
  ['quality-deployment', 'astro-shell', 'verifies'],
  ['quality-deployment', 'motion-system', 'verifies'],
  ['quality-deployment', 'project-content', 'validates'],
].map(([from, to, relation]) => ({ from, to, relation }));

function toPosix(value) {
  return value.split(path.sep).join('/').replaceAll('\\', '/');
}

function isIgnored(relativePath) {
  const posixPath = toPosix(relativePath);
  return heavyPrefixes.some((prefix) => posixPath.startsWith(prefix));
}

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function readText(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8');
}

async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readText(relativePath));
  } catch {
    return fallback;
  }
}

async function listFiles(relativeDir, predicate = () => true) {
  const results = [];

  async function walk(currentDir) {
    if (isIgnored(currentDir)) return;

    let entries;
    try {
      entries = await readdir(path.join(root, currentDir), { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const child = toPosix(path.join(currentDir, entry.name));
      if (isIgnored(child)) continue;
      if (entry.isDirectory()) {
        await walk(child);
      } else if (predicate(child)) {
        results.push(child);
      }
    }
  }

  await walk(relativeDir);
  return results.sort((a, b) => a.localeCompare(b));
}

function titleCase(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+-/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

function extractHeadings(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^#{1,3}\s+/.test(line))
    .map((line) => line.replace(/^#{1,3}\s+/, '').trim())
    .slice(0, 5);
}

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value.replace(/^["']|["']$/g, '');
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (pair) data[pair[1]] = parseScalar(pair[2]);
  }
  return data;
}

function countByExtension(files) {
  return files.reduce((counts, file) => {
    const ext = path.extname(file) || '[none]';
    counts[ext] = (counts[ext] ?? 0) + 1;
    return counts;
  }, {});
}

function toAsciiText(value) {
  const normalized = String(value ?? '')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u00b7/g, '-')
    .replace(/\u00d7/g, 'x')
    .replace(/\u2192/g, '->')
    .replace(/\u2193/g, 'down')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');
  const ascii = [...normalized].filter((character) => {
    const code = character.codePointAt(0) ?? 0;
    return character === '\t' || character === '\n' || character === '\r' || (code >= 32 && code <= 126);
  });
  return ascii
    .join('')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function tableEscape(value) {
  return toAsciiText(value).replaceAll('|', '\\|').replace(/\r?\n/g, ' ');
}

function makeMarkdownTable(headers, rows) {
  const headerLine = `| ${headers.join(' | ')} |`;
  const divider = `| ${headers.map(() => '---').join(' | ')} |`;
  const rowLines = rows.map((row) => `| ${row.map(tableEscape).join(' | ')} |`);
  return [headerLine, divider, ...rowLines].join('\n');
}

function makeCanvas() {
  const positions = {
    'agent-index': [0, 0],
    'generated-snapshot': [430, -220],
    'project-map': [430, 60],
    'knowledge-graph': [0, 300],
    maintenance: [0, 580],
    'astro-shell': [860, -380],
    'portfolio-homepage': [860, -100],
    'project-content': [860, 180],
    'quality-deployment': [860, 460],
    'seo-routing': [1290, -520],
    'styling-system': [1290, -240],
    'portfolio-chrome': [1290, 40],
    'legacy-fragments': [1290, 320],
    'motion-system': [1720, 40],
    'scroll-sequence-hero': [1720, 320],
    'project-pages': [1290, 600],
  };

  return {
    nodes: noteNodes.map((node) => {
      const [x, y] = positions[node.id] ?? [0, 0];
      return {
        id: node.id,
        type: 'file',
        file: node.path,
        x,
        y,
        width: 360,
        height: 220,
      };
    }),
    edges: edges.map((edge, index) => ({
      id: `edge-${String(index + 1).padStart(2, '0')}`,
      fromNode: edge.from,
      fromSide: 'right',
      toNode: edge.to,
      toSide: 'left',
      label: edge.relation,
    })),
  };
}

async function collectProjects() {
  const files = await listFiles('src/content/projects', (file) => file.endsWith('.md'));
  const projects = [];

  for (const file of files) {
    const markdown = await readText(file);
    const data = parseFrontmatter(markdown);
    projects.push({
      id: path.basename(file, '.md'),
      file,
      title: data.title ?? titleCase(path.basename(file)),
      summary: data.summary ?? '',
      year: data.year ?? '',
      order: data.order ?? 999,
      status: data.status ?? '',
      domain: Array.isArray(data.domain) ? data.domain.join(', ') : data.domain ?? '',
      technologies: Array.isArray(data.technologies)
        ? data.technologies.join(', ')
        : data.technologies ?? '',
      featured: data.featured === true,
    });
  }

  return projects.sort((a, b) => Number(a.order) - Number(b.order) || a.id.localeCompare(b.id));
}

async function collectDocs() {
  const files = await listFiles('docs', (file) => file.endsWith('.md'));
  const docs = [];

  for (const file of files) {
    const markdown = await readText(file);
    docs.push({
      file,
      title: extractHeadings(markdown)[0] ?? titleCase(path.basename(file)),
      headings: extractHeadings(markdown),
    });
  }

  return docs;
}

async function main() {
  await mkdir(generatedDir, { recursive: true });

  const generatedAt = new Date().toISOString();
  const packageJson = await readJson('package.json', {});
  const sourceFiles = await listFiles('src', (file) => /\.(astro|css|html|md|ts)$/.test(file));
  const docs = await collectDocs();
  const projects = await collectProjects();
  const sectionFragments = await listFiles(
    'src/features/portfolio/fragments/sections',
    (file) => file.endsWith('.html'),
  );
  const chromeFragments = await listFiles(
    'src/features/portfolio/fragments/chrome',
    (file) => file.endsWith('.html'),
  );
  const motionModules = await listFiles(
    'src/features/portfolio/client',
    (file) => file.endsWith('.ts'),
  );
  const sequenceManifest = await readJson('public/sequences/hero/sequence-manifest.json');
  const lockfilePresent = await exists('package-lock.json');

  const importantScripts = [
    'dev',
    'build',
    'check',
    'lint',
    'test',
    'test:e2e',
    'quality',
    'verify:structure',
    'verify',
    'verify:full',
    'knowledge:graph',
  ]
    .filter((name) => packageJson.scripts?.[name])
    .map((name) => [name, packageJson.scripts[name]]);

  const snapshot = [
    '---',
    'tags:',
    '  - agent',
    '  - generated',
    'type: snapshot',
    `generated: ${generatedAt}`,
    '---',
    '',
    '# Generated Project Snapshot',
    '',
    `Generated by \`npm run knowledge:graph\` at \`${generatedAt}\`.`,
    '',
    '## Package',
    '',
    makeMarkdownTable(
      ['Field', 'Value'],
      [
        ['name', packageJson.name ?? 'unknown'],
        ['version', packageJson.version ?? 'unknown'],
        ['type', packageJson.type ?? 'unknown'],
        ['node', packageJson.engines?.node ?? 'not specified'],
        ['astro', packageJson.dependencies?.astro ?? 'not listed'],
        ['package-lock', lockfilePresent ? 'present' : 'missing'],
      ],
    ),
    '',
    '## Scripts',
    '',
    makeMarkdownTable(['Script', 'Command'], importantScripts),
    '',
    '## Source Counts',
    '',
    makeMarkdownTable(
      ['Extension', 'Count'],
      Object.entries(countByExtension(sourceFiles)).map(([ext, count]) => [ext, count]),
    ),
    '',
    '## Portfolio Structure',
    '',
    makeMarkdownTable(
      ['Area', 'Count', 'Entries'],
      [
        [
          'section fragments',
          sectionFragments.length,
          sectionFragments.map((file) => path.basename(file, '.html')).join(', '),
        ],
        [
          'chrome fragments',
          chromeFragments.length,
          chromeFragments.map((file) => path.basename(file, '.html')).join(', '),
        ],
        [
          'motion modules',
          motionModules.length,
          motionModules.map((file) => path.basename(file, '.ts')).join(', '),
        ],
      ],
    ),
    '',
    '## Content Projects',
    '',
    makeMarkdownTable(
      ['Order', 'ID', 'Title', 'Year', 'Status', 'Domain', 'Technologies', 'Featured'],
      projects.map((project) => [
        project.order,
        project.id,
        project.title,
        project.year,
        project.status,
        project.domain,
        project.technologies,
        project.featured ? 'yes' : 'no',
      ]),
    ),
    '',
    '## Sequence Manifest',
    '',
    sequenceManifest
      ? makeMarkdownTable(
          ['Field', 'Value'],
          Object.entries(sequenceManifest).map(([key, value]) => [key, value]),
        )
      : 'No sequence manifest found.',
    '',
    '## Existing Docs',
    '',
    makeMarkdownTable(
      ['Doc', 'Headings'],
      docs.map((doc) => [doc.file, doc.headings.join(' > ')]),
    ),
    '',
    '## Agent Routing',
    '',
    '- Use [[00-agent-index|Agent Index]] for task routing.',
    '- Use [[01-project-map|Project Map]] for subsystem boundaries.',
    '- Use [[02-knowledge-graph|Knowledge Graph]] or [[project-knowledge-graph.canvas|Canvas]] for visual traversal.',
    '- Read source files only after choosing the subsystem node.',
    '',
  ].join('\n');

  const graph = {
    generatedAt,
    project: {
      name: packageJson.name ?? null,
      version: packageJson.version ?? null,
      node: packageJson.engines?.node ?? null,
      astro: packageJson.dependencies?.astro ?? null,
    },
    nodes: noteNodes,
    edges,
    facts: {
      sourceFileCount: sourceFiles.length,
      sourceCountsByExtension: countByExtension(sourceFiles),
      sectionFragmentCount: sectionFragments.length,
      chromeFragmentCount: chromeFragments.length,
      motionModuleCount: motionModules.length,
      projectCount: projects.length,
      sequenceManifest,
    },
  };

  await writeFile(
    path.join(generatedDir, 'project-snapshot.md'),
    snapshot,
    'utf8',
  );
  await writeFile(
    path.join(generatedDir, 'knowledge-graph.json'),
    `${JSON.stringify(graph, null, 2)}\n`,
    'utf8',
  );
  await writeFile(
    canvasFile,
    `${JSON.stringify(makeCanvas(), null, 2)}\n`,
    'utf8',
  );

  console.log('Knowledge graph updated:');
  console.log('- docs/knowledge/generated/project-snapshot.md');
  console.log('- docs/knowledge/generated/knowledge-graph.json');
  console.log('- docs/knowledge/project-knowledge-graph.canvas');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
