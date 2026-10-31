/* A4 双面骑马钉拼版 PDF：家用打印用。
   一张 A4 横放，两个书页并排；双面打印（翻转长边）后沿中缝对折，就是一本。
   页序按骑马钉排：最外一张是封面与封底，往里依次往中间收。

   用法：
     node tools/pdf-booklet.mjs           # A4 横放，成品 148.5 × 148.5 mm
     node tools/pdf-booklet.mjs --a3      # A3 横放，成品 210 × 210 mm（不缩）

   产物：dist/book-a4-duplex.pdf / dist/book-a3-duplex.pdf
*/
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PRINT_PAGES } from './layout-constants.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const src = path.join(dist, 'booklet.html');

if (!fs.existsSync(src)) {
  console.error('✗ 先跑 npm run build');
  process.exit(1);
}

const A3 = process.argv.includes('--a3');
/* 纸张：sheet 是纸，cell 是每半张的宽度，书页按 cell/216 等比缩进去 */
const paper = A3
  ? { w: '420mm', h: '297mm', cell: '210mm', scale: (210 / 216).toFixed(5) }
  : { w: '297mm', h: '210mm', cell: '148.5mm', scale: (148.5 / 216).toFixed(5) };
const out = path.join(dist, A3 ? 'book-a3-duplex.pdf' : 'book-a4-duplex.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file:///' + src.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });
await page.addStyleTag({
  content:
    `@media print{@page booklet{size:${paper.w} ${paper.h};margin:0;}}\n` +
    `body.booklet{--sheet-w:${paper.w};--sheet-h:${paper.h};` +
    `--cell-w:${paper.cell};--booklet-scale:${paper.scale};}`,
});

await page.pdf({
  path: out,
  width: paper.w,
  height: paper.h,
  printBackground: true,
  preferCSSPageSize: false,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();

/* 闸门：只能有我们自己那两套子集；页数要是书页数的一半（每个 A4 面两页） */
const raw = fs.readFileSync(out).toString('latin1');
const embedded = [...new Set([...raw.matchAll(/\/[A-Z]{6}\+([A-Za-z0-9_.-]+)/g)].map((m) => m[1]))];
const ALLOWED = ['LXGWWenKai-Regular', 'ZCOOLKuaiLe-Regular'];
const foreign = embedded.filter((f) => !ALLOWED.some((a) => f.includes(a)));
if (foreign.length) {
  console.error(`✗ 拼版 PDF 里出现了未授权的系统字体：${foreign.join('、')}`);
  console.error('  子集漏字了——先跑 npm run fonts 重切字体子集。');
  process.exit(1);
}
const sheets = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
if (sheets % 2 !== 0) {
  console.error(`✗ 拼版 PDF 有 ${sheets} 个面，不是偶数——双面打印会缺一面`);
  process.exit(1);
}
/* 面数 = 书页数的一半（每个 A4 面两页），页数对不上就是拼版漏了页 */
if (sheets * 2 !== PRINT_PAGES) {
  console.error(`✗ 拼版 PDF 有 ${sheets} 个面（${sheets * 2} 页），书是 ${PRINT_PAGES} 页`);
  process.exit(1);
}

const size = fs.statSync(out).size;
console.log(
  `✓ ${path.basename(out)}  ${(size / 1024).toFixed(0)} KB  ` +
    `${sheets} 个${A3 ? 'A3' : 'A4'}面（双面打印 = ${sheets / 2} 张纸）  字体 ${embedded.join('、')}`
);
console.log(
  `  纸张 ${paper.w} × ${paper.h}，每面两页，成品 ${paper.cell} × ${paper.cell}`
);
console.log('  打印：双面 + 翻转长边 → 沿中缝对折 → 中间订一下');
