/* 重截指定页（调试用）：node tools/shot-one.mjs awulubo/p11
   与 tools/shots.mjs 同一套截图方式（Playwright），只是截一页。 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [book, id] = (process.argv[2] || '').split('/');
if (!id) {
  console.error('用法：node tools/shot-one.mjs awulubo/p11');
  process.exit(1);
}

const input = path.join(root, 'dist', 'proof.html');
const out = path.join(root, 'dist', 'shots', book, `${id}.png`);

fs.mkdirSync(path.dirname(out), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1600 }, deviceScaleFactor: 2 });
await page.goto('file:///' + input.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.locator(`[data-book='${book}'][data-id='${id}']`).screenshot({ path: out });
await browser.close();
console.log(`✓ ${path.relative(root, out)}`);
