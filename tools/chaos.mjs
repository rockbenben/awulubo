/* 幼儿乱读压力测试（M4 的自动化代理）。
   模拟 3 岁小孩的随手操作：乱点、乱翻、连点、乱划、乱敲键盘、拖窗口。

   测的不是"好不好玩"，是**"乱来也不会坏"**——
   真小孩会把书倒着翻、从中间跳着看、同一页戳二十下。这四类路径最容易踩坏状态机。

   断言的不变量：
   1. 活动页永远恰好构成「眼前这一跨」——窄屏一页、宽屏一到两页，页面 id 合法；
   2. 待定效果都属于眼前这一组，且同一页最多挂一个（换页没作废在飞效果就会破）；
   3. 一次点击只翻一页，不能连跳；
   4. 乱走 400 步之后，三样依次点 / 揉肚子 / 找一找 仍然能通关（计数没被搞坏）；
   5. 从最后一页一路倒着走回封面，不报错、不卡死；
   6. 全程没有 JS 错误，DOM 里没有 undefined / NaN 渗进来。

   乱读跑两场：900px（一页一屏）与 1440px（摊成跨页）。
   ⚠️ 跨页那一场不能省：一跨两页的判据在单页模式下整条是休眠的。

   用法：node tools/chaos.mjs [--seed 20261030] [--steps 400] [--wide-steps 120]
   随机数用固定种子 → 失败可以复现。
*/
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const argOf = (name, dflt) => {
  const i = args.indexOf('--' + name);
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt;
};
const SEED = Number(argOf('seed', 20261030));
const STEPS = Number(argOf('steps', 400));

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const url = 'file:///' + path.join(root, 'dist/index.html').replace(/\\/g, '/');

const problems = [];
const notes = [];
function check(ok, label) {
  if (ok) notes.push(`✓ ${label}`);
  else problems.push(`✗ ${label}`);
}

/* 固定种子的随机数：同一个 seed 跑出同一条操作序列，失败可复现 */
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const rint = (lo, hi) => lo + Math.floor(rand() * (hi - lo + 1));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(url, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

const knownIds = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.page')).map((p) => p.dataset.id)
);
const known = new Set(knownIds);

const activeId = () =>
  page.evaluate(() => document.querySelector('.page.is-active')?.dataset.id);

/* 每一步都检查的不变量。
   ⚠️ 跨页模式（宽屏）下「当前这一组」是两页，判据按组算：
   活动页必须恰好构成 Book.currentGroup()，待定效果必须属于这一组。 */
async function invariants(step) {
  const inv = await page.evaluate(() => {
    const act = Array.from(document.querySelectorAll('.page.is-active'));
    const cur = act[0];
    const group = window.Book.currentGroup();
    const bad = [];
    for (const el of document.querySelectorAll('.page [style]')) {
      const s = el.getAttribute('style') || '';
      if (/NaN|undefined/.test(s)) bad.push(`style=${s.slice(0, 90)}`);
    }
    const transforms = Array.from(cur?.querySelectorAll('.char') || []).map((c) =>
      (c.getAttribute('transform') || '')
    );
    const spiral = cur?.querySelector('.spiral');
    const deg = spiral?.dataset.deg;
    const found = cur?.getAttribute('data-found');
    return {
      activeCount: act.length,
      id: cur?.dataset.id || null,
      sides: act.map((p) => p.getAttribute('data-side') || '-'),
      groupSize: group.length,
      groupIds: group.map((p) => p.dataset.id),
      bad,
      transforms,
      deg,
      found,
      text: cur?.innerText || '',
      pending: window.Book.pendingPages(),
    };
  });

  /* 活动页必须恰好是「读者眼前这一跨」：窄屏一页、宽屏一到两页 */
  if (inv.activeCount !== inv.groupSize) {
    problems.push(
      `✗ 第 ${step} 步：活动页 ${inv.activeCount} 个（${inv.groupSize} 页的一跨）`
    );
  }
  if (inv.groupSize > 2) {
    problems.push(`✗ 第 ${step} 步：一跨有 ${inv.groupSize} 页（最多两页）`);
  }
  if (inv.groupSize === 2 && !(inv.sides[0] === 'left' && inv.sides[1] === 'right')) {
    problems.push(`✗ 第 ${step} 步：两页的左右标记是 ${inv.sides.join('/')}`);
  }
  if (!known.has(inv.id)) {
    problems.push(`✗ 第 ${step} 步：活动页 id "${inv.id}" 不合法`);
  }
  if (inv.bad.length) {
    problems.push(`✗ 第 ${step} 步：样式里出现 NaN/undefined —— ${inv.bad[0]}`);
  }
  if (inv.transforms.some((t) => /NaN|undefined/.test(t))) {
    problems.push(`✗ 第 ${step} 步：角色 transform 非法 —— ${inv.transforms.find((t) => /NaN|undefined/.test(t))}`);
  }
  if (inv.deg !== undefined && !Number.isFinite(parseFloat(inv.deg))) {
    problems.push(`✗ 第 ${step} 步：螺旋角度不是数字 —— ${inv.deg}`);
  }
  if (inv.found !== null && inv.found !== undefined && /,,|,\s*$/.test(inv.found)) {
    problems.push(`✗ 第 ${step} 步：data-found 里有空项 —— "${inv.found}"`);
  }
  if (/undefined|NaN/.test(inv.text)) {
    problems.push(`✗ 第 ${step} 步：页面文字里出现 undefined/NaN`);
  }
  /* 核心不变量：待定效果必须都属于眼前这一组，且同一页最多挂一个。
     ⚠️ 跨页时**两页各挂一个是常态**——孩子把左右两页都戳一下，
     两边的动作都得演完才翻页。原来那条「同时最多一个」是按单页写的，
     摊开成跨页就不成立（2026-11-06 由跨页那一场乱读撞出来，第 26 步：p04、p05 各一个）。
     修法是把判据按组重写，不是让后一个效果把前一个顶掉——顶掉会吞掉右页那一拍。 */
  const stale = inv.pending.filter(
    (k) => k !== 'default' && !inv.groupIds.includes(k)
  );
  if (stale.length) {
    problems.push(
      `✗ 第 ${step} 步：待定效果 ${stale.join(',')} 不在眼前这一组（${inv.groupIds.join('|')}）`
    );
  }
  if (inv.pending.length > inv.groupSize) {
    problems.push(
      `✗ 第 ${step} 步：${inv.groupSize} 页的一跨挂了 ${inv.pending.length} 个待定效果（${inv.pending.join(',')}）`
    );
  }
  return inv;
}

/* ---- 幼儿会做的操作 ---- */
const KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', ' ', 'Enter', 'Home', 'End', 'm', 'a', '1'];

async function resizeWindow(size) {
  // 全屏时用户须先退出才能拖窗口；Chromium 的窗口协议也要求这个顺序。
  await page.evaluate(async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
  });
  await page.setViewportSize(size);
}

const ops = {
  async 点空白() {
    await page.mouse.click(rint(5, 895), rint(5, 895));
  },
  async 点页心() {
    await page.mouse.click(450, 450);
  },
  async 点热点() {
    const box = await page.evaluate(() => {
      const cur = document.querySelector('.page.is-active');
      const h = cur?.querySelector('.hotspot:not([data-action="wrong"])');
      if (!h) return null;
      const r = h.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    if (box) await page.mouse.click(box.x, box.y);
  },
  async 连点() {
    const x = rint(40, 860);
    const y = rint(40, 860);
    const n = rint(3, 6);
    for (let i = 0; i < n; i++) await page.mouse.click(x, y);
  },
  async 敲键盘() {
    await page.keyboard.press(pick(KEYS));
  },
  async 乱划() {
    const x = rint(100, 800);
    const y = rint(100, 800);
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + rint(-220, 220), y + rint(-220, 220), { steps: rint(2, 8) });
    await page.mouse.up();
  },
  async 拖窗口() {
    const size = rint(560, 1300);
    await resizeWindow({ width: size, height: rint(560, 1300) });
    await page.waitForTimeout(40);
    await resizeWindow({ width: 900, height: 900 });
  },
  async 点静音() {
    const box = await page.evaluate(() => {
      const b = document.getElementById('mute');
      if (!b) return null;
      const r = b.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    if (box) await page.mouse.click(box.x, box.y);
  },
};

const opNames = Object.keys(ops);

/* ---- 第一阶段：乱来 400 步 ---- */
for (let step = 1; step <= STEPS; step++) {
  const name = pick(opNames);
  await ops[name]();
  await page.waitForTimeout(25);
  const inv = await invariants(step);
  if (problems.length) break;
  if (step % 100 === 0) notes.push(`· 已乱来 ${step} 步（当前在 ${inv.id}）`);
}

check(problems.length === 0, `乱来 ${STEPS} 步不变量全程成立`);
if (problems.length === 0) {
  notes.push(`  乱来结束时在 ${await activeId()}`);
}

/* ---- 第 1.5 阶段：摊成跨页再乱来一遍 ----
   跨页是这本书最年轻的一层逻辑（一跨两页、左页演完不许把右页那一拍带走、
   点哪边往哪边走），可上面那段乱读跑在 900px——跨页模式从没被压过。
   这里把窗口拉到 1440 再乱来一场，用的还是同一组不变量（已按「这一跨」算）。 */
{
  const WIDE_STEPS = Number(argOf('wide-steps', 120));
  await resizeWindow({ width: 1440, height: 900 });
  await page.waitForTimeout(150);
  check(await page.evaluate(() => window.Book.isSpread()), '跨页那一段真的摊开了');

  const wideOps = [
    () => page.keyboard.press(pick(KEYS)),
    () => page.mouse.click(rint(80, 1360), rint(160, 780)),
    async () => {
      /* 点这一跨里某一个热区：个数先在页面里数，取哪个由种子随机数定，
         这样失败还能按同一个 seed 复现 */
      const count = await page.evaluate(() =>
        window.Book.currentGroup().reduce((n, p) => n + p.querySelectorAll('.hotspot').length, 0)
      );
      if (!count) return;
      const idx = rint(0, count - 1);
      const box = await page.evaluate(
        ([k]) => {
          const hs = window.Book.currentGroup().flatMap((p) =>
            Array.from(p.querySelectorAll('.hotspot'))
          );
          const el = hs[k];
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
        },
        [idx]
      );
      if (box) await page.mouse.click(box.x, box.y);
    },
    async () => {
      /* 左右滑：摊开时一滑是一整跨 */
      const x = rint(400, 1000);
      await page.mouse.move(x, 450);
      await page.mouse.down();
      await page.mouse.move(x + rint(-400, 400), 450, { steps: 6 });
      await page.mouse.up();
    },
    () =>
      page.evaluate(
        ([fwd]) => (fwd ? window.Book.next() : window.Book.prev()),
        [rand() < 0.5]
      ),
  ];

  for (let step = 1; step <= WIDE_STEPS; step++) {
    const op = pick(wideOps);
    await op();
    await page.waitForTimeout(30);
    await invariants(step);
    if (problems.length) break;
  }
  check(problems.length === 0, `摊成跨页乱来 ${WIDE_STEPS} 步不变量全程成立`);
  if (problems.length === 0) {
    notes.push(`  跨页乱读结束时在 ${await activeId()}`);
  }
  /* 乱按 Enter / 空格可能把选页器或外壳面板打开了。
     后面几段要直接点书页，别让面板盖在热区上——按 Escape 走的是真的收起路径。 */
  await page.keyboard.press('Escape');
  await page.waitForTimeout(120);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(120);
  check(
    await page.evaluate(() =>
      ['#picker', '#shell'].every((s) => document.querySelector(s).hidden)
    ),
    '跨页乱读收尾时两个浮层都收起了'
  );
  /* 后面的几段钉着单页的语义，把窗口收回 900 再走 */
  await resizeWindow({ width: 900, height: 900 });
  await page.waitForTimeout(200);
}

/* ---- 第二阶段：乱走之后还能不能通关 ---- */
async function tryPlay() {
  await page.evaluate(() => window.Book.goToId('p14'));
  await page.waitForTimeout(150);
  for (const t of ['apple', 'fish', 'star']) {
    await page.click(`[data-id="p14"] .hotspot[data-target="${t}"]`);
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(900);
  return activeId();
}
check((await tryPlay()) === 'p15', '乱走之后 p14「按顺序点三样」仍能通关');

await page.evaluate(() => window.Book.goToId('p20'));
await page.waitForTimeout(150);
for (let i = 0; i < 3; i++) {
  await page.click('[data-id="p20"] .hotspot[data-action="rub"]');
  await page.waitForTimeout(260);
}
await page.waitForTimeout(900);
check((await activeId()) === 'p21', '乱走之后 p20「揉肚子」仍能通关');

await page.evaluate(() => window.Book.goToId('p30'));
await page.waitForTimeout(150);
for (const t of ['apple', 'fish', 'star']) {
  await page.click(`[data-id="p30"] .hotspot[data-target="${t}"]`);
  await page.waitForTimeout(300);
}
await page.waitForTimeout(900);
check((await activeId()) === 'p31', '乱走之后 p30「找一找」仍能通关');

/* ---- 第三阶段：一次点击只翻一页 ---- */
await page.evaluate(() => window.Book.goToId('p04'));
await page.waitForTimeout(150);
await page.click('[data-id="p04"] .hotspot');
await page.waitForTimeout(60);
await page.click('[data-id="p04"] .hotspot');
await page.waitForTimeout(1000);
check((await activeId()) === 'p05', '连点两下只翻一页（没有连跳到 p06）');

/* ---- 第四阶段：节流不能吞掉孩子的点击 ----
   以前翻页锁是"锁住就丢"，孩子连点六下只有两下有反应，另外四下"点了没反应"。
   现在每个 350 ms 窗口里只要有点击就翻一页：不丢、不堆。 */
await page.evaluate(() => window.Book.goToId('p04'));
await page.waitForTimeout(200);
const beforeTaps = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.page')).findIndex((p) =>
    p.classList.contains('is-active')
  )
);
for (let i = 0; i < 6; i++) {
  await page.mouse.click(60, 60);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(800);
const afterTaps = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.page')).findIndex((p) =>
    p.classList.contains('is-active')
  )
);
check(
  afterTaps - beforeTaps >= 3,
  `连点 6 下（间隔 150ms）至少前进 3 页（实际 ${afterTaps - beforeTaps} 页，不能吞输入）`
);

/* ---- 第五阶段：从最后一页一路倒着走回封面 ----
   翻页有 350 ms 的节流，所以按键要按节流的节奏来（这是产品的设定，不是 bug） */
await page.evaluate(() => window.Book.goToId('p33'));
await page.waitForTimeout(150);
let backSteps = 0;
for (let i = 0; i < 60; i++) {
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(380);
  backSteps++;
  if ((await activeId()) === 'p01') break;
}
check((await activeId()) === 'p01', `倒着走 ${backSteps} 步回到封面`);

await browser.close();

notes.forEach((n) => console.log(`  ${n}`));
if (errors.length) {
  problems.push(`✗ 全程有 ${errors.length} 条 JS 错误，第一条：${errors[0]}`);
}
if (problems.length) {
  console.error('\n乱读压力测试未通过：');
  problems.forEach((p) => console.error(`  ${p}`));
  process.exit(1);
}
console.log('✓ 幼儿乱读压力测试通过');
