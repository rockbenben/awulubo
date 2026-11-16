/* 文字对比度检查：按**真实像素**量文字底下是什么颜色，再算 WCAG 对比度。

   为什么不用计算样式：p08/p44 的旁白落在白色的对话气泡里，
   按页面底色（红）去算会得出 4.3:1 的假警报，而实际是 18:1。
   文字底下的颜色只能从渲染结果里读——这正是这道检查存在的意义。

   做法：
     1. 浏览器里量每一处文字的框（相对页面元素）与文字颜色；
     2. 把这一页分别拍成有字、无字两张图，差分确定真实笔画；
     3. 逐笔画读取无字图的底色并算对比度。正文 ≥ 4.5:1，大字 ≥ 3:1。

   **两个产物都要量**：
     · dist/proof.html —— 印刷/拼版口径（64 页，印刷版文案）
     · dist/index.html —— 屏幕互动口径（每册 60 页，屏幕版文案）——**这是读者真正拿到的那份**
   以前只量印刷口径，而且量的是 html-shot 技能截出来的 PNG：
   屏幕版的文案不一样（"点我，开始。"这类纸上点不动的提示要改写），
   于是屏幕版压在一块深色笔触上的字，全套闸门照样全绿。

   截图由这道闸门自己拍（不依赖 html-shot 技能），所以它在 CI 上也跑得动。

   用法：node tools/check-contrast.mjs
   失败即退出码 1。

   也可以只量指定的页（改版面时快得多，量一页约两秒）：
     node tools/check-contrast.mjs shengqi/p13 shengqi/p14
     node tools/check-contrast.mjs shengqi        # 整册
   不带参数时量全部——**验收必须量全部**，只量几页不算数。
*/
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSpecs } from './load-specs.mjs';
import { prepareNumbers } from './visual-numbers.mjs';
import { pngPixels } from './png-pixels.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TARGETS = [
  { file: 'proof.html', scope: 'print', label: '印刷/拼版' },
  { file: 'index.html', scope: 'screen', label: '屏幕版' },
];

/* 页面在拼版里是 720 × 720 CSS px；截图按 2 倍拍，量出来的坐标才和旧的一套对得上 */
const SHOT_SCALE = 2;

const problems = [];
const notes = [];
let measured = 0;

/* 只量指定的页（改版面时的快车道）。空 = 全部。
   写法：`册/页`（如 shengqi/p13）或光写册（如 shengqi）。 */
const FILTERS = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const wanted = (book, id) =>
  !FILTERS.length ||
  FILTERS.some((f) => (f.includes('/') ? f === `${book}/${id}` : f === book));

/* 局部低对比度的容忍度：一行字里有多少比例的笔画压到了读不出来的底色上才算错。
   一点点擦边不算错（描边贴着字是常事）；压掉一整个字就必须报。 */
const BAD_SHARE = 0.02;
const PIXEL_DELTA = 16;

function parseColor(str) {
  const m = String(str).match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

function luminance(rgb) {
  const c = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const expectedPages = await loadSpecs();
if (!expectedPages.length) throw new Error('书稿页面预期为空，请检查册清单与 loadSpecs，不能跳过文字验收');
const browser = await chromium.launch();

for (const target of TARGETS) {
  const file = path.join(root, 'dist', target.file);
  if (!fs.existsSync(file)) {
    console.error(`✗ 找不到 dist/${target.file} —— 先跑 npm run build`);
    process.exit(1);
  }
  const url = 'file:///' + file.replace(/\\/g, '/');
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1600 },
    deviceScaleFactor: SHOT_SCALE,
  });
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  if (target.scope === 'screen') {
    /* 屏幕版一次只显示一页；摊平成拼版（加 static 类），
       排版与 proof.html 一致，截图与坐标才可比。 */
    await page.evaluate(() => document.body.classList.add('static'));
  }

  const expected = expectedPages.filter(spec => wanted(spec.book, spec.id) &&
    (target.scope !== 'screen' || spec.screen !== false));
  const numbers = await prepareNumbers(page, expected, target.scope);
  problems.push(...numbers.problems);
  notes.push(`✓ ${target.label}数字：书稿 ${numbers.declared} 条，显示状态 ${numbers.shown} 条（屏幕含互动显示）`);

  /* 隐藏文字但保留布局，无字图记录笔画下的实际底色。 */
  await page.addStyleTag({
    content: '.text-off .narration, .text-off .sound, .text-off .prompt, .text-off .adult, .text-off .number ' +
      '{ visibility: hidden !important; }\n' + ['black', 'white'].map(tone =>
        `.contrast-probe-${tone} :is(.narration,.sound,.prompt,.adult,.number){-webkit-text-fill-color:${tone}!important}`
      ).join('\n'),
  });

  const layout = await page.evaluate(() => {
    const out = [];
    for (const sec of document.querySelectorAll('.page')) {
      const pr = sec.getBoundingClientRect();
      const texts = [];
      for (const el of sec.querySelectorAll('.narration, .sound, .prompt, .adult, .number')) {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
        /* 墨迹范围（Range 量的是行盒，不是盒子）：居中排版的盒子比文字宽得多，
           量盒子会把旁边的图也算进来。 */
        const range = document.createRange();
        range.selectNodeContents(el);
        const ink = [...range.getClientRects()].filter((q) => q.width > 0 && q.height > 0);
        const inkBox = ink.length
          ? {
              x: Math.min(...ink.map((q) => q.x)) - pr.left,
              y: Math.min(...ink.map((q) => q.y)) - pr.top,
              right: Math.max(...ink.map((q) => q.right)) - pr.left,
              bottom: Math.max(...ink.map((q) => q.bottom)) - pr.top,
            }
          : null;
        let opacity = 1;
        for (let parent = el; parent; parent = parent.parentElement) opacity *= Number(getComputedStyle(parent).opacity);
        texts.push({
          kind: el.classList.contains('number') ? 'number' : el.className,
          slot: [...el.classList].find(name => /^num-\d+$/.test(name)) || '',
          text: (el.textContent || '').trim().slice(0, 10),
          color: getComputedStyle(el).color,
          fontSize: parseFloat(getComputedStyle(el).fontSize),
          opacity,
          inkBox,
          pageW: pr.width,
        });
      }
      out.push({ id: sec.dataset.id, book: sec.dataset.book, texts });
    }
    return out;
  });

  for (const spec of expectedPages) {
    if (!wanted(spec.book, spec.id) || (target.scope === 'screen' && spec.screen === false)) continue;
    const rendered = layout.find(row => row.book === spec.book && row.id === spec.id);
    for (const key of ['narration', 'sound', 'prompt', 'adult']) {
      const text = spec.text?.[key];
      if (!text?.text) continue;
      const value = target.scope === 'print' && text.print !== undefined ? text.print : text.text;
      if (!value || !String(value).trim()) continue;
      if (!rendered?.texts.some(row => row.kind === key)) {
        problems.push('[' + spec.book + '/' + spec.id + '] ' + key + ' 应显示的文字缺失或不可见');
      }
    }
  }

  for (const pg of layout) {
    if (!pg.texts.length) continue;
    if (!wanted(pg.book, pg.id)) continue;
    const loc = page.locator(`[data-id="${pg.id}"][data-book="${pg.book}"]`);
    const shot = await loc.screenshot({ animations: 'disabled' });
    const img = pngPixels(shot);
    const scale = img.width / (pg.texts[0]?.pageW || img.width);

    /* 第二张：把文字藏起来再拍一张，得到的**就是画**。
       两张一比，差出来的像素正好是字的墨迹——
       而墨迹底下那块像素，就是这行字真正压着的东西。
       这是「白字压在米白色的肚子上」那类问题唯一的量法：
       按页面底色去算是 1.13:1，按整框的众数去算又是另一回事。 */
    await loc.evaluate((el) => el.classList.add('text-off'));
    const shotBare = await loc.screenshot({ animations: 'disabled' });
    await loc.evaluate((el) => el.classList.remove('text-off'));
    const bare = pngPixels(shotBare);

    if (img.width !== bare.width || img.height !== bare.height) {
      problems.push('[' + pg.book + '/' + pg.id + '] 有字与无字截图尺寸不一致，请重新构建并检查布局');
      continue;
    }

    // 只有透明文字需要额外校准。探针只替换字形填色，保留 opacity、背景和父级分组。
    // 黑白探针的完整笔画相差约 255 × 总 opacity。LCD 抗锯齿的 RGB 覆盖率不同，
    // 且随字色非线性变化，不能从边缘反推前景。仅用探针定位完整笔画，
    // 直接比较原图与无字图在最终合成阶段的颜色，不再次混合已合成底图。
    const probes = {};
    if (pg.texts.some(t => t.opacity < 1 || parseColor(t.color)?.[3] < 1)) {
      for (const tone of ['black', 'white']) {
        const cls = 'contrast-probe-' + tone;
        await loc.evaluate((el, name) => el.classList.add(name), cls);
        try { probes[tone] = pngPixels(await loc.screenshot({ animations: 'disabled' })); }
        finally { await loc.evaluate((el, name) => el.classList.remove(name), cls); }
      }
      if (Object.values(probes).some(probe => probe.width !== img.width || probe.height !== img.height)) {
        problems.push('[' + pg.book + '/' + pg.id + '] 透明文字校准截图尺寸不一致，请重新构建并检查布局');
        continue;
      }
    }

    for (const t of pg.texts) {
      const label = `[${pg.book}/${pg.id}]（${target.label}）${t.kind}${t.slot ? ' ' + t.slot : ''} "${t.text}"`;
      const fg = parseColor(t.color);
      if (!fg || !t.inkBox) {
        problems.push(label + ' 无法读取文字颜色或墨迹范围');
        continue;
      }
      const x0 = Math.max(0, Math.floor(t.inkBox.x * scale));
      const y0 = Math.max(0, Math.floor(t.inkBox.y * scale));
      const x1 = Math.min(img.width, Math.ceil(t.inkBox.right * scale));
      const y1 = Math.min(img.height, Math.ceil(t.inkBox.bottom * scale));
      const need = t.kind === 'sound' || (t.kind === 'number' && t.fontSize >= 24) ? 3 : 4.5;
      let inkPixels = 0;
      let badPixels = 0;
      let worst = Infinity;
      let worstBg = null;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * img.width + x) * img.channels;
          const j = (y * bare.width + x) * bare.channels;
          const dr = Math.abs(img.data[i] - bare.data[j]);
          const dg = Math.abs(img.data[i + 1] - bare.data[j + 1]);
          const db = Math.abs(img.data[i + 2] - bare.data[j + 2]);
          if (dr < PIXEL_DELTA && dg < PIXEL_DELTA && db < PIXEL_DELTA) continue;
          const under = [bare.data[j], bare.data[j + 1], bare.data[j + 2]];
          let renderedFg = fg.slice(0, 3);
          if (t.opacity < 1 || fg[3] < 1) {
            const black = (y * probes.black.width + x) * probes.black.channels;
            const white = (y * probes.white.width + x) * probes.white.channels;
            const signal = [0, 1, 2].map(c => probes.white.data[white + c] - probes.black.data[black + c]);
            // 逐通道排除抗锯齿外缘，允许一个 8bit 量化级的舍入。
            // 若整行都没有完整笔画，下面的零墨迹判据必须失败，不能空跑放行。
            const solid = Math.max(PIXEL_DELTA, Math.floor(255 * t.opacity) - 1);
            if (signal.some(value => value < solid)) continue;
            renderedFg = [0, 1, 2].map(c => img.data[i + c]);
          }
          inkPixels++;
          const ratio = contrast(renderedFg, under);
          if (ratio < worst) {
            worst = ratio;
            worstBg = under;
          }
          if (ratio < need) badPixels++;
        }
      }
      if (!inkPixels) {
        problems.push(label + ' 量不到文字墨迹，请检查透明度、遮挡、字色和黑白字形校准样式');
        continue;
      }
      measured++;
      const badShare = badPixels / inkPixels;
      if (badShare >= BAD_SHARE) {
        problems.push(
          `${label} 笔画底色对比度不足：${(badShare * 100).toFixed(1)}% 的笔画低于 ${need}:1，` +
          `最差处 ${worst.toFixed(2)}:1，字色 ${t.color}，底色 rgb(${worstBg})——` +
          '把文字移入纸白缝隙或垫 prop-blob-white，并重新量对比度'
        );
      } else {
        notes.push(`✓ ${label} ${worst.toFixed(2)}:1，低对比笔画 ${(badShare * 100).toFixed(1)}%`);
      }
    }
  }

  await page.close();
}

await browser.close();

notes.forEach((n) => console.log(`  ${n}`));
console.log(
  `\n共量了 ${measured} 处文字（${TARGETS.map((t) => t.label).join(' + ')}），` +
    '全部逐像素量了笔画底色'
);
if (problems.length) {
  console.error(`✗ ${problems.length} 处文字对比度不达标：`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
/* 一处都没量到，不能报"全部达标"——
   截图没生成、路径写错、页面 id 对不上，都会落到这里。
   这道闸门要是在什么都没量的情况下说通过，就等于没有闸门。 */
if (measured === 0) {
  if (FILTERS.length) {
    console.error(
      `✗ 指定的这几页一处文字都没量到：${FILTERS.join(' ')}——` +
        `页号或册 id 写错了？（册 id 只能是 awulubo / labuluo / yiqiwan / shengqi / wuzilai）`
    );
  } else {
    console.error('✗ 一处文字都没量到（截图缺失或量不到底色）——不能就这么算通过');
  }
  process.exit(1);
}
console.log('✓ 文字对比度全部达标');
