/* 版式检查：用 Playwright 量每页文字的真实矩形，找重叠、越界、溢出。
   用法：node tools/check-layout.mjs
   失败即退出码 1——大字压小字、文字出血、安全区越界都必须先修。 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARGIN, UNIT, newestMtime } from './layout-constants.mjs';
import { loadSpecs } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const proof = path.join(root, 'dist/proof.html');
if (!fs.existsSync(proof)) {
  console.error('✗ 找不到 dist/proof.html —— 先跑 npm run build');
  process.exit(1);
}

/* 量的是构建产物，所以产物必须是新的：否则量的是上一版页面，测出来的"没问题"是假的 */
const srcNewest = newestMtime(path.join(root, 'src'));
if (srcNewest > fs.statSync(proof).mtimeMs) {
  console.error('✗ src/ 比 dist/proof.html 新 —— 先跑 npm run build（否则量的是旧产物）');
  process.exit(1);
}

const url = 'file:///' + proof.replace(/\\/g, '/');

/* 文字边距：页面边的 6%（规格 §6.1）；与渲染器共用同一份常量 */
const SAFE = MARGIN;
/* 允许的重叠容差（像素）：描边与字形本身有一点点交叠是正常的 */
const TOLERANCE = 3;

const problems = [];
const notes = [];

function overlap(a, b) {
  const x = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
  const y = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
  if (x <= TOLERANCE || y <= TOLERANCE) return 0;
  return x * y;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
await page.goto(url, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

const pages = await loadSpecs();

for (const spec of pages) {
  const data = await page.evaluate((id) => {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (!el) return null;
    const box = el.getBoundingClientRect();
    const texts = [...el.querySelectorAll('.narration, .sound, .prompt, .adult')].map((t) => {
      /* 用 Range 量墨迹范围：居中排版的盒子比文字宽得多，量盒子会误判 */
      const range = document.createRange();
      range.selectNodeContents(t);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
      const x = rects.length ? Math.min(...rects.map((r) => r.x)) - box.x : 0;
      const y = rects.length ? Math.min(...rects.map((r) => r.y)) - box.y : 0;
      const right = rects.length ? Math.max(...rects.map((r) => r.right)) - box.x : 0;
      const bottom = rects.length ? Math.max(...rects.map((r) => r.bottom)) - box.y : 0;
      return {
        cls: t.className,
        text: (t.textContent || '').slice(0, 14),
        x,
        y,
        width: right - x,
        height: bottom - y,
        scrollW: t.scrollWidth,
        scrollH: t.scrollHeight,
        clientW: t.clientWidth,
        clientH: t.clientHeight,
      };
    });
    /* 带 target 的热点：道具的可点位置必须落在热区里。
       道具是按组件自己的几何渲染的，页面里写的锚点不等于它在页面上的位置；
       热区没罩住的话，"点一下那条鱼"点不到鱼——书直接翻页过去。
       同一个 target 可能对应**多个**道具（数一数那页三个苹果），
       所以要按"一组"来比：热区罩住其中任意一个就算数。 */
    const propCenters = {};
    for (const p of el.querySelectorAll('[class*="prop-"]')) {
      const cls = p.getAttribute('class') || '';
      const kind = cls.split(/\s+/).find((c) => c.startsWith('prop-'));
      if (!kind) continue;
      const pr = p.getBoundingClientRect();
      if (!pr.width) continue;
      const key = kind.slice(5);
      (propCenters[key] = propCenters[key] || []).push([
        pr.x + pr.width / 2 - box.x,
        pr.y + pr.height / 2 - box.y,
      ]);
    }
    const hotspots = [...el.querySelectorAll('.hotspot[data-target]')].map((h) => {
      const hr = h.getBoundingClientRect();
      return {
        target: h.dataset.target,
        x: hr.x - box.x,
        y: hr.y - box.y,
        width: hr.width,
        height: hr.height,
      };
    });
    /* 角色的可见框。
       以前只查道具（class 以 prop- 开头），角色（class="char"）没人管：
       p25「摸摸噜啵」的热区就压在角色上方空处——点它的脸点不到，
       那条指令根本执行不到，而且闸门全绿。 */
    let charBox = null;
    const charEl = el.querySelector('.char');
    if (charEl) {
      const cr = charEl.getBoundingClientRect();
      if (cr.width > 0 && cr.height > 0) {
        charBox = { x: cr.x - box.x, y: cr.y - box.y, width: cr.width, height: cr.height };
      }
    }
    return { width: box.width, height: box.height, texts, hotspots, propCenters, charBox };
  }, spec.id);

  if (!data) {
    problems.push(`[${spec.id}] 页面在拼版里找不到`);
    continue;
  }
  const S = SAFE * UNIT;

  /* 1. 文字互相重叠 */
  for (let i = 0; i < data.texts.length; i++) {
    for (let j = i + 1; j < data.texts.length; j++) {
      const a = data.texts[i];
      const b = data.texts[j];
      const area = overlap(a, b);
      if (area > 0) {
        problems.push(
          `[${spec.id}] 文字重叠：${a.cls}「${a.text}」× ${b.cls}「${b.text}」` +
            `（约 ${Math.round(area / (UNIT * UNIT))} 个页面单位见方）`
        );
      }
    }
  }

  /* 2. 文字越出安全区 */
  for (const t of data.texts) {
    const right = t.x + t.width;
    const bottom = t.y + t.height;
    if (t.x < S - 1 || t.y < S - 1 || right > data.width - S + 1 || bottom > data.height - S + 1) {
      problems.push(
        `[${spec.id}] ${t.cls}「${t.text}」越出安全区` +
          `（左 ${Math.round(t.x / UNIT)} 上 ${Math.round(t.y / UNIT)}` +
          ` 右 ${Math.round(right / UNIT)} 下 ${Math.round(bottom / UNIT)}，安全区 ${SAFE}）`
      );
    }
  }

  /* 3. 文字溢出容器（内容被裁） */
  for (const t of data.texts) {
    if (t.scrollH > t.clientH + 1 && t.cls !== 'sound') {
      problems.push(`[${spec.id}] ${t.cls}「${t.text}」文字被裁（内容高 ${Math.round(t.scrollH / UNIT)}，容器高 ${Math.round(t.clientH / UNIT)}）`);
    }
  }

  /* 4. 热点没罩住道具 */
  const propKinds = new Set((spec.props || []).map((p) => p.kind));
  const covers = (h, cx, cy) =>
    cx >= h.x && cx <= h.x + h.width && cy >= h.y && cy <= h.y + h.height;

  for (const h of data.hotspots) {
    const centers = data.propCenters[h.target] || [];
    if (!centers.length) {
      /* 页面数据里声明了这个道具，DOM 里却没有对应的 class：
         道具一改名/漏 class，运行时 fly() 找不到元素就静默不反应
         （声音照响、页照翻），这条检查也会跟着一起失效——所以要报错，不能跳过。 */
      if (propKinds.has(h.target)) {
        problems.push(
          `[${spec.id}] 热点指向的道具「${h.target}」在页面上找不到` +
            `（class prop-${h.target} 缺失？改了道具名要同步改热点 target）`
        );
      }
      continue; /* 目标本来就不是道具（角色的肚子、彩纸背景），不查 */
    }
    if (!centers.some(([cx, cy]) => covers(h, cx, cy))) {
      problems.push(
        `[${spec.id}] 热点没罩住道具「${h.target}」的可点位置` +
          `（道具的可点位置在 ${centers
            .map(([cx, cy]) => `${Math.round(cx / UNIT)},${Math.round(cy / UNIT)}`)
            .join(' / ')}，` +
          `热区是 ${Math.round(h.x / UNIT)},${Math.round(h.y / UNIT)} 起 ${Math.round(h.width / UNIT)} 见方）`
      );
    }
  }

  /* 反过来也要查：每个道具都得有热区罩住它。
     多个同款道具时（数一数的三个苹果），每个都要被某个热区罩住——
     少一个，那个苹果就点不动。 */
  for (const [target, centers] of Object.entries(data.propCenters || {})) {
    const hs = data.hotspots.filter((h) => h.target === target);
    if (!hs.length) continue; /* 没有热区指向它：不查（有些道具本来就不点） */
    for (const [cx, cy] of centers) {
      if (!hs.some((h) => covers(h, cx, cy))) {
        problems.push(
          `[${spec.id}] 道具「${target}」没有热区罩住它` +
            `（可点位置在 ${Math.round(cx / UNIT)},${Math.round(cy / UNIT)}）`
        );
      }
    }
  }

  /* 5. 角色的热区要罩住角色本身（角色中心必须在热区里） */
  const charHs = data.hotspots.filter((h) => h.target === 'char');
  if (charHs.length && data.charBox) {
    const cx = data.charBox.x + data.charBox.width / 2;
    const cy = data.charBox.y + data.charBox.height / 2;
    if (!charHs.some((h) => covers(h, cx, cy))) {
      problems.push(
        `[${spec.id}] 角色的热区没罩住角色` +
          `（角色中心在 ${Math.round(cx / UNIT)},${Math.round(cy / UNIT)}，` +
          `热区是 ${charHs
            .map((h) => `${Math.round(h.x / UNIT)},${Math.round(h.y / UNIT)} 起 ${Math.round(h.width / UNIT)} 见方`)
            .join(' / ')}）`
      );
    }
  }

  /* 6. 角色不能被页面左右边缘切掉。
     角色画在自己那 1000×1000 的画布里，摆在 at + scale 之后，
     画到画布外就会被页面裁出一条直边——看着像角色被门夹了一下。
     上下出血不算错：那三页"喂东西"就是特写，角色大到出画，
     读起来是"凑得很近"（p07/p09/p11）。
     左右出血才算错：一个圆滚滚的身体被竖直切一刀，很明显是摆歪了。 */
  if (data.charBox) {
    const b = data.charBox;
    const over = [];
    if (b.x < -1) over.push(`左边超出 ${Math.round(-b.x / UNIT)}`);
    if (b.x + b.width > data.width + 1) {
      over.push(`右边超出 ${Math.round((b.x + b.width - data.width) / UNIT)}`);
    }
    if (over.length) {
      problems.push(`[${spec.id}] 角色被页面边缘裁掉了（${over.join('、')}）`);
    }
  }
}

await browser.close();

console.log(`检查 ${pages.length} 页的版式……`);
if (problems.length) {
  console.error(`\n✗ ${problems.length} 处版式问题：`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
notes.push('✓ 没有文字重叠、没有越出安全区、没有文字被裁');
notes.push('✓ 每个道具热点都罩得住道具本身');
notes.forEach((n) => console.log(`  ${n}`));
