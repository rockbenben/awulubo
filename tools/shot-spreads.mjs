/* 临时工具：把几跨并排拍下来，看「摊开的两页」是不是一幅画。
   用法：node tools/shot-spreads.mjs            */
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'dist', 'index.html');
const pairs = [
  ['awulubo', 'p06'],
  ['awulubo', 'p42'],
  ['labuluo', 'p12'],
  ['labuluo', 'p14'],
  ['yiqiwan', 'p46'],
  ['yiqiwan', 'p48'],
  ['shengqi', 'p10'],
  ['shengqi', 'p24'],
  ['wuzilai', 'p46'],
  ['wuzilai', 'p48'],
];

const browser = await chromium.launch();
for (const [book, id] of pairs) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
  await page.goto('file:///' + input.replace(/\\/g, '/') + `?book=${book}#${id}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.addStyleTag({
    content: '.chrome-btn, .page-btn, .shell-toggle, .picker { display: none !important; }',
  });
  const out = path.join(root, 'dist', `spread-${book}-${id}.png`);
  await page.screenshot({ path: out });
  await page.close();
  console.log('✓ ' + path.relative(root, out));
}
await browser.close();
