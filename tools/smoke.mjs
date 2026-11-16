/* 交互冒烟：封面、点肚子、点苹果、三样依次点、摸噜啵、再读一次、键盘、静音、零外链。
   末尾还有一段**通用扫描**：按册清单把每一册的每一个互动页都点一遍——
   加一册不用加测试，它自己会被扫进去。
   用法：node tools/smoke.mjs */
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCREEN_PAGES } from './layout-constants.mjs';
import { loadBooks, loadSpecs } from './load-specs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const url = 'file:///' + path.join(root, 'dist/index.html').replace(/\\/g, '/');

const problems = [];
const notes = [];
/* 断言条数：文档里写的「N 项断言」由这里实测，不再靠手数。 */
let checks = 0;

function check(ok, label) {
  checks += 1;
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

/* 第一册按已冻结R7验收：无必做输入的叙事不再测试为旧点击任务。 */
await page.locator('.is-active [data-action=start]').click();
await page.waitForFunction(()=>Book.page().dataset.id==='p02');
check(await activeId()==='p02','封面开始仍进入本册前环衬');
await page.evaluate(()=>Book.goToId('p04'));
await page.locator('.is-active .hotspot').click();
await page.waitForFunction(()=>Book.page().dataset.id==='p05');
check(await activeId()==='p05','正文动作紧邻兑现');
await page.keyboard.press('ArrowLeft');
check(await activeId()==='p04','方向键可回退');
await page.waitForTimeout(400);
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

/* 选页器：能直接跳到任意一页，不必一页一页翻。
   64 页的书只能顺序翻的话，想找「数一数」那页要从头翻十几下。 */
{
  await page.evaluate(() => window.Book.goToId('p04'));
  await page.waitForTimeout(250);
  await page.click('#page-btn');
  await page.waitForTimeout(400);
  const cells = await page.evaluate(() => {
    const grid = document.querySelector('.picker-grid');
    return {
      count: grid ? grid.children.length : 0,
      withSvg: grid ? grid.querySelectorAll('svg').length : 0,
      open: !document.getElementById('picker').hidden,
    };
  });
  check(cells.open, '选页器能打开');
  check(cells.count === SCREEN_PAGES, `选页器铺开 ${SCREEN_PAGES} 页（实际 ${cells.count}）`);
  check(cells.withSvg === cells.count, `每一格都有缩略图（${cells.withSvg}/${cells.count}）`);

  /* 点第 30 格：跳到那一页，面板关上 */
  await page.click('.picker-cell[data-index="29"]');
  await page.waitForTimeout(500);
  const jumped = await page.evaluate(() => ({
    id: document.querySelector('.page.is-active')?.dataset.id,
    hidden: document.getElementById('picker').hidden,
    label: document.getElementById('page-num')?.textContent,
  }));
  check(jumped.id === 'p30', `点第 30 格跳到 p30（实际 ${jumped.id}）`);
  check(jumped.hidden === true, '选完页面板自动关上');
  check(jumped.label === '30/60', `页码跟着更新（实际 ${jumped.label}）`);
}

/* 外壳：一册 = 一本书 = 64 页。网页默认以网页方式展示，
   选册之后可以切到打印版等模式。 */
{
  await page.evaluate(() => window.Book.goToId('p04'));
  await page.waitForTimeout(250);
  await page.click('#shell-btn');
  await page.waitForTimeout(300);
  const shell = await page.evaluate(() => {
    const links = [...document.querySelectorAll('#shell .shell-btn')];
    return {
      book: document.body.dataset.book,
      mode: document.body.dataset.mode,
      books: links.filter((b) => b.hasAttribute('data-book')).length,
      modes: links.filter((b) => b.hasAttribute('data-mode')).map((b) => ({
        id: b.getAttribute('data-mode'),
        href: b.getAttribute('href'),
      })),
    };
  });
  check(shell.book === 'awulubo', `当前是第 1 册 awulubo（实际 ${shell.book}）`);
  check(shell.mode === 'web', `默认以网页方式展示（实际 ${shell.mode}）`);
  check(shell.books >= 1, `外壳里有册的入口（${shell.books} 个）`);
  const print = shell.modes.find((m) => m.id === 'print');
  check(
    !!print && /print\.html\?book=awulubo/.test(print.href || ''),
    `切到打印版走的是独立的印刷构建（${print ? print.href : '无'}）`
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
}

/* 第二册《噜啵生病啦！》：切册 + 照顾它的那几个互动。
   页码在册内独立，所以每一步都要带册 id——不带的话跳的是第一册的同一页。 */
{
  await page.evaluate(() => window.Book.setBook('labuluo'));
  await page.waitForTimeout(300);
  const book = await page.evaluate(() => ({
    attr: document.body.dataset.book,
    id: document.querySelector('.page.is-active')?.dataset.id,
    hidden: document.querySelectorAll('.page.is-off-book').length,
  }));
  check(book.attr === 'labuluo', `切到第二册（实际 ${book.attr}）`);
  check(book.id === 'p01', `切册后回到那一册的第一页（实际 ${book.id}）`);
  check(book.hidden > 0, `第一册的页面被藏起来了（${book.hidden} 页）`);

  /* 「看它的方式」是链接，链接里的册 id 必须跟着当前册走。
     链接是打开面板时建的：只更新高亮、不更新 href 的话，
     切到第二册再点「打印版」，打开的还是第一册。 */
  await page.click('#shell-btn');
  await page.waitForTimeout(250);
  const modeLinks = await page.evaluate(() =>
    [...document.querySelectorAll('#shell .shell-btn[data-mode]')].map((a) => ({
      id: a.getAttribute('data-mode'),
      href: a.getAttribute('href'),
    }))
  );
  check(
    modeLinks.length > 0 && modeLinks.every((m) => /[?&]book=labuluo(?:&|$)/.test(m.href || '')),
    `切册后「看它的方式」跟着换册（${modeLinks.map((m) => m.id + '=' + m.href).join('、')}）`
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  /* 选页器开着的时候切册：格子里不能还是上一册的缩略图。 */
  await page.evaluate(() => window.Book.setBook('awulubo'));
  await page.waitForTimeout(250);
  await page.click('#page-btn');
  await page.waitForTimeout(300);
  await page.evaluate(() => window.Book.setBook('labuluo'));
  await page.waitForTimeout(300);
  const pickerBook = await page.evaluate(() => {
    const grid = document.querySelector('.picker-grid');
    return {
      grid: grid ? grid.getAttribute('data-book') : null,
      active: document.querySelector('.page.is-active')?.dataset.id,
    };
  });
  check(
    pickerBook.grid === 'labuluo',
    `面板开着时切册，选页器跟着换册（实际 ${pickerBook.grid}）`
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  /* 关掉浮层不该替孩子翻页。
     选页器与外壳摊开时是一整张盖在书上的网，点它自己的空白处只想收起面板；
     整屏「点哪儿都往前翻」的那张网必须把浮层排掉。
     ⚠️ 落点先确认是**面板自己身上**那一点（elementFromPoint 认的就是面板本身）——
     点到格子上不算：格子是 button，本来就被早退排掉了，那条什么都没验。 */
  for (const [btn, panel, label] of [
    ['#page-btn', '#picker', '选页器'],
    ['#shell-btn', '#shell', '外壳'],
  ]) {
    await page.evaluate(() => window.Book.goToId('p04', 'awulubo'));
    await page.waitForTimeout(250);
    const before = await page.evaluate(() => window.Book.currentIndex());
    await page.click(btn);
    await page.waitForTimeout(300);
    const hit = await page.evaluate(
      ([sel]) => {
        const el = document.querySelector(sel);
        if (!el || el.hidden) return null;
        const r = el.getBoundingClientRect();
        for (let y = r.top + 4; y < r.bottom - 4; y += 8) {
          for (let x = r.left + 4; x < r.right - 4; x += 8) {
            if (document.elementFromPoint(x, y) === el) return { x, y };
          }
        }
        return null;
      },
      [panel]
    );
    check(!!hit, `${label}找得到一处「面板自己身上」的点（找不到就等于没量）`);
    if (!hit) continue;
    await page.mouse.click(hit.x, hit.y);
    await page.waitForTimeout(450);
    const after = await page.evaluate(
      ([sel]) => ({
        idx: window.Book.currentIndex(),
        closed: !!document.querySelector(sel).hidden,
      }),
      [panel]
    );
    check(
      after.idx === before,
      `点${label}的空白只关面板、不替孩子翻页（第 ${before} → ${after.idx} 页）`
    );
    check(after.closed, `点${label}的空白确实把面板收起了`);
    await page.waitForTimeout(150);
  }

  /* 拒水只共读等候，不再保留旧 p17 递杯喝水动作。 */
  const refusal = await page.evaluate(() => ['p16', 'p17'].every(id => {
    const el = document.querySelector('[data-book="labuluo"][data-id="' + id + '"]');
    return el && !el.querySelector('.hotspot') && !el.hasAttribute('data-pat');
  }));
  check(refusal, '第二册拒水跨页不强制递杯、喝水或拍打');

  /* 共读盖毯与自主张嘴后递杯；服药、咳嗽为无必点叙事。 */
  for (const [id, action, next] of [
    ['p14', 'cover', 'p15'],
    ['p18', 'water', 'p19'],
  ]) {
    await page.evaluate((a) => window.Book.goToId(a.id, 'labuluo'), { id });
    await page.waitForTimeout(200);
    await page.click(`[data-id="${id}"][data-book="labuluo"] .hotspot[data-action="${action}"]`);
    await page.waitForTimeout(1100);
    const at = await page.evaluate(() => document.querySelector('.page.is-active')?.dataset.id);
    check(at === next, `第二册 p${id.slice(1)} 的「${action}」翻到 ${next}（实际 ${at}）`);
  }

  /* 再读一次：回到**这一册**的第一页，不是第一册的 */
  await page.evaluate((a) => window.Book.goToId(a.id, 'labuluo'), { id: 'p62' });
  await page.waitForTimeout(200);
  await page.click('[data-id="p62"][data-book="labuluo"] .hotspot[data-action="again"]');
  await page.waitForTimeout(900);
  const back = await page.evaluate(() => ({
    id: document.querySelector('.page.is-active')?.dataset.id,
    book: document.body.dataset.book,
  }));
  check(back.book === 'labuluo' && back.id === 'p04', `第二册的「再读一次」回到本册 p04（实际 ${back.book}/${back.id}）`);

  /* 切回第一册，后面几项断言还按第一册算 */
  await page.evaluate(() => window.Book.setBook('awulubo'));
  await page.waitForTimeout(250);
}

/* 屏幕版页数与印刷专属页 */
const screenIds = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.page')).map((p) => p.dataset.id)
);
check(
  !screenIds.includes('p60') &&
    !screenIds.includes('p61') &&
    !screenIds.includes('p63') &&
    !screenIds.includes('p64'),
  '屏幕版跳过版权/给大人的话/后环衬/封底'
);
const books = await loadBooks();
check(
  screenIds.length === SCREEN_PAGES * books.length,
  `屏幕版 ${books.length} 册共 ${SCREEN_PAGES * books.length} 页（实际 ${screenIds.length}）`
);

/* 背景必须"布满全局"：满版底色场的**实际渲染范围**要盖住整页。
   量 SVG 里 <use class="fx-wash"> 的渲染包围盒——
   角色身体是纸白的，常常压在页边，用像素统计会被它带偏，用几何量就不会。 */
const specs = await loadSpecs();
const washIds = specs.filter((s) => s.bg && s.bg.wash).map((s) => s.book+'/'+s.id);
const proof = await browser.newPage({ viewport: { width: 1200, height: 1200 } });
await proof.goto(
  'file:///' + path.join(root, 'dist/proof.html').replace(/\\/g, '/'),
  { waitUntil: 'load' }
);
const washes = await proof.evaluate(() =>
  Array.from(document.querySelectorAll('.page')).map((sec) => {
    const wash = sec.querySelector('.fx-wash, [data-scene-base]');
    if (!wash) return { id: sec.dataset.book+'/'+sec.dataset.id, hasWash: false, covers: false };
    const svg = sec.querySelector('.art > svg');
    const sr = svg.getBoundingClientRect();
    const wr = wash.getBoundingClientRect();
    const pad = 0.5;
    return {
      id: sec.dataset.book+'/'+sec.dataset.id,
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

/* 两种宽度均按真实数据通扫；跨页完成不代替下一组的输入。 */
for(const width of [900,1440]) {
 await page.setViewportSize({width,height:900});
 await page.evaluate(()=>Book.goToId('p16','awulubo'));
 await page.locator('.is-active [data-action=feed]').click();
 await page.waitForFunction(expected=>Book.page().dataset.id===expected,width===900?'p17':'p18');
 check(await activeId()===(width===900?'p17':'p18'),width+'px 只再喂一口，右页是自主结果');
 await page.evaluate(()=>Book.goToId('p28','awulubo'));
 await page.locator('.is-active .hotspot').click();
 await page.waitForFunction(expected=>Book.page().dataset.id===expected,width===900?'p29':'p30');
 check(await activeId()===(width===900?'p29':'p30'),width+'px 次日继续而非重读');
}
await page.setViewportSize({width:900,height:900});
/* —— 五册的互动页全扫一遍：**不按册写测试** ——
   一个框架、五册内容：验收也得跟着页面数据走。
   前面那些断言是给第一册（和切换册）写的；第三、四、五册的
   pass / breathe / tidy 如果只靠静态闸门，它们是死是活没人知道。

   做法：对每一册、每一页有热区的页——
     · 进那一页，把它的每个热区都点一下（最多五轮）；
     · 点完必须「翻走了」或者「这一页 data-done」；
       两样都不是，就是这一页点不动；
     · 用真鼠标点（`mouse.click`）：rub 要的是 pointerdown/up 三下，
       只派发 click 的话螺旋不转，会被误判成点不动。
   慢的页要等：breathe 2.6 秒、pass 0.7 秒、tidy 三样各 0.62 秒——
   所以是轮询等它好，不是睡一个固定时长。 */
{
  const books = await loadBooks();
  const dead = [];
  let swept = 0;

  const finished = (id, book) =>
    page.evaluate(
      ([id, book]) => {
        const el = document.querySelector(`[data-id="${id}"][data-book="${book}"]`);
        if (!el) return true;
        return !el.classList.contains('is-active') || el.hasAttribute('data-done');
      },
      [id, book]
    );

  for(const width of [900,1440]) {
  await page.setViewportSize({width,height:900});
  for (const b of books) {
    for (const spec of b.pages) {
      const hs = Array.isArray(spec.hotspot) ? spec.hotspot : spec.hotspot ? [spec.hotspot] : [];
      if (!hs.length || spec.screen === false) continue;
      swept++;

      await page.evaluate(([id, book]) => window.Book.goToId(id, book), [spec.id, b.id]);
      await page.waitForTimeout(220);

      const points = await page.evaluate(
        ([id, book]) =>
          [...document.querySelectorAll(`[data-id="${id}"][data-book="${book}"] .hotspot`)].map(
            (el) => {
              const r = el.getBoundingClientRect();
              return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            }
          ),
        [spec.id, b.id]
      );

      let done = await finished(spec.id, b.id);
      /* 五轮：shout 要喊三声、rub 要连点三下、trap 页连错五下才放人走 */
      for (let round = 0; round < 5 && !done; round++) {
        for (const pt of points) {
          await page.mouse.click(pt.x, pt.y);
          /* 效果演完才翻页：最多等 3 秒（breathe 是 2.6 秒） */
          for (let waited = 0; waited < 3000; waited += 120) {
            await page.waitForTimeout(120);
            if (await finished(spec.id, b.id)) {
              done = true;
              break;
            }
          }
          if (done) break;
        }
      }

      if (!done) dead.push(`${b.id}/${spec.id}（${hs.map((h) => h.action).join('+')}）`);
    }
  }

  }

  /* 一个互动页都没扫到，就等于没量：热区的读法一改（hotspot → hotspots），
     hs 永远是空数组、swept 归 0，而 dead 也是空的——闸门会绿着说「都点得通」。
     跟 check-contrast.mjs 的 measured===0 同一个形状。 */
  check(swept > 0, `扫到了互动页（当前页面数据里有热区的屏幕页 ${swept} 个）`);

  check(
    dead.length === 0,
    `五册 ${swept} 个互动页都点得通${dead.length ? '（点不动：' + dead.join('、') + '）' : ''}`
  );
}

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
console.log(`✓ 交互冒烟全部通过（${checks} 项断言）`);
