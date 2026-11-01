/* README 门面图：首屏横幅 + 图库的**素材**（PNG，落在 dist/readme/）。
   拼版与转 webp 在 tools/readme-compose.py（Pillow）。
   用法：node tools/readme-shots.mjs   （先 npm run build）

   为什么做成脚本而不是手截一次：页面一改，图就过期——
   README 的图是仓库里最先过期的东西，而过期的图比没有图更坏。
   手截一次，只能保证那一次是对的。 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const input = path.join(dist, 'index.html');
const outDir = path.join(dist, 'readme');

if (!fs.existsSync(input)) {
  console.error('✗ 先跑 npm run build');
  process.exit(1);
}

/* 产物比源码旧 → 停下。
   少了这一步，脚本会拿**上一次的构建**截图，而且截得出来、看不出来：
   画面几乎一模一样（差的是边缘的抗锯齿，肉眼看不出来），
   可它拍的根本不是现在的页面。
   「门面图是从当前构建生成的」这句话，得由脚本自己保证，
   不能靠人记得先跑构建。 */
function newestMtime(dir) {
  let newest = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      newest = Math.max(newest, newestMtime(full));
    } else if (entry.isFile()) {
      newest = Math.max(newest, fs.statSync(full).mtimeMs);
    }
  }
  return newest;
}

const sources = [
  'src',
  'vite.config.js',
  'package.json',
  /* 四个入口的 HTML 壳子也是构建输入（vite.config.js 的 rollupOptions.input）：
     改了外壳（按钮、标题、meta）不重建，闸门也得响。 */
  'index.html',
  'print.html',
  'proof.html',
  'booklet.html',
];
let sourceTime = 0;
for (const s of sources) {
  const full = path.join(root, s);
  if (!fs.existsSync(full)) continue;
  /* 目录要看**里面最新那个文件**：目录自己的时间戳只在增删文件时才变，
     改文件内容不会动它——拿目录时间戳去比，等于这道闸门永远是开的。 */
  const t = fs.statSync(full).isDirectory() ? newestMtime(full) : fs.statSync(full).mtimeMs;
  sourceTime = Math.max(sourceTime, t);
}
if (sourceTime > fs.statSync(input).mtimeMs) {
  console.error('✗ dist/index.html 比源码旧——先跑 npm run build');
  console.error('  （不然截出来的是上一次构建的页面，图一提交就是过期的）');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

/* 首屏横幅的四格：两册各两页。门面得让人知道这是**两本书**——
   只摊第一册，读者的第一反应是「怎么只有一个绘本」。
   挑页：每册的高潮那页（p21 彩纸喷发、p49 变红），封面也各留一个——
   门面要同时说清「有两册」和「每一册都有戏」。 */
const HERO = [
  { name: 'hero-1', book: 'awulubo', id: 'p01' },
  { name: 'hero-2', book: 'awulubo', id: 'p21' },
  { name: 'hero-3', book: 'labuluo', id: 'p01' },
  { name: 'hero-4', book: 'labuluo', id: 'p49' },
];

/* 图库：四个互不重复的玩法 */
const GALLERY = [
  { name: 'find', book: 'awulubo', id: 'p30' },
  /* 数一数：点一个苹果，旁边才冒出「1」——静态截图看不出这一页在干什么，
     所以这张图是真的点完了才截的：三个苹果各点一下，
     数满三个就翻到下一页「数出来啦！三个！」，1、2、3 都摆在那儿。 */
  {
    name: 'count',
    book: 'awulubo',
    id: 'p38',
    shot: 'p39',
    clicks: ['.hotspot[data-index="1"]', '.hotspot[data-index="2"]', '.hotspot[data-index="3"]'],
  },
  { name: 'seen', book: 'awulubo', id: 'p45' },
  { name: 'gift', book: 'awulubo', id: 'p47' },
];

/* 摊开的两页：网页版真正的样子（宽屏才摊开，窄屏是一页一屏）。
   这张是整屏截图，带着页码按钮和静音按钮——它证明这是个能用的东西，
   不是一张画。 */
const SPREAD = { name: 'spread', book: 'awulubo', id: 'p46', viewport: { width: 1280, height: 800 } };

const browser = await chromium.launch();

/* 窄屏（900 < 1100 的断点）：一页一屏，截出来就是干净的一页 */
async function shootPage(spec) {
  const page = await browser.newPage({
    viewport: { width: 900, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto('file:///' + input.replace(/\\/g, '/') + `?book=${spec.book}#${spec.id}`, {
    waitUntil: 'load',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  /* 单页图里不留界面上的按钮：页码、选册（☰）、静音三个小圆钮悬浮在页面右上角，
     拼成一张图以后像贴纸。摊开的那张要留着——
     它证明这是个能用的东西，不是一张画。 */
  await page.addStyleTag({ content: '.chrome-btn, .page-btn, .shell-toggle, .picker { display: none !important; }' });
  for (const sel of spec.clicks || []) {
    await page.click(`[data-id='${spec.id}'][data-book='${spec.book}'] ${sel}`);
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(300);
  const out = path.join(outDir, `${spec.name}.png`);
  /* 截哪一页：默认就是点开的那页；点了会翻页的互动就截翻过去的那页 */
  const shotId = spec.shot || spec.id;
  await page.locator(`[data-id='${shotId}'][data-book='${spec.book}']`).screenshot({ path: out });
  await page.close();
  console.log(`✓ ${path.relative(root, out)}`);
}

for (const spec of [...HERO, ...GALLERY]) {
  await shootPage(spec);
}

/* 摊开的两页：宽屏（≥1100）才摊开成跨页 */
{
  const spec = SPREAD;
  const page = await browser.newPage({ viewport: spec.viewport, deviceScaleFactor: 1 });
  await page.goto('file:///' + input.replace(/\\/g, '/') + `?book=${spec.book}#${spec.id}`, {
    waitUntil: 'load',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const out = path.join(outDir, `${spec.name}.png`);
  await page.screenshot({ path: out });
  await page.close();
  console.log(`✓ ${path.relative(root, out)}`);
}

await browser.close();
console.log(`\n素材在 ${path.relative(root, outDir)}/，接着跑 npm run shots:readme 的拼版那一步`);
