/* 导出印刷 PDF：216 × 216 mm 出血页，字体内嵌。
   用法：node tools/pdf.mjs   →  dist/book.pdf */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const src = path.join(root, 'dist/print.html');

if (!fs.existsSync(src)) {
  console.error('✗ 先跑 npm run build');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file:///' + src.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });

const out = path.join(dist, 'book.pdf');
await page.pdf({
  path: out,
  width: '216mm',
  height: '216mm',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  tagged: true,
});

await browser.close();

const size = fs.statSync(out).size;
console.log(`✓ dist/book.pdf  ${(size / 1024).toFixed(0)} KB`);
