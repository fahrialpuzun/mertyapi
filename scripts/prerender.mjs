import { readFile, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { render } from '../dist-ssr/entry-server.js';

const pages = ['/', '/mutfak-dolabi/', '/gardirop/', '/banyo-dolabi/'];
for (const pathname of pages) {
  const file = resolve('dist', `.${pathname}`, 'index.html');
  const template = await readFile(file, 'utf8');
  const root = /<div id="root">[\s\S]*?<\/div>/;
  if (!root.test(template)) throw new Error(`Missing root in ${pathname}`);
  const content = render(pathname);
  if (!content.includes('<h1') || !content.includes('href="/teklif/')) {
    throw new Error(`Missing page content in ${pathname}`);
  }
  // A callback preserves literal dollar sequences in user-facing content.
  const html = template.replace(root, () => `<div id="root" data-prerendered="true">${content}</div>`);
  await writeFile(file, html);
  console.log(`Prerendered ${pathname}`);
}
await rm('dist-ssr', { recursive: true, force: true });
