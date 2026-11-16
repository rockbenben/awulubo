/* 页面检查：结构、字数、符号引用、位置越界、页数，以及成品里的外链。
   用法：node tools/check-pages.mjs [--full]
   --full 强校验每册 64 印刷页 / 60 屏幕页。 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBooks, loadSpecs } from './load-specs.mjs';
import { loadGeometry, PROP_ID } from './render-page.mjs';
import { PRINT_PAGES, SCREEN_PAGES } from './layout-constants.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const geometry = loadGeometry();
const srcDir = path.join(root, 'src');
const src = srcDir;
const dist = path.join(root, 'dist');

const FULL = process.argv.includes('--full');

const problems = [];
const notes = [];

function fail(msg) {
  problems.push(msg);
}

/* 组件里可用的符号 */
function availableIds() {
  const dir = path.join(src, 'components');
  const ids = new Set();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8');
    for (const m of text.matchAll(/<(?:symbol|g|clipPath)\b[^>]*\bid="([^"]+)"/g)) ids.add(m[1]);
  }
  return ids;
}

/* 音频配方名：音效名写错不会报错，只会没声音，所以要在构建期拦住 */
function audioRecipes() {
  const src = fs.readFileSync(path.join(srcDir, 'js', 'audio.js'), 'utf8');
  const body = src.slice(src.indexOf('var recipes'));
  return new Set([...body.matchAll(/^\s{4}(\w+):\s*function/gm)].map((m) => m[1]));
}

/* 交互动作名：动作名写错更隐蔽——interactions.js 找不到就退化成"翻一页"，
   页面照样能翻，只是这一页的互动悄悄没了，闸门全绿。 */
function interactionActions() {
  const src = fs.readFileSync(path.join(srcDir, 'js', 'interactions.js'), 'utf8');
  const body = src.slice(src.indexOf('var actions'));
  return new Set([...body.matchAll(/^ {4}(\w+):\s*function/gm)].map((m) => m[1]));
}

/* 色板令牌：tokens.css 里定义过的 CSS 变量。
   页面数据写错令牌名不会报错，只会让颜色悄悄回退——所以要在构建期拦住。 */
function colorTokens() {
  const dir = path.join(src, 'css');
  const names = new Set();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.css'))) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8');
    for (const m of text.matchAll(/(--[a-z0-9-]+)\s*:/gi)) names.add(m[1]);
  }
  return names;
}

function checkText(page, key, spec) {
  const t = spec[key];
  if (!t) return;
  const raw = Array.isArray(t.text) ? t.text : String(t.text).split('<br>');
  if (key === 'narration') {
    if (raw.length > 2) fail(`[${page.id}] 旁白 ${raw.length} 行，最多 2 行`);
    raw.forEach((line, i) => {
      const n = [...line].filter((c) => c.trim()).length;
      if (n > 13) fail(`[${page.id}] 旁白第 ${i + 1} 行 ${n} 字，超过 13 字`);
    });
  }
  if (key === 'prompt' && raw.length > 1) {
    fail(`[${page.id}] 动作提示 ${raw.length} 行，最多 1 行`);
  }
  /* 印刷版专用文案：纸上点不动，个别提示要改写。改写的那句同样受上面的规矩约束。 */
  if (t.print !== undefined && t.print !== null) {
    if (typeof t.print !== 'string' && !Array.isArray(t.print)) {
      fail(`[${page.id}] ${key} 的印刷版文案必须是字符串或字符串数组`);
    } else {
      const plines = Array.isArray(t.print) ? t.print : String(t.print).split('<br>');
      if (key === 'narration') {
        if (plines.length > 2) fail(`[${page.id}] 印刷版旁白 ${plines.length} 行，最多 2 行`);
        plines.forEach((line, i) => {
          const n = [...line].filter((c) => c.trim()).length;
          if (n > 13) fail(`[${page.id}] 印刷版旁白第 ${i + 1} 行 ${n} 字，超过 13 字`);
        });
      }
      if (key === 'prompt' && plines.length > 1) {
        fail(`[${page.id}] 印刷版动作提示 ${plines.length} 行，最多 1 行`);
      }
    }
  }
  /* 位置必须在页面内 */
  for (const [ax, ay] of [['at', 0]]) {
    if (!t[ax]) continue;
    if (t[ax][0] < -20 || t[ax][0] > 1020 || t[ax][1] < -20 || t[ax][1] > 1020) {
      fail(`[${page.id}] ${key} 的位置越界：${t[ax]}`);
    }
  }
}

async function main() {
  const pages = await loadSpecs();
  const ids = availableIds();
  const recipes = audioRecipes();
  const actions = interactionActions();
  const tokens = colorTokens();

  for (const page of pages) {
    if (!page.id) fail('有页面缺少 id');
    if (!page.template) fail(`[${page.id}] 缺少 template`);
    /* 朗读稿：缺了 aria，读屏用户翻页时就没有可读的内容（live region 也播报它） */
    if (!page.aria || !page.aria.trim()) {
      fail(`[${page.id}] 缺少 aria（朗读稿）`);
    }

    /* 拟声词：每页恰好一个，或者明确标了 noSound */
    const hasSound = Boolean(page.text && page.text.sound);
    if (!hasSound && !page.noSound) {
      fail(`[${page.id}] 没有拟声词，也没有标 noSound: true`);
    }
    if (hasSound && page.noSound) {
      fail(`[${page.id}] 同时有拟声词和 noSound`);
    }
    if (hasSound && !page.text.sound.text) {
      fail(`[${page.id}] text.sound 没有文案（会渲染成 undefined）`);
    }
    for (const key of ['narration', 'sound', 'prompt', 'adult']) {
      if (page.text && page.text[key] && !page.text[key].text) {
        fail(`[${page.id}] text.${key} 没有文案`);
      }
    }
    if (page.sound && !hasSound) {
      fail(`[${page.id}] 声明了音效 ${page.sound}，但没有 text.sound`);
    }

    for (const key of ['narration', 'sound', 'prompt', 'adult']) {
      checkText(page, key, page.text || {});
    }

    /* 音效名必须在 audio.js 的配方里存在，否则点了没声音 */
    if (page.sound && !recipes.has(page.sound)) {
      fail(`[${page.id}] 音效名 "${page.sound}" 在 audio.js 里没有对应配方`);
    }

    /* 背景：种类与焦点 */
    if (page.bg && page.bg.kind && page.bg.kind !== 'none' && !geometry[page.bg.kind]) {
      fail(`[${page.id}] 未知的背景种类：${page.bg.kind}`);
    } else if (page.bg && page.bg.kind && page.bg.kind !== 'none') {
      if (!ids.has(geometry[page.bg.kind].symbol)) {
        fail(`[${page.id}] 背景引用了不存在的符号 #${geometry[page.bg.kind].symbol}`);
      }
      /* 满版底色场：背景要"布满全局"，色块就得长在页面上，
         不能是浮在白纸上的孤岛。有背景的页必须声明底色场。 */
      if (!page.bg.wash) {
        fail(`[${page.id}] 背景缺少 wash（满版底色场）——色块会浮在白纸上`);
      } else if (!tokens.has(page.bg.wash)) {
        fail(`[${page.id}] 底色场引用了未定义的色板令牌：${page.bg.wash}`);
      }
    }
    if (page.bg && page.bg.focus) {
      const [fx, fy] = page.bg.focus;
      if (fx < -50 || fx > 1050 || fy < -50 || fy > 1050) {
        fail(`[${page.id}] 背景焦点越界：${page.bg.focus}`);
      }
    }

    /* 角色与道具的符号必须存在 */
    if (page.scene) {
      const kind = page.scene.kind;
      if (!ids.has(`scene-${kind}`)) fail(`[${page.id}] 缺少场景组件 #scene-${kind}，请恢复src/components/scenes.svg中的对应零件`);
      if (!ids.has('scene-page-clip')) fail(`[${page.id}] 缺少场景组件 #scene-page-clip，必须保留单页裁切以免跨页溢出`);
      if (kind === 'grass' && !ids.has('scene-grass-front')) fail(`[${page.id}] 缺少场景组件 #scene-grass-front，草丛藏露需要前景层`);
      if (!tokens.has(page.bg?.wash || '--paper')) fail(`[${page.id}] 场景底色不是已有色板变量，请修正background.wash`);
    }
    if (page.char && !ids.has(`pose-${page.char.pose}`)) {
      fail(`[${page.id}] 引用了不存在的姿态 #pose-${page.char.pose}`);
    }
    for (const p of page.props || []) {
      if (!PROP_ID[p.kind]) {
        fail(`[${page.id}] 未知道具：${p.kind}`);
        continue;
      }
      if (!ids.has(PROP_ID[p.kind])) {
        fail(`[${page.id}] 引用了不存在的符号 #${PROP_ID[p.kind]}`);
      }
    }

    /* 可点目标必须有标签 */
    const hotspots = page.hotspot
      ? Array.isArray(page.hotspot)
        ? page.hotspot
        : [page.hotspot]
      : [];
    for (const h of hotspots) {
      if (!h.label) fail(`[${page.id}] 热点缺少 label`);
      /* 尺寸必须是数，而且不能小于 120（规格 §6.6 的最小可点目标）。
         以前写 `h.size < 120`：size 写漏了（undefined）时这个比较是 false，
         检查放行，渲染器却算出 `width:NaN%`——热区变成一条无效 CSS，
         点不动，而闸门全绿。 */
      if (typeof h.size !== 'number' || !Number.isFinite(h.size)) {
        fail(`[${page.id}] 热点缺少可用的 size（现在写的是 ${JSON.stringify(h.size)}）`);
      } else if (h.size < 120) {
        fail(`[${page.id}] 热点尺寸 ${h.size} 小于 120`);
      }
      /* 位置同理：at 必须是两个数，否则 left/top 也是 NaN% */
      if (!Array.isArray(h.at) || h.at.length !== 2 || h.at.some((v) => typeof v !== 'number' || !Number.isFinite(v))) {
        fail(`[${page.id}] 热点缺少可用的 at（现在写的是 ${JSON.stringify(h.at)}）`);
      }
      if (!h.action) fail(`[${page.id}] 热点缺少 action`);
      else if (!actions.has(h.action)) {
        fail(
          `[${page.id}] 热点动作 "${h.action}" 在 interactions.js 里没有` +
            `（可用的：${[...actions].join(', ')}）`
        );
      }
    }

    /* 颜色令牌：bg.colors / bg.gap / text.*.color 都要是 tokens.css 里定义过的。
       以前只查了 bg.wash：颜色令牌写错不会报错，只会让颜色悄悄回退成默认色，
       截图上一眼看不出来（"这页怎么是这个颜色？"），闸门全绿。 */
    const checkToken = (value, where) => {
      if (value === undefined || value === null) return;
      if (typeof value !== 'string' || !value.startsWith('--')) {
        fail(`[${page.id}] ${where} 不是色板令牌：${JSON.stringify(value)}`);
      } else if (!tokens.has(value)) {
        fail(`[${page.id}] ${where} 引用了未定义的色板令牌：${value}`);
      }
    };
    if (page.bg) {
      (page.bg.colors || []).forEach((c, i) => checkToken(c, `背景颜色 colors[${i}]`));
      checkToken(page.bg.gap, '背景间隙 gap');
      checkToken(page.bg.wash, '底色场 wash');
    }
    for (const [key, t] of Object.entries(page.text || {})) {
      if (t && typeof t === 'object') checkToken(t.color, `文字 ${key} 的 color`);
    }
  }

  /* 成品文件里不许有外链 */
  for (const file of ['index.html', 'print.html']) {
    const p = path.join(dist, file);
    if (!fs.existsSync(p)) {
      notes.push(`${file} 还没构建（先跑 npm run build）`);
      continue;
    }
    const text = fs.readFileSync(p, 'utf8');
    if (/https?:\/\//.test(text)) fail(`${file} 里出现外链`);
    if (/<(script|link|img)[^>]+src="(?!data:)/.test(text)) fail(`${file} 里有非内联资源引用`);
  }

  const screenPages = pages.filter((p) => p.screen !== false).length;
  if (FULL) {
    /* 页数按**册**校：一册 = 一本书 = 64 页。
       多册时每册都要各自满足，否则会出现「第一册 64 页、第二册 44 页」
       这种混装——骑马钉按整本排，第二册缺的那一面还是排不出来。 */
    const books = await loadBooks();
    for (const b of books) {
      const n = b.pages.length;
      const s = b.pages.filter((p) => p.screen !== false).length;
      if (n !== PRINT_PAGES) {
        fail(`册 ${b.id}：印刷版 ${n} 页，应为 ${PRINT_PAGES} 页`);
      }
      /* 骑马钉对折：每帖 4 页，页数必须是 4 的倍数，否则最后一帖排不出来。
         页数变成 31 这种"少一页"的事，只有这条闸门拦得住——它看着像页数，
         其实是印刷问题：双面打印时书脊那一帖会缺一面。 */
      if (n % 4 !== 0) {
        fail(`册 ${b.id}：印刷版 ${n} 页不是 4 的倍数，骑马钉排不出帖（双面打印会缺一面）`);
      }
      if (s !== SCREEN_PAGES) {
        fail(`册 ${b.id}：屏幕版 ${s} 页，应为 ${SCREEN_PAGES} 页`);
      }

      /* 一跨 = 一个页面数据文件的两页。骑马钉的书永远翻到「偶数页 | 奇数页」，
         所以**同一跨的两页必须来自同一个文件**。
         2026-11-01 真发生过：版权页占着 p4，正文从 p5 起，整本书的跨页全错位；
         页数、字数、版式、热区四道闸门全绿，因为它们量的都是单页。

         ⚠️ 判据必须跟 src/js/book.js 的 buildSpreads 一模一样：**按页面顺序**走，
         偶数页配上紧跟着的「偶数页 + 1」才算一跨。别改成「按页号建表配对」——
         建表会把文件内部的次序抹掉：同一个文件里两页只是写反了顺序，
         按页号配仍然是「同一跨」（闸门绿着），可按顺序配的那一份（网页里）
         却把它们拆成两个独页，翻开来看见的是两个故事。
         ⚠️ 印刷版与屏幕版各量一遍：屏幕版跳了几页，搭档关系跟印刷版不一定一样。 */
      const pageNum = (p) => {
        const m = /^p(\d+)$/.exec(p.id);
        return m ? parseInt(m[1], 10) : 0;
      };
      const scopes = [['印刷版', b.pages], ['屏幕版', b.pages.filter((p) => p.screen !== false)]];

      /* 一、运行时真会摊开的那一跨：两页得来自同一个文件 */
      for (const [scope, list] of scopes) {
        for (let i = 0; i + 1 < list.length; i++) {
          const left = list[i];
          const right = list[i + 1];
          const n = pageNum(left);
          if (!(n > 0 && n % 2 === 0 && pageNum(right) === n + 1)) continue;
          i++; /* 一跨吃掉两页 */
          if (left.file !== right.file) {
            fail(
              `册 ${b.id}（${scope}）：p${n}|p${n + 1} 这一跨的两页来自不同文件` +
                `（${left.file} / ${right.file}）——一跨要是一个文件里的两页，` +
                `否则翻开来左右两页是两个故事`
            );
          }
        }
      }

      /* 二、一个文件声明的那一跨：运行时得真摊得开（两页挨着、偶数在前）。
         前置与后置是一个文件好几页，不归「一跨」管。 */
      const filePages = new Map();
      for (const p of b.pages) {
        if (!filePages.has(p.file)) filePages.set(p.file, []);
        filePages.get(p.file).push(p);
      }
      const where = scopes.map(([scope, list]) => [
        scope,
        new Map(list.map((p, k) => [p.id, k])),
      ]);
      for (const fp of filePages.values()) {
        if (fp.length !== 2) continue;
        const [a, c] = fp;
        const n = pageNum(a);
        if (!(n > 0 && n % 2 === 0 && pageNum(c) === n + 1)) {
          fail(
            `册 ${b.id}：${a.file} 的两页是 ${a.id}/${c.id}，不是「偶数页 + 紧随的奇数页」` +
              `——一跨要从偶数页起，否则每一跨都错开一页（AGENTS §3 规则 13）`
          );
          continue;
        }
        for (const [scope, at] of where) {
          const ka = at.get(a.id);
          const kc = at.get(c.id);
          if (ka === undefined && kc === undefined) continue; /* 整跨都不在这个版本里 */
          if (ka === undefined || kc === undefined) {
            fail(
              `册 ${b.id}（${scope}）：${a.file} 声明的一跨 ${a.id}|${c.id} 缺了一页` +
                `——剩下那页独自成页，一跨散成两屏；要跳就整跨一起跳`
            );
            continue;
          }
          if (kc - ka !== 1) {
            fail(
              `册 ${b.id}（${scope}）：${a.file} 的两页 ${a.id}/${c.id} 在清单里不挨着（第 ${ka}、${kc} 位）` +
                `——运行时按顺序配跨，会把它们拆成两个独页`
            );
          }
        }
      }
    }
  } else {
    notes.push(
      `当前 ${pages.length} 个印刷页 / ${screenPages} 个屏幕页（--full 才强校验 ${PRINT_PAGES}/${SCREEN_PAGES}）`
    );
  }

  console.log(`检查 ${pages.length} 个页面……`);
  notes.forEach((n) => console.log(`  · ${n}`));
  if (problems.length) {
    console.error(`\n✗ ${problems.length} 项不合格：`);
    problems.forEach((p) => console.error(`  - ${p}`));
    process.exit(1);
  }
  console.log('✓ 页面检查通过');
}

main();
