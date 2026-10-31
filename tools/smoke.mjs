/* 交互冒烟：封面、点肚子、点苹果、三样依次点、摸噜啵、再读一次、键盘、静音、零外链。
   用法：node tools/smoke.mjs */
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCREEN_PAGES } from './layout-constants.mjs';
import { loadSpecs } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const url = 'file:///' + path.join(root, 'dist/index.html').replace(/\\/g, '/');

const problems = [];
const notes = [];

function check(ok, label) {
  if (ok) notes.push(`✓ ${label}`);
  else problems.push(`✗ ${label}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });

const consoleErrors = [];
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});
page.on('pageerror', (e) => consoleErrors.push(String(e)));

await page.goto(url, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

const activeId = () =>
  page.evaluate(() => document.querySelector('.page.is-active')?.dataset.id);

/* 起点：封面 */
let active = await activeId();
check(active === 'p01', `起始页是封面 p01（实际 ${active}）`);

/* 点封面 → p02 */
await page.click('[data-id="p01"] .hotspot');
await page.waitForTimeout(600);
active = await activeId();
check(active === 'p02', `点封面后进入 p02（实际 ${active}）`);

/* 跳到 p05，点肚子 → p06 */
await page.evaluate(() => window.Book.goToId('p05'));
await page.waitForTimeout(200);
await page.click('[data-id="p05"] .hotspot');
await page.waitForTimeout(1100);
active = await activeId();
check(active === 'p06', `点肚子后翻到 p06（实际 ${active}）`);

/* 点空白处 → p07 */
await page.mouse.click(60, 60);
await page.waitForTimeout(500);
active = await activeId();
check(active === 'p07', `点击空白翻到 p07（实际 ${active}）`);

/* 方向键回到 p06 */
await page.keyboard.press('ArrowLeft');
await page.waitForTimeout(450);
active = await activeId();
check(active === 'p06', `方向键回到 p06（实际 ${active}）`);

/* 走到 p07，点苹果 → p08 */
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(450);
await page.click('[data-id="p07"] .hotspot');
await page.waitForTimeout(1100);
active = await activeId();
check(active === 'p08', `点苹果后翻到 p08（实际 ${active}）`);

/* p13：三样依次点 → p14 */
await page.evaluate(() => window.Book.goToId('p13'));
await page.waitForTimeout(200);
for (const target of ['apple', 'fish', 'star']) {
  await page.click(`[data-id="p13"] .hotspot[data-target="${target}"]`);
  await page.waitForTimeout(380);
}
await page.waitForTimeout(900);
active = await activeId();
check(active === 'p14', `三样依次点完后翻到 p14（实际 ${active}）`);

/* p15：连喂三口 → 变圆 → 翻到 p16 */
await page.evaluate(() => window.Book.goToId('p15'));
await page.waitForTimeout(200);
for (let i = 0; i < 3; i++) {
  await page.click('[data-id="p15"] .hotspot[data-action="feed"]');
  await page.waitForTimeout(320);
}
await page.waitForTimeout(900);
active = await activeId();
check(active === 'p16', `p15 连喂三口后翻到 p16（实际 ${active}）`);

/* p17：连点三下肚子（揉肚子的兜底）→ 翻到 p18 */
await page.evaluate(() => window.Book.goToId('p17'));
await page.waitForTimeout(200);
for (let i = 0; i < 3; i++) {
  await page.click('[data-id="p17"] .hotspot[data-action="rub"]');
  await page.waitForTimeout(260);
}
await page.waitForTimeout(900);
active = await activeId();
check(active === 'p18', `p17 连点三下后翻到 p18（实际 ${active}）`);

/* p19：点彩纸 → 彩纸变淡、小花冒出来 → 翻到 p20 */
await page.evaluate(() => window.Book.goToId('p19'));
await page.waitForTimeout(200);
await page.click('[data-id="p19"] .hotspot');
await page.waitForTimeout(600);
const bloomed = await page.evaluate(
  () => document.querySelector('[data-id="p19"]').classList.contains('is-bloom')
);
check(bloomed, 'p19 点彩纸后进入开花状态（is-bloom）');
await page.waitForTimeout(500);
active = await activeId();
check(active === 'p20', `p19 点彩纸后翻到 p20（实际 ${active}）`);

/* p23：点月亮 → 变暗 → 翻到 p24 */
await page.evaluate(() => window.Book.goToId('p23'));
await page.waitForTimeout(200);
await page.click('[data-id="p23"] .hotspot');
await page.waitForTimeout(1000);
active = await activeId();
check(active === 'p24', `p23 点月亮后翻到 p24（实际 ${active}）`);

/* p17：在肚子上画满一圈 → 螺旋转过 360° → 翻到 p18 */
await page.evaluate(() => window.Book.goToId('p17'));
await page.waitForTimeout(200);
{
  const c = await page.evaluate(() => {
    const r = document.querySelector('[data-id="p17"] .hotspot[data-action="rub"]').getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  const R = 40;
  await page.mouse.move(c.x + R, c.y);
  await page.mouse.down();
  for (let i = 1; i <= 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    await page.mouse.move(c.x + R * Math.cos(a), c.y + R * Math.sin(a));
  }
  await page.mouse.up();
}
await page.waitForTimeout(1000);
active = await activeId();
check(active === 'p18', `p17 画满一圈后翻到 p18（实际 ${active}）`);

/* p27：找到一个不能翻页，找齐三个才翻 */
await page.evaluate(() => window.Book.goToId('p27'));
await page.waitForTimeout(200);
await page.click('[data-id="p27"] .hotspot[data-target="apple"]');
await page.waitForTimeout(900);
active = await activeId();
check(active === 'p27', `p27 只找到一个时不翻页（实际 ${active}）`);
for (const t of ['fish', 'star']) {
  await page.click(`[data-id="p27"] .hotspot[data-target="${t}"]`);
  await page.waitForTimeout(300);
}
await page.waitForTimeout(900);
active = await activeId();
check(active === 'p28', `p27 找齐三个后翻到 p28（实际 ${active}）`);

/* p13 走回头路后必须还能玩：p25 摸噜啵、p42 再读一次都会跳回 p05 重读。
   如果进入页面不清零计数，第二遍读到这里会永远卡住。 */
await page.evaluate(() => window.Book.goToId('p13'));
await page.waitForTimeout(200);
for (const target of ['apple', 'fish', 'star']) {
  await page.click(`[data-id="p13"] .hotspot[data-target="${target}"]`);
  await page.waitForTimeout(320);
}
await page.waitForTimeout(900);
active = await activeId();
check(active === 'p14', `p13 第一遍三样点完到 p14（实际 ${active}）`);

/* 回头重读：跳回 p05 再到 p13，三样仍然点得动 */
await page.evaluate(() => window.Book.goToId('p05'));
await page.waitForTimeout(150);
await page.evaluate(() => window.Book.goToId('p13'));
await page.waitForTimeout(150);
for (const target of ['apple', 'fish', 'star']) {
  await page.click(`[data-id="p13"] .hotspot[data-target="${target}"]`);
  await page.waitForTimeout(320);
}
await page.waitForTimeout(900);
active = await activeId();
check(active === 'p14', `p13 回头重读后仍然能玩（实际 ${active}）`);

/* 回头重进某页时，这一页"已经演出过的效果"必须复位：
   p23 的灯变暗、p19 的彩纸开花、p15 的越吃越圆、p17 的螺旋角度。
   不复位的话，读者第二次进来会看到"效果已经演过了"：点月亮没反应、
   点肚子直接就翻页，看起来像坏了。 */
{
  await page.evaluate(() => window.Book.goToId('p23'));
  await page.waitForTimeout(150);
  await page.click('[data-id="p23"] .hotspot');
  await page.waitForTimeout(900);
  const dimmed = await page.evaluate(() =>
    document.querySelector('[data-id="p23"]').classList.contains('is-dim')
  );
  check(dimmed, 'p23 点月亮后变暗');
  await page.evaluate(() => window.Book.goToId('p22'));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.Book.goToId('p23'));
  await page.waitForTimeout(150);
  const dimAgain = await page.evaluate(() =>
    document.querySelector('[data-id="p23"]').classList.contains('is-dim')
  );
  check(!dimAgain, 'p23 回头重进时灯恢复明亮');
}

{
  await page.evaluate(() => window.Book.goToId('p19'));
  await page.waitForTimeout(150);
  await page.click('[data-id="p19"] .hotspot');
  await page.waitForTimeout(800);
  const bloomed = await page.evaluate(() =>
    document.querySelector('[data-id="p19"]').classList.contains('is-bloom')
  );
  check(bloomed, 'p19 点彩纸后开花');
  await page.evaluate(() => window.Book.goToId('p18'));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.Book.goToId('p19'));
  await page.waitForTimeout(150);
  const bloomedAgain = await page.evaluate(() =>
    document.querySelector('[data-id="p19"]').classList.contains('is-bloom')
  );
  check(!bloomedAgain, 'p19 回头重进时彩纸恢复原样');
}

{
  await page.evaluate(() => window.Book.goToId('p15'));
  await page.waitForTimeout(150);
  for (let i = 0; i < 3; i++) {
    await page.click('[data-id="p15"] .hotspot[data-action="feed"]');
    await page.waitForTimeout(120);
  }
  const grown = await page.evaluate(() => {
    const m = (document.querySelector('[data-id="p15"] #grow-char')?.getAttribute('transform') || '').match(
      /scale\(([\d.]+)\)/
    );
    return m ? parseFloat(m[1]) : null;
  });
  await page.evaluate(() => window.Book.goToId('p14'));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.Book.goToId('p15'));
  await page.waitForTimeout(150);
  const back = await page.evaluate(() => {
    const el = document.querySelector('[data-id="p15"] #grow-char');
    const m = (el?.getAttribute('transform') || '').match(/scale\(([\d.]+)\)/);
    return { scale: m ? parseFloat(m[1]) : null, base: parseFloat(el?.dataset.baseScale || '') };
  });
  check(
    grown !== null && back.scale === back.base,
    `p15 回头重进时角色缩放回到基准 ${back.scale}（基准 ${back.base}，喂饱后 ${grown}）`
  );
}

{
  await page.evaluate(() => window.Book.goToId('p17'));
  await page.waitForTimeout(150);
  const c = await page.evaluate(() => {
    const r = document.querySelector('[data-id="p17"] .hotspot[data-action="rub"]').getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  const R = 40;
  await page.mouse.move(c.x + R, c.y);
  await page.mouse.down();
  for (let i = 1; i <= 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    await page.mouse.move(c.x + R * Math.cos(a), c.y + R * Math.sin(a));
  }
  await page.mouse.up();
  await page.waitForTimeout(900);
  await page.evaluate(() => window.Book.goToId('p16'));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.Book.goToId('p17'));
  await page.waitForTimeout(150);
  await page.click('[data-id="p17"] .hotspot[data-action="rub"]');
  await page.waitForTimeout(900);
  active = await activeId();
  check(active === 'p17', `p17 回头重进后螺旋角度归零，点一下不会直接翻页（实际 ${active}）`);
}

/* 孩子会乱点：多步互动的页面上，点空白不该把这一页跳过。
   以前点错直接翻页——"找一找"一戳就跳到"你都找到了吗？"，孩子一个都没找到。 */
{
  await page.evaluate(() => window.Book.goToId('p27'));
  await page.waitForTimeout(200);
  await page.mouse.click(450, 450);
  await page.waitForTimeout(700);
  active = await activeId();
  check(active === 'p27', `p27 点空白不翻页，还在找（实际 ${active}）`);

  await page.evaluate(() => window.Book.goToId('p13'));
  await page.waitForTimeout(200);
  await page.mouse.click(450, 450);
  await page.waitForTimeout(700);
  active = await activeId();
  check(active === 'p13', `p13 点空白不翻页，还能按顺序点（实际 ${active}）`);
}

/* p15：喂一口之后苹果要回到原位——不然提示写着"再喂一口！"，
   孩子面前却没有东西可喂（苹果停在 10% 不透明度、缩成 1/4，看不见）。 */
{
  await page.evaluate(() => window.Book.goToId('p15'));
  await page.waitForTimeout(200);
  await page.click('[data-id="p15"] .hotspot[data-action="feed"]');
  await page.waitForTimeout(900);
  const apple = await page.evaluate(() => {
    const el = document.querySelector('[data-id="p15"] .prop-apple');
    return { opacity: getComputedStyle(el).opacity, flying: el.classList.contains('is-flying') };
  });
  check(
    apple.opacity === '1' && !apple.flying,
    `p15 喂一口后苹果回到原位（opacity ${apple.opacity}）`
  );
}

/* 走回头路时，道具也要复位：被吃掉/被找到的道具停在 10% 不透明度，
   回头再进这一页就"什么都没有可点"，而提示还在让人点它。 */
{
  await page.evaluate(() => window.Book.goToId('p13'));
  await page.waitForTimeout(200);
  await page.click('[data-id="p13"] .hotspot[data-target="apple"]');
  await page.waitForTimeout(900);
  const eaten = await page.evaluate(
    () => getComputedStyle(document.querySelector('[data-id="p13"] .prop-apple')).opacity
  );
  await page.evaluate(() => window.Book.goToId('p05'));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.Book.goToId('p13'));
  await page.waitForTimeout(250);
  const back = await page.evaluate(
    () => getComputedStyle(document.querySelector('[data-id="p13"] .prop-apple')).opacity
  );
  check(
    Number(eaten) < 1 && Number(back) === 1,
    `p13 回头重进时道具复原（吃掉后 ${eaten} → 重进后 ${back}）`
  );
}

/* 连点空白后立刻点热点：排队中的翻页请求不能把这个互动腰斩。
   以前孩子点肚子，120ms 后就被翻到下一页，咕噜声还没演完。 */
{
  await page.evaluate(() => window.Book.goToId('p03'));
  await page.waitForTimeout(200);
  await page.mouse.click(60, 60);
  await page.waitForTimeout(90);
  await page.mouse.click(60, 60); // 第二次：进队列
  await page.waitForTimeout(90);
  await page.click('[data-id="p05"] .hotspot');
  await page.waitForTimeout(120);
  const still = await activeId();
  const pending = await page.evaluate(() => window.Book.pendingPages());
  check(
    still === 'p05' && pending.includes('p05'),
    `连点空白后点肚子，效果不被腰斩（${still}，待定 ${pending.join(',')}）`
  );
  await page.waitForTimeout(800);
  check((await activeId()) === 'p06', 'p05 的效果演完后正常翻到 p06');
}

/* 触屏上"揉肚子画圈"必须能用：触屏拖动不产生 click，
   而且浏览器会抢走手势（pointercancel），螺旋只转 30° 就断了。 */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const tp = await ctx.newPage();
  await tp.goto(url, { waitUntil: 'load' });
  await tp.evaluate(() => document.fonts.ready);
  await tp.evaluate(() => window.Book.goToId('p17'));
  await tp.waitForTimeout(250);
  const c = await tp.evaluate(() => {
    const r = document.querySelector('[data-id="p17"] .hotspot').getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  const cdp = await tp.context().newCDPSession(tp);
  const touch = (type, x, y) =>
    cdp.send('Input.dispatchTouchEvent', {
      type,
      touchPoints:
        type === 'touchEnd' ? [] : [{ x, y, radiusX: 5, radiusY: 5, force: 1, id: 1 }],
    });
  await touch('touchStart', c.x + 40, c.y);
  for (let i = 1; i <= 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    await touch('touchMove', c.x + 40 * Math.cos(a), c.y + 40 * Math.sin(a));
  }
  await touch('touchEnd', c.x + 40, c.y);
  await tp.waitForTimeout(900);
  const touched = await tp.evaluate(
    () => document.querySelector('.page.is-active').dataset.id
  );
  check(touched === 'p18', `触屏画圈也能揉肚子过关（实际 ${touched}）`);
  await ctx.close();
}

/* p17：第一下点肚子就要有反应（"画个圈"3 岁孩子做不到，
   连点兜底不能是"点了没反应"） */
{
  await page.evaluate(() => window.Book.goToId('p17'));
  await page.waitForTimeout(200);
  await page.click('[data-id="p17"] .hotspot[data-action="rub"]');
  await page.waitForTimeout(400);
  const deg = await page.evaluate(
    () => document.querySelector('[data-id="p17"] .spiral').dataset.deg
  );
  check(parseFloat(deg) >= 120, `p17 第一下点肚子螺旋转了一格（${deg}°）`);
}

/* p09：热区必须罩住鱼本身——按锚点摆热区的话，点鱼会点空，
   书直接翻页过去，鱼根本没被喂到。 */{
  await page.evaluate(() => window.Book.goToId('p09'));
  await page.waitForTimeout(200);
  const spot = await page.evaluate(() => {
    const r = document.querySelector('[data-id="p09"] .prop-fish').getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  await page.mouse.click(spot.x, spot.y);
  await page.waitForTimeout(350);
  const fed = await page.evaluate(() =>
    document.querySelector('[data-id="p09"] .prop-fish').classList.contains('is-flying')
  );
  check(fed, 'p09 点蓝小鱼的中心真的喂到了（不是只翻页）');
}

/* 孩子是照着屏幕上的话去点"看得见的东西"的，所以要验的是可见中心，
   不是热点元素的中心——上一轮就漏在这里（结局页的圆圈整颗点不到）。 */
async function clickVisible(pageId, selector, fx = 0.5, fy = 0.5) {
  const box = await page.evaluate(
    ([id, sel, x, y]) => {
      const el = document.querySelector(`[data-id="${id}"] ${sel}`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (!r.width) return null;
      return { x: r.x + r.width * x, y: r.y + r.height * y };
    },
    [pageId, selector, fx, fy]
  );
  if (!box) return false;
  await page.mouse.click(box.x, box.y);
  return true;
}

/* p19：点一片彩纸（不是恰好那朵花）就该开花 */
{
  await page.evaluate(() => window.Book.goToId('p19'));
  await page.waitForTimeout(200);
  /* 只挑笔触，不挑底色场：底色场是第一个 .fx use，点它当然不会开花 */
  await clickVisible('p19', '.fx use:not(.fx-wash)', 0.9, 0.9);
  await page.waitForTimeout(350);
  const bloomed = await page.evaluate(() =>
    document.querySelector('[data-id="p19"]').classList.contains('is-bloom')
  );
  check(bloomed, 'p19 点远处的彩纸也开花（热区罩住整片彩纸）');
}

/* p23：点月亮的可见中心就该灯变暗 */
{
  await page.evaluate(() => window.Book.goToId('p23'));
  await page.waitForTimeout(200);
  await clickVisible('p23', '.prop-moon');
  await page.waitForTimeout(350);
  const dim = await page.evaluate(() =>
    document.querySelector('[data-id="p23"]').classList.contains('is-dim')
  );
  check(dim, 'p23 点月亮的中心灯会变暗');
}

/* p25：点噜啵的脸就该打哈欠（回到第一跨页） */
{
  await page.evaluate(() => window.Book.goToId('p25'));
  await page.waitForTimeout(200);
  await clickVisible('p25', 'use[href="#pose-hungry"]', 0.45, 0.35);
  await page.waitForTimeout(900);
  check((await activeId()) === 'p05', `p25 点噜啵的脸会打哈欠回开头（实际 ${await activeId()}）`);
}

/* p16：点噜啵自己也要有反应（"拍一拍"）——它晃一下、叫一声，页照翻。
   孩子最先戳的就是它；不回应的话，它在全书都只是一张贴图。 */
{
  await page.evaluate(() => window.Book.goToId('p16'));
  await page.waitForTimeout(200);
  const box = await page.evaluate(() => {
    const r = document.querySelector('[data-id="p16"] .char').getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  await page.mouse.click(box.x, box.y);
  await page.waitForTimeout(120);
  const wobbled = await page.evaluate(() =>
    document.querySelector('[data-id="p16"] .char')?.classList.contains('is-wobble')
  );
  check(wobbled, 'p16 点噜啵自己会晃一下（拍一拍）');
  await page.waitForTimeout(700);
  check((await activeId()) === 'p17', `p16 拍完之后照样翻页（实际 ${await activeId()}）`);
}

/* p31：数一数——点一个苹果，旁边的数字亮起来；数满三个才翻页 */
{
  await page.evaluate(() => window.Book.goToId('p31'));
  await page.waitForTimeout(200);
  for (const i of [1, 2]) {
    await page.click(`[data-id="p31"] .hotspot[data-index="${i}"]`);
    await page.waitForTimeout(250);
  }
  const lit = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[data-id="p31"] .number')).map((n) =>
      n.classList.contains('is-on')
    )
  );
  check(
    lit[0] === true && lit[1] === true && lit[2] === false,
    `p31 数了两个，数字亮两个（实际 ${JSON.stringify(lit)}）`
  );
  check((await activeId()) === 'p31', `p31 没数满不翻页（实际 ${await activeId()}）`);
  await page.click('[data-id="p31"] .hotspot[data-index="3"]');
  await page.waitForTimeout(900);
  check((await activeId()) === 'p32', `p31 数满三个翻到 p32（实际 ${await activeId()}）`);

  /* 回头重进：数字必须复位，否则第二次进来一碰就翻页 */
  await page.evaluate(() => window.Book.goToId('p31'));
  await page.waitForTimeout(250);
  const again = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[data-id="p31"] .number')).map((n) =>
      n.classList.contains('is-on')
    )
  );
  check(
    again.every((v) => v === false),
    `p31 重进后数字复位（实际 ${JSON.stringify(again)}）`
  );
}

/* p20：点它，它横着飞过天空。
   「彩纸把它送到天上啦」这句话就在这一页兑现——不另起一页，
   所以这一下要是没演出来，全书的伏笔就是句空话。 */
{
  await page.evaluate(() => window.Book.goToId('p20'));
  await page.waitForTimeout(200);
  await page.click('[data-id="p20"] .hotspot[data-target="char"]');
  await page.waitForTimeout(420);
  const flown = await page.evaluate(() => {
    const el = document.querySelector('[data-id="p20"] .char');
    return { now: el.getAttribute('transform'), base: el.getAttribute('data-base-transform') };
  });
  check(flown.now !== flown.base, 'p20 点它之后角色真的飞走了（transform 变了）');
  await page.waitForTimeout(900);
  check((await activeId()) === 'p21', `p20 飞完翻到 p21（实际 ${await activeId()}）`);

  /* 回头再进 p20：它得回到原来的位置，不能停在飞到一半的地方 */
  await page.evaluate(() => window.Book.goToId('p20'));
  await page.waitForTimeout(200);
  const back = await page.evaluate(() => {
    const el = document.querySelector('[data-id="p20"] .char');
    return { now: el.getAttribute('transform'), base: el.getAttribute('data-base-transform') };
  });
  check(back.now === back.base, 'p20 回头重进时角色回到原位');
}

/* p33：喊满三声它才听见——喊不够就翻页，"它听见了"这一拍就没了 */
{
  await page.evaluate(() => window.Book.goToId('p33'));
  await page.waitForTimeout(200);
  await page.click('[data-id="p33"] .hotspot');
  await page.waitForTimeout(200);
  check((await activeId()) === 'p33', 'p33 喊一声不翻页（还要继续喊）');
  await page.click('[data-id="p33"] .hotspot');
  await page.click('[data-id="p33"] .hotspot');
  await page.waitForTimeout(1000);
  check((await activeId()) === 'p34', `p33 喊满三声翻到 p34（实际 ${await activeId()}）`);
}

/* p34：点它，它蹦一下，然后翻页 */
{
  await page.evaluate(() => window.Book.goToId('p34'));
  await page.waitForTimeout(200);
  await page.click('[data-id="p34"] .hotspot[data-target="char"]');
  await page.waitForTimeout(1000);
  check((await activeId()) === 'p35', `p34 点它翻到 p35（实际 ${await activeId()}）`);
}

/* p35 / p37 / p39：三个亲子动作页，点它就自己演一遍再翻过去 */
for (const [id, next] of [
  ['p35', 'p36'],
  ['p37', 'p38'],
  ['p39', 'p40'],
]) {
  await page.evaluate((i) => window.Book.goToId(i), id);
  await page.waitForTimeout(200);
  await page.click(`[data-id="${id}"] .hotspot[data-target="char"]`);
  await page.waitForTimeout(1100);
  check((await activeId()) === next, `${id} 点它翻到 ${next}（实际 ${await activeId()}）`);
}

/* p39：跺脚要真的把角色砸下去（不是只翻页） */
{
  await page.evaluate(() => window.Book.goToId('p39'));
  await page.waitForTimeout(200);
  await page.click('[data-id="p39"] .hotspot[data-target="char"]');
  await page.waitForTimeout(140);
  const dipped = await page.evaluate(() => {
    const el = document.querySelector('[data-id="p39"] .char');
    return { now: el.getAttribute('transform'), base: el.getAttribute('data-base-transform') };
  });
  check(dipped.now !== dipped.base, 'p39 跺脚时角色真的往下沉了');
  await page.waitForTimeout(1000);
}

/* p42：点那个手绘大圆圈就该"再读一次"——全书最后一页唯一能点的按钮 */
{
  await page.evaluate(() => window.Book.goToId('p42'));
  await page.waitForTimeout(200);
  await clickVisible('p42', '.prop-arrow', 0.45, 0.35);
  await page.waitForTimeout(900);
  check((await activeId()) === 'p05', `p42 点大圆圈回到第一跨页（实际 ${await activeId()}）`);
}

/* 连着点错 5 下就放人走：这一页不能是死路 */
{
  await page.evaluate(() => window.Book.goToId('p27'));
  await page.waitForTimeout(200);
  for (let i = 0; i < 4; i++) {
    await page.mouse.click(450, 450);
    await page.waitForTimeout(220);
  }
  active = await activeId();
  check(active === 'p27', `p27 点错 4 下还留在这一页（实际 ${active}）`);
  await page.mouse.click(450, 450);
  await page.waitForTimeout(700);
  active = await activeId();
  check(active === 'p28', `p27 连点错 5 下会放人走（实际 ${active}）`);
}

/* 点错不能把"按顺序点三样"的计数挤偏：
   孩子的第一次正确点击不能被当成"顺序错了"。 */
{
  await page.evaluate(() => window.Book.goToId('p13'));
  await page.waitForTimeout(200);
  await page.mouse.click(100, 900); // 点错一下（真正的空白）
  await page.waitForTimeout(400);
  await page.click('[data-id="p13"] .hotspot[data-target="apple"]');
  await page.waitForTimeout(400);
  const fed = await page.evaluate(() =>
    document.querySelector('[data-id="p13"] .prop-apple').classList.contains('is-flying')
  );
  check(fed, 'p13 点错一次之后，第一次点苹果仍然算数');
}

/* p15：连喂三口，角色线性变大且不出画 */
await page.evaluate(() => window.Book.goToId('p15'));
await page.waitForTimeout(200);
for (let i = 0; i < 3; i++) {
  await page.click('[data-id="p15"] .hotspot[data-action="feed"]');
  await page.waitForTimeout(320);
}
const grow = await page.evaluate(() => {
  const el = document.querySelector('[data-id="p15"] #grow-char');
  const m = (el?.getAttribute('transform') || '').match(/scale\(([\d.]+)\)/);
  const r = el?.getBoundingClientRect();
  return { scale: m ? parseFloat(m[1]) : null, bottom: r ? r.bottom : null, stage: document.querySelector('.stage').getBoundingClientRect().bottom };
});
check(
  grow.scale !== null && grow.scale <= 0.8,
  `p15 喂三口后缩放是线性基准 ${grow.scale}（不应叠加放大）`
);
check(
  grow.bottom === null || grow.stage === null || grow.bottom <= grow.stage + 1,
  `p15 喂饱后角色没有溢出页面底边（bottom ${Math.round(grow.bottom)} / stage ${Math.round(grow.stage)}）`
);

/* 残留计时器不能劫持导航：p15 的效果还在计时时翻到别的页，
   计时器到期后不该把读者从"正在看的这页"翻走。
   （以前 p15 的计时器到期会调 next()，把 p25 翻成 p26。） */
await page.evaluate(() => window.Book.goToId('p15'));
await page.waitForTimeout(200);
for (let i = 0; i < 3; i++) {
  await page.click('[data-id="p15"] .hotspot[data-action="feed"]');
}
await page.evaluate(() => window.Book.goToId('p25'));
await page.waitForTimeout(1200);
active = await activeId();
check(active === 'p25', `别页的残留计时器不会把当前页翻走（实际 ${active}）`);

/* 效果没播完时再点一下：跳过应该走到这个效果本来的结局。
   摸噜啵的结局是"回到 p05"，不是"翻到下一页 p26"。 */
await page.evaluate(() => window.Book.goToId('p25'));
await page.waitForTimeout(200);
await page.click('[data-id="p25"] .hotspot');
await page.waitForTimeout(120);
await page.mouse.click(60, 60);
await page.waitForTimeout(400);
active = await activeId();
check(active === 'p05', `效果没播完就跳过，走效果本来的结局 p05（实际 ${active}）`);

/* p25：摸噜啵 → 回到 p05 */
await page.evaluate(() => window.Book.goToId('p25'));
await page.waitForTimeout(200);
await page.click('[data-id="p25"] .hotspot');
await page.waitForTimeout(1100);
active = await activeId();
check(active === 'p05', `摸噜啵后回到 p05（实际 ${active}）`);

/* p42：点空白也有反应（最后一页翻不动了，不能毫无动静） */
{
  await page.evaluate(() => window.Book.goToId('p42'));
  await page.waitForTimeout(200);
  await page.mouse.click(60, 60);
  await page.waitForTimeout(300);
  const shook = await page.evaluate(() =>
    document.querySelector('[data-id="p42"] .char')?.classList.contains('is-shake')
  );
  check(shook, 'p42 点空白摇了一下头（不是毫无反应）');
  active = await activeId();
  check(active === 'p42', `p42 点空白没有乱翻页（实际 ${active}）`);
}

/* p42：点圆圈 → 回到 p05 */
await page.evaluate(() => window.Book.goToId('p42'));
await page.waitForTimeout(200);
await page.click('[data-id="p42"] .hotspot');
await page.waitForTimeout(700);
active = await activeId();
check(active === 'p05', `点再读一次回到 p05（实际 ${active}）`);

/* 静音键 */
await page.keyboard.press('m');
const muted = await page.evaluate(() => window.AudioBook.isMuted());
check(muted === true, 'M 键静音生效');
await page.keyboard.press('m');

/* 每个音色都要真的有声音。
   音色接错节点时**不会报错**，只是没声音——页面上听不出来，
   只有量峰值才量得到：静音的音色峰值是 0。 */
{
  const names = await page.evaluate(() => window.AudioBook.names());
  const silent = [];
  for (const n of names) {
    const peak = await page.evaluate((name) => window.AudioBook.probe(name, 300), n);
    if (!(peak > 0.001)) silent.push(n);
  }
  check(
    silent.length === 0,
    `${names.length} 个音色都有声音${silent.length ? '（哑的：' + silent.join(', ') + '）' : ''}`
  );
}

/* 屏幕版页数与印刷专属页 */
const screenIds = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.page')).map((p) => p.dataset.id)
);
check(
  !screenIds.includes('p04') &&
    !screenIds.includes('p41') &&
    !screenIds.includes('p43') &&
    !screenIds.includes('p44'),
  '屏幕版跳过版权/给大人的话/后环衬/封底'
);
check(screenIds.length === SCREEN_PAGES, `屏幕版 ${SCREEN_PAGES} 页（实际 ${screenIds.length}）`);

/* 背景必须"布满全局"：满版底色场的**实际渲染范围**要盖住整页。
   量 SVG 里 <use class="fx-wash"> 的渲染包围盒——
   角色身体是纸白的，常常压在页边，用像素统计会被它带偏，用几何量就不会。 */
const specs = await loadSpecs();
const washIds = specs.filter((s) => s.bg && s.bg.wash).map((s) => s.id);
const proof = await browser.newPage({ viewport: { width: 1200, height: 1200 } });
await proof.goto(
  'file:///' + path.join(root, 'dist/proof.html').replace(/\\/g, '/'),
  { waitUntil: 'load' }
);
const washes = await proof.evaluate(() =>
  Array.from(document.querySelectorAll('.page')).map((sec) => {
    const wash = sec.querySelector('.fx-wash');
    if (!wash) return { id: sec.dataset.id, hasWash: false, covers: false };
    const svg = sec.querySelector('.art > svg');
    const sr = svg.getBoundingClientRect();
    const wr = wash.getBoundingClientRect();
    const pad = 0.5;
    return {
      id: sec.dataset.id,
      hasWash: true,
      covers:
        wr.left <= sr.left + pad &&
        wr.top <= sr.top + pad &&
        wr.right >= sr.right - pad &&
        wr.bottom >= sr.bottom - pad,
    };
  })
);
const rendered = washes.filter((w) => w.hasWash).map((w) => w.id);
const missing = washIds.filter((id) => !rendered.includes(id));
const extra = rendered.filter((id) => !washIds.includes(id));
const notCovered = washes.filter((w) => w.hasWash && !w.covers).map((w) => w.id);
check(
  missing.length === 0 && extra.length === 0,
  `满版底色场页数对得上（该有 ${washIds.length} 页；缺 ${missing.join(',') || '无'}；多 ${extra.join(',') || '无'}）`
);
check(
  notCovered.length === 0,
  `底色场盖住整页（没盖住：${notCovered.join(',') || '无'}）`
);
await proof.close();

/* 无外部请求 */
const requests = [];
page.on('request', (r) => {
  if (!r.url().startsWith('file://') && !r.url().startsWith('data:')) requests.push(r.url());
});
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(500);
check(requests.length === 0, `没有外部请求（实际 ${requests.length}）`);

check(consoleErrors.length === 0, `没有 console 错误${consoleErrors.length ? '：' + consoleErrors[0] : ''}`);

await browser.close();

notes.forEach((n) => console.log(`  ${n}`));
if (problems.length) {
  console.error('\n冒烟未通过：');
  problems.forEach((p) => console.error(`  ${p}`));
  process.exit(1);
}
console.log('✓ 交互冒烟全部通过');
