/* 逐页截图：产出 1440 × 1440（屏幕版）/ 1224 × 1224（印刷版）的 PNG。
   用法：
     node tools/shots.mjs            # 屏幕版（dist/proof.html）
     node tools/shots.mjs --print    # 印刷版（dist/print.html，216mm 版式）

   以前这一步靠本机的 html-shot 技能（路径写死在脚本里），
   于是：换台机器跑不了、CI 里跑不了，
   而"每页都得真的画出来"这道闸门就只能在某一台机器上守着。
   现在直接用 Playwright 截图——同一个依赖（Chromium）已经在项目里了，
   谁 clone 下来都能跑。
*/
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSpecs } from './load-specs.mjs';
import { newestMtime } from './layout-constants.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pages = await loadSpecs();

const isPrint = process.argv.includes('--print');
const input = path.join(dist, isPrint ? 'print.html' : 'proof.html');
const outDir = path.join(dist, isPrint ? 'print-shots' : 'shots');

if (!fs.existsSync(input)) {
  console.error('✗ 先跑 npm run build');
  process.exit(1);
}

/* 产物必须比源文件新：否则截的是上一版的图，
   而 check:shots 只看"每页有没有内容"，旧图照样是绿的 —— 等于拿旧图当新图交付。 */
const srcNewest = newestMtime(path.join(root, 'src'));
if (srcNewest > fs.statSync(input).mtimeMs) {
  console.error('✗ src/ 比 ' + path.basename(input) + ' 新 —— 先跑 npm run build（否则截的是旧图）');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

/* 清掉上一版的残留截图：删过页之后旧图还躺在目录里，
   联系表和闸门都会把它算进去——"多出来的一张"看着像证据，其实是陈旧产物。 */
/* 每一册一个子目录：页码在册内独立（每册都有 p01），
   文件名不带上册就会互相覆盖——第二册的 p01 会盖掉第一册的 p01。 */
const keep = new Set(pages.map((p) => path.join(p.book, `${p.id}.png`)));
const walk = (dir, base = '') => {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? path.join(base, e.name) : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else out.push(rel);
  }
  return out;
};
for (const file of walk(outDir)) {
  if (!file.endsWith('.png')) continue;
  if (keep.has(file)) continue;
  fs.unlinkSync(path.join(outDir, file));
  console.log(`- 清理过期截图 ${file}`);
}

/* 屏幕版 2 倍（720 → 1440），印刷版 1.5 倍（216mm ≈ 816px → 1224） */
const dpr = isPrint ? 1.5 : 2;
const url = 'file:///' + input.replace(/\\/g, '/');

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1600 },
  deviceScaleFactor: dpr,
});
await page.goto(url, { waitUntil: 'load' });
/* 字没加载完就截，截到的是回退字体——联系表与闸门都会跟着失真 */
await page.evaluate(() => document.fonts.ready);

let currentBook = '';
for (const p of pages) {
  if (isPrint && p.book !== currentBook) {
    await page.goto(url + '?book=' + encodeURIComponent(p.book), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    currentBook = p.book;
  }
  const dir = path.join(outDir, p.book);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `${p.id}.png`);
  await page.locator(`[data-id='${p.id}'][data-book='${p.book}']`).screenshot({ path: out });
  console.log(`✓ ${path.relative(root, out)}`);
}

await browser.close();

console.log(`\n共 ${pages.length} 张，输出在 ${path.relative(root, outDir)}/`);

/* 页面清单：检查脚本靠它知道"该有多少张、哪几页的背景必须满版"。
   不写死页数——页数变了，这里跟着变。 */
const manifest = pages.map((p) => ({
  id: p.id,
  book: p.book,
  wash: Boolean(p.bg && p.bg.wash),
  kind: (p.bg && p.bg.kind) || 'none',
}));
fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8'
);
