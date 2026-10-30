/* 页面检查：结构、字数、符号引用、位置越界、页数，以及成品里的外链。
   用法：node tools/check-pages.mjs [--full]
   --full 强校验全书 32 印刷页 / 28 屏幕页。 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSpecs } from './load-specs.mjs';
import { EFFECT_RADIUS, EFFECT_ID, PROP_ID } from './render-page.mjs';
import { PRINT_PAGES, SCREEN_PAGES } from './layout-constants.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
    for (const m of text.matchAll(/<(?:symbol|g)\b[^>]*\bid="([^"]+)"/g)) ids.add(m[1]);
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
    if (page.bg && page.bg.kind && !EFFECT_RADIUS[page.bg.kind]) {
      fail(`[${page.id}] 未知的背景种类：${page.bg.kind}`);
    } else if (page.bg && page.bg.kind && page.bg.kind !== 'none') {
      if (!ids.has(EFFECT_ID[page.bg.kind])) {
        fail(`[${page.id}] 背景引用了不存在的符号 #${EFFECT_ID[page.bg.kind]}`);
      }
    }
    if (page.bg && page.bg.focus) {
      const [fx, fy] = page.bg.focus;
      if (fx < -50 || fx > 1050 || fy < -50 || fy > 1050) {
        fail(`[${page.id}] 背景焦点越界：${page.bg.focus}`);
      }
    }

    /* 角色与道具的符号必须存在 */
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
      if (h.size < 120) fail(`[${page.id}] 热点尺寸 ${h.size} 小于 120`);
      if (!h.action) fail(`[${page.id}] 热点缺少 action`);
      else if (!actions.has(h.action)) {
        fail(
          `[${page.id}] 热点动作 "${h.action}" 在 interactions.js 里没有` +
            `（可用的：${[...actions].join(', ')}）`
        );
      }
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
    if (pages.length !== PRINT_PAGES) {
      fail(`印刷版 ${pages.length} 页，应为 ${PRINT_PAGES} 页`);
    }
    if (screenPages !== SCREEN_PAGES) {
      fail(`屏幕版 ${screenPages} 页，应为 ${SCREEN_PAGES} 页`);
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
