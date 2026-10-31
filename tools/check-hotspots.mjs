/* 热区闸门：热区必须罩住它指的那个东西的**墨迹**。
   用法：node tools/check-hotspots.mjs

   为什么不用元素外框：外框里大半是空白（星星的四个角、圆弧之间的空隙），
   按外框判会放过"热区罩着一大片空白、真正的墨迹在框外"的情况。
   墨迹怎么量：把热区的指针事件关掉，在目标的框里逐点问
   "这个点上有没有目标的墨"（elementFromPoint）——
   落在墨上的点就是画出来的地方，SVG 的描边也算（描边点得到就算点得到）。

   以前 check-layout.mjs 只量"目标的中心在不在热区里"，
   边缘留出一大片死区它看不见：
   p42 那个手绘圆圈有 42% 的墨在热区外——那是全书最后一页唯一的按钮。 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSpecs } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'dist', 'index.html');
if (!fs.existsSync(file)) {
  console.error('✗ 找不到 dist/index.html —— 先跑 npm run build');
  process.exit(1);
}

const specs = await loadSpecs();
const problems = [];

const browser = await chromium.launch();
/* 视口要装得下整页（书页 --page = min(100vw, 100dvh)），
   不然 elementFromPoint 问不到屏幕外的点 */
const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
await page.goto('file:///' + file.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

for (const spec of specs) {
  if (spec.screen === false) continue;
  await page.evaluate((id) => window.Book.goToId(id), spec.id);
  await page.waitForTimeout(80);

  const rows = await page.evaluate((id) => {
    const p = document.querySelector(`[data-id="${id}"]`);
    const pr = p.getBoundingClientRect();
    const u = pr.width / 1000;
    /* 采样时把热区让开：不然每个点最上层都是热区按钮，问不出墨在哪 */
    const style = document.createElement('style');
    style.textContent = '.hotspot{pointer-events:none !important}';
    p.appendChild(style);

    const GRID = 40;
    const out = [];
    for (const h of p.querySelectorAll('.hotspot')) {
      const target = h.dataset.target || '';
      let sel = null;
      if (target === 'char') sel = '.char';
      else if (!['belly', 'confetti', 'sound'].includes(target)) sel = `.prop-${target}`;
      if (!sel) continue;

      const hb = h.getBoundingClientRect();
      const hcx = hb.x + hb.width / 2;
      const hcy = hb.y + hb.height / 2;

      /* 同一个 target 可能有好几个（数一数那页三个苹果）：
         取离热区中心最近的那个——热区本来就是为某一个道具摆的 */
      let ob = null;
      let bestD = Infinity;
      for (const cand of p.querySelectorAll(sel)) {
        const cb = cand.getBoundingClientRect();
        if (!cb.width) continue;
        const d = Math.hypot(cb.x + cb.width / 2 - hcx, cb.y + cb.height / 2 - hcy);
        if (d < bestD) {
          bestD = d;
          ob = cand;
        }
      }
      if (!ob) continue;
      const b = ob.getBoundingClientRect();
      if (!b.width) continue;

      let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity, ink = 0, inHot = 0;
      for (let gy = 0; gy < GRID; gy++) {
        for (let gx = 0; gx < GRID; gx++) {
          const x = b.x + ((gx + 0.5) / GRID) * b.width;
          const y = b.y + ((gy + 0.5) / GRID) * b.height;
          const top = document.elementFromPoint(x, y);
          if (!top || !top.closest) continue;
          const onTarget = target === 'char' ? !!top.closest('.char') : !!top.closest(`.prop-${target}`);
          if (!onTarget) continue;
          ink++;
          if (x < x1) x1 = x;
          if (y < y1) y1 = y;
          if (x > x2) x2 = x;
          if (y > y2) y2 = y;
          if (x >= hb.x && x <= hb.x + hb.width && y >= hb.y && y <= hb.y + hb.height) inHot++;
        }
      }
      const toU = (v) => Math.round((v - pr.x) / u);
      out.push({
        action: h.dataset.action,
        target,
        ink,
        inHot,
        inkBox: ink ? { x: toU(x1), y: toU(y1), w: Math.round((x2 - x1) / u), h: Math.round((y2 - y1) / u) } : null,
        hot: { x: toU(hb.x), y: toU(hb.y), w: Math.round(hb.width / u) },
      });
    }
    /* 样式在**所有**热区都量完之后才撤：
       中途撤了，后面的热区会挡住墨迹，量出来是"没有墨" */
    style.remove();
    return out;
  }, spec.id);

  for (const r of rows) {
    if (!r.ink) {
      problems.push(`[${spec.id}] ${r.action}/${r.target} 量不到墨迹（元素没渲染？）`);
      continue;
    }
    const b = r.inkBox;
    const pct = Math.round((r.inHot / r.ink) * 100);
    const covered =
      r.hot.x <= b.x && r.hot.y <= b.y && r.hot.x + r.hot.w >= b.x + b.w && r.hot.y + r.hot.w >= b.y + b.h;
    if (!covered) {
      const need = Math.max(b.w, b.h) + 16;
      problems.push(
        `[${spec.id}] ${r.action}/${r.target} 热区没罩住目标的墨迹` +
          `（墨迹 ${b.x},${b.y} ${b.w}×${b.h}，热区 ${r.hot.x},${r.hot.y} ${r.hot.w}见方，` +
          `罩住 ${pct}%）→ 建议 at:[${Math.round(b.x + b.w / 2 - need / 2)},` +
          `${Math.round(b.y + b.h / 2 - need / 2)}] size:${Math.round(need)}`
      );
    }
  }
}

/* ── 二、热区在最小的手机上有多大 ──
   规格 §7.6 写"最小 120 × 120 CSS px"，可那一页上摆着三个目标（找一找），
   320px 的屏上塞不下三个 120px——那是按多宽的屏算的，规格里没写。
   真正兜底的是平台最小可点目标 44 CSS px（WCAG 2.5.5、iOS HIG）：
   比它还小的，孩子的手指按不准，等于没有这个热区。
   量的是 320px 宽的屏——现在最窄的手机。 */
const MIN_TAP = 44;
{
  const small = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await small.goto('file:///' + file.replace(/\\/g, '/'), { waitUntil: 'load' });
  await small.evaluate(() => document.fonts.ready);
  for (const spec of specs) {
    if (spec.screen === false) continue;
    await small.evaluate((id) => window.Book.goToId(id), spec.id);
    await small.waitForTimeout(50);
    const hs = await small.evaluate((id) => {
      const p = document.querySelector(`[data-id="${id}"]`);
      return [...p.querySelectorAll('.hotspot')].map((h) => {
        const b = h.getBoundingClientRect();
        return { action: h.dataset.action, target: h.dataset.target || '-', w: b.width, h: b.height };
      });
    }, spec.id);
    for (const r of hs) {
      const m = Math.min(r.w, r.h);
      if (m < MIN_TAP) {
        problems.push(
          `[${spec.id}] ${r.action}/${r.target} 在 320px 的屏上只有 ${Math.round(m)} CSS px 见方` +
            `（小于平台最小可点目标 ${MIN_TAP}）——孩子的手指按不准`
        );
      }
    }
  }
  await small.close();
}

await browser.close();

const screenPages = specs.filter((s) => s.screen !== false).length;
if (problems.length) {
  console.error(`\n✗ 热区检查：${problems.length} 处没罩住目标`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ 热区检查通过：${screenPages} 个屏幕页，每个热区都罩住了它指的东西`);
