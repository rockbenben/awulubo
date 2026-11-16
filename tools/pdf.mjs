/* 导出印刷 PDF：216 × 216 mm 出血页，字体内嵌。**一册一本。**
   用法：node tools/pdf.mjs                 → dist-print/<册 id>.pdf（每册一本）
        node tools/pdf.mjs --book=labuluo  → 只印那一册

   以前只有一册，输出写死成 dist/book.pdf；有第二册之后这条命令仍只印一册、
   还把上一册覆盖掉——「每册一本」就成了只写在清单里、没人兑现的一句话。 */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { saveVerifiedPdf } from './pdf-check.mjs';
import { loadBooks } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const printDir = path.join(root, 'dist-print');
const src = path.join(root, 'dist/print.html');

/* 印哪一册：一册 = 一本书 = 64 页。不给就按册清单逐册印。 */
const bookArg = (process.argv.find((a) => a.startsWith('--book=')) || '').split('=')[1] || '';

if (!fs.existsSync(src)) {
  console.error('✗ 先跑 npm run build');
  process.exit(1);
}

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

      const out = path.join(printDir, `${book.id}.pdf`);
      const bytes = await page.pdf({
        width: '216mm',
        height: '216mm',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        tagged: true,
      });
      const result = saveVerifiedPdf(out, bytes, {
        pages: book.pages.length, widthMm: 216, heightMm: 216,
        title: book.meta.title + '｜印刷版',
      });
      console.log(
        `✓ dist-print/${book.id}.pdf  ${(bytes.length / 1024).toFixed(0)} KB  ${result.pages} 页  ` +
        `字体 ${result.fonts.join('、')}`
      );
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
