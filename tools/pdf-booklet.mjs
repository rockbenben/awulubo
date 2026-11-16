/* A4 双面骑马钉拼版 PDF：家用打印用。
   一张 A4 横放，两个书页并排；双面打印（翻转短边）后沿中缝对折，就是一本。
   页序按骑马钉排：最外一张是封面与封底，往里依次往中间收。**一册一本。**

   用法：
     node tools/pdf-booklet.mjs           # A4 横放，成品 148.5 × 148.5 mm
     node tools/pdf-booklet.mjs --a3      # A3 横放，成品 210 × 210 mm（不缩）
     node tools/pdf-booklet.mjs --book=labuluo   # 只拼那一册

   产物：dist-print/<册 id>-a4-duplex.pdf / dist-print/<册 id>-a3-duplex.pdf
*/
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { saveVerifiedPdf } from './pdf-check.mjs';
import { loadBooks } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const printDir = path.join(root, 'dist-print');
const src = path.join(root, 'dist/booklet.html');

if (!fs.existsSync(src)) {
  console.error('✗ 先跑 npm run build');
  process.exit(1);
}

const A3 = process.argv.includes('--a3');
/* 拼哪一册：一册 = 一本书 = 64 页，骑马钉的帖序在册内各算各的。
   不给就按册清单逐册拼——拼版错一册，印出来整本都是错的。 */
const bookArg = (process.argv.find((a) => a.startsWith('--book=')) || '').split('=')[1] || '';
/* 纸张：sheet 是纸，cell 是每半张的宽度，书页按 cell/216 等比缩进去 */
const paper = A3
  ? { widthMm: 420, heightMm: 297, w: '420mm', h: '297mm', cell: '210mm', scale: (210 / 216).toFixed(5) }
  : { widthMm: 297, heightMm: 210, w: '297mm', h: '210mm', cell: '148.5mm', scale: (148.5 / 216).toFixed(5) };

const all = await loadBooks();
const books = bookArg ? all.filter((b) => b.id === bookArg) : all;
if (!books.length) {
  console.error(`✗ 没有这一册：${bookArg}（清单里有 ${all.map((b) => b.id).join('、')}）`);
  process.exit(1);
}

fs.mkdirSync(printDir, { recursive: true });
const browser = await chromium.launch();
try {
  for (const book of books) {
    const page = await browser.newPage();
    try {
      await page.goto('file:///' + src.replace(/\\/g, '/') + '?book=' + encodeURIComponent(book.id), {
        waitUntil: 'load',
      });
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: 'print' });
      const title = book.meta.title + '｜' + (A3 ? 'A3' : 'A4') + ' 双面骑马钉拼版';
      await page.evaluate(value => { document.title = value; }, title);
      await page.addStyleTag({
        content:
          `@media print{@page booklet{size:${paper.w} ${paper.h};margin:0;}}\n` +
          `body.booklet{--sheet-w:${paper.w};--sheet-h:${paper.h};` +
          `--cell-w:${paper.cell};--booklet-scale:${paper.scale};}`,
      });

      const out = path.join(printDir, `${book.id}-${A3 ? 'a3' : 'a4'}-duplex.pdf`);
      const bytes = await page.pdf({
        width: paper.w,
        height: paper.h,
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });
      const result = saveVerifiedPdf(out, bytes, {
        pages: book.pages.length / 2, widthMm: paper.widthMm, heightMm: paper.heightMm, title,
      });
      console.log(
        `✓ ${path.basename(out)}  ${(bytes.length / 1024).toFixed(0)} KB  ` +
        `${result.pages} 个${A3 ? 'A3' : 'A4'}面（双面打印 = ${result.pages / 2} 张纸）  ` +
        `字体 ${result.fonts.join('、')}`
      );
      console.log(`  纸张 ${paper.w} × ${paper.h}，每面两页，成品 ${paper.cell} × ${paper.cell}`);
      console.log('  打印：双面 + 翻转短边 → 沿中缝对折 → 中间订一下');
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
