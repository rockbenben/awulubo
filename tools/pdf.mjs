/* 导出印刷 PDF：216 × 216 mm 出血页，字体内嵌。**一册一本。**
   用法：node tools/pdf.mjs                 → dist/<册 id>.pdf（每册一本）
        node tools/pdf.mjs --book=labuluo  → 只印那一册

   以前只有一册，输出写死成 dist/book.pdf；有第二册之后这条命令仍只印一册、
   还把上一册覆盖掉——「每册一本」就成了只写在清单里、没人兑现的一句话。 */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PRINT_PAGES } from './layout-constants.mjs';
import { loadBooks } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
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

/* ——— 成品 PDF 的闸门 ———
   1. 只能有我们自己切的那两套子集。
      子集漏了字，浏览器会拿系统字体顶上（STKaiti/SimSun…）——
      那些字体**没有商用授权**，混进印刷品就是麻烦。
      真实发生过：改完编者说没重切子集，PDF 里就多了一套 STKaiti。
   2. 页数必须是 4 的倍数：骑马钉对折后每帖 4 页，不是 4 的倍数排不出帖，
      双面打印时书脊那一帖会缺一面。
   3. 页数要与页面清单一致、页面尺寸要是 216 mm 方形。
      少了这两条，一次"共用的 CSS 把拼版的 @page 泄漏进印刷版"的事故
      （印刷 PDF 变成 A4 横排、页数翻倍）就只会表现为"PDF 有点大"。 */
function verify(out, id) {
  const raw = fs.readFileSync(out).toString('latin1');

  const embedded = [...new Set([...raw.matchAll(/\/[A-Z]{6}\+([A-Za-z0-9_.-]+)/g)].map((m) => m[1]))];
  const ALLOWED = ['LXGWWenKai-Regular', 'ZCOOLKuaiLe-Regular'];
  const foreign = embedded.filter((f) => !ALLOWED.some((a) => f.includes(a)));
  if (foreign.length) {
    console.error(`✗ [${id}] PDF 里出现了未授权的系统字体：${foreign.join('、')}`);
    console.error('  子集漏字了——先跑 npm run fonts 重切字体子集，再重新构建与导出。');
    process.exit(1);
  }

  const pageCount = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (pageCount % 4 !== 0) {
    console.error(`✗ [${id}] PDF ${pageCount} 页，不是 4 的倍数——骑马钉排不出帖（双面打印会缺一面）`);
    process.exit(1);
  }
  if (pageCount !== PRINT_PAGES) {
    console.error(`✗ [${id}] PDF ${pageCount} 页，页面清单是 ${PRINT_PAGES} 页`);
    process.exit(1);
  }
  const sizeMatch = raw.match(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)/);
  if (sizeMatch) {
    const w = Math.round(parseFloat(sizeMatch[1]));
    const h = Math.round(parseFloat(sizeMatch[2]));
    if (Math.abs(w - 612) > 2 || Math.abs(h - 612) > 2) {
      console.error(`✗ [${id}] PDF 页面 ${w}×${h} pt，应为 612×612 pt（216 mm 方形）`);
      console.error('  常见原因：别的入口的 @page 泄漏进来了（拼版样式要用具名页面隔离）');
      process.exit(1);
    }
  }

  const size = fs.statSync(out).size;
  console.log(
    `✓ dist/${id}.pdf  ${(size / 1024).toFixed(0)} KB  ${pageCount} 页  ` +
      `字体 ${embedded.join('、')}`
  );
}

const browser = await chromium.launch();
for (const book of books) {
  const page = await browser.newPage();
  await page.goto('file:///' + src.replace(/\\/g, '/') + '?book=' + encodeURIComponent(book.id), {
    waitUntil: 'load',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });

  const out = path.join(dist, `${book.id}.pdf`);
  await page.pdf({
    path: out,
    width: '216mm',
    height: '216mm',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    tagged: true,
  });
  await page.close();

  verify(out, book.id);
}
await browser.close();
