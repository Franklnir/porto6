import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'preview-static');
const port = Number(process.env.PORT ?? process.argv[3] ?? 4321);
const host = process.env.HOST ?? '127.0.0.1';
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'], ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'], ['.avif', 'image/avif'], ['.ico', 'image/x-icon'],
  ['.txt', 'text/plain; charset=utf-8'], ['.pdf', 'application/pdf'],
]);

const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', `http://${host}`).pathname);
  const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
  let filePath = join(root, safePath === '/' ? 'index.html' : safePath);
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html');
  if (!existsSync(filePath) && !extname(filePath)) filePath = join(root, 'index.html');
  if (!existsSync(filePath) || !filePath.startsWith(root)) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('404 — File not found');
    return;
  }
  response.writeHead(200, {
    'content-type': mime.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`\nPortfolio preview: http://${host}:${port}`);
  console.log(`Serving: ${root}`);
  console.log('Press Ctrl+C to stop.\n');
});
